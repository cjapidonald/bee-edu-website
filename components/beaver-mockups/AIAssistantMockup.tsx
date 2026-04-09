"use client";

import {
  LayoutDashboard,
  Brain,
  MessageSquare,
  Sparkles,
  Wand2,
  FileText,
  BookOpen,
  ClipboardCheck,
  BarChart3,
  Settings,
  Send,
  Paperclip,
  Copy,
  ThumbsUp,
  Plus,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockBadge, Panel } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const TOOLS_EN = [
  { icon: Wand2, label: "Lesson Plan", color: "#FDB714" },
  { icon: FileText, label: "Homework", color: "#E83B5E" },
  { icon: ClipboardCheck, label: "Exam Marking", color: "#3b82f6" },
  { icon: BookOpen, label: "Rubric Gen", color: "#00C9A7" },
  { icon: BarChart3, label: "Reports", color: "#8b5cf6" },
  { icon: Brain, label: "Insights", color: "#FF6B9D" },
];

const TOOLS_VI = [
  { icon: Wand2, label: "Giáo án", color: "#FDB714" },
  { icon: FileText, label: "Bài tập", color: "#E83B5E" },
  { icon: ClipboardCheck, label: "Chấm thi", color: "#3b82f6" },
  { icon: BookOpen, label: "Tạo Rubric", color: "#00C9A7" },
  { icon: BarChart3, label: "Báo cáo", color: "#8b5cf6" },
  { icon: Brain, label: "Phân tích", color: "#FF6B9D" },
];

const CONVERSATIONS_EN = [
  { title: "Unit 4 poetry lesson plan", time: "2m ago", active: true },
  { title: "Grade 5 English rubric", time: "1h ago" },
  { title: "Parent feedback draft", time: "yesterday" },
  { title: "Quiz generator — fractions", time: "2d ago" },
];

const CONVERSATIONS_VI = [
  { title: "Giáo án Chủ đề 4: Thơ ca", time: "2 phút trước", active: true },
  { title: "Rubric Tiếng Anh lớp 5", time: "1 giờ trước" },
  { title: "Nháp nhận xét phụ huynh", time: "hôm qua" },
  { title: "Tạo bài kiểm tra — phân số", time: "2 ngày trước" },
];

