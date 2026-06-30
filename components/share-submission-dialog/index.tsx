"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/store/ui-store";

export function ShareSubmissionDialog() {
  const { shareOpen, shareTarget, closeShare } = useUIStore();
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);

  const shareUrl = shareTarget
    ? `https://app.creativault.ai/share/${shareTarget.kind}?token=${shareTarget.id.toLowerCase()}`
    : "";

  function copyLink() {
    if (!shareUrl) return;
    navigator.clipboard?.writeText(shareUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function close() {
    setEmail("");
    setCopied(false);
    closeShare();
  }

  return (
    <AnimatePresence>
      {shareOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-ink/40"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-auto w-[min(460px,92vw)] rounded-[12px] bg-surface shadow-floating"
            >
            <div className="flex items-start justify-between px-6 pt-5">
              <h2 className="text-[18px] font-bold tracking-tight text-navy">
                Share Submission
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="关闭"
                className="flex h-7 w-7 items-center justify-center rounded-[6px] text-muted transition-colors hover:bg-surface-warm hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 px-6 pt-4">
              {/* Send to email */}
              <div>
                <label className="block text-[13px] font-medium text-ink">
                  Send to email:
                </label>
                <div className="mt-2 flex h-10 items-center gap-2 rounded-[8px] border border-border bg-surface px-3 focus-within:border-border-strong">
                  <Search className="h-3.5 w-3.5 flex-shrink-0 text-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Search or enter email..."
                    className="flex-1 border-0 bg-transparent text-[13px] text-ink outline-none placeholder:text-muted"
                  />
                </div>
              </div>

              {/* Copy link */}
              <div>
                <label className="block text-[13px] font-medium text-ink">
                  Or copy share link:
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex h-10 min-w-0 flex-1 items-center rounded-[8px] border border-border bg-surface-warm px-3">
                    <span className="tabular block w-full truncate text-[12px] text-muted">
                      {shareUrl}
                    </span>
                  </div>
                  <Button variant="outline" size="md" onClick={copyLink} className="flex-shrink-0">
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
                <p className="mt-1.5 text-[11px] text-muted">
                  This link will expire in 7 days
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2 border-t border-border px-6 py-3.5">
              <Button variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button variant="primary">Send</Button>
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
