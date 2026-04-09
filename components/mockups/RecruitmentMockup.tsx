"use client";

import {
  LayoutDashboard,
  UserPlus,
  Briefcase,
  Calendar,
  FileText,
  MessageSquare,
  CheckCircle2,
  Clock,
  XCircle,
  Users,
  Plus,
  Star,
  Send,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockAvatar, MockBadge, Panel } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const JOBS = [
  { title: "Primary English Teacher", applicants: 24, status: "Open", posted: "5d", color: "#FDB714" },
  { title: "Math Coordinator", applicants: 12, status: "Interviewing", posted: "2w", color: "#3b82f6" },
  { title: "Science Lab Assistant", applicants: 8, status: "Offer sent", posted: "3w", color: "#00C9A7" },
];

// Kanban pipeline
const PIPELINE = {
  Applied: [
    { name: "Sarah Kim", role: "English Teacher", avatar: ["#FDB714", "#E83B5E"] as const },
    { name: "David Chen", role: "Math Coord", avatar: ["#3b82f6", "#8b5cf6"] as const },
  ],
  Screen: [
    { name: "Linh Tran", role: "English Teacher", avatar: ["#E83B5E", "#FF6B9D"] as const },
  ],
  Interview: [
    { name: "Priya Patel", role: "Math Coord", avatar: ["#8b5cf6", "#E83B5E"] as const, stars: 5 },
    { name: "Tom Wong", role: "Lab Assistant", avatar: ["#00C9A7", "#3b82f6"] as const, stars: 4 },
  ],
  Offer: [
    { name: "Maya Chen", role: "Lab Assistant", avatar: ["#10b981", "#00C9A7"] as const },
  ],
};

const COLUMN_COLORS = {
  Applied: { bg: "bg-gray-50", text: "text-gray-600", accent: "#9ca3af" },
  Screen: { bg: "bg-blue-100", text: "text-blue-700", accent: "#3b82f6" },
  Interview: { bg: "bg-[#FDB714]/15", text: "text-[#FDB714]", accent: "#FDB714" },
  Offer: { bg: "bg-emerald-100", text: "text-emerald-700", accent: "#10b981" },
};

export function RecruitmentMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  return (
    <DashboardShell
      url="www.kiwibee.com/hr/recruitment"
      tabTitle="Recruitment — Jobs & Pipeline"
      breadcrumb="HR · Recruitment"
      userName="Ms Hoang"
      userGradient={["#10b981", "#00C9A7"]}
      dayBadge="Mon"
      dayBadgeColor="emerald"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: "Dashboard" },
        { icon: Briefcase, label: "Jobs" },
        { icon: UserPlus, label: "Pipeline", active: true },
        { icon: Calendar, label: "Interviews" },
        { icon: FileText, label: "Applications" },
        { icon: MessageSquare, label: "Messages" },
        { icon: Users, label: "Talent Pool" },
      ]}
    >
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="text-[14px] font-bold text-gray-900 leading-tight">
            Recruitment Pipeline
          </div>
          <div className="text-[10px] text-gray-500">
            3 open jobs · 44 candidates · 8 interviews this week
          </div>
        </div>
        <button className="flex items-center gap-1 px-2 py-1 bg-emerald-600 text-gray-900 rounded-lg text-[10px] font-semibold shadow-sm">
          <Plus className="h-2.5 w-2.5" />
          Post Job
        </button>
      </div>

      {/* Jobs row */}
      <div className="grid grid-cols-3 gap-1.5 mb-2.5">
        {JOBS.map((j) => (
          <div
            key={j.title}
            className="rounded-xl bg-white border border-gray-200 p-2 shadow-sm"
          >
            <div className="flex items-center gap-1 mb-1">
              <div
                className="h-2 w-2 rounded-full"
                style={{ background: j.color }}
              />
              <span className="text-[8px] text-gray-500">Posted {j.posted}</span>
            </div>
            <div className="text-[10px] font-bold text-gray-900 truncate mb-0.5">
              {j.title}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-[8px] text-gray-500">
                <span className="font-bold">{j.applicants}</span> applicants
              </div>
              <span
                className={`text-[7px] font-bold px-1 py-0.5 rounded ${
                  j.status === "Open"
                    ? "bg-emerald-950/50 text-emerald-700"
                    : j.status === "Interviewing"
                      ? "bg-[#FDB714]/15 text-[#FDB714]"
                      : "bg-blue-950/50 text-blue-700"
                }`}
              >
                {j.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Kanban pipeline */}
      <Panel
        title="Candidate Pipeline"
        subtitle="Drag candidates between stages"
        right={<MockBadge color="emerald">44 total</MockBadge>}
      >
        <div className="grid grid-cols-4 gap-1.5">
          {(Object.keys(PIPELINE) as Array<keyof typeof PIPELINE>).map((stage) => {
            const colors = COLUMN_COLORS[stage];
            const candidates = PIPELINE[stage];
            return (
              <div key={stage} className="rounded-lg bg-gray-50/50 p-1.5">
                <div className="flex items-center justify-between mb-1.5 px-0.5">
                  <div className="flex items-center gap-1">
                    <div
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: colors.accent }}
                    />
                    <span className={`text-[8px] font-bold ${colors.text} uppercase tracking-wider`}>
                      {stage}
                    </span>
                  </div>
                  <span
                    className={`text-[7px] font-bold ${colors.bg} ${colors.text} px-1 py-0.5 rounded-full tabular-nums`}
                  >
                    {candidates.length}
                  </span>
                </div>
                <div className="space-y-1">
                  {candidates.map((c, i) => (
                    <div
                      key={i}
                      className="rounded bg-white border border-gray-200 p-1.5 shadow-sm cursor-move"
                    >
                      <div className="flex items-center gap-1">
                        <MockAvatar
                          name={c.name}
                          size={16}
                          gradientFrom={c.avatar[0]}
                          gradientTo={c.avatar[1]}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-[8px] font-bold text-gray-900 truncate">
                            {c.name}
                          </div>
                          <div className="text-[7px] text-gray-500 truncate">{c.role}</div>
                        </div>
                      </div>
                      {"stars" in c && c.stars && (
                        <div className="flex items-center gap-0.5 mt-1">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star
                              key={j}
                              className={`h-1.5 w-1.5 ${j < c.stars! ? "text-[#FDB714] fill-[#FDB714]" : "text-gray-200 fill-gray-200"}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {candidates.length === 0 && (
                    <div className="h-8 rounded bg-white/50 border border-dashed border-gray-200" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Panel>
    </DashboardShell>
  );
}
