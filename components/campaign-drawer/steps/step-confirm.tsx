"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { creators, deals } from "@/lib/mock/creators";
import type { Campaign } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { StepShell } from "./step-shell";

export function StepConfirm({ campaign }: { campaign: Campaign }) {
  const wonDeals = deals.filter((d) => d.stage === "won");
  const [confirmed, setConfirmed] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    const next = new Set(confirmed);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setConfirmed(next);
  }

  return (
    <StepShell
      agentStatus="waiting-human"
      agentText={`${wonDeals.length} 位达人完成报价，等你最终确认合作`}
      cta={{
        label: confirmed.size === wonDeals.length ? "全部已确认，进入下一步" : `批量确认 ${confirmed.size} 位`,
        tone: confirmed.size === wonDeals.length ? "olive" : "primary",
      }}
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <table className="w-full text-[13px]">
          <thead className="bg-surface text-[11px] uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 text-left font-medium">达人</th>
              <th className="px-4 py-3 text-left font-medium">最终报价</th>
              <th className="px-4 py-3 text-left font-medium">合同状态</th>
              {campaign.toggles.sampling && (
                <th className="px-4 py-3 text-left font-medium">寄样地址</th>
              )}
              <th className="px-4 py-3 text-right font-medium">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {wonDeals.map((d) => {
              const c = creators.find((x) => x.id === d.creatorId);
              if (!c) return null;
              const isConfirmed = confirmed.has(d.creatorId);
              return (
                <tr key={d.creatorId} className="text-ink">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img src={c.avatar} alt="" className="h-7 w-7 rounded-full" />
                      <span className="font-medium">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{formatCurrency(d.finalQuote ?? 0)}</td>
                  <td className="px-4 py-3">
                    <Badge tone={isConfirmed ? "olive" : "amber"}>
                      {isConfirmed ? "已确认 · 待签约" : "待你确认"}
                    </Badge>
                  </td>
                  {campaign.toggles.sampling && (
                    <td className="px-4 py-3 text-slate">
                      <span className="text-[12px]">已填写 ✓</span>
                    </td>
                  )}
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => toggle(d.creatorId)}
                      className={`rounded-full px-3 py-1 text-[12px] font-medium transition-colors ${
                        isConfirmed
                          ? "bg-soft-olive text-olive-text"
                          : "bg-brand-strong text-white hover:bg-[#D81D63]"
                      }`}
                    >
                      {isConfirmed ? "✓ 已确认" : "确认合作"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </StepShell>
  );
}
