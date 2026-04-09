"use client";

import {
  LayoutDashboard,
  Sparkles,
  Users,
  Trophy,
  Store,
  BarChart3,
  Settings,
  Coins,
  Star,
  Plus,
  Heart,
  Crown,
  Zap,
  Award,
  Bolt,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockAvatar, MockBadge, Panel, MiniLineChart } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const MONSTERS = [
  { name: "Alex", gems: 148, level: 12, mood: "🐾", color: ["#FDB714", "#FF6B9D"] as const, recent: "+5" },
  { name: "Maya", gems: 152, level: 14, mood: "🦊", color: ["#00C9A7", "#3b82f6"] as const, recent: "+8" },
  { name: "Jordan", gems: 134, level: 10, mood: "🐙", color: ["#E83B5E", "#FF6B9D"] as const, recent: "+3" },
  { name: "Priya", gems: 141, level: 11, mood: "🦄", color: ["#8b5cf6", "#E83B5E"] as const, recent: "+6" },
  { name: "Ethan", gems: 118, level: 9, mood: "🦉", color: ["#3b82f6", "#00C9A7"] as const, recent: "+2" },
  { name: "Sam", gems: 126, level: 10, mood: "🐢", color: ["#FDB714", "#00C9A7"] as const, recent: "+4" },
];

const RECENT_EVENTS_EN = [
  { icon: Heart, color: "#E83B5E", student: "Maya", action: "helped a classmate", gems: "+3" },
  { icon: Star, color: "#FDB714", student: "Alex", action: "completed homework early", gems: "+5" },
  { icon: Zap, color: "#3b82f6", student: "Priya", action: "excellent participation", gems: "+4" },
  { icon: Award, color: "#00C9A7", student: "Jordan", action: "perfect attendance streak", gems: "+6" },
];

const RECENT_EVENTS_VI = [
  { icon: Heart, color: "#E83B5E", student: "Maya", action: "đã giúp đỡ bạn cùng lớp", gems: "+3" },
  { icon: Star, color: "#FDB714", student: "Alex", action: "hoàn thành bài tập sớm", gems: "+5" },
  { icon: Zap, color: "#3b82f6", student: "Priya", action: "tham gia xuất sắc", gems: "+4" },
  { icon: Award, color: "#00C9A7", student: "Jordan", action: "chuỗi chuyên cần tuyệt vời", gems: "+6" },
];

