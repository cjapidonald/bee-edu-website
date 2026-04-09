"use client";

import {
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  TrendingUp,
  Bell,
  Search,
  LayoutDashboard,
  GraduationCap,
  Sparkles,
  BookOpen,
  MessageSquare,
  Calendar,
  Settings,
  Heart,
  Sun,
  Coins,
  Star,
  ChevronDown,
  Plus,
} from "lucide-react";
import { BrowserFrame } from "./BrowserFrame";
import {
  MockAvatar,
  Sparkline,
  MiniLineChart,
  StatCard,
  MockBadge,
  Panel,
} from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

/**
 * HomeroomTeacherDashboardMockup
 *
 * A static, self-contained recreation of Beaver's Homeroom Teacher Dashboard
 * (src/pages/HomeroomTeacherDashboard.tsx) — used as a product visual in the
 * KiwiBee marketing site.
 *
 * Data is hardcoded to match Beaver's demo seed: Primary 5A class, English/Math/
 * Science/Vietnamese subjects, ~5 students.
 */

// Seeded demo data matching Beaver's demo-organization provisioner
const STUDENTS = [
  { name: "Alex Chen", gems: 48, trend: "+12%", avg: 87, status: "present", gradient: ["#FDB714", "#FF6B9D"] as const },
  { name: "Maya Patel", gems: 52, trend: "+8%", avg: 92, status: "present", gradient: ["#00C9A7", "#22d3ee"] as const },
  { name: "Jordan Lee", gems: 34, trend: "+4%", avg: 78, status: "late", gradient: ["#E83B5E", "#FF6B9D"] as const },
  { name: "Priya Sharma", gems: 41, trend: "+6%", avg: 84, status: "present", gradient: ["#8b5cf6", "#E83B5E"] as const },
  { name: "Ethan Kim", gems: 29, trend: "-2%", avg: 72, status: "excused", gradient: ["#3b82f6", "#00C9A7"] as const },
];

const BEHAVIOR_TREND = [18, 22, 19, 28, 32, 29, 38, 42, 45, 48];
const TREND_LABELS = ["M", "T", "W", "T", "F", "M", "T", "W", "T", "F"];

const SCHEDULE = [
  { time: "08:00", subjectKey: "english", teacher: "Ms. Nguyen", roomKey: "Room 5A", color: "#FDB714", dot: "bg-yellow-400" },
  { time: "09:00", subjectKey: "math", teacher: "Mr. Tran", roomKey: "Room 5A", color: "#3b82f6", dot: "bg-blue-500" },
  { time: "10:15", subjectKey: "science", teacher: "Ms. Le", roomKey: "Lab 2", color: "#00C9A7", dot: "bg-emerald-500" },
  { time: "11:15", subjectKey: "vietnamese", teacher: "Ms. Pham", roomKey: "Room 5A", color: "#E83B5E", dot: "bg-rose-500" },
];

function StatusDot({ status }: { status: string }) {
  const colors = {
    present: "bg-emerald-500",
    late: "bg-amber-500",
    absent: "bg-red-500",
    excused: "bg-blue-500",
  } as const;
  return (
    <span
      className={`inline-block h-1.5 w-1.5 rounded-full ${
        colors[status as keyof typeof colors] || "bg-gray-400"
      }`}
    />
  );
}

