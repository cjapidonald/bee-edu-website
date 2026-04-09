"use client";

import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Brain,
  Wand2,
  BookOpen,
  ClipboardCheck,
  MessageSquare,
  Send,
  Paperclip,
  Plus,
  Check,
  Image as ImageIcon,
  Mic,
  GraduationCap,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockBadge, Panel } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

/**
 * HomeworkBuilderMockup — 3-panel Resources Factory layout
 * (chat history left, AI conversation center, homework preview right)
 *
 * Mirrors KiwiBee's homework-builder and Resources Factory pattern.
 */

const CHAT_HISTORY_EN = [
  { title: "Unit 4 poetry homework", active: true, time: "now" },
  { title: "Fractions practice Grade 5", time: "1h ago" },
  { title: "Reading comprehension set", time: "yesterday" },
  { title: "Science observation worksheet", time: "2d ago" },
];

const CHAT_HISTORY_VI = [
  { title: "Bài tập Thơ Chủ đề 4", active: true, time: "bây giờ" },
  { title: "Luyện phân số Lớp 5", time: "1 giờ trước" },
  { title: "Bộ đọc hiểu", time: "hôm qua" },
  { title: "Phiếu quan sát Khoa học", time: "2 ngày trước" },
];

const TEMPLATES_EN = [
  { icon: BookOpen, label: "Worksheet" },
  { icon: ClipboardCheck, label: "Quiz" },
  { icon: FileText, label: "Reading log" },
  { icon: Mic, label: "Speaking task" },
];

const TEMPLATES_VI = [
  { icon: BookOpen, label: "Phiếu bài tập" },
  { icon: ClipboardCheck, label: "Bài kiểm tra" },
  { icon: FileText, label: "Nhật ký đọc" },
  { icon: Mic, label: "Bài nói" },
];

