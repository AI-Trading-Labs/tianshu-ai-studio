export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#080c18]/80 backdrop-blur-sm py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ✦ 天枢AI
            </span>
            <span className="text-gray-500 text-sm">工坊</span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-gray-500 text-sm">© 2026 Tianshu AI Studio</span>
            <span className="text-gray-500 text-sm">Powered by AI</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
