"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bold,
  ChevronLeft,
  ChevronDown,
  Clock,
  Eye,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  Italic,
  Link2,
  Mail,
  Paperclip,
  Pencil,
  Plus,
  Redo2,
  Save,
  Send,
  Strikethrough,
  Type,
  Undo2,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/store/ui-store";
import { cn } from "@/lib/utils";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
}

const systemTemplates: EmailTemplate[] = [
  { id: "tpl-1", name: "Third follow-up", subject: "👋 One last note – let's..." },
  { id: "tpl-2", name: "Second follow-up", subject: "👀 Quick check-in: ope..." },
  { id: "tpl-3", name: "First follow-up", subject: "👀 Need more time to..." },
  { id: "tpl-4", name: "Seeding (no-strin...", subject: "Could I send you a fre..." },
  { id: "tpl-5", name: "Initial outreach (d...", subject: "{{creator_name}} X..." },
  { id: "tpl-6", name: "Initial outreach (s...", subject: "{{creator_name}} X..." },
];

const myTemplates: EmailTemplate[] = [
  { id: "tpl-7", name: "First follow-up", subject: "👀 Need more time to..." },
  { id: "tpl-8", name: "Seeding (no-strin...", subject: "Could I send you a fre..." },
  { id: "tpl-9", name: "Initial outreach (d...", subject: "{{creator_name}} X..." },
  { id: "tpl-10", name: "Initial outreach (s...", subject: "{{creator_name}} X..." },
];

