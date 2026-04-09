"use client";

import {
  LayoutDashboard,
  Heart,
  AlertTriangle,
  Users,
  Shield,
  FileText,
  TrendingUp,
  MessageSquare,
  AlertCircle,
  Plus,
  Smile,
  Frown,
  Activity,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockAvatar, MockBadge, Panel, MiniLineChart } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const INCIDENTS = [
  { id: "#INC-112", student: "Jordan Lee", type: "Conflict", severity: "medium", status: "investigating", avatar: ["#E83B5E", "#FF6B9D"] as const },
  { id: "#INC-113", student: "Ethan Kim", type: "Wellbeing", severity: "high", status: "support-active", avatar: ["#3b82f6", "#00C9A7"] as const },
  { id: "#INC-114", student: "Sam Rodriguez", type: "Attendance", severity: "low", status: "resolved", avatar: ["#FDB714", "#00C9A7"] as const },
];

const WELLBEING = [
  { name: "Alex Chen", mood: "positive", trend: "up", avatar: ["#FDB714", "#E83B5E"] as const },
  { name: "Maya Patel", mood: "positive", trend: "stable", avatar: ["#00C9A7", "#3b82f6"] as const },
  { name: "Priya Sharma", mood: "neutral", trend: "stable", avatar: ["#8b5cf6", "#E83B5E"] as const },
  { name: "Ethan Kim", mood: "concern", trend: "down", avatar: ["#3b82f6", "#00C9A7"] as const },
];

export function StudentAffairsMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  return (
    <DashboardShell
      url="app.elementals.vn/student-affairs"
      tabTitle="Student Affairs — Wellbeing"
      breadcrumb="Student Affairs · Primary 5A"
      userName="Ms Kim"
      userGradient={["#f43f5e", "#8b5cf6"]}
      dayBadge="Mon"
      dayBadgeColor="pink"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: "Dashboard", active: true },
        { icon: AlertTriangle, label: "Incidents" },
        { icon: Heart, label: "Wellbeing" },
        { icon: AlertCircle, label: "Alerts" },
        { icon: Users, label: "Students" },
        { icon: Shield, label: "Interventions" },
        { icon: MessageSquare, label: "Notes" },
        { icon: FileText, label: "Reports" },
      ]}
    >
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="text-[14px] font-bold text-gray-900 leading-tight">Student Affairs</div>
          <div className="text-[10px] text-gray-500">
            3 open incidents · 1 active support case · 96% positive wellbeing
          </div>
        </div>
        <button className="flex items-center gap-1 px-2 py-1 bg-[#f43f5e] text-white rounded-lg text-[10px] font-semibold shadow-sm">
          <Plus className="h-2.5 w-2.5" />
          Log Incident
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-1.5 mb-2.5">
        {[
          { label: "Open", value: "3", icon: AlertTriangle, color: "#E83B5E" },
          { label: "High severity", value: "1", icon: AlertCircle, color: "#f43f5e" },
          { label: "Support cases", value: "4", icon: Heart, color: "#8b5cf6" },
          { label: "Wellbeing", value: "96%", icon: Smile, color: "#10b981" },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-xl bg-white border border-gray-200/70 p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            <div
              className="h-5 w-5 rounded-lg flex items-center justify-center mb-1"
              style={{ background: `${k.color}20` }}
            >
              <k.icon className="h-3 w-3" style={{ color: k.color }} />
            </div>
            <div className="text-[9px] text-gray-500">{k.label}</div>
            <div className="text-base font-black text-gray-900 tabular-nums leading-none">
              {k.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2.5">
        {/* LEFT — Incidents (3/5) */}
        <div className="col-span-3">
          <Panel
            title="Recent Incidents"
            subtitle="Requiring attention"
            right={<MockBadge color="rose">1 high</MockBadge>}
          >
            <div className="space-y-1.5">
              {INCIDENTS.map((inc) => (
                <div
                  key={inc.id}
                  className="rounded-lg bg-gray-50/80 border border-gray-100 p-1.5"
                >
                  <div className="flex items-center gap-2">
                    <MockAvatar
                      name={inc.student}
                      size={22}
                      gradientFrom={inc.avatar[0]}
                      gradientTo={inc.avatar[1]}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-[7px] font-mono text-gray-400">{inc.id}</span>
                        <span className="text-[9px] font-bold text-gray-900 truncate">
                          {inc.student}
                        </span>
                      </div>
                      <div className="text-[8px] text-gray-600">{inc.type}</div>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 shrink-0">
                      <span
                        className={`text-[7px] font-bold px-1 py-0.5 rounded ${
                          inc.severity === "high"
                            ? "bg-rose-50 text-rose-700"
                            : inc.severity === "medium"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {inc.severity}
                      </span>
                      <span className="text-[7px] text-gray-500">{inc.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* RIGHT — Wellbeing snapshot (2/5) */}
        <div className="col-span-2 space-y-2.5">
          <Panel
            title="Wellbeing Snapshot"
            subtitle="Primary 5A today"
            right={<MockBadge color="emerald">96% OK</MockBadge>}
          >
            <div className="space-y-1">
              {WELLBEING.map((w) => (
                <div
                  key={w.name}
                  className="flex items-center gap-1.5 p-1 rounded-md hover:bg-gray-50"
                >
                  <MockAvatar
                    name={w.name}
                    size={16}
                    gradientFrom={w.avatar[0]}
                    gradientTo={w.avatar[1]}
                  />
                  <span className="text-[9px] font-semibold text-gray-900 flex-1 truncate">
                    {w.name}
                  </span>
                  {w.mood === "positive" ? (
                    <Smile className="h-3 w-3 text-emerald-500" />
                  ) : w.mood === "neutral" ? (
                    <Activity className="h-3 w-3 text-amber-500" />
                  ) : (
                    <Frown className="h-3 w-3 text-rose-500" />
                  )}
                </div>
              ))}
            </div>
          </Panel>

          <div className="rounded-2xl bg-gradient-to-br from-[#f43f5e]/10 to-[#8b5cf6]/5 border border-[#f43f5e]/20 p-2.5">
            <div className="flex items-center gap-1 mb-1">
              <AlertCircle className="h-3 w-3 text-[#f43f5e]" />
              <span className="text-[9px] font-bold text-[#f43f5e] uppercase tracking-wide">
                Active Alert
              </span>
            </div>
            <div className="text-[10px] font-bold text-gray-900">
              Ethan Kim — wellbeing trend down
            </div>
            <div className="text-[8px] text-gray-600 mt-0.5">
              Counselor notified · Support plan active
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
