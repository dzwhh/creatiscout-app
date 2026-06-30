import { Brain, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const memory = [
  { tag: "用户偏好", text: "偏好夏日清爽调性，文案避免油腻形容词。", source: "618 美妆", ts: "3 天前" },
  { tag: "决策", text: "报价超 ¥10k 一律转人工，曾因自动同意导致超预算。", source: "520 礼盒", ts: "1 周前" },
  { tag: "技能", text: "学到了「先痛点后解决」的爆款脚本结构。", source: "Context Lab", ts: "27 天前" },
  { tag: "工具", text: "TikTok 后台爬数据需要带 cookie，否则 401。", source: "工程踩坑", ts: "20 天前" },
];

export default function MemoryPage() {
  return (
    <div className="space-y-5 p-7 lg:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-semibold text-ink">记忆</h2>
        <Button variant="soft">
          <Plus className="h-3.5 w-3.5" /> 手动添加记忆
        </Button>
      </div>
      <ul className="space-y-2.5">
        {memory.map((m, i) => (
          <li key={i} className="rounded-2xl border border-border bg-surface p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-soft-lavender">
                <Brain className="h-4 w-4 text-lavender-text" />
              </div>
              <Badge tone="lavender">{m.tag}</Badge>
              <span className="ml-auto text-[11px] text-muted">{m.source} · {m.ts}</span>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-ink">{m.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
