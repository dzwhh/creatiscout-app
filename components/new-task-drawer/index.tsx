"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Paperclip, Send, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { employees } from "@/lib/mock/employees";
import { useUIStore } from "@/lib/store/ui-store";
import type { Campaign, ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";

function nowIso() {
  return new Date().toISOString();
}

function genId() {
  return Math.random().toString(36).slice(2, 10);
}

export function NewTaskDrawer() {
  const {
    chatOpen,
    closeChat,
    activeEmployeeId,
    setActiveEmployee,
    messages,
    pushMessage,
    resetChat,
    addCampaign,
    markShimmer,
    chatCampaignContext,
  } = useUIStore();
  const router = useRouter();
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeEmployee = employees.find((e) => e.id === activeEmployeeId) ?? employees[0];

  useEffect(() => {
    if (chatOpen && messages.length === 0) {
      const seed = chatCampaignContext
        ? `你好，我是 ${activeEmployee.name}。我正在帮你跟进「${chatCampaignContext.name}」这个 campaign，可以问我达人匹配、外联进度、报价、风险卡点等任何细节。`
        : `你好，我是 ${activeEmployee.name} · ${activeEmployee.role}。告诉我你要做什么 — 可以是新建 campaign、起草外联邮件、拉一批达人候选，或者别的。`;
      pushMessage({
        id: genId(),
        role: "employee",
        ts: nowIso(),
        content: seed,
      });
    }
  }, [chatOpen, activeEmployee, messages.length, pushMessage, chatCampaignContext]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    const userMsg: ChatMessage = {
      id: genId(),
      role: "user",
      content: text,
      ts: nowIso(),
    };
    pushMessage(userMsg);
    setInput("");
    setTyping(true);

    // Scripted mock employee response
    setTimeout(() => {
      const isCampaignAsk = /campaign|项目|活动|建一个|创建/i.test(text);
      if (isCampaignAsk) {
        const newId = `cmp-${genId()}`;
        const newCampaign: Campaign = {
          id: newId,
          name: extractName(text) ?? "新 Campaign",
          status: "outreach",
          startAt: new Date().toISOString().slice(0, 10),
          endAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
          ownerId: activeEmployee.id,
          proposed: 0,
          collaborating: 0,
          delivered: 0,
          budget: extractBudget(text) ?? 30000,
          spent: 0,
          platforms: ["小红书"],
          briefSummary: text,
          toggles: { poolFirst: true, sampling: false, adCode: true },
          step: "brief",
          updatedAt: nowIso(),
        };
        addCampaign(newCampaign);
        markShimmer(newId);

        pushMessage({
          id: genId(),
          role: "employee",
          ts: nowIso(),
          content: `好的，我已经创建了「${newCampaign.name}」。预算 ¥${newCampaign.budget.toLocaleString()}，预计 30 天周期。我正在做 brief 解析，几分钟后会给出达人候选。`,
          card: {
            kind: "campaign",
            title: newCampaign.name,
            summary: `预算 ¥${newCampaign.budget.toLocaleString()} · ${newCampaign.platforms.join(" / ")} · ${activeEmployee.name} 负责`,
            href: newId,
          },
        });
      } else {
        pushMessage({
          id: genId(),
          role: "employee",
          ts: nowIso(),
          content: "好的，我记下了。需要我帮你转成一个 campaign 任务么？告诉我大致预算和周期，我就开干。",
        });
      }
      setTyping(false);
    }, 900);
  }

  function handleCardClick(campaignId: string) {
    closeChat();
    router.push(`/campaigns/${campaignId}`);
  }

  return (
    <AnimatePresence>
      {chatOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 240 }}
          className="fixed right-0 top-0 z-40 flex h-full w-[min(720px,46vw)] flex-col border-l border-border bg-surface shadow-drawer"
        >
          {/* Header */}
          <div className="flex h-16 items-center gap-3 border-b border-border bg-surface px-6">
            <button
              type="button"
              onClick={closeChat}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-warm text-slate transition-colors hover:bg-soft-pink hover:text-brand-strong"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="text-[16px] font-semibold tracking-tight text-ink">
              {chatCampaignContext ? "Ask 数字员工" : "新建任务"}
            </h2>
            {chatCampaignContext ? (
              <span className="ml-2 inline-flex items-center gap-1.5 truncate rounded-full bg-soft-pink px-2.5 py-0.5 text-[11px] font-medium text-brand">
                <Sparkles className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{chatCampaignContext.name}</span>
              </span>
            ) : (
              <span className="ml-2 text-[12px] text-muted">派活给员工，左侧实时落地</span>
            )}
            <button
              type="button"
              onClick={resetChat}
              className="ml-auto text-[12px] text-slate transition-colors hover:text-ink"
            >
              清空
            </button>
          </div>

          {/* Employee picker */}
          <div className="flex items-center gap-3 border-b border-border bg-surface px-5 py-3">
            <span className="text-[12px] text-slate">派给</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-[13px] hover:border-border-strong"
                >
                  <img src={activeEmployee.avatar} alt="" className="h-5 w-5 rounded-full" />
                  <span className="font-medium text-ink">{activeEmployee.name}</span>
                  <span className="text-muted">·</span>
                  <span className="text-slate">{activeEmployee.role}</span>
                  <ChevronDown className="ml-1 h-3 w-3 text-muted" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {employees.map((e) => (
                  <DropdownMenuItem
                    key={e.id}
                    onClick={() => {
                      setActiveEmployee(e.id);
                      resetChat();
                    }}
                  >
                    <img src={e.avatar} alt="" className="h-5 w-5 rounded-full" />
                    <div className="flex-1">
                      <div className="text-[13px] font-medium text-ink">{e.name}</div>
                      <div className="text-[11px] text-muted">{e.role}</div>
                    </div>
                    {e.id === activeEmployee.id && <Check className="h-3.5 w-3.5 text-brand" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5">
            <div className="space-y-4">
              {messages.map((m) => (
                <MessageBubble
                  key={m.id}
                  msg={m}
                  employeeAvatar={activeEmployee.avatar}
                  onCardClick={handleCardClick}
                />
              ))}
              {typing && (
                <div className="flex items-center gap-2 text-[12px] text-muted">
                  <Sparkles className="h-3.5 w-3.5 text-brand" />
                  <span>{activeEmployee.name} 正在思考…</span>
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-border bg-surface-warm p-4">
            <div className="flex items-end gap-2 rounded-2xl border border-border bg-surface p-2.5">
              <button type="button" className="rounded-full p-1.5 text-muted hover:bg-page">
                <Paperclip className="h-4 w-4" />
              </button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="告诉员工你要做什么…  Enter 发送 · Shift+Enter 换行"
                rows={2}
                className="flex-1 resize-none border-0 bg-transparent text-[13px] leading-relaxed text-ink outline-none placeholder:text-muted"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim()}
                className={cn(
                  "rounded-[8px] p-2.5 transition-colors",
                  input.trim()
                    ? "bg-brand text-white shadow-cta hover:bg-brand-hover"
                    : "bg-surface-warm text-muted",
                )}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-muted">
              <div className="flex gap-1.5">
                <QuickPrompt text="帮我建一个 618 美妆 campaign，预算 5 万" onPick={setInput} />
                <QuickPrompt text="给上周联系过没回的达人发一封跟进邮件" onPick={setInput} />
              </div>
              <span>关闭后这次对话会保存到 {activeEmployee.name} 的对话任务</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function QuickPrompt({ text, onPick }: { text: string; onPick: (t: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onPick(text)}
      className="rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] text-slate hover:border-border-strong hover:text-ink"
    >
      {text}
    </button>
  );
}

function MessageBubble({
  msg,
  employeeAvatar,
  onCardClick,
}: {
  msg: ChatMessage;
  employeeAvatar: string;
  onCardClick: (id: string) => void;
}) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-soft-pink px-4 py-2.5 text-[13px] text-ink">
          {msg.content}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-2.5">
      <img src={employeeAvatar} alt="" className="mt-0.5 h-7 w-7 rounded-full" />
      <div className="max-w-[80%] space-y-2">
        <div className="rounded-2xl rounded-tl-md border border-border bg-surface px-4 py-2.5 text-[13px] text-ink">
          {msg.content}
        </div>
        {msg.card?.kind === "campaign" && msg.card.href && (
          <button
            type="button"
            onClick={() => onCardClick(msg.card!.href!)}
            className="block w-full rounded-2xl border border-border bg-surface p-3 text-left transition-colors hover:border-brand"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              <span className="text-[12px] font-medium text-brand-strong">已创建 Campaign</span>
            </div>
            <div className="mt-1 text-[14px] font-semibold text-ink">{msg.card.title}</div>
            <div className="text-[12px] text-slate">{msg.card.summary}</div>
            <div className="mt-2 text-[11px] text-brand-strong">点击打开详情 →</div>
          </button>
        )}
      </div>
    </div>
  );
}

function extractName(text: string): string | null {
  const m = text.match(/(?:建|创建|新建)(?:一?个)?「?([^「」,。\n]{1,20}?)」?(?:[活动campaign项目]|$)/);
  if (m) return m[1].trim();
  const m2 = text.match(/^(.+?)(?:campaign|活动|项目)/i);
  if (m2) return m2[1].trim();
  return null;
}

function extractBudget(text: string): number | null {
  const m = text.match(/预算\s*([0-9.]+)\s*(万|w|k)?/i);
  if (!m) return null;
  const n = Number.parseFloat(m[1]);
  const unit = (m[2] ?? "").toLowerCase();
  if (unit === "万" || unit === "w") return n * 10000;
  if (unit === "k") return n * 1000;
  return n;
}
