"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDiagnosis } from "@/hooks/useDiagnosis";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Check, Loader2, FileSearch, Target, Library, Lightbulb, ClipboardCheck } from "lucide-react";

const STEPS = [
  { label: "检查商品和经营数据", icon: FileSearch },
  { label: "定位可能的流失环节", icon: Target },
  { label: "检索相关规则与案例", icon: Library },
  { label: "生成优先行动建议", icon: Lightbulb },
  { label: "检查引用和报告结构", icon: ClipboardCheck },
];

export default function GeneratingPage() {
  const router = useRouter();
  const { state } = useDiagnosis();
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!state.confirmed) {
      router.replace("/diagnosis/confirm");
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      setCompleted((prev) => [...prev, index]);
      index++;
      if (index < STEPS.length) {
        setCurrentStep(index);
      } else {
        clearInterval(interval);
        // Navigate to report after a short delay
        setTimeout(() => {
          router.push("/diagnosis/report/demo");
        }, 500);
      }
    }, 800);

    timerRef.current = interval;

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.confirmed, router]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-brand animate-spin" />
            </div>
            <h1 className="text-xl font-semibold text-[#1F2430] mb-2">正在生成诊断报告</h1>
            <p className="text-sm text-text-secondary">系统正在分析你的数据，这大约需要几秒钟</p>
          </div>

          <div className="space-y-3">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isCompleted = completed.includes(idx);
              const isCurrent = idx === currentStep;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-4 rounded-[10px] transition-all ${
                    isCompleted
                      ? "bg-green-50"
                      : isCurrent
                      ? "bg-brand-light"
                      : "bg-gray-50 opacity-50"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCompleted
                        ? "bg-success text-white"
                        : isCurrent
                        ? "bg-brand text-white"
                        : "bg-gray-200 text-text-secondary"
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span
                    className={`text-sm ${
                      isCompleted ? "text-success" : isCurrent ? "text-brand font-medium" : "text-text-secondary"
                    }`}
                  >
                    {step.label}
                  </span>
                  {isCurrent && !isCompleted && (
                    <Loader2 className="w-4 h-4 text-brand animate-spin ml-auto" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-6 w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-brand h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(completed.length / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
