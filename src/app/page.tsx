import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import PricingCard from "@/components/PricingCard";

const features = [
  {
    title: "短视频生成器",
    description: "输入主题，AI自动生成爆款脚本、分镜、配音稿、标题和标签",
    icon: "🎬",
    status: "active" as const,
    href: "/generator",
  },
  {
    title: "带货文案",
    description: "AI帮你写出转化率超高的产品文案和带货脚本",
    icon: "🛒",
    status: "coming-soon" as const,
  },
  {
    title: "小说推文",
    description: "AI生成爆款小说推文，一键发布到各平台",
    icon: "📖",
    status: "coming-soon" as const,
  },
];

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
      "更快的AI模型",
      "优先排队",
      "高级输出格式",
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
      "最快AI模型",
      "优先支持",
      "团队协作功能",
      "API访问",
    ],
    cta: "联系销售",
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Features */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            强大的创作工具
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative z-10 py-20 px-4" id="pricing">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            简单透明的定价
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            选择适合你的方案，开始用AI创造优质内容
          </p>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {plans.map((plan) => (
              <PricingCard key={plan.name} {...plan} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
