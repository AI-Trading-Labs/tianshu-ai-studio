interface FeatureCardProps {
  title: string
  description: string
  icon: string
  status: 'active' | 'locked' | 'coming-soon'
  href?: string
}

export default function FeatureCard({ title, description, icon, status, href }: FeatureCardProps) {
  const isAvailable = status === 'active'

  const content = (
    <div
      className={`relative p-6 rounded-xl border backdrop-blur-sm transition-all group
        ${isAvailable
          ? 'bg-white/5 border-purple-500/20 hover:border-purple-500/40 hover:bg-white/10 cursor-pointer'
          : 'bg-white/[0.02] border-gray-700/30 opacity-60'
        }`}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      <div className="flex items-center">
        {status === 'active' && (
          <span className="text-sm text-purple-400 group-hover:text-purple-300 transition-colors">
            立即使用 →
          </span>
        )}
        {status === 'locked' && (
          <span className="text-sm text-gray-500">🔒 需要登录</span>
        )}
        {status === 'coming-soon' && (
          <span className="text-sm text-gray-500">🚀 即将上线</span>
        )}
      </div>
    </div>
  )

  if (isAvailable && href) {
    return <a href={href}>{content}</a>
  }

  return content
}
