import { z } from "zod";

export const scenarioSchema = z.object({
  scenario: z.enum([
    "no_views",
    "views_no_inquiry",
    "inquiry_no_purchase",
    "saved_no_purchase",
    "no_repurchase",
    "unclear",
  ], { required_error: "请选择一个问题场景" }),
});

export const productInfoSchema = z.object({
  productName: z.string().min(1, "请输入商品名称"),
  category: z.string().min(1, "请选择商品类别"),
  platform: z.string().min(1, "请选择销售平台"),
  price: z.number({ invalid_type_error: "请输入有效价格" }).min(0, "价格不能小于0").nullable(),
  condition: z.enum(["new", "used", "service"]).optional().or(z.literal("")),
  targetUser: z.string().min(1, "请输入目标用户"),
  diagnosisPeriod: z.string().optional().or(z.literal("")),
  title: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
});

export const metricFieldSchema = z.object({
  value: z.number().nullable(),
  availability: z.enum(["known", "unknown", "not_applicable"]),
});

export const businessMetricsSchema = z.object({
  dataSource: z.union([
    z.enum(["platform_accurate", "self_recorded", "estimated", "unknown"]),
    z.literal(""),
  ], { required_error: "请选择数据来源" }),
  impressions: metricFieldSchema,
  views: metricFieldSchema,
  favorites: metricFieldSchema,
  cartAdds: metricFieldSchema,
  inquiries: metricFieldSchema,
  orders: metricFieldSchema,
  firstTimeBuyers: metricFieldSchema,
  repeatBuyers: metricFieldSchema,
});

export const customerContextSchema = z.object({
  commonQuestions: z.string().optional().or(z.literal("")),
  stopPoint: z.string().optional().or(z.literal("")),
  rejectionReasons: z.array(z.enum([
    "price_high", "quality_concern", "authenticity_concern", "no_after_sales",
    "still_comparing", "not_needed_now", "logistics_issue", "other",
  ])).optional(),
  sellerPerceivedProblem: z.string().optional().or(z.literal("")),
  attemptedChanges: z.string().optional().or(z.literal("")),
  changeResults: z.string().optional().or(z.literal("")),
  additionalNotes: z.string().optional().or(z.literal("")),
});

export type ScenarioFormData = z.infer<typeof scenarioSchema>;
export type ProductInfoFormData = z.infer<typeof productInfoSchema>;
export type BusinessMetricsFormData = z.infer<typeof businessMetricsSchema>;
export type CustomerContextFormData = z.infer<typeof customerContextSchema>;
