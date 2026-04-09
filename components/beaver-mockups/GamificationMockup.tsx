"use client";

import {
  LayoutDashboard,
  Gamepad2,
  Trophy,
  Store,
  Sparkles,
  Users,
  BarChart3,
  Coins,
  Star,
  Crown,
  Zap,
  Flame,
  Play,
  Award,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockAvatar, MockBadge, Panel } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const GAMES = [
  { name: "Quiz Battle", emoji: "🎯", subject: "Math", plays: 142, color: "#FDB714" },
  { name: "Writing Race", emoji: "✍️", subject: "English", plays: 98, color: "#E83B5E" },
  { name: "Match Pairs", emoji: "🧩", subject: "Science", plays: 76, color: "#00C9A7" },
  { name: "Word Builder", emoji: "🔤", subject: "English", plays: 54, color: "#8b5cf6" },
  { name: "Number Hunt", emoji: "🔢", subject: "Math", plays: 48, color: "#3b82f6" },
  { name: "Story Path", emoji: "📖", subject: "English", plays: 32, color: "#FF6B9D" },
];

const SHOP_ITEMS = [
  { emoji: "🎩", name: "Top Hat", price: 25, tier: "Common" },
  { emoji: "🦄", name: "Unicorn Skin", price: 80, tier: "Rare" },
  { emoji: "👑", name: "Royal Crown", price: 150, tier: "Epic" },
  { emoji: "🌟", name: "Star Aura", price: 220, tier: "Legendary" },
];

export function GamificationMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  return (
    <DashboardShell
      url="app.elementals.vn/student/games"
      tabTitle="Gamification — Games & Shop"
      breadcrumb="Gamification · Primary 5A"
      userName="Alex Chen"
      userGradient={["#FDB714", "#E83B5E"]}
      dayBadge="L12"
      dayBadgeColor="yellow"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: "Dashboard" },
        { icon: Gamepad2, label: "Games", active: true },
        { icon: Trophy, label: "Leaderboard" },
        { icon: Store, label: "Shop" },
        { icon: Sparkles, label: "Challenges" },
        { icon: Award, label: "Achievements" },
        { icon: Users, label: "Friends" },
        { icon: BarChart3, label: "Progress" },
      ]}
    >
      {/* Gem wallet hero */}
      <div className="relative rounded-2xl overflow-hidden mb-2.5 p-3 bg-gradient-to-br from-[#FDB714] via-[#FF6B9D] to-[#E83B5E] text-white shadow-lg">
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-center gap-3">
          {/* Monster */}
          <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-3xl shrink-0">
            🦊
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[9px] uppercase tracking-wider text-white/80 font-semibold">
              Gem Wallet
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <div className="flex items-center gap-1">
                <Coins className="h-4 w-4 text-white" />
                <span className="text-2xl font-black tabular-nums">148</span>
              </div>
              <span className="text-[9px] text-white/80">gems · +12 today</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-0.5 px-1 py-0.5 bg-white/15 rounded">
                <Flame className="h-2 w-2 text-white" />
                <span className="text-[8px] font-bold">7 day</span>
              </div>
              <div className="flex items-center gap-0.5 px-1 py-0.5 bg-white/15 rounded">
                <Zap className="h-2 w-2 text-white" />
                <span className="text-[8px] font-bold">Level 12</span>
              </div>
              <div className="flex items-center gap-0.5 px-1 py-0.5 bg-white/15 rounded">
                <Star className="h-2 w-2 text-white fill-white" />
                <span className="text-[8px] font-bold">Gold tier</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2.5">
        {/* LEFT — Games library (3/5) */}
        <div className="col-span-3">
          <Panel
            title="Games Library"
            subtitle="Curriculum-linked · Subject-scoped"
            right={<MockBadge color="yellow">6 available</MockBadge>}
          >
            <div className="grid grid-cols-3 gap-1.5">
              {GAMES.map((g) => (
                <div
                  key={g.name}
                  className="relative rounded-xl border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  style={{ background: `linear-gradient(135deg, ${g.color}08, white)` }}
                >
                  {/* Thumbnail */}
                  <div
                    className="h-10 flex items-center justify-center text-2xl relative"
                    style={{ background: `${g.color}15` }}
                  >
                    {g.emoji}
                    <button
                      className="absolute right-1 top-1 h-4 w-4 rounded-full flex items-center justify-center shadow-md"
                      style={{ background: g.color }}
                    >
                      <Play className="h-2 w-2 text-white fill-white" />
                    </button>
                  </div>
                  {/* Info */}
                  <div className="p-1.5">
                    <div className="text-[9px] font-bold text-gray-900 truncate">{g.name}</div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[7px] text-gray-500">{g.subject}</span>
                      <span className="text-[7px] text-gray-600 font-semibold">
                        {g.plays} plays
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* RIGHT — ClassShop (2/5) */}
        <div className="col-span-2">
          <Panel
            title="ClassShop"
            subtitle="Spend your gems"
            right={
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-[#FDB714]/15 rounded">
                <Coins className="h-2.5 w-2.5 text-[#FDB714]" />
                <span className="text-[9px] font-bold text-[#a16207] tabular-nums">148</span>
              </div>
            }
          >
            <div className="space-y-1">
              {SHOP_ITEMS.map((item) => {
                const canAfford = 148 >= item.price;
                return (
                  <div
                    key={item.name}
                    className={`flex items-center gap-2 p-1.5 rounded-lg border ${
                      canAfford ? "border-gray-100 bg-white" : "border-gray-100 bg-gray-50 opacity-70"
                    }`}
                  >
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#FDB714]/10 to-[#E83B5E]/10 flex items-center justify-center text-xl shrink-0">
                      {item.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] font-bold text-gray-900 truncate">
                        {item.name}
                      </div>
                      <div
                        className={`text-[7px] font-semibold ${
                          item.tier === "Legendary"
                            ? "text-[#FDB714]"
                            : item.tier === "Epic"
                              ? "text-violet-600"
                              : item.tier === "Rare"
                                ? "text-blue-600"
                                : "text-gray-500"
                        }`}
                      >
                        {item.tier}
                      </div>
                    </div>
                    <button
                      className={`flex items-center gap-0.5 px-1.5 py-1 rounded text-[9px] font-bold shrink-0 ${
                        canAfford
                          ? "bg-[#FDB714] text-[#7a4e00]"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!canAfford}
                    >
                      <Coins className="h-2 w-2" />
                      {item.price}
                    </button>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>
      </div>
    </DashboardShell>
  );
}
