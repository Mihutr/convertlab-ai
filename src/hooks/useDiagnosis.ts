"use client";

import { useContext } from "react";
import { DiagnosisContext } from "@/contexts/DiagnosisContext";

export function useDiagnosis() {
  const context = useContext(DiagnosisContext);
  if (!context) {
    throw new Error("useDiagnosis must be used within a DiagnosisProvider");
  }
  return context;
}
