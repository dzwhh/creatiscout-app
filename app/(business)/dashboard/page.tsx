"use client";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  FileText,
  Mail,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  Timer,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { approvals } from "@/lib/mock/approvals";
import { useUIStore } from "@/lib/store/ui-store";
import { cn, formatRelative } from "@/lib/utils";

export default function DashboardPage() {
  const { openChat, campaigns } = useUIStore();
  const router = useRouter();
  const [queueTab, setQueueTab] = useState<"agent" | "human">("agent");

  return (
    <div className="space-y-5 p-6 lg:p-7">
      {/* Hero */}
      <section>
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-soft-pink">
              <Bot className="h-5 w-5 text-brand" />
            </div>
            <div>
              <h1 className="text-[26px] font-bold leading-tight tracking-tight text-navy">
                KOL Ops Employee is working
              </h1>
              <p className="mt-1 max-w-prose text-[13px] leading-relaxed text-slate">
                Scanning creators · preparing outreach · 4 decisions need your approval today.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <KpiCard
              icon={<Users className="h-3.5 w-3.5 text-brand" />}
              iconBg="bg-soft-pink"
              label="Scanned"
              value="428"
              sub="Today"
            />
            <KpiCard
              icon={<CheckCircle2 className="h-3.5 w-3.5 text-blue-text" />}
              iconBg="bg-soft-blue"
              label="Matched"
              value="18"
              sub="Today"
            />
            <KpiCard
              icon={<AlertTriangle className="h-3.5 w-3.5 text-amber-text" />}
              iconBg="bg-soft-amber"
              label="Approvals"
              value="4"
              sub="Pending"
            />
          </div>
        </div>
      </section>

      {/* Command bar */}
      <button
        type="button"
        onClick={() => openChat()}
        className="group flex w-full items-center gap-3 rounded-[10px] border border-border bg-surface px-4 py-3 text-left transition-colors hover:bg-surface-warm"
      >
        <Sparkles className="h-4 w-4 text-brand" />
        <span className="flex-1 text-[13px] text-muted">Ask what needs approval today</span>
        <span className="rounded border border-border bg-surface-warm px-1.5 py-0.5 font-mono text-[11px] text-muted">
          ⌘K
        </span>
        <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-brand text-white">
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </button>

      {/* Queue with tabs: Agent tasks / Human review */}
      <section className="rounded-[12px] border border-border bg-surface p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="inline-flex rounded-[8px] bg-surface-warm p-1">
            <QueueTabButton
              active={queueTab === "agent"}
              onClick={() => setQueueTab("agent")}
              label="任务列表"
              count={agentTasks.length}
            />
            <QueueTabButton
              active={queueTab === "human"}
              onClick={() => setQueueTab("human")}
              label="人工审核"
              count={approvals.length}
            />
          </div>
          <button
            type="button"
            className="flex items-center gap-1 text-[12px] text-slate transition-colors hover:text-ink"
          >
            View all <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {queueTab === "agent" ? (
          <AgentTaskList router={router} />
        ) : (
          <HumanReviewList router={router} campaigns={campaigns} openChat={openChat} />
        )}
      </section>

      {/* Bottom row — 真正业务有用的两块 */}
      <div className="grid grid-cols-[1fr_1fr] gap-4">
        <CapacityCard />
        <RoiCard />
      </div>
    </div>
  );
}

/* ---------- Sub components ---------- */

function KpiCard({
  icon,
  iconBg,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="flex min-w-[140px] items-center gap-3 rounded-[10px] border border-border bg-surface px-4 py-3">
      <div className={`flex h-9 w-9 items-center justify-center rounded-[8px] ${iconBg}`}>
        {icon}
      </div>
      <div>
        <div className="tabular text-[22px] font-bold leading-none text-navy">{value}</div>
        <div className="mt-1 text-[11px] text-slate">
          {label} <span className="text-muted">· {sub}</span>
        </div>
      </div>
    </div>
  );
}

function QueueTabButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-8 items-center gap-1.5 rounded-[6px] px-3 text-[12.5px] font-medium transition-all",
        active ? "bg-surface text-ink shadow-card" : "text-slate hover:text-ink",
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          "tabular rounded-full px-1.5 py-px text-[10px] font-semibold",
          active ? "bg-soft-pink text-brand" : "bg-surface text-slate",
        )}
      >
        {count}
      </span>
    </button>
  );
}

/* ----- Agent tasks (数字员工在跑的活儿) ----- */

