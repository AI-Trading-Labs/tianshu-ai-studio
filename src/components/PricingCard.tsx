import Link from 'next/link'

interface PricingCardProps {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
  href?: string
}

export default function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  highlighted,
  href,
}: PricingCardProps) {
  const cardContent = (
    <div
      className={`relative p-8 rounded-2xl border transition-all
        ${highlighted
          ? 'bg-gradient-to-b from-purple-900/30 to-blue-900/20 border-purple-500/40 scale-105'
          : 'bg-white/5 border-white/10 hover:border-purple-500/30'
        }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
          最受欢迎
        </div>
      )}
      <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
      <p className="text-sm text-gray-400 mb-6">{description}</p>
      <div className="mb-6">
        <span className="text-4xl font-bold text-white">${price}</span>
        <span className="text-gray-400 ml-1">/{period}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center text-sm text-gray-300">
            <svg className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      {href ? (
        <Link
          href={href}
          className={`block w-full py-3 text-center font-medium rounded-lg transition-all
            ${highlighted
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500'
              : 'bg-white/10 text-white hover:bg-white/20'
            }`}
        >
          {cta}
        </Link>
      ) : (
        <button
          disabled
          className="block w-full py-3 text-center font-medium rounded-lg bg-white/10 text-gray-500 cursor-not-allowed"
        >
          {cta}
        </button>
      )}
    </div>
  )

  return cardContent
}
