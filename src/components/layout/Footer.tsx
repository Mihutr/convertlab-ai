import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#E5E8EF] bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#1F2430]">ConvertLab</span>
            <span className="text-xs text-text-secondary">AI商品转化诊断助手</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/diagnosis/scenario" className="text-xs text-text-secondary hover:text-text-primary">
              开始诊断
            </Link>
            <Link href="/example" className="text-xs text-text-secondary hover:text-text-primary">
              示例报告
            </Link>
          </div>
          <p className="text-xs text-text-secondary">
            诊断基于用户提供的信息，不承诺直接提升销量
          </p>
        </div>
      </div>
    </footer>
  );
}
