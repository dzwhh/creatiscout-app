"use client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/store/ui-store";

export default function EmployeeProjectsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const campaigns = useUIStore((s) => s.campaigns);
  const router = useRouter();
  const owned = campaigns.filter((c) => c.ownerId === id);

  return (
    <div className="space-y-5 p-7 lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[16px] font-semibold text-ink">挂靠项目</h2>
          <p className="mt-0.5 text-[12px] text-muted">
            挂靠 = 授予该员工读取项目所有信息的权限。可在新建 campaign 时自动指派。
          </p>
        </div>
        <Button>
          <Plus className="h-3.5 w-3.5" /> 挂靠新项目
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <table className="w-full text-[13px]">
          <thead className="bg-surface text-[11px] uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 text-left font-medium">项目</th>
              <th className="px-4 py-3 text-left font-medium">角色</th>
              <th className="px-4 py-3 text-left font-medium">权限</th>
              <th className="px-4 py-3 text-left font-medium">加入时间</th>
              <th className="px-4 py-3 text-right font-medium">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {owned.map((c) => (
              <tr key={c.id} className="hover:bg-surface">
                <td className="px-4 py-3 font-medium text-ink">{c.name}</td>
                <td className="px-4 py-3">
                  <Badge tone="pink">Owner</Badge>
                </td>
                <td className="px-4 py-3 text-slate">读写 · 所有阶段</td>
                <td className="px-4 py-3 text-slate">{c.startAt}</td>
                <td className="px-4 py-3 text-right">
                  <Button size="sm" variant="outline" onClick={() => router.push(`/campaigns/${c.id}`)}>
                    打开
                  </Button>
                </td>
              </tr>
            ))}
            {owned.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-[12px] text-muted">
                  还没有挂靠的项目
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
