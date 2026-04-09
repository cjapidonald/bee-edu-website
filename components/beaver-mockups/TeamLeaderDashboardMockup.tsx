"use client";

import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  Sparkles,
  ClipboardCheck,
  Brain,
  FolderKanban,
  TrendingUp,
  Target,
  Award,
  CheckCircle2,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockAvatar, MockBadge, Panel, Sparkline, MiniBarChart } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const CURRICULA_EN = [
  { title: "English Primary 5", subjectKey: "english", progress: 78, teachers: 4, skills: 42, color: "#FDB714" },
  { title: "Mathematics Primary 5", subjectKey: "math", progress: 82, teachers: 3, skills: 38, color: "#3b82f6" },
  { title: "Science Primary 5", subjectKey: "science", progress: 65, teachers: 2, skills: 30, color: "#00C9A7" },
  { title: "Vietnamese Primary 5", subjectKey: "vietnamese", progress: 91, teachers: 3, skills: 36, color: "#E83B5E" },
];

const CURRICULA_VI = [
  { title: "Tiếng Anh Lớp 5", subjectKey: "english", progress: 78, teachers: 4, skills: 42, color: "#FDB714" },
  { title: "Toán Lớp 5", subjectKey: "math", progress: 82, teachers: 3, skills: 38, color: "#3b82f6" },
  { title: "Khoa học Lớp 5", subjectKey: "science", progress: 65, teachers: 2, skills: 30, color: "#00C9A7" },
  { title: "Tiếng Việt Lớp 5", subjectKey: "vietnamese", progress: 91, teachers: 3, skills: 36, color: "#E83B5E" },
];

const TEACHER_KPI = [
  { name: "Ms Tran", subjectKey: "english", rating: 4.8, lessons: 24, avatar: ["#FDB714", "#E83B5E"] as const },
  { name: "Mr Tran", subjectKey: "math", rating: 4.6, lessons: 22, avatar: ["#3b82f6", "#8b5cf6"] as const },
  { name: "Ms Le", subjectKey: "science", rating: 4.5, lessons: 18, avatar: ["#00C9A7", "#3b82f6"] as const },
];

