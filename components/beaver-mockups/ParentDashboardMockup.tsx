"use client";

import {
  LayoutDashboard,
  Heart,
  MessageSquare,
  Calendar,
  BookOpen,
  GraduationCap,
  Bell,
  UserCircle,
  Receipt,
  Users,
  Coins,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockAvatar, MockBadge, Panel, MiniLineChart, Sparkline } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const GRADES = [
  { subjectKey: "english", score: 87, trend: "+3", color: "#FDB714" },
  { subjectKey: "math", score: 92, trend: "+5", color: "#3b82f6" },
  { subjectKey: "science", score: 78, trend: "-2", color: "#00C9A7" },
  { subjectKey: "vietnamese", score: 84, trend: "+1", color: "#E83B5E" },
];

const MESSAGES_EN = [
  { from: "Ms. Nguyen", role: "Homeroom", preview: "Alex did great on the poetry test today!", time: "2h", avatar: ["#FDB714", "#E83B5E"] as const },
  { from: "Mr. Tran", role: "Math", preview: "Unit 4 parent meeting reminder...", time: "yesterday", avatar: ["#3b82f6", "#00C9A7"] as const },
  { from: "School Office", role: "Admin", preview: "Term 1 report cards available", time: "2d", avatar: ["#8b5cf6", "#E83B5E"] as const },
];

const MESSAGES_VI = [
  { from: "Cô Nguyễn", role: "GVCN", preview: "Alex làm bài thơ rất tốt hôm nay!", time: "2 giờ", avatar: ["#FDB714", "#E83B5E"] as const },
  { from: "Thầy Trần", role: "Toán", preview: "Nhắc nhở họp phụ huynh Chủ đề 4...", time: "hôm qua", avatar: ["#3b82f6", "#00C9A7"] as const },
  { from: "Văn phòng Trường", role: "Quản trị", preview: "Đã có phiếu điểm học kỳ 1", time: "2 ngày", avatar: ["#8b5cf6", "#E83B5E"] as const },
];

