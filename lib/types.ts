export type CampaignStatus = "live" | "outreach" | "paused" | "completed" | "risk";

export type CampaignStep =
  | "brief"
  | "matching"
  | "outreach"
  | "confirm"
  | "sample"
  | "contract"
  | "content"
  | "tracking";

export type CreatorDealStage =
  | "interested"
  | "submitted"
  | "internal_review"
  | "client_review"
  | "negotiating"
  | "won"
  | "handoff";

export interface Employee {
  id: string;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
  joinedAt: string;
  skills: string[];
  bio: string;
  stats: {
    autoTasks: number;
    chatTasks: number;
    projects: number;
  };
}

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  startAt: string;
  endAt: string;
  ownerId: string;
  proposed: number;
  collaborating: number;
  delivered: number;
  budget: number;
  spent: number;
  platforms: string[];
  briefSummary: string;
  client?: string;
  contact?: string;
  quoteCeilingUsd?: number;
  quoteCeilingLocked?: boolean;
  automation?: "full" | "semi" | "manual";
  toggles: {
    poolFirst: boolean;
    sampling: boolean;
    adCode: boolean;
  };
  step: CampaignStep;
  updatedAt: string;
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  followers: number;
  engagement: number; // percent
  platform: string;
  fitScore: number; // 0-100
  reason: string;
  averageQuote?: number;
  collaborations?: number;
}

export interface DealRound {
  round: 1 | 2 | "final" | "handoff";
  ourQuote?: number;
  theirQuote?: number;
  at: string;
  note?: string;
  byHuman?: boolean;
}

export interface CreatorDeal {
  creatorId: string;
  campaignId: string;
  stage: CreatorDealStage;
  rounds: DealRound[];
  ceiling: number;
  finalQuote?: number;
}

export interface ApprovalItem {
  id: string;
  kind: "matching" | "outreach" | "video" | "contract" | "quote";
  campaignId: string;
  title: string;
  reason: string;
  count: number;
  ts: string;
}

export interface MailItem {
  id: string;
  from: string;
  subject: string;
  preview: string;
  ts: string;
  unread: boolean;
  campaignId?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "employee";
  content: string;
  ts: string;
  card?: {
    kind: "campaign" | "mail" | "creator-list";
    title: string;
    summary: string;
    href?: string;
  };
}
