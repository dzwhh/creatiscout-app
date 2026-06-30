import { Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const scopes = [
  { name: "Campaigns · 所有挂靠项目", level: "读写" },
  { name: "私域达人池", level: "读写" },
  { name: "邮件中心 · 起草", level: "读写" },
  { name: "邮件中心 · 自动发送", level: "需要确认" },
  { name: "Tracking 竞品", level: "只读" },
  { name: "财务系统", level: "禁止" },
];

export default function PermissionsPage() {
  return (
    <div className="space-y-5 p-7 lg:p-8">
      <div>
        <h2 className="text-[16px] font-semibold text-ink">权限</h2>
        <p className="mt-0.5 text-[12px] text-muted">控制这位员工能看什么、能改什么、能自动做什么。</p>
      </div>
      <ul className="divide-y divide-border rounded-2xl border border-border bg-surface">
        {scopes.map((s) => (
          <li key={s.name} className="flex items-center gap-4 px-4 py-3.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-soft-blue">
              <Lock className="h-4 w-4 text-blue-text" />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-medium text-ink">{s.name}</div>
            </div>
            <Badge tone={s.level === "禁止" ? "amber" : s.level === "需要确认" ? "blue" : "olive"}>
              {s.level}
            </Badge>
            <Switch defaultChecked={s.level !== "禁止"} />
          </li>
        ))}
      </ul>
    </div>
  );
}
