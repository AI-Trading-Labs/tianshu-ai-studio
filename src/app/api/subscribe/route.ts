import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getStripe } from '@/lib/stripe'

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: '认证失败' }, { status: 401 })
    }

    const { plan } = await request.json()

    const priceMap: Record<string, string> = {
      pro: process.env.STRIPE_PRO_PRICE_ID!,
      team: process.env.STRIPE_TEAM_PRICE_ID!,
    }

    const priceId = priceMap[plan]
    if (!priceId) {
      return NextResponse.json({ error: '无效套餐' }, { status: 400 })
    }

    const session = await getStripe().checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/generator?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?canceled=true`,
      customer_email: user.email,
      metadata: {
        user_id: user.id,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: error.message || '创建订阅失败' },
      { status: 500 }
    )
  }
}
