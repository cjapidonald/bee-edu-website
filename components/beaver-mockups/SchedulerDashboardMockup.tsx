"use client";

import {
  LayoutDashboard,
  Calendar,
  Users,
  School,
  Clock,
  Sparkles,
  BarChart3,
  Settings,
  Zap,
  MapPin,
  MoreHorizontal,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockBadge, Panel } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

// Timetable grid: days × periods
const PERIODS = ["08:00", "09:00", "10:15", "11:15", "13:00", "14:00"];

// Color-coded blocks (subject, teacher, room)
// [day][period] — null means empty
type Block = { subjectKey: string; teacher: string; color: string } | null;
const TIMETABLE: Block[][] = [
  // Mon
  [
    { subjectKey: "english", teacher: "Ms Tran", color: "#FDB714" },
    { subjectKey: "math", teacher: "Mr Tran", color: "#3b82f6" },
    { subjectKey: "science", teacher: "Ms Le", color: "#00C9A7" },
    { subjectKey: "vietnamese", teacher: "Ms Pham", color: "#E83B5E" },
    null,
    { subjectKey: "pe", teacher: "Mr Vu", color: "#8b5cf6" },
  ],
  // Tue
  [
    { subjectKey: "math", teacher: "Mr Tran", color: "#3b82f6" },
    { subjectKey: "english", teacher: "Ms Tran", color: "#FDB714" },
    null,
    { subjectKey: "art", teacher: "Ms Hoa", color: "#FF6B9D" },
    { subjectKey: "science", teacher: "Ms Le", color: "#00C9A7" },
    { subjectKey: "music", teacher: "Mr An", color: "#FFA500" },
  ],
  // Wed
  [
    { subjectKey: "vietnamese", teacher: "Ms Pham", color: "#E83B5E" },
    { subjectKey: "science", teacher: "Ms Le", color: "#00C9A7" },
    { subjectKey: "math", teacher: "Mr Tran", color: "#3b82f6" },
    { subjectKey: "english", teacher: "Ms Tran", color: "#FDB714" },
    null,
    null,
  ],
  // Thu
  [
    { subjectKey: "english", teacher: "Ms Tran", color: "#FDB714" },
    { subjectKey: "pe", teacher: "Mr Vu", color: "#8b5cf6" },
    { subjectKey: "math", teacher: "Mr Tran", color: "#3b82f6" },
    { subjectKey: "science", teacher: "Ms Le", color: "#00C9A7" },
    { subjectKey: "vietnamese", teacher: "Ms Pham", color: "#E83B5E" },
    null,
  ],
  // Fri
  [
    { subjectKey: "math", teacher: "Mr Tran", color: "#3b82f6" },
    { subjectKey: "vietnamese", teacher: "Ms Pham", color: "#E83B5E" },
    { subjectKey: "english", teacher: "Ms Tran", color: "#FDB714" },
    null,
    { subjectKey: "science", teacher: "Ms Le", color: "#00C9A7" },
    { subjectKey: "art", teacher: "Ms Hoa", color: "#FF6B9D" },
  ],
];

