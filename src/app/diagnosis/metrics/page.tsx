"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDiagnosis } from "@/hooks/useDiagnosis";
import { useStepGuard } from "@/hooks/useStepGuard";
import { StepNavigation } from "@/components/diagnosis/StepNavigation";
import { businessMetricsSchema, type BusinessMetricsFormData } from "@/lib/validators";
import type { DataAvailability } from "@/types/diagnosis";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AlertTriangle } from "lucide-react";

const AVAILABILITY_OPTIONS: { value: DataAvailability; label: string }[] = [
  { value: "known", label: "已知" },
  { value: "unknown", label: "不知道" },
  { value: "not_applicable", label: "不适用" },
];

const DATA_SOURCE_OPTIONS = [
  { value: "platform_accurate", label: "平台准确数据" },
  { value: "self_recorded", label: "自己记录" },
  { value: "estimated", label: "大致估算" },
  { value: "unknown", label: "不确定" },
];

type MetricKey = "impressions" | "views" | "favorites" | "cartAdds" | "inquiries" | "orders" | "firstTimeBuyers" | "repeatBuyers";

const METRIC_FIELDS: { key: MetricKey; label: string; placeholder: string }[] = [
  { key: "impressions", label: "曝光量", placeholder: "例如：5000" },
  { key: "views", label: "浏览量", placeholder: "例如：300" },
  { key: "favorites", label: "收藏量", placeholder: "例如：15" },
  { key: "cartAdds", label: "加购量", placeholder: "例如：8" },
  { key: "inquiries", label: "咨询人数", placeholder: "例如：18" },
  { key: "orders", label: "成交量", placeholder: "例如：2" },
  { key: "firstTimeBuyers", label: "首购人数", placeholder: "例如：2" },
  { key: "repeatBuyers", label: "复购人数", placeholder: "例如：0" },
];

export default function MetricsPage() {
  const router = useRouter();
  const { state, setMetrics } = useDiagnosis();
  useStepGuard("/diagnosis/metrics");
  const [conflicts, setConflicts] = useState<string[]>([]);

  const metricsState = state.metrics;

  const { register, handleSubmit, setValue, formState: { errors }, control } = useForm<BusinessMetricsFormData>({
    resolver: zodResolver(businessMetricsSchema),
    defaultValues: {
      dataSource: metricsState.dataSource || "",
      impressions: metricsState.impressions,
      views: metricsState.views,
      favorites: metricsState.favorites,
      cartAdds: metricsState.cartAdds,
      inquiries: metricsState.inquiries,
      orders: metricsState.orders,
      firstTimeBuyers: metricsState.firstTimeBuyers,
      repeatBuyers: metricsState.repeatBuyers,
    },
  });

  const watchedMetrics = useWatch({ control });

  const onSubmit = useCallback(
    (data: BusinessMetricsFormData) => {
      const newConflicts: string[] = [];
      const inquiriesVal = data.inquiries.value;
      const viewsVal = data.views.value;
      const ordersVal = data.orders.value;

      if (
        inquiriesVal !== null && viewsVal !== null &&
        data.inquiries.availability === "known" && data.views.availability === "known" &&
        inquiriesVal > viewsVal
      ) {
        newConflicts.push("咨询人数大于浏览量，请检查数据是否准确");
      }
      if (
        ordersVal !== null && viewsVal !== null &&
        data.orders.availability === "known" && data.views.availability === "known" &&
        ordersVal > viewsVal
      ) {
        newConflicts.push("成交量大于浏览量，请检查数据是否准确");
      }

      setConflicts(newConflicts);

      setMetrics(data as Required<BusinessMetricsFormData>);
      router.push("/diagnosis/context");
    },
    [setMetrics, router]
  );

  const handleSaveDraft = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-[#1F2430] mb-2">经营表现</h1>
          <p className="text-sm text-text-secondary">填写商品的关键经营数据。不知道或不适用某个数字时，选择对应选项即可，不会被当作0处理。</p>
        </div>

        {conflicts.length > 0 && (
          <div className="mb-6 p-4 rounded-[14px] bg-orange-50 border border-warning/30">
            {conflicts.map((msg, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-warning">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{msg}</span>
              </div>
            ))}
          </div>
        )}

        <form id="metrics-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-5 sm:p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#1F2430] mb-1.5">
                数据来源 <span className="text-error">*</span>
              </label>
              <select
                {...register("dataSource")}
                className="w-full h-11 px-4 rounded-[10px] border border-[#E5E8EF] text-sm text-[#1F2430] bg-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
              >
                <option value="">请选择数据来源</option>
                {DATA_SOURCE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.dataSource && (
                <p className="mt-1 text-xs text-error">{(errors.dataSource as { message?: string }).message}</p>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-4 px-4 pb-2 text-xs text-text-secondary">
              <span className="w-24 flex-shrink-0"></span>
              <span className="w-40">数量</span>
              <span className="flex gap-3">
                {AVAILABILITY_OPTIONS.map((opt) => (
                  <span key={opt.value} className="w-12">{opt.label}</span>
                ))}
              </span>
            </div>

            <div className="sm:hidden text-xs text-text-secondary mb-3">每个字段: 先填数字，再选状态</div>

            {METRIC_FIELDS.map(({ key, label, placeholder }) => (
              <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-3 border-b border-[#E5E8EF] last:border-b-0">
                <span className="text-sm text-[#1F2430] sm:w-24 flex-shrink-0">{label}</span>
                <input
                  type="number"
                  value={watchedMetrics[key]?.value ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setValue(`${key}.value`, v === "" ? null : Number(v));
                  }}
                  className="w-full sm:w-40 h-11 px-4 rounded-[10px] border border-[#E5E8EF] text-sm text-[#1F2430] placeholder:text-text-secondary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  placeholder={placeholder}
                  min="0"
                />
                <div className="flex gap-3">
                  {AVAILABILITY_OPTIONS.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        {...register(`${key}.availability`)}
                        value={opt.value}
                        className="w-4 h-4 text-brand accent-brand"
                      />
                      <span className="text-xs text-text-secondary">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </form>

        <StepNavigation
          onNext={handleSubmit(onSubmit)}
          nextLabel="下一步"
          backHref="/diagnosis/product"
          showSaveDraft
          onSaveDraft={handleSaveDraft}
          formId="metrics-form"
        />
      </div>
      <Footer />
    </div>
  );
}
