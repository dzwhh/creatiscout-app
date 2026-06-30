"use client";
import { ArrowRight, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { employees } from "@/lib/mock/employees";
import { formatRelative } from "@/lib/utils";

const roleTemplates = [
  { id: "content", name: "内容运营专员", icon: "✍️", desc: "脚本生成、笔记创作、评论互动、品牌合规" },
  { id: "matching", name: "达人匹配专员", icon: "🔍", desc: "画像、契合度评估、私域池管理" },
  { id: "outreach", name: "外联谈判专员", icon: "📮", desc: "邮件起草、多轮报价、合同推进" },
  { id: "tracking", name: "数据分析专员", icon: "📊", desc: "投放数据、ROI 异常预警、复盘" },
];

export default function EmployeesPage() {
  return (
    <div className="space-y-6 p-7 lg:p-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[24px] font-semibold tracking-tight text-ink">
            数字员工
          </h2>
          <p className="mt-1 text-[13px] text-slate">
            每位员工是一个角色实例，可单独配置技能、连接器、项目权限。
          </p>
        </div>
        <Button>
          <Plus className="h-3.5 w-3.5" /> 添加员工
        </Button>
      </div>

      {/* Hired employees */}
      <section>
        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate">
          在班 ({employees.length})
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {employees.map((e) => (
            <Link
              key={e.id}
              href={`/employee/${e.id}`}
              className="group rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-elev"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={e.avatar}
                    alt=""
                    className="h-14 w-14 rounded-2xl ring-2 ring-border"
                  />
                  {e.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-teal" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[18px] font-semibold text-ink">
                      {e.name}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand-strong" />
                  </div>
                  <Badge tone="lavender">{e.role}</Badge>
                </div>
              </div>
              <p className="mt-3 line-clamp-2 text-[12px] leading-relaxed text-slate">{e.bio}</p>
              <div className="mt-4 grid grid-cols-3 gap-1 border-t border-border pt-3 text-center">
                <div>
                  <div className="tabular text-[18px] font-semibold text-ink">
                    {e.stats.projects}
                  </div>
                  <div className="text-[10px] text-muted">项目</div>
                </div>
                <div>
                  <div className="tabular text-[18px] font-semibold text-ink">
                    {e.stats.chatTasks}
                  </div>
                  <div className="text-[10px] text-muted">对话任务</div>
                </div>
                <div>
                  <div className="tabular text-[18px] font-semibold text-ink">
                    {e.stats.autoTasks}
                  </div>
                  <div className="text-[10px] text-muted">自动任务</div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {e.skills.slice(0, 3).map((s) => (
                  <Badge key={s} tone="gray">
                    {s}
                  </Badge>
                ))}
                {e.skills.length > 3 && <Badge tone="gray">+{e.skills.length - 3}</Badge>}
              </div>
              <div className="mt-3 text-[10px] text-muted">入职 {formatRelative(e.joinedAt)}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Role templates */}
      <section>
        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate">
          从角色模板招聘
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {roleTemplates.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl bg-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-elev"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-warm text-2xl">
                {r.icon}
              </div>
              <div className="mt-3 text-[15px] font-semibold text-ink">{r.name}</div>
              <p className="mt-1 text-[11px] leading-relaxed text-muted">{r.desc}</p>
              <button
                type="button"
                className="mt-3 flex items-center gap-1 text-[12px] font-medium text-brand-strong transition-colors hover:text-[#D81D63]"
              >
                <Sparkles className="h-3 w-3" /> 招聘
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
