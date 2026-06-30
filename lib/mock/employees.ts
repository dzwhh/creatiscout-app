import type { Employee } from "@/lib/types";

export const employees: Employee[] = [
  {
    id: "lucy",
    name: "Lucy",
    role: "内容运营专员",
    avatar: "https://i.pravatar.cc/120?img=47",
    online: true,
    joinedAt: "2026-05-21",
    skills: ["脚本生成", "评论回复", "Brief 解析", "小红书笔记", "视觉素材 brief"],
    bio: "面向账号定位、热点洞察、内容日历、小红书笔记创作、视觉素材 brief、审批后发布、评论互动、数据复盘、品牌合规和跨平台改写的 AI 原生内容运营角色。",
    stats: { autoTasks: 12, chatTasks: 38, projects: 3 },
  },
  {
    id: "mia",
    name: "Mia",
    role: "达人匹配专员",
    avatar: "https://i.pravatar.cc/120?img=32",
    online: true,
    joinedAt: "2026-06-02",
    skills: ["达人画像", "匹配度评估", "私域池管理", "竞品达人追踪"],
    bio: "负责跨平台寻找高契合度达人，结合 brief、品牌调性、过往合作数据做智能排序。",
    stats: { autoTasks: 8, chatTasks: 19, projects: 2 },
  },
  {
    id: "noah",
    name: "Noah",
    role: "外联谈判专员",
    avatar: "https://i.pravatar.cc/120?img=12",
    online: false,
    joinedAt: "2026-06-15",
    skills: ["邮件起草", "报价谈判", "合同推进", "回复跟进"],
    bio: "负责达人外联与多轮报价谈判，超出报价天花板自动转人工。",
    stats: { autoTasks: 5, chatTasks: 7, projects: 1 },
  },
];

export function getEmployee(id: string) {
  return employees.find((e) => e.id === id);
}