export function NewEmailDrawer() {
  const { mailOpen, mailContext, closeMail } = useUIStore();
  const [sendMode, setSendMode] = useState<"smart" | "now">("smart");
  const [scheduleMode, setScheduleMode] = useState<"auto" | "manual">("auto");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [templatesCollapsed, setTemplatesCollapsed] = useState(false);

  const recipientCount = mailContext?.influencerCount ?? 9;
  const groupName = useMemo(() => {
    if (mailContext?.defaultGroupName) return mailContext.defaultGroupName;
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `tiktok_${mailContext?.batchId ?? "BATCH"}_${now.getFullYear()}-${pad(
      now.getMonth() + 1,
    )}-${pad(now.getDate())}_${pad(now.getHours())}:${pad(now.getMinutes())}`;
  }, [mailContext]);

  return (
    <AnimatePresence>
      {mailOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMail}
            className="fixed inset-0 z-40 bg-ink/20"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 260 }}
            className="fixed right-0 top-0 z-50 flex h-full w-[min(1100px,96vw)] flex-col bg-page shadow-drawer"
          >
            {/* Header */}
            <div className="flex h-[60px] flex-shrink-0 items-center justify-between border-b border-border bg-surface px-6">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-slate" />
                <h2 className="text-[16px] font-bold tracking-tight text-navy">New Email</h2>
              </div>
              <button
                type="button"
                onClick={closeMail}
                aria-label="关闭"
                className="flex h-8 w-8 items-center justify-center rounded-[8px] text-slate transition-colors hover:bg-surface-warm hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body: left config + right templates */}
            <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_auto]">
              {/* LEFT — Config */}
              <div className="min-w-0 overflow-y-auto bg-page p-6">
                <div className="space-y-5 rounded-[12px] border border-border bg-surface p-6">
                  {/* Subject */}
                  <div>
                    <label className="block text-[13px] font-semibold text-ink">
                      Subject <span className="text-brand">*</span>
                    </label>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex h-10 flex-1 items-center rounded-[8px] border border-border bg-surface px-3 focus-within:border-border-strong">
                        <input
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="Enter subject"
                          className="flex-1 border-0 bg-transparent text-[13px] text-ink outline-none placeholder:text-muted"
                        />
                      </div>
                      <VariableButton />
                    </div>
                  </div>

                  {/* Sender + Send Mode */}
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-ink">
                        Sender Address
                      </label>
                      <button
                        type="button"
                        className="mt-2 flex h-10 w-full items-center justify-between rounded-[8px] border border-border bg-surface px-3 text-left hover:border-border-strong"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-semibold text-ink">
                            Custom Domain Pool
                          </span>
                          <span className="text-[11px] text-muted">
                            collab@creativault.*
                          </span>
                        </div>
                        <ChevronDown className="h-3.5 w-3.5 text-muted" />
                      </button>
                      <div className="mt-2 flex items-center gap-3 text-[11px]">
                        <span className="flex items-center gap-1 text-muted">
                          Sender prefix
                          <HelpCircle className="h-3 w-3" />
                        </span>
                        <button
                          type="button"
                          className="text-brand transition-colors hover:text-brand-hover"
                        >
                          + Manage prefixes
                        </button>
                        <button
                          type="button"
                          className="ml-auto flex h-7 items-center gap-1 rounded-[6px] border border-border bg-surface px-2 text-[12px] text-ink hover:bg-surface-warm"
                        >
                          System default
                          <ChevronDown className="h-3 w-3 text-muted" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-ink">
                        Send Mode
                      </label>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <SendModeButton
                          icon={<Clock className="h-3.5 w-3.5" />}
                          label="Smart Send"
                          active={sendMode === "smart"}
                          onClick={() => setSendMode("smart")}
                        />
                        <SendModeButton
                          icon={<Zap className="h-3.5 w-3.5" />}
                          label="Send Now"
                          active={sendMode === "now"}
                          onClick={() => setSendMode("now")}
                        />
                      </div>
                      {sendMode === "smart" && (
                        <>
                          <div className="mt-2 inline-flex rounded-[8px] border border-border bg-surface p-0.5">
                            <ScheduleTab
                              label="✓ Auto schedule"
                              active={scheduleMode === "auto"}
                              onClick={() => setScheduleMode("auto")}
                            />
                            <ScheduleTab
                              label="Pick my own time"
                              active={scheduleMode === "manual"}
                              onClick={() => setScheduleMode("manual")}
                            />
                          </div>
                          <p className="mt-1.5 text-[11px] text-muted">
                            System auto-optimizes send time by local 10:00 AM
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Recipients */}
                  <div>
                    <label className="block text-[13px] font-semibold text-ink">
                      Recipients{" "}
                      <span className="text-[11px] font-normal text-muted">
                        (all influencers with email)
                      </span>
                    </label>
                    <div className="mt-2 flex h-12 items-center gap-3 rounded-[8px] border border-border bg-surface px-3">
                      <div className="flex -space-x-1.5">
                        {[14, 47, 32].map((n) => (
                          <img
                            key={n}
                            src={`https://i.pravatar.cc/40?img=${n}`}
                            alt=""
                            className="h-6 w-6 rounded-full border-2 border-surface"
                          />
                        ))}
                      </div>
                      <span className="tabular text-[11px] font-semibold text-brand">
                        +{Math.max(0, recipientCount - 3)}
                      </span>
                      <span className="text-[13px] font-medium text-ink">
                        Recipients ({recipientCount})
                      </span>
                      <div className="ml-auto flex items-center gap-1.5 text-muted">
                        <HelpCircle className="h-3.5 w-3.5 cursor-pointer hover:text-ink" />
                        <Pencil className="h-3.5 w-3.5 cursor-pointer hover:text-ink" />
                        <ChevronDown className="h-3.5 w-3.5 cursor-pointer hover:text-ink -rotate-90" />
                      </div>
                    </div>
                  </div>

                  {/* Est. Send Time info box */}
                  {sendMode === "smart" && (
                    <div className="flex gap-2.5 rounded-[8px] border border-[#BCD3FF] bg-[#EEF5FF] p-3.5 text-[12px]">
                      <Clock className="h-4 w-4 flex-shrink-0 text-blue-text" />
                      <div className="space-y-0.5">
                        <div className="font-semibold text-blue-text">Est. Send Time</div>
                        <p className="text-blue-text/85">
                          Each email will be scheduled to arrive at 10:00 AM in the recipient's
                          local timezone.
                        </p>
                        <p className="text-blue-text/85">
                          Sending via custom domain pool. Actual send time will be shown after
                          scheduling.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Email Group Name */}
                  <div>
                    <label className="block text-[13px] font-semibold text-ink">
                      Email Group Name <span className="text-brand">*</span>
                    </label>
                    <div className="mt-2 flex h-10 items-center rounded-[8px] border border-border bg-surface px-3 focus-within:border-border-strong">
                      <input
                        defaultValue={groupName}
                        className="flex-1 border-0 bg-transparent font-mono text-[12.5px] text-ink outline-none"
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-muted">
                      Used to identify this batch email group
                    </p>
                  </div>

                  {/* A/B test toggle */}
                  <div className="flex items-center justify-end gap-2 border-t border-border pt-4">
                    <HelpCircle className="h-3.5 w-3.5 text-muted" />
                    <span className="text-[13px] text-ink">A/B Test</span>
                    <span className="relative inline-block h-[18px] w-8 rounded-full bg-[#E1E4EA]">
                      <span className="absolute left-[2px] top-[2px] block h-[14px] w-[14px] rounded-full bg-white" />
                    </span>
                  </div>

                  {/* Rich text toolbar */}
                  <div className="flex flex-wrap items-center gap-1 rounded-t-[8px] border border-b-0 border-border bg-surface-warm/60 px-2 py-1.5">
                    <ToolbarBtn icon={<Undo2 className="h-3.5 w-3.5" />} />
                    <ToolbarBtn icon={<Redo2 className="h-3.5 w-3.5" />} />
                    <Sep />
                    <ToolbarBtn icon={<X className="h-3.5 w-3.5" />} />
                    <ToolbarBtn icon={<Bold className="h-3.5 w-3.5" />} />
                    <ToolbarBtn icon={<Italic className="h-3.5 w-3.5 italic" />} />
                    <ToolbarBtn icon={<Strikethrough className="h-3.5 w-3.5" />} />
                    <ToolbarBtn
                      icon={
                        <span className="flex flex-col items-center leading-none">
                          <Type className="h-3 w-3" />
                          <span className="mt-px h-[2px] w-3 bg-brand" />
                        </span>
                      }
                    />
                    <Sep />
                    <ToolbarBtn label="—" />
                    <ToolbarBtn icon={<span className="text-[12px] font-bold">#</span>} />
                    <Sep />
                    <ToolbarBtn label="H1" />
                    <ToolbarBtn label="H2" />
                    <ToolbarBtn label="H3" />
                    <button
                      type="button"
                      className="flex h-7 items-center gap-1 rounded-[6px] px-2 text-[11.5px] text-ink hover:bg-surface"
                    >
                      14px <ChevronDown className="h-3 w-3 text-muted" />
                    </button>
                    <Sep />
                    <ToolbarBtn icon={<ImageIcon className="h-3.5 w-3.5" />} />
                    <ToolbarBtn icon={<Link2 className="h-3.5 w-3.5" />} />
                    <div className="ml-auto">
                      <VariableButton />
                    </div>
                  </div>

                  {/* Content area */}
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter email content..."
                    rows={10}
                    className="-mt-5 block w-full resize-y rounded-b-[8px] border border-border bg-surface px-4 py-3 text-[13px] text-ink outline-none placeholder:text-muted focus:border-border-strong"
                  />

                  {/* Add attachment */}
                  <div className="flex items-center gap-2 text-[12px]">
                    <Paperclip className="h-3.5 w-3.5 text-slate" />
                    <button
                      type="button"
                      className="font-medium text-ink hover:text-brand"
                    >
                      Add Attachment
                    </button>
                    <span className="text-muted">Max 10 files, 5MB each</span>
                  </div>
                </div>
              </div>

              {/* RIGHT — Templates rail */}
              <div
                className={cn(
                  "flex flex-shrink-0 flex-col border-l border-border bg-surface transition-[width] duration-200",
                  templatesCollapsed ? "w-[44px]" : "w-[320px]",
                )}
              >
                {templatesCollapsed ? (
                  <button
                    type="button"
                    onClick={() => setTemplatesCollapsed(false)}
                    className="mx-auto mt-4 flex h-8 w-8 items-center justify-center rounded-[6px] text-muted hover:bg-surface-warm hover:text-ink"
                    aria-label="展开模板"
                  >
                    <ChevronLeft className="h-4 w-4 rotate-180" />
                  </button>
                ) : (
                  <>
                    <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setTemplatesCollapsed(true)}
                        aria-label="收起模板"
                        className="flex h-7 w-7 items-center justify-center rounded-[6px] text-muted hover:bg-surface-warm hover:text-ink"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="text-[14px] font-bold text-navy">Email Templates</span>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      <TemplateGroup title="SYSTEM TEMPLATES" count={systemTemplates.length}>
                        {systemTemplates.map((t) => (
                          <TemplateRow key={t.id} template={t} system />
                        ))}
                      </TemplateGroup>
                      <div className="px-4 py-3">
                        <button
                          type="button"
                          className="flex w-full items-center justify-center gap-1 rounded-[8px] border border-dashed border-[#BCD3FF] bg-[#F6FAFF] py-2 text-[13px] font-medium text-blue-text hover:bg-[#EEF5FF]"
                        >
                          <Plus className="h-3.5 w-3.5" /> New Template
                        </button>
                      </div>
                      <TemplateGroup title="MY TEMPLATES" count={myTemplates.length}>
                        {myTemplates.map((t) => (
                          <TemplateRow key={t.id} template={t} />
                        ))}
                      </TemplateGroup>
                      <div className="px-4 py-3">
                        <button
                          type="button"
                          className="flex w-full items-center justify-center gap-1 rounded-[8px] border border-dashed border-[#BCD3FF] bg-[#F6FAFF] py-2 text-[13px] font-medium text-blue-text hover:bg-[#EEF5FF]"
                        >
                          <Plus className="h-3.5 w-3.5" /> New Template
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-shrink-0 items-center justify-end gap-2 border-t border-border bg-surface px-6 py-3.5">
              <Button variant="outline" onClick={closeMail}>
                Cancel
              </Button>
              <Button variant="outline">
                <Save className="h-3.5 w-3.5" /> Save Draft
              </Button>
              <Button variant="outline">
                <Eye className="h-3.5 w-3.5" /> Preview
              </Button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-[8px] bg-blue px-4 py-2 text-[13px] font-semibold text-white shadow-card hover:bg-blue-text"
              >
                <Mail className="h-3.5 w-3.5" /> Send
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------- Sub components ---------- */

function VariableButton() {
  return (
    <button
      type="button"
      className="inline-flex h-9 items-center gap-1.5 rounded-[8px] border border-[#BCD3FF] bg-[#EEF5FF] px-3 text-[12.5px] font-medium text-blue-text hover:bg-[#DEEBFE]"
    >
      <span className="grid h-3.5 w-3.5 grid-cols-2 gap-px">
        <span className="bg-blue-text" />
        <span className="bg-blue-text" />
        <span className="bg-blue-text" />
        <span className="bg-blue-text" />
      </span>
      Variable
    </button>
  );
}

function SendModeButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-10 items-center justify-center gap-1.5 rounded-[8px] border text-[13px] font-medium transition-all",
        active
          ? "border-blue bg-[#EEF5FF] text-blue-text"
          : "border-border bg-surface text-slate hover:bg-surface-warm",
      )}
    >
      <span
        className={cn(
          "flex h-3.5 w-3.5 items-center justify-center rounded-full border-2",
          active ? "border-blue" : "border-[#D3D7DE]",
        )}
      >
        {active && <span className="h-1.5 w-1.5 rounded-full bg-blue" />}
      </span>
      <span className="inline-flex items-center gap-1">
        {icon}
        {label}
      </span>
    </button>
  );
}

function ScheduleTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[6px] px-3 py-1 text-[12px] font-medium transition-colors",
        active ? "bg-[#EEF5FF] text-blue-text" : "text-slate hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}

function ToolbarBtn({ icon, label }: { icon?: React.ReactNode; label?: string }) {
  return (
    <button
      type="button"
      className="flex h-7 min-w-[28px] items-center justify-center rounded-[6px] px-1 text-[11.5px] font-medium text-slate hover:bg-surface hover:text-ink"
    >
      {icon ?? label}
    </button>
  );
}

function Sep() {
  return <span className="mx-0.5 h-4 w-px bg-border" />;
}

function TemplateGroup({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <details open className="group">
      <summary className="flex cursor-pointer items-center gap-1.5 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
        <ChevronDown className="h-3 w-3 transition-transform group-open:rotate-0 group-[:not([open])]:-rotate-90" />
        {title} <span className="text-[10px] font-normal">({count})</span>
      </summary>
      <ul className="space-y-1.5 px-3 pb-2">{children}</ul>
    </details>
  );
}

function TemplateRow({ template, system }: { template: EmailTemplate; system?: boolean }) {
  return (
    <li>
      <button
        type="button"
        className="block w-full rounded-[8px] border border-border bg-surface p-2.5 text-left transition-colors hover:border-[#BCD3FF] hover:bg-[#F6FAFF]"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 flex-shrink-0 text-blue-text" />
            <span className="truncate text-[13px] font-medium text-ink">{template.name}</span>
          </div>
          {system && (
            <span className="flex-shrink-0 rounded-full bg-surface-warm px-2 py-px text-[10px] font-semibold text-slate">
              System
            </span>
          )}
        </div>
        <p className="mt-1 truncate text-[11px] text-slate">
          Subject: {template.subject}
        </p>
      </button>
    </li>
  );
}
