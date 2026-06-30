"use client";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useUIStore } from "@/lib/store/ui-store";

const archive = [
  {
    title: "建一个 618 美妆 campaign",
    summary: "已创建 campaign · 预算 5 万 · 第一轮达人候选已推荐",
    ts: "今天 10:21",
    tag: "campaign",
  },
  {
    title: "给上周没回的达人补发跟进",
    summary: "起草 8 封跟进邮件，已发送 6 封，回收 3 个回复",
    tag: "外联",
    ts: "昨天 16:08",
  },
  {
    title: "拉一批秋冬服装类达人候选",
    summary: "已交付 18 位候选 · 等你审核",
    tag: "达人",
    ts: "3 天前",
  },
];

export default function ChatsPage() {
  const openChat = useUIStore((s) => s.openChat);
  return (
    <div className="space-y-5 p-7 lg:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-semibold text-ink">对话任务</h2>
        <button
          type="button"
          onClick={() => openChat()}
          className="rounded-full bg-brand-strong px-4 py-2 text-[13px] font-medium text-white hover:bg-[#D81D63]"
        >
          + 新建对话
        </button>
      </div>
      <ul className="space-y-2.5">
        {archive.map((a, i) => (
          <li
            key={i}
            className="flex cursor-pointer items-center gap-4 rounded-2xl border border-border bg-surface p-4 hover:bg-surface"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-soft-pink">
              <MessageSquare className="h-4 w-4 text-brand-strong" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-ink">{a.title}</span>
                <Badge tone="lavender">{a.tag}</Badge>
              </div>
              <p className="mt-0.5 text-[12px] text-slate">{a.summary}</p>
            </div>
            <span className="text-[11px] text-muted">{a.ts}</span>
            <ArrowRight className="h-4 w-4 text-muted" />
          </li>
        ))}
      </ul>
    </div>
  );
}
