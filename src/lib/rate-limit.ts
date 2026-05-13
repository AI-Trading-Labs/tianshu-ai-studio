import { supabaseAdmin } from './supabase'

const TIER_LIMITS: Record<string, number> = {
  free: 3,
  pro: 50,
  team: 99999,
}

export async function checkUsageLimit(userId: string): Promise<{
  allowed: boolean
  used: number
  limit: number
  remaining: number
}> {
  const today = new Date().toISOString().split('T')[0]

  // Get user's subscription tier
  const { data: user } = await supabaseAdmin
    .from('users')
    .select('subscription_tier')
    .eq('id', userId)
    .single()

  const tier = user?.subscription_tier || 'free'
  const limit = TIER_LIMITS[tier] || 3

  // Get current usage for today
  const { data: usage } = await supabaseAdmin
    .from('usage')
    .select('count')
    .eq('user_id', userId)
    .eq('date', today)
    .single()

  const used = usage?.count || 0
  const remaining = Math.max(0, limit - used)

  return {
    allowed: used < limit,
    used,
    limit,
    remaining,
  }
}

export async function incrementUsage(userId: string) {
  const today = new Date().toISOString().split('T')[0]

  const { data: existing } = await supabaseAdmin
    .from('usage')
    .select('id, count')
    .eq('user_id', userId)
    .eq('date', today)
    .single()

  if (existing) {
    await supabaseAdmin
      .from('usage')
      .update({ count: existing.count + 1 })
      .eq('id', existing.id)
  } else {
    await supabaseAdmin
      .from('usage')
      .insert({ user_id: userId, date: today, count: 1 })
  }
}
