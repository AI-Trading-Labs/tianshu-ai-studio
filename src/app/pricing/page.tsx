import PricingCard from "@/components/PricingCard";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "月",
    description: "适合新手体验",
    features: [
      "每天3次生成",
      "基础AI模型",
      "基础输出格式",
      "社区支持",
    ],
    cta: "免费开始",
    href: "/login",
  },
  {
    name: "Pro",
    price: "9",
    period: "月",
    description: "适合内容创作者",
    features: [
      "每天50次生成",
      "更快的AI模型（GPT-4o）",
      "优先排队",
      "高级输出格式",
      "邮件支持",
    ],
    cta: "升级Pro",
    highlighted: true,
  },
  {
    name: "Team",
    price: "29",
    period: "月",
    description: "适合团队使用",
    features: [
      "不限生成次数",
      "最新AI模型",
      "优先支持",
      "团队协作功能",
      "API访问权限",
      "专属客户经理",
    ],
    cta: "联系销售",
  },
];

export default function PricingPage() {
  return (
    <div className="relative z-10 pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">选择适合你的方案</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            所有方案都包含AI短视频生成核心功能，升级解锁更多使用次数和更快的模型
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>

        <div className="mt-16 p-8 rounded-2xl border border-white/10 bg-white/5">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">功能对比</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-gray-400 font-medium">功能</th>
                  <th className="text-center py-3 text-gray-300">Free</th>
                  <th className="text-center py-3 text-purple-400">Pro</th>
                  <th className="text-center py-3 text-blue-400">Team</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['每日生成次数', '3次', '50次', '不限'],
                  ['AI模型', '基础', 'GPT-4o', '最新'],
                  ['生成速度', '标准', '快速', '最快'],
                  ['排队优先级', '普通', '优先', '最高'],
                  ['团队协作', '✗', '✗', '✓'],
                  ['API访问', '✗', '✗', '✓'],
                  ['优先支持', '✗', '邮件', '专属'],
                ].map(([feature, free, pro, team], i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 text-gray-400">{feature}</td>
                    <td className="text-center py-3 text-gray-500">{free}</td>
                    <td className="text-center py-3 text-gray-300">{pro}</td>
                    <td className="text-center py-3 text-gray-300">{team}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
