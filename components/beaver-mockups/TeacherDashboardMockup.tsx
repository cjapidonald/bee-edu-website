"use client";

import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardCheck,
  Sparkles,
  MessageSquare,
  Calendar,
  BarChart3,
  Settings,
  Brain,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle2,
  GraduationCap,
  Wand2,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockAvatar, Sparkline, MockBadge, Panel, StatCard, MiniLineChart } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const CLASSES_EN = [
  { name: "Primary 5A — English", students: 18, progress: 76, gradient: ["#FDB714", "#FF6B9D"] as const, next: "08:00" },
  { name: "Secondary 7A — English", students: 22, progress: 62, gradient: ["#00C9A7", "#3b82f6"] as const, next: "10:15" },
  { name: "Primary 5B — English", students: 19, progress: 84, gradient: ["#E83B5E", "#8b5cf6"] as const, next: "13:00" },
];

const CLASSES_VI = [
  { name: "Lớp 5A — Tiếng Anh", students: 18, progress: 76, gradient: ["#FDB714", "#FF6B9D"] as const, next: "08:00" },
  { name: "Lớp 7A — Tiếng Anh", students: 22, progress: 62, gradient: ["#00C9A7", "#3b82f6"] as const, next: "10:15" },
  { name: "Lớp 5B — Tiếng Anh", students: 19, progress: 84, gradient: ["#E83B5E", "#8b5cf6"] as const, next: "13:00" },
];

const HOMEWORK_QUEUE_EN = [
  { title: "Poetry analysis — Shakespeare", class: "Secondary 7A", pending: 8, total: 22 },
  { title: "Reading comprehension Unit 4", class: "Primary 5A", pending: 3, total: 18 },
  { title: "Creative writing project", class: "Primary 5B", pending: 11, total: 19 },
];

const HOMEWORK_QUEUE_VI = [
  { title: "Phân tích thơ — Shakespeare", class: "Lớp 7A", pending: 8, total: 22 },
  { title: "Đọc hiểu Chủ đề 4", class: "Lớp 5A", pending: 3, total: 18 },
  { title: "Dự án viết sáng tạo", class: "Lớp 5B", pending: 11, total: 19 },
];

