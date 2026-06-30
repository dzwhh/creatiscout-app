import type { ApprovalItem, MailItem } from "@/lib/types";

export const approvals: ApprovalItem[] = [
  {
    id: "apr-1",
    kind: "matching",
    campaignId: "cmp-618-beauty",
    title: "18 位推荐达人 · 等你审核",
    reason: "Lucy 基于受众契合、GMV 潜力与品牌安全度筛选。",
    count: 18,
    ts: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
  {
    id: "apr-2",
    kind: "outreach",
    campaignId: "cmp-520-gift",
    title: "12 封外联邮件草稿",
    reason: "已为高契合度达人定制个性化邮件。",
    count: 12,
    ts: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
  },
  {
    id: "apr-3",
    kind: "video",
    campaignId: "cmp-summer-yoga",
    title: "3 条视频草稿 · 等你审核",
    reason: "达人提交了草稿，AI 已做初步合规检查。",
    count: 3,
    ts: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
  },
  {
    id: "apr-4",
    kind: "quote",
    campaignId: "cmp-618-beauty",
    title: "1 位达人报价超天花板",
    reason: "Nina Chen 报价 ¥11,000 / 条，超出 ¥9,000 上限。",
    count: 1,
    ts: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  },
];

export const mails: MailItem[] = [
  {
    id: "ml-1",
    from: "Nina Chen <nina@ninachen.co>",
    subject: "Re: 618 美妆 collab proposal",
    preview: "Thanks for reaching out. My usual rate for a 60s video is...",
    ts: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    unread: true,
    campaignId: "cmp-618-beauty",
  },
  {
    id: "ml-2",
    from: "果子姐姐 <guozi@163.com>",
    subject: "回复：520 礼盒种草合作",
    preview: "你好，看了 brief，整体方向 ok，但报价想再谈下...",
    ts: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    unread: true,
    campaignId: "cmp-520-gift",
  },
  {
    id: "ml-3",
    from: "Yoga Anna <hello@yogaanna.com>",
    subject: "Video draft delivered",
    preview: "Here is the first cut, looking forward to your feedback.",
    ts: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    unread: false,
    campaignId: "cmp-summer-yoga",
  },
];
