import { createClient } from '@supabase/supabase-js'

function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) return 'https://placeholder.supabase.co'
  return url
}

function getSupabaseAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!key) return 'placeholder-key'
  return key
}

function getSupabaseServiceKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!key) return 'placeholder-service-key'
  return key
}

export const supabase = createClient(getSupabaseUrl(), getSupabaseAnonKey())

export const supabaseAdmin = createClient(
  getSupabaseUrl(),
  getSupabaseServiceKey()
)
