"use client";
import {
  ArrowLeft,
  Bell,
  Brain,
  ChevronDown,
  FolderOpen,
  Home,
  Lock,
  MessageCircle,
  MessageSquare,
  Plug,
  Settings,
  Sparkles,
  Timer,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Employee } from "@/lib/types";
import { cn } from "@/lib/utils";

const items = [
  { suffix: "", label: "首页", icon: Home },
  { suffix: "/projects", label: "项目", icon: FolderOpen },
  { suffix: "/auto-tasks", label: "自动任务", icon: Timer },
  { suffix: "/chats", label: "对话任务", icon: MessageSquare },
  { suffix: "/memory", label: "记忆", icon: Brain },
  { suffix: "/skills", label: "技能", icon: Sparkles },
  { suffix: "/connectors", label: "连接器", icon: Plug },
  { suffix: "/im", label: "IM", icon: MessageCircle },
  { suffix: "/permissions", label: "权限", icon: Lock },
];

export function EmployeeSidebar({ employee }: { employee: Employee }) {
  const pathname = usePathname();
  const base = `/employee/${employee.id}`;

  return (
    <aside className="flex h-full w-[212px] flex-shrink-0 flex-col border-r border-border bg-surface">
      {/* Back */}
      <div className="px-3 pt-3">
        <Link
          href="/employees"
          className="flex items-center gap-2 rounded-[8px] px-2 py-1.5 text-[12px] text-slate transition-colors hover:bg-surface-warm hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          返回对话
        </Link>
      </div>

      {/* Employee */}
      <div className="px-3 pb-2 pt-2">
        <div className="flex items-center gap-2.5 rounded-[10px] border border-border bg-surface px-3 py-2.5">
          <img src={employee.avatar} alt="" className="h-9 w-9 rounded-full" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-semibold text-ink">{employee.name}</div>
            <div className="text-[10px] text-muted">{employee.role}</div>
          </div>
          {employee.online && <span className="h-2 w-2 rounded-full bg-teal" />}
        </div>
      </div>

      <div className="mx-3 my-1 border-t border-border" />

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 px-2.5 py-2">
        {items.map((it) => {
          const href = base + it.suffix;
          const active = pathname === href || (it.suffix === "" && pathname === base);
          const Icon = it.icon;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex h-10 items-center gap-3 rounded-[8px] px-3 text-[13px] font-medium transition-colors",
                active
                  ? "bg-soft-pink text-brand"
                  : "text-slate hover:bg-surface-warm hover:text-ink",
              )}
            >
              {active && (
                <span
                  className="absolute -left-2.5 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-brand"
                  aria-hidden
                />
              )}
              <Icon className="h-[18px] w-[18px]" />
              <span>{it.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="space-y-3 border-t border-border p-3">
        <div className="flex items-center gap-2 px-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-navy text-[11px] font-bold text-white">
            KO
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12px] font-semibold text-ink">KOL Ops Team</div>
            <div className="text-[10px] text-muted">
              在班 · <span className="text-teal-text">Live</span>
            </div>
          </div>
          <ChevronDown className="h-3 w-3 text-muted" />
        </div>
        <div className="flex items-center gap-5 px-2 text-muted">
          <Settings className="h-4 w-4 cursor-pointer hover:text-ink" />
          <Bell className="h-4 w-4 cursor-pointer hover:text-ink" />
        </div>
      </div>
    </aside>
  );
}
