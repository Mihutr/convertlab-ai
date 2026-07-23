import { ProgressBar } from "@/components/diagnosis/ProgressBar";

export default function DiagnosisLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FC]">
      <ProgressBar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
