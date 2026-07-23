"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDiagnosis } from "@/hooks/useDiagnosis";
import { StepNavigation } from "@/components/diagnosis/StepNavigation";
import { SCENARIOS } from "@/lib/constants";
import { type DiagnosisScenario } from "@/types/diagnosis";
import { EyeOff, MessageCircle, ShoppingCart, Heart, RefreshCw, HelpCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  EyeOff, MessageCircle, ShoppingCart, Heart, RefreshCw, HelpCircle,
};

export function ScenarioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, setScenario } = useDiagnosis();

  const preselected = searchParams.get("select") as DiagnosisScenario | null;

  const initialSelection = useMemo(() => {
    if (preselected && SCENARIOS.some((s) => s.value === preselected)) {
      return preselected;
    }
    return state.scenario;
  }, [preselected, state.scenario]);

  const [selected, setSelected] = useState<DiagnosisScenario | null>(initialSelection);

  const handleNext = useCallback(() => {
    if (selected) {
      setScenario(selected);
      router.push("/diagnosis/product");
    }
  }, [selected, setScenario, router]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-[#1F2430] mb-2">选择问题场景</h1>
          <p className="text-sm text-text-secondary">选择最符合你当前情况的场景，帮助我们更准确地定位问题</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SCENARIOS.map((s) => {
            const Icon = iconMap[s.icon] || HelpCircle;
            const isSelected = selected === s.value;
            return (
              <button
                key={s.value}
                onClick={() => setSelected(s.value)}
                className={`text-left p-5 rounded-[14px] border-2 transition-all ${
                  isSelected
                    ? "border-brand bg-brand-light shadow-sm"
                    : "border-[#E5E8EF] bg-white hover:border-brand/50"
                }`}
              >
                <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center mb-3 ${
                  isSelected ? "bg-brand text-white" : "bg-brand-light text-brand"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-[#1F2430] mb-1">{s.label}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{s.description}</p>
              </button>
            );
          })}
        </div>

        <StepNavigation
          onNext={handleNext}
          nextDisabled={!selected}
          nextLabel="下一步"
          backHref="/"
        />
      </div>
      <Footer />
    </div>
  );
}