export function TeacherDashboardMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  const CLASSES = lang === "vi" ? CLASSES_VI : CLASSES_EN;
  const HOMEWORK_QUEUE = lang === "vi" ? HOMEWORK_QUEUE_VI : HOMEWORK_QUEUE_EN;
  return (
    <DashboardShell
      url="www.kiwibee.com/teacher"
      tabTitle={lang === "vi" ? "Giáo viên — Lớp của tôi" : "Teacher — My Classes"}
      breadcrumb={lang === "vi" ? "Giáo viên · Tổ Tiếng Anh" : "Teacher · English Department"}
      userName="Ms Tran"
      userGradient={["#E83B5E", "#FF6B9D"]}
      dayBadge={mt("common.monday", lang)}
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: mt("common.dashboard", lang), active: true },
        { icon: Users, label: mt("student.myClasses", lang) },
        { icon: BookOpen, label: lang === "vi" ? "Bài giảng" : "Lessons" },
        { icon: ClipboardCheck, label: mt("common.homework", lang) },
        { icon: Sparkles, label: "ClassSpark" },
        { icon: Brain, label: mt("aiAssistant.title", lang) },
        { icon: Calendar, label: mt("common.schedule", lang) },
        { icon: BarChart3, label: lang === "vi" ? "Phân tích" : "Insights" },
        { icon: MessageSquare, label: mt("common.messages", lang) },
      ]}
    >
      {/* Greeting */}
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="text-[14px] font-bold text-white leading-tight">
            {lang === "vi" ? "Chào mừng trở lại, cô Trần" : "Welcome back, Ms. Tran"}
          </div>
          <div className="text-[10px] text-gray-500">
            {lang === "vi" ? "3 lớp · 59 học sinh · Tiết kế tiếp sau 23 phút" : "3 classes · 59 students · Next lesson in 23 min"}
          </div>
        </div>
        <button className="flex items-center gap-1 px-2 py-1 bg-[#E83B5E] text-white rounded-lg text-[10px] font-semibold shadow-sm">
          <Wand2 className="h-2.5 w-2.5" />
          {lang === "vi" ? "Tạo bài giảng" : "Generate Lesson"}
        </button>
      </div>

      {/* Top stats row */}
      <div className="grid grid-cols-4 gap-1.5 mb-2.5">
        <StatCard icon={Users} label={mt("common.students", lang)} value={59} color="text-gray-400" bg="bg-gray-800" />
        <StatCard icon={CheckCircle2} label={lang === "vi" ? "Đã chấm hôm nay" : "Graded today"} value={23} color="text-emerald-600" bg="bg-emerald-100" trend="+8" />
        <StatCard icon={Clock} label={lang === "vi" ? "Chờ chấm" : "Pending"} value={22} color="text-amber-600" bg="bg-amber-100" />
        <StatCard icon={GraduationCap} label={lang === "vi" ? "Điểm TB" : "Avg grade"} value="84.2" color="text-[#FDB714]" bg="bg-[#FDB714]/20" trend="+1.3" />
      </div>

      {/* 2-col */}
      <div className="grid grid-cols-5 gap-2.5">
        {/* LEFT — My Classes (3/5) */}
        <div className="col-span-3 space-y-2.5">
          <Panel
            title={mt("student.myClasses", lang)}
            subtitle={lang === "vi" ? "Lịch hôm nay" : "Today's schedule"}
            right={<MockBadge color="yellow">{lang === "vi" ? "3 lớp" : "3 classes"}</MockBadge>}
          >
            <div className="space-y-1.5">
              {CLASSES.map((c, i) => (
                <div
                  key={c.name}
                  className="flex items-center gap-2 p-1.5 rounded-lg bg-gray-800/50/80 border border-gray-800"
                >
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-[10px] shrink-0"
                    style={{ background: `linear-gradient(135deg, ${c.gradient[0]}, ${c.gradient[1]})` }}
                  >
                    {c.name.split(" ")[1]?.[0]}
                    {c.name.split(" ")[2]?.[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-semibold text-white truncate">{c.name}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[8px] text-gray-500">{c.students} {mt("common.students", lang).toLowerCase()}</span>
                      <span className="text-[8px] text-gray-300">·</span>
                      <span className="text-[8px] text-gray-500">{lang === "vi" ? "Chương trình" : "Curriculum"} {c.progress}%</span>
                    </div>
                    <div className="h-0.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${c.progress}%`,
                          background: `linear-gradient(90deg, ${c.gradient[0]}, ${c.gradient[1]})`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[9px] font-bold text-gray-300">{c.next}</span>
                    {i === 0 && (
                      <span className="text-[7px] font-bold text-emerald-600 px-1 py-0.5 bg-emerald-950/50 rounded">{lang === "vi" ? "KẾ TIẾP" : "NEXT"}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            title={lang === "vi" ? "Bài tập cần chấm" : "Homework to Grade"}
            subtitle={lang === "vi" ? "Sắp xếp theo độ ưu tiên" : "Sorted by urgency"}
            right={<MockBadge color="rose">{lang === "vi" ? "22 chờ chấm" : "22 pending"}</MockBadge>}
          >
            <div className="space-y-1">
              {HOMEWORK_QUEUE.map((h) => (
                <div key={h.title} className="flex items-center gap-2 py-1">
                  <div className="h-5 w-5 rounded bg-[#E83B5E]/10 flex items-center justify-center shrink-0">
                    <ClipboardCheck className="h-2.5 w-2.5 text-[#E83B5E]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-semibold text-white truncate">{h.title}</div>
                    <div className="text-[8px] text-gray-500">{h.class}</div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-[10px] font-bold text-white tabular-nums">
                      {h.pending}/{h.total}
                    </div>
                    <div className="text-[7px] text-gray-500">{lang === "vi" ? "cần chấm" : "to grade"}</div>
                  </div>
                  <ChevronRight className="h-3 w-3 text-gray-300 shrink-0" />
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* RIGHT — AI + Weekly chart (2/5) */}
        <div className="col-span-2 space-y-2.5">
          <Panel
            title={mt("aiAssistant.title", lang)}
            subtitle={lang === "vi" ? "10 công cụ của bạn" : "Your 10 tools"}
            right={
              <div className="h-4 w-4 rounded-full bg-[#E83B5E]/10 flex items-center justify-center">
                <Brain className="h-2.5 w-2.5 text-[#E83B5E]" />
              </div>
            }
          >
            <div className="space-y-1">
              {[
                { label: lang === "vi" ? "Soạn giáo án" : "Lesson Planner", uses: 24, color: "text-[#FDB714]" },
                { label: lang === "vi" ? "Tạo bài tập" : "Homework Builder", uses: 18, color: "text-emerald-600" },
                { label: lang === "vi" ? "Chấm thi" : "Exam Marking", uses: 12, color: "text-blue-600" },
                { label: lang === "vi" ? "Báo cáo HS" : "Student Reports", uses: 8, color: "text-[#E83B5E]" },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-1.5 py-1 px-1.5 rounded-md bg-gray-800/50">
                  <Sparkles className={`h-2.5 w-2.5 ${t.color} shrink-0`} />
                  <span className="text-[9px] font-medium text-white flex-1 truncate">{t.label}</span>
                  <span className="text-[8px] text-gray-500 tabular-nums">{t.uses}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title={lang === "vi" ? "Hoạt động tuần" : "Weekly Activity"} subtitle={lang === "vi" ? "Bài giảng đã dạy" : "Lessons delivered"}>
            <MiniLineChart
              data={[3, 4, 6, 5, 7, 4, 3]}
              labels={[mt("common.monday", lang), mt("common.tuesday", lang), mt("common.wednesday", lang), mt("common.thursday", lang), mt("common.friday", lang), "S", "S"]}
              color="#E83B5E"
              aspectRatio={3}
            />
          </Panel>
        </div>
      </div>
    </DashboardShell>
  );
}