export function TeamLeaderDashboardMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  const CURRICULA = lang === "vi" ? CURRICULA_VI : CURRICULA_EN;
  return (
    <DashboardShell
      url="www.kiwibee.com/team-leader"
      tabTitle={lang === "vi" ? "Tổ trưởng — Học thuật" : "Team Leader — Academics"}
      breadcrumb={lang === "vi" ? "Tổ trưởng · Tổ Học thuật" : "Team Leader · Academics Department"}
      userName="Dr Vu"
      userGradient={["#FDB714", "#00C9A7"]}
      dayBadge={mt("common.monday", lang)}
      dayBadgeColor="yellow"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: mt("common.dashboard", lang), active: true },
        { icon: BookOpen, label: lang === "vi" ? "Chương trình" : "Curricula" },
        { icon: Target, label: lang === "vi" ? "Bản đồ Kỹ năng" : "Skills Map" },
        { icon: Users, label: lang === "vi" ? "Giáo viên" : "Teachers" },
        { icon: ClipboardCheck, label: mt("exams.title", lang) },
        { icon: FolderKanban, label: lang === "vi" ? "Dự án" : "Projects" },
        { icon: Brain, label: lang === "vi" ? "Phân tích AI" : "Insights AI" },
        { icon: BarChart3, label: lang === "vi" ? "Báo cáo" : "Reports" },
        { icon: Sparkles, label: "ClassSpark" },
      ]}
    >
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="text-[14px] font-bold text-white leading-tight">
            {lang === "vi" ? "Tổng quan Học thuật" : "Academics Overview"}
          </div>
          <div className="text-[10px] text-gray-500">
            {lang === "vi" ? "4 chương trình · 12 giáo viên · 146 kỹ năng" : "4 curricula · 12 teachers · 146 skills mapped"}
          </div>
        </div>
        <button className="flex items-center gap-1 px-2 py-1 bg-[#FDB714] text-[#7a4e00] rounded-lg text-[10px] font-semibold shadow-sm">
          <Sparkles className="h-2.5 w-2.5" />
          {lang === "vi" ? "AI Kỹ năng" : "Skills AI"}
        </button>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-1.5 mb-2.5">
        {[
          { label: lang === "vi" ? "Phủ chương trình" : "Curriculum coverage", value: "79%", trend: "+4%", icon: BookOpen, color: "#FDB714" },
          { label: lang === "vi" ? "Đánh giá GV" : "Teacher rating", value: "4.7", trend: "+0.2", icon: Award, color: "#E83B5E" },
          { label: lang === "vi" ? "Kỹ năng thành thạo" : "Skills mastered", value: "83%", trend: "+6%", icon: Target, color: "#00C9A7" },
          { label: lang === "vi" ? "Đúng tiến độ" : "On track", value: "92%", trend: "+2%", icon: CheckCircle2, color: "#3b82f6" },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-2xl bg-gray-900 border border-gray-700/70 p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
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
            <div className="text-[8px] text-gray-500 font-medium truncate">{k.label}</div>
            <div className="text-lg font-black text-white tabular-nums leading-none mt-0.5">
              {k.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2.5">
        {/* LEFT — Curricula (3/5) */}
        <div className="col-span-3">
          <Panel
            title={lang === "vi" ? "Tiến độ Chương trình" : "Curriculum Progress"}
            subtitle={lang === "vi" ? "Lớp 5 · Học kỳ 1" : "Primary 5 · Term 1"}
            right={<MockBadge color="yellow">{lang === "vi" ? "4 đang chạy" : "4 active"}</MockBadge>}
          >
            <div className="space-y-1.5">
              {CURRICULA.map((c) => (
                <div
                  key={c.title}
                  className="rounded-lg bg-gray-800/50/80 border border-gray-800 p-1.5"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div
                        className="h-6 w-6 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${c.color}20` }}
                      >
                        <BookOpen className="h-3 w-3" style={{ color: c.color }} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-semibold text-white truncate">
                          {c.title}
                        </div>
                        <div className="text-[8px] text-gray-500">
                          {c.teachers} {lang === "vi" ? "giáo viên" : "teachers"} · {c.skills} {mt("gradebook.skills", lang).toLowerCase()}
                        </div>
                      </div>
                    </div>
                    <span
                      className="text-[10px] font-bold tabular-nums shrink-0"
                      style={{ color: c.color }}
                    >
                      {c.progress}%
                    </span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${c.progress}%`,
                        background: c.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* RIGHT — Teacher KPIs (2/5) */}
        <div className="col-span-2 space-y-2.5">
          <Panel
            title={lang === "vi" ? "Giáo viên Xuất sắc" : "Top Teachers"}
            subtitle={mt("common.thisMonth", lang)}
            right={
              <div className="h-4 w-4 rounded-full bg-[#FDB714]/10 flex items-center justify-center">
                <Award className="h-2.5 w-2.5 text-[#FDB714]" />
              </div>
            }
          >
            <div className="space-y-1">
              {TEACHER_KPI.map((t) => (
                <div key={t.name} className="flex items-center gap-1.5 py-1">
                  <MockAvatar
                    name={t.name}
                    size={18}
                    gradientFrom={t.avatar[0]}
                    gradientTo={t.avatar[1]}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[9px] font-bold text-white truncate">{t.name}</div>
                    <div className="text-[7px] text-gray-500">{mt(`subjects.${t.subjectKey}`, lang)}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[9px] font-bold text-[#a16207] tabular-nums">★ {t.rating}</div>
                    <div className="text-[7px] text-gray-500">{t.lessons} {lang === "vi" ? "tiết" : "lessons"}</div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title={lang === "vi" ? "Kỹ năng Thành thạo" : "Skills Mastered"} subtitle={lang === "vi" ? "Theo cấp độ" : "By level"}>
            <MiniBarChart
              data={[12, 24, 38, 28, 14]}
              labels={lang === "vi" ? ["Cơ bản", "P.triển", "Thạo", "Xuất sắc", "Chuyên gia"] : ["Foundation", "Developing", "Proficient", "Advanced", "Expert"]}
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
