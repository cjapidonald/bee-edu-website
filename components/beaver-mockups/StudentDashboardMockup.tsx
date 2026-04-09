"use client";

import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Sparkles,
  Gamepad2,
  Trophy,
  Store,
  Heart,
  MessageSquare,
  Coins,
  Star,
  Flame,
  ChevronRight,
  Zap,
  Crown,
  Award,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockAvatar, Sparkline, MockBadge, Panel, MiniLineChart } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const HOMEWORK_EN = [
  { subjectKey: "english", title: "Poetry analysis", due: "Today", color: "#FDB714", urgent: true },
  { subjectKey: "math", title: "Fractions worksheet", due: "Tomorrow", color: "#3b82f6", urgent: false },
  { subjectKey: "science", title: "Plant observation", due: "Fri", color: "#00C9A7", urgent: false },
];

const HOMEWORK_VI = [
  { subjectKey: "english", title: "Phân tích thơ", due: "Hôm nay", color: "#FDB714", urgent: true },
  { subjectKey: "math", title: "Phiếu phân số", due: "Ngày mai", color: "#3b82f6", urgent: false },
  { subjectKey: "science", title: "Quan sát thực vật", due: "T6", color: "#00C9A7", urgent: false },
];

const LEADERBOARD_EN = [
  { rank: 1, name: "Maya Patel", gems: 152, gradient: ["#FDB714", "#FF6B9D"] as const, crown: true },
  { rank: 2, name: "Alex Chen (You)", gems: 148, gradient: ["#E83B5E", "#8b5cf6"] as const, highlight: true },
  { rank: 3, name: "Priya Sharma", gems: 141, gradient: ["#8b5cf6", "#3b82f6"] as const },
  { rank: 4, name: "Jordan Lee", gems: 134, gradient: ["#00C9A7", "#3b82f6"] as const },
];

const LEADERBOARD_VI = [
  { rank: 1, name: "Maya Patel", gems: 152, gradient: ["#FDB714", "#FF6B9D"] as const, crown: true },
  { rank: 2, name: "Alex Chen (Bạn)", gems: 148, gradient: ["#E83B5E", "#8b5cf6"] as const, highlight: true },
  { rank: 3, name: "Priya Sharma", gems: 141, gradient: ["#8b5cf6", "#3b82f6"] as const },
  { rank: 4, name: "Jordan Lee", gems: 134, gradient: ["#00C9A7", "#3b82f6"] as const },
];

