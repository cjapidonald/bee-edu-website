"use client";

import {
  LayoutDashboard,
  ArchiveRestore,
  Users,
  School,
  CheckCircle2,
  ArrowRight,
  Play,
  Circle,
  GraduationCap,
  Shield,
  FileText,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockBadge, Panel } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const STEPS = [
  { title: "Verify current year data", status: "done" },
  { title: "Set promotion rules", status: "done" },
  { title: "Preview class mappings", status: "current" },
  { title: "Migrate students", status: "pending" },
  { title: "Validate new enrollments", status: "pending" },
  { title: "Archive previous year", status: "pending" },
];

const MAPPINGS = [
  { from: "Primary 4A", to: "Primary 5A", count: 18, avatar: "📘" },
  { from: "Primary 4B", to: "Primary 5B", count: 17, avatar: "📗" },
  { from: "Secondary 6A", to: "Secondary 7A", count: 22, avatar: "📕" },
];

export function YearMigrationMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  return (
    <DashboardShell
      url="app.elementals.vn/admin/year-migration"
      tabTitle="Year Migration — 2025→2026"
      breadcrumb="Year Migration · AY 2025→2026"
      userName="Dr Pham"
      userGradient={["#3b82f6", "#8b5cf6"]}
      dayBadge="AY26"
      dayBadgeColor="blue"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: "Dashboard" },
        { icon: ArchiveRestore, label: "Year Migration", active: true },
        { icon: Users, label: "Students" },
        { icon: School, label: "Classes" },
        { icon: GraduationCap, label: "Promotions" },
        { icon: Shield, label: "Validation" },
        { icon: FileText, label: "Audit Log" },
      ]}
    >
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="text-[14px] font-bold text-gray-900 leading-tight">
            Academic Year Migration
          </div>
          <div className="text-[10px] text-gray-500">
            AY 2025→2026 · 557 students · 18 classes · Step 3 of 6
          </div>
        </div>
        <button className="flex items-center gap-1 px-2 py-1 bg-[#3b82f6] text-white rounded-lg text-[10px] font-semibold shadow-sm">
          <Play className="h-2.5 w-2.5" />
          Continue
        </button>
      </div>

      {/* Wizard stepper */}
      <Panel
        title="Migration Progress"
        subtitle="Guided workflow with validation"
        right={<MockBadge color="blue">33% complete</MockBadge>}
      >
        <div className="space-y-1.5 mb-2">
          {STEPS.map((step, i) => (
            <div key={step.title} className="flex items-center gap-2">
              <div className="shrink-0">
                {step.status === "done" ? (
                  <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3 text-white" />
                  </div>
                ) : step.status === "current" ? (
                  <div className="h-5 w-5 rounded-full bg-[#3b82f6] flex items-center justify-center ring-2 ring-[#3b82f6]/30">
                    <span className="text-[9px] font-black text-white">{i + 1}</span>
                  </div>
                ) : (
                  <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center">
                    <Circle className="h-2.5 w-2.5 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className={`text-[10px] font-semibold ${
                    step.status === "done"
                      ? "text-emerald-700 line-through"
                      : step.status === "current"
                        ? "text-[#3b82f6]"
                        : "text-gray-500"
                  }`}
                >
                  Step {i + 1}: {step.title}
                </div>
              </div>
              {step.status === "current" && (
                <span className="text-[7px] font-bold px-1 py-0.5 bg-[#3b82f6]/10 text-[#3b82f6] rounded">
                  ACTIVE
                </span>
              )}
            </div>
          ))}
        </div>
      </Panel>

      {/* Class mapping preview */}
      <div className="mt-2.5">
        <Panel
          title="Preview: Class Mappings"
          subtitle="AY 2025 → AY 2026 promotions"
          right={<MockBadge color="yellow">Preview mode</MockBadge>}
        >
          <div className="space-y-1.5">
            {MAPPINGS.map((m) => (
              <div
                key={m.from}
                className="flex items-center gap-2 p-2 rounded-lg bg-gray-50/80 border border-gray-100"
              >
                {/* From */}
                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                  <div className="h-7 w-7 rounded-lg bg-gray-200 flex items-center justify-center text-base shrink-0">
                    {m.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9px] font-bold text-gray-900 truncate">{m.from}</div>
                    <div className="text-[7px] text-gray-500">AY 2025</div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="shrink-0 flex items-center gap-1">
                  <ArrowRight className="h-3 w-3 text-[#3b82f6]" />
                  <span className="text-[8px] text-gray-500 tabular-nums">
                    {m.count} students
                  </span>
                </div>

                {/* To */}
                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                  <div className="h-7 w-7 rounded-lg bg-[#3b82f6]/20 flex items-center justify-center text-base shrink-0">
                    {m.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9px] font-bold text-[#3b82f6] truncate">{m.to}</div>
                    <div className="text-[7px] text-gray-500">AY 2026</div>
                  </div>
                </div>

                <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </DashboardShell>
  );
}
