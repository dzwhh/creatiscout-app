"use client";
import { Package, PackageCheck, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { creators } from "@/lib/mock/creators";
import type { Campaign } from "@/lib/types";
import { StepShell } from "./step-shell";

const sampleData = [
  {
    status: "out",
    title: "待发出",
    items: [{ creator: "cr-2", note: "地址已填，等仓库出货" }],
  },
  {
    status: "in-transit",
    title: "在途",
    items: [
      { creator: "cr-1", tracking: "SF1234567890", note: "今天 14:00 达到广州" },
      { creator: "cr-4", tracking: "JD9988776655", note: "明日预计签收" },
    ],
  },
  {
    status: "received",
    title: "已签收",
    items: [{ creator: "cr-5", tracking: "YT5556667778", note: "昨日已签收" }],
  },
] as const;

const iconMap = {
  out: Package,
  "in-transit": Truck,
  received: PackageCheck,
} as const;

export function StepSample({ campaign }: { campaign: Campaign }) {
  return (
    <StepShell
      agentStatus="running"
      agentText="Lucy 正在监控 4 个物流单 · 异常自动飘红"
    >
      <div className="grid grid-cols-3 gap-4">
        {sampleData.map((col) => {
          const Icon = iconMap[col.status];
          return (
            <div key={col.status} className="rounded-2xl border border-border bg-surface p-4">
              <div className="mb-3 flex items-center gap-2">
                <Icon className="h-4 w-4 text-slate" />
                <span className="text-[13px] font-semibold text-ink">{col.title}</span>
                <Badge tone="gray" className="ml-auto">
                  {col.items.length}
                </Badge>
              </div>
              <div className="space-y-2">
                {col.items.map((it, i) => {
                  const c = creators.find((x) => x.id === it.creator);
                  return (
                    <div key={i} className="rounded-xl border border-border bg-surface p-3">
                      <div className="flex items-center gap-2">
                        <img src={c?.avatar} alt="" className="h-7 w-7 rounded-full" />
                        <span className="text-[13px] font-medium text-ink">{c?.name}</span>
                      </div>
                      {("tracking" in it && it.tracking) && (
                        <div className="mt-2 font-mono text-[11px] text-slate">{it.tracking}</div>
                      )}
                      <div className="mt-1 text-[11px] text-muted">{it.note}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </StepShell>
  );
}
