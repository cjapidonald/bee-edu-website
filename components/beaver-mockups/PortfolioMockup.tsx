"use client";

import {
  LayoutDashboard,
  FolderOpen,
  GraduationCap,
  Target,
  Sparkles,
  Share2,
  Download,
  Image as ImageIcon,
  Mic,
  FileText,
  Video,
  Award,
  Star,
  Heart,
  Users,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockAvatar, MockBadge, Panel } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const ARTIFACTS = [
  { type: "image", title: "Watercolor landscape", subject: "Art", color: "#FF6B9D", icon: ImageIcon, score: "Proficient" },
  { type: "audio", title: "Poem recitation", subject: "English", color: "#FDB714", icon: Mic, score: "Expert" },
  { type: "doc", title: "Science journal", subject: "Science", color: "#00C9A7", icon: FileText, score: "Developing" },
  { type: "video", title: "Math explanation", subject: "Math", color: "#3b82f6", icon: Video, score: "Proficient" },
  { type: "image", title: "Class presentation", subject: "English", color: "#FDB714", icon: ImageIcon, score: "Expert" },
  { type: "doc", title: "Book report", subject: "English", color: "#FDB714", icon: FileText, score: "Proficient" },
];

const SKILLS = [
  { name: "Creative Writing", level: 92, color: "#FDB714" },
  { name: "Critical Thinking", level: 84, color: "#3b82f6" },
  { name: "Communication", level: 88, color: "#E83B5E" },
  { name: "Collaboration", level: 76, color: "#00C9A7" },
];

export function PortfolioMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  return (
    <DashboardShell
      url="www.kiwibee.com/student/portfolio"
      tabTitle="Portfolio — Alex Chen"
      breadcrumb="Portfolio · Alex Chen · Primary 5A"
      userName="Alex Chen"
      userGradient={["#E83B5E", "#8b5cf6"]}
      dayBadge="Term 1"
      dayBadgeColor="yellow"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: "Dashboard" },
        { icon: FolderOpen, label: "Portfolio", active: true },
        { icon: GraduationCap, label: "Grades" },
        { icon: Target, label: "Skills" },
        { icon: Award, label: "Badges" },
        { icon: Sparkles, label: "Evidence" },
        { icon: Heart, label: "Wellbeing" },
      ]}
    >
      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-[#FDB714]/15 via-gray-950 to-[#E83B5E]/10 border border-[#FDB714]/20 p-3 mb-2.5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#FDB714]/10 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <MockAvatar name="Alex Chen" size={48} gradientFrom="#FDB714" gradientTo="#E83B5E" />
          <div className="flex-1 min-w-0">
            <div className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold">
              Portfolio
            </div>
            <div className="text-[14px] font-bold text-white leading-tight">Alex Chen</div>
            <div className="text-[9px] text-gray-400">Primary 5A · 24 artifacts · 18 skills mastered</div>
          </div>
          <div className="flex gap-1 shrink-0">
            <button className="flex items-center gap-1 px-2 py-1 bg-gray-900 border border-gray-700 text-gray-300 rounded-lg text-[9px] font-semibold">
              <Share2 className="h-2.5 w-2.5" />
              Share
            </button>
            <button className="flex items-center gap-1 px-2 py-1 bg-[#FDB714] text-[#7a4e00] rounded-lg text-[9px] font-semibold shadow-sm">
              <Download className="h-2.5 w-2.5" />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2.5">
        {/* LEFT — Artifacts (3/5) */}
        <div className="col-span-3">
          <Panel
            title="Evidence Artifacts"
            subtitle="Work samples across subjects"
            right={<MockBadge color="yellow">24 items</MockBadge>}
          >
            <div className="grid grid-cols-3 gap-1.5">
              {ARTIFACTS.map((a, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-gray-800/50/80 border border-gray-800 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                >
                  {/* Thumbnail area */}
                  <div
                    className="h-12 flex items-center justify-center relative"
                    style={{ background: `${a.color}15` }}
                  >
                    <a.icon className="h-5 w-5" style={{ color: a.color }} />
                    <span
                      className="absolute top-1 right-1 text-[7px] font-bold px-1 py-0.5 rounded uppercase"
                      style={{ background: a.color, color: "white" }}
                    >
                      {a.type}
                    </span>
                  </div>
                  {/* Info */}
                  <div className="p-1.5">
                    <div className="text-[8px] font-bold text-white truncate">{a.title}</div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[7px] text-gray-500">{a.subject}</span>
                      <span
                        className={`text-[7px] font-bold ${
                          a.score === "Expert"
                            ? "text-emerald-600"
                            : a.score === "Proficient"
                              ? "text-[#FDB714]"
                              : "text-amber-600"
                        }`}
                      >
                        {a.score}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* RIGHT — Skills + Badges (2/5) */}
        <div className="col-span-2 space-y-2.5">
          <Panel title="Skills Mastered" subtitle="Term 1 · Primary 5A">
            <div className="space-y-1.5">
              {SKILLS.map((s) => (
                <div key={s.name}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[9px] font-semibold text-white">{s.name}</span>
                    <span className="text-[8px] font-bold text-gray-300 tabular-nums">
                      {s.level}%
                    </span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${s.level}%`, background: s.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            title="Badges Earned"
            right={<MockBadge color="yellow">12</MockBadge>}
          >
            <div className="grid grid-cols-4 gap-1">
              {[
                { emoji: "🏆", color: "#FDB714" },
                { emoji: "⭐", color: "#E83B5E" },
                { emoji: "📚", color: "#00C9A7" },
                { emoji: "🎨", color: "#8b5cf6" },
                { emoji: "🔬", color: "#3b82f6" },
                { emoji: "✍️", color: "#FF6B9D" },
                { emoji: "🎤", color: "#FDB714" },
                { emoji: "🌟", color: "#E83B5E" },
              ].map((b, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg flex items-center justify-center text-base shadow-sm border"
                  style={{
                    background: `linear-gradient(135deg, ${b.color}15, ${b.color}05)`,
                    borderColor: `${b.color}30`,
                  }}
                >
                  {b.emoji}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </DashboardShell>
  );
}
