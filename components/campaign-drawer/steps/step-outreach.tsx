"use client";
import {
  ArrowDown,
  ArrowUp,
  Check,
  CheckCircle2,
  FileSearch,
  Handshake,
  MessageSquare,
  Send,
  User,
  UserCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { creators, deals } from "@/lib/mock/creators";
import type { Campaign, CreatorDeal, DealRound } from "@/lib/types";
import { cn, formatCurrency, formatRelative } from "@/lib/utils";
import { StepShell } from "./step-shell";

type Stage = CreatorDeal["stage"];

const stageOrder: Stage[] = [
  "interested",
  "submitted",
  "internal_review",
  "client_review",
  "negotiating",
  "won",
];

const stageMeta: Record<
  Stage,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    tone: "blue" | "lavender" | "amber" | "teal" | "pink";
    desc: string;
  }
> = {
  interested: {
    label: "有意向",
    icon: MessageSquare,
    tone: "blue",
    desc: "已建立首次联系并表达意愿，等待整理资料正式提报。",
  },
  submitted: {
    label: "进行提报",
    icon: Send,
    tone: "lavender",
    desc: "员工准备提报资料（数据/案例/报价区间），提报给内部 review。",
  },
  internal_review: {
    label: "内部审核",
    icon: FileSearch,
    tone: "lavender",
    desc: "团队 leader 审核达人匹配度、报价合理性、品牌合规与排期冲突。",
  },
  client_review: {
    label: "客户审核",
    icon: UserCheck,
    tone: "amber",
    desc: "客户对内审通过的达人做最终筛选。仅审核通过的达人进入议价。",
  },
  negotiating: {
    label: "议价中",
    icon: Handshake,
    tone: "pink",
    desc: "客户确认后启动报价谈判（第一轮 / 第二轮 / 最终），含人工介入。",
  },
  won: {
    label: "已成单",
    icon: CheckCircle2,
    tone: "teal",
    desc: "达成最终报价，进入合同签署。",
  },
  handoff: {
    label: "转人工",
    icon: User,
    tone: "amber",
    desc: "AI 无法继续推进（异议 / 超限 / 卡点），转给运营介入。",
  },
};

