"use client";
import { Briefcase, CalendarRange, Coins, EyeOff, Lock, LockOpen, Tag, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { getEmployee } from "@/lib/mock/employees";
import { useUIStore } from "@/lib/store/ui-store";
import type { Campaign } from "@/lib/types";
import { cn, formatCurrency, formatRelative } from "@/lib/utils";

export function CampaignInfoPanel({ campaign }: { campaign: Campaign }) {
  const updateCampaign = useUIStore((s) => s.updateCampaign);
  const toggleInfo = useUIStore((s) => s.toggleCampaignInfo);
  const owner = getEmployee(campaign.ownerId);
  const spentPct = Math.min(100, Math.round((campaign.spent / campaign.budget) * 100));

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r border-border bg-surface">
      {/* Header */}
      <div className="border-b border-border px-6 py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              Campaign
            </div>
            <div className="mt-1.5 text-[20px] font-bold tracking-tight text-navy">
              {campaign.name}
            </div>
          </div>
          <button
            type="button"
            onClick={toggleInfo}
            aria-label="隐藏 Campaign 信息"
            title="隐藏 Campaign 信息"
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[6px] text-muted transition-colors hover:bg-surface-warm hover:text-ink"
          >
            <EyeOff className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-2.5 flex items-center gap-2">
          <StatusBadge status={campaign.status} />
          <span className="tabular text-[11px] text-muted">
            最后更新 {formatRelative(campaign.updatedAt)}
          </span>
        </div>
      </div>

      {/* 基础信息 */}
      <div className="px-6 py-5">
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
          基础信息
        </div>
        <div className="space-y-3">
          <FieldRow
            icon={<Briefcase className="h-3.5 w-3.5 text-lavender-text" />}
            label="客户"
            value={<span className="text-[13px] font-semibold text-ink">{campaign.client}</span>}
          />
          <FieldRow
            icon={<User className="h-3.5 w-3.5 text-blue-text" />}
            label="对接人"
            value={<span className="text-[13px] text-ink">{campaign.contact}</span>}
          />
          <FieldRow
            icon={<Coins className="h-3.5 w-3.5 text-amber-text" />}
            label="预算"
            value={
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-ink">
                    {formatCurrency(campaign.budget)}
                  </span>
                  <span className="text-[11px] text-slate">
                    已用 {formatCurrency(campaign.spent)}
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#EEF0F4]">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${spentPct}%` }} />
                </div>
              </div>
            }
          />
          <FieldRow
            icon={<CalendarRange className="h-3.5 w-3.5 text-teal-text" />}
            label="周期"
            value={
              <span className="tabular text-[13px] text-ink">
                {campaign.startAt} — {campaign.endAt}
              </span>
            }
          />
          <FieldRow
            icon={<img src={owner?.avatar} alt="" className="h-4 w-4 rounded-full" />}
            label="负责员工"
            value={
              <span className="text-[13px] font-medium text-ink">
                {owner?.name}
                <span className="ml-1 text-[11px] font-normal text-muted">· {owner?.role}</span>
              </span>
            }
          />
          <FieldRow
            icon={<Tag className="h-3.5 w-3.5 text-lavender-text" />}
            label="平台"
            value={
              <div className="flex flex-wrap gap-1">
                {campaign.platforms.map((p) => (
                  <Badge key={p} tone="lavender">
                    {p}
                  </Badge>
                ))}
              </div>
            }
          />
        </div>
      </div>

      {/* Campaign 能力配置 */}
      <div className="border-t border-border px-6 py-5">
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
          Campaign 能力配置
        </div>
        <div className="rounded-[10px] border border-border bg-surface p-4">
          <div className="mb-3 text-[12px] font-semibold text-ink">配置项</div>
          <div className="space-y-3">
            <ToggleRow
              label="私域达人池优先"
              description="先从合作过的达人池挑选，再补全网新发现"
              checked={campaign.toggles.poolFirst}
              onChange={(v) =>
                updateCampaign(campaign.id, {
                  toggles: { ...campaign.toggles, poolFirst: v },
                })
              }
            />
            <QuoteCeilingRow campaign={campaign} />
            <ToggleRow
              label="寄样追踪"
              description="开启后新增寄样物流追踪步骤"
              checked={campaign.toggles.sampling}
              onChange={(v) =>
                updateCampaign(campaign.id, {
                  toggles: { ...campaign.toggles, sampling: v },
                })
              }
            />
            <ToggleRow
              label="Ad Code 回传"
              description="不投流可关闭"
              checked={campaign.toggles.adCode}
              onChange={(v) =>
                updateCampaign(campaign.id, {
                  toggles: { ...campaign.toggles, adCode: v },
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[72px_1fr] items-start gap-3">
      <div className="flex items-center gap-1.5 pt-0.5 text-[11px] text-muted">
        {icon}
        <span>{label}</span>
      </div>
      <div>{value}</div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <div className="flex-1">
        <div className="text-[13px] font-medium text-ink">{label}</div>
        <div className="mt-0.5 text-[11px] text-muted">{description}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </label>
  );
}

function QuoteCeilingRow({ campaign }: { campaign: Campaign }) {
  const updateCampaign = useUIStore((s) => s.updateCampaign);
  const locked = campaign.quoteCeilingLocked ?? true;
  const value = campaign.quoteCeilingUsd ?? 0;

  return (
    <div className="grid grid-cols-[1fr_auto] items-start gap-3">
      <div className="flex-1">
        <div className="text-[13px] font-medium text-ink">报价限额</div>
        <div className="mt-0.5 text-[11px] text-muted">
          单达人报价封顶（USD），点 🔒 切换是否可编辑
        </div>
      </div>
      <div
        className={cn(
          "flex h-9 items-center gap-1 rounded-[8px] border bg-surface px-2 transition-colors",
          locked ? "border-border bg-surface-warm" : "border-border-strong",
        )}
      >
        <span className="select-none text-[12px] font-semibold text-slate">$</span>
        <input
          type="number"
          value={value || ""}
          disabled={locked}
          onChange={(e) =>
            updateCampaign(campaign.id, {
              quoteCeilingUsd: Number(e.target.value) || 0,
            })
          }
          placeholder="0"
          className={cn(
            "tabular w-[88px] border-0 bg-transparent text-right text-[13px] font-semibold text-ink outline-none focus:outline-none focus-visible:!outline-none",
            locked && "cursor-not-allowed text-slate",
          )}
          style={{ outline: "none", boxShadow: "none" }}
        />
        <button
          type="button"
          aria-label={locked ? "解锁编辑" : "锁定不可编辑"}
          onClick={() => updateCampaign(campaign.id, { quoteCeilingLocked: !locked })}
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-[6px] transition-colors",
            locked
              ? "text-muted hover:bg-soft-pink hover:text-brand"
              : "bg-soft-pink text-brand hover:bg-[#FFD5E2]",
          )}
        >
          {locked ? <Lock className="h-3.5 w-3.5" /> : <LockOpen className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Campaign["status"] }) {
  const map: Record<
    Campaign["status"],
    { tone: "teal" | "blue" | "amber" | "gray" | "pink"; label: string }
  > = {
    live: { tone: "teal", label: "进行中" },
    outreach: { tone: "blue", label: "外联中" },
    paused: { tone: "amber", label: "已暂停" },
    completed: { tone: "gray", label: "已完成" },
    risk: { tone: "pink", label: "风险" },
  };
  const m = map[status];
  return <Badge tone={m.tone}>{m.label}</Badge>;
}
