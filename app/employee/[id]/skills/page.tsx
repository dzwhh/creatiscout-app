"use client";
import { Plus, Sparkles } from "lucide-react";
import { use } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { getEmployee } from "@/lib/mock/employees";

export default function SkillsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const e = getEmployee(id);
  return (
    <div className="space-y-5 p-7 lg:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-semibold text-ink">技能</h2>
        <Button>
          <Plus className="h-3.5 w-3.5" /> 添加技能
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {e?.skills.map((s) => (
          <div key={s} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-soft-pink">
              <Sparkles className="h-4 w-4 text-brand-strong" />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-ink">{s}</div>
              <div className="text-[11px] text-muted">已掌握 · 调用 24 次</div>
            </div>
            <Switch defaultChecked />
          </div>
        ))}
      </div>
    </div>
  );
}
