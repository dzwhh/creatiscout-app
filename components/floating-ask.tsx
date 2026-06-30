"use client";
import { Sparkles } from "lucide-react";
import { useEffect } from "react";
import { useUIStore } from "@/lib/store/ui-store";

export function FloatingAsk() {
  const openChat = useUIStore((s) => s.openChat);
  const chatOpen = useUIStore((s) => s.chatOpen);
  const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isK = e.key === "k" || e.key === "K";
      if (isK && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        openChat();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openChat]);

  if (chatOpen) return null;

  // Horizontal center on the sidebar (collapsed 60 / expanded 212).
  const sidebarW = sidebarCollapsed ? 60 : 212;
  const left = sidebarW / 2 - 22;

  return (
    <button
      type="button"
      onClick={() => openChat()}
      aria-label="问数字员工 · ⌘K"
      title="⌘K 询问数字员工"
      style={{ left, bottom: 96 }}
      className="group fixed z-40 flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white shadow-elev transition-[background-color,box-shadow,scale] duration-200 ease-out hover:scale-[1.06] hover:bg-brand-hover hover:shadow-[0_12px_28px_rgba(248,47,114,0.28)]"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand/18" />
      <Sparkles className="h-[18px] w-[18px]" />
    </button>
  );
}