const agentTasks = [
  {
    id: "at-1",
    icon: Users,
    title: "扫描美区美妆 micro creators",
    sub: "搜索池 1,240 → 初筛 86 → 待 AI 评估",
    progress: 62,
    employee: "Lucy",
    eta: "约 8 分钟",
    tone: "pink" as const,
  },
  {
    id: "at-2",
    icon: Mail,
    title: "起草 12 封个性化外联邮件",
    sub: "Variant A / B 测试，等你审核",
    progress: 100,
    employee: "Lucy",
    eta: "已完成 · 待审核",
    tone: "teal" as const,
  },
  {
    id: "at-3",
    icon: FileText,
    title: "整理 7 份达人提报资料",
    sub: "从对话记录抽取数据 + 案例 + 报价区间",
    progress: 41,
    employee: "Lucy",
    eta: "约 14 分钟",
    tone: "blue" as const,
  },
  {
    id: "at-4",
    icon: Timer,
    title: "跟进 3 位 48h 未回复达人",
    sub: "按客户语言 + 历史风格生成跟进话术",
    progress: 88,
    employee: "Lucy",
    eta: "约 2 分钟",
    tone: "lavender" as const,
  },
];

function AgentTaskList({ router }: { router: any }) {
  const toneToBg = {
    pink: "bg-soft-pink text-brand",
    teal: "bg-soft-teal text-teal-text",
    blue: "bg-soft-blue text-blue-text",
    lavender: "bg-soft-lavender text-lavender-text",
  } as const;
  const toneToBar = {
    pink: "bg-brand",
    teal: "bg-teal",
    blue: "bg-blue",
    lavender: "bg-lavender",
  } as const;

  return (
    <ul className="divide-y divide-[#EDF0F5]">
      {agentTasks.map((t) => {
        const Icon = t.icon;
        return (
          <li key={t.id} className="flex items-center gap-4 py-3.5">
            <div
              className={cn(
                "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full",
                toneToBg[t.tone],
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-[13.5px] font-semibold text-ink">{t.title}</span>
                <Badge tone="lavender">{t.employee}</Badge>
              </div>
              <p className="mt-0.5 truncate text-[12px] text-slate">{t.sub}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 max-w-[180px] flex-1 overflow-hidden rounded-full bg-surface-warm">
                  <div
                    className={cn("h-full rounded-full", toneToBar[t.tone])}
                    style={{ width: `${t.progress}%` }}
                  />
                </div>
                <span className="tabular text-[11px] text-muted">{t.progress}%</span>
              </div>
            </div>
            <div className="flex flex-shrink-0 flex-col items-end gap-1">
              <span className="text-[11px] text-muted">{t.eta}</span>
              <Button size="sm" variant="outline">
                查看产物
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* ----- Human review (需要人拍板的) ----- */

function HumanReviewList({
  router,
  campaigns,
  openChat,
}: {
  router: any;
  campaigns: any[];
  openChat: (employeeId?: string, campaign?: { id: string; name: string }) => void;
}) {
  return (
    <ul className="divide-y divide-[#EDF0F5]">
      {approvals.map((a) => {
        const campaign = campaigns.find((c) => c.id === a.campaignId);
        const ownerId = campaign?.ownerId;
        return (
          <li key={a.id} className="flex items-center gap-4 py-3.5">
            <div
              className={cn(
                "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full",
                iconBgByKind(a.kind),
              )}
            >
              <ApprovalIcon kind={a.kind} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-[13.5px] font-semibold text-ink">{a.title}</span>
                <Badge tone={approvalToneByKind(a.kind)}>{approvalLabelByKind(a.kind)}</Badge>
              </div>
              <p className="mt-0.5 truncate text-[12px] text-slate">{a.reason}</p>
            </div>
            <span className="tabular flex-shrink-0 text-[11px] text-muted">
              {formatRelative(a.ts)}
            </span>
            <div className="flex flex-shrink-0 gap-1.5">
              <Button size="sm" onClick={() => router.push(`/campaigns/${a.campaignId}`)}>
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  openChat(
                    ownerId,
                    campaign ? { id: campaign.id, name: campaign.name } : undefined,
                  )
                }
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Ask
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* ----- 下方两块业务有用的指标 ----- */

function CapacityCard() {
  // 「员工产能」：每周可执行任务数 vs 实际承接，能直观看到是否要扩员
  const data = [
    { name: "Lucy", role: "内容运营专员", capacity: 40, used: 34, color: "brand" },
    { name: "Mia", role: "达人匹配专员", capacity: 32, used: 22, color: "blue" },
    { name: "Noah", role: "外联谈判专员", capacity: 28, used: 27, color: "amber" },
  ];

  return (
    <section className="rounded-[12px] border border-border bg-surface p-5">
      <div className="mb-3.5 flex items-center justify-between">
        <div>
          <h3 className="text-[14px] font-bold tracking-tight text-navy">数字员工产能</h3>
          <p className="mt-0.5 text-[11px] text-muted">本周任务承接 / 单员工容量上限</p>
        </div>
        <ShieldAlert className="h-4 w-4 text-amber-text" />
      </div>
      <ul className="space-y-3">
        {data.map((d) => {
          const pct = Math.round((d.used / d.capacity) * 100);
          const isHigh = pct >= 90;
          const barColor =
            d.color === "brand"
              ? "bg-brand"
              : d.color === "blue"
                ? "bg-blue"
                : "bg-amber";
          return (
            <li key={d.name}>
              <div className="flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-ink">{d.name}</span>
                  <span className="text-muted">· {d.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="tabular text-ink">
                    <span className="font-semibold">{d.used}</span>
                    <span className="text-muted"> / {d.capacity}</span>
                  </span>
                  {isHigh && <Badge tone="amber">满载</Badge>}
                </div>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-warm">
                <div
                  className={cn("h-full rounded-full", barColor)}
                  style={{ width: `${Math.min(100, pct)}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 flex items-center gap-2 rounded-[8px] bg-soft-amber/50 px-3 py-2 text-[11px] text-amber-text">
        <AlertTriangle className="h-3 w-3" />
        <span>Noah 本周承接已 96%，建议拆分外联或调整任务量。</span>
      </div>
    </section>
  );
}

function RoiCard() {
  // 「Campaign ROI 排行」：进行中 campaign 的实时投产比 + 预测达成
  const items = [
    { name: "618 美妆联名", spent: 32400, gmv: 91800, roi: 2.83, status: "上升" as const, delta: "+0.3" },
    { name: "夏日瑜伽服上新", spent: 22000, gmv: 48400, roi: 2.20, status: "稳定" as const, delta: "+0.1" },
    { name: "520 礼盒种草", spent: 8200, gmv: 11400, roi: 1.39, status: "下降" as const, delta: "-0.4" },
  ];
  return (
    <section className="rounded-[12px] border border-border bg-surface p-5">
      <div className="mb-3.5 flex items-center justify-between">
        <div>
          <h3 className="text-[14px] font-bold tracking-tight text-navy">进行中 Campaign · ROI</h3>
          <p className="mt-0.5 text-[11px] text-muted">实时 GMV / 投放成本 · 与昨日对比</p>
        </div>
        <button type="button" className="text-[11px] text-brand hover:underline">
          全部 →
        </button>
      </div>
      <ul className="space-y-1">
        {items.map((it) => {
          const tone =
            it.status === "上升" ? "teal" : it.status === "稳定" ? "blue" : "amber";
          return (
            <li
              key={it.name}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-[8px] px-2 py-2 hover:bg-surface-warm"
            >
              <div className="min-w-0">
                <div className="truncate text-[13px] font-semibold text-ink">{it.name}</div>
                <div className="tabular mt-0.5 text-[11px] text-muted">
                  花费 ${it.spent.toLocaleString()} · GMV ${it.gmv.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="tabular text-[18px] font-bold text-navy">{it.roi.toFixed(2)}x</div>
                <div className="text-[10px] text-muted">ROI</div>
              </div>
              <Badge tone={tone}>
                <span className="tabular">{it.delta}</span>
              </Badge>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ----- helpers ----- */

function ApprovalIcon({ kind }: { kind: string }) {
  if (kind === "matching") return <Users className="h-4 w-4 text-brand" />;
  if (kind === "outreach") return <Mail className="h-4 w-4 text-teal-text" />;
  if (kind === "video") return <FileText className="h-4 w-4 text-blue-text" />;
  if (kind === "quote") return <AlertTriangle className="h-4 w-4 text-amber-text" />;
  return <Clock className="h-4 w-4 text-slate" />;
}

function iconBgByKind(kind: string) {
  return (
    ({
      matching: "bg-soft-pink",
      outreach: "bg-soft-teal",
      video: "bg-soft-blue",
      quote: "bg-soft-amber",
      contract: "bg-soft-lavender",
    } as Record<string, string>)[kind] ?? "bg-surface-warm"
  );
}

function approvalLabelByKind(kind: string) {
  return (
    { matching: "Matching", outreach: "Outreach", video: "Review", quote: "Quote", contract: "Contract" }[
      kind
    ] ?? "Action"
  );
}

function approvalToneByKind(kind: string): "pink" | "teal" | "blue" | "amber" | "lavender" {
  return (
    ({
      matching: "pink",
      outreach: "teal",
      video: "blue",
      quote: "amber",
      contract: "lavender",
    } as const)[kind] ?? "blue"
  );
}
