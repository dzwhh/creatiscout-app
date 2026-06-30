"use client";
import { Banknote, Boxes, FileText, Link2, Target, Users } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import type { Campaign } from "@/lib/types";
import { cn } from "@/lib/utils";
import { StepShell } from "./step-shell";

type SectionId = "basic" | "goal" | "budget" | "creator" | "content" | "logistics";

const sections: {
  id: SectionId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  fields: { k: string; v: string; tone?: "highlight" | "muted" }[];
}[] = [
  {
    id: "basic",
    label: "基本信息",
    icon: FileText,
    fields: [
      { k: "公司名称及官网", v: "蜜语 Honeylab · honeylab.com" },
      { k: "主推产品及 brief", v: "夏日清爽护肤限定礼盒（3 SKU）" },
      { k: "内容执行 brief", v: "强调「3 步快出门」与限定礼盒仪式感" },
      { k: "产品链接", v: "honeylab.com/p/summer-2026", tone: "highlight" },
      { k: "核心卖点", v: "1) 持妆 12h · 2) 限定礼盒包装 · 3) 通勤友好" },
      { k: "目标销售区域", v: "中国一线、新一线城市 + 北美华人圈" },
      { k: "用户画像与使用场景", v: "18-28 岁通勤女性，早晨快速妆容场景" },
      { k: "海外销售渠道", v: "TikTok Shop US / Amazon · 6 月上线" },
      { k: "对标竞品", v: "Glossier、Rare Beauty、Tower 28" },
    ],
  },
  {
    id: "goal",
    label: "推广目标",
    icon: Target,
    fields: [
      { k: "本次营销目标", v: "新品上市种草 + 礼盒首发种草转化" },
      { k: "核心 KPI", v: "曝光 5M / 互动 200k / GMV 80万 / ROI ≥ 2.5x" },
      { k: "期望上线时间", v: "6/15 - 6/30 集中爆发" },
      { k: "Timeline 要求", v: "5/20 brief 锁定 · 6/01 提报完成 · 6/15 首发" },
    ],
  },
  {
    id: "budget",
    label: "预算",
    icon: Banknote,
    fields: [
      { k: "总预算", v: "$50,000 USD", tone: "highlight" },
      { k: "投放节奏", v: "5/20-5/31 测试 30% · 6/01-6/15 爆发 50% · 6/16-6/30 长尾 20%" },
      { k: "预期达人数量", v: "15-20 位（micro 8-10 / mid 5-7 / 头部 1-2）" },
      { k: "单个红人价格预期", v: "$800 - $2,500（含置换）" },
    ],
  },
  {
    id: "creator",
    label: "红人要求",
    icon: Users,
    fields: [
      { k: "投放国家", v: "美国 / 加拿大 / 中国大陆" },
      { k: "语言要求", v: "英文为主 · 中文 30%" },
      { k: "投放平台", v: "TikTok / Instagram / 小红书" },
      { k: "达人类型", v: "美妆垂类 + 通勤生活方式" },
      { k: "性别及特点要求", v: "女性 90% · 25-32 岁通勤场景" },
      { k: "粉丝量级", v: "10k-500k（micro 为主）" },
      { k: "CPM / 均播要求", v: "CPM ≤ $5 · 平均播放 ≥ 50k" },
      { k: "报价货币", v: "USD" },
      { k: "理想红人案例", v: "@nara.smith · @brookelynne · @goodfornothingbeauty" },
    ],
  },
  {
    id: "content",
    label: "内容需求",
    icon: FileText,
    fields: [
      { k: "内容形式", v: "60s 视频 + 3 张图（视频为主，图作 carousel）" },
      { k: "交付要求", v: "草稿前置审核 · 通过后 3 天内发布 · 必带 @brand 与限定礼盒标签" },
    ],
  },
  {
    id: "logistics",
    label: "产品与物流",
    icon: Boxes,
    fields: [{ k: "物流方式及时效要求", v: "国内顺丰加急（48h）· 美区 UPS 标准 5-7 天" }],
  },
];

export function StepBrief({ campaign }: { campaign: Campaign }) {
  const [active, setActive] = useState<SectionId>("basic");
  const sec = sections.find((s) => s.id === active)!;
  const Icon = sec.icon;

  return (
    <StepShell
      agentStatus="done"
      agentText="Lucy 已完成 Brief 结构化解析 · 6 大模块共 30 个字段"
      cta={{ label: "保存并进入下一步", tone: "olive" }}
    >
      <div className="grid grid-cols-[160px_minmax(0,1fr)] gap-4 lg:grid-cols-[180px_minmax(0,1fr)]">
        {/* Left rail nav */}
        <nav className="space-y-1">
          {sections.map((s) => {
            const SIcon = s.icon;
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-[8px] px-3 py-2 text-left text-[13px] font-medium transition-colors",
                  isActive
                    ? "bg-soft-pink text-brand"
                    : "text-slate hover:bg-surface-warm hover:text-ink",
                )}
              >
                <SIcon className="h-4 w-4" />
                <span className="flex-1">{s.label}</span>
                <span className="tabular text-[10px] text-muted">{s.fields.length}</span>
              </button>
            );
          })}
        </nav>

        {/* Right content panel */}
        <div className="rounded-[10px] border border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-soft-pink text-brand">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="text-[14px] font-bold text-navy">{sec.label}</div>
            </div>
            <Badge tone="gray">{sec.fields.length} 项</Badge>
          </div>
          <dl className="divide-y divide-[#EDF0F5]">
            {sec.fields.map((f) => (
              <div key={f.k} className="grid grid-cols-[140px_minmax(0,1fr)] gap-4 px-5 py-3 lg:grid-cols-[180px_minmax(0,1fr)]">
                <dt className="text-[12px] font-medium text-muted">{f.k}</dt>
                <dd
                  className={cn(
                    "text-[13px] leading-relaxed",
                    f.tone === "highlight"
                      ? "font-semibold text-brand"
                      : f.tone === "muted"
                        ? "text-slate"
                        : "text-ink",
                  )}
                >
                  {f.tone === "highlight" ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Link2 className="h-3 w-3" />
                      {f.v}
                    </span>
                  ) : (
                    f.v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </StepShell>
  );
}
