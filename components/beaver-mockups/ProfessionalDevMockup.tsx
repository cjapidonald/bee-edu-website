"use client";

import {
  LayoutDashboard,
  Award,
  BookOpen,
  Calendar,
  Target,
  Eye,
  TrendingUp,
  CheckCircle2,
  Clock,
  Users,
  Sparkles,
  GraduationCap,
  FileText,
  Star,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockAvatar, MockBadge, Panel } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const PD_PLANS = [
  { teacher: "Ms Tran", goal: "Differentiated instruction mastery", progress: 82, avatar: ["#FDB714", "#E83B5E"] as const, status: "on-track" },
  { teacher: "Mr Tran", goal: "IB Maths certification", progress: 65, avatar: ["#3b82f6", "#8b5cf6"] as const, status: "on-track" },
  { teacher: "Ms Le", goal: "AI in science pedagogy", progress: 45, avatar: ["#00C9A7", "#3b82f6"] as const, status: "in-progress" },
  { teacher: "Ms Pham", goal: "Phonics instruction", progress: 92, avatar: ["#E83B5E", "#FF6B9D"] as const, status: "near-complete" },
];

const OBSERVATIONS = [
  { teacher: "Ms Tran", date: "Oct 12", observer: "Dr Vu", score: 4.8, focus: "Engagement" },
  { teacher: "Mr Tran", date: "Oct 10", observer: "Dr Vu", score: 4.6, focus: "Differentiation" },
  { teacher: "Ms Le", date: "Oct 8", observer: "Dr Vu", score: 4.5, focus: "Inquiry" },
];

export function ProfessionalDevMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  return (
    <DashboardShell
      url="www.kiwibee.com/team-leader/pd"
      tabTitle="Professional Development"
      breadcrumb="Professional Development · Team"
      userName="Dr Vu"
      userGradient={["#10b981", "#FDB714"]}
      dayBadge="Mon"
      dayBadgeColor="emerald"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: "Dashboard" },
        { icon: Award, label: "PD Plans", active: true },
        { icon: Eye, label: "Observations" },
        { icon: BookOpen, label: "Trainings" },
        { icon: GraduationCap, label: "Certifications" },
        { icon: Target, label: "Goals" },
        { icon: Users, label: "Teachers" },
        { icon: FileText, label: "Reports" },
      ]}
    >
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="text-[14px] font-bold text-white leading-tight">
            Professional Development
          </div>
          <div className="text-[10px] text-gray-500">
            12 active PD plans · 8 observations this month · 4 certifications
          </div>
        </div>
        <button className="flex items-center gap-1 px-2 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-semibold shadow-sm">
          <Sparkles className="h-2.5 w-2.5" />
          AI Coach
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-1.5 mb-2.5">
        {[
          { label: "Active plans", value: "12", icon: Target, color: "#10b981" },
          { label: "Observations", value: "8", icon: Eye, color: "#3b82f6" },
          { label: "Certifications", value: "4", icon: Award, color: "#FDB714" },
          { label: "Avg rating", value: "4.7", icon: Star, color: "#E83B5E" },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-xl bg-gray-900 border border-gray-700/70 p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            <div
              className="h-5 w-5 rounded-lg flex items-center justify-center mb-1"
              style={{ background: `${k.color}20` }}
            >
              <k.icon className="h-3 w-3" style={{ color: k.color }} />
            </div>
            <div className="text-[9px] text-gray-500">{k.label}</div>
            <div className="text-base font-black text-white tabular-nums leading-none">
              {k.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2.5">
        {/* LEFT — PD plans (3/5) */}
        <div className="col-span-3">
          <Panel
            title="PD Plans"
            subtitle="Active development goals"
            right={<MockBadge color="emerald">On track</MockBadge>}
          >
            <div className="space-y-1.5">
              {PD_PLANS.map((p) => (
                <div
                  key={p.teacher}
                  className="rounded-lg bg-gray-800/50/80 border border-gray-800 p-1.5"
                >
                  <div className="flex items-center gap-2">
                    <MockAvatar
                      name={p.teacher}
                      size={22}
                      gradientFrom={p.avatar[0]}
                      gradientTo={p.avatar[1]}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-bold text-white">{p.teacher}</div>
                      <div className="text-[8px] text-gray-400 truncate">{p.goal}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[10px] font-black text-emerald-600 tabular-nums">
                        {p.progress}%
                      </div>
                      {p.status === "near-complete" && (
                        <div className="text-[7px] text-emerald-700 font-bold">Almost!</div>
                      )}
                    </div>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${p.progress}%`,
                        background:
                          p.progress >= 80
                            ? "#10b981"
                            : p.progress >= 50
                              ? "#FDB714"
                              : "#E83B5E",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* RIGHT — Recent observations (2/5) */}
        <div className="col-span-2 space-y-2.5">
          <Panel
            title="Recent Observations"
            subtitle="Classroom visits"
            right={<MockBadge color="blue">3 new</MockBadge>}
          >
            <div className="space-y-1">
              {OBSERVATIONS.map((o) => (
                <div
                  key={o.teacher}
                  className="p-1.5 rounded-md bg-gray-800/50 border border-gray-800"
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="text-[9px] font-bold text-white">{o.teacher}</div>
                    <div className="flex items-center gap-0.5">
                      <Star className="h-2 w-2 text-[#FDB714] fill-[#FDB714]" />
                      <span className="text-[8px] font-bold text-[#a16207]">{o.score}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[7px] text-gray-500">
                    <Eye className="h-2 w-2" />
                    <span>{o.observer}</span>
                    <span>·</span>
                    <span>{o.date}</span>
                    <span>·</span>
                    <span className="text-[#a16207]">{o.focus}</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-gray-950 border border-emerald-100 p-2.5">
            <div className="flex items-center gap-1 mb-1">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wide">
                Milestone
              </span>
            </div>
            <div className="text-[10px] font-bold text-white">
              3 teachers completed IB Level 1
            </div>
            <div className="text-[8px] text-gray-400 mt-0.5">This month · +2 from Sep</div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