export function ClassSparkMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  const RECENT_EVENTS = lang === "vi" ? RECENT_EVENTS_VI : RECENT_EVENTS_EN;
  return (
    <DashboardShell
      url="app.elementals.vn/teacher/classspark"
      tabTitle={`${mt("classSpark.title", lang)} — Primary 5A`}
      breadcrumb={`${mt("classSpark.title", lang)} · Primary 5A · ${lang === "vi" ? "Trực tiếp" : "Live"}`}
      userName="Ms Nguyen"
      userGradient={["#FDB714", "#E83B5E"]}
      dayBadge={lang === "vi" ? "TRỰC TIẾP" : "LIVE"}
      dayBadgeColor="pink"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: mt("common.overview", lang) },
        { icon: Sparkles, label: lang === "vi" ? "Buổi trực tiếp" : "Live Session", active: true },
        { icon: Users, label: mt("common.students", lang) },
        { icon: Trophy, label: lang === "vi" ? "Xếp hạng" : "Leaderboard" },
        { icon: Store, label: lang === "vi" ? "Cửa hàng" : "Shop" },
        { icon: Award, label: lang === "vi" ? "Phần thưởng" : "Rewards" },
        { icon: Heart, label: lang === "vi" ? "Quái vật" : "Monsters" },
        { icon: BarChart3, label: mt("common.analytics", lang) },
        { icon: Settings, label: mt("common.settings", lang) },
      ]}
    >
      {/* Vibrant header */}
      <div className="relative rounded-2xl overflow-hidden mb-2.5 p-3 bg-gradient-to-br from-[#FDB714] via-[#FF6B9D] to-[#E83B5E] text-white">
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-[#FDB714]/40 blur-2xl" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              <span className="text-[9px] uppercase tracking-wider font-bold">{lang === "vi" ? "Buổi trực tiếp" : "Live session"}</span>
            </div>
            <div className="text-[16px] font-black leading-tight">{mt("classSpark.title", lang)} · Primary 5A</div>
            <div className="text-[10px] text-white/90 mt-0.5">
              {lang === "vi" ? `Tiết ${mt("subjects.english", lang)} · 28 đá quý trong tiết này` : "English lesson · 28 gems given this period"}
            </div>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <button className="flex items-center gap-1 px-2 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-[10px] font-bold border border-white/30">
              <Bolt className="h-3 w-3" /> {lang === "vi" ? "Bom kết hợp" : "Fuse Bomb"}
            </button>
            <button className="flex items-center gap-1 px-2 py-1.5 bg-white text-[#E83B5E] rounded-lg text-[10px] font-bold shadow-md">
              <Plus className="h-3 w-3" /> {lang === "vi" ? "Trao đá quý" : "Give Gems"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2.5">
        {/* LEFT — Monster grid (3/5) */}
        <div className="col-span-3">
          <Panel
            title={lang === "vi" ? "Quái vật lớp" : "Class Monsters"}
            subtitle={lang === "vi" ? "Chạm vào học sinh để trao đá quý" : "Tap a student to award gems"}
            right={<MockBadge color="yellow">6 {mt("common.students", lang).toLowerCase()}</MockBadge>}
          >
            <div className="grid grid-cols-3 gap-1.5">
              {MONSTERS.map((m) => (
                <div
                  key={m.name}
                  className="relative rounded-xl p-2 border border-gray-200/60 bg-gradient-to-br from-white to-gray-50 hover:border-[#FDB714]/50 cursor-pointer"
                >
                  {/* Level badge */}
                  <div className="absolute top-1 right-1 h-4 px-1 rounded-md bg-[#FDB714] flex items-center justify-center">
                    <span className="text-[7px] font-black text-[#7a4e00]">L{m.level}</span>
                  </div>

                  {/* Monster face */}
                  <div
                    className="h-10 w-10 rounded-2xl flex items-center justify-center text-2xl mb-1 mx-auto"
                    style={{
                      background: `linear-gradient(135deg, ${m.color[0]}, ${m.color[1]})`,
                      boxShadow: `0 4px 12px ${m.color[0]}40`,
                    }}
                  >
                    {m.mood}
                  </div>

                  <div className="text-center">
                    <div className="text-[9px] font-bold text-gray-900 truncate">{m.name}</div>
                    <div className="flex items-center justify-center gap-0.5 mt-0.5">
                      <Coins className="h-2 w-2 text-[#FDB714]" />
                      <span className="text-[9px] font-black text-[#a16207] tabular-nums">
                        {m.gems}
                      </span>
                      <span className="text-[7px] font-bold text-emerald-600 ml-0.5">
                        {m.recent}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* RIGHT — Events feed + trend (2/5) */}
        <div className="col-span-2 space-y-2.5">
          <Panel title={lang === "vi" ? "Hoạt động gần đây" : "Recent Actions"} subtitle={lang === "vi" ? "Bảng tin trực tiếp" : "Live feed"}>
            <div className="space-y-1">
              {RECENT_EVENTS.map((e, i) => (
                <div
                  key={i}
                  className="flex items-start gap-1.5 py-1 px-1.5 rounded-md bg-gray-50/80"
                >
                  <div
                    className="h-5 w-5 rounded-md flex items-center justify-center shrink-0"
                    style={{ background: `${e.color}20` }}
                  >
                    <e.icon className="h-2.5 w-2.5" style={{ color: e.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[9px] text-gray-700 leading-tight">
                      <span className="font-bold text-gray-900">{e.student}</span> {e.action}
                    </div>
                  </div>
                  <span className="text-[8px] font-black text-[#a16207] tabular-nums shrink-0">
                    {e.gems}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title={lang === "vi" ? "Năng lượng hôm nay" : "Today's Energy"} subtitle={lang === "vi" ? "Đá quý mỗi giờ" : "Gems per hour"}>
            <MiniLineChart
              data={[4, 8, 12, 18, 22, 28]}
              labels={["08", "09", "10", "11", "12", "13"]}
              color="#E83B5E"
              aspectRatio={3}
            />
          </Panel>
        </div>
      </div>
    </DashboardShell>
  );
}