export function ParentDashboardMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  const MESSAGES = lang === "vi" ? MESSAGES_VI : MESSAGES_EN;
  return (
    <DashboardShell
      url="app.elementals.vn/parent"
      tabTitle={lang === "vi" ? "Phụ huynh — Alex Chen" : "Parent — Alex Chen"}
      breadcrumb={lang === "vi" ? "Phụ huynh · Bà Chen" : "Parent · Mrs Chen"}
      userName="Mrs Chen"
      userGradient={["#00C9A7", "#3b82f6"]}
      dayBadge={mt("common.monday", lang)}
      dayBadgeColor="emerald"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: mt("common.dashboard", lang), active: true },
        { icon: UserCircle, label: lang === "vi" ? "Con tôi" : "My Child" },
        { icon: BookOpen, label: mt("common.homework", lang) },
        { icon: GraduationCap, label: lang === "vi" ? "Điểm" : "Grades" },
        { icon: Calendar, label: mt("common.schedule", lang) },
        { icon: Heart, label: lang === "vi" ? "Sức khỏe" : "Wellbeing" },
        { icon: MessageSquare, label: mt("common.messages", lang) },
        { icon: Receipt, label: lang === "vi" ? "Học phí" : "Fees" },
        { icon: Bell, label: lang === "vi" ? "Cảnh báo" : "Alerts" },
      ]}
    >
      {/* Hero child card */}
      <div className="rounded-2xl bg-gradient-to-br from-[#00C9A7]/15 via-white to-[#3b82f6]/10 border border-[#00C9A7]/20 p-3 mb-2.5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#00C9A7]/10 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <MockAvatar name="Alex Chen" size={48} gradientFrom="#E83B5E" gradientTo="#8b5cf6" />
          <div className="flex-1 min-w-0">
            <div className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold">{lang === "vi" ? "Con bạn" : "Your child"}</div>
            <div className="text-[14px] font-bold text-gray-900 leading-tight">Alex Chen</div>
            <div className="text-[9px] text-gray-600">{lang === "vi" ? "Lớp 5A · Trường Tiểu học Demo" : "Primary 5A · Demo Primary School"}</div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-50 rounded">
                <CheckCircle2 className="h-2 w-2 text-emerald-600" />
                <span className="text-[8px] font-bold text-emerald-700">{lang === "vi" ? "Có mặt hôm nay" : "Present today"}</span>
              </div>
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-[#FDB714]/10 rounded">
                <Coins className="h-2 w-2 text-[#FDB714]" />
                <span className="text-[8px] font-bold text-[#a16207]">{lang === "vi" ? "148 đá quý" : "148 gems"}</span>
              </div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[8px] text-gray-500 uppercase tracking-wide font-semibold">{lang === "vi" ? "Tổng" : "Overall"}</div>
            <div className="text-2xl font-black text-gray-900 leading-none tabular-nums">85.3</div>
            <div className="text-[8px] text-emerald-600 font-bold">{lang === "vi" ? "+2.1 học kỳ này" : "+2.1 this term"}</div>
          </div>
        </div>
      </div>

      {/* 2-col */}
      <div className="grid grid-cols-5 gap-2.5">
        {/* LEFT — Grades + Trend (3/5) */}
        <div className="col-span-3 space-y-2.5">
          <Panel
            title={lang === "vi" ? "Điểm theo môn" : "Grades by Subject"}
            subtitle={lang === "vi" ? "Học kỳ hiện tại" : "Current term"}
            right={<MockBadge color="emerald">{lang === "vi" ? "+2.1 TB" : "+2.1 avg"}</MockBadge>}
          >
            <div className="grid grid-cols-2 gap-1.5">
              {GRADES.map((g) => (
                <div
                  key={g.subjectKey}
                  className="rounded-lg bg-gray-50/80 border border-gray-100 p-2"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ background: g.color }}
                      />
                      <span className="text-[9px] font-semibold text-gray-900">{mt(`subjects.${g.subjectKey}`, lang)}</span>
                    </div>
                    <span
                      className={`text-[8px] font-bold ${
                        g.trend.startsWith("+") ? "text-emerald-600" : "text-rose-500"
                      }`}
                    >
                      {g.trend}
                    </span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span
                      className={`text-lg font-black tabular-nums leading-none ${
                        g.score >= 85
                          ? "text-emerald-600"
                          : g.score >= 75
                            ? "text-amber-600"
                            : "text-rose-600"
                      }`}
                    >
                      {g.score}
                    </span>
                    <div className="h-1.5 w-12 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${g.score}%`,
                          background: g.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title={lang === "vi" ? "Xu hướng chuyên cần" : "Attendance Trend"} subtitle={lang === "vi" ? "6 tuần qua" : "Last 6 weeks"}>
            <MiniLineChart
              data={[88, 92, 90, 95, 94, 96]}
              labels={lang === "vi" ? ["T1", "T2", "T3", "T4", "T5", "T6"] : ["W1", "W2", "W3", "W4", "W5", "W6"]}
              color="#00C9A7"
              aspectRatio={3.4}
            />
          </Panel>
        </div>

        {/* RIGHT — Messages + Upcoming (2/5) */}
        <div className="col-span-2 space-y-2.5">
          <Panel
            title={mt("common.messages", lang)}
            subtitle={lang === "vi" ? "Từ giáo viên" : "From teachers"}
            right={<MockBadge color="blue">{lang === "vi" ? "3 mới" : "3 new"}</MockBadge>}
          >
            <div className="space-y-1">
              {MESSAGES.map((m) => (
                <div key={m.from} className="flex items-start gap-1.5 py-1">
                  <MockAvatar
                    name={m.from}
                    size={18}
                    gradientFrom={m.avatar[0]}
                    gradientTo={m.avatar[1]}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] font-bold text-gray-900 truncate">{m.from}</span>
                      <span className="text-[7px] text-gray-400 shrink-0">· {m.time}</span>
                    </div>
                    <div className="text-[8px] text-gray-600 truncate">{m.preview}</div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <div className="rounded-2xl bg-gradient-to-br from-[#FDB714]/10 to-[#FF6B9D]/5 border border-[#FDB714]/20 p-2.5">
            <div className="flex items-center justify-between mb-1">
              <div className="text-[9px] font-bold text-[#a16207] uppercase tracking-wide">
                {lang === "vi" ? "Sự kiện kế tiếp" : "Next Event"}
              </div>
              <Calendar className="h-3 w-3 text-[#FDB714]" />
            </div>
            <div className="text-[10px] font-bold text-gray-900">{lang === "vi" ? "Họp Phụ huynh" : "Parent-Teacher Meeting"}</div>
            <div className="text-[8px] text-gray-600">{lang === "vi" ? "T6, 18/10 · 15:00 · Phòng 5A" : "Fri, Oct 18 · 15:00 · Room 5A"}</div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
