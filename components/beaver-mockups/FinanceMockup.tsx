"use client";

import {
  LayoutDashboard,
  DollarSign,
  FileText,
  CreditCard,
  Users,
  Receipt,
  Package,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  Plus,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockBadge, Panel, MiniLineChart, StatCard } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const INVOICES = [
  { id: "#INV-4201", parent: "Chen Family", amount: "$1,240", status: "paid", date: "Oct 10" },
  { id: "#INV-4202", parent: "Patel Family", amount: "$980", status: "paid", date: "Oct 11" },
  { id: "#INV-4203", parent: "Lee Family", amount: "$1,540", status: "pending", date: "Oct 12" },
  { id: "#INV-4204", parent: "Kim Family", amount: "$860", status: "overdue", date: "Oct 5" },
  { id: "#INV-4205", parent: "Sharma Family", amount: "$1,200", status: "paid", date: "Oct 13" },
];

export function FinanceMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  return (
    <DashboardShell
      url="app.elementals.vn/finance"
      tabTitle="Finance — Billing & Invoices"
      breadcrumb="Finance · Demo Organization"
      userName="Ms Bui"
      userGradient={["#3b82f6", "#10b981"]}
      dayBadge="Mon"
      dayBadgeColor="blue"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: "Dashboard", active: true },
        { icon: FileText, label: "Invoices" },
        { icon: DollarSign, label: "Fees" },
        { icon: CreditCard, label: "Payments" },
        { icon: Users, label: "Payroll" },
        { icon: Receipt, label: "Expenses" },
        { icon: Package, label: "Assets" },
        { icon: TrendingUp, label: "Reports" },
      ]}
    >
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="text-[14px] font-bold text-gray-900 leading-tight">Finance Overview</div>
          <div className="text-[10px] text-gray-500">October 2025 · 557 student accounts</div>
        </div>
        <button className="flex items-center gap-1 px-2 py-1 bg-[#3b82f6] text-white rounded-lg text-[10px] font-semibold shadow-sm">
          <Plus className="h-2.5 w-2.5" />
          New Invoice
        </button>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-1.5 mb-2.5">
        {[
          { label: "Revenue", value: "$48.2k", trend: "+8.4%", icon: DollarSign, color: "#10b981", bg: "from-emerald-50" },
          { label: "Outstanding", value: "$6.8k", trend: "-12%", icon: AlertCircle, color: "#E83B5E", bg: "from-rose-50" },
          { label: "Collected", value: "94%", trend: "+3%", icon: CheckCircle2, color: "#3b82f6", bg: "from-blue-50" },
          { label: "Payroll", value: "$32.1k", trend: "+2.1%", icon: Users, color: "#8b5cf6", bg: "from-violet-50" },
        ].map((k) => (
          <div
            key={k.label}
            className={`relative rounded-2xl bg-gradient-to-br ${k.bg} to-white border border-gray-200/60 p-2.5 overflow-hidden`}
          >
            <div className="flex items-center justify-between mb-1">
              <div
                className="h-5 w-5 rounded-lg flex items-center justify-center"
                style={{ background: `${k.color}20` }}
              >
                <k.icon className="h-3 w-3" style={{ color: k.color }} />
              </div>
              <span className={`text-[8px] font-bold ${k.trend.startsWith("+") ? "text-emerald-600" : "text-rose-600"}`}>
                {k.trend}
              </span>
            </div>
            <div className="text-[9px] text-gray-500 uppercase tracking-wide font-semibold">
              {k.label}
            </div>
            <div className="text-lg font-black text-gray-900 leading-none tabular-nums mt-0.5">
              {k.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2.5">
        {/* LEFT — Invoices (3/5) */}
        <div className="col-span-3">
          <Panel
            title="Recent Invoices"
            subtitle="October 2025"
            right={<MockBadge color="blue">24 this month</MockBadge>}
          >
            <div className="grid grid-cols-[1fr_1.2fr_0.8fr_0.9fr_0.6fr] gap-1 pb-1.5 border-b border-gray-100">
              <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider">Invoice</div>
              <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider">Parent</div>
              <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider">Date</div>
              <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider text-right">Amount</div>
              <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider text-right">Status</div>
            </div>
            <div className="divide-y divide-gray-100">
              {INVOICES.map((inv) => (
                <div
                  key={inv.id}
                  className="grid grid-cols-[1fr_1.2fr_0.8fr_0.9fr_0.6fr] gap-1 items-center py-1.5"
                >
                  <span className="text-[9px] font-mono text-gray-600 truncate">{inv.id}</span>
                  <span className="text-[9px] font-semibold text-gray-900 truncate">{inv.parent}</span>
                  <span className="text-[8px] text-gray-500">{inv.date}</span>
                  <span className="text-[9px] font-bold text-gray-900 tabular-nums text-right">
                    {inv.amount}
                  </span>
                  <div className="flex justify-end">
                    {inv.status === "paid" && (
                      <span className="inline-flex items-center gap-0.5 px-1 py-0.5 bg-emerald-50 rounded text-[7px] font-bold text-emerald-700">
                        <CheckCircle2 className="h-2 w-2" />
                        Paid
                      </span>
                    )}
                    {inv.status === "pending" && (
                      <span className="inline-flex items-center gap-0.5 px-1 py-0.5 bg-amber-50 rounded text-[7px] font-bold text-amber-700">
                        <Clock className="h-2 w-2" />
                        Pending
                      </span>
                    )}
                    {inv.status === "overdue" && (
                      <span className="inline-flex items-center gap-0.5 px-1 py-0.5 bg-rose-50 rounded text-[7px] font-bold text-rose-700">
                        <AlertCircle className="h-2 w-2" />
                        Overdue
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* RIGHT — Revenue chart + AI insight (2/5) */}
        <div className="col-span-2 space-y-2.5">
          <Panel title="Revenue Trend" subtitle="Last 6 months">
            <MiniLineChart
              data={[38, 40, 42, 44, 45, 48]}
              labels={["May", "Jun", "Jul", "Aug", "Sep", "Oct"]}
              color="#10b981"
              aspectRatio={3.2}
            />
          </Panel>

          <div className="rounded-2xl bg-gradient-to-br from-[#8b5cf6]/10 to-[#3b82f6]/5 border border-[#8b5cf6]/20 p-2.5">
            <div className="flex items-center gap-1 mb-1">
              <Sparkles className="h-3 w-3 text-[#8b5cf6]" />
              <span className="text-[9px] font-bold text-[#8b5cf6] uppercase tracking-wide">
                AI Insight
              </span>
            </div>
            <div className="text-[9px] text-gray-800 font-semibold leading-tight mb-0.5">
              4 accounts at risk
            </div>
            <div className="text-[8px] text-gray-600 leading-snug">
              Kim Family is 7 days overdue. Send gentle reminder via parent portal.
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
