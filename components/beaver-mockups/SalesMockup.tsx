"use client";

import {
  LayoutDashboard,
  Briefcase,
  Building2,
  Users,
  TrendingUp,
  DollarSign,
  Target,
  Sparkles,
  Calendar,
  Plus,
  Phone,
  Mail,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockAvatar, MockBadge, Panel, MiniLineChart } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const PIPELINE = {
  Lead: [
    { school: "Greenwood Primary", value: "$24k", contact: "Ms Tan", avatar: ["#FDB714", "#E83B5E"] as const },
    { school: "Harbor Secondary", value: "$48k", contact: "Mr Wong", avatar: ["#3b82f6", "#8b5cf6"] as const },
  ],
  Qualified: [
    { school: "Riverside Academy", value: "$72k", contact: "Dr Liu", avatar: ["#E83B5E", "#FF6B9D"] as const },
  ],
  Proposal: [
    { school: "Sunrise International", value: "$120k", contact: "Ms Park", avatar: ["#00C9A7", "#3b82f6"] as const },
    { school: "Meridian School", value: "$56k", contact: "Mr Lee", avatar: ["#8b5cf6", "#E83B5E"] as const },
  ],
  Closed: [
    { school: "Oakwood College", value: "$96k", contact: "Dr Chen", avatar: ["#10b981", "#00C9A7"] as const },
  ],
};

const STAGE_COLORS = {
  Lead: { accent: "#9ca3af", text: "text-gray-700", bg: "bg-gray-100" },
  Qualified: { accent: "#3b82f6", text: "text-blue-700", bg: "bg-blue-100" },
  Proposal: { accent: "#FDB714", text: "text-[#a16207]", bg: "bg-[#FDB714]/15" },
  Closed: { accent: "#10b981", text: "text-emerald-700", bg: "bg-emerald-100" },
};

export function SalesMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  return (
    <DashboardShell
      url="app.elementals.vn/sales"
      tabTitle="Sales Admin — Pipeline"
      breadcrumb="Sales · Platform Admin"
      userName="Mr Dao"
      userGradient={["#3b82f6", "#8b5cf6"]}
      dayBadge="Q4"
      dayBadgeColor="blue"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: "Dashboard", active: true },
        { icon: Briefcase, label: "Pipeline" },
        { icon: Building2, label: "Organizations" },
        { icon: Users, label: "Contacts" },
        { icon: DollarSign, label: "Deals" },
        { icon: Target, label: "Targets" },
        { icon: TrendingUp, label: "Performance" },
        { icon: Calendar, label: "Meetings" },
      ]}
    >
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="text-[14px] font-bold text-gray-900 leading-tight">Sales Pipeline</div>
          <div className="text-[10px] text-gray-500">Q4 2025 · $416k pipeline · 6 active deals</div>
        </div>
        <button className="flex items-center gap-1 px-2 py-1 bg-[#3b82f6] text-white rounded-lg text-[10px] font-semibold shadow-sm">
          <Plus className="h-2.5 w-2.5" />
          New Deal
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-1.5 mb-2.5">
        {[
          { label: "Pipeline", value: "$416k", color: "#3b82f6", icon: Briefcase },
          { label: "Closed Q4", value: "$96k", color: "#10b981", icon: DollarSign },
          { label: "Win rate", value: "42%", color: "#FDB714", icon: Target },
          { label: "New leads", value: "+12", color: "#E83B5E", icon: Users },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-xl bg-white border border-gray-200/70 p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            <div
              className="h-5 w-5 rounded-lg flex items-center justify-center mb-1"
              style={{ background: `${k.color}20` }}
            >
              <k.icon className="h-3 w-3" style={{ color: k.color }} />
            </div>
            <div className="text-[9px] text-gray-500">{k.label}</div>
            <div className="text-lg font-black text-gray-900 tabular-nums leading-none">
              {k.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2.5">
        {/* LEFT — Pipeline kanban (4/5) */}
        <div className="col-span-4">
          <Panel
            title="Deal Pipeline"
            subtitle="Drag deals between stages"
            right={<MockBadge color="blue">$416k total</MockBadge>}
          >
            <div className="grid grid-cols-4 gap-1.5">
              {(Object.keys(PIPELINE) as Array<keyof typeof PIPELINE>).map((stage) => {
                const colors = STAGE_COLORS[stage];
                const deals = PIPELINE[stage];
                const stageTotal = deals.reduce(
                  (sum, d) => sum + parseInt(d.value.replace(/[^0-9]/g, "")),
                  0
                );
                return (
                  <div key={stage} className="rounded-lg bg-gray-50 p-1.5">
                    <div className="flex items-center justify-between mb-1.5 px-0.5">
                      <div className="flex items-center gap-1">
                        <div
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: colors.accent }}
                        />
                        <span className={`text-[8px] font-bold ${colors.text} uppercase tracking-wider`}>
                          {stage}
                        </span>
                      </div>
                      <span className="text-[7px] font-bold text-gray-500 tabular-nums">
                        ${stageTotal}k
                      </span>
                    </div>
                    <div className="space-y-1">
                      {deals.map((d, i) => (
                        <div
                          key={i}
                          className="rounded bg-white border border-gray-200/70 p-1.5 shadow-sm cursor-move"
                        >
                          <div className="text-[8px] font-bold text-gray-900 truncate leading-tight mb-0.5">
                            {d.school}
                          </div>
                          <div className="text-[10px] font-black tabular-nums leading-none mb-1" style={{ color: colors.accent }}>
                            {d.value}
                          </div>
                          <div className="flex items-center gap-1">
                            <MockAvatar
                              name={d.contact}
                              size={12}
                              gradientFrom={d.avatar[0]}
                              gradientTo={d.avatar[1]}
                            />
                            <span className="text-[7px] text-gray-500 truncate">{d.contact}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>

        {/* RIGHT — Growth (1/5) */}
        <div className="col-span-1">
          <Panel title="Growth" subtitle="Revenue">
            <div className="text-base font-black text-gray-900 tabular-nums leading-none mb-1">
              $96k
            </div>
            <div className="text-[8px] text-emerald-600 font-bold mb-2">+24%</div>
            <MiniLineChart
              data={[32, 38, 42, 48, 56, 96]}
              color="#3b82f6"
              aspectRatio={1.8}
            />
          </Panel>
        </div>
      </div>
    </DashboardShell>
  );
}
