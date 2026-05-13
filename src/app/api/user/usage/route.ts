import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { checkUsageLimit } from '@/lib/rate-limit'

export async function GET(request: Request) {
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

    const usage = await checkUsageLimit(user.id)

    return NextResponse.json(usage)
  } catch (error: any) {
    console.error('Usage error:', error)
    return NextResponse.json(
      { error: error.message || '获取用量失败' },
      { status: 500 }
    )
  }
}
