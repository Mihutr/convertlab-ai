"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDiagnosis } from "@/hooks/useDiagnosis";
import { useStepGuard } from "@/hooks/useStepGuard";
import { StepNavigation } from "@/components/diagnosis/StepNavigation";
import { productInfoSchema, type ProductInfoFormData } from "@/lib/validators";
import { CATEGORIES, PLATFORMS } from "@/lib/constants";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ProductPage() {
  const router = useRouter();
  const { state, setProduct } = useDiagnosis();
  useStepGuard("/diagnosis/product");

  const { register, handleSubmit, control, formState: { errors } } = useForm<ProductInfoFormData>({
    resolver: zodResolver(productInfoSchema),
    defaultValues: {
      productName: state.product.productName || "",
      category: state.product.category || "",
      platform: state.product.platform || "",
      price: state.product.price,
      condition: state.product.condition || "",
      targetUser: state.product.targetUser || "",
      diagnosisPeriod: state.product.diagnosisPeriod || "",
      title: state.product.title || "",
      description: state.product.description || "",
    },
  });

  const onSubmit = useCallback(
    (data: ProductInfoFormData) => {
      setProduct({
        productName: data.productName,
        category: data.category,
        platform: data.platform,
        price: data.price,
        condition: data.condition || "",
        targetUser: data.targetUser,
        diagnosisPeriod: data.diagnosisPeriod || "",
        title: data.title || "",
        description: data.description || "",
      });
      router.push("/diagnosis/metrics");
    },
    [setProduct, router]
  );

  const handleSaveDraft = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-[#1F2430] mb-2">商品信息</h1>
          <p className="text-sm text-text-secondary">填写商品的基本信息，帮助我们了解你在卖什么</p>
        </div>

        <form id="product-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="bg-white rounded-[14px] border border-[#E5E8EF] shadow-sm p-5 sm:p-6 space-y-5">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-[#1F2430] mb-1.5">
                商品名称 <span className="text-error">*</span>
              </label>
              <input
                {...register("productName")}
                className="w-full h-11 px-4 rounded-[10px] border border-[#E5E8EF] text-sm text-[#1F2430] placeholder:text-text-secondary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                placeholder="例如：富士 X-T30 II 相机"
              />
              {errors.productName && (
                <p className="mt-1 text-xs text-error">{errors.productName.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-[#1F2430] mb-1.5">
                  商品类别 <span className="text-error">*</span>
                </label>
                <select
                  {...register("category")}
                  className="w-full h-11 px-4 rounded-[10px] border border-[#E5E8EF] text-sm text-[#1F2430] bg-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                >
                  <option value="">请选择类别</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-xs text-error">{errors.category.message}</p>
                )}
              </div>

              {/* Platform */}
              <div>
                <label className="block text-sm font-medium text-[#1F2430] mb-1.5">
                  销售平台 <span className="text-error">*</span>
                </label>
                <select
                  {...register("platform")}
                  className="w-full h-11 px-4 rounded-[10px] border border-[#E5E8EF] text-sm text-[#1F2430] bg-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                >
                  <option value="">请选择平台</option>
                  {PLATFORMS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {errors.platform && (
                  <p className="mt-1 text-xs text-error">{errors.platform.message}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-[#1F2430] mb-1.5">
                  商品价格 (元) <span className="text-error">*</span>
                </label>
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="number"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val === "" ? null : Number(val));
                      }}
                      className="w-full h-11 px-4 rounded-[10px] border border-[#E5E8EF] text-sm text-[#1F2430] placeholder:text-text-secondary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                      placeholder="例如：3200"
                      min="0"
                      step="0.01"
                    />
                  )}
                />
                {errors.price && (
                  <p className="mt-1 text-xs text-error">{errors.price.message}</p>
                )}
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-medium text-[#1F2430] mb-1.5">
                  商品状态
                </label>
                <select
                  {...register("condition")}
                  className="w-full h-11 px-4 rounded-[10px] border border-[#E5E8EF] text-sm text-[#1F2430] bg-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                >
                  <option value="">请选择状态</option>
                  <option value="new">全新</option>
                  <option value="used">二手</option>
                  <option value="service">服务</option>
                </select>
              </div>

              {/* Target User */}
              <div>
                <label className="block text-sm font-medium text-[#1F2430] mb-1.5">
                  目标用户 <span className="text-error">*</span>
                </label>
                <input
                  {...register("targetUser")}
                  className="w-full h-11 px-4 rounded-[10px] border border-[#E5E8EF] text-sm text-[#1F2430] placeholder:text-text-secondary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  placeholder="例如：摄影爱好者、学生"
                />
                {errors.targetUser && (
                  <p className="mt-1 text-xs text-error">{errors.targetUser.message}</p>
                )}
              </div>

              {/* Diagnosis Period */}
              <div>
                <label className="block text-sm font-medium text-[#1F2430] mb-1.5">
                  诊断时间范围
                </label>
                <input
                  {...register("diagnosisPeriod")}
                  className="w-full h-11 px-4 rounded-[10px] border border-[#E5E8EF] text-sm text-[#1F2430] placeholder:text-text-secondary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  placeholder="例如：最近14天"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-[#1F2430] mb-1.5">
                商品标题
              </label>
              <input
                {...register("title")}
                className="w-full h-11 px-4 rounded-[10px] border border-[#E5E8EF] text-sm text-[#1F2430] placeholder:text-text-secondary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                placeholder="商品在平台上的标题（选填）"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[#1F2430] mb-1.5">
                商品描述
              </label>
              <textarea
                {...register("description")}
                rows={3}
                className="w-full px-4 py-3 rounded-[10px] border border-[#E5E8EF] text-sm text-[#1F2430] placeholder:text-text-secondary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand resize-none"
                placeholder="商品的详细描述（选填）"
              />
            </div>
          </div>
        </form>

        <StepNavigation
          onNext={handleSubmit(onSubmit)}
          nextLabel="下一步"
          backHref="/diagnosis/scenario"
          showSaveDraft
          onSaveDraft={handleSaveDraft}
          formId="product-form"
        />
      </div>
      <Footer />
    </div>
  );
}
