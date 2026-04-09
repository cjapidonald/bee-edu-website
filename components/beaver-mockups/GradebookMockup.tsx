"use client";

import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  BarChart3,
  FileText,
  Download,
  Filter,
  Target,
  ArrowUpDown,
  TrendingUp,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockAvatar, MockBadge, Panel } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

type Score = number | null;

interface StudentRow {
  name: string;
  avatar: readonly [string, string];
  scores: Score[]; // English, Math, Science, Vietnamese, Art
  avg: number;
}

const SUBJECT_KEYS = ["english", "math", "science", "vietnamese", "art"] as const;

const STUDENTS: StudentRow[] = [
  { name: "Alex Chen", avatar: ["#FDB714", "#FF6B9D"], scores: [87, 92, 78, 84, 88], avg: 85.8 },
  { name: "Maya Patel", avatar: ["#00C9A7", "#3b82f6"], scores: [94, 89, 92, 88, 95], avg: 91.6 },
  { name: "Jordan Lee", avatar: ["#E83B5E", "#FF6B9D"], scores: [72, 78, 68, 75, 80], avg: 74.6 },
  { name: "Priya Sharma", avatar: ["#8b5cf6", "#E83B5E"], scores: [85, 91, 82, 87, 84], avg: 85.8 },
  { name: "Ethan Kim", avatar: ["#3b82f6", "#00C9A7"], scores: [68, 72, 65, 70, null], avg: 68.8 },
  { name: "Sam Rodriguez", avatar: ["#FDB714", "#00C9A7"], scores: [81, 85, 78, 82, 86], avg: 82.4 },
];

function gradeColors(score: Score): { bg: string; text: string; border: string } {
  if (score === null) return { bg: "bg-gray-50/50", text: "text-gray-500", border: "border-gray-200" };
  if (score >= 90) return { bg: "bg-emerald-950/50", text: "text-emerald-700", border: "border-emerald-200" };
  if (score >= 80) return { bg: "bg-[#FDB714]/10", text: "text-[#FDB714]", border: "border-[#FDB714]/30" };
  if (score >= 70) return { bg: "bg-amber-950/50", text: "text-amber-700", border: "border-amber-200" };
  return { bg: "bg-rose-950/50", text: "text-rose-700", border: "border-rose-200" };
}

