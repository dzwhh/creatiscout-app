"use client";
import { AlertTriangle, Bot, CheckCircle2, Clock } from "lucide-react";
import { createContext, useContext } from "react";
import { Button } from "@/components/ui/button";

interface StepShellProps {
  agentStatus: "done" | "running" | "waiting-human";
  agentText: string;
  cta?: { label: string; tone?: "primary" | "olive" | "teal"; onClick?: () => void };
  children: React.ReactNode;
}

export const PipelineAdvanceContext = createContext<(() => void) | null>(null);

export function StepShell({ agentStatus, agentText, cta, children }: StepShellProps) {
  const advance = useContext(PipelineAdvanceContext);
  const handleClick = () => {
    cta?.onClick?.();
    advance?.();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3">
        <div className="flex items-center gap-3">
          {agentStatus === "done" && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-soft-olive">
              <CheckCircle2 className="h-4 w-4 text-olive-text" />
            </div>
          )}
          {agentStatus === "running" && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-soft-teal">
              <Bot className="h-4 w-4 text-teal-text" />
            </div>
          )}
          {agentStatus === "waiting-human" && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-soft-amber">
              <AlertTriangle className="h-4 w-4 text-amber-text" />
            </div>
          )}
          <div>
            <div className="text-[13px] font-medium text-ink">{agentText}</div>
            <div className="flex items-center gap-1 text-[11px] text-muted">
              <Clock className="h-3 w-3" />
              <span>
                {agentStatus === "done"
                  ? "已完成"
                  : agentStatus === "running"
                    ? "进行中"
                    : "等待你确认"}
              </span>
            </div>
          </div>
        </div>
        {cta && (
          <Button variant={cta.tone ?? "primary"} size="sm" onClick={handleClick}>
            {cta.label}
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}
