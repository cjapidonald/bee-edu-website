"use client";

import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Bell,
  Send,
  Paperclip,
  Mic,
  Smile,
  Hash,
  Search,
  Phone,
  Video,
  Play,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockAvatar, MockBadge, Panel } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const THREADS_EN = [
  { name: "Primary 5A parents", preview: "Thanks for the update!", time: "2m", unread: 3, type: "group", avatar: ["#FDB714", "#E83B5E"] as const, active: true },
  { name: "Ms Tran · English", preview: "Can we talk about Alex?", time: "1h", unread: 1, type: "direct", avatar: ["#E83B5E", "#FF6B9D"] as const },
  { name: "Team Leaders", preview: "Meeting agenda attached", time: "3h", unread: 0, type: "group", avatar: ["#FDB714", "#00C9A7"] as const },
  { name: "Mrs Chen", preview: "Voice message (0:24)", time: "yesterday", unread: 0, type: "direct", avatar: ["#00C9A7", "#3b82f6"] as const },
];

const THREADS_VI = [
  { name: "Phụ huynh Lớp 5A", preview: "Cảm ơn cô đã cập nhật!", time: "2 phút", unread: 3, type: "group", avatar: ["#FDB714", "#E83B5E"] as const, active: true },
  { name: "Cô Trần · Tiếng Anh", preview: "Cô có thể nói chuyện về Alex không?", time: "1 giờ", unread: 1, type: "direct", avatar: ["#E83B5E", "#FF6B9D"] as const },
  { name: "Tổ trưởng", preview: "Đính kèm chương trình họp", time: "3 giờ", unread: 0, type: "group", avatar: ["#FDB714", "#00C9A7"] as const },
  { name: "Bà Chen", preview: "Tin nhắn thoại (0:24)", time: "hôm qua", unread: 0, type: "direct", avatar: ["#00C9A7", "#3b82f6"] as const },
];

