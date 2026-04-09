"use client";

import {
  LayoutDashboard,
  Brain,
  BarChart3,
  LineChart,
  FileText,
  Sparkles,
  Send,
  Paperclip,
  Database,
  Zap,
  TrendingUp,
  Users,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockBadge, Panel, MiniLineChart, MiniBarChart } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

export function DataScientistMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  return (
    <DashboardShell
      url="app.elementals.vn/admin/insights"
      tabTitle="Data Scientist AI"
      breadcrumb="Data Scientist · AI Insights"
      userName="Dr Pham"
      userGradient={["#f59e0b", "#8b5cf6"]}
      dayBadge="AI"
      dayBadgeColor="violet"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: "Dashboard" },
        { icon: Brain, label: "Data Scientist", active: true },
        { icon: BarChart3, label: "Dashboards" },
        { icon: Database, label: "Data Sources" },
        { icon: FileText, label: "Reports" },
        { icon: Users, label: "Audience" },
        { icon: Sparkles, label: "Prompts" },
      ]}
    >
      <div className="grid grid-cols-5 gap-2.5">
        {/* LEFT — Chat (3/5) */}
        <div className="col-span-3">
          <div className="rounded-2xl bg-white border border-gray-200/70 shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col" style={{ height: 360 }}>
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-[#8b5cf6]/5">
              <div className="flex items-center gap-1.5">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-amber-500 to-[#8b5cf6] flex items-center justify-center">
                  <Brain className="h-2.5 w-2.5 text-white" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-900 leading-tight">Data Scientist</div>
                  <div className="text-[8px] text-gray-500">Grounded · Oct 2025 data</div>
                </div>
              </div>
              <MockBadge color="amber">Deep mode</MockBadge>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-hidden p-3 space-y-2 bg-gradient-to-b from-white to-[#fafafa]">
              {/* User query */}
              <div className="flex justify-end">
                <div className="max-w-[80%] px-2.5 py-1.5 bg-[#8b5cf6] text-white rounded-xl rounded-tr-sm">
                  <div className="text-[9px]">
                    Which grade has the biggest drop in attendance this month?
                  </div>
                </div>
              </div>

              {/* AI response with inline chart */}
              <div className="flex gap-1.5">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-amber-500 to-[#8b5cf6] flex items-center justify-center shrink-0">
                  <Brain className="h-2 w-2 text-white" />
                </div>
                <div className="max-w-[85%]">
                  <div className="px-2.5 py-2 bg-gray-100 rounded-xl rounded-tl-sm">
                    <div className="text-[9px] text-gray-900 mb-1.5">
                      <span className="font-bold">Secondary 7A</span> dropped from{" "}
                      <span className="font-bold text-rose-600">94%→86%</span> this month — the biggest decline.
                    </div>

                    {/* Inline chart */}
                    <div className="bg-white rounded-md p-1.5 border border-gray-200 mb-1.5">
                      <div className="text-[7px] text-gray-500 font-semibold mb-0.5">
                        Attendance by class — Oct 2025
                      </div>
                      <MiniBarChart
                        data={[94, 86, 95, 92, 96]}
                        labels={["5A", "7A", "5B", "7B", "8A"]}
                        color="#8b5cf6"
                        width={240}
                        height={60}
                      />
                    </div>

                    <div className="text-[8px] text-gray-700 space-y-0.5">
                      <div>• 3 students with consecutive absences</div>
                      <div>• Correlates with recent schedule change</div>
                      <div className="text-[#8b5cf6] font-semibold mt-0.5">
                        → Suggest follow-up with homeroom teacher
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 mt-1 px-1">
                    <button className="text-[8px] text-[#8b5cf6] font-semibold">
                      Show students
                    </button>
                    <span className="text-[7px] text-gray-300">·</span>
                    <button className="text-[8px] text-[#8b5cf6] font-semibold">
                      Export PDF
                    </button>
                    <span className="text-[7px] text-gray-300">·</span>
                    <button className="text-[8px] text-[#8b5cf6] font-semibold">
                      Set alert
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-gray-100 p-2">
              <div className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-50 rounded-lg">
                <Paperclip className="h-3 w-3 text-gray-400 shrink-0" />
                <span className="text-[9px] text-gray-400 flex-1">Ask anything about your school data…</span>
                <button className="h-5 w-5 rounded-md bg-[#8b5cf6] flex items-center justify-center shrink-0">
                  <Send className="h-2.5 w-2.5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Suggested prompts + KPIs (2/5) */}
        <div className="col-span-2 space-y-2.5">
          <Panel
            title="Suggested Prompts"
            subtitle="One-click insights"
            right={
              <div className="h-4 w-4 rounded-full bg-amber-100 flex items-center justify-center">
                <Zap className="h-2.5 w-2.5 text-amber-600" />
              </div>
            }
          >
            <div className="space-y-1">
              {[
                "Top performing classes this term",
                "Students needing reading support",
                "Revenue vs last year",
                "Teacher workload analysis",
              ].map((p) => (
                <div
                  key={p}
                  className="flex items-center gap-1 p-1.5 rounded-md bg-gray-50 hover:bg-amber-50 cursor-pointer"
                >
                  <Sparkles className="h-2.5 w-2.5 text-amber-600 shrink-0" />
                  <span className="text-[9px] text-gray-700">{p}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Live KPIs" subtitle="Updated in real time">
            <div className="grid grid-cols-2 gap-1">
              {[
                { label: "Attendance", value: "94.5%", trend: "+1.2%", color: "#10b981" },
                { label: "Avg grade", value: "82.4", trend: "+2.1", color: "#FDB714" },
                { label: "Enrollment", value: "557", trend: "+24", color: "#3b82f6" },
                { label: "NPS", value: "+62", trend: "+8", color: "#8b5cf6" },
              ].map((k) => (
                <div key={k.label} className="p-1.5 rounded-md bg-gray-50">
                  <div className="text-[7px] text-gray-500 uppercase font-semibold">{k.label}</div>
                  <div className="text-sm font-black text-gray-900 leading-none tabular-nums mt-0.5">
                    {k.value}
                  </div>
                  <div className="text-[7px] font-bold text-emerald-600 mt-0.5">{k.trend}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </DashboardShell>
  );
}
