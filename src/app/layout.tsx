import type { Metadata } from "next";
import { DiagnosisProvider } from "@/contexts/DiagnosisContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "ConvertLab - AI商品转化诊断助手",
  description: "找出商品转化卡在哪里，知道下一步先改什么",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <DiagnosisProvider>{children}</DiagnosisProvider>
      </body>
    </html>
  );
}
