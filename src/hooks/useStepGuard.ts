"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDiagnosis } from "./useDiagnosis";

const STEP_GUARDS: Record<string, (state: ReturnType<typeof useDiagnosis>["state"]) => boolean> = {
  "/diagnosis/scenario": () => true,
  "/diagnosis/product": (state) => state.scenario !== null,
  "/diagnosis/metrics": (state) => state.product.productName !== "",
  "/diagnosis/context": (state) => state.metrics.dataSource !== "",
  "/diagnosis/completeness": (state) => state.metrics.dataSource !== "",
  "/diagnosis/confirm": (state) => state.metrics.dataSource !== "",
  "/diagnosis/generating": (state) => state.confirmed === true,
  "/diagnosis/report/demo": () => true,
};

export function useStepGuard(pathname: string) {
  const { state } = useDiagnosis();
  const router = useRouter();

  useEffect(() => {
    const guard = STEP_GUARDS[pathname];
    if (guard && !guard(state)) {
      // Find the first step that's not complete
      if (!state.scenario) {
        router.replace("/diagnosis/scenario");
      } else if (state.product.productName === "") {
        router.replace("/diagnosis/product");
      } else if (state.metrics.dataSource === "") {
        router.replace("/diagnosis/metrics");
      } else {
        router.replace("/diagnosis/scenario");
      }
    }
  }, [pathname, state, router]);
}
