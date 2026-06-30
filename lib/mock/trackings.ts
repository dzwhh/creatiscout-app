export interface TrackingTarget {
  id: string;
  name: string;
  domain: string;
  category: string;
  cover: string; // gradient
  monitored: ("campaign" | "达人" | "素材")[];
  updates: number;
  status: "running" | "paused";
  lastUpdatedAt: string;
  creatorCount: number;
  avgFollowers: string;
  avgViews: string;
  engagement: string;
  topCountries: string[];
}

const now = Date.now();
const hoursAgo = (h: number) => new Date(now - h * 60 * 60 * 1000).toISOString();

export const trackings: TrackingTarget[] = [
  {
    id: "candy",
    name: "candy.ai",
    domain: "candy.ai",
    category: "AI 陪伴",
    cover: "linear-gradient(135deg, #FFB69C 0%, #FF7E5A 100%)",
    monitored: ["campaign", "达人", "素材"],
    updates: 12,
    status: "running",
    lastUpdatedAt: hoursAgo(2),
    creatorCount: 184,
    avgFollowers: "212K",
    avgViews: "98K",
    engagement: "5.8%",
    topCountries: ["🇺🇸", "🇧🇷", "🇬🇧"],
  },
  {
    id: "ourdream",
    name: "ourdream.ai",
    domain: "ourdream.ai",
    category: "AI 内容",
    cover: "linear-gradient(135deg, #B69CFF 0%, #6E4FE0 100%)",
    monitored: ["达人", "素材"],
    updates: 5,
    status: "running",
    lastUpdatedAt: hoursAgo(6),
    creatorCount: 96,
    avgFollowers: "138K",
    avgViews: "62K",
    engagement: "4.9%",
    topCountries: ["🇺🇸", "🇩🇪", "🇨🇦"],
  },
  {
    id: "polybuzz",
    name: "polybuzz.ai",
    domain: "polybuzz.ai",
    category: "AI 社交",
    cover: "linear-gradient(135deg, #9CE2D9 0%, #3F8780 100%)",
    monitored: ["campaign", "达人"],
    updates: 3,
    status: "running",
    lastUpdatedAt: hoursAgo(11),
    creatorCount: 142,
    avgFollowers: "165K",
    avgViews: "74K",
    engagement: "6.4%",
    topCountries: ["🇺🇸", "🇦🇺", "🇧🇷"],
  },
  {
    id: "glow",
    name: "Glow Cosmetics",
    domain: "glowcos.com",
    category: "美妆护肤",
    cover: "linear-gradient(135deg, #FFC5DE 0%, #F0468F 100%)",
    monitored: ["campaign", "达人"],
    updates: 8,
    status: "paused",
    lastUpdatedAt: hoursAgo(72),
    creatorCount: 64,
    avgFollowers: "320K",
    avgViews: "180K",
    engagement: "7.1%",
    topCountries: ["🇺🇸", "🇨🇦", "🇲🇽"],
  },
  {
    id: "lumio",
    name: "Lumio Athletics",
    domain: "lumioath.com",
    category: "瑜伽 / 健身",
    cover: "linear-gradient(135deg, #C8E89A 0%, #6F8523 100%)",
    monitored: ["素材"],
    updates: 2,
    status: "paused",
    lastUpdatedAt: hoursAgo(120),
    creatorCount: 38,
    avgFollowers: "92K",
    avgViews: "44K",
    engagement: "8.2%",
    topCountries: ["🇺🇸", "🇬🇧", "🇦🇺"],
  },
];

export function getTracking(id: string) {
  return trackings.find((t) => t.id === id);
}
