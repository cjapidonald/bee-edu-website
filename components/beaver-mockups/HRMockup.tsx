"use client";

import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  TrendingUp,
  Award,
  DollarSign,
  UserCog,
  MessageSquare,
  Briefcase,
  UserPlus,
  CheckCircle2,
  Clock,
  XCircle,
  GraduationCap,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockAvatar, MockBadge, Panel, MiniLineChart, StatCard } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const STAFF = [
  { name: "Ms Tran", role: "English Teacher", contract: "Permanent", status: "Active", avatar: ["#FDB714", "#E83B5E"] as const, performance: 4.8 },
  { name: "Mr Tran", role: "Math Teacher", contract: "Permanent", status: "Active", avatar: ["#3b82f6", "#8b5cf6"] as const, performance: 4.6 },
  { name: "Ms Le", role: "Science Teacher", contract: "Permanent", status: "On Leave", avatar: ["#00C9A7", "#3b82f6"] as const, performance: 4.5 },
  { name: "Ms Pham", role: "Vietnamese Teacher", contract: "Contract", status: "Active", avatar: ["#E83B5E", "#FF6B9D"] as const, performance: 4.7 },
];

export function HRMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  return (
    <DashboardShell
      url="www.kiwibee.com/hr"
      tabTitle="HR — Staff & Contracts"
      breadcrumb="HR · Demo Organization"
      userName="Ms Hoang"
      userGradient={["#10b981", "#00C9A7"]}
      dayBadge="Mon"
      dayBadgeColor="emerald"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: "Dashboard", active: true },
        { icon: Users, label: "Directory" },
        { icon: FileText, label: "Contracts" },
        { icon: Calendar, label: "Attendance" },
        { icon: TrendingUp, label: "Performance" },
        { icon: Award, label: "Qualifications" },
        { icon: UserPlus, label: "Recruitment" },
        { icon: DollarSign, label: "Payroll" },
        { icon: MessageSquare, label: "Chat" },
      ]}
    >
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="text-[14px] font-bold text-white leading-tight">HR Overview</div>
          <div className="text-[10px] text-gray-500">
            42 staff · 38 active · 3 on leave · 1 open position
          </div>
        </div>
        <button className="flex items-center gap-1 px-2 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-semibold shadow-sm">
          <UserPlus className="h-2.5 w-2.5" />
          Add Staff
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-6 gap-1.5 mb-2.5">
        <StatCard icon={Users} label="Total" value={42} color="text-gray-400" bg="bg-gray-800" />
        <StatCard icon={CheckCircle2} label="Active" value={38} color="text-emerald-600" bg="bg-emerald-100" trend="+2" />
        <StatCard icon={Clock} label="On leave" value={3} color="text-amber-600" bg="bg-amber-100" />
        <StatCard icon={XCircle} label="Absent" value={1} color="text-red-600" bg="bg-red-100" />
        <StatCard icon={Briefcase} label="Open roles" value={1} color="text-violet-600" bg="bg-violet-100" />
        <StatCard icon={TrendingUp} label="Retention" value="96%" color="text-emerald-600" bg="bg-emerald-100" trend="+4%" />
      </div>

      <div className="grid grid-cols-5 gap-2.5">
        {/* LEFT — Staff directory (3/5) */}
        <div className="col-span-3">
          <Panel
            title="Staff Directory"
            subtitle="Active staff members"
            right={<MockBadge color="emerald">42 staff</MockBadge>}
          >
            <div className="grid grid-cols-[1.5fr_1fr_0.9fr_0.8fr_0.6fr] gap-1 pb-1.5 border-b border-gray-800">
              <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider">Name</div>
              <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider">Role</div>
              <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider">Contract</div>
              <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider">Status</div>
              <div className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider text-right">Perf</div>
            </div>
            <div className="divide-y divide-gray-100">
              {STAFF.map((s) => (
                <div
                  key={s.name}
                  className="grid grid-cols-[1.5fr_1fr_0.9fr_0.8fr_0.6fr] gap-1 items-center py-1.5"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <MockAvatar
                      name={s.name}
                      size={18}
                      gradientFrom={s.avatar[0]}
                      gradientTo={s.avatar[1]}
                    />
                    <span className="text-[9px] font-semibold text-white truncate">{s.name}</span>
                  </div>
                  <span className="text-[9px] text-gray-400 truncate">{s.role}</span>
                  <span className="text-[8px] text-gray-500">{s.contract}</span>
                  <div>
                    {s.status === "Active" ? (
                      <span className="inline-flex items-center gap-0.5 px-1 py-0.5 bg-emerald-950/50 rounded text-[7px] font-bold text-emerald-700">
                        <CheckCircle2 className="h-2 w-2" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-0.5 px-1 py-0.5 bg-amber-950/50 rounded text-[7px] font-bold text-amber-700">
                        <Clock className="h-2 w-2" />
                        Leave
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] font-bold text-[#a16207] tabular-nums text-right">★ {s.performance}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* RIGHT — Payroll + Leaves (2/5) */}
        <div className="col-span-2 space-y-2.5">
          <Panel title="Monthly Payroll" subtitle="Oct 2025">
            <div className="text-lg font-black text-white leading-none tabular-nums mb-1">
              $48,250
            </div>
            <div className="text-[8px] text-gray-500 mb-2">42 employees · paid on 25th</div>
            <MiniLineChart
              data={[44, 45, 46, 45, 47, 48]}
              labels={["May", "Jun", "Jul", "Aug", "Sep", "Oct"]}
              color="#10b981"
              aspectRatio={3}
            />
          </Panel>

          <Panel
            title="Leave Requests"
            right={<MockBadge color="amber">3 pending</MockBadge>}
          >
            <div className="space-y-1">
              {[
                { name: "Ms Le", type: "Sick", days: "Oct 14–16" },
                { name: "Mr Nguyen", type: "Annual", days: "Oct 20–24" },
                { name: "Ms Hoa", type: "Personal", days: "Oct 18" },
              ].map((l) => (
                <div key={l.name} className="flex items-center gap-1.5 py-0.5">
                  <MockAvatar name={l.name} size={14} gradientFrom="#10b981" gradientTo="#00C9A7" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[8px] font-bold text-white truncate">{l.name}</div>
                    <div className="text-[7px] text-gray-500">
                      {l.type} · {l.days}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </DashboardShell>
  );
}
