import { Clock, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const tasks = [
  { name: "每周一拉竞品 TOP 视频", cron: "每周一 09:00", last: "3 天前 · 成功", status: "running" },
  { name: "邮件自动跟进 · 3 天未回复", cron: "每日 10:00", last: "今天 10:01 · 发出 8 封", status: "running" },
  { name: "私域池新增达人画像更新", cron: "每周日 22:00", last: "1 天前", status: "paused" },
];

export default function AutoTasksPage() {
  return (
    <div className="space-y-5 p-7 lg:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-semibold text-ink">自动任务</h2>
        <Button>
          <Plus className="h-3.5 w-3.5" /> 新建定时任务
        </Button>
      </div>
      <ul className="divide-y divide-border rounded-2xl border border-border bg-surface">
        {tasks.map((t) => (
          <li key={t.name} className="flex items-center gap-4 px-4 py-3.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-soft-blue text-blue-text">
              <Clock className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-medium text-ink">{t.name}</div>
              <div className="text-[11px] text-muted">{t.cron} · 上次：{t.last}</div>
            </div>
            <Badge tone={t.status === "running" ? "olive" : "amber"}>
              {t.status === "running" ? "运行中" : "暂停"}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
