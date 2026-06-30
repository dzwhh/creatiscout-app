import { Edit3, FileText } from "lucide-react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getEmployee } from "@/lib/mock/employees";

export default async function EmployeeHomePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const employee = getEmployee(id);
  if (!employee) return notFound();

  const rows = 7;
  const cols = 48;
  const cells = Array.from({ length: rows * cols }, (_, i) => {
    const seed = (i * 9301 + 49297 + id.charCodeAt(0) * 17) % 233280;
    const r = seed / 233280;
    if (r > 0.93) return 4;
    if (r > 0.85) return 3;
    if (r > 0.72) return 2;
    if (r > 0.58) return 1;
    return 0;
  });
  const heatClass = ["bg-heat-0", "bg-heat-1", "bg-heat-2", "bg-heat-3", "bg-heat-4"];
  const months = [
    "7月", "8月", "9月", "10月", "11月", "12月",
    "1月", "2月", "3月", "4月", "5月", "6月",
  ];

  return (
    <div className="space-y-6 p-7 lg:p-8">
      {/* Hero card — flat, no decoration */}
      <section className="rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-start gap-6">
          <img
            src={employee.avatar}
            alt=""
            className="h-20 w-20 flex-shrink-0 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-[24px] font-semibold tracking-tight text-ink">{employee.name}</h1>
              <Badge tone="lavender">{employee.role}</Badge>
            </div>
            <div className="mt-2 flex items-center gap-3 text-[12px] text-slate">
              <span className="flex items-center gap-1.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    employee.online ? "bg-teal" : "bg-muted"
                  }`}
                />
                {employee.online ? "在线" : "离线"}
              </span>
              <span className="text-muted">·</span>
              <span>入职时间：{employee.joinedAt}</span>
              <span className="text-muted">·</span>
              <span className="font-mono text-[11px]">ID: {employee.id}</span>
            </div>
            <p className="mt-3 max-w-prose text-[13.5px] leading-relaxed text-ink/80">
              {employee.bio}
            </p>
            <Button variant="ghost" size="sm" className="mt-2 -ml-2">
              <Edit3 className="h-3.5 w-3.5" /> 编辑
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm">
              <FileText className="h-3.5 w-3.5" /> 查看产物
            </Button>
            <Button variant="ghost" size="sm">
              运行记录
            </Button>
          </div>
        </div>
      </section>

      {/* Work record */}
      <section className="rounded-2xl border border-border bg-surface p-6">
        <div className="mb-5 flex items-center gap-3">
          <h2 className="text-[15px] font-semibold tracking-tight text-ink">工作记录</h2>
          <Badge tone="gray">时间线视图</Badge>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="入职天数" value="38" sub="天" />
          <StatCard label="自动任务" value={String(employee.stats.autoTasks)} />
          <StatCard label="对话任务" value={String(employee.stats.chatTasks)} />
          <StatCard label="已创建项目" value={String(employee.stats.projects)} />
        </div>

        <div className="mt-6">
          <div className="mb-2 grid grid-cols-12 gap-1 pl-10 text-[10px] text-muted">
            {months.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <div className="flex gap-2">
            <div
              className="flex flex-col justify-around text-[10px] text-muted"
              style={{ height: rows * 14 - 4 }}
            >
              <span>周一</span>
              <span>周三</span>
              <span>周五</span>
            </div>
            <div
              className="grid gap-[3px]"
              style={{
                gridTemplateColumns: `repeat(${cols}, 10px)`,
                gridTemplateRows: `repeat(${rows}, 10px)`,
                gridAutoFlow: "column",
              }}
            >
              {cells.map((v, i) => (
                <div
                  key={i}
                  className={`h-2.5 w-2.5 rounded-[3px] ${heatClass[v]}`}
                  title={`贡献度 ${v}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end gap-1.5 text-[10px] text-muted">
            <span>少</span>
            {heatClass.map((c, i) => (
              <span key={i} className={`h-2.5 w-2.5 rounded-[3px] ${c}`} />
            ))}
            <span>多</span>
          </div>
        </div>
      </section>

      {/* Memory */}
      <section className="rounded-2xl border border-border bg-surface p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[15px] font-semibold tracking-tight text-ink">记忆与积累</h2>
          <a
            href={`/employee/${employee.id}/memory`}
            className="text-[12px] text-slate transition-colors hover:text-ink"
          >
            查看完整记忆 →
          </a>
        </div>
        <ul className="space-y-2">
          {[
            { title: "学到新技能：小红书爆款笔记重写", src: "对话任务", ts: "27 天前", tone: "lavender" as const },
            { title: "记忆：客户偏好夏日清爽调性", src: "618 美妆", ts: "3 天前", tone: "pink" as const },
            { title: "技能升级：报价谈判转人工阈值优化", src: "外联实战", ts: "2 天前", tone: "olive" as const },
          ].map((m, i) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-[8px] bg-surface-warm px-4 py-3 transition-colors hover:bg-soft-pink"
            >
              <Badge tone={m.tone}>{m.src}</Badge>
              <span className="flex-1 text-[13px] text-ink">{m.title}</span>
              <span className="tabular text-[11px] text-muted">{m.ts}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="text-[28px] font-semibold leading-none text-ink">
        <span className="tabular">{value}</span>
        {sub && <span className="ml-0.5 text-[13px] font-medium text-slate">{sub}</span>}
      </div>
      <div className="mt-2 text-[12px] text-slate">{label}</div>
    </div>
  );
}
