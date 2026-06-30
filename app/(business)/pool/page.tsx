"use client";
import { Filter, Plus, Search, Upload } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { creators } from "@/lib/mock/creators";
import { formatCurrency } from "@/lib/utils";

const extras = [
  ["高互动", "通勤美妆"],
  ["北美华人", "性价比"],
  ["头部", "母婴交叉"],
  ["瑜伽垂类", "海外"],
  ["新锐 micro", "高 CPM"],
];

export default function PoolPage() {
  const [q, setQ] = useState("");
  const list = creators.filter((c) => (q ? c.name.includes(q) || c.handle.includes(q) : true));
  const heatColors = ["bg-soft-pink text-brand-strong", "bg-soft-teal text-teal-text", "bg-soft-amber text-amber-text"];

  return (
    <div className="space-y-5 p-7 lg:p-8">
      <div className="flex items-center gap-3">
        <h2 className="text-[16px] font-semibold text-ink">私域达人池</h2>
        <Badge tone="lavender">{creators.length} 位合作过</Badge>
        <div className="ml-auto flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5">
          <Search className="h-3.5 w-3.5 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索达人 / 标签…"
            className="w-56 border-0 bg-transparent text-[13px] outline-none placeholder:text-muted"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-3.5 w-3.5" /> 筛选
        </Button>
        <Button variant="soft" size="sm">
          <Upload className="h-3.5 w-3.5" /> 导入
        </Button>
        <Button size="sm">
          <Plus className="h-3.5 w-3.5" /> 添加
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <table className="w-full text-[13px]">
          <thead className="bg-surface text-[11px] uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 text-left font-medium">达人</th>
              <th className="px-4 py-3 text-left font-medium">平台 / 粉丝</th>
              <th className="px-4 py-3 text-left font-medium">标签</th>
              <th className="px-4 py-3 text-right font-medium">合作</th>
              <th className="px-4 py-3 text-right font-medium">平均报价</th>
              <th className="px-4 py-3 text-right font-medium">互动率</th>
              <th className="px-4 py-3 text-left font-medium">关系热度</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {list.map((c, i) => (
              <tr key={c.id} className="hover:bg-surface">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <img src={c.avatar} alt="" className="h-8 w-8 rounded-full" />
                    <div>
                      <div className="font-medium text-ink">{c.name}</div>
                      <div className="text-[11px] text-muted">{c.handle}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-ink">{c.platform}</div>
                  <div className="text-[11px] text-muted">{(c.followers / 1000).toFixed(0)}k 粉</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {(extras[i] ?? []).map((t) => (
                      <Badge key={t} tone="lavender">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-medium text-ink">{c.collaborations ?? 0} 次</td>
                <td className="px-4 py-3 text-right font-medium text-ink">
                  {formatCurrency(c.averageQuote ?? 0)}
                </td>
                <td className="px-4 py-3 text-right text-ink">{c.engagement}%</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      heatColors[i % 3]
                    }`}
                  >
                    {["🔥 高", "🌿 中", "💤 低"][i % 3]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
