"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDiagnosis } from "@/hooks/useDiagnosis";
import { useStepGuard } from "@/hooks/useStepGuard";
import { StepNavigation } from "@/components/diagnosis/StepNavigation";
import { REJECTION_REASON_OPTIONS } from "@/lib/constants";
import type { RejectionReason } from "@/types/diagnosis";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface ContextFormData {
  commonQuestions: string;
  stopPoint: string;
  rejectionReasons: RejectionReason[];
  sellerPerceivedProblem: string;
  attemptedChanges: string;
  changeResults: string;
  additionalNotes: string;
}

export default function ContextPage() {
  const router = useRouter();
  const { state, setContext } = useDiagnosis();
  useStepGuard("/diagnosis/context");

  const ctx = state.context;

  const [rejectionReasons, setRejectionReasons] = useState<RejectionReason[]>(ctx.rejectionReasons || []);

  const { register, handleSubmit } = useForm<ContextFormData>({
    defaultValues: {
      commonQuestions: ctx.commonQuestions || "",
      stopPoint: ctx.stopPoint || "",
      rejectionReasons: ctx.rejectionReasons || [],
      sellerPerceivedProblem: ctx.sellerPerceivedProblem || "",
      attemptedChanges: ctx.attemptedChanges || "",
      changeResults: ctx.changeResults || "",
      additionalNotes: ctx.additionalNotes || "",
    },
  });

  const toggleReason = (value: RejectionReason) => {
    setRejectionReasons((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]
    );
  };

  const onSubmit = useCallback(
    (data: ContextFormData) => {
      setContext({
        ...data,
        rejectionReasons,
      });
      router.push("/diagnosis/completeness");
    },
    [setContext, router, rejectionReasons]
  );

  const handleSaveDraft = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-[#1F2430] mb-2">补充销售情况</h1>
          <p className="text-sm text-text-secondary">补充用户咨询和反馈信息，帮助更准确地判断问题原因</p>
        </div>

        <form id="context-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-5 sm:p-6 space-y-5">
            {/* Common Questions */}
            <div>
              <label className="block text-sm font-medium text-[#1F2430] mb-1.5">
                用户最常询问什么
              </label>
              <textarea
                {...register("commonQuestions")}
                rows={2}
                className="w-full px-4 py-3 rounded-[10px] border border-[#E5E8EF] text-sm text-[#1F2430] placeholder:text-text-secondary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand resize-none"
                placeholder="例如：是否正品、能否便宜、有没有售后"
              />
            </div>

            {/* Stop Point */}
            <div>
              <label className="block text-sm font-medium text-[#1F2430] mb-1.5">
                用户通常在哪一步停止沟通
              </label>
              <input
                {...register("stopPoint")}
                className="w-full h-11 px-4 rounded-[10px] border border-[#E5E8EF] text-sm text-[#1F2430] placeholder:text-text-secondary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                placeholder="例如：询问价格后、要求看实物图后"
              />
            </div>

            {/* Rejection Reasons */}
            <div>
              <label className="block text-sm font-medium text-[#1F2430] mb-1.5">
                用户明确表达的拒绝原因（可多选）
              </label>
              <div className="flex flex-wrap gap-2">
                {REJECTION_REASON_OPTIONS.map((opt) => {
                  const isSelected = rejectionReasons.includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => toggleReason(opt.value)}
                      className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                        isSelected
                          ? "bg-brand text-white"
                          : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Seller Perceived Problem */}
            <div>
              <label className="block text-sm font-medium text-[#1F2430] mb-1.5">
                你认为问题出在哪里
              </label>
              <textarea
                {...register("sellerPerceivedProblem")}
                rows={2}
                className="w-full px-4 py-3 rounded-[10px] border border-[#E5E8EF] text-sm text-[#1F2430] placeholder:text-text-secondary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand resize-none"
                placeholder="你觉得主要卡在哪个环节"
              />
            </div>

            {/* Attempted Changes */}
            <div>
              <label className="block text-sm font-medium text-[#1F2430] mb-1.5">
                已经尝试过的调整
              </label>
              <textarea
                {...register("attemptedChanges")}
                rows={2}
                className="w-full px-4 py-3 rounded-[10px] border border-[#E5E8EF] text-sm text-[#1F2430] placeholder:text-text-secondary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand resize-none"
                placeholder="例如：降价、修改标题、换主图"
              />
            </div>

            {/* Change Results */}
            <div>
              <label className="block text-sm font-medium text-[#1F2430] mb-1.5">
                调整后发生了什么
              </label>
              <input
                {...register("changeResults")}
                className="w-full h-11 px-4 rounded-[10px] border border-[#E5E8EF] text-sm text-[#1F2430] placeholder:text-text-secondary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                placeholder="例如：成交没有明显变化"
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-[#1F2430] mb-1.5">
                其他补充情况
              </label>
              <textarea
                {...register("additionalNotes")}
                rows={2}
                className="w-full px-4 py-3 rounded-[10px] border border-[#E5E8EF] text-sm text-[#1F2430] placeholder:text-text-secondary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand resize-none"
                placeholder="任何其他你觉得重要的信息"
              />
            </div>
          </div>
        </form>

        <StepNavigation
          onNext={handleSubmit(onSubmit)}
          nextLabel="下一步"
          backHref="/diagnosis/metrics"
          showSaveDraft
          onSaveDraft={handleSaveDraft}
          formId="context-form"
        />
      </div>
      <Footer />
    </div>
  );
}
