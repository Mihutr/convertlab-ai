export type DiagnosisScenario =
  | "no_views"
  | "views_no_inquiry"
  | "inquiry_no_purchase"
  | "saved_no_purchase"
  | "no_repurchase"
  | "unclear";

export type DataSource = "platform_accurate" | "self_recorded" | "estimated" | "unknown";

export type DataAvailability = "known" | "unknown" | "not_applicable";

export type ProductCondition = "new" | "used" | "service";

export type RejectionReason =
  | "price_high"
  | "quality_concern"
  | "authenticity_concern"
  | "no_after_sales"
  | "still_comparing"
  | "not_needed_now"
  | "logistics_issue"
  | "other";

export interface ProductInfo {
  productName: string;
  category: string;
  platform: string;
  price: number | null;
  condition: ProductCondition | "";
  targetUser: string;
  diagnosisPeriod: string;
  title: string;
  description: string;
}

export interface MetricField {
  value: number | null;
  availability: DataAvailability;
}

export interface BusinessMetrics {
  dataSource: DataSource | "";
  impressions: MetricField;
  views: MetricField;
  favorites: MetricField;
  cartAdds: MetricField;
  inquiries: MetricField;
  orders: MetricField;
  firstTimeBuyers: MetricField;
  repeatBuyers: MetricField;
}

export interface CustomerContext {
  commonQuestions: string;
  stopPoint: string;
  rejectionReasons: RejectionReason[];
  sellerPerceivedProblem: string;
  attemptedChanges: string;
  changeResults: string;
  additionalNotes: string;
}

export type CompletenessLevel = "sufficient" | "insufficient" | "severely_insufficient";

export interface CompletenessResult {
  level: CompletenessLevel;
  providedFields: string[];
  missingFields: string[];
  canDiagnose: boolean;
  followUpQuestions?: string[];
  uncertaintyNote: string;
}

export interface EvidenceCard {
  id: string;
  title: string;
  source: string;
  evidenceLevel: "A" | "B" | "C";
  content: string;
  supportConclusion: string;
}

export interface PossibleCause {
  id: string;
  description: string;
  evidenceStrength: "strong" | "moderate" | "needs_verification";
}

export interface ActionTask {
  id: string;
  title: string;
  priority: number;
  cost: "low" | "medium" | "high";
  observationPeriod: string;
  steps: string[];
  sampleCopy?: string;
  verificationMethod: string;
}

export interface UserFeedback {
  accuracy: number | null;
  usefulness: number | null;
  adopted: boolean | null;
  notApplicableReason: string;
  openFeedback: string;
}

export interface DiagnosisReport {
  completenessLevel: CompletenessLevel;
  confidenceLevel: "high" | "medium" | "low";
  primaryIssue: string;
  summary: string;
  knownFacts: string[];
  possibleCauses: PossibleCause[];
  evidence: EvidenceCard[];
  actionTasks: ActionTask[];
  verification: string;
  riskNote: string;
}

export interface DiagnosisFormData {
  scenario: DiagnosisScenario | null;
  product: ProductInfo;
  metrics: BusinessMetrics;
  context: CustomerContext;
  currentStep: number;
  confirmed: boolean;
}

export type DiagnosisAction =
  | { type: "SET_SCENARIO"; payload: DiagnosisScenario }
  | { type: "SET_PRODUCT"; payload: ProductInfo }
  | { type: "SET_METRICS"; payload: BusinessMetrics }
  | { type: "SET_CONTEXT"; payload: CustomerContext }
  | { type: "SET_CONFIRMED"; payload: boolean }
  | { type: "LOAD_DRAFT"; payload: DiagnosisFormData }
  | { type: "CLEAR_ALL" };
