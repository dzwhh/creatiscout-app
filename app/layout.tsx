import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CreatiScout · 数字员工营销工作台",
  description: "派活给数字员工，让 KOL 营销自动跑通 brief → 达人 → 内容 → 投放 → 复盘。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="h-screen overflow-hidden bg-page text-ink">{children}</body>
    </html>
  );
}
