import { Plug, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const connectors = [
  { name: "飞书邮箱", status: "connected", desc: "起草、发送、监听新邮件" },
  { name: "TikTok 后台", status: "connected", desc: "数据拉取、广告 code 绑定" },
  { name: "小红书 商家版", status: "connected", desc: "笔记发布、互动数据" },
  { name: "顺丰物流 API", status: "available", desc: "寄样物流追踪" },
  { name: "财务系统 OA", status: "available", desc: "合同 / 付款流转" },
];

export default function ConnectorsPage() {
  return (
    <div className="space-y-5 p-7 lg:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-semibold text-ink">连接器</h2>
        <Button variant="soft">
          <Plus className="h-3.5 w-3.5" /> 添加新连接
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {connectors.map((c) => (
          <div key={c.name} className="rounded-2xl border border-border bg-surface p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface">
                <Plug className="h-4 w-4 text-slate" />
              </div>
              <span className="text-[13px] font-semibold text-ink">{c.name}</span>
              <Badge tone={c.status === "connected" ? "olive" : "gray"} className="ml-auto">
                {c.status === "connected" ? "已接入" : "未启用"}
              </Badge>
            </div>
            <p className="mt-2 text-[12px] text-slate">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
