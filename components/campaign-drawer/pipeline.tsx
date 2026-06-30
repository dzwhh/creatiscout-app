"use client";
import { Check } from "lucide-react";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import type { Campaign } from "@/lib/types";
import { cn } from "@/lib/utils";
import { StepBrief } from "./steps/step-brief";
import { StepConfirm } from "./steps/step-confirm";
import { StepContent } from "./steps/step-content";
import { StepContract } from "./steps/step-contract";
import { StepMatching } from "./steps/step-matching";
import { StepOutreach } from "./steps/step-outreach";
import { StepSample } from "./steps/step-sample";
import { PipelineAdvanceContext } from "./steps/step-shell";
import { StepTracking } from "./steps/step-tracking";

type StepDef = {
  id: string;
  label: string;
  conditional?: boolean;
};

export function CampaignPipeline({ campaign }: { campaign: Campaign }) {
  const steps: StepDef[] = useMemo(() => {
    const base: StepDef[] = [
      { id: "brief", label: "Brief 理解" },
      { id: "matching", label: "达人匹配" },
      { id: "outreach", label: "达人建联" },
      { id: "confirm", label: "确认合作" },
    ];
    if (campaign.toggles.sampling) {
      base.push({ id: "sample", label: "寄样追踪", conditional: true });
    }
    base.push({ id: "contract", label: "合同签署" });
    base.push({ id: "content", label: "素材产出" });
    base.push({ id: "tracking", label: "效果监控" });
    return base;
  }, [campaign.toggles.sampling]);

  const initialStepId = mapCampaignStepToStepId(campaign.step);
  const initialIdx = steps.findIndex((s) => s.id === initialStepId);
  const [active, setActive] = useState(initialStepId);
  const [currentIdx, setCurrentIdx] = useState(initialIdx < 0 ? 0 : initialIdx);
  const activeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  function advance() {
    const idxOfActive = steps.findIndex((s) => s.id === active);
    if (idxOfActive < 0) return;
    // Mark the active step as completed: ensure currentIdx > idxOfActive
    const nextCurrentIdx = Math.max(currentIdx, idxOfActive + 1);
    setCurrentIdx(Math.min(nextCurrentIdx, steps.length - 1));
    const nextStep = steps[Math.min(idxOfActive + 1, steps.length - 1)];
    if (nextStep) setActive(nextStep.id);
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Step pipeline — horizontally scrollable on narrow widths, fade-out mask on edges */}
      <div className="flex-shrink-0 border-b border-border bg-surface">
        <div
          className="overflow-x-auto px-6 pt-4"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0, #000 16px, #000 calc(100% - 16px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, #000 16px, #000 calc(100% - 16px), transparent 100%)",
            scrollbarWidth: "thin",
          }}
        >
          <div className="flex w-max items-stretch pb-0">
            {steps.map((s, i) => {
              const isPast = i < currentIdx;
              const isCurrent = i === currentIdx;
              const isActive = active === s.id;
              const isLast = i === steps.length - 1;
              return (
                <Fragment key={s.id}>
                  <button
                    ref={isActive ? activeRef : undefined}
                    type="button"
                    onClick={() => setActive(s.id)}
                    className={cn(
                      "group relative flex flex-shrink-0 items-center gap-1.5 px-2 pb-3 pt-1.5 text-[12px] transition-colors",
                      isActive
                        ? "text-brand"
                        : isCurrent
                          ? "text-ink"
                          : isPast
                            ? "text-teal-text"
                            : "text-muted hover:text-ink",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-semibold tabular",
                        isPast && "bg-soft-teal text-teal-text",
                        isCurrent && !isActive && "bg-soft-pink text-brand",
                        isActive && "bg-brand text-white",
                        !isPast && !isCurrent && !isActive && "bg-surface-warm text-muted",
                      )}
                    >
                      {isPast ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : i + 1}
                    </span>
                    <span className="whitespace-nowrap font-medium">{s.label}</span>
                    <span
                      className={cn(
                        "absolute inset-x-1.5 -bottom-px h-[2px] rounded-full transition-colors",
                        isActive ? "bg-brand" : "bg-transparent",
                      )}
                      aria-hidden
                    />
                  </button>
                  {!isLast && (
                    <div className="flex flex-shrink-0 items-center px-1" aria-hidden>
                      <span
                        className={cn(
                          "h-[2px] w-4 rounded-full transition-colors",
                          i < currentIdx ? "bg-teal/60" : "bg-border",
                        )}
                      />
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active step content */}
      <div className="flex-1 overflow-y-auto bg-page p-6">
        <PipelineAdvanceContext.Provider value={advance}>
          {active === "brief" && <StepBrief campaign={campaign} />}
          {active === "matching" && <StepMatching campaign={campaign} />}
          {active === "outreach" && <StepOutreach campaign={campaign} />}
          {active === "confirm" && <StepConfirm campaign={campaign} />}
          {active === "sample" && <StepSample campaign={campaign} />}
          {active === "contract" && <StepContract campaign={campaign} />}
          {active === "content" && <StepContent campaign={campaign} />}
          {active === "tracking" && <StepTracking campaign={campaign} />}
        </PipelineAdvanceContext.Provider>
      </div>
    </div>
  );
}

function mapCampaignStepToStepId(s: Campaign["step"]) {
  switch (s) {
    case "brief":
      return "brief";
    case "matching":
      return "matching";
    case "outreach":
      return "outreach";
    case "confirm":
      return "confirm";
    case "sample":
      return "sample";
    case "contract":
      return "contract";
    case "content":
      return "content";
    case "tracking":
      return "tracking";
  }
}
