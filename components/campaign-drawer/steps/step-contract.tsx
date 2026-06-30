"use client";
import { Check, CircleDollarSign, FileSignature, FileText, Shield } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { creators, deals } from "@/lib/mock/creators";
import type { Campaign } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";
import { StepShell } from "./step-shell";

type ContractStatus = "draft" | "sent" | "client_signed" | "creator_signed" | "fully_signed";

const statusMeta: Record<
  ContractStatus,
  { label: string; tone: "gray" | "blue" | "amber" | "lavender" | "teal" }
> = {
  draft: { label: "草稿", tone: "gray" },
  sent: { label: "已发送", tone: "blue" },
  client_signed: { label: "客户已签", tone: "lavender" },
  creator_signed: { label: "达人已签", tone: "amber" },
  fully_signed: { label: "双方已签", tone: "teal" },
};

const mockContracts = deals
  .filter((d) => d.stage === "won")
  .map((d, i) => {
    const c = creators.find((x) => x.id === d.creatorId)!;
    const statuses: ContractStatus[] = ["fully_signed", "creator_signed", "sent"];
    return {
      creator: c,
      finalQuote: d.finalQuote ?? 0,
      status: statuses[i] ?? "draft",
      template: "标准 KOL 服务协议 v3.2",
      payment: "30% 定金 / 60% 出片 / 10% 数据达标",
      grant: "6 个月品牌方全平台二次使用",
      deliverable: "1 条 60s 视频 + 3 张图",
    };
  });

export function StepContract({ campaign }: { campaign: Campaign }) {
  const [tab, setTab] = useState("contracts");
  const fullySignedCount = mockContracts.filter((c) => c.status === "fully_signed").length;

  return (
    <StepShell
      agentStatus="waiting-human"
      agentText={`${mockContracts.length} 份合同生成 · ${fullySignedCount} 份已完成双签`}
      cta={{ label: "推进至素材产出", tone: "olive" }}
    >
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="contracts">
            <FileSignature className="h-3.5 w-3.5" /> 合同列表
          </TabsTrigger>
          <TabsTrigger value="template">
            <FileText className="h-3.5 w-3.5" /> 合同模板
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CircleDollarSign className="h-3.5 w-3.5" /> 付款节奏
          </TabsTrigger>
          <TabsTrigger value="rights">
            <Shield className="h-3.5 w-3.5" /> 授权条款
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contracts">
          <div className="overflow-hidden rounded-[10px] border border-border">
           <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-[13px]">
              <thead className="bg-surface-warm text-[11px] uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-2.5 text-left font-semibold">达人</th>
                  <th className="px-4 py-2.5 text-left font-semibold">交付内容</th>
                  <th className="px-4 py-2.5 text-right font-semibold">合同金额</th>
                  <th className="px-4 py-2.5 text-left font-semibold">付款节奏</th>
                  <th className="px-4 py-2.5 text-left font-semibold">签约状态</th>
                  <th className="px-4 py-2.5 text-right font-semibold">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDF0F5]">
                {mockContracts.map((it) => (
                  <tr key={it.creator.id} className="bg-surface">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img src={it.creator.avatar} alt="" className="h-7 w-7 rounded-full" />
                        <span className="font-semibold text-ink">{it.creator.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate">{it.deliverable}</td>
                    <td className="tabular px-4 py-3 text-right font-semibold text-ink">
                      {formatCurrency(it.finalQuote)}
                    </td>
                    <td className="px-4 py-3 text-[11px] text-slate">{it.payment}</td>
                    <td className="px-4 py-3">
                      <Badge tone={statusMeta[it.status].tone}>
                        {statusMeta[it.status].label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        size="sm"
                        variant={it.status === "fully_signed" ? "outline" : "primary"}
                      >
                        {it.status === "fully_signed" ? "查看合同" : "去签约"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
           </div>
          </div>
          <div className="mt-3 rounded-[8px] bg-surface-warm px-3 py-2.5 text-[11px] text-slate">
            <span className="font-semibold text-ink">流程：</span>
            员工基于成单价 + 报价限额自动生成合同草稿 → 客户审批 → 推送达人电签 → 双签完成进入下一步。
          </div>
        </TabsContent>

        <TabsContent value="template">
          <div className="rounded-[10px] border border-border bg-surface p-5">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-brand" />
              <span className="text-[13px] font-semibold text-ink">标准 KOL 服务协议 v3.2</span>
              <Badge tone="teal">已启用</Badge>
            </div>
            <p className="mt-2 text-[12px] text-slate">
              基于法务审核的通用合同模板，包含服务范围、版权授权、违约责任、保密条款、付款方式等核心条款。
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2.5">
              {[
                "服务范围与交付物清单",
                "知识产权与肖像授权",
                "广告法 / 平台合规承诺",
                "保密信息与竞品限制",
                "违约责任与终止条款",
                "争议解决与适用法律",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2 text-[12px] text-ink">
                  <Check className="h-3 w-3 text-teal-text" strokeWidth={3} />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="primary">
                预览完整模板
              </Button>
              <Button size="sm" variant="outline">
                上传定制模板
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="payment">
          <div className="space-y-3">
            <div className="rounded-[10px] border border-border bg-surface p-4">
              <div className="text-[12px] font-semibold text-ink">默认付款节奏 · 30 / 60 / 10</div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[
                  { pct: "30%", title: "签约定金", when: "合同生效 3 个工作日内" },
                  { pct: "60%", title: "出片款", when: "视频审核通过 / 发布后 3 个工作日内" },
                  { pct: "10%", title: "数据达标款", when: "发布 30 天，达成约定 KPI" },
                ].map((m, i) => (
                  <div key={i} className="rounded-[8px] bg-surface-warm p-3">
                    <div className="text-[18px] font-bold text-brand">{m.pct}</div>
                    <div className="mt-1 text-[12px] font-semibold text-ink">{m.title}</div>
                    <div className="mt-1 text-[11px] text-muted">{m.when}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[8px] bg-soft-amber/50 px-3 py-2.5 text-[11px] text-amber-text">
              ⚠️ 高粉量级 / 海外达人可能要求 100% 出片前付清，可在合同列表里 case-by-case 覆盖默认节奏。
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rights">
          <div className="space-y-3">
            <RightCard
              title="使用平台"
              value="抖音 / 小红书 / 视频号 / TikTok / Instagram"
              note="包含品牌官方账号与代运营矩阵号"
            />
            <RightCard
              title="使用时长"
              value="自发布之日起 6 个月"
              note="可付费续约，单次最长 12 个月"
            />
            <RightCard
              title="使用场景"
              value="社媒种草 / 信息流投放 / 详情页 / 落地页"
              note="不包含线下大屏、电视广告（需单独议价）"
            />
            <RightCard
              title="二次创作"
              value="允许剪辑 / 加字幕 / 加品牌 logo"
              note="不允许改变达人原意 / 移除露出"
            />
          </div>
        </TabsContent>
      </Tabs>
    </StepShell>
  );
}

function RightCard({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div className="grid grid-cols-[100px_1fr] gap-4 rounded-[10px] border border-border bg-surface p-4">
      <div className="text-[12px] font-semibold text-muted">{title}</div>
      <div>
        <div className="text-[13px] font-semibold text-ink">{value}</div>
        <div className="mt-1 text-[11px] text-slate">{note}</div>
      </div>
    </div>
  );
}
