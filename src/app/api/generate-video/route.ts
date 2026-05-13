import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { generateVideoContent } from '@/lib/ai'
import { checkUsageLimit, incrementUsage } from '@/lib/rate-limit'

export async function POST(request: Request) {
  try {
    // Verify auth
    const authHeader = request.headers.get('Authorization')
    if (!authHeader) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: '认证失败' }, { status: 401 })
    }

    // Check usage limit
    const usage = await checkUsageLimit(user.id)
    if (!usage.allowed) {
      return NextResponse.json({
        error: `今日使用次数已达上限（${usage.limit}次），请升级套餐或明天再来`,
      }, { status: 429 })
    }

    // Parse request body
    const { topic, style, goal } = await request.json()
    if (!topic || !style || !goal) {
      return NextResponse.json({ error: '请填写完整信息' }, { status: 400 })
    }

    // Generate content via AI
    const result = await generateVideoContent(topic, style, goal)

    // Increment usage
    await incrementUsage(user.id)

    // Save to generations table
    await supabaseAdmin.from('generations').insert({
      user_id: user.id,
      topic,
      result,
    })

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Generate video error:', error)
    return NextResponse.json(
      { error: error.message || '生成失败，请稍后重试' },
      { status: 500 }
    )
  }
}
