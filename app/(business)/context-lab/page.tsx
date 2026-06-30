"use client";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bot,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight as ChevronRightIcon,
  Download,
  Eye,
  Filter,
  Link2,
  MoreHorizontal,
  PlayCircle,
  Plus,
  RotateCcw,
  Save,
  Search,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContentItem {
  id: string;
  title: string;
  platform: "TikTok";
  region: string;
  duration: string;
  views: string;
  engagement: string;
  hookScore: number;
  category: "Commercial" | "Organic";
  cover: string; // gradient
  selected?: boolean;
}

const contents: ContentItem[] = [
  {
    id: "c1",
    title: "Pabblo Vittar",
    platform: "TikTok",
    region: "US",
    duration: "00:48",
    views: "128.4K",
    engagement: "8.23%",
    hookScore: 92,
    category: "Commercial",
    cover: "linear-gradient(135deg, #FFE7F0 0%, #FFC2D4 100%)",
    selected: true,
  },
  {
    id: "c2",
    title: "cambridean",
    platform: "TikTok",
    region: "US",
    duration: "00:36",
    views: "96.1K",
    engagement: "6.89%",
    hookScore: 88,
    category: "Organic",
    cover: "linear-gradient(135deg, #D8F4EF 0%, #5CC5BE 100%)",
  },
  {
    id: "c3",
    title: "Cynthia Harris",
    platform: "TikTok",
    region: "US",
    duration: "00:42",
    views: "74.2K",
    engagement: "7.15%",
    hookScore: 81,
    category: "Commercial",
    cover: "linear-gradient(135deg, #FDEBD8 0%, #F5A35B 100%)",
  },
  {
    id: "c4",
    title: "Gymshark",
    platform: "TikTok",
    region: "UK",
    duration: "00:30",
    views: "63.7K",
    engagement: "5.12%",
    hookScore: 77,
    category: "Commercial",
    cover: "linear-gradient(135deg, #F3ECFF 0%, #8B5CF6 100%)",
  },
  {
    id: "c5",
    title: "Move With Mia",
    platform: "TikTok",
    region: "US",
    duration: "00:28",
    views: "51.6K",
    engagement: "9.34%",
    hookScore: 90,
    category: "Organic",
    cover: "linear-gradient(135deg, #E8F8F2 0%, #B8CD56 100%)",
  },
];

const breakdownSegments = [
  {
    range: "0–3s",
    label: "Hook",
    title: "Bold on-screen text + quick outfit change grabs attention.",
    desc: "「these leggings? literally sculpt my shape 😍」",
    scoreTag: { score: 92, label: "Very strong" },
  },
  {
    range: "4–15s",
    label: "Problem\nScene",
    title: "Scene",
    desc: "Bedroom mirror → gym → outdoors walk.",
    tags: ["Try-on", "Lifestyle", "Real environment"],
  },
  {
    range: "16–35s",
    label: "Product\nuse",
    title: "Product angle",
    desc: "High waist + squat proof + buttery soft fabric.",
    tags: ["Comfort", "Confidence", "Performance"],
  },
  {
    range: "—",
    label: "—",
    title: "Keywords",
    desc: "",
    chips: ["high waist leggings", "squat proof", "buttery soft", "gym outfit", "+4"],
    chipsTail: ["activewear", "•"],
  },
  {
    range: "—",
    label: "—",
    title: "CTA",
    desc: "「grab yours now — link in bio, free shipping today!」",
    tag: { label: "Direct CTA", tone: "teal" as const },
  },
  {
    range: "36–45s",
    label: "CTA",
    title: "Brand safety",
    desc: "No issues detected",
    tag: { label: "Safe", tone: "teal" as const },
  },
  {
    range: "—",
    label: "—",
    title: "Reusable pattern",
    desc: "Try-on + Benefit stacking + Lifestyle proof + Direct CTA",
  },
];

const reviewItems = [
  { ok: true, text: "Hook is strong & relevant" },
  { ok: true, text: "Problem clearly stated" },
  { ok: true, text: "Product benefit communicated" },
  { ok: true, text: "Visuals align with message" },
  { ok: false, text: "CTA visibility can be improved" },
];