export function AIAssistantMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  const TOOLS = lang === "vi" ? TOOLS_VI : TOOLS_EN;
  const CONVERSATIONS = lang === "vi" ? CONVERSATIONS_VI : CONVERSATIONS_EN;
  return (
    <DashboardShell
      url="app.elementals.vn/teacher/ai"
      tabTitle={mt("aiAssistant.title", lang)}
      breadcrumb={`${mt("aiAssistant.title", lang)} · ${lang === "vi" ? "Công cụ Giảng dạy" : "Teaching Tools"}`}
      userName="Ms Tran"
      userGradient={["#E83B5E", "#8b5cf6"]}
      dayBadge="AI"
      dayBadgeColor="violet"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: mt("common.dashboard", lang) },
        { icon: Brain, label: mt("aiAssistant.title", lang), active: true },
        { icon: Wand2, label: lang === "vi" ? "Soạn giáo án" : "Lesson Planner" },
        { icon: ClipboardCheck, label: lang === "vi" ? "Chấm bài" : "Marker" },
        { icon: FileText, label: lang === "vi" ? "AI Báo cáo" : "Reports AI" },
        { icon: BarChart3, label: lang === "vi" ? "Phân tích" : "Insights" },
        { icon: MessageSquare, label: lang === "vi" ? "Lịch sử" : "History" },
      ]}
    >
      <div className="grid grid-cols-5 gap-2.5">
        {/* LEFT — Chat (3/5) */}
        <div className="col-span-3">
          <div className="rounded-2xl bg-white border border-gray-200/70 shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col" style={{ height: 360 }}>
            {/* Chat header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gradient-to-r from-[#8b5cf6]/5 to-[#E83B5E]/5">
              <div className="flex items-center gap-1.5">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#E83B5E] flex items-center justify-center">
                  <Sparkles className="h-2.5 w-2.5 text-white" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-900 leading-tight">Beaver AI</div>
                  <div className="text-[8px] text-gray-500">{lang === "vi" ? `${mt("aiAssistant.balancedMode", lang)} · Tiếng Anh lớp 5` : "Balanced · English Grade 5"}</div>
                </div>
              </div>
              <MockBadge color="emerald">{mt("chat.online", lang)}</MockBadge>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-hidden p-3 space-y-2 bg-gradient-to-b from-white to-[#fafafa]">
              {/* User message */}
              <div className="flex justify-end">
                <div className="max-w-[75%] px-2.5 py-1.5 bg-[#E83B5E] text-white rounded-xl rounded-tr-sm">
                  <div className="text-[9px]">
                    {lang === "vi"
                      ? "Hãy tạo giáo án 45 phút cho Chủ đề 4 — Thơ ca, tập trung vào hình ảnh và ẩn dụ."
                      : "Create a 45-min lesson plan for Unit 4 poetry — focus on imagery and metaphor."}
                  </div>
                </div>
              </div>

              {/* AI response */}
              <div className="flex gap-1.5">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#E83B5E] flex items-center justify-center shrink-0">
                  <Sparkles className="h-2 w-2 text-white" />
                </div>
                <div className="max-w-[80%]">
                  <div className="px-2.5 py-1.5 bg-gray-100 rounded-xl rounded-tl-sm">
                    <div className="text-[9px] text-gray-900 font-semibold mb-1">
                      {lang === "vi" ? "Giáo án · Chủ đề 4: Thơ ca & Hình ảnh" : "Lesson Plan · Unit 4: Poetry & Imagery"}
                    </div>
                    <div className="text-[8px] text-gray-700 leading-relaxed space-y-0.5">
                      {lang === "vi" ? (
                        <>
                          <div>• <span className="font-semibold">Khởi động (5p):</span> Chia sẻ bài thơ yêu thích</div>
                          <div>• <span className="font-semibold">Giảng dạy (15p):</span> Ví dụ về hình ảnh và ẩn dụ</div>
                          <div>• <span className="font-semibold">Luyện tập (15p):</span> Cả lớp viết 3 hình ảnh</div>
                          <div>• <span className="font-semibold">Tự làm (8p):</span> Viết một ẩn dụ của riêng em</div>
                          <div>• <span className="font-semibold">Vé ra (2p):</span> 1 ẩn dụ trên giấy note</div>
                        </>
                      ) : (
                        <>
                          <div>• <span className="font-semibold">Warm-up (5m):</span> Share favourite poems</div>
                          <div>• <span className="font-semibold">Direct teaching (15m):</span> Imagery vs metaphor examples</div>
                          <div>• <span className="font-semibold">Guided practice (15m):</span> Class writes 3 images together</div>
                          <div>• <span className="font-semibold">Independent (8m):</span> Write your own metaphor</div>
                          <div>• <span className="font-semibold">Exit ticket (2m):</span> 1 metaphor on a sticky note</div>
                        </>
                      )}
                    </div>
                    <div className="mt-1.5 pt-1.5 border-t border-gray-200/70 flex items-center gap-1">
                      <span className="text-[7px] font-semibold text-gray-500">{lang === "vi" ? "Dựa trên:" : "Grounded in:"}</span>
                      <span className="text-[7px] px-1 py-0.5 bg-[#FDB714]/20 rounded text-[#a16207]">{lang === "vi" ? "Bản đồ CT" : "Curriculum map"}</span>
                      <span className="text-[7px] px-1 py-0.5 bg-[#3b82f6]/10 rounded text-[#3b82f6]">{lang === "vi" ? "Chuẩn trường" : "School standards"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1 px-1">
                    <button className="flex items-center gap-0.5 text-[8px] text-gray-500 hover:text-gray-700">
                      <Copy className="h-2 w-2" /> {lang === "vi" ? "Sao chép" : "Copy"}
                    </button>
                    <button className="flex items-center gap-0.5 text-[8px] text-gray-500 hover:text-gray-700">
                      <ThumbsUp className="h-2 w-2" /> {lang === "vi" ? "Hữu ích" : "Helpful"}
                    </button>
                    <button className="flex items-center gap-0.5 text-[8px] text-[#E83B5E] hover:underline">
                      <Plus className="h-2 w-2" /> {lang === "vi" ? "Lưu vào thư viện" : "Save to library"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Typing indicator */}
              <div className="flex gap-1.5">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#E83B5E] flex items-center justify-center shrink-0">
                  <Sparkles className="h-2 w-2 text-white" />
                </div>
                <div className="px-2.5 py-1.5 bg-gray-100 rounded-xl rounded-tl-sm">
                  <div className="flex gap-0.5">
                    <div className="h-1 w-1 rounded-full bg-gray-400 animate-pulse" />
                    <div className="h-1 w-1 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <div className="h-1 w-1 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-gray-100 p-2">
              <div className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-50 rounded-lg">
                <Paperclip className="h-3 w-3 text-gray-400 shrink-0" />
                <span className="text-[9px] text-gray-400 flex-1">{mt("aiAssistant.askAnything", lang)}</span>
                <button className="h-5 w-5 rounded-md bg-[#E83B5E] flex items-center justify-center shrink-0">
                  <Send className="h-2.5 w-2.5 text-white" />
                </button>
              </div>
              <div className="flex items-center gap-1 mt-1.5 px-1">
                <span className="text-[7px] text-gray-400">{lang === "vi" ? "Chế độ:" : "Mode:"}</span>
                <span className="text-[7px] px-1 py-0.5 bg-[#FDB714]/15 text-[#a16207] rounded font-bold">{mt("aiAssistant.fastMode", lang)}</span>
                <span className="text-[7px] px-1 py-0.5 bg-[#3b82f6] text-white rounded font-bold">{mt("aiAssistant.balancedMode", lang)}</span>
                <span className="text-[7px] px-1 py-0.5 bg-gray-100 text-gray-500 rounded font-bold">{mt("aiAssistant.deepMode", lang)}</span>
                <span className="text-[7px] text-gray-400 ml-auto">{lang === "vi" ? "Dựa trên dữ liệu trường" : "Grounded in school data"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Tools + History (2/5) */}
        <div className="col-span-2 space-y-2.5">
          <Panel title={lang === "vi" ? "Công cụ AI" : "AI Tools"} subtitle={lang === "vi" ? "10 công cụ · 3 chế độ" : "10 tools · 3 modes"}>
            <div className="grid grid-cols-2 gap-1">
              {TOOLS.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-1 p-1.5 rounded-lg hover:bg-gray-50 border border-gray-100 cursor-pointer"
                >
                  <div
                    className="h-5 w-5 rounded flex items-center justify-center shrink-0"
                    style={{ background: `${t.color}20` }}
                  >
                    <t.icon className="h-2.5 w-2.5" style={{ color: t.color }} />
                  </div>
                  <span className="text-[9px] font-semibold text-gray-700 truncate">
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title={lang === "vi" ? "Cuộc trò chuyện gần đây" : "Recent Conversations"}>
            <div className="space-y-0.5">
              {CONVERSATIONS.map((c, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-1.5 p-1.5 rounded-md cursor-pointer ${
                    c.active ? "bg-[#E83B5E]/10 border-l-2 border-[#E83B5E]" : "hover:bg-gray-50"
                  }`}
                >
                  <MessageSquare
                    className={`h-2.5 w-2.5 shrink-0 ${c.active ? "text-[#E83B5E]" : "text-gray-400"}`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[9px] font-semibold text-gray-900 truncate">
                      {c.title}
                    </div>
                    <div className="text-[7px] text-gray-500">{c.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </DashboardShell>
  );
}
