'use client'

import { useState } from 'react'

interface ResultDisplayProps {
  result: {
    script: string
    storyboard: string[]
    voiceover: string
    titles: string[]
    hashtags: string[]
  } | null
  isLoading: boolean
}

type TabKey = 'script' | 'storyboard' | 'voiceover' | 'titles' | 'hashtags'

const tabLabels: Record<TabKey, string> = {
  script: '视频脚本',
  storyboard: '分镜头',
  voiceover: '配音稿',
  titles: '标题',
  hashtags: '标签',
}

export default function ResultDisplay({ result, isLoading }: ResultDisplayProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('script')

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-white/10 rounded w-3/4" />
          <div className="h-4 bg-white/10 rounded w-1/2" />
          <div className="h-4 bg-white/10 rounded w-5/6" />
          <div className="h-4 bg-white/10 rounded w-2/3" />
        </div>
      </div>
    )
  }

  if (!result) return null

  const renderContent = () => {
    switch (activeTab) {
      case 'script':
        return (
          <div className="relative">
            <button
              onClick={() => copyToClipboard(result.script)}
              className="absolute top-0 right-0 px-3 py-1 text-xs text-gray-400 border border-gray-600 rounded hover:bg-white/10 transition-colors"
            >
              复制
            </button>
            <pre className="text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
              {result.script}
            </pre>
          </div>
        )
      case 'storyboard':
        return (
          <div className="space-y-4">
            <button
              onClick={() => copyToClipboard(result.storyboard.join('\n'))}
              className="px-3 py-1 text-xs text-gray-400 border border-gray-600 rounded hover:bg-white/10 transition-colors float-right"
            >
              复制全部
            </button>
            <div className="clear-both" />
            {result.storyboard.map((shot, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg bg-white/5">
                <span className="text-purple-400 font-mono text-sm flex-shrink-0 w-8">
                  #{i + 1}
                </span>
                <p className="text-gray-300 text-sm">{shot}</p>
              </div>
            ))}
          </div>
        )
      case 'voiceover':
        return (
          <div className="relative">
            <button
              onClick={() => copyToClipboard(result.voiceover)}
              className="absolute top-0 right-0 px-3 py-1 text-xs text-gray-400 border border-gray-600 rounded hover:bg-white/10 transition-colors"
            >
              复制
            </button>
            <p className="text-gray-300 leading-relaxed">{result.voiceover}</p>
          </div>
        )
      case 'titles':
        return (
          <div className="space-y-2">
            <button
              onClick={() => copyToClipboard(result.titles.join('\n'))}
              className="px-3 py-1 text-xs text-gray-400 border border-gray-600 rounded hover:bg-white/10 transition-colors float-right"
            >
              复制全部
            </button>
            <div className="clear-both" />
            {result.titles.map((title, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5">
                <span className="text-purple-400 font-mono text-xs w-6">{i + 1}.</span>
                <span className="text-gray-300 text-sm">{title}</span>
                <button
                  onClick={() => copyToClipboard(title)}
                  className="ml-auto text-xs text-gray-500 hover:text-gray-300"
                >
                  📋
                </button>
              </div>
            ))}
          </div>
        )
      case 'hashtags':
        return (
          <div className="space-y-3">
            <button
              onClick={() => copyToClipboard(result.hashtags.join(' '))}
              className="px-3 py-1 text-xs text-gray-400 border border-gray-600 rounded hover:bg-white/10 transition-colors float-right"
            >
              复制全部
            </button>
            <div className="clear-both" />
            <div className="flex flex-wrap gap-2">
              {result.hashtags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-sm bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-white/10 overflow-x-auto">
        {(Object.keys(tabLabels) as TabKey[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors
              ${activeTab === tab
                ? 'text-purple-400 border-b-2 border-purple-500'
                : 'text-gray-500 hover:text-gray-300'
              }`}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 max-h-[600px] overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  )
}
