"use client";

import {
  LayoutDashboard,
  Handshake,
  Plug,
  Key,
  Webhook,
  Settings,
  CheckCircle2,
  Plus,
  Code,
  RefreshCcw,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockBadge, Panel } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const INTEGRATIONS = [
  { name: "Google Workspace", emoji: "🌈", category: "Identity", status: "connected", events: "1.2k/day", color: "#4285F4" },
  { name: "Microsoft 365", emoji: "🪟", category: "Identity", status: "connected", events: "820/day", color: "#0078D4" },
  { name: "Zoom", emoji: "📹", category: "Video", status: "connected", events: "340/day", color: "#2D8CFF" },
  { name: "Canvas LMS", emoji: "🎨", category: "LMS", status: "connected", events: "240/day", color: "#E72429" },
  { name: "Stripe", emoji: "💳", category: "Payments", status: "connected", events: "48/day", color: "#635BFF" },
  { name: "Slack", emoji: "💬", category: "Chat", status: "not-connected", events: "—", color: "#4A154B" },
  { name: "Notion", emoji: "📝", category: "Docs", status: "not-connected", events: "—", color: "#000000" },
  { name: "Twilio", emoji: "📱", category: "SMS", status: "connected", events: "16/day", color: "#F22F46" },
];

export function IntegrationsMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  return (
    <DashboardShell
      url="www.kiwibee.com/admin/integrations"
      tabTitle="Integrations & API"
      breadcrumb="Integrations · API Keys"
      userName="Mr Le (IT)"
      userGradient={["#8b5cf6", "#3b82f6"]}
      dayBadge="IT"
      dayBadgeColor="violet"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: "Dashboard" },
        { icon: Handshake, label: "Integrations", active: true },
        { icon: Plug, label: "Marketplace" },
        { icon: Webhook, label: "Webhooks" },
        { icon: Key, label: "API Keys" },
        { icon: Code, label: "API Docs" },
        { icon: Settings, label: "Settings" },
      ]}
    >
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="text-[14px] font-bold text-white leading-tight">Integrations & API</div>
          <div className="text-[10px] text-gray-500">6 connected · 2 available · 4.2k events today</div>
        </div>
        <button className="flex items-center gap-1 px-2 py-1 bg-[#8b5cf6] text-white rounded-lg text-[10px] font-semibold shadow-sm">
          <Plus className="h-2.5 w-2.5" />
          Connect
        </button>
      </div>

      <Panel
        title="Connected Apps"
        subtitle="Live data flow status"
        right={<MockBadge color="emerald">All healthy</MockBadge>}
      >
        <div className="grid grid-cols-4 gap-1.5">
          {INTEGRATIONS.map((i) => (
            <div
              key={i.name}
              className={`rounded-xl border p-2 cursor-pointer transition-all ${
                i.status === "connected"
                  ? "bg-gray-900 border-gray-700 hover:shadow-md"
                  : "bg-gray-800/50 border-dashed border-gray-700 opacity-70"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div
                  className="h-7 w-7 rounded-lg flex items-center justify-center text-base shrink-0"
                  style={{ background: `${i.color}15` }}
                >
                  {i.emoji}
                </div>
                {i.status === "connected" ? (
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                ) : (
                  <Plus className="h-3 w-3 text-gray-400" />
                )}
              </div>
              <div className="text-[9px] font-bold text-white truncate">{i.name}</div>
              <div className="text-[7px] text-gray-500">{i.category}</div>
              {i.status === "connected" && (
                <div className="mt-1 pt-1 border-t border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    <RefreshCcw className="h-2 w-2 text-emerald-500" />
                    <span className="text-[7px] text-gray-500">{i.events}</span>
                  </div>
                  <span className="text-[7px] font-bold text-emerald-600">Live</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Panel>

      {/* Webhook + API stats */}
      <div className="grid grid-cols-3 gap-1.5 mt-2.5">
        <div className="rounded-xl bg-gray-900 border border-gray-700/70 p-2 shadow-lg shadow-black/20">
          <div className="flex items-center gap-1 mb-0.5">
            <Webhook className="h-3 w-3 text-[#8b5cf6]" />
            <span className="text-[8px] text-gray-500 font-semibold uppercase">Webhooks</span>
          </div>
          <div className="text-base font-black text-white tabular-nums">12</div>
          <div className="text-[7px] text-emerald-600">All responding</div>
        </div>
        <div className="rounded-xl bg-gray-900 border border-gray-700/70 p-2 shadow-lg shadow-black/20">
          <div className="flex items-center gap-1 mb-0.5">
            <Key className="h-3 w-3 text-[#FDB714]" />
            <span className="text-[8px] text-gray-500 font-semibold uppercase">API Keys</span>
          </div>
          <div className="text-base font-black text-white tabular-nums">4</div>
          <div className="text-[7px] text-gray-500">2 schools</div>
        </div>
        <div className="rounded-xl bg-gray-900 border border-gray-700/70 p-2 shadow-lg shadow-black/20">
          <div className="flex items-center gap-1 mb-0.5">
            <Code className="h-3 w-3 text-[#E83B5E]" />
            <span className="text-[8px] text-gray-500 font-semibold uppercase">API Calls (24h)</span>
          </div>
          <div className="text-base font-black text-white tabular-nums">42k</div>
          <div className="text-[7px] text-emerald-600">+12%</div>
        </div>
      </div>
    </DashboardShell>
  );
}
