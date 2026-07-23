"use client";

import Link from "next/link";

interface StepNavigationProps {
  onNext?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  backHref?: string;
  showSaveDraft?: boolean;
  onSaveDraft?: () => void;
  formId?: string;
}

export function StepNavigation({
  onNext,
  nextDisabled = false,
  nextLabel = "下一步",
  backHref,
  showSaveDraft = false,
  onSaveDraft,
  formId,
}: StepNavigationProps) {
  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E5E8EF]">
      <div className="flex items-center gap-3">
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center justify-center h-11 px-5 rounded-[10px] border border-[#E5E8EF] text-sm text-text-secondary hover:bg-gray-50 transition-colors no-underline"
          >
            上一步
          </Link>
        )}
        {showSaveDraft && onSaveDraft && (
          <button
            type="button"
            onClick={onSaveDraft}
            className="inline-flex items-center justify-center h-11 px-5 rounded-[10px] border border-[#E5E8EF] text-sm text-text-secondary hover:bg-gray-50 transition-colors"
          >
            保存草稿
          </button>
        )}
      </div>
      {onNext && (
        <button
          type={formId ? "submit" : "button"}
          form={formId}
          onClick={formId ? undefined : onNext}
          disabled={nextDisabled}
          className={`inline-flex items-center justify-center h-11 px-6 rounded-[10px] text-sm font-medium transition-colors ${
            nextDisabled
              ? "bg-[#E5E8EF] text-text-secondary cursor-not-allowed"
              : "bg-brand text-white hover:bg-brand-hover"
          }`}
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}
