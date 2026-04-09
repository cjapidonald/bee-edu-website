"use client";

import {
  LayoutDashboard,
  BookOpen,
  Target,
  Map,
  Users,
  Sparkles,
  FolderKanban,
  CheckCircle2,
  Circle,
  Plus,
  GitBranch,
  Award,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockBadge, Panel } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const UNITS_EN = [
  { num: 1, title: "Narrative Writing", skills: 8, status: "done", color: "#00C9A7" },
  { num: 2, title: "Reading Comprehension", skills: 12, status: "done", color: "#00C9A7" },
  { num: 3, title: "Grammar Foundations", skills: 10, status: "done", color: "#00C9A7" },
  { num: 4, title: "Poetry & Imagery", skills: 9, status: "current", color: "#FDB714" },
  { num: 5, title: "Persuasive Writing", skills: 11, status: "upcoming", color: "#9ca3af" },
  { num: 6, title: "Research & Presentation", skills: 14, status: "upcoming", color: "#9ca3af" },
];

const UNITS_VI = [
  { num: 1, title: "Viết Tự sự", skills: 8, status: "done", color: "#00C9A7" },
  { num: 2, title: "Đọc Hiểu", skills: 12, status: "done", color: "#00C9A7" },
  { num: 3, title: "Ngữ pháp Cơ bản", skills: 10, status: "done", color: "#00C9A7" },
  { num: 4, title: "Thơ & Hình ảnh", skills: 9, status: "current", color: "#FDB714" },
  { num: 5, title: "Viết Thuyết phục", skills: 11, status: "upcoming", color: "#9ca3af" },
  { num: 6, title: "Nghiên cứu & Thuyết trình", skills: 14, status: "upcoming", color: "#9ca3af" },
];

const SKILLS_EN = [
  { name: "Identify similes", level: "Proficient", mastery: 82, color: "#FDB714" },
  { name: "Use metaphors in writing", level: "Developing", mastery: 64, color: "#FDB714" },
  { name: "Analyze imagery", level: "Proficient", mastery: 78, color: "#FDB714" },
  { name: "Rhyme and rhythm", level: "Expert", mastery: 92, color: "#FDB714" },
];

const SKILLS_VI = [
  { name: "Nhận diện so sánh", level: "Thành thạo", mastery: 82, color: "#FDB714" },
  { name: "Sử dụng ẩn dụ trong viết", level: "Đang phát triển", mastery: 64, color: "#FDB714" },
  { name: "Phân tích hình ảnh", level: "Thành thạo", mastery: 78, color: "#FDB714" },
  { name: "Vần và nhịp điệu", level: "Xuất sắc", mastery: 92, color: "#FDB714" },
];