export function SchedulerDashboardMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  const DAYS = [mt("common.monday", lang), mt("common.tuesday", lang), mt("common.wednesday", lang), mt("common.thursday", lang), mt("common.friday", lang)];
  return (
    <DashboardShell
      url="www.kiwibee.com/scheduler"
      tabTitle={lang === "vi" ? "Lập lịch — Tuần 12" : "Scheduler — Week 12"}
      breadcrumb={lang === "vi" ? "Lập lịch · Tuần 12 · Lớp 5A" : "Scheduler · Week 12 · Primary 5A"}
      userName="Mr Le"
      userGradient={["#8b5cf6", "#3b82f6"]}
      dayBadge={mt("common.monday", lang)}
      dayBadgeColor="violet"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: mt("common.dashboard", lang), active: true },
        { icon: Calendar, label: mt("scheduler.timetable", lang) },
        { icon: Users, label: lang === "vi" ? "Giáo viên" : "Teachers" },
        { icon: School, label: mt("common.classes", lang) },
        { icon: MapPin, label: lang === "vi" ? "Phòng" : "Rooms" },
        { icon: Sparkles, label: lang === "vi" ? "Tối ưu AI" : "AI Optimize" },
        { icon: BarChart3, label: lang === "vi" ? "Phân tích" : "Insights" },
        { icon: Clock, label: lang === "vi" ? "Lịch sử" : "History" },
        { icon: Settings, label: mt("common.settings", lang) },
      ]}
    >
      {/* Header */}
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="text-[14px] font-bold text-white leading-tight">{lang === "vi" ? "Thời khóa biểu Thông minh" : "Magnetic Timetable"}</div>
          <div className="text-[10px] text-gray-500">{lang === "vi" ? "Tuần 12 · 14–18/10 · 30 tiết" : "Week 12 · Oct 14–18 · 30 lessons"}</div>
        </div>
        <button className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-[#8b5cf6] to-[#E83B5E] text-white rounded-lg text-[10px] font-semibold shadow-sm">
          <Zap className="h-2.5 w-2.5" />
          {lang === "vi" ? "Tối ưu AI" : "AI Optimize"}
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-1.5 mb-2.5">
        {[
          { label: lang === "vi" ? "Tiết" : "Lessons", value: "30", color: "text-[#8b5cf6]", bg: "bg-[#8b5cf6]/10" },
          { label: lang === "vi" ? "Giáo viên" : "Teachers", value: "8", color: "text-[#3b82f6]", bg: "bg-blue-100" },
          { label: lang === "vi" ? "Phòng" : "Rooms", value: "6", color: "text-[#00C9A7]", bg: "bg-emerald-100" },
          { label: mt("scheduler.conflicts", lang), value: "0", color: "text-emerald-600", bg: "bg-emerald-100" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl bg-gray-900 border border-gray-700/70 p-2.5 shadow-lg shadow-black/20"
          >
            <div className={`h-5 w-5 rounded ${s.bg} mb-1`} />
            <div className="text-[9px] text-gray-500 font-medium">{s.label}</div>
            <div className={`text-base font-bold tabular-nums ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Timetable grid */}
      <Panel
        title={lang === "vi" ? "Tuần 12 — Lớp 5A" : "Week 12 — Primary 5A"}
        subtitle={lang === "vi" ? "Kéo ô để đổi lịch" : "Drag blocks to reschedule"}
        right={<MockBadge color="emerald">{mt("scheduler.noConflicts", lang)}</MockBadge>}
      >
        <div className="overflow-hidden">
          {/* Day headers */}
          <div className="grid grid-cols-[36px_repeat(5,1fr)] gap-1 mb-1">
            <div />
            {DAYS.map((d, i) => (
              <div
                key={d}
                className={`text-center py-1 rounded-md text-[9px] font-bold ${
                  i === 0 ? "bg-[#8b5cf6]/10 text-[#8b5cf6]" : "text-gray-400"
                }`}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Rows */}
          {PERIODS.map((time, periodIdx) => (
            <div key={time} className="grid grid-cols-[36px_repeat(5,1fr)] gap-1 mb-1">
              <div className="text-[8px] text-gray-400 font-bold tabular-nums flex items-center">
                {time}
              </div>
              {DAYS.map((day, dayIdx) => {
                const block = TIMETABLE[dayIdx][periodIdx];
                if (!block) {
                  return (
                    <div
                      key={`${day}-${time}`}
                      className="h-8 rounded-md bg-gray-800/50 border border-dashed border-gray-700"
                    />
                  );
                }
                return (
                  <div
                    key={`${day}-${time}`}
                    className="h-8 rounded-md p-1 flex flex-col justify-between cursor-move"
                    style={{
                      background: `${block.color}15`,
                      borderLeft: `2px solid ${block.color}`,
                    }}
                  >
                    <div
                      className="text-[8px] font-bold leading-none truncate"
                      style={{ color: block.color }}
                    >
                      {mt(`subjects.${block.subjectKey}`, lang)}
                    </div>
                    <div className="text-[7px] text-gray-500 truncate leading-none">
                      {block.teacher}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Panel>
    </DashboardShell>
  );
}
