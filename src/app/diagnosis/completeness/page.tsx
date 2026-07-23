"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDiagnosis } from "@/hooks/useDiagnosis";
import { useStepGuard } from "@/hooks/useStepGuard";
import { StepNavigation } from "@/components/diagnosis/StepNavigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Check, AlertCircle, XCircle } from "lucide-react";
import type { CompletenessLevel } from "@/types/diagnosis";

export default function CompletenessPage() {
  const router = useRouter();
  const { state } = useDiagnosis();
  useStepGuard("/diagnosis/completeness");

  const result = useMemo(() => {
    const provided: string[] = [];
    const missing: string[] = [];

    // Product info
    if (state.product.productName) provided.push("商品名称");
    else missing.push("商品名称");
    if (state.product.category) provided.push("商品类别");
    else missing.push("商品类别");
    if (state.product.platform) provided.push("销售平台");
    else missing.push("销售平台");
    if (state.product.price !== null) provided.push("商品价格");
    else missing.push("商品价格");
    if (state.product.targetUser) provided.push("目标用户");
    else missing.push("目标用户");

    // Metrics
    if (state.metrics.dataSource) provided.push("数据来源");
    else missing.push("数据来源");
    const metricFields = [
      { key: "impressions", label: "曝光量" },
      { key: "views", label: "浏览量" },
      { key: "favorites", label: "收藏量" },
      { key: "inquiries", label: "咨询人数" },
      { key: "orders", label: "成交量" },
    ];
    metricFields.forEach(({ key, label }) => {
      const field = state.metrics[key as keyof typeof state.metrics] as { value: number | null; availability: string };
      if (field.availability === "known" && field.value !== null) provided.push(label);
      else if (field.availability === "unknown") missing.push(label);
    });

    // Context
    if (state.context.commonQuestions) provided.push("常见咨询");
    else missing.push("常见咨询");
    if (state.context.rejectionReasons.length > 0) provided.push("拒绝原因");
    else missing.push("拒绝原因");
    if (state.context.attemptedChanges) provided.push("已尝试调整");
    else missing.push("已尝试调整");

    const total = provided.length + missing.length;
    const score = total > 0 ? provided.length / total : 0;

    let level: CompletenessLevel;
    let uncertaintyNote: string;

    if (score >= 0.6) {
      level = "sufficient";
      uncertaintyNote = "当前可以完成初步诊断，但部分判断存在不确定性。";
    } else if (score >= 0.3) {
      level = "insufficient";
      uncertaintyNote = "信息不足，诊断结论可能不够准确，建议补充以下问题。";
    } else {
      level = "severely_insufficient";
      uncertaintyNote = "信息严重不足，无法进行准确诊断。你可以返回补充信息，或生成一份基础检查清单。";
    }

    return {
      level,
      provided,
      missing,
      score,
      uncertaintyNote,
      followUpQuestions:
        level === "insufficient"
          ? ["用户通常在咨询的哪一步停止沟通？", "有没有已尝试但未见效果的调整？", "用户咨询时最常问什么问题？"]
          : undefined,
    };
  }, [state]);

  const levelConfig = {
    sufficient: {
      icon: Check,
      label: "信息基本充分",
      color: "text-success",
      bg: "bg-green-50",
      border: "border-success/30",
    },
    insufficient: {
      icon: AlertCircle,
      label: "信息不足",
      color: "text-warning",
      bg: "bg-orange-50",
      border: "border-warning/30",
    },
    severely_insufficient: {
      icon: XCircle,
      label: "信息严重不足",
      color: "text-error",
      bg: "bg-red-50",
      border: "border-error/30",
    },
  };

  const config = levelConfig[result.level];
  const Icon = config.icon;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-[#1F2430] mb-2">信息完整度检查</h1>
          <p className="text-sm text-text-secondary">检查已填写的信息是否足以完成诊断</p>
        </div>

        {/* Status Banner */}
        <div className={`mb-6 p-5 rounded-[14px] border ${config.bg} ${config.border}`}>
          <div className="flex items-center gap-3 mb-2">
            <Icon className={`w-6 h-6 ${config.color}`} />
            <span className={`text-lg font-semibold ${config.color}`}>{config.label}</span>
          </div>
          <p className="text-sm text-text-secondary">{result.uncertaintyNote}</p>
        </div>

        {/* Provided Fields */}
        <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-5 sm:p-6 mb-4">
          <h3 className="text-sm font-semibold text-[#1F2430] mb-3">
            已提供 ({result.provided.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.provided.map((field) => (
              <span
                key={field}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-green-50 text-success"
              >
                <Check className="w-3 h-3" />
                {field}
              </span>
            ))}
          </div>
        </div>

        {/* Missing Fields */}
        {result.missing.length > 0 && (
          <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-5 sm:p-6 mb-4">
            <h3 className="text-sm font-semibold text-[#1F2430] mb-3">
              仍缺少 ({result.missing.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.missing.map((field) => (
                <span
                  key={field}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-gray-100 text-text-secondary"
                >
                  {field}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Follow-up Questions for insufficient */}
        {result.followUpQuestions && (
          <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-5 sm:p-6 mb-4">
            <h3 className="text-sm font-semibold text-[#1F2430] mb-3">建议补充以下信息</h3>
            <ul className="space-y-2">
              {result.followUpQuestions.map((q, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-light text-brand flex items-center justify-center text-xs mt-0.5">
                    {i + 1}
                  </span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        )}

        <StepNavigation
          onNext={() => router.push("/diagnosis/confirm")}
          nextLabel={result.level === "severely_insufficient" ? "仍要继续诊断" : "继续诊断"}
          backHref="/diagnosis/context"
        />
      </div>
      <Footer />
    </div>
  );
}