export function CurriculumMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  const UNITS = lang === "vi" ? UNITS_VI : UNITS_EN;
  const SKILLS_IN_CURRENT = lang === "vi" ? SKILLS_VI : SKILLS_EN;
  return (
    <DashboardShell
      url="app.elementals.vn/team-leader/curriculum"
      tabTitle={lang === "vi" ? "Thiết kế Chương trình" : "Curriculum Developer"}
      breadcrumb={lang === "vi" ? "Chương trình · Tiếng Anh Lớp 5" : "Curriculum · English Primary 5"}
      userName="Dr Vu"
      userGradient={["#FDB714", "#00C9A7"]}
      dayBadge={lang === "vi" ? "HK1" : "Term 1"}
      dayBadgeColor="yellow"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: mt("common.dashboard", lang) },
        { icon: BookOpen, label: lang === "vi" ? "Chương trình" : "Curricula", active: true },
        { icon: Target, label: lang === "vi" ? "Bản đồ Kỹ năng" : "Skills Map" },
        { icon: Map, label: mt("curriculum.units", lang) },
        { icon: Users, label: lang === "vi" ? "Giáo viên" : "Teachers" },
        { icon: FolderKanban, label: lang === "vi" ? "Tài nguyên" : "Resources" },
        { icon: Sparkles, label: lang === "vi" ? "Tạo bằng AI" : "AI Builder" },
        { icon: Award, label: mt("curriculum.standards", lang) },
      ]}
    >
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="text-[14px] font-bold text-gray-900 leading-tight">
            {lang === "vi" ? "Tiếng Anh Lớp 5 — Bản đồ Chương trình" : "English Primary 5 — Curriculum Map"}
          </div>
          <div className="text-[10px] text-gray-500">
            {lang === "vi" ? "6 chủ đề · 64 kỹ năng · 42 bài · Tiến độ HK1" : "6 units · 64 skills · 42 lessons · Term 1 progress"}
          </div>
        </div>
        <button className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-[#FDB714] to-[#E83B5E] text-white rounded-lg text-[10px] font-semibold shadow-sm">
          <Sparkles className="h-2.5 w-2.5" />
          AI Build Unit
        </button>
      </div>

      <div className="grid grid-cols-5 gap-2.5">
        {/* LEFT — Unit tree (3/5) */}
        <div className="col-span-3">
          <Panel
            title={lang === "vi" ? "Tiến trình Chủ đề" : "Unit Progression"}
            subtitle={lang === "vi" ? "Nhấp vào chủ đề để xem chi tiết" : "Click a unit to drill down"}
            right={<MockBadge color="yellow">{lang === "vi" ? "Chủ đề 4 đang học" : "Unit 4 active"}</MockBadge>}
          >
            <div className="relative">
              {/* Vertical line connecting units */}
              <div className="absolute left-[18px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#00C9A7] via-[#FDB714] to-gray-300" />

              <div className="space-y-1.5 relative">
                {UNITS.map((u) => (
                  <div key={u.num} className="flex items-start gap-2">
                    {/* Status dot */}
                    <div className="relative z-10 shrink-0">
                      <div
                        className={`h-9 w-9 rounded-full flex items-center justify-center border-4 border-white ${
                          u.status === "done"
                            ? "bg-emerald-500"
                            : u.status === "current"
                              ? "bg-[#FDB714]"
                              : "bg-gray-300"
                        }`}
                      >
                        {u.status === "done" ? (
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        ) : u.status === "current" ? (
                          <span className="text-[10px] font-black text-[#7a4e00]">{u.num}</span>
                        ) : (
                          <Circle className="h-3 w-3 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Unit card */}
                    <div
                      className={`flex-1 min-w-0 rounded-lg p-2 border ${
                        u.status === "current"
                          ? "bg-[#FDB714]/5 border-[#FDB714]/30 shadow-sm"
                          : u.status === "done"
                            ? "bg-emerald-50/50 border-emerald-100"
                            : "bg-white border-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1">
                            <span
                              className={`text-[8px] font-bold uppercase tracking-wider ${
                                u.status === "current"
                                  ? "text-[#a16207]"
                                  : u.status === "done"
                                    ? "text-emerald-700"
                                    : "text-gray-400"
                              }`}
                            >
                              {mt("curriculum.unit", lang)} {u.num}
                            </span>
                            {u.status === "current" && (
                              <span className="text-[7px] font-bold text-white px-1 py-0.5 bg-[#FDB714] rounded">
                                {lang === "vi" ? "HIỆN TẠI" : "ACTIVE"}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] font-bold text-gray-900 truncate">
                            {u.title}
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          <div className="text-[9px] font-bold text-gray-700 tabular-nums">
                            {u.skills}
                          </div>
                          <div className="text-[7px] text-gray-500">{mt("gradebook.skills", lang).toLowerCase()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add unit */}
                <div className="flex items-center gap-2 pl-9">
                  <button className="flex items-center gap-1 text-[9px] text-[#E83B5E] font-semibold">
                    <Plus className="h-2.5 w-2.5" />
                    {mt("curriculum.addUnit", lang)}
                  </button>
                </div>
              </div>
            </div>
          </Panel>
        </div>

        {/* RIGHT — Current skills (2/5) */}
        <div className="col-span-2 space-y-2.5">
          <Panel
            title={lang === "vi" ? "Kỹ năng Chủ đề 4" : "Unit 4 Skills"}
            subtitle={lang === "vi" ? "Mức thành thạo lớp" : "Class mastery levels"}
            right={
              <div className="h-4 w-4 rounded-full bg-[#FDB714]/10 flex items-center justify-center">
                <Target className="h-2.5 w-2.5 text-[#FDB714]" />
              </div>
            }
          >
            <div className="space-y-1.5">
              {SKILLS_IN_CURRENT.map((s) => (
                <div key={s.name}>
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1 min-w-0">
                      <GitBranch className="h-2.5 w-2.5 text-[#FDB714] shrink-0" />
                      <span className="text-[9px] font-semibold text-gray-900 truncate">
                        {s.name}
                      </span>
                    </div>
                    <span className="text-[8px] font-bold text-[#a16207] tabular-nums shrink-0">
                      {s.mastery}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${s.mastery}%`,
                          background: `linear-gradient(90deg, #FDB714, #E83B5E)`,
                        }}
                      />
                    </div>
                    <span className="text-[7px] text-gray-500 shrink-0 w-14 text-right">
                      {s.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <div className="rounded-2xl bg-gradient-to-br from-[#00C9A7]/10 to-[#3b82f6]/5 border border-[#00C9A7]/20 p-2.5">
            <div className="flex items-center gap-1 mb-1">
              <Award className="h-3 w-3 text-[#00C9A7]" />
              <span className="text-[9px] font-bold text-[#00C9A7] uppercase tracking-wide">
                {mt("curriculum.standards", lang)}
              </span>
            </div>
            <div className="text-[9px] text-gray-800 font-semibold mb-0.5">
              {lang === "vi" ? "Đồng bộ CEFR A2 + Bộ GD&ĐT" : "Aligned with CEFR A2 + local MoET"}
            </div>
            <div className="text-[8px] text-gray-600">
              {lang === "vi" ? "42/48 chuẩn · Độ phủ 88%" : "42 of 48 curriculum standards met · 88% coverage"}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
