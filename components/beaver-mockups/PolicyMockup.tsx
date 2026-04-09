"use client";

import {
  LayoutDashboard,
  Shield,
  FileCheck,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  FolderOpen,
  Plus,
  Eye,
  Edit,
  Download,
  Bell,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockBadge, Panel } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const POLICY_CATEGORIES = [
  { name: "Safeguarding", count: 8, acknowledged: 42, total: 42, color: "#E83B5E" },
  { name: "Academic Integrity", count: 5, acknowledged: 40, total: 42, color: "#FDB714" },
  { name: "Health & Safety", count: 12, acknowledged: 38, total: 42, color: "#10b981" },
  { name: "Data Protection", count: 6, acknowledged: 42, total: 42, color: "#3b82f6" },
];

const RECENT_POLICIES = [
  { title: "Student Safeguarding Policy", version: "v2.4", category: "Safeguarding", status: "published", updated: "Oct 10", ackRate: 100 },
  { title: "Acceptable Use Policy", version: "v1.8", category: "Data Protection", status: "draft", updated: "Oct 12", ackRate: 0 },
  { title: "Assessment Malpractice", version: "v3.1", category: "Academic Integrity", status: "published", updated: "Oct 8", ackRate: 95 },
];

export function PolicyMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  return (
    <DashboardShell
      url="app.elementals.vn/admin/policies"
      tabTitle="Policy Management"
      breadcrumb="Policies · Admin"
      userName="Dr Pham"
      userGradient={["#f43f5e", "#8b5cf6"]}
      dayBadge="Mon"
      dayBadgeColor="pink"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: "Dashboard" },
        { icon: Shield, label: "Policies", active: true },
        { icon: FolderOpen, label: "Categories" },
        { icon: FileCheck, label: "Acknowledgments" },
        { icon: Clock, label: "Versions" },
        { icon: Users, label: "Audit Trail" },
        { icon: Bell, label: "Reminders" },
      ]}
    >
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="text-[14px] font-bold text-gray-900 leading-tight">Policy Management</div>
          <div className="text-[10px] text-gray-500">
            31 active policies · 96% staff acknowledgment rate
          </div>
        </div>
        <button className="flex items-center gap-1 px-2 py-1 bg-[#f43f5e] text-white rounded-lg text-[10px] font-semibold shadow-sm">
          <Plus className="h-2.5 w-2.5" />
          New Policy
        </button>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-4 gap-1.5 mb-2.5">
        {POLICY_CATEGORIES.map((c) => {
          const pct = (c.acknowledged / c.total) * 100;
          return (
            <div
              key={c.name}
              className="rounded-xl bg-white border border-gray-200/70 p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <div
                className="h-5 w-5 rounded-lg flex items-center justify-center mb-1"
                style={{ background: `${c.color}20` }}
              >
                <Shield className="h-3 w-3" style={{ color: c.color }} />
              </div>
              <div className="text-[9px] font-bold text-gray-900 truncate">{c.name}</div>
              <div className="text-[7px] text-gray-500 mb-1">{c.count} policies</div>
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, background: c.color }}
                />
              </div>
              <div className="text-[7px] text-gray-600 mt-0.5 tabular-nums">
                {c.acknowledged}/{c.total} ack
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent policies */}
      <Panel
        title="Recent Policies"
        subtitle="Active and draft"
        right={<MockBadge color="pink">31 total</MockBadge>}
      >
        <div className="space-y-1.5">
          {RECENT_POLICIES.map((p) => (
            <div
              key={p.title}
              className="rounded-lg bg-gray-50/80 border border-gray-100 p-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-bold text-gray-900 truncate">{p.title}</span>
                    <span className="text-[7px] text-gray-400 font-mono">{p.version}</span>
                    {p.status === "published" ? (
                      <span className="inline-flex items-center gap-0.5 px-1 py-0.5 bg-emerald-50 rounded text-[7px] font-bold text-emerald-700">
                        <CheckCircle2 className="h-2 w-2" />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-0.5 px-1 py-0.5 bg-amber-50 rounded text-[7px] font-bold text-amber-700">
                        <Edit className="h-2 w-2" />
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] text-gray-500">{p.category}</span>
                    <span className="text-[8px] text-gray-300">·</span>
                    <span className="text-[8px] text-gray-500">Updated {p.updated}</span>
                  </div>
                  {p.status === "published" && (
                    <div className="flex items-center gap-1 mt-1">
                      <div className="h-1 flex-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#f43f5e] rounded-full"
                          style={{ width: `${p.ackRate}%` }}
                        />
                      </div>
                      <span className="text-[7px] text-gray-600 font-bold tabular-nums">
                        {p.ackRate}% ack
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-0.5 shrink-0">
                  <button className="h-5 w-5 rounded bg-white border border-gray-200 flex items-center justify-center">
                    <Eye className="h-2.5 w-2.5 text-gray-500" />
                  </button>
                  <button className="h-5 w-5 rounded bg-white border border-gray-200 flex items-center justify-center">
                    <Download className="h-2.5 w-2.5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </DashboardShell>
  );
}
