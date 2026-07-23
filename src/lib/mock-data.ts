import { DiagnosisReport } from "@/types/diagnosis";

export const MOCK_REPORT: DiagnosisReport = {
  completenessLevel: "sufficient",
  confidenceLevel: "medium",
  primaryIssue: "当前最值得优先检查的是咨询后的信任与决策环节。",
  summary: "你当前不是缺少浏览，而是需要优先解决用户咨询后的信任问题。",
  knownFacts: [
    "最近14天浏览300次",
    "18人咨询",
    "成交2笔",
    "用户经常询问真伪、价格和售后",
    "已经尝试降价，但成交没有明显变化",
  ],
  possibleCauses: [
    {
      id: "cause-1",
      description: "商品页面缺少可验证的真实性信息",
      evidenceStrength: "strong",
    },
    {
      id: "cause-2",
      description: "商品价值与价格之间的关系表达不足",
      evidenceStrength: "moderate",
    },
    {
      id: "cause-3",
      description: "咨询回复没有主动降低交易风险",
      evidenceStrength: "needs_verification",
    },
  ],
  evidence: [
    {
      id: "evidence-1",
      title: "二手数码商品信任信息检查规则",
      source: "运营规则库",
      evidenceLevel: "B",
      content: "二手数码商品（尤其是相机、手机等高单价品类）在闲鱼等C2C平台交易时，买家最主要的决策障碍是信任。当用户反复询问真伪和售后问题时，说明商品页面的信任信息不足以支撑购买决策。",
      supportConclusion: "当用户反复询问真伪和售后时，应优先补充可验证的信任证明。",
    },
    {
      id: "evidence-2",
      title: "咨询后未成交问题排查清单",
      source: "案例库",
      evidenceLevel: "B",
      content: "在分析咨询未成交案例时，常见的误判是将所有问题归因于价格。实际案例中，约40%的咨询未成交与价格无关，而是与信息透明度、沟通效率和信任建立有关。如果降价后成交无明显变化，应优先排查信任和信息完整度问题。",
      supportConclusion: "降价后成交无明显变化时，价格可能不是唯一主要问题。",
    },
  ],
  actionTasks: [
    {
      id: "task-1",
      title: "补充购买凭证、序列号和商品细节",
      priority: 1,
      cost: "low",
      observationPeriod: "7天",
      steps: [
        "拍摄清晰的购买凭证照片（可隐去敏感信息）",
        "拍摄机身序列号特写",
        "补充商品使用时长和快门数等信息",
        "在商品描述中说明配件清单和成色细节",
      ],
      sampleCopy: "个人自用富士相机，支持查看购买记录和机身序列号。机身功能正常，配件和成色均有实拍，可当面验机或通过平台担保交易。",
      verificationMethod: "观察真伪相关咨询是否减少",
    },
    {
      id: "task-2",
      title: "在商品首屏说明配件、成色和验货方式",
      priority: 2,
      cost: "low",
      observationPeriod: "7天",
      steps: [
        "将配件清单放在商品描述前3行",
        "用实拍图展示商品各角度成色",
        "明确写出支持的验货方式和交易保障",
        "添加「支持平台验货」标签（如平台支持）",
      ],
      verificationMethod: "观察咨询后成交比例是否提高",
    },
    {
      id: "task-3",
      title: "测试新的咨询回复话术",
      priority: 3,
      cost: "low",
      observationPeriod: "7天",
      steps: [
        "准备主动说明真伪验证方式的回复模板",
        "在回复中主动提及售后保障",
        "提供灵活的验货方案（面交、视频验机等）",
        "记录不同话术的咨询转成交率",
      ],
      sampleCopy: "您好，这台相机是个人自用，可以提供购买记录和序列号验证。如果您方便的话，支持当面验机，也可以走平台担保交易。有任何疑问随时问我。",
      verificationMethod: "比较不同话术的咨询转成交率",
    },
  ],
  verification: "保持价格暂时不变，连续观察7天：真伪和售后相关重复咨询是否减少；咨询后成交比例是否提高。",
  riskNote: "因为缺少同类商品价格和更多长期数据，当前无法确认价格是否高于市场水平，不建议仅依据本次诊断继续降价。",
};

export const MOCK_SCENARIOS = [
  {
    value: "no_views" as const,
    title: "商品发布后几乎没人看",
    desc: "曝光或浏览数据明显偏低，商品难以被目标用户发现",
    icon: "EyeOff",
  },
  {
    value: "views_no_inquiry" as const,
    title: "有浏览但很少有人咨询",
    desc: "用户看到了商品但缺乏进一步了解的意愿",
    icon: "MessageCircle",
  },
  {
    value: "inquiry_no_purchase" as const,
    title: "有人咨询但没有购买",
    desc: "用户表现出兴趣但在决策环节流失",
    icon: "ShoppingCart",
  },
  {
    value: "saved_no_purchase" as const,
    title: "有收藏或加购但没有购买",
    desc: "用户有购买意愿但未完成最终转化",
    icon: "Heart",
  },
  {
    value: "no_repurchase" as const,
    title: "有首次购买但很少复购",
    desc: "首购体验尚可但缺乏持续复购动力",
    icon: "RefreshCw",
  },
  {
    value: "unclear" as const,
    title: "不清楚问题在哪里",
    desc: "不确定主要卡在哪个环节，需要系统排查",
    icon: "HelpCircle",
  },
];
