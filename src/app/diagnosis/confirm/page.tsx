"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDiagnosis } from "@/hooks/useDiagnosis";
import { useStepGuard } from "@/hooks/useStepGuard";
import { StepNavigation } from "@/components/diagnosis/StepNavigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SCENARIOS, REJECTION_REASON_OPTIONS } from "@/lib/constants";
import { Edit3 } from "lucide-react";

export default function ConfirmPage() {
  const router = useRouter();
  const { state, setConfirmed } = useDiagnosis();
  useStepGuard("/diagnosis/confirm");
  const [agreed, setAgreed] = useState(false);

  const scenarioLabel = SCENARIOS.find((s) => s.value === state.scenario)?.label || "未选择";

  const handleGenerate = useCallback(() => {
    if (agreed) {
      setConfirmed(true);
      router.push("/diagnosis/generating");
    }
  }, [agreed, setConfirmed, router]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-[#1F2430] mb-2">确认信息</h1>
          <p className="text-sm text-text-secondary">请确认以下信息无误，确认后将生成诊断报告</p>
        </div>

        <div className="space-y-4">
          {/* Scenario */}
          <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-5 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#1F2430]">问题场景</h3>
              <Link href="/diagnosis/scenario" className="text-xs text-brand hover:text-brand-hover flex items-center gap-1 no-underline">
                <Edit3 className="w-3 h-3" />修改
              </Link>
            </div>
            <p className="text-sm text-text-secondary">{scenarioLabel}</p>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-5 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#1F2430]">商品信息</h3>
              <Link href="/diagnosis/product" className="text-xs text-brand hover:text-brand-hover flex items-center gap-1 no-underline">
                <Edit3 className="w-3 h-3" />修改
              </Link>
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div><dt className="text-xs text-text-secondary">商品名称</dt><dd className="text-[#1F2430]">{state.product.productName || "-"}</dd></div>
              <div><dt className="text-xs text-text-secondary">类别</dt><dd className="text-[#1F2430]">{state.product.category || "-"}</dd></div>
              <div><dt className="text-xs text-text-secondary">平台</dt><dd className="text-[#1F2430]">{state.product.platform || "-"}</dd></div>
              <div><dt className="text-xs text-text-secondary">价格</dt><dd className="text-[#1F2430]">{state.product.price !== null ? `¥${state.product.price}` : "-"}</dd></div>
              <div><dt className="text-xs text-text-secondary">状态</dt><dd className="text-[#1F2430]">{state.product.condition === "new" ? "全新" : state.product.condition === "used" ? "二手" : state.product.condition === "service" ? "服务" : "-"}</dd></div>
              <div><dt className="text-xs text-text-secondary">目标用户</dt><dd className="text-[#1F2430]">{state.product.targetUser || "-"}</dd></div>
            </dl>
          </div>

          {/* Metrics Summary */}
          <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-5 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#1F2430]">经营表现</h3>
              <Link href="/diagnosis/metrics" className="text-xs text-brand hover:text-brand-hover flex items-center gap-1 no-underline">
                <Edit3 className="w-3 h-3" />修改
              </Link>
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div><dt className="text-xs text-text-secondary">数据来源</dt><dd className="text-[#1F2430]">{state.metrics.dataSource || "-"}</dd></div>
              {(["impressions", "views", "inquiries", "orders"] as const).map((key) => {
                const field = state.metrics[key];
                const labelMap = { impressions: "曝光", views: "浏览", inquiries: "咨询", orders: "成交" };
                return (
                  <div key={key}>
                    <dt className="text-xs text-text-secondary">{labelMap[key]}</dt>
                    <dd className="text-[#1F2430]">
                      {field.availability === "known" && field.value !== null
                        ? field.value
                        : field.availability === "unknown"
                        ? "不知道"
                        : field.availability === "not_applicable"
                        ? "不适用"
                        : "-"}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

          {/* Context Summary */}
          <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-5 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#1F2430]">用户反馈</h3>
              <Link href="/diagnosis/context" className="text-xs text-brand hover:text-brand-hover flex items-center gap-1 no-underline">
                <Edit3 className="w-3 h-3" />修改
              </Link>
            </div>
            <dl className="space-y-2 text-sm">
              <div><dt className="text-xs text-text-secondary">常见咨询</dt><dd className="text-[#1F2430]">{state.context.commonQuestions || "-"}</dd></div>
              <div><dt className="text-xs text-text-secondary">拒绝原因</dt>
                <dd className="text-[#1F2430]">
                  {state.context.rejectionReasons.length > 0
                    ? state.context.rejectionReasons.map((r) => REJECTION_REASON_OPTIONS.find((o) => o.value === r)?.label).join("、")
                    : "-"}
                </dd>
              </div>
              <div><dt className="text-xs text-text-secondary">已尝试调整</dt><dd className="text-[#1F2430]">{state.context.attemptedChanges || "-"}</dd></div>
              <div><dt className="text-xs text-text-secondary">调整结果</dt><dd className="text-[#1F2430]">{state.context.changeResults || "-"}</dd></div>
            </dl>
          </div>

          {/* Data Completeness */}
          <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-[#1F2430] mb-2">数据完整度</h3>
            <p className="text-sm text-text-secondary">基本充分 — 已提供商品、平台、价格、浏览、咨询、成交和常见问题。</p>
          </div>
        </div>

        {/* Confirmation Checkbox */}
        <div className="mt-6 p-5 bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-5 h-5 mt-0.5 rounded accent-brand"
            />
            <span className="text-sm text-text-secondary">
              我已确认以上信息无误，同意系统根据提供的信息生成诊断建议。诊断结果仅供参考，不构成专业经营建议。
            </span>
          </label>
        </div>

        <StepNavigation
          onNext={handleGenerate}
          nextDisabled={!agreed}
          nextLabel="开始生成诊断"
          backHref="/diagnosis/context"
        />
      </div>
      <Footer />
    </div>
  );
}