export function GradebookMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  const SUBJECTS = SUBJECT_KEYS.map((k) => mt(`subjects.${k}`, lang));
  return (
    <DashboardShell
      url="www.kiwibee.com/teacher/grades"
      tabTitle={lang === "vi" ? "Sổ điểm — Lớp 5A" : "Gradebook — Primary 5A"}
      breadcrumb={lang === "vi" ? "Sổ điểm · Lớp 5A · Học kỳ 1" : "Gradebook · Primary 5A · Term 1"}
      userName="Ms Nguyen"
      userGradient={["#FDB714", "#E83B5E"]}
      dayBadge={lang === "vi" ? "HK1" : "T1"}
      dayBadgeColor="yellow"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: mt("common.dashboard", lang) },
        { icon: GraduationCap, label: mt("common.gradebook", lang), active: true },
        { icon: Target, label: mt("gradebook.skills", lang) },
        { icon: Users, label: mt("common.students", lang) },
        { icon: BookOpen, label: mt("gradebook.assessments", lang) },
        { icon: FileText, label: lang === "vi" ? "Báo cáo" : "Reports" },
        { icon: BarChart3, label: lang === "vi" ? "Phân tích" : "Insights" },
      ]}
    >
      {/* Header */}
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="text-[14px] font-bold text-gray-900 leading-tight">
            {lang === "vi" ? "Sổ điểm Dựa trên Kỹ năng" : "Skills-Based Gradebook"}
          </div>
          <div className="text-[10px] text-gray-500">
            {lang === "vi" ? "Lớp 5A · 5 môn · 146 kỹ năng · 6 học sinh" : "Primary 5A · 5 subjects · 146 skills · 6 students"}
          </div>
        </div>
        <div className="flex gap-1">
          <button className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 text-gray-600 rounded-lg text-[9px] font-semibold">
            <Filter className="h-2.5 w-2.5" />
            {mt("common.filter", lang)}
          </button>
          <button className="flex items-center gap-1 px-2 py-1 bg-[#FDB714] text-[#7a4e00] rounded-lg text-[9px] font-semibold shadow-sm">
            <Download className="h-2.5 w-2.5" />
            {mt("common.export", lang)}
          </button>
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-5 gap-1.5 mb-2.5">
        {SUBJECTS.map((s, i) => {
          const colors = ["#FDB714", "#3b82f6", "#00C9A7", "#E83B5E", "#8b5cf6"];
          const avgs = [81.2, 84.5, 77.2, 81.0, 86.6];
          return (
            <div
              key={s}
              className="rounded-xl bg-white border border-gray-200 p-2"
            >
              <div className="flex items-center gap-1 mb-0.5">
                <div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: colors[i] }}
                />
                <span className="text-[8px] font-semibold text-gray-600 truncate">{s}</span>
              </div>
              <div className="text-base font-black text-gray-900 tabular-nums leading-none">
                {avgs[i]}
              </div>
              <div className="text-[7px] text-emerald-600 font-bold">+2.3</div>
            </div>
          );
        })}
      </div>

      {/* Matrix */}
      <Panel
        title={lang === "vi" ? "Học sinh × Môn" : "Students × Subjects"}
        subtitle={lang === "vi" ? "Nhấp vào ô để xem chi tiết" : "Click a cell for details"}
        right={<MockBadge color="emerald">{lang === "vi" ? "82.4 TB lớp" : "82.4 class avg"}</MockBadge>}
      >
        <div className="overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-[1.3fr_repeat(5,1fr)_0.8fr] gap-1 pb-1.5 border-b border-gray-100">
            <div className="text-[8px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-0.5">
              {mt("common.student", lang)} <ArrowUpDown className="h-2 w-2" />
            </div>
            {SUBJECTS.map((s) => (
              <div
                key={s}
                className="text-[8px] font-semibold text-gray-500 uppercase tracking-wider text-center"
              >
                {s.slice(0, 4)}
              </div>
            ))}
            <div className="text-[8px] font-semibold text-gray-500 uppercase tracking-wider text-center flex items-center justify-center gap-0.5">
              {lang === "vi" ? "TB" : "Avg"}
              <TrendingUp className="h-2 w-2" />
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-100">
            {STUDENTS.map((s) => (
              <div
                key={s.name}
                className="grid grid-cols-[1.3fr_repeat(5,1fr)_0.8fr] gap-1 items-center py-1.5"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <MockAvatar
                    name={s.name}
                    size={18}
                    gradientFrom={s.avatar[0]}
                    gradientTo={s.avatar[1]}
                  />
                  <span className="text-[9px] font-semibold text-gray-900 truncate">
                    {s.name}
                  </span>
                </div>
                {s.scores.map((score, i) => {
                  const c = gradeColors(score);
                  return (
                    <div key={i} className="flex items-center justify-center">
                      <div
                        className={`h-6 px-1 min-w-[32px] rounded-lg border ${c.bg} ${c.border} flex items-center justify-center`}
                      >
                        <span className={`text-[9px] font-black tabular-nums ${c.text}`}>
                          {score !== null ? score : "—"}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div className="flex items-center justify-center">
                  <div
                    className={`h-6 px-1 min-w-[32px] rounded-lg flex items-center justify-center font-black text-[9px] tabular-nums ${
                      s.avg >= 85
                        ? "bg-emerald-950/500 text-gray-900"
                        : s.avg >= 75
                          ? "bg-[#FDB714] text-[#7a4e00]"
                          : "bg-rose-950/500 text-gray-900"
                    }`}
                  >
                    {s.avg.toFixed(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </DashboardShell>
  );
}
