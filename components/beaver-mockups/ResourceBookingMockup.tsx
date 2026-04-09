"use client";

import {
  LayoutDashboard,
  FolderKanban,
  Calendar,
  MapPin,
  Package,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
} from "lucide-react";
import { DashboardShell } from "./DashboardShell";
import { MockBadge, Panel } from "./mockup-primitives";
import { mt } from "@/lib/mockup-i18n";
import type { Locale } from "@/lib/i18n/config";

const ROOMS = [
  { name: "Science Lab 1", type: "Lab", bookings: 6, color: "#00C9A7" },
  { name: "Library Main", type: "Library", bookings: 4, color: "#FDB714" },
  { name: "Auditorium", type: "Hall", bookings: 2, color: "#E83B5E" },
  { name: "Art Studio", type: "Studio", bookings: 3, color: "#8b5cf6" },
];

const EQUIPMENT = [
  { name: "iPad Cart A (30)", status: "available", nextBooking: "Wed 9am" },
  { name: "Projector P1", status: "in-use", nextBooking: "Now · 5A" },
  { name: "Sound System", status: "maintenance", nextBooking: "Back Fri" },
];

// Week schedule for one room
const HOURS = ["08", "09", "10", "11", "12", "13", "14"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

// Which cells are booked — [dayIdx][hourIdx] = true/false
const BOOKINGS: boolean[][] = [
  [true, true, false, true, false, false, true],
  [false, true, true, false, false, true, false],
  [true, false, true, true, false, false, true],
  [false, true, false, true, true, false, false],
  [true, true, true, false, false, true, true],
];

export function ResourceBookingMockup({ className = "", lang = "en" }: { className?: string; lang?: Locale }) {
  return (
    <DashboardShell
      url="app.elementals.vn/resource-booking"
      tabTitle="Resource Booking"
      breadcrumb="Resource Booking · Rooms & Equipment"
      userName="Mr Le"
      userGradient={["#8b5cf6", "#00C9A7"]}
      dayBadge="Wk 12"
      dayBadgeColor="violet"
      className={className}
      lang={lang}
      navItems={[
        { icon: LayoutDashboard, label: "Dashboard" },
        { icon: FolderKanban, label: "Bookings", active: true },
        { icon: MapPin, label: "Rooms" },
        { icon: Package, label: "Equipment" },
        { icon: Calendar, label: "Calendar" },
        { icon: Users, label: "Requests" },
      ]}
    >
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="text-[14px] font-bold text-gray-900 leading-tight">Resource Booking</div>
          <div className="text-[10px] text-gray-500">
            Week 12 · 15 rooms · 24 equipment items · 42 bookings this week
          </div>
        </div>
        <button className="flex items-center gap-1 px-2 py-1 bg-[#8b5cf6] text-white rounded-lg text-[10px] font-semibold shadow-sm">
          <Plus className="h-2.5 w-2.5" />
          New Booking
        </button>
      </div>

      <div className="grid grid-cols-5 gap-2.5">
        {/* LEFT — Room calendar (3/5) */}
        <div className="col-span-3">
          <Panel
            title="Science Lab 1 — Week 12"
            subtitle="Click an empty slot to book"
            right={<MockBadge color="emerald">6 bookings</MockBadge>}
          >
            <div className="overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[28px_repeat(7,1fr)] gap-0.5 mb-0.5">
                <div />
                {HOURS.map((h) => (
                  <div
                    key={h}
                    className="text-[7px] text-gray-400 font-bold tabular-nums text-center"
                  >
                    {h}
                  </div>
                ))}
              </div>
              {/* Rows */}
              {DAYS.map((d, dIdx) => (
                <div key={d} className="grid grid-cols-[28px_repeat(7,1fr)] gap-0.5 mb-0.5">
                  <div className="text-[8px] font-bold text-gray-600 flex items-center">
                    {d}
                  </div>
                  {HOURS.map((_, hIdx) => {
                    const booked = BOOKINGS[dIdx][hIdx];
                    return (
                      <div
                        key={hIdx}
                        className={`h-5 rounded ${
                          booked
                            ? "bg-[#00C9A7]/80 border border-[#00C9A7]"
                            : "bg-gray-50 border border-dashed border-gray-200"
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* RIGHT — Rooms + Equipment (2/5) */}
        <div className="col-span-2 space-y-2.5">
          <Panel title="Popular Rooms" subtitle="This week">
            <div className="space-y-1">
              {ROOMS.map((r) => (
                <div key={r.name} className="flex items-center gap-2 py-1">
                  <div
                    className="h-6 w-6 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${r.color}20` }}
                  >
                    <MapPin className="h-3 w-3" style={{ color: r.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[9px] font-bold text-gray-900 truncate">{r.name}</div>
                    <div className="text-[7px] text-gray-500">{r.type}</div>
                  </div>
                  <span className="text-[9px] font-bold text-gray-700 tabular-nums">
                    {r.bookings}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Equipment" subtitle="Status now">
            <div className="space-y-1">
              {EQUIPMENT.map((e) => (
                <div key={e.name} className="flex items-center gap-1.5 py-0.5">
                  <div className="shrink-0">
                    {e.status === "available" && (
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    )}
                    {e.status === "in-use" && <Clock className="h-3 w-3 text-[#FDB714]" />}
                    {e.status === "maintenance" && (
                      <AlertCircle className="h-3 w-3 text-rose-500" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[9px] font-semibold text-gray-900 truncate">{e.name}</div>
                    <div className="text-[7px] text-gray-500">{e.nextBooking}</div>
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
