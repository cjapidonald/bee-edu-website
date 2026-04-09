"use client";

import {
  LayoutDashboard,
  HelpCircle,
  MessageSquare,
  RefreshCcw,
  Star,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Plus,
  Smile,
  Meh,
  Frown,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockAvatar, MockBadge, Panel, MiniLineChart } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const TICKETS = [
  { id: "#CS-881", parent: "Chen Family", subject: "Homework submission issue", priority: "high", status: "open", avatar: ["#FDB714", "#E83B5E"] as const },
  { id: "#CS-882", parent: "Patel Family", subject: "Login not working", priority: "urgent", status: "in-progress", avatar: ["#00C9A7", "#3b82f6"] as const },
  { id: "#CS-883", parent: "Lee Family", subject: "Fee question", priority: "low", status: "resolved", avatar: ["#E83B5E", "#FF6B9D"] as const },
  { id: "#CS-884", parent: "Kim Family", subject: "Parent meeting request", priority: "medium", status: "open", avatar: ["#8b5cf6", "#E83B5E"] as const },
];

const RENEWALS = [
  { school: "Greenwood Primary", plan: "Enterprise", expires: "30 days", status: "at-risk" },
  { school: "Harbor Secondary", plan: "Growth", expires: "60 days", status: "on-track" },
  { school: "Riverside Academy", plan: "Enterprise", expires: "45 days", status: "on-track" },
];

export function CustomerServiceMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  return (
    <DashboardShell
      url="www.kiwibee.com/cs"
      tabTitle="Customer Service — Tickets"
      breadcrumb="Customer Service · Success Team"
      userName="Ms Hoa"
      userGradient={["#3b82f6", "#FDB714"]}
      dayBadge="Mon"
      dayBadgeColor="blue"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: "Dashboard", active: true },
        { icon: HelpCircle, label: "Tickets" },
        { icon: RefreshCcw, label: "Renewals" },
        { icon: Star, label: "Satisfaction" },
        { icon: MessageSquare, label: "Chat" },
        { icon: TrendingUp, label: "Reports" },
      ]}
    >
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="text-[14px] font-bold text-white leading-tight">
            Customer Service
          </div>
          <div className="text-[10px] text-gray-500">
            8 open tickets · 3 renewals due · NPS +62
          </div>
        </div>
        <button className="flex items-center gap-1 px-2 py-1 bg-[#3b82f6] text-white rounded-lg text-[10px] font-semibold shadow-sm">
          <Plus className="h-2.5 w-2.5" />
          New Ticket
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-1.5 mb-2.5">
        {[
          { label: "Open", value: "8", icon: AlertCircle, color: "#E83B5E" },
          { label: "In progress", value: "5", icon: Clock, color: "#FDB714" },
          { label: "Resolved today", value: "12", icon: CheckCircle2, color: "#10b981" },
          { label: "NPS", value: "+62", icon: Star, color: "#8b5cf6" },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-xl bg-gray-900 border border-gray-700/70 p-2.5 shadow-lg shadow-black/20"
          >
            <div
              className="h-5 w-5 rounded-lg flex items-center justify-center mb-1"
              style={{ background: `${k.color}20` }}
            >
              <k.icon className="h-3 w-3" style={{ color: k.color }} />
            </div>
            <div className="text-[9px] text-gray-500">{k.label}</div>
            <div className="text-base font-black text-white tabular-nums leading-none">
              {k.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2.5">
        {/* LEFT — Tickets (3/5) */}
        <div className="col-span-3">
          <Panel
            title="Ticket Queue"
            subtitle="Sorted by priority"
            right={<MockBadge color="rose">2 urgent</MockBadge>}
          >
            <div className="space-y-1">
              {TICKETS.map((t) => (
                <div
                  key={t.id}
                  className="rounded-lg bg-gray-800/50/80 border border-gray-800 p-1.5"
                >
                  <div className="flex items-center gap-2">
                    <MockAvatar
                      name={t.parent}
                      size={20}
                      gradientFrom={t.avatar[0]}
                      gradientTo={t.avatar[1]}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[8px] font-mono text-gray-400">{t.id}</span>
                        <span className="text-[9px] font-bold text-white truncate">
                          {t.parent}
                        </span>
                      </div>
                      <div className="text-[8px] text-gray-400 truncate">{t.subject}</div>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 shrink-0">
                      <span
                        className={`text-[7px] font-bold px-1 py-0.5 rounded ${
                          t.priority === "urgent"
                            ? "bg-rose-950/50 text-rose-700"
                            : t.priority === "high"
                              ? "bg-amber-950/50 text-amber-700"
                              : t.priority === "medium"
                                ? "bg-blue-950/50 text-blue-700"
                                : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {t.priority}
                      </span>
                      <span
                        className={`text-[7px] font-bold ${
                          t.status === "resolved"
                            ? "text-emerald-600"
                            : t.status === "in-progress"
                              ? "text-[#FDB714]"
                              : "text-gray-400"
                        }`}
                      >
                        {t.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* RIGHT — Renewals + Satisfaction (2/5) */}
        <div className="col-span-2 space-y-2.5">
          <Panel
            title="Upcoming Renewals"
            right={<MockBadge color="amber">3 due</MockBadge>}
          >
            <div className="space-y-1">
              {RENEWALS.map((r) => (
                <div
                  key={r.school}
                  className="flex items-center justify-between p-1.5 rounded-md bg-gray-800/50"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[9px] font-bold text-white truncate">
                      {r.school}
                    </div>
                    <div className="text-[7px] text-gray-500">{r.plan} · {r.expires}</div>
                  </div>
                  <div
                    className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                      r.status === "at-risk" ? "bg-rose-950/500" : "bg-emerald-950/500"
                    }`}
                  />
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Satisfaction" subtitle="NPS last 30 days">
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-2xl font-black text-white leading-none">+62</span>
              <span className="text-[8px] text-emerald-600 font-bold">+8</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-0.5">
                <Smile className="h-2.5 w-2.5 text-emerald-600" />
                <span className="text-[8px] font-bold text-gray-300">72%</span>
              </div>
              <div className="flex items-center gap-0.5">
                <Meh className="h-2.5 w-2.5 text-amber-600" />
                <span className="text-[8px] font-bold text-gray-300">18%</span>
              </div>
              <div className="flex items-center gap-0.5">
                <Frown className="h-2.5 w-2.5 text-rose-600" />
                <span className="text-[8px] font-bold text-gray-300">10%</span>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </DashboardShell>
  );
}
