"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Beaker } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E8EF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <Beaker className="w-6 h-6 text-brand" />
            <span className="text-lg font-semibold text-[#1F2430]">ConvertLab</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6">
            <Link
              href="/diagnosis/scenario"
              className={`text-sm ${pathname.startsWith("/diagnosis") ? "text-brand font-medium" : "text-text-secondary hover:text-text-primary"}`}
            >
              开始诊断
            </Link>
            <Link
              href="/example"
              className={`text-sm ${pathname === "/example" ? "text-brand font-medium" : "text-text-secondary hover:text-text-primary"}`}
            >
              示例报告
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
