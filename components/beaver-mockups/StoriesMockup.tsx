"use client";

import {
  LayoutDashboard,
  Megaphone,
  Image as ImageIcon,
  Heart,
  MessageSquare,
  Share2,
  Plus,
  Camera,
  Video,
  Smile,
  Send,
  Users,
  Bell,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockAvatar, MockBadge, Panel } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const STORIES = [
  {
    teacher: "Ms. Nguyen",
    teacherGradient: ["#FDB714", "#E83B5E"] as const,
    time: "2h ago",
    class: "Primary 5A",
    text: "Today we wrote our first poems about nature. I was so proud of everyone's creativity! 🌿",
    photoCount: 4,
    hearts: 18,
    comments: 6,
    color: "#FDB714",
  },
  {
    teacher: "Mr. Tran",
    teacherGradient: ["#3b82f6", "#00C9A7"] as const,
    time: "yesterday",
    class: "Primary 5A",
    text: "Math relay race results are in — Team Tigers won! 🏆 Great teamwork from everyone.",
    photoCount: 2,
    hearts: 24,
    comments: 9,
    color: "#3b82f6",
  },
  {
    teacher: "Ms. Le",
    teacherGradient: ["#00C9A7", "#3b82f6"] as const,
    time: "2d ago",
    class: "Primary 5A",
    text: "Plant observation day in the school garden. Future botanists in training! 🌱",
    photoCount: 6,
    hearts: 32,
    comments: 14,
    color: "#00C9A7",
  },
];

export function StoriesMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  return (
    <DashboardShell
      url="app.elementals.vn/class-stories"
      tabTitle="Class Stories — Primary 5A"
      breadcrumb="Class Stories · Primary 5A"
      userName="Ms Nguyen"
      userGradient={["#FDB714", "#E83B5E"]}
      dayBadge="Mon"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: "Dashboard" },
        { icon: Megaphone, label: "Stories", active: true },
        { icon: Camera, label: "Gallery" },
        { icon: Video, label: "Videos" },
        { icon: Bell, label: "Notifications" },
        { icon: Users, label: "Families" },
        { icon: MessageSquare, label: "Comments" },
      ]}
    >
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="text-[14px] font-bold text-gray-900 leading-tight">Class Stories</div>
          <div className="text-[10px] text-gray-500">
            Primary 5A · 28 posts this month · 142 parent views
          </div>
        </div>
        <button className="flex items-center gap-1 px-2 py-1 bg-[#FDB714] text-[#7a4e00] rounded-lg text-[10px] font-semibold shadow-sm">
          <Plus className="h-2.5 w-2.5" />
          New Story
        </button>
      </div>

      <div className="grid grid-cols-5 gap-2.5">
        {/* LEFT — Stories feed (3/5) */}
        <div className="col-span-3 space-y-2">
          {/* New post composer */}
          <div className="rounded-2xl bg-white border border-gray-200/70 p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="flex items-start gap-2">
              <MockAvatar name="Ms Nguyen" size={24} gradientFrom="#FDB714" gradientTo="#E83B5E" />
              <div className="flex-1">
                <div className="px-2 py-1.5 bg-gray-50 rounded-lg text-[9px] text-gray-400">
                  Share a moment with Primary 5A families…
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                  <button className="flex items-center gap-0.5 px-1.5 py-0.5 text-[8px] text-[#FDB714] font-semibold">
                    <Camera className="h-2.5 w-2.5" /> Photo
                  </button>
                  <button className="flex items-center gap-0.5 px-1.5 py-0.5 text-[8px] text-[#E83B5E] font-semibold">
                    <Video className="h-2.5 w-2.5" /> Video
                  </button>
                  <button className="flex items-center gap-0.5 px-1.5 py-0.5 text-[8px] text-[#00C9A7] font-semibold">
                    <Smile className="h-2.5 w-2.5" /> Emoji
                  </button>
                  <button className="ml-auto flex items-center gap-0.5 px-2 py-1 bg-[#FDB714] text-[#7a4e00] rounded text-[8px] font-bold">
                    <Send className="h-2 w-2" /> Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Story posts */}
          {STORIES.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white border border-gray-200/70 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              {/* Header */}
              <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-gray-100">
                <MockAvatar
                  name={s.teacher}
                  size={22}
                  gradientFrom={s.teacherGradient[0]}
                  gradientTo={s.teacherGradient[1]}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-bold text-gray-900 truncate">{s.teacher}</div>
                  <div className="text-[7px] text-gray-500">
                    {s.class} · {s.time}
                  </div>
                </div>
                <MockBadge color="yellow">Story</MockBadge>
              </div>

              {/* Photo grid */}
              <div
                className="grid grid-cols-4 gap-0.5"
                style={{ background: `${s.color}05` }}
              >
                {Array.from({ length: Math.min(s.photoCount, 4) }).map((_, j) => (
                  <div
                    key={j}
                    className="aspect-square flex items-center justify-center text-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${s.color}15, ${s.color}05)`,
                    }}
                  >
                    {["🌿", "📸", "🎨", "🌟"][j % 4]}
                  </div>
                ))}
              </div>

              {/* Caption */}
              <div className="px-2.5 py-1.5">
                <div className="text-[9px] text-gray-700 leading-snug">{s.text}</div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 px-2.5 py-1.5 border-t border-gray-100">
                <div className="flex items-center gap-1 text-[8px] text-gray-600">
                  <Heart className="h-3 w-3 text-[#E83B5E] fill-[#E83B5E]" />
                  <span className="font-bold">{s.hearts}</span>
                </div>
                <div className="flex items-center gap-1 text-[8px] text-gray-600">
                  <MessageSquare className="h-3 w-3 text-gray-400" />
                  <span>{s.comments}</span>
                </div>
                <div className="flex items-center gap-1 text-[8px] text-gray-600 ml-auto">
                  <Share2 className="h-3 w-3 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — Engagement stats (2/5) */}
        <div className="col-span-2 space-y-2.5">
          <Panel title="This Week" subtitle="Story engagement">
            <div className="space-y-2">
              {[
                { label: "Posts", value: "12", icon: Megaphone, color: "#FDB714" },
                { label: "Photos", value: "48", icon: Camera, color: "#E83B5E" },
                { label: "Hearts", value: "324", icon: Heart, color: "#FF6B9D" },
                { label: "Comments", value: "86", icon: MessageSquare, color: "#3b82f6" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <div
                    className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${s.color}15` }}
                  >
                    <s.icon className="h-3.5 w-3.5" style={{ color: s.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] text-gray-500">{s.label}</div>
                    <div className="text-sm font-black text-gray-900 tabular-nums leading-none">
                      {s.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <div className="rounded-2xl bg-gradient-to-br from-[#FDB714]/10 to-[#E83B5E]/5 border border-[#FDB714]/20 p-2.5">
            <div className="flex items-center gap-1 mb-1">
              <Users className="h-3 w-3 text-[#a16207]" />
              <span className="text-[9px] font-bold text-[#a16207] uppercase tracking-wide">
                Parents Reached
              </span>
            </div>
            <div className="text-[11px] font-bold text-gray-900">18 of 18 families · 100%</div>
            <div className="text-[8px] text-gray-600 mt-0.5">
              All parents subscribed to this class
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
