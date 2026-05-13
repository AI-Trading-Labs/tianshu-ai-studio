'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GeneratorForm from '@/components/GeneratorForm'
import ResultDisplay from '@/components/ResultDisplay'
import { supabase } from '@/lib/supabase'

interface GenerateResult {
  script: string
  storyboard: string[]
  voiceover: string
  titles: string[]
  hashtags: string[]
}

export default function GeneratorPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<GenerateResult | null>(null)
  const [usageInfo, setUsageInfo] = useState<{
    used: number
    limit: number
    remaining: number
  } | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login')
      } else {
        setUser(session.user)
        fetchUsage()
      }
    })
  }, [router])

  const fetchUsage = async () => {
    try {
      const res = await fetch('/api/user/usage')
      const data = await res.json()
      setUsageInfo(data)
    } catch {
      console.error('Failed to fetch usage')
    }
  }

  const handleGenerate = async (topic: string, style: string, goal: string) => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, style, goal }),
      })

      if (!res.ok) {
        const error = await res.json()
        if (res.status === 401) {
          router.push('/login')
          return
        }
        throw new Error(error.error || '生成失败')
      }

      const data = await res.json()
      setResult(data)
      await fetchUsage()
    } catch (err: any) {
      alert(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="relative z-10 pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">AI 短视频生成器</h1>
          {usageInfo && (
            <p className="text-sm text-gray-400">
              今日使用：<span className="text-purple-400">{usageInfo.used}</span>
              /<span className="text-blue-400">{usageInfo.limit}</span>
              {' '}次（剩余 <span className="text-green-400">{usageInfo.remaining}</span> 次）
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold text-white mb-6">输入参数</h2>
              <GeneratorForm onSubmit={handleGenerate} isLoading={isLoading} />
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-lg font-semibold text-white mb-4">生成结果</h2>
            <ResultDisplay result={result} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  )
}
