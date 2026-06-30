"use client";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getEmployee } from "@/lib/mock/employees";
import { useUIStore } from "@/lib/store/ui-store";
import type { Campaign } from "@/lib/types";
import { cn, formatRelative } from "@/lib/utils";

const statusLabels: Record<Campaign["status"], { label: string; tone: "teal" | "blue" | "amber" | "gray" | "pink" }> = {
  live: { label: "进行中", tone: "teal" },
  outreach: { label: "外联中", tone: "blue" },
  paused: { label: "已暂停", tone: "amber" },
  completed: { label: "已完成", tone: "gray" },
  risk: { label: "风险", tone: "pink" },
};

export default function CampaignsPage() {
  const { campaigns, openChat, shimmerIds } = useUIStore();
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | Campaign["status"]>("all");
  const [q, setQ] = useState("");

  const filtered = campaigns
    .filter((c) => (filter === "all" ? true : c.status === filter))
    .filter((c) => (q ? c.name.includes(q) : true));

  return (
    <div className="space-y-5 p-7 lg:p-8">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <FilterChip label="全部" active={filter === "all"} onClick={() => setFilter("all")} count={campaigns.length} />
          {(Object.keys(statusLabels) as Campaign["status"][]).map((s) => (
            <FilterChip
              key={s}
              label={statusLabels[s].label}
              active={filter === s}
              onClick={() => setFilter(s)}
              count={campaigns.filter((c) => c.status === s).length}
            />
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5">
          <Search className="h-3.5 w-3.5 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索 campaign…"
            className="w-48 border-0 bg-transparent text-[13px] outline-none placeholder:text-muted"
          />
        </div>
        <Button onClick={() => openChat()}>
          <Plus className="h-4 w-4" /> 新建 Campaign
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <table className="w-full text-[13px]">
          <thead className="border-b border-border bg-surface-warm text-[11px] uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Campaign</th>
              <th className="px-4 py-3 text-left font-medium">状态</th>
              <th className="px-4 py-3 text-left font-medium">周期</th>
              <th className="px-4 py-3 text-left font-medium">负责人</th>
              <th className="px-4 py-3 text-right font-medium">提报</th>
              <th className="px-4 py-3 text-right font-medium">合作中</th>
              <th className="px-4 py-3 text-right font-medium">已交付</th>
              <th className="px-4 py-3 text-right font-medium">最后更新</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((c) => {
              const owner = getEmployee(c.ownerId);
              const isNew = shimmerIds.has(c.id);
              return (
                <tr
                  key={c.id}
                  onClick={() => router.push(`/campaigns/${c.id}`)}
                  className={cn(
                    "cursor-pointer transition-colors hover:bg-surface-warm",
                    isNew && "shimmer-row",
                  )}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-ink">{c.name}</span>
                      {isNew && <Badge tone="pink">✨ 新建</Badge>}
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted">{c.briefSummary.slice(0, 50)}…</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge tone={statusLabels[c.status].tone}>{statusLabels[c.status].label}</Badge>
                  </td>
                  <td className="px-4 py-3.5 text-slate">
                    {c.startAt} — {c.endAt}
                  </td>
                  <td className="px-4 py-3.5">
                    {owner && (
                      <div className="flex items-center gap-2">
                        <img src={owner.avatar} alt="" className="h-6 w-6 rounded-full" />
                        <span className="font-medium text-ink">{owner.name}</span>
                      </div>
                    )}
                  </td>
                  <td className="tabular px-4 py-3.5 text-right font-medium text-ink">
                    {c.proposed}
                  </td>
                  <td className="tabular px-4 py-3.5 text-right font-medium text-teal-text">
                    {c.collaborating}
                  </td>
                  <td className="tabular px-4 py-3.5 text-right font-medium text-olive-text">
                    {c.delivered}
                  </td>
                  <td className="tabular px-4 py-3.5 text-right text-[11px] text-muted">
                    {formatRelative(c.updatedAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-[13px] text-muted">没有匹配的 campaign</div>
        )}
      </div>
    </div>
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
        "rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all",
        active
          ? "bg-soft-pink text-brand-strong"
          : "text-slate hover:bg-surface hover:text-ink",
      )}
    >
      {label} <span className="tabular ml-1 text-muted">{count}</span>
    </button>
  );
}