export function StepOutreach({ campaign }: { campaign: Campaign }) {
  const [filter, setFilterRaw] = useState<"all" | Stage>("all");
  const visibleDeals = filter === "all" ? deals : deals.filter((d) => d.stage === filter);
  const [activeId, setActiveId] = useState<string>(deals[0]?.creatorId ?? "");

  // Switching tabs auto-selects the first creator in that tab
  function setFilter(next: "all" | Stage) {
    setFilterRaw(next);
    const list = next === "all" ? deals : deals.filter((d) => d.stage === next);
    if (list.length > 0) {
      setActiveId(list[0].creatorId);
    }
  }
  const activeDeal = deals.find((d) => d.creatorId === activeId);
  const activeCreator = creators.find((c) => c.id === activeId);

  const stageCounts = useMemo(() => {
    const m: Record<Stage, number> = {
      interested: 0,
      submitted: 0,
      internal_review: 0,
      client_review: 0,
      negotiating: 0,
      won: 0,
      handoff: 0,
    };
    for (const d of deals) m[d.stage]++;
    return m;
  }, []);

  return (
    <StepShell
      agentStatus="waiting-human"
      agentText={`${stageCounts.client_review} 位等客户审核 · ${stageCounts.negotiating} 位议价中需要你关注`}
      cta={{ label: "标记本步完成", tone: "olive" }}
    >
      {/* Filter chips */}
      <div className="-mt-1 flex flex-wrap items-center gap-1.5">
        <FilterChip
          label="全部"
          count={deals.length}
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        {stageOrder.map((s) => (
          <FilterChip
            key={s}
            label={stageMeta[s].label}
            count={stageCounts[s]}
            active={filter === s}
            onClick={() => setFilter(s)}
          />
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-[240px_minmax(0,1fr)] gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="space-y-1.5">
          {visibleDeals.length === 0 && (
            <div className="rounded-[10px] border border-dashed border-border bg-surface-warm py-8 text-center text-[11px] text-muted">
              当前阶段无达人
            </div>
          )}
          {visibleDeals.map((d) => {
            const c = creators.find((x) => x.id === d.creatorId);
            if (!c) return null;
            const meta = stageMeta[d.stage];
            const isActive = d.creatorId === activeId;
            return (
              <button
                key={d.creatorId}
                type="button"
                onClick={() => setActiveId(d.creatorId)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-[10px] border p-2.5 text-left transition-colors",
                  isActive
                    ? "border-brand bg-soft-pink/40"
                    : "border-border bg-surface hover:bg-surface-warm",
                )}
              >
                <img src={c.avatar} alt="" className="h-9 w-9 rounded-full" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-semibold text-ink">{c.name}</div>
                  <Badge tone={meta.tone} className="mt-0.5">
                    {meta.label}
                  </Badge>
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-[10px] border border-border bg-surface p-5">
          {activeDeal && activeCreator ? (
            <DealDetail
              deal={activeDeal}
              creator={activeCreator}
              ceiling={campaign.quoteCeilingUsd ?? 0}
            />
          ) : (
            <div className="py-10 text-center text-[12px] text-muted">选择一位达人查看详情</div>
          )}
        </div>
      </div>
    </StepShell>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1 text-[11px] font-medium transition-colors",
        active
          ? "bg-brand text-white"
          : "bg-surface-warm text-slate hover:bg-soft-pink hover:text-brand",
      )}
    >
      {label}
      <span className="tabular ml-1 opacity-70">{count}</span>
    </button>
  );
}

function DealDetail({
  deal,
  creator,
  ceiling,
}: {
  deal: CreatorDeal;
  creator: any;
  ceiling: number;
}) {
  const meta = stageMeta[deal.stage];
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={creator.avatar} alt="" className="h-10 w-10 rounded-full" />
          <div>
            <div className="text-[14px] font-bold text-navy">{creator.name}</div>
            <div className="text-[11px] text-muted">
              {creator.handle} · 平均报价 {formatCurrency(creator.averageQuote ?? 0)}
            </div>
          </div>
        </div>
        <Badge tone={meta.tone}>{meta.label}</Badge>
      </div>
      <p className="mb-4 rounded-[8px] bg-surface-warm px-3 py-2 text-[12px] text-slate">
        {meta.desc}
      </p>

      {deal.stage === "interested" && <InterestedPanel />}
      {deal.stage === "submitted" && <SubmittedPanel />}
      {deal.stage === "internal_review" && <InternalReviewPanel />}
      {deal.stage === "client_review" && <ClientReviewPanel />}
      {deal.stage === "negotiating" && (
        <NegotiatingPanel rounds={deal.rounds} ceiling={deal.ceiling || ceiling} />
      )}
      {deal.stage === "won" && (
        <WonPanel
          rounds={deal.rounds}
          ceiling={deal.ceiling || ceiling}
          finalQuote={deal.finalQuote}
        />
      )}
      {deal.stage === "handoff" && <HandoffPanel />}
    </>
  );
}

function StageBlock({
  title,
  children,
  cta,
}: {
  title: string;
  children: React.ReactNode;
  cta?: { label: string; variant?: "primary" | "outline" | "ghost" };
}) {
  return (
    <div className="space-y-3">
      <div className="text-[12px] font-semibold uppercase tracking-wider text-muted">{title}</div>
      {children}
      {cta && (
        <div className="pt-1">
          <Button variant={cta.variant ?? "primary"} size="sm">
            {cta.label}
          </Button>
        </div>
      )}
    </div>
  );
}

function InterestedPanel() {
  return (
    <StageBlock title="意向沟通记录" cta={{ label: "提交内部审核" }}>
      <div className="space-y-2">
        {[
          {
            from: "Lucy",
            text: "你好，618 美妆联名希望和你合作 1 条种草，最近档期方便吗？",
            at: "2 天前",
          },
          {
            from: "达人",
            text: "目前 6/15-6/22 期间可以排，可以发下 brief 和报价范围。",
            at: "1 天前",
          },
        ].map((m, i) => (
          <div
            key={i}
            className="flex items-start gap-2 rounded-[8px] border border-border bg-surface p-3"
          >
            <span
              className={cn(
                "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                m.from === "Lucy" ? "bg-soft-pink text-brand" : "bg-soft-teal text-teal-text",
              )}
            >
              {m.from === "Lucy" ? "L" : "K"}
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold text-ink">{m.from}</span>
                <span className="text-[10px] text-muted">{m.at}</span>
              </div>
              <p className="mt-0.5 text-[12px] leading-relaxed text-slate">{m.text}</p>
            </div>
          </div>
        ))}
      </div>
    </StageBlock>
  );
}

function SubmittedPanel() {
  return (
    <StageBlock title="提报资料" cta={{ label: "提交至内部审核" }}>
      <div className="grid grid-cols-2 gap-3">
        {[
          { k: "粉丝量级", v: "88K micro" },
          { k: "近 30 天互动率", v: "9.6%" },
          { k: "受众契合度", v: "84 · 与 brief 高度匹配" },
          { k: "建议档期", v: "6/18 - 6/22" },
          { k: "建议报价区间", v: "$1,000 - $1,200" },
          { k: "历史合作案例", v: "3 条 · 平均 ROI 2.6x" },
        ].map((it) => (
          <div key={it.k} className="rounded-[8px] bg-surface-warm p-3">
            <div className="text-[11px] text-muted">{it.k}</div>
            <div className="mt-0.5 text-[13px] font-medium text-ink">{it.v}</div>
          </div>
        ))}
      </div>
    </StageBlock>
  );
}

function InternalReviewPanel() {
  return (
    <StageBlock title="内审 Checklist">
      <ul className="space-y-2">
        {[
          { ok: true, text: "达人与 brief 调性匹配 · Lucy AI 已交叉验证" },
          { ok: true, text: "报价不超 campaign 限额（$1,300）" },
          { ok: true, text: "档期不与其他 campaign 冲突" },
          { ok: false, text: "品牌方黑名单 / 合规风险 · 等 Leader 复核" },
        ].map((it, i) => (
          <li key={i} className="flex items-start gap-2 text-[13px]">
            <span
              className={cn(
                "mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full",
                it.ok ? "bg-soft-teal text-teal-text" : "bg-soft-amber text-amber-text",
              )}
            >
              {it.ok ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : "?"}
            </span>
            <span className={it.ok ? "text-ink" : "text-amber-text"}>{it.text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex gap-2">
        <Button variant="primary" size="sm">
          通过 · 转客户审核
        </Button>
        <Button variant="outline" size="sm">
          打回修改
        </Button>
      </div>
    </StageBlock>
  );
}

function ClientReviewPanel() {
  return (
    <StageBlock title="客户审核">
      <div className="rounded-[10px] border border-border bg-surface-warm p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[12px] text-muted">已发送给客户审核</div>
            <div className="mt-1 text-[13px] font-semibold text-ink">
              Vivian Zhao · 蜜语 Honeylab
            </div>
          </div>
          <Badge tone="amber">等待 32h</Badge>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
          <div className="rounded-[6px] bg-surface px-3 py-2">
            <span className="text-muted">发送时间：</span>
            <span className="tabular text-ink">2 天前 10:21</span>
          </div>
          <div className="rounded-[6px] bg-surface px-3 py-2">
            <span className="text-muted">提醒次数：</span>
            <span className="tabular text-ink">1 次</span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <Button variant="primary" size="sm">
          标记客户已批准 · 进入议价
        </Button>
        <Button variant="outline" size="sm">
          再次催客户
        </Button>
        <Button variant="ghost" size="sm">
          客户打回
        </Button>
      </div>
    </StageBlock>
  );
}

function NegotiatingPanel({ rounds, ceiling }: { rounds: DealRound[]; ceiling: number }) {
  return (
    <StageBlock title="议价时间线">
      <div className="flex items-center justify-between rounded-[8px] bg-surface-warm px-3 py-2 text-[12px]">
        <span className="text-slate">
          <span className="font-semibold">报价限额：</span>
          <span className="tabular ml-1 font-semibold text-ink">{formatCurrency(ceiling)}</span>
          <span className="ml-1 text-muted">/ 条</span>
        </span>
        <span className="text-muted">超出自动转人工</span>
      </div>
      <Timeline rounds={rounds} ceiling={ceiling} />
      <div className="mt-2 flex gap-2">
        <Button variant="primary" size="sm">
          提交下一轮报价
        </Button>
        <Button variant="outline" size="sm">
          锁定最终报价
        </Button>
        <Button variant="ghost" size="sm">
          转人工
        </Button>
      </div>
    </StageBlock>
  );
}

function WonPanel({
  rounds,
  ceiling,
  finalQuote,
}: {
  rounds: DealRound[];
  ceiling: number;
  finalQuote?: number;
}) {
  return (
    <StageBlock title="成单记录">
      <div className="flex items-center gap-3 rounded-[10px] border border-teal/30 bg-soft-teal/50 p-4">
        <CheckCircle2 className="h-6 w-6 text-teal-text" />
        <div>
          <div className="text-[13px] font-semibold text-ink">最终报价已达成</div>
          <div className="tabular mt-0.5 text-[20px] font-bold text-teal-text">
            {formatCurrency(finalQuote ?? 0)}
          </div>
        </div>
      </div>
      <Timeline rounds={rounds} ceiling={ceiling} />
    </StageBlock>
  );
}

function HandoffPanel() {
  return (
    <StageBlock title="转人工原因" cta={{ label: "我来接手", variant: "primary" }}>
      <div className="rounded-[10px] border border-amber/30 bg-soft-amber/50 p-4">
        <div className="text-[12px] font-semibold text-amber-text">⚠️ 报价超 campaign 限额</div>
        <p className="mt-2 text-[12px] leading-relaxed text-ink">
          达人首轮报价 $1,500，超出 $1,300 限额。AI 无法继续自动议价，需要人工介入：
        </p>
        <ul className="mt-2 space-y-1 text-[12px] text-ink">
          <li>· 调整 campaign 限额（需客户同意）</li>
          <li>· 与达人协商置换 + 现金的混合形式</li>
          <li>· 放弃此达人，从备选池补 1 位</li>
        </ul>
      </div>
    </StageBlock>
  );
}

function Timeline({ rounds, ceiling }: { rounds: DealRound[]; ceiling: number }) {
  if (rounds.length === 0)
    return (
      <div className="rounded-[8px] border border-dashed border-border bg-surface-warm py-6 text-center text-[11px] text-muted">
        暂无议价记录
      </div>
    );

  return (
    <ol className="relative space-y-3 pl-6 before:absolute before:left-2 before:top-1.5 before:h-[calc(100%-12px)] before:w-px before:bg-border">
      {rounds.map((r, i) => {
        const overCeiling = (r.theirQuote ?? 0) > ceiling;
        return (
          <li key={i} className="relative">
            <span
              className={cn(
                "absolute -left-[24px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full",
                r.byHuman
                  ? "bg-soft-amber text-amber-text"
                  : overCeiling
                    ? "bg-amber text-white"
                    : "bg-brand text-white",
              )}
            >
              {r.byHuman ? (
                <User className="h-2.5 w-2.5" />
              ) : (
                <span className="text-[9px] font-bold">●</span>
              )}
            </span>
            <div className="rounded-[8px] border border-border bg-surface p-3">
              <div className="flex items-center justify-between">
                <div className="text-[12px] font-medium text-ink">
                  {r.round === "final"
                    ? "最终成单"
                    : r.round === "handoff"
                      ? "转人工"
                      : `第 ${r.round} 轮报价`}
                </div>
                <div className="tabular text-[10px] text-muted">{formatRelative(r.at)}</div>
              </div>
              <div className="mt-2 flex items-center gap-4 text-[12px]">
                {r.ourQuote != null && (
                  <span className="flex items-center gap-1 text-teal-text">
                    <ArrowUp className="h-3 w-3" />
                    <span className="tabular">{formatCurrency(r.ourQuote)}</span>
                    <span className="text-muted">我方</span>
                  </span>
                )}
                {r.theirQuote != null && (
                  <span className="flex items-center gap-1 text-brand">
                    <ArrowDown className="h-3 w-3" />
                    <span className="tabular">{formatCurrency(r.theirQuote)}</span>
                    <span className="text-muted">达人</span>
                  </span>
                )}
                {overCeiling && (
                  <Badge tone="amber" className="ml-auto">
                    超限
                  </Badge>
                )}
              </div>
              {r.note && <div className="mt-2 text-[11px] text-slate">{r.note}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
