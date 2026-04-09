"use client";

import { ReactNode } from "react";
import { Lock } from "lucide-react";

/**
 * Mac/Safari-style browser chrome for wrapping dashboard mockups.
 * Matches Beaver's production look when visitors see the app.
 */
export function BrowserFrame({
  url = "app.elementals.vn/homeroom",
  tabTitle = "Beaver — Homeroom Dashboard",
  children,
  className = "",
  accent = "#FDB714",
}: {
  url?: string;
  tabTitle?: string;
  children: ReactNode;
  className?: string;
  accent?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl bg-[#f4f4f5] shadow-2xl shadow-black/20 ring-1 ring-black/10 overflow-hidden ${className}`}
    >
      {/* Top chrome */}
      <div className="bg-gradient-to-b from-[#fafafa] to-[#f0f0f0] border-b border-black/5">
        {/* Traffic lights + tabs */}
        <div className="flex items-center gap-3 px-4 pt-3 pb-2">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57] ring-1 ring-black/10" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e] ring-1 ring-black/10" />
            <span className="h-3 w-3 rounded-full bg-[#28c840] ring-1 ring-black/10" />
          </div>

          {/* Tab */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-t-lg shadow-sm max-w-[260px] min-w-0">
            <span
              className="h-4 w-4 rounded-sm shrink-0 flex items-center justify-center text-[10px] font-black text-white"
              style={{ background: accent }}
            >
              B
            </span>
            <span className="text-[11px] text-gray-700 truncate font-medium">
              {tabTitle}
            </span>
            <span className="ml-auto text-gray-400 text-xs leading-none">×</span>
          </div>

          <div className="ml-auto flex items-center gap-1.5 shrink-0">
            <span className="h-5 w-5 rounded bg-black/5" />
            <span className="h-5 w-5 rounded bg-black/5" />
          </div>
        </div>

        {/* URL bar */}
        <div className="flex items-center gap-2 px-4 pb-2.5">
          <div className="flex items-center gap-1.5 shrink-0">
            <button className="h-6 w-6 flex items-center justify-center text-gray-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="h-6 w-6 flex items-center justify-center text-gray-300">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <button className="h-6 w-6 flex items-center justify-center text-gray-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M1 4v6h6M23 20v-6h-6" />
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15" />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex items-center gap-1.5 bg-white rounded-md px-3 py-1 border border-black/5 shadow-inner min-w-0">
            <Lock className="h-3 w-3 text-gray-400 shrink-0" />
            <span className="text-[11px] text-gray-600 truncate">{url}</span>
          </div>
        </div>
      </div>

      {/* Content viewport */}
      <div className="relative bg-white">{children}</div>
    </div>
  );
}
