import { Suspense } from "react";
import { ScenarioContent } from "./scenario-content";

export default function ScenarioPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F7F8FC]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-text-secondary">加载中...</p>
        </div>
      </div>
    }>
      <ScenarioContent />
    </Suspense>
  );
}