export function HomeroomTeacherDashboardMockup({
  className = "",
  lang = "en",
}: {
  className?: string;
  lang?: Locale;
}) {
  return (
    <BrowserFrame
      url="app.elementals.vn/homeroom/5a"
      tabTitle={`${mt("homeroomTeacher.title", lang)} — Primary 5A`}
      className={className}
    >
      <div className="flex bg-[#fafafa] text-gray-900" style={{ fontFamily: "-apple-system, system-ui, sans-serif" }}>
        {/* ================= SIDEBAR ================= */}
        <aside className="w-[120px] shrink-0 bg-white border-r border-gray-200/70 py-3 px-2 flex flex-col gap-0.5">
          {/* Brand */}
          <div className="flex items-center gap-1.5 px-2 pb-3 mb-1 border-b border-gray-100">
            <div
              className="h-5 w-5 rounded-md flex items-center justify-center text-white font-black text-[9px]"
              style={{ background: "linear-gradient(135deg, #FDB714, #E83B5E)" }}
            >
              B
            </div>
            <span className="text-[10px] font-bold text-gray-900">Beaver</span>
          </div>

          {/* Nav items */}
          {[
            { icon: LayoutDashboard, label: mt("common.dashboard", lang), active: true },
            { icon: Users, label: mt("common.students", lang) },
            { icon: GraduationCap, label: mt("common.grade", lang) },
            { icon: Sparkles, label: "ClassSpark" },
            { icon: BookOpen, label: mt("common.homework", lang) },
            { icon: Calendar, label: mt("common.schedule", lang) },
            { icon: MessageSquare, label: mt("common.messages", lang) },
            { icon: Heart, label: lang === "vi" ? "Sức khỏe" : "Wellbeing" },
            { icon: Settings, label: mt("common.settings", lang) },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg ${
                item.active
                  ? "bg-[#FDB714]/10 text-[#a16207] font-semibold"
                  : "text-gray-500"
              }`}
            >
              <item.icon className="h-3 w-3 shrink-0" />
              <span className="text-[9px] truncate">{item.label}</span>
            </div>
          ))}
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 min-w-0 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-200/70">
            <div className="flex items-center gap-2 min-w-0">
              <div className="text-[11px] font-semibold text-gray-900">{mt("homeroomTeacher.title", lang)} · Primary 5A</div>
              <MockBadge color="yellow">
                <Sun className="h-2 w-2" />
                {mt("common.monday", lang)}
              </MockBadge>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {/* Search */}
              <div className="hidden md:flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md w-[120px]">
                <Search className="h-2.5 w-2.5 text-gray-400" />
                <span className="text-[9px] text-gray-400">{mt("common.search", lang)}</span>
              </div>
              {/* Notification */}
              <div className="relative">
                <Bell className="h-3 w-3 text-gray-500" />
                <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 bg-red-500 rounded-full" />
              </div>
              {/* Avatar */}
              <div className="flex items-center gap-1">
                <MockAvatar name="Ms Nguyen" size={22} gradientFrom="#FDB714" gradientTo="#E83B5E" />
                <ChevronDown className="h-2 w-2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* ================= DASHBOARD BODY ================= */}
          <div className="p-3 bg-[#fafafa] space-y-2.5">
            {/* Greeting row */}
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[14px] font-bold text-gray-900 leading-tight">{mt("common.greeting", lang)}, Ms. Nguyen</div>
                <div className="text-[10px] text-gray-500">{mt("common.mondayFull", lang)} · 18 {mt("common.students", lang).toLowerCase()}</div>
              </div>
              <button
                className="flex items-center gap-1 px-2 py-1 bg-[#FDB714] text-[#7a4e00] rounded-lg text-[10px] font-semibold shadow-sm"
              >
                <Plus className="h-2.5 w-2.5" />
                {lang === "vi" ? "Buổi mới" : "New Session"}
              </button>
            </div>

            {/* Attendance summary — 6 up */}
            <div className="grid grid-cols-6 gap-1.5">
              <StatCard icon={Users} label={lang === "vi" ? "Tổng" : "Total"} value={18} color="text-gray-600" bg="bg-gray-100" />
              <StatCard icon={CheckCircle2} label={mt("common.present", lang)} value={15} color="text-emerald-600" bg="bg-emerald-100" trend="+2" />
              <StatCard icon={Clock} label={mt("common.late", lang)} value={1} color="text-amber-600" bg="bg-amber-100" />
              <StatCard icon={XCircle} label={mt("common.absent", lang)} value={1} color="text-red-600" bg="bg-red-100" />
              <StatCard icon={FileText} label={mt("common.excused", lang)} value={1} color="text-blue-600" bg="bg-blue-100" />
              <StatCard icon={TrendingUp} label={lang === "vi" ? "Tỷ lệ" : "Rate"} value="94%" color="text-emerald-600" bg="bg-emerald-100" trend="+3%" />
            </div>

            {/* 2-col grid */}
            <div className="grid grid-cols-5 gap-2.5">
              {/* LEFT — Students table (3/5) */}
              <div className="col-span-3">
                <Panel
                  title={mt("common.students", lang)}
                  subtitle={lang === "vi" ? "Hiệu suất & điểm ClassSpark" : "Live performance & ClassSpark gems"}
                  right={
                    <div className="flex items-center gap-1">
                      <MockBadge color="emerald">5 {mt("common.present", lang).toLowerCase()}</MockBadge>
                      <MockBadge color="amber">1 {mt("common.late", lang).toLowerCase()}</MockBadge>
                    </div>
                  }
                >
                  {/* Table header */}
                  <div className="grid grid-cols-[1.3fr_0.6fr_0.9fr_0.9fr] gap-1 px-1 pb-1.5 border-b border-gray-100">
                    <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider">{lang === "vi" ? "Tên" : "Name"}</div>
                    <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider">{mt("common.status", lang)}</div>
                    <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider">ClassSpark</div>
                    <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider">{lang === "vi" ? "TB" : "Avg"}</div>
                  </div>

                  {/* Rows */}
                  <div className="divide-y divide-gray-100">
                    {STUDENTS.map((s) => (
                      <div
                        key={s.name}
                        className="grid grid-cols-[1.3fr_0.6fr_0.9fr_0.9fr] gap-1 items-center py-1.5"
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          <MockAvatar
                            name={s.name}
                            size={20}
                            gradientFrom={s.gradient[0]}
                            gradientTo={s.gradient[1]}
                          />
                          <span className="text-[10px] font-medium text-gray-900 truncate">
                            {s.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <StatusDot status={s.status} />
                          <span className="text-[9px] text-gray-600 capitalize">{mt(`common.${s.status}`, lang)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex items-center gap-0.5 px-1 py-0.5 bg-[#FDB714]/10 rounded">
                            <Coins className="h-2 w-2 text-[#FDB714]" />
                            <span className="text-[9px] font-bold text-[#a16207] tabular-nums">{s.gems}</span>
                          </div>
                          <span
                            className={`text-[8px] font-semibold ${
                              s.trend.startsWith("+") ? "text-emerald-600" : "text-red-500"
                            }`}
                          >
                            {s.trend}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className={`h-1 flex-1 rounded-full overflow-hidden ${
                              s.avg >= 85 ? "bg-emerald-100" : s.avg >= 75 ? "bg-amber-100" : "bg-red-100"
                            }`}
                          >
                            <div
                              className={`h-full rounded-full ${
                                s.avg >= 85 ? "bg-emerald-500" : s.avg >= 75 ? "bg-amber-500" : "bg-red-500"
                              }`}
                              style={{ width: `${s.avg}%` }}
                            />
                          </div>
                          <span
                            className={`text-[9px] font-bold tabular-nums ${
                              s.avg >= 85 ? "text-emerald-600" : s.avg >= 75 ? "text-amber-600" : "text-red-600"
                            }`}
                          >
                            {s.avg}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>

              {/* RIGHT — Chart + Schedule (2/5) */}
              <div className="col-span-2 space-y-2.5">
                {/* Behavior trend chart */}
                <Panel
                  title={mt("common.behaviorTrend", lang)}
                  subtitle={lang === "vi" ? "Đá quý · 10 ngày qua" : "Gems earned · last 10 days"}
                  right={
                    <div className="flex items-baseline gap-1">
                      <span className="text-[13px] font-bold text-gray-900 tabular-nums">+127</span>
                      <span className="text-[9px] text-emerald-600 font-semibold">+24%</span>
                    </div>
                  }
                >
                  <MiniLineChart
                    data={BEHAVIOR_TREND}
                    labels={TREND_LABELS}
                    color="#FDB714"
                    aspectRatio={3.2}
                  />
                </Panel>

                {/* Today's schedule */}
                <Panel
                  title={lang === "vi" ? "Lịch hôm nay" : "Today's Schedule"}
                  subtitle={lang === "vi" ? "Thứ Hai, 14/10" : "Monday, Oct 14"}
                  right={<MockBadge color="pink">{lang === "vi" ? "4 tiết" : "4 periods"}</MockBadge>}
                >
                  <div className="space-y-1">
                    {SCHEDULE.map((s, i) => (
                      <div
                        key={s.time}
                        className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-gray-50"
                      >
                        <div className="text-[9px] font-bold text-gray-500 tabular-nums w-7 shrink-0">
                          {s.time}
                        </div>
                        <div
                          className="h-6 w-0.5 rounded-full shrink-0"
                          style={{ background: s.color }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] font-semibold text-gray-900 truncate">
                            {mt(`subjects.${s.subjectKey}`, lang)}
                          </div>
                          <div className="text-[8px] text-gray-500 truncate">{s.roomKey}</div>
                        </div>
                        {i === 0 && (
                          <span className="text-[8px] font-bold text-emerald-600 px-1 py-0.5 bg-emerald-50 rounded">
                            {lang === "vi" ? "NGAY" : "NOW"}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>
            </div>

            {/* Bottom row — quick insights */}
            <div className="grid grid-cols-3 gap-1.5">
              <div className="rounded-2xl bg-gradient-to-br from-[#FDB714]/10 to-[#FF6B9D]/5 border border-[#FDB714]/20 p-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-[#a16207] font-semibold uppercase tracking-wide">{mt("classSpark.topPerformer", lang)}</div>
                    <div className="text-[11px] font-bold text-gray-900 mt-0.5">Maya Patel · 92</div>
                  </div>
                  <Star className="h-4 w-4 text-[#FDB714] fill-[#FDB714]" />
                </div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/40 border border-emerald-200/60 p-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-emerald-700 font-semibold uppercase tracking-wide">{mt("gradebook.classAverage", lang)}</div>
                    <div className="text-[11px] font-bold text-gray-900 mt-0.5">82.6 · {lang === "vi" ? "Trên mục tiêu" : "Above target"}</div>
                  </div>
                  <Sparkline data={[72, 74, 78, 80, 82, 83]} color="#10b981" width={40} height={18} />
                </div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-[#E83B5E]/5 to-violet-50/40 border border-[#E83B5E]/15 p-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-[#E83B5E] font-semibold uppercase tracking-wide">{mt("gradebook.needsSupport", lang)}</div>
                    <div className="text-[11px] font-bold text-gray-900 mt-0.5">Ethan Kim · 72</div>
                  </div>
                  <Heart className="h-4 w-4 text-[#E83B5E]" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </BrowserFrame>
  );
}