export function HomeworkBuilderMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  const CHAT_HISTORY = lang === "vi" ? CHAT_HISTORY_VI : CHAT_HISTORY_EN;
  const TEMPLATES = lang === "vi" ? TEMPLATES_VI : TEMPLATES_EN;
  return (
    <DashboardShell
      url="www.kiwibee.com/teacher/homework-builder"
      tabTitle={lang === "vi" ? "Trình tạo Bài tập — Xưởng Tài nguyên" : "Homework Builder — Resources Factory"}
      breadcrumb={lang === "vi" ? "Trình tạo Bài tập · Lớp 5A" : "Homework Builder · Primary 5A"}
      userName="Ms Tran"
      userGradient={["#FDB714", "#E83B5E"]}
      dayBadge="AI"
      dayBadgeColor="violet"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: mt("common.dashboard", lang) },
        { icon: FileText, label: mt("common.homework", lang), active: true },
        { icon: ClipboardCheck, label: mt("common.assignments", lang) },
        { icon: Brain, label: lang === "vi" ? "Công cụ AI" : "AI Tools" },
        { icon: BookOpen, label: mt("common.library", lang) },
        { icon: GraduationCap, label: lang === "vi" ? "Chương trình" : "Curriculum" },
        { icon: MessageSquare, label: mt("common.messages", lang) },
      ]}
    >
      {/* 3-panel layout: chats (1) + chat area (2) + preview (2) */}
      <div className="grid grid-cols-5 gap-2.5" style={{ height: 380 }}>
        {/* LEFT — Chat history */}
        <div className="col-span-1">
          <Panel title={lang === "vi" ? "Cuộc trò chuyện" : "Conversations"} subtitle={lang === "vi" ? "Bản nháp gần đây" : "Recent drafts"} className="h-full flex flex-col">
            <div className="space-y-1 mb-2">
              {CHAT_HISTORY.map((c) => (
                <div
                  key={c.title}
                  className={`flex items-start gap-1.5 p-1.5 rounded-md cursor-pointer ${
                    c.active
                      ? "bg-[#E83B5E]/10 border-l-2 border-[#E83B5E]"
                      : "hover:bg-gray-800/50"
                  }`}
                >
                  <MessageSquare
                    className={`h-2.5 w-2.5 shrink-0 mt-0.5 ${
                      c.active ? "text-[#E83B5E]" : "text-gray-400"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[9px] font-semibold text-white truncate leading-tight">
                      {c.title}
                    </div>
                    <div className="text-[7px] text-gray-500">{c.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 mt-1 border-t border-gray-800">
              <div className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                {lang === "vi" ? "Mẫu" : "Templates"}
              </div>
              <div className="space-y-0.5">
                {TEMPLATES.map((t) => (
                  <div
                    key={t.label}
                    className="flex items-center gap-1 p-1 rounded hover:bg-gray-800/50 cursor-pointer"
                  >
                    <t.icon className="h-2.5 w-2.5 text-[#FDB714] shrink-0" />
                    <span className="text-[8px] text-gray-300">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </div>

        {/* CENTER — AI conversation */}
        <div className="col-span-2">
          <div className="rounded-2xl bg-gray-900 border border-gray-700/70 shadow-lg shadow-black/20 overflow-hidden flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-800 bg-gradient-to-r from-[#8b5cf6]/5 to-[#E83B5E]/5">
              <div className="flex items-center gap-1.5">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#E83B5E] flex items-center justify-center">
                  <Sparkles className="h-2.5 w-2.5 text-white" />
                </div>
                <div className="text-[9px] font-bold text-white">{lang === "vi" ? "Trình tạo AI" : "AI Builder"}</div>
              </div>
              <MockBadge color="emerald">{lang === "vi" ? "Có căn cứ" : "Grounded"}</MockBadge>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-hidden p-3 space-y-2 bg-gradient-to-b from-gray-900 to-gray-950">
              <div className="flex justify-end">
                <div className="max-w-[85%] px-2.5 py-1.5 bg-[#E83B5E] text-white rounded-xl rounded-tr-sm">
                  <div className="text-[9px]">
                    {lang === "vi" ? "10 câu hỏi về ngôn ngữ hình tượng, 3 mức độ khó, phù hợp Chủ đề 4." : "10 questions on figurative language, 3 difficulty levels, aligned to Unit 4."}
                  </div>
                </div>
              </div>
              <div className="flex gap-1.5">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#E83B5E] flex items-center justify-center shrink-0">
                  <Sparkles className="h-2 w-2 text-white" />
                </div>
                <div className="max-w-[85%] px-2.5 py-1.5 bg-gray-800 rounded-xl rounded-tl-sm">
                  <div className="text-[9px] text-white font-semibold mb-1">
                    {lang === "vi" ? "Chủ đề 4: Ngôn ngữ Hình tượng" : "Unit 4: Figurative Language"}
                  </div>
                  <div className="text-[8px] text-gray-300 space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Check className="h-2 w-2 text-emerald-600" />
                      {lang === "vi" ? "Đã tạo 10 câu hỏi" : "10 questions generated"}
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="h-2 w-2 text-emerald-600" />
                      {lang === "vi" ? "3 cấp (Cơ bản · Đang phát triển · Nâng cao)" : "3 levels (Foundation · Developing · Advanced)"}
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="h-2 w-2 text-emerald-600" />
                      {lang === "vi" ? "Đáp án kèm Rubric" : "Answer key with rubric"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[85%] px-2.5 py-1.5 bg-[#E83B5E] text-white rounded-xl rounded-tr-sm">
                  <div className="text-[9px]">{lang === "vi" ? "Thêm phần nghe cho Cấp 3." : "Add an audio reading task for Level 3."}</div>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-gray-800 p-2">
              <div className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-800/50 rounded-lg">
                <Paperclip className="h-3 w-3 text-gray-400 shrink-0" />
                <ImageIcon className="h-3 w-3 text-gray-400 shrink-0" />
                <span className="text-[9px] text-gray-400 flex-1">{lang === "vi" ? "Tinh chỉnh bài tập…" : "Refine the assignment…"}</span>
                <button className="h-5 w-5 rounded-md bg-[#E83B5E] flex items-center justify-center shrink-0">
                  <Send className="h-2.5 w-2.5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Preview */}
        <div className="col-span-2">
          <div className="rounded-2xl bg-gray-900 border border-gray-700/70 shadow-lg shadow-black/20 overflow-hidden h-full flex flex-col">
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-800">
              <div className="text-[9px] font-bold text-white">{lang === "vi" ? "Xem trước Trực tiếp" : "Live Preview"}</div>
              <div className="flex gap-1">
                <MockBadge color="yellow">{lang === "vi" ? "Cấp 2" : "Level 2"}</MockBadge>
                <button className="px-2 py-0.5 bg-[#FDB714] text-[#7a4e00] text-[8px] font-bold rounded">
                  {lang === "vi" ? "Xuất bản" : "Publish"}
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden p-3 bg-gradient-to-b from-gray-950 to-gray-950">
              <div className="bg-gray-900 rounded-lg border border-gray-700 shadow-sm p-3">
                <div className="text-[10px] font-bold text-white mb-1">
                  {lang === "vi" ? "Bài tập Chủ đề 4: Ngôn ngữ Hình tượng" : "Unit 4 Homework: Figurative Language"}
                </div>
                <div className="text-[7px] text-gray-500 mb-2 pb-2 border-b border-gray-800">
                  {lang === "vi" ? "Lớp 5A · Tiếng Anh · Cô Trần · Hạn: Thứ Sáu" : "Primary 5A · English · Ms. Tran · Due: Friday"}
                </div>

                <div className="space-y-1.5">
                  <div>
                    <div className="text-[8px] font-bold text-gray-300 mb-0.5">
                      {lang === "vi" ? "1. Nhận diện ẩn dụ" : "1. Identify the metaphor"}
                    </div>
                    <div className="text-[7px] text-gray-400 mb-1">
                      {lang === "vi" ? "\"Thế giới là một sân khấu.\" Điều gì đang được so sánh?" : "\u201CThe world is a stage.\u201D What is being compared?"}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {(lang === "vi" ? [
                        { label: "A. Một nhà hát thực sự", correct: false },
                        { label: "B. Cuộc sống và diễn xuất", correct: true },
                        { label: "C. Sân thể thao", correct: false },
                      ] : [
                        { label: "A. A physical theater", correct: false },
                        { label: "B. Life and acting", correct: true },
                        { label: "C. A sports field", correct: false },
                      ]).map((opt, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1 text-[7px] text-gray-300"
                        >
                          <div
                            className={`h-2 w-2 rounded-full border ${
                              opt.correct ? "border-emerald-500 bg-emerald-950/500" : "border-gray-300"
                            }`}
                          />
                          {opt.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-gray-800">
                    <div className="text-[8px] font-bold text-gray-300 mb-0.5">
                      {lang === "vi" ? "2. Viết một câu so sánh về trường" : "2. Write a simile about school"}
                    </div>
                    <div className="h-5 bg-gray-800/50 rounded border border-dashed border-gray-700" />
                  </div>

                  <div className="pt-1.5 border-t border-gray-800">
                    <div className="flex items-center gap-1 text-[8px] font-bold text-gray-300 mb-0.5">
                      <Mic className="h-2 w-2 text-[#E83B5E]" /> {lang === "vi" ? "3. Ghi âm bài đọc thơ của em" : "3. Record your poem reading"}
                    </div>
                    <div className="flex items-center gap-1 p-1 bg-[#E83B5E]/5 rounded border border-[#E83B5E]/20">
                      <div className="h-3 w-3 rounded-full bg-[#E83B5E] flex items-center justify-center">
                        <Mic className="h-1.5 w-1.5 text-white" />
                      </div>
                      <div className="h-1 flex-1 bg-[#E83B5E]/20 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-[#E83B5E] rounded-full" />
                      </div>
                      <span className="text-[7px] text-[#E83B5E] font-bold">0:12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
