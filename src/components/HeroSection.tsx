import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative z-10 pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            用AI生成
          </span>
          <br />
          <span className="text-white">可以赚钱的内容</span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          输入主题，AI 自动生成爆款短视频脚本、分镜、配音稿和热门标题标签
          <br />
          从创意到发布，只需几分钟
        </p>
        <Link
          href="/generator"
          className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/25"
        >
          开始创作 →
        </Link>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">3秒</div>
            <div className="text-sm text-gray-500 mt-1">强钩子开头</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">10+</div>
            <div className="text-sm text-gray-500 mt-1">爆款标题</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">15</div>
            <div className="text-sm text-gray-500 mt-1">热门标签</div>
          </div>
        </div>
      </div>
    </section>
  )
}
