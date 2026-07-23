"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MOCK_REPORT } from "@/lib/mock-data";
import { Target, FileText, Lightbulb, BookOpen, ClipboardCheck, AlertCircle, AlertTriangle } from "lucide-react";

export default function ExamplePage() {
  const report = MOCK_REPORT;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold text-[#1F2430] mb-1">示例诊断报告</h1>
            <p className="text-sm text-text-secondary">以下是一个基于真实场景的示例报告</p>
          </div>
          <Link
            href="/diagnosis/scenario"
            className="inline-flex items-center justify-center h-11 px-5 rounded-[10px] bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors no-underline"
          >
            开始你自己的诊断
          </Link>
        </div>

        {/* Example Scenario */}
        <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-6 mb-6">
          <h3 className="text-sm font-semibold text-[#1F2430] mb-3">示例场景</h3>
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div><dt className="text-xs text-text-secondary">商品</dt><dd className="text-[#1F2430]">二手富士相机</dd></div>
            <div><dt className="text-xs text-text-secondary">平台</dt><dd className="text-[#1F2430]">闲鱼</dd></div>
            <div><dt className="text-xs text-text-secondary">价格</dt><dd className="text-[#1F2430]">¥3,200</dd></div>
            <div><dt className="text-xs text-text-secondary">时间范围</dt><dd className="text-[#1F2430]">最近14天</dd></div>
            <div><dt className="text-xs text-text-secondary">问题场景</dt><dd className="text-[#1F2430]">有咨询但成交少</dd></div>
          </dl>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-6 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <Target className="w-6 h-6 text-brand flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-[#1F2430] mb-1">主要问题</h3>
              <p className="text-base text-[#1F2430]">{report.primaryIssue}</p>
            </div>
          </div>
          <div className="p-4 bg-brand-light rounded-[10px]">
            <p className="text-sm text-brand font-medium">{report.summary}</p>
          </div>
        </div>

        {/* Known Facts */}
        <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-6 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <ClipboardCheck className="w-5 h-5 text-brand" />
            <h3 className="text-base font-semibold text-[#1F2430]">已知事实</h3>
          </div>
          <ul className="space-y-2">
            {report.knownFacts.map((fact, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#1F2430]">
                <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                {fact}
              </li>
            ))}
          </ul>
        </div>

        {/* Causes */}
        <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-6 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-5 h-5 text-warning" />
            <h3 className="text-base font-semibold text-[#1F2430]">可能原因</h3>
          </div>
          <div className="space-y-3">
            {report.possibleCauses.map((cause) => (
              <div key={cause.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-[10px]">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  cause.evidenceStrength === "strong" ? "bg-error" :
                  cause.evidenceStrength === "moderate" ? "bg-warning" :
                  "bg-text-secondary"
                }`} />
                <div>
                  <p className="text-sm text-[#1F2430]">{cause.description}</p>
                  <span className="text-xs text-text-secondary">
                    证据{
                      cause.evidenceStrength === "strong" ? "较强" :
                      cause.evidenceStrength === "moderate" ? "有一定可能" :
                      "需要验证"
                    }
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence */}
        <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-6 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-5 h-5 text-brand" />
            <h3 className="text-base font-semibold text-[#1F2430]">判断依据</h3>
          </div>
          <div className="space-y-3">
            {report.evidence.map((ev) => (
              <div key={ev.id} className="p-4 bg-gray-50 rounded-[10px]">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-brand" />
                  <h4 className="text-sm font-semibold text-[#1F2430]">{ev.title}</h4>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-brand">
                    {ev.evidenceLevel}级
                  </span>
                </div>
                <p className="text-xs text-text-secondary mb-2">来源：{ev.source}</p>
                <p className="text-sm text-[#1F2430] leading-relaxed">{ev.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-6 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <Lightbulb className="w-5 h-5 text-brand" />
            <h3 className="text-base font-semibold text-[#1F2430]">优先行动任务</h3>
          </div>
          <div className="space-y-4">
            {report.actionTasks.map((task) => (
              <div key={task.id} className="p-4 bg-gray-50 rounded-[10px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-brand bg-brand-light px-2 py-0.5 rounded">
                    优先级 {task.priority}
                  </span>
                  <span className="text-xs text-text-secondary">成本 {task.cost === "low" ? "低" : task.cost === "medium" ? "中" : "高"}</span>
                </div>
                <h4 className="text-sm font-semibold text-[#1F2430] mb-2">{task.title}</h4>
                <ol className="space-y-1 mb-3">
                  {task.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#1F2430]">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-light text-brand flex items-center justify-center text-xs mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
                {task.sampleCopy && (
                  <div className="p-3 bg-brand-light rounded-[10px] text-sm text-[#1F2430] leading-relaxed mb-2">
                    {task.sampleCopy}
                  </div>
                )}
                <p className="text-xs text-text-secondary">验证：{task.verificationMethod}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Risk */}
        <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-semibold text-[#1F2430] mb-2">风险提示</h3>
              <p className="text-sm text-[#1F2430] leading-relaxed">{report.riskNote}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pb-8">
          <p className="text-sm text-text-secondary mb-4">这只是一个示例。开始你自己的诊断，获得针对性建议。</p>
          <Link
            href="/diagnosis/scenario"
            className="inline-flex items-center justify-center h-12 px-8 rounded-[10px] bg-brand text-white font-medium hover:bg-brand-hover transition-colors no-underline"
          >
            开始免费诊断
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
