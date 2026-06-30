"use client";
import { useMemo, useState } from "react";
import { Check, FileText, Play, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { creators } from "@/lib/mock/creators";
import type { Campaign } from "@/lib/types";
import { StepShell } from "./step-shell";

export function StepContent({ campaign }: { campaign: Campaign }) {
  const tabs = useMemo(() => {
    const t = [
      { id: "dispatch", label: "素材下发" },
      { id: "collect", label: "产出回收" },
      { id: "review", label: "视频审核" },
    ];
    if (campaign.toggles.adCode) t.push({ id: "publish", label: "发布回传 ad code" });
    return t;
  }, [campaign.toggles.adCode]);

  const [tab, setTab] = useState(tabs[0].id);

  return (
    <StepShell
      agentStatus="waiting-human"
      agentText="3 条视频草稿等你审核"
      cta={{ label: "完成本步进入下一步", tone: "olive" }}
    >
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          {tabs.map((t) => (
            <TabsTrigger key={t.id} value={t.id}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="dispatch">
          <DispatchView />
        </TabsContent>
        <TabsContent value="collect">
          <CollectView />
        </TabsContent>
        <TabsContent value="review">
          <ReviewView />
        </TabsContent>
        {campaign.toggles.adCode && (
          <TabsContent value="publish">
            <PublishView />
          </TabsContent>
        )}
      </Tabs>
    </StepShell>
  );
}

function DispatchView() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-border bg-surface p-4">
        <div className="mb-2 flex items-center gap-2">
          <FileText className="h-4 w-4 text-brand" />
          <span className="text-[13px] font-semibold text-ink">Brief 包模板</span>
        </div>
        <p className="text-[12px] text-slate">
          已自动生成 brief 包：拍摄要求、参考视频 3 条、品牌素材包、产品资料、必踩点 / 红线。
        </p>
      </div>
      <table className="w-full overflow-hidden rounded-2xl border border-border text-[13px]">
        <thead className="bg-surface text-[11px] uppercase tracking-wider text-muted">
          <tr>
            <th className="px-4 py-2.5 text-left font-medium">达人</th>
            <th className="px-4 py-2.5 text-left font-medium">下发状态</th>
            <th className="px-4 py-2.5 text-left font-medium">截止</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {creators.slice(0, 3).map((c) => (
            <tr key={c.id}>
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <img src={c.avatar} alt="" className="h-7 w-7 rounded-full" />
                  <span className="font-medium text-ink">{c.name}</span>
                </div>
              </td>
              <td className="px-4 py-2.5">
                <Badge tone="olive">已下发</Badge>
              </td>
              <td className="px-4 py-2.5 text-slate">5 天后</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CollectView() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {creators.slice(0, 3).map((c) => (
        <div key={c.id} className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="relative flex aspect-video items-center justify-center bg-[#1c1c20] text-white">
            <Play className="h-8 w-8 opacity-80" />
            <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px]">
              0:42
            </span>
          </div>
          <div className="p-3">
            <div className="flex items-center gap-2">
              <img src={c.avatar} alt="" className="h-6 w-6 rounded-full" />
              <span className="text-[12px] font-medium text-ink">{c.name}</span>
              <Badge tone="blue" className="ml-auto">
                草稿 v1
              </Badge>
            </div>
            <div className="mt-1 text-[11px] text-muted">2 小时前提交</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReviewView() {
  return (
    <div className="grid grid-cols-[1fr_320px] gap-4">
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="relative flex aspect-video items-center justify-center bg-[#1c1c20] text-white">
          <Play className="h-12 w-12 opacity-80" />
          <span className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 text-[11px]">
            0:42
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <img src={creators[0].avatar} alt="" className="h-7 w-7 rounded-full" />
            <span className="text-[13px] font-medium text-ink">{creators[0].name}</span>
            <Badge tone="amber" className="ml-auto">
              等你审核
            </Badge>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="rounded-2xl border border-border bg-surface p-4">
          <div className="text-[11px] uppercase tracking-wider text-muted">AI 初审</div>
          <ul className="mt-2 space-y-1 text-[12px] text-ink">
            <li>✅ 3 秒 hook 强劲</li>
            <li>✅ 卖点完整覆盖</li>
            <li>⚠️ 第 18s 出现竞品 logo，建议剪掉</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-4">
          <textarea
            placeholder="写下你的批注…"
            rows={3}
            className="w-full resize-none border-0 bg-transparent text-[13px] outline-none placeholder:text-muted"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-olive py-2 text-[13px] font-medium text-[#2D3608] hover:bg-[#A4BB45]"
          >
            <Check className="h-3.5 w-3.5" /> 通过
          </button>
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border bg-surface py-2 text-[13px] font-medium text-amber-text hover:bg-soft-amber"
          >
            <X className="h-3.5 w-3.5" /> 打回修改
          </button>
        </div>
      </div>
    </div>
  );
}

function PublishView() {
  return (
    <div className="space-y-3">
      <table className="w-full overflow-hidden rounded-2xl border border-border text-[13px]">
        <thead className="bg-surface text-[11px] uppercase tracking-wider text-muted">
          <tr>
            <th className="px-4 py-2.5 text-left font-medium">达人</th>
            <th className="px-4 py-2.5 text-left font-medium">视频</th>
            <th className="px-4 py-2.5 text-left font-medium">ad code</th>
            <th className="px-4 py-2.5 text-right font-medium">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {creators.slice(0, 3).map((c, i) => (
            <tr key={c.id}>
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <img src={c.avatar} alt="" className="h-7 w-7 rounded-full" />
                  <span className="font-medium text-ink">{c.name}</span>
                </div>
              </td>
              <td className="px-4 py-2.5 text-slate">video_v{i + 1}.mp4</td>
              <td className="px-4 py-2.5 font-mono text-[12px] text-slate">
                {i === 0 ? "ADX-9F4K2M" : "—"}
              </td>
              <td className="px-4 py-2.5 text-right">
                <button
                  type="button"
                  className="rounded-full bg-brand-strong px-3 py-1 text-[12px] font-medium text-white hover:bg-[#D81D63]"
                >
                  {i === 0 ? "已绑定" : "录入 ad code"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