export function ChatMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  const THREADS = lang === "vi" ? THREADS_VI : THREADS_EN;
  return (
    <DashboardShell
      url="www.kiwibee.com/chat"
      tabTitle={lang === "vi" ? "Trò chuyện — Phụ huynh Lớp 5A" : "Chat — Primary 5A parents"}
      breadcrumb={lang === "vi" ? "Trò chuyện · Tin nhắn" : "Chat · Messages"}
      userName="Ms Nguyen"
      userGradient={["#FDB714", "#E83B5E"]}
      dayBadge={mt("common.monday", lang)}
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: mt("common.dashboard", lang) },
        { icon: MessageSquare, label: lang === "vi" ? "Trò chuyện" : "Chat", active: true },
        { icon: Users, label: lang === "vi" ? "Thành viên" : "People" },
        { icon: Hash, label: mt("chat.channels", lang) },
        { icon: Bell, label: mt("common.notifications", lang) },
      ]}
    >
      <div className="grid grid-cols-5 gap-2.5" style={{ height: 380 }}>
        {/* LEFT — Thread list (2/5) */}
        <div className="col-span-2">
          <Panel className="h-full flex flex-col">
            <div className="px-1 pb-1 pt-1">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-800 rounded-md">
                <Search className="h-2.5 w-2.5 text-gray-400" />
                <span className="text-[9px] text-gray-400">{lang === "vi" ? "Tìm tin nhắn…" : "Search messages…"}</span>
              </div>
            </div>

            <div className="space-y-0.5 pt-1.5">
              {THREADS.map((t) => (
                <div
                  key={t.name}
                  className={`flex items-start gap-1.5 p-1.5 rounded-md cursor-pointer ${
                    t.active ? "bg-[#FDB714]/10 border-l-2 border-[#FDB714]" : "hover:bg-gray-800/50"
                  }`}
                >
                  <MockAvatar
                    name={t.name}
                    size={24}
                    gradientFrom={t.avatar[0]}
                    gradientTo={t.avatar[1]}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      {t.type === "group" && <Hash className="h-2 w-2 text-gray-400 shrink-0" />}
                      <span className="text-[9px] font-bold text-white truncate">{t.name}</span>
                    </div>
                    <div className="text-[8px] text-gray-500 truncate">{t.preview}</div>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 shrink-0">
                    <span className="text-[7px] text-gray-400">{t.time}</span>
                    {t.unread > 0 && (
                      <span className="text-[7px] font-bold text-white bg-[#E83B5E] px-1 py-0.5 rounded-full min-w-[12px] text-center">
                        {t.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* RIGHT — Conversation (3/5) */}
        <div className="col-span-3">
          <div className="rounded-2xl bg-gray-900 border border-gray-700/70 shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-800 bg-gradient-to-r from-[#FDB714]/5 to-[#E83B5E]/5">
              <div className="flex items-center gap-1.5">
                <MockAvatar name="Primary 5A" size={24} gradientFrom="#FDB714" gradientTo="#E83B5E" />
                <div>
                  <div className="text-[10px] font-bold text-white leading-tight">
                    {lang === "vi" ? "Phụ huynh Lớp 5A" : "Primary 5A parents"}
                  </div>
                  <div className="text-[8px] text-gray-500">{lang === "vi" ? "18 thành viên · 3 trực tuyến" : "18 members · 3 online"}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="h-5 w-5 rounded flex items-center justify-center text-gray-400 hover:bg-gray-800">
                  <Phone className="h-2.5 w-2.5" />
                </button>
                <button className="h-5 w-5 rounded flex items-center justify-center text-gray-400 hover:bg-gray-800">
                  <Video className="h-2.5 w-2.5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-hidden p-3 space-y-2 bg-gradient-to-b from-gray-900 to-[#fafafa]">
              {/* Teacher message */}
              <div className="flex gap-1.5">
                <MockAvatar name="Ms Nguyen" size={18} gradientFrom="#FDB714" gradientTo="#E83B5E" />
                <div className="max-w-[70%]">
                  <div className="text-[7px] text-gray-500 mb-0.5">Ms Nguyen · 10:14</div>
                  <div className="px-2 py-1 bg-gray-800 rounded-xl rounded-tl-sm">
                    <div className="text-[9px] text-gray-100">
                      {lang === "vi" ? "Nhắc nhở: họp phụ huynh vào Thứ Sáu lúc 15:00. Vui lòng xác nhận khung giờ." : "Reminder: parent-teacher conferences this Friday at 3pm. Please confirm your slot."}
                    </div>
                  </div>
                </div>
              </div>

              {/* Parent reply */}
              <div className="flex justify-end">
                <div className="max-w-[70%]">
                  <div className="text-[7px] text-gray-500 mb-0.5 text-right">{lang === "vi" ? "Bà Chen" : "Mrs Chen"} · 10:16</div>
                  <div className="px-2 py-1 bg-[#FDB714] text-[#7a4e00] rounded-xl rounded-tr-sm">
                    <div className="text-[9px]">{lang === "vi" ? "Đã xác nhận! Tôi sẽ đến cùng chồng." : "Confirmed! Will be there with my husband."}</div>
                  </div>
                </div>
              </div>

              {/* Voice message */}
              <div className="flex gap-1.5">
                <MockAvatar name="Mr Patel" size={18} gradientFrom="#3b82f6" gradientTo="#00C9A7" />
                <div className="max-w-[70%]">
                  <div className="text-[7px] text-gray-500 mb-0.5">Mr Patel · 10:22</div>
                  <div className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-800 rounded-xl rounded-tl-sm">
                    <div className="h-5 w-5 rounded-full bg-[#E83B5E] flex items-center justify-center shrink-0">
                      <Play className="h-2 w-2 text-white fill-white ml-0.5" />
                    </div>
                    <div className="flex-1 flex items-center gap-0.5">
                      {[3, 5, 8, 12, 8, 6, 4, 7, 10, 6, 4, 2].map((h, i) => (
                        <div
                          key={i}
                          className="w-0.5 rounded-full bg-[#E83B5E]"
                          style={{ height: h }}
                        />
                      ))}
                    </div>
                    <span className="text-[7px] text-gray-500 font-mono">0:24</span>
                  </div>
                </div>
              </div>

              {/* Teacher response */}
              <div className="flex gap-1.5">
                <MockAvatar name="Ms Nguyen" size={18} gradientFrom="#FDB714" gradientTo="#E83B5E" />
                <div className="max-w-[70%]">
                  <div className="text-[7px] text-gray-500 mb-0.5">Ms Nguyen · 10:25</div>
                  <div className="px-2 py-1 bg-gray-800 rounded-xl rounded-tl-sm">
                    <div className="text-[9px] text-gray-100">
                      {lang === "vi" ? "Tuyệt! Hẹn gặp mọi người vào Thứ Sáu. 🙂" : "Perfect! See you all on Friday. 🙂"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-gray-800 p-2">
              <div className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-800/50 rounded-lg">
                <Paperclip className="h-3 w-3 text-gray-400 shrink-0" />
                <Smile className="h-3 w-3 text-gray-400 shrink-0" />
                <span className="text-[9px] text-gray-400 flex-1">{lang === "vi" ? "Nhắn cho Phụ huynh Lớp 5A…" : "Message Primary 5A parents…"}</span>
                <Mic className="h-3 w-3 text-gray-400 shrink-0" />
                <button className="h-5 w-5 rounded-md bg-[#FDB714] flex items-center justify-center shrink-0">
                  <Send className="h-2.5 w-2.5 text-[#7a4e00]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
