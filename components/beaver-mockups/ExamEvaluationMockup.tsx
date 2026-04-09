"use client";

import {
  LayoutDashboard,
  ClipboardCheck,
  FileText,
  Users,
  BarChart3,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Download,
  Sparkles,
  Filter,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockAvatar, MockBadge, Panel, MiniBarChart } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const STUDENTS = [
  { name: "Alex Chen", avatar: ["#FDB714", "#FF6B9D"] as const, q1: 8, q2: 7, q3: 9, q4: 8, total: 32, status: "graded" },
  { name: "Maya Patel", avatar: ["#00C9A7", "#3b82f6"] as const, q1: 9, q2: 10, q3: 9, q4: 9, total: 37, status: "graded" },
  { name: "Jordan Lee", avatar: ["#E83B5E", "#FF6B9D"] as const, q1: 6, q2: 7, q3: 5, q4: 7, total: 25, status: "flagged" },
  { name: "Priya Sharma", avatar: ["#8b5cf6", "#E83B5E"] as const, q1: 8, q2: 8, q3: 7, q4: 9, total: 32, status: "graded" },
  { name: "Ethan Kim", avatar: ["#3b82f6", "#00C9A7"] as const, q1: 5, q2: 6, q3: 7, q4: 4, total: 22, status: "ai-drafted" },
  { name: "Sam Rodriguez", avatar: ["#FDB714", "#00C9A7"] as const, q1: 7, q2: 8, q3: 8, q4: 7, total: 30, status: "graded" },
];

function cellColor(score: number) {
  if (score >= 9) return "bg-emerald-950/50 text-emerald-700";
  if (score >= 7) return "bg-[#FDB714]/10 text-[#FDB714]";
  if (score >= 5) return "bg-amber-950/50 text-amber-700";
  return "bg-rose-950/50 text-rose-700";
}

