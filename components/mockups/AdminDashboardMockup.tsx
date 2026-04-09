"use client";

import {
  LayoutDashboard,
  School,
  Users,
  GraduationCap,
  DollarSign,
  Shield,
  BarChart3,
  Settings,
  Brain,
  Building2,
  TrendingUp,
  UserCheck,
  FileText,
  AlertCircle,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockBadge, Panel, Sparkline, MiniLineChart, MiniBarChart } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const SCHOOLS_EN = [
  { name: "Demo Primary", students: 245, teachers: 18, attendance: 96, grade: 84, trend: [80, 82, 83, 85, 84, 86, 84] },
  { name: "Demo Secondary", students: 312, teachers: 24, attendance: 93, grade: 81, trend: [77, 79, 80, 78, 81, 82, 81] },
];

const SCHOOLS_VI = [
  { name: "Trường Tiểu học Demo", students: 245, teachers: 18, attendance: 96, grade: 84, trend: [80, 82, 83, 85, 84, 86, 84] },
  { name: "Trường Trung học Demo", students: 312, teachers: 24, attendance: 93, grade: 81, trend: [77, 79, 80, 78, 81, 82, 81] },
];

export function AdminDashboardMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  const SCHOOLS = lang === "vi" ? SCHOOLS_VI : SCHOOLS_EN;
  return (
    <DashboardShell
      url="www.kiwibee.com/admin"
      tabTitle={lang === "vi" ? "Quản trị — Tổng quan Điều hành" : "Admin — Executive Overview"}
      breadcrumb={lang === "vi" ? "Tổ chức Demo · Quản trị" : "Demo Organization · Admin"}
      userName="Dr Pham"
      userGradient={["#3b82f6", "#8b5cf6"]}
      dayBadge={mt("common.monday", lang)}
      dayBadgeColor="blue"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: mt("common.overview", lang), active: true },
        { icon: School, label: lang === "vi" ? "Trường học" : "Schools" },
        { icon: Users, label: lang === "vi" ? "Nhân sự" : "People" },
        { icon: GraduationCap, label: lang === "vi" ? "Học thuật" : "Academics" },
        { icon: DollarSign, label: mt("finance.title", lang) },
        { icon: Shield, label: lang === "vi" ? "Tuân thủ" : "Compliance" },
        { icon: Brain, label: lang === "vi" ? "Phân tích AI" : "Insights AI" },
        { icon: BarChart3, label: lang === "vi" ? "Báo cáo" : "Reports" },
        { icon: Settings, label: mt("common.settings", lang) },
      ]}
    >
      {/* Header */}
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="text-[14px] font-bold text-gray-900 leading-tight">{lang === "vi" ? "Tổng quan Điều hành" : "Executive Overview"}</div>
          <div className="text-[10px] text-gray-500">
            {lang === "vi" ? "Tổ chức Demo · 2 trường · 557 học sinh · Năm học 2025–26" : "Demo Organization · 2 schools · 557 students · AY 2025–26"}
          </div>
        </div>
        <button className="flex items-center gap-1 px-2 py-1 bg-[#3b82f6] text-gray-900 rounded-lg text-[10px] font-semibold shadow-sm">
          <FileText className="h-2.5 w-2.5" />
          {lang === "vi" ? "Xuất báo cáo" : "Export Report"}
        </button>
      </div>

      {/* KPI row — 4 big cards */}
      <div className="grid grid-cols-4 gap-1.5 mb-2.5">
        {[
          { label: lang === "vi" ? "Tuyển sinh" : "Enrollment", value: "557", trend: "+24", color: "#3b82f6", bg: "from-blue-50", icon: Users },
          { label: mt("common.attendance", lang), value: "94.5%", trend: "+1.2%", color: "#10b981", bg: "from-emerald-50", icon: UserCheck },
          { label: lang === "vi" ? "Điểm TB" : "Avg Grade", value: "82.4", trend: "+2.1", color: "#FDB714", bg: "from-yellow-50", icon: GraduationCap },
          { label: lang === "vi" ? "Doanh thu" : "Revenue", value: "$48.2k", trend: "+8.4%", color: "#E83B5E", bg: "from-rose-50", icon: DollarSign },
        ].map((k) => (
          <div
            key={k.label}
            className={`relative rounded-2xl bg-gradient-to-br ${k.bg} to-gray-950 border border-gray-200/60 p-2.5 overflow-hidden`}
          >
            <div className="flex items-center justify-between mb-1">
              <div
                className="h-5 w-5 rounded-lg flex items-center justify-center"
                style={{ background: `${k.color}20` }}
              >
                <k.icon className="h-3 w-3" style={{ color: k.color }} />
              </div>
              <span className="text-[8px] font-bold text-emerald-600">{k.trend}</span>
            </div>
            <div className="text-[9px] text-gray-500 uppercase tracking-wide font-semibold">{k.label}</div>
            <div className="text-lg font-black text-gray-900 leading-none tabular-nums mt-0.5">
              {k.value}
            </div>
          </div>
        ))}
      </div>

      {/* 2-col */}
      <div className="grid grid-cols-5 gap-2.5">
        {/* LEFT — Schools + Chart (3/5) */}
        <div className="col-span-3 space-y-2.5">
          <Panel
            title={lang === "vi" ? "Trường học" : "Schools"}
            subtitle={lang === "vi" ? "Tổng quan hiệu suất" : "Performance overview"}
            right={<MockBadge color="blue">{lang === "vi" ? "2 trường" : "2 schools"}</MockBadge>}
          >
            <div className="space-y-1.5">
              {SCHOOLS.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-2 p-1.5 rounded-lg bg-gray-50/50/80 border border-gray-100"
                >
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shrink-0">
                    <Building2 className="h-4 w-4 text-gray-900" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold text-gray-900 truncate">{s.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[8px] text-gray-500">
                        <span className="font-semibold text-gray-600">{s.students}</span> {mt("common.students", lang).toLowerCase()}
                      </span>
                      <span className="text-[8px] text-gray-500">
                        <span className="font-semibold text-gray-600">{s.teachers}</span> {lang === "vi" ? "giáo viên" : "teachers"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="text-right">
                      <div className="text-[9px] font-bold text-emerald-600 tabular-nums">
                        {s.attendance}%
                      </div>
                      <div className="text-[7px] text-gray-500">{lang === "vi" ? "c.cần" : "attend."}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] font-bold text-[#FDB714] tabular-nums">{s.grade}</div>
                      <div className="text-[7px] text-gray-500">{lang === "vi" ? "TB" : "avg"}</div>
                    </div>
                    <Sparkline data={s.trend} color="#3b82f6" width={40} height={16} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title={lang === "vi" ? "Xu hướng tuyển sinh" : "Enrollment Trend"} subtitle={lang === "vi" ? "6 tháng qua" : "Last 6 months"}>
            <MiniLineChart
              data={[510, 518, 528, 535, 549, 557]}
              labels={lang === "vi" ? ["T5", "T6", "T7", "T8", "T9", "T10"] : ["May", "Jun", "Jul", "Aug", "Sep", "Oct"]}
              color="#3b82f6"
              aspectRatio={3.4}
            />
          </Panel>
        </div>

        {/* RIGHT — Alerts + Distribution (2/5) */}
        <div className="col-span-2 space-y-2.5">
          <Panel
            title={lang === "vi" ? "Cần chú ý" : "Attention Needed"}
            right={<MockBadge color="rose">3</MockBadge>}
          >
            <div className="space-y-1">
              {[
                { label: lang === "vi" ? "Chuyên cần thấp: 5B" : "Low attendance: 5B", value: "78%", color: "rose" },
                { label: lang === "vi" ? "Báo cáo quá hạn" : "Overdue reports", value: "4", color: "amber" },
                { label: lang === "vi" ? "Đánh giá NS tới hạn" : "Staff reviews due", value: "2", color: "blue" },
              ].map((a) => (
                <div
                  key={a.label}
                  className="flex items-center gap-1.5 py-1 px-1.5 rounded-md bg-gray-50/50"
                >
                  <AlertCircle
                    className={`h-2.5 w-2.5 shrink-0 ${
                      a.color === "rose"
                        ? "text-rose-500"
                        : a.color === "amber"
                          ? "text-amber-500"
                          : "text-blue-500"
                    }`}
                  />
                  <span className="text-[9px] text-gray-600 flex-1 truncate">{a.label}</span>
                  <span className="text-[9px] font-bold text-gray-900 tabular-nums">{a.value}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title={lang === "vi" ? "Phân bố điểm" : "Grade Distribution"} subtitle={lang === "vi" ? "Tất cả trường" : "All schools"}>
            <MiniBarChart
              data={[8, 18, 32, 24, 12]}
              labels={["<60", "60-70", "70-80", "80-90", "90+"]}
              color="#FDB714"
              width={260}
              height={80}
            />
          </Panel>
        </div>
      </div>
    </DashboardShell>
  );
}
