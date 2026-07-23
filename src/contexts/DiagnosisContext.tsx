"use client";

import React, { createContext, useReducer, useEffect, type ReactNode } from "react";
import {
  type DiagnosisFormData,
  type DiagnosisAction,
  type ProductInfo,
  type BusinessMetrics,
  type CustomerContext,
  type DiagnosisScenario,
  type MetricField,
} from "@/types/diagnosis";
import { getDraft, saveDraft, clearDraft } from "@/lib/storage";

const defaultMetricField: MetricField = { value: null, availability: "known" };

const defaultProduct: ProductInfo = {
  productName: "",
  category: "",
  platform: "",
  price: null,
  condition: "",
  targetUser: "",
  diagnosisPeriod: "",
  title: "",
  description: "",
};

const defaultMetrics: BusinessMetrics = {
  dataSource: "",
  impressions: { ...defaultMetricField },
  views: { ...defaultMetricField },
  favorites: { ...defaultMetricField },
  cartAdds: { ...defaultMetricField },
  inquiries: { ...defaultMetricField },
  orders: { ...defaultMetricField },
  firstTimeBuyers: { ...defaultMetricField },
  repeatBuyers: { ...defaultMetricField },
};

const defaultContext: CustomerContext = {
  commonQuestions: "",
  stopPoint: "",
  rejectionReasons: [],
  sellerPerceivedProblem: "",
  attemptedChanges: "",
  changeResults: "",
  additionalNotes: "",
};

const initialState: DiagnosisFormData = {
  scenario: null,
  product: defaultProduct,
  metrics: defaultMetrics,
  context: defaultContext,
  currentStep: 0,
  confirmed: false,
};

function diagnosisReducer(state: DiagnosisFormData, action: DiagnosisAction): DiagnosisFormData {
  switch (action.type) {
    case "SET_SCENARIO":
      return { ...state, scenario: action.payload };
    case "SET_PRODUCT":
      return { ...state, product: action.payload };
    case "SET_METRICS":
      return { ...state, metrics: action.payload };
    case "SET_CONTEXT":
      return { ...state, context: action.payload };
    case "SET_CONFIRMED":
      return { ...state, confirmed: action.payload };
    case "LOAD_DRAFT":
      return { ...state, ...action.payload };
    case "CLEAR_ALL":
      clearDraft();
      return { ...initialState };
    default:
      return state;
  }
}

interface DiagnosisContextType {
  state: DiagnosisFormData;
  dispatch: React.Dispatch<DiagnosisAction>;
  setScenario: (scenario: DiagnosisScenario) => void;
  setProduct: (product: ProductInfo) => void;
  setMetrics: (metrics: BusinessMetrics) => void;
  setContext: (context: CustomerContext) => void;
  setConfirmed: (confirmed: boolean) => void;
  clearAll: () => void;
}

export const DiagnosisContext = createContext<DiagnosisContextType | null>(null);

export function DiagnosisProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(diagnosisReducer, initialState);

  useEffect(() => {
    const draft = getDraft();
    if (draft) {
      dispatch({ type: "LOAD_DRAFT", payload: draft });
    }
  }, []);

  useEffect(() => {
    saveDraft(state);
  }, [state]);

  const setScenario = (scenario: DiagnosisScenario) =>
    dispatch({ type: "SET_SCENARIO", payload: scenario });
  const setProduct = (product: ProductInfo) =>
    dispatch({ type: "SET_PRODUCT", payload: product });
  const setMetrics = (metrics: BusinessMetrics) =>
    dispatch({ type: "SET_METRICS", payload: metrics });
  const setContext = (context: CustomerContext) =>
    dispatch({ type: "SET_CONTEXT", payload: context });
  const setConfirmed = (confirmed: boolean) =>
    dispatch({ type: "SET_CONFIRMED", payload: confirmed });
  const clearAll = () => dispatch({ type: "CLEAR_ALL" });

  return (
    <DiagnosisContext.Provider
      value={{ state, dispatch, setScenario, setProduct, setMetrics, setContext, setConfirmed, clearAll }}
    >
      {children}
    </DiagnosisContext.Provider>
  );
}