export function ExamEvaluationMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  return (
    <DashboardShell
      url="www.kiwibee.com/teacher/exams/evaluate"
      tabTitle={lang === "vi" ? "Chấm thi — Chủ đề 4" : "Exam Marking — Unit 4"}
      breadcrumb={lang === "vi" ? "Chấm thi · Bài kiểm tra Thơ Chủ đề 4" : "Exam Marking · Unit 4 Poetry Test"}
      userName="Ms Tran"
      userGradient={["#FDB714", "#E83B5E"]}
      dayBadge={mt("common.monday", lang)}
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: mt("common.dashboard", lang) },
        { icon: ClipboardCheck, label: mt("exams.title", lang), active: true },
        { icon: FileText, label: lang === "vi" ? "Bài thi" : "Papers" },
        { icon: Users, label: mt("common.students", lang) },
        { icon: Brain, label: mt("exams.aiMarking", lang) },
        { icon: BarChart3, label: mt("common.analytics", lang) },
        { icon: Sparkles, label: lang === "vi" ? "Rubric" : "Rubrics" },
      ]}
    >
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="text-[14px] font-bold text-white leading-tight">
            {lang === "vi" ? "Chủ đề 4 · Bài kiểm tra Thơ" : "Unit 4 · Poetry Assessment"}
          </div>
          <div className="text-[10px] text-gray-500">
            {lang === "vi" ? "Lớp 5A · 6 học sinh · 4 câu hỏi · 40 điểm" : "Primary 5A · 6 students · 4 questions · 40 marks total"}
          </div>
        </div>
        <div className="flex gap-1">
          <button className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-[#8b5cf6] to-[#E83B5E] text-white rounded-lg text-[9px] font-semibold shadow-sm">
            <Sparkles className="h-2.5 w-2.5" />
            {lang === "vi" ? "AI Chấm tất cả" : "AI Mark All"}
          </button>
          <button className="flex items-center gap-1 px-2 py-1 bg-gray-900 border border-gray-700 text-gray-300 rounded-lg text-[9px] font-semibold">
            <Download className="h-2.5 w-2.5" />
            {mt("common.export", lang)}
          </button>
        </div>
      </div>

      {/* Progress summary */}
      <div className="grid grid-cols-4 gap-1.5 mb-2.5">
        {[
          { label: mt("common.graded", lang), value: "4/6", color: "text-emerald-600", bg: "bg-emerald-100", icon: CheckCircle2 },
          { label: lang === "vi" ? "AI đã nháp" : "AI-drafted", value: "1", color: "text-violet-600", bg: "bg-violet-100", icon: Sparkles },
          { label: lang === "vi" ? "Đã gắn cờ" : "Flagged", value: "1", color: "text-rose-600", bg: "bg-rose-100", icon: AlertTriangle },
          { label: lang === "vi" ? "Điểm TB" : "Avg score", value: "29.7", color: "text-[#FDB714]", bg: "bg-[#FDB714]/20", icon: BarChart3 },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl bg-gray-900 border border-gray-700/70 p-2 flex items-center gap-2"
          >
            <div className={`h-6 w-6 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>
              <s.icon className={`h-3 w-3 ${s.color}`} />
            </div>
            <div className="min-w-0">
              <div className="text-[8px] text-gray-500 font-medium truncate">{s.label}</div>
              <div className={`text-sm font-black tabular-nums leading-none ${s.color}`}>
                {s.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2.5">
        {/* Main evaluation table (3/5) */}
        <div className="col-span-3">
          <Panel
            title={lang === "vi" ? "Bài làm Học sinh" : "Student Responses"}
            subtitle={lang === "vi" ? "Nhấp vào điểm để sửa" : "Click a score to edit"}
            right={<MockBadge color="yellow">{lang === "vi" ? "40 đ" : "40 pts"}</MockBadge>}
          >
            <div className="overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[1.4fr_repeat(4,1fr)_0.9fr_0.7fr] gap-1 pb-1.5 border-b border-gray-800">
                <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider">
                  {mt("common.student", lang)}
                </div>
                <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider text-center">C1</div>
                <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider text-center">C2</div>
                <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider text-center">C3</div>
                <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider text-center">C4</div>
                <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider text-center">{lang === "vi" ? "Tổng" : "Total"}</div>
                <div />
              </div>

              {/* Rows */}
              <div className="divide-y divide-gray-100">
                {STUDENTS.map((s) => {
                  return (
                    <div
                      key={s.name}
                      className="grid grid-cols-[1.4fr_repeat(4,1fr)_0.9fr_0.7fr] gap-1 items-center py-1.5"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <MockAvatar
                          name={s.name}
                          size={18}
                          gradientFrom={s.avatar[0]}
                          gradientTo={s.avatar[1]}
                        />
                        <span className="text-[9px] font-semibold text-white truncate">
                          {s.name}
                        </span>
                      </div>
                      {[s.q1, s.q2, s.q3, s.q4].map((score, i) => (
                        <div key={i} className="flex items-center justify-center">
                          <div className={`h-5 px-1 min-w-[22px] rounded ${cellColor(score)} flex items-center justify-center`}>
                            <span className="text-[9px] font-black tabular-nums">{score}</span>
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center justify-center">
                        <div
                          className={`h-5 px-1 min-w-[28px] rounded-md font-black tabular-nums flex items-center justify-center text-[9px] ${
                            s.total >= 32
                              ? "bg-emerald-950/500 text-white"
                              : s.total >= 26
                                ? "bg-[#FDB714] text-[#7a4e00]"
                                : "bg-rose-950/500 text-white"
                          }`}
                        >
                          {s.total}
                        </div>
                      </div>
                      <div className="flex justify-end shrink-0">
                        {s.status === "graded" && (
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        )}
                        {s.status === "flagged" && (
                          <AlertTriangle className="h-3 w-3 text-rose-500" />
                        )}
                        {s.status === "ai-drafted" && (
                          <Sparkles className="h-3 w-3 text-violet-500" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Panel>
        </div>

        {/* Distribution + AI tip (2/5) */}
        <div className="col-span-2 space-y-2.5">
          <Panel title={lang === "vi" ? "Phân bố Điểm" : "Score Distribution"} subtitle={lang === "vi" ? "Trên 40" : "Out of 40"}>
            <MiniBarChart
              data={[0, 1, 2, 3, 0]}
              labels={["<20", "20-25", "25-30", "30-35", "35+"]}
              color="#FDB714"
              width={260}
              height={90}
            />
          </Panel>

          <div className="rounded-2xl bg-gradient-to-br from-[#8b5cf6]/10 to-[#E83B5E]/5 border border-[#8b5cf6]/20 p-2.5">
            <div className="flex items-center gap-1 mb-1">
              <Sparkles className="h-3 w-3 text-[#8b5cf6]" />
              <span className="text-[9px] font-bold text-[#8b5cf6] uppercase tracking-wide">
                {lang === "vi" ? "Phân tích AI" : "AI Insight"}
              </span>
            </div>
            <div className="text-[9px] text-gray-100 font-semibold leading-tight mb-0.5">
              {lang === "vi" ? "Câu 3 là điểm yếu phổ biến" : "Q3 is a common weak point"}
            </div>
            <div className="text-[8px] text-gray-400 leading-snug">
              {lang === "vi" ? "3 học sinh dưới 70% ở phần nhận diện ẩn dụ. Nên dạy lại 10 phút trước Chủ đề 5." : "3 students scored below 70% on metaphor identification. Suggest a 10-min reteach before Unit 5."}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
