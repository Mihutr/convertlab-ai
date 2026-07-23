import { DiagnosisScenario } from "@/types/diagnosis";

export const STEPS = [
  { label: "选择场景", path: "/diagnosis/scenario" },
  { label: "商品信息", path: "/diagnosis/product" },
  { label: "经营表现", path: "/diagnosis/metrics" },
  { label: "补充情况", path: "/diagnosis/context" },
  { label: "确认信息", path: "/diagnosis/confirm" },
] as const;

export const SCENARIOS: { value: DiagnosisScenario; label: string; description: string; icon: string }[] = [
  {
    value: "no_views",
    label: "商品发布后几乎没人看",
    description: "曝光或浏览数据明显偏低，商品难以被目标用户发现",
    icon: "EyeOff",
  },
  {
    value: "views_no_inquiry",
    label: "有浏览但很少有人咨询",
    description: "用户看到了商品但缺乏进一步了解的意愿",
    icon: "MessageCircle",
  },
  {
    value: "inquiry_no_purchase",
    label: "有人咨询但没有购买",
    description: "用户表现出兴趣但在决策环节流失",
    icon: "ShoppingCart",
  },
  {
    value: "saved_no_purchase",
    label: "有收藏或加购但没有购买",
    description: "用户有购买意愿但未完成最终转化",
    icon: "Heart",
  },
  {
    value: "no_repurchase",
    label: "有首次购买但很少复购",
    description: "首购体验尚可但缺乏持续复购动力",
    icon: "RefreshCw",
  },
  {
    value: "unclear",
    label: "不清楚问题在哪里",
    description: "不确定主要卡在哪个环节，需要系统排查",
    icon: "HelpCircle",
  },
];

export const CATEGORIES = [
  "服装鞋包", "数码电子", "家居用品", "美妆护肤", "食品饮料",
  "母婴用品", "运动户外", "图书文具", "玩具乐器", "珠宝首饰",
  "汽车用品", "宠物用品", "其他",
];

export const PLATFORMS = [
  "闲鱼", "淘宝", "京东", "拼多多", "抖音", "快手", "小红书", "微信", "转转", "其他",
];

export const REJECTION_REASON_OPTIONS = [
  { value: "price_high" as const, label: "价格高" },
  { value: "quality_concern" as const, label: "担心质量" },
  { value: "authenticity_concern" as const, label: "担心真实性" },
  { value: "no_after_sales" as const, label: "缺少售后" },
  { value: "still_comparing" as const, label: "继续比较" },
  { value: "not_needed_now" as const, label: "暂时不需要" },
  { value: "logistics_issue" as const, label: "物流不合适" },
  { value: "other" as const, label: "其他" },
];

export const DRAFT_KEY = "convertlab_draft";
