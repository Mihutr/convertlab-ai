"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import { STEPS } from "@/lib/constants";

export function ProgressBar() {
  const pathname = usePathname();
  const currentIndex = STEPS.findIndex((s) => pathname.startsWith(s.path));

  // Pages that aren't one of the 5 steps (completeness, generating, report)
  if (currentIndex === -1) {
    // For completeness and confirm, show step 4 as current
    if (pathname.startsWith("/diagnosis/completeness") || pathname.startsWith("/diagnosis/generating") || pathname.startsWith("/diagnosis/report")) {
      return (
        <div className="w-full bg-white border-b border-[#E5E8EF]">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {STEPS.map((step, idx) => (
                <div key={step.path} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                        idx < 4
                          ? "bg-brand text-white"
                          : idx === 4
                          ? "border-2 border-brand text-brand bg-white"
                          : "border-2 border-[#E5E8EF] text-text-secondary bg-white"
                      }`}
                    >
                      {idx < 4 ? <Check className="w-4 h-4" /> : idx + 1}
                    </div>
                    <span className="mt-2 text-xs text-text-secondary whitespace-nowrap hidden sm:block">
                      {step.label}
                    </span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 mt-[-16px] ${idx < 4 ? "bg-brand" : "bg-[#E5E8EF]"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="w-full bg-white border-b border-[#E5E8EF]">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {STEPS.map((step, idx) => (
            <div key={step.path} className="flex items-center flex-1 last:flex-none">
              <Link href={step.path} className="flex flex-col items-center no-underline">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    idx < currentIndex
                      ? "bg-brand text-white"
                      : idx === currentIndex
                      ? "border-2 border-brand text-brand bg-white"
                      : "border-2 border-[#E5E8EF] text-text-secondary bg-white"
                  }`}
                >
                  {idx < currentIndex ? <Check className="w-4 h-4" /> : idx + 1}
                </div>
                <span
                  className={`mt-2 text-xs whitespace-nowrap hidden sm:block ${
                    idx <= currentIndex ? "text-brand font-medium" : "text-text-secondary"
                  }`}
                >
                  {step.label}
                </span>
              </Link>
              {idx < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 mt-[-16px] ${
                    idx < currentIndex ? "bg-brand" : "bg-[#E5E8EF]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
