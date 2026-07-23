"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, FileText, ShieldCheck, EyeOff, MessageCircle, ShoppingCart, Heart, RefreshCw, HelpCircle, ClipboardCheck, Search, Lightbulb } from "lucide-react";
import { MOCK_SCENARIOS } from "@/lib/mock-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  EyeOff, MessageCircle, ShoppingCart, Heart, RefreshCw, HelpCircle,
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3">
              <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold leading-tight text-[#1F2430] tracking-tight">
                找出商品转化卡在哪里，
                <br />
                知道下一步先改什么
              </h1>
              <p className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl">
                根据商品信息、经营表现和用户反馈，生成有依据的诊断和一至三项可执行的优化任务。
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/diagnosis/scenario"
                  className="inline-flex items-center justify-center h-12 px-8 rounded-[10px] bg-brand text-white font-medium hover:bg-brand-hover transition-colors no-underline w-full sm:w-auto"
                >
                  开始诊断
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="/example"
                  className="inline-flex items-center justify-center h-12 px-8 rounded-[10px] border border-[#E5E8EF] text-text-secondary font-medium hover:bg-gray-50 transition-colors no-underline w-full sm:w-auto"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  查看示例报告
                </Link>
              </div>
            </div>
            {/* Summary Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-xs font-medium text-text-secondary">诊断报告摘要</span>
                </div>
                <h3 className="text-sm font-semibold text-[#1F2430] mb-2">
                  二手富士相机 · 闲鱼 · ¥3,200
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">浏览</span>
                    <span className="font-medium">300</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">咨询</span>
                    <span className="font-medium">18</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">成交</span>
                    <span className="font-medium">2</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#E5E8EF]">
                  <p className="text-xs text-text-secondary leading-relaxed">
                    主要问题：咨询后的信任与决策环节。优先补充可验证的信任证明，而非继续降价。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scenario Cards */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-xl font-semibold text-[#1F2430] mb-6">常见问题场景</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_SCENARIOS.map((s) => {
              const Icon = iconMap[s.icon] || HelpCircle;
              return (
                <Link
                  key={s.value}
                  href={`/diagnosis/scenario?select=${s.value}`}
                  className="block bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-5 hover:border-brand hover:shadow-md transition-all no-underline"
                >
                  <div className="w-10 h-10 rounded-[10px] bg-brand-light flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-brand" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#1F2430] mb-1">{s.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{s.desc}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Workflow Steps */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-xl font-semibold text-[#1F2430] mb-6">三步完成诊断</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-4">
                <ClipboardCheck className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-sm font-semibold text-[#1F2430] mb-2">填写信息</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                提供商品信息、经营数据和用户反馈，系统引导你逐步完成
              </p>
            </div>
            <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-sm font-semibold text-[#1F2430] mb-2">定位问题</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                系统分析你的数据，定位转化流失环节并展示判断依据
              </p>
            </div>
            <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-sm font-semibold text-[#1F2430] mb-2">获得行动建议</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                获得1-3项可执行的优化任务，每项都有具体步骤和验证方法
              </p>
            </div>
          </div>
        </section>

        {/* Privacy & Boundary */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-[#1F2430] mb-2">隐私与边界说明</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  不要求店铺密码、支付信息和精确收入。诊断基于用户提供的信息，不承诺直接提升销量。我们帮助你理解问题，但结果取决于你的执行和市场环境。
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