export function StudentDashboardMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  const HOMEWORK = lang === "vi" ? HOMEWORK_VI : HOMEWORK_EN;
  const LEADERBOARD = lang === "vi" ? LEADERBOARD_VI : LEADERBOARD_EN;
  return (
    <DashboardShell
      url="app.elementals.vn/student"
      tabTitle={lang === "vi" ? "Học sinh — Alex Chen" : "Student — Alex Chen"}
      breadcrumb={lang === "vi" ? "Lớp 5A · Chào Alex!" : "Primary 5A · Hi Alex!"}
      userName="Alex Chen"
      userGradient={["#E83B5E", "#8b5cf6"]}
      dayBadge={mt("common.monday", lang)}
      dayBadgeColor="emerald"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: mt("common.dashboard", lang), active: true },
        { icon: BookOpen, label: mt("common.homework", lang) },
        { icon: Calendar, label: mt("common.schedule", lang) },
        { icon: Sparkles, label: "ClassSpark" },
        { icon: Store, label: lang === "vi" ? "Cửa hàng" : "Shop" },
        { icon: Gamepad2, label: lang === "vi" ? "Trò chơi" : "Games" },
        { icon: Trophy, label: lang === "vi" ? "Xếp hạng" : "Leaderboard" },
        { icon: Heart, label: lang === "vi" ? "Nhật ký" : "Stories" },
        { icon: MessageSquare, label: mt("common.messages", lang) },
      ]}
    >
      {/* Hero gem wallet card */}
      <div className="relative rounded-2xl overflow-hidden mb-2.5 p-3 bg-gradient-to-br from-[#FDB714] via-[#FF6B9D] to-[#E83B5E] text-white shadow-lg">
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-center gap-3">
          {/* Monster avatar placeholder */}
          <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-3xl shrink-0">
            🐾
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-wider text-white/80 font-semibold">
              {lang === "vi" ? "Chào buổi sáng, Alex!" : "Good morning, Alex!"}
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <div className="flex items-center gap-1">
                <Coins className="h-4 w-4 text-white" />
                <span className="text-2xl font-black tabular-nums">148</span>
              </div>
              <span className="text-[9px] text-white/80">{lang === "vi" ? "đá quý · +12 hôm nay" : "gems · +12 today"}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-0.5">
                <Flame className="h-2.5 w-2.5 text-white" />
                <span className="text-[9px] font-semibold">{lang === "vi" ? "Chuỗi 7 ngày" : "7 day streak"}</span>
              </div>
              <span className="text-[9px] text-white/60">·</span>
              <div className="flex items-center gap-0.5">
                <Zap className="h-2.5 w-2.5 text-white" />
                <span className="text-[9px] font-semibold">{lang === "vi" ? "Cấp 12" : "Level 12"}</span>
              </div>
              <span className="text-[9px] text-white/60">·</span>
              <div className="flex items-center gap-0.5">
                <Star className="h-2.5 w-2.5 text-white fill-white" />
                <span className="text-[9px] font-semibold">{lang === "vi" ? "Hạng Vàng" : "Gold tier"}</span>
              </div>
            </div>
          </div>
          <button className="shrink-0 flex items-center gap-1 px-2 py-1 bg-white text-[#E83B5E] rounded-lg text-[9px] font-bold shadow-md">
            <Store className="h-2.5 w-2.5" />
            {lang === "vi" ? "Cửa hàng" : "Shop"}
          </button>
        </div>
      </div>

      {/* 2-col */}
      <div className="grid grid-cols-5 gap-2.5">
        {/* LEFT — Homework + Progress (3/5) */}
        <div className="col-span-3 space-y-2.5">
          <Panel
            title={mt("common.homework", lang)}
            subtitle={lang === "vi" ? "Hạn tuần này" : "Due this week"}
            right={<MockBadge color="rose">{lang === "vi" ? "1 gấp" : "1 urgent"}</MockBadge>}
          >
            <div className="space-y-1.5">
              {HOMEWORK.map((h) => (
                <div
                  key={h.title}
                  className="flex items-center gap-2 p-1.5 rounded-lg bg-gray-50/80 border border-gray-100"
                >
                  <div
                    className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${h.color}20` }}
                  >
                    <BookOpen className="h-3 w-3" style={{ color: h.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-semibold text-gray-900 truncate">{h.title}</div>
                    <div className="text-[8px] text-gray-500">{mt(`subjects.${h.subjectKey}`, lang)}</div>
                  </div>
                  <div className="shrink-0">
                    {h.urgent ? (
                      <span className="text-[8px] font-bold text-rose-700 px-1.5 py-0.5 bg-rose-50 rounded">
                        {h.due}
                      </span>
                    ) : (
                      <span className="text-[8px] text-gray-500">{h.due}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title={lang === "vi" ? "Tiến độ của tôi" : "My Progress"} subtitle={lang === "vi" ? "Đá quý · 7 ngày qua" : "Gems earned · last 7 days"}>
            <MiniLineChart
              data={[8, 14, 10, 18, 22, 16, 12]}
              labels={lang === "vi" ? ["T2", "T3", "T4", "T5", "T6", "T7", "CN"] : ["M", "T", "W", "T", "F", "S", "S"]}
              color="#FDB714"
              aspectRatio={3.4}
            />
          </Panel>
        </div>

        {/* RIGHT — Leaderboard + Rewards (2/5) */}
        <div className="col-span-2 space-y-2.5">
          <Panel
            title={mt("classSpark.classLeaderboard", lang)}
            subtitle={lang === "vi" ? "Lớp 5A tuần này" : "Primary 5A this week"}
            right={
              <div className="h-4 w-4 rounded-full bg-[#FDB714]/10 flex items-center justify-center">
                <Trophy className="h-2.5 w-2.5 text-[#FDB714]" />
              </div>
            }
          >
            <div className="space-y-1">
              {LEADERBOARD.map((s) => (
                <div
                  key={s.rank}
                  className={`flex items-center gap-1.5 p-1 rounded-md ${
                    s.highlight ? "bg-[#FDB714]/10 ring-1 ring-[#FDB714]/30" : ""
                  }`}
                >
                  <div className="w-4 text-center shrink-0">
                    {s.crown ? (
                      <Crown className="h-3 w-3 text-[#FDB714] fill-[#FDB714]" />
                    ) : (
                      <span className="text-[9px] font-bold text-gray-400">{s.rank}</span>
                    )}
                  </div>
                  <MockAvatar
                    name={s.name}
                    size={16}
                    gradientFrom={s.gradient[0]}
                    gradientTo={s.gradient[1]}
                  />
                  <span className="text-[9px] font-medium text-gray-900 flex-1 truncate">
                    {s.name}
                  </span>
                  <div className="flex items-center gap-0.5 shrink-0">
                    <Coins className="h-2 w-2 text-[#FDB714]" />
                    <span className="text-[9px] font-bold text-[#a16207] tabular-nums">
                      {s.gems}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <div className="rounded-2xl bg-gradient-to-br from-[#00C9A7]/10 to-[#3b82f6]/10 border border-[#00C9A7]/20 p-2.5">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-[#00C9A7]/20 flex items-center justify-center shrink-0">
                <Award className="h-4 w-4 text-[#00C9A7]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold text-gray-900">{lang === "vi" ? "Huy hiệu kế tiếp" : "Next badge"}</div>
                <div className="text-[8px] text-gray-600">{lang === "vi" ? "Nhà vô địch đọc · còn 12 đá quý" : "Reading Champion · 12 gems away"}</div>
                <div className="h-1 bg-[#00C9A7]/20 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-[#00C9A7] rounded-full" style={{ width: "75%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
