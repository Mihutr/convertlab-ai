import { DiagnosisFormData } from "@/types/diagnosis";
import { DRAFT_KEY } from "./constants";

export function getDraft(): DiagnosisFormData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DiagnosisFormData;
  } catch {
    return null;
  }
}

export function saveDraft(data: DiagnosisFormData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  } catch {
    // storage full - silently fail
  }
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // silently fail
  }
}
