"use client";

import { ReactNode } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { BrowserFrame } from "./BrowserFrame";
import { MockAvatar, MockBadge } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

export interface NavItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

/**
 * Shared shell for all KiwiBee dashboard mockups.
 * Provides browser frame + sidebar + top bar + content area.
 * Each mockup composition just supplies its nav items, breadcrumb, and main content.
 */
export function DashboardShell({
  url,
  tabTitle,
  navItems,
  breadcrumb,
  userName,
  userGradient = ["#FDB714", "#E83B5E"] as const,
  dayBadge = "Mon",
  dayBadgeColor = "yellow",
  children,
  className = "",
  accent = "#FDB714",
  brandLetter = "K",
  brandName = "KiwiBee",
  lang = "en",
}: {
  url: string;
  tabTitle: string;
  navItems: NavItem[];
  breadcrumb: string;
  userName: string;
  userGradient?: readonly [string, string];
  dayBadge?: string;
  dayBadgeColor?: "yellow" | "emerald" | "blue" | "pink" | "violet";
  children: ReactNode;
  className?: string;
  accent?: string;
  brandLetter?: string;
  brandName?: string;
  lang?: Locale;
}) {
  return (
    <BrowserFrame url={url} tabTitle={tabTitle} accent={accent} className={className}>
      <div
        className="flex bg-gray-950 text-white"
        style={{ fontFamily: "-apple-system, system-ui, sans-serif" }}
      >
        {/* ================= SIDEBAR ================= */}
        <aside className="w-[120px] shrink-0 bg-gray-900 border-r border-gray-700/70 py-3 px-2 flex flex-col gap-0.5">
          {/* Brand */}
          <div className="flex items-center gap-1.5 px-2 pb-3 mb-1 border-b border-gray-800">
            <div
              className="h-5 w-5 rounded-md flex items-center justify-center text-white font-black text-[9px]"
              style={{ background: "linear-gradient(135deg, #16a34a, #FDB714)" }}
            >
              {brandLetter}
            </div>
            <span className="text-[10px] font-bold text-white">{brandName}</span>
          </div>

          {/* Nav items */}
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg ${
                item.active
                  ? "bg-[#FDB714]/15 text-[#FDB714] font-semibold"
                  : "text-gray-500"
              }`}
            >
              <item.icon className="h-3 w-3 shrink-0" />
              <span className="text-[9px] truncate">{item.label}</span>
            </div>
          ))}
        </aside>

        {/* ================= MAIN ================= */}
        <main className="flex-1 min-w-0 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-gray-700/70">
            <div className="flex items-center gap-2 min-w-0">
              <div className="text-[11px] font-semibold text-white truncate">
                {breadcrumb}
              </div>
              <MockBadge color={dayBadgeColor}>
                <Sun className="h-2 w-2" />
                {dayBadge}
              </MockBadge>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden md:flex items-center gap-1 px-2 py-1 bg-gray-800 rounded-md w-[120px]">
                <Search className="h-2.5 w-2.5 text-gray-400" />
                <span className="text-[9px] text-gray-400">{mt("common.search", lang)}</span>
              </div>
              <div className="relative">
                <Bell className="h-3 w-3 text-gray-500" />
                <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 bg-red-950/500 rounded-full" />
              </div>
              <div className="flex items-center gap-1">
                <MockAvatar
                  name={userName}
                  size={22}
                  gradientFrom={userGradient[0]}
                  gradientTo={userGradient[1]}
                />
                <ChevronDown className="h-2 w-2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Content area */}
          <div className="p-3 bg-gray-950">{children}</div>
        </main>
      </div>
    </BrowserFrame>
  );
}
