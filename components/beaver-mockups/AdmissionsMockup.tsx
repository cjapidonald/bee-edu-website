"use client";

import {
  LayoutDashboard,
  Building2,
  FileText,
  Users,
  CheckCircle2,
  Clock,
  FileCheck,
  Calendar,
  Sparkles,
  UserPlus,
  TrendingUp,
  Upload,
  Mail,
  Plus,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockAvatar, MockBadge, Panel } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

// Funnel data
const FUNNEL = [
  { stage: "Inquiries", count: 142, color: "#9ca3af" },
  { stage: "Applications", count: 86, color: "#3b82f6" },
  { stage: "Interviews", count: 42, color: "#FDB714" },
  { stage: "Offers", count: 24, color: "#E83B5E" },
  { stage: "Enrolled", count: 18, color: "#10b981" },
];

const APPLICATIONS = [
  { name: "Aria Nguyen", grade: "Grade 5", stage: "Interview", docs: 4, docsTotal: 5, avatar: ["#FDB714", "#E83B5E"] as const },
  { name: "Benjamin Li", grade: "Grade 3", stage: "Offer", docs: 5, docsTotal: 5, avatar: ["#3b82f6", "#8b5cf6"] as const },
  { name: "Sofia Patel", grade: "Grade 7", stage: "Application", docs: 3, docsTotal: 5, avatar: ["#E83B5E", "#FF6B9D"] as const },
  { name: "Lucas Chen", grade: "Grade 5", stage: "Interview", docs: 5, docsTotal: 5, avatar: ["#00C9A7", "#3b82f6"] as const },
];

export function AdmissionsMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  const maxCount = Math.max(...FUNNEL.map((f) => f.count));

  return (
    <DashboardShell
      url="www.kiwibee.com/admissions"
      tabTitle="Admissions — Applications"
      breadcrumb="Admissions · Demo Primary School"
      userName="Ms Vo"
      userGradient={["#3b82f6", "#00C9A7"]}
      dayBadge="Fall"
      dayBadgeColor="blue"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: "Dashboard", active: true },
        { icon: FileText, label: "Applications" },
        { icon: Calendar, label: "Interviews" },
        { icon: FileCheck, label: "Documents" },
        { icon: UserPlus, label: "Enrollments" },
        { icon: Users, label: "Families" },
        { icon: TrendingUp, label: "Reports" },
        { icon: Mail, label: "Messages" },
      ]}
    >
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="text-[14px] font-bold text-white leading-tight">Admissions Funnel</div>
          <div className="text-[10px] text-gray-500">
            Fall 2026 intake · 142 inquiries · 18 enrolled
          </div>
        </div>
        <button className="flex items-center gap-1 px-2 py-1 bg-[#3b82f6] text-white rounded-lg text-[10px] font-semibold shadow-sm">
          <Plus className="h-2.5 w-2.5" />
          New Application
        </button>
      </div>

      <div className="grid grid-cols-5 gap-2.5">
        {/* LEFT — Applications (3/5) */}
        <div className="col-span-3">
          <Panel
            title="Recent Applications"
            subtitle="Awaiting action"
            right={<MockBadge color="blue">24 active</MockBadge>}
          >
            <div className="space-y-1.5">
              {APPLICATIONS.map((a) => (
                <div
                  key={a.name}
                  className="rounded-lg bg-gray-800/50/80 border border-gray-800 p-1.5"
                >
                  <div className="flex items-center gap-2">
                    <MockAvatar
                      name={a.name}
                      size={22}
                      gradientFrom={a.avatar[0]}
                      gradientTo={a.avatar[1]}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-bold text-white truncate">
                        {a.name}
                      </div>
                      <div className="text-[8px] text-gray-500">{a.grade}</div>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 shrink-0">
                      <span
                        className={`text-[7px] font-bold px-1 py-0.5 rounded ${
                          a.stage === "Offer"
                            ? "bg-emerald-950/50 text-emerald-700"
                            : a.stage === "Interview"
                              ? "bg-[#FDB714]/15 text-[#a16207]"
                              : "bg-blue-950/50 text-blue-700"
                        }`}
                      >
                        {a.stage}
                      </span>
                      <div className="flex items-center gap-0.5">
                        <FileCheck className="h-2 w-2 text-gray-400" />
                        <span className="text-[7px] text-gray-500 tabular-nums">
                          {a.docs}/{a.docsTotal}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Docs progress */}
                  <div className="h-0.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full bg-[#3b82f6] rounded-full"
                      style={{ width: `${(a.docs / a.docsTotal) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* RIGHT — Funnel (2/5) */}
        <div className="col-span-2">
          <Panel
            title="Conversion Funnel"
            subtitle="Fall 2026 intake"
            right={<MockBadge color="emerald">12.7% conv.</MockBadge>}
          >
            <div className="space-y-1">
              {FUNNEL.map((f) => {
                const widthPct = (f.count / maxCount) * 100;
                return (
                  <div key={f.stage} className="relative">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[9px] font-bold text-gray-300">{f.stage}</span>
                      <span
                        className="text-[9px] font-black tabular-nums"
                        style={{ color: f.color }}
                      >
                        {f.count}
                      </span>
                    </div>
                    <div className="h-3 rounded-md overflow-hidden bg-gray-800">
                      <div
                        className="h-full rounded-md flex items-center justify-end pr-1.5 text-[7px] font-bold text-white"
                        style={{
                          width: `${widthPct}%`,
                          background: f.color,
                        }}
                      >
                        {widthPct >= 40 && `${Math.round((f.count / FUNNEL[0].count) * 100)}%`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-2 pt-2 border-t border-gray-800 grid grid-cols-2 gap-1">
              <div className="flex items-center gap-1">
                <Upload className="h-2.5 w-2.5 text-[#3b82f6]" />
                <div>
                  <div className="text-[7px] text-gray-500">Avg docs</div>
                  <div className="text-[9px] font-bold text-white">4.2 / 5</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-2.5 w-2.5 text-[#FDB714]" />
                <div>
                  <div className="text-[7px] text-gray-500">Avg cycle</div>
                  <div className="text-[9px] font-bold text-white">12 days</div>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </DashboardShell>
  );
}
