"use client";
import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { creators } from "@/lib/mock/creators";
import type { Campaign } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { StepShell } from "./step-shell";

export function StepTracking({ campaign }: { campaign: Campaign }) {
  return (
    <StepShell
      agentStatus="running"
      agentText="实时聚合 7 条已发视频数据，每 30 分钟自动刷新"
    >
      <div className="grid grid-cols-4 gap-3">
        <Kpi label="累计曝光" value="2.4M" delta="+18%" tone="teal" />
        <Kpi label="互动总量" value="186K" delta="+12%" tone="olive" />
        <Kpi label="GMV" value={formatCurrency(108200)} delta="+22%" tone="pink" />
        <Kpi label="ROI" value="3.2x" delta="+0.4" tone="amber" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="border-b border-border bg-surface px-4 py-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-teal-text" />
            <span className="text-[13px] font-semibold text-ink">达人视频表现</span>
          </div>
        </div>
        <table className="w-full text-[13px]">
          <thead className="bg-page text-[11px] uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-2.5 text-left font-medium">达人</th>
              <th className="px-4 py-2.5 text-right font-medium">曝光</th>
              <th className="px-4 py-2.5 text-right font-medium">互动率</th>
              <th className="px-4 py-2.5 text-right font-medium">GMV</th>
              <th className="px-4 py-2.5 text-right font-medium">ROI</th>
              <th className="px-4 py-2.5 text-right font-medium">vs 同档</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {creators.slice(0, 4).map((c, i) => {
              const exposure = [560000, 410000, 320000, 180000][i];
              const er = [7.2, 6.4, 5.1, 4.8][i];
              const gmv = [42000, 31000, 18000, 12000][i];
              const roi = [3.8, 2.9, 2.1, 1.6][i];
              const vs = ["+22%", "+8%", "-3%", "-12%"][i];
              return (
                <tr key={c.id}>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <img src={c.avatar} alt="" className="h-7 w-7 rounded-full" />
                      <span className="font-medium text-ink">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right text-ink">{(exposure / 1000).toFixed(0)}K</td>
                  <td className="px-4 py-2.5 text-right text-ink">{er}%</td>
                  <td className="px-4 py-2.5 text-right text-ink">{formatCurrency(gmv)}</td>
                  <td className="px-4 py-2.5 text-right font-medium text-ink">{roi}x</td>
                  <td className="px-4 py-2.5 text-right">
                    <Badge tone={vs.startsWith("+") ? "olive" : "amber"}>{vs}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl border border-amber bg-soft-amber px-4 py-3">
        <div className="text-[12px] font-semibold text-amber-text">Lucy 异常预警</div>
        <div className="mt-1 text-[12px] text-ink">
          2 个视频 ROI 低于 1.8x，建议追加 ¥3k 投流测试，或者补一条同主题素材。
        </div>
      </div>
    </StepShell>
  );
}

function Kpi({
  label,
  value,
  delta,
  tone,
}: {
  label: string;
  value: string;
  delta: string;
  tone: "teal" | "olive" | "pink" | "amber";
}) {
  const toneMap = {
    teal: "border-soft-teal bg-soft-teal/40 text-teal-text",
    olive: "border-soft-olive bg-soft-olive/40 text-olive-text",
    pink: "border-soft-pink bg-soft-pink/40 text-brand-strong",
    amber: "border-soft-amber bg-soft-amber/40 text-amber-text",
  };
  return (
    <div className={`rounded-2xl border p-3 ${toneMap[tone]}`}>
      <div className="text-[11px] uppercase tracking-wider opacity-80">{label}</div>
      <div className="mt-1 text-[22px] font-bold text-ink">{value}</div>
      <div className="text-[11px] font-medium">{delta}</div>
    </div>
  );
}
