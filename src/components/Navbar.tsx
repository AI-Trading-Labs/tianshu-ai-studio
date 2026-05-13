'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener?.subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="relative z-10 border-b border-white/10 bg-[#080c18]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ✦ 天枢AI
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/generator" className="text-gray-300 hover:text-white transition-colors">
              内容生成
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
              定价
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-400">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-gray-300 border border-gray-600 rounded-lg hover:bg-white/5 transition-colors"
                >
                  退出登录
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all"
              >
                登录
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