const suggestedEdits = [
  "Add text overlay for \"squat proof\" at 18s.",
  "Move CTA 2s earlier for higher conversion.",
];

const keywordEmbeddings = [
  "best gym leggings",
  "gym leggings for women",
  "workout leggings high waist",
];

const patternLibrary = [
  { id: "p1", name: "Try-on", desc: "Show product fit with mirror or full-body try-on.", used: 342, color: "bg-soft-pink", icon: "👚" },
  { id: "p2", name: "Comparison test", desc: "Compare before vs after or vs alternatives.", used: 287, color: "bg-soft-blue", icon: "⚖️" },
  { id: "p3", name: "Morning routine", desc: "Integrate product into daily routine.", used: 198, color: "bg-soft-amber", icon: "☕️" },
  { id: "p4", name: "Problem-solution", desc: "Highlight pain point and solution.", used: 512, color: "bg-soft-pink", icon: "💡" },
  { id: "p5", name: "UGC testimonial", desc: "Real user review and results.", used: 663, color: "bg-soft-teal", icon: "💬" },
  { id: "p6", name: "Search keyword seeding", desc: "Answer common search intent.", used: 376, color: "bg-soft-lavender", icon: "🔍" },
];

export default function ContextLabPage() {
  const [activeId, setActiveId] = useState("c1");
  const active = contents.find((c) => c.id === activeId) ?? contents[0];

  return (
    <div className="space-y-5 p-6 lg:p-7">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-navy">Content Lab</h1>
          <p className="mt-1 text-[13px] text-slate">
            Turn creator videos into hooks, keywords, scripts, and reusable patterns.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="md">
            <Link2 className="h-3.5 w-3.5" /> Import video URL
          </Button>
          <Button size="md">
            <Plus className="h-4 w-4" /> Add content
          </Button>
          <Button variant="outline" size="md">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex h-10 min-w-[280px] flex-1 items-center gap-2 rounded-[8px] border border-border bg-surface px-3 focus-within:border-border-strong">
          <Search className="h-3.5 w-3.5 flex-shrink-0 text-muted" />
          <input
            placeholder="Search content by creator, keyword, or topic"
            className="flex-1 border-0 bg-transparent text-[13px] text-ink outline-none placeholder:text-muted"
          />
        </div>
        <FilterDropdown label="Platform" value="TikTok" />
        <FilterDropdown label="Source" value="All" />
        <FilterDropdown label="Content type" value="All" />
        <FilterDropdown label="Commercial / Organic" value="All" />
        <FilterDropdown
          label="Date range"
          value="Last 30 days"
          icon={<Calendar className="h-3.5 w-3.5 text-slate" />}
        />
        <Button variant="outline" size="md">
          <Filter className="h-3.5 w-3.5" /> More filters
        </Button>
      </div>

      {/* Three-column body */}
      <div className="grid grid-cols-[280px_minmax(0,1fr)_320px] gap-4">
        {/* LEFT — Content library */}
        <section className="rounded-[12px] border border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-bold text-navy">Content library</span>
              <span className="tabular text-[11px] text-muted">1,248</span>
            </div>
            <button
              type="button"
              className="inline-flex h-7 items-center gap-1 rounded-[6px] border border-border bg-surface px-2 text-[11px] text-slate hover:bg-surface-warm"
            >
              Sort: Newest <ChevronDown className="h-3 w-3" />
            </button>
          </div>
          <ul className="divide-y divide-[#EDF0F5]">
            {contents.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(c.id)}
                  className={cn(
                    "flex w-full items-stretch gap-3 p-3 text-left transition-colors",
                    activeId === c.id ? "bg-soft-pink/30 ring-1 ring-inset ring-brand/40" : "hover:bg-surface-warm",
                  )}
                >
                  <div
                    className="relative flex h-[64px] w-[88px] flex-shrink-0 items-center justify-center rounded-[8px]"
                    style={{ background: c.cover }}
                  >
                    <PlayCircle className="h-5 w-5 text-white/90" />
                    <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1 py-px text-[9px] text-white">
                      {c.duration}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-1">
                      <span className="truncate text-[13px] font-semibold text-ink">{c.title}</span>
                      <CategoryChip category={c.category} />
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-[10.5px] text-muted">
                      <span className="inline-block h-1 w-1 rounded-full bg-black" /> {c.platform} · {c.region}
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-1 text-[11px]">
                      <div>
                        <div className="tabular font-semibold text-ink">{c.views}</div>
                        <div className="text-[9.5px] text-muted">Views</div>
                      </div>
                      <div>
                        <div className="tabular font-semibold text-ink">{c.engagement}</div>
                        <div className="text-[9.5px] text-muted">Eng. rate</div>
                      </div>
                      <div>
                        <HookScoreBadge score={c.hookScore} />
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center gap-1 border-t border-border py-2.5 text-[11px] text-slate">
            <PageBtn>
              <ArrowLeft className="h-3 w-3" />
            </PageBtn>
            <PageBtn active>1</PageBtn>
            <PageBtn>2</PageBtn>
            <PageBtn>3</PageBtn>
            <span className="px-1 text-muted">…</span>
            <PageBtn>63</PageBtn>
            <PageBtn>
              <ArrowRight className="h-3 w-3" />
            </PageBtn>
          </div>
        </section>

        {/* CENTER — Breakdown */}
        <section className="rounded-[12px] border border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-[8px]"
                style={{ background: active.cover }}
              >
                <PlayCircle className="h-4 w-4 text-white/90" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[15px] font-bold text-navy">
                  {active.title} <CheckCircle2 className="h-3.5 w-3.5 fill-blue-text text-white" />
                </div>
                <div className="text-[11px] text-muted">
                  TikTok · {active.region} · Posted Sep 23, 2025
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CategoryChip category={active.category} />
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-[6px] text-slate hover:bg-surface-warm hover:text-ink"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex items-center gap-5 border-b border-border px-5">
            <TabItem label="Breakdown" active />
            <TabItem label="Transcript" />
            <TabItem label="Captions" />
            <TabItem label="Metrics" />
            <TabItem label="Comments (36)" />
          </div>
          {/* Breakdown body */}
          <div className="space-y-4 p-5">
            <BreakdownRow range="0–3s" label="Hook">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-[13px] text-ink">
                    Bold on-screen text + quick outfit change grabs attention.
                  </p>
                  <p className="text-[12px] text-slate">
                    「these leggings? literally sculpt my shape 😍」
                  </p>
                </div>
                <ScoreCard score={92} label="Very strong" />
              </div>
            </BreakdownRow>
            <BreakdownRow range="4–15s" label={<>Problem<br/>Scene</>}>
              <FieldGrid label="Scene" value="Bedroom mirror → gym → outdoors walk." />
              <ChipRow label="Scene" chips={["Try-on", "Lifestyle", "Real environment"]} />
            </BreakdownRow>
            <BreakdownRow range="16–35s" label={<>Product<br/>use</>}>
              <FieldGrid label="Product angle" value="High waist + squat proof + buttery soft fabric." />
              <ChipRow chips={["Comfort", "Confidence", "Performance"]} />
            </BreakdownRow>
            <BreakdownRow>
              <FieldGrid
                label="Keywords"
                value={
                  <div className="flex flex-wrap gap-1.5">
                    {["high waist leggings", "squat proof", "buttery soft", "gym outfit"].map((k) => (
                      <span
                        key={k}
                        className="rounded-[6px] bg-surface-warm px-2 py-0.5 text-[11px] text-ink"
                      >
                        {k}
                      </span>
                    ))}
                    <span className="rounded-[6px] bg-surface-warm px-2 py-0.5 text-[11px] font-semibold text-slate">
                      +4
                    </span>
                    <span className="rounded-[6px] bg-surface-warm px-2 py-0.5 text-[11px] text-ink">
                      activewear
                    </span>
                    <span className="rounded-[6px] bg-surface-warm px-2 py-0.5 text-[11px] text-ink">
                      ✦
                    </span>
                  </div>
                }
              />
            </BreakdownRow>
            <BreakdownRow>
              <FieldGrid
                label="CTA"
                value={
                  <div>
                    <p className="text-[13px] text-ink">
                      「grab yours now — link in bio, free shipping today!」
                    </p>
                    <span className="mt-1.5 inline-flex items-center rounded-full bg-soft-teal px-2 py-0.5 text-[11px] font-medium text-teal-text">
                      Direct CTA
                    </span>
                  </div>
                }
              />
            </BreakdownRow>
            <BreakdownRow range="36–45s" label="CTA">
              <FieldGrid
                label="Brand safety"
                value={
                  <span className="inline-flex items-center gap-2">
                    <span className="text-[13px] text-ink">No issues detected</span>
                    <span className="inline-flex items-center rounded-full bg-soft-teal px-2 py-0.5 text-[11px] font-medium text-teal-text">
                      Safe
                    </span>
                  </span>
                }
              />
            </BreakdownRow>
            <BreakdownRow>
              <FieldGrid
                label="Reusable pattern"
                value="Try-on + Benefit stacking + Lifestyle proof + Direct CTA"
              />
              <Button variant="outline" size="sm" className="mt-1">
                <Save className="h-3.5 w-3.5" /> Save to pattern library
              </Button>
            </BreakdownRow>
          </div>
        </section>

        {/* RIGHT — KOL employee review */}
        <section className="rounded-[12px] border border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-soft-pink">
                <Bot className="h-3.5 w-3.5 text-brand" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-navy">KOL employee review</div>
                <div className="text-[10.5px] text-muted">Last review: 5m ago</div>
              </div>
            </div>
            <Badge tone="teal">On shift</Badge>
          </div>

          <div className="space-y-4 p-4">
            <div>
              <div className="mb-2 text-[12px] font-semibold text-ink">Script / Video review</div>
              <ul className="space-y-1.5">
                {reviewItems.map((r, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 rounded-[8px] bg-surface-warm px-3 py-2 text-[12px] text-ink"
                  >
                    {r.ok ? (
                      <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-teal-text" />
                    ) : (
                      <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0 text-amber-text" />
                    )}
                    <span className="flex-1">{r.text}</span>
                    <ChevronDown className="h-3 w-3 text-muted" />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-ink">
                Suggested edits <Badge tone="gray">{suggestedEdits.length}</Badge>
              </div>
              <ul className="space-y-1.5 text-[11.5px] text-slate">
                {suggestedEdits.map((s, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-brand" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-ink">
                Keyword embedding suggestions <Badge tone="gray">{keywordEmbeddings.length}</Badge>
              </div>
              <ul className="space-y-1.5">
                {keywordEmbeddings.map((k) => (
                  <li
                    key={k}
                    className="flex items-center justify-between rounded-[8px] bg-[#EEF5FF] px-3 py-2"
                  >
                    <span className="text-[12px] font-medium text-blue-text">{k}</span>
                    <button
                      type="button"
                      className="text-[11px] font-medium text-blue-text hover:underline"
                    >
                      Add to caption
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex items-center justify-between text-[12px]">
                <span className="font-semibold text-ink">Recommendation</span>
                <Badge tone="teal">High fit</Badge>
              </div>
              <p className="mt-1 text-[11.5px] leading-relaxed text-slate">
                Strong commercial potential. Aligns with campaign angle.
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <Button variant="primary" size="md" className="flex-1">
                Approve for campaign
              </Button>
              <Button variant="outline" size="md">
                <RotateCcw className="h-3.5 w-3.5" /> Send back
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Pattern library */}
      <section className="rounded-[12px] border border-border bg-surface p-5">
        <div className="mb-3.5 flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-navy">Pattern library</h3>
          <button type="button" className="text-[12px] text-slate hover:text-ink">
            View all
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {patternLibrary.map((p) => (
            <div
              key={p.id}
              className="rounded-[10px] border border-border bg-surface p-3 transition-colors hover:border-border-strong hover:bg-surface-warm"
            >
              <div className="flex items-start gap-2.5">
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-[8px] text-[16px]", p.color)}>
                  {p.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-bold text-navy">{p.name}</div>
                </div>
              </div>
              <p className="mt-2 text-[11px] leading-snug text-slate">{p.desc}</p>
              <div className="mt-2 text-[10.5px] text-muted">
                Used <span className="tabular font-semibold text-ink">{p.used}</span> times
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------- Sub components ---------- */

function FilterDropdown({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 text-[11px] text-muted">{label}</div>
      <button
        type="button"
        className="flex h-10 min-w-[140px] items-center justify-between gap-2 rounded-[8px] border border-border bg-surface px-3 text-[13px] text-ink hover:bg-surface-warm"
      >
        <span className="flex items-center gap-1.5">
          {icon}
          {value}
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-muted" />
      </button>
    </div>
  );
}

function CategoryChip({ category }: { category: "Commercial" | "Organic" }) {
  const map = {
    Commercial: "bg-soft-pink text-brand",
    Organic: "bg-soft-teal text-teal-text",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex flex-shrink-0 items-center rounded-full px-2 py-0.5 text-[10.5px] font-medium",
        map[category],
      )}
    >
      {category}
    </span>
  );
}

function HookScoreBadge({ score }: { score: number }) {
  const tone = score >= 90 ? "bg-soft-teal text-teal-text" : score >= 80 ? "bg-soft-amber text-amber-text" : "bg-surface-warm text-slate";
  return (
    <div>
      <div className={cn("tabular inline-flex w-full justify-center rounded-[6px] px-1.5 py-0.5 text-[12px] font-bold", tone)}>
        {score}
      </div>
      <div className="mt-0.5 text-center text-[9.5px] text-muted">Hook score</div>
    </div>
  );
}

function PageBtn({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "tabular flex h-6 min-w-[24px] items-center justify-center rounded-[6px] px-1.5 text-[11px] transition-colors",
        active ? "bg-brand text-white" : "text-slate hover:bg-surface-warm hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function TabItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "relative py-3 text-[13px] font-medium transition-colors",
        active ? "text-brand" : "text-slate hover:text-ink",
      )}
    >
      {label}
      {active && (
        <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-brand" aria-hidden />
      )}
    </button>
  );
}

function BreakdownRow({
  range,
  label,
  children,
}: {
  range?: string;
  label?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-4">
      <div className="text-[11px] leading-snug text-muted">
        {range && (
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <span className="tabular">{range}</span>
          </div>
        )}
        {label && <div className="mt-1 whitespace-pre-line pl-3 text-[12px] text-ink">{label}</div>}
      </div>
      <div className="space-y-2 border-l border-border pl-4">{children}</div>
    </div>
  );
}

function FieldGrid({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[100px_minmax(0,1fr)] gap-3">
      <div className="text-[11px] font-medium text-muted">{label}</div>
      <div className="text-[13px] text-ink">{value}</div>
    </div>
  );
}

function ChipRow({ label, chips }: { label?: string; chips: string[] }) {
  return (
    <div className="grid grid-cols-[100px_minmax(0,1fr)] gap-3">
      <div className="text-[11px] font-medium text-muted">{label ?? ""}</div>
      <div className="flex flex-wrap gap-1.5">
        {chips.map((c) => (
          <span
            key={c}
            className="rounded-[6px] bg-surface-warm px-2 py-0.5 text-[11.5px] text-ink"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

function ScoreCard({ score, label }: { score: number; label: string }) {
  return (
    <div className="flex flex-shrink-0 items-center gap-1 rounded-[8px] bg-soft-teal px-3 py-2 text-teal-text">
      <span className="tabular text-[18px] font-bold">{score}</span>
      <span className="text-[10.5px] font-medium">{label}</span>
    </div>
  );
}
