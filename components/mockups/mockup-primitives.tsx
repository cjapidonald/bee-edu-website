"use client";

import { ReactNode, useId } from "react";

/**
 * Shared primitives for KiwiBee dashboard mockups.
 * Mirrors the look of KiwiBee's real app: Apple-inspired minimal cards,
 * semantic colors per status, rounded-2xl, subtle borders and shadows.
 */

// ========================================================================
// KIWIBEE BRAND TOKENS
// ========================================================================
export const KIWIBEE = {
  primary: "#FDB714", // bright yellow
  primaryFg: "#7a4e00",
  secondary: "#E83B5E", // pink-red
  pink: "#FF6B9D",
  orange: "#FFA500",
  teal: "#00C9A7",
  glassBg: "rgba(255, 255, 255, 0.72)",
} as const;

// ========================================================================
// AVATAR — circle with initials, gradient background
// ========================================================================
export function MockAvatar({
  name,
  size = 32,
  gradientFrom = "#FDB714",
  gradientTo = "#FF6B9D",
}: {
  name: string;
  size?: number;
  gradientFrom?: string;
  gradientTo?: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-semibold shrink-0"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        fontSize: size * 0.38,
      }}
    >
      {initials}
    </div>
  );
}

// ========================================================================
// SPARKLINE — tiny SVG polyline for stat cards
// ========================================================================
export function Sparkline({
  data,
  color = "#10b981",
  width = 60,
  height = 20,
  fill = true,
  responsive = false,
}: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  responsive?: boolean;
}) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data
    .map((value, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 2) - 1;
      return `${x},${y}`;
    })
    .join(" ");

  const fillPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={responsive ? "100%" : width}
      height={responsive ? "auto" : height}
      preserveAspectRatio="xMidYMid meet"
      className="overflow-visible"
    >
      {fill && <polygon points={fillPoints} fill={color} fillOpacity={0.12} />}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ========================================================================
// MINI LINE CHART — small area chart for dashboard panels (fully responsive via viewBox)
// ========================================================================
export function MiniLineChart({
  data,
  color = "#FDB714",
  labels,
  aspectRatio = 3,
  gradientId,
}: {
  data: number[];
  color?: string;
  labels?: string[];
  aspectRatio?: number;
  gradientId?: string;
}) {
  const width = 300;
  const height = width / aspectRatio;
  const padding = { top: 8, right: 8, bottom: labels ? 16 : 4, left: 8 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pointCoords = data.map((value, i) => {
    const x = padding.left + (i / (data.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - ((value - min) / range) * chartHeight;
    return { x, y, value };
  });

  const linePath = pointCoords
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`)
    .join(" ");
  const areaPath = `${linePath} L ${pointCoords[pointCoords.length - 1].x},${
    padding.top + chartHeight
  } L ${pointCoords[0].x},${padding.top + chartHeight} Z`;

  const reactId = useId();
  const id = gradientId || `chartGradient-${color.replace("#", "")}-${reactId}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="auto"
      className="overflow-visible"
    >
      {[0.25, 0.5, 0.75].map((t) => {
        const y = padding.top + chartHeight * t;
        return (
          <line
            key={t}
            x1={padding.left}
            x2={width - padding.right}
            y1={y}
            y2={y}
            stroke="#e5e7eb"
            strokeWidth={1}
            strokeDasharray="2 4"
          />
        );
      })}

      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.25} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${id})`} />

      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {pointCoords.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={2.5}
          fill="white"
          stroke={color}
          strokeWidth={1.75}
        />
      ))}

      {labels &&
        pointCoords.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={height - 2}
            fontSize={9}
            fill="#9ca3af"
            textAnchor="middle"
          >
            {labels[i]}
          </text>
        ))}
    </svg>
  );
}

// ========================================================================
// MINI BAR CHART
// ========================================================================
export function MiniBarChart({
  data,
  color = "#E83B5E",
  width = 260,
  height = 90,
  labels,
}: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  labels?: string[];
}) {
  const padding = { top: 4, right: 4, bottom: 16, left: 4 };
  const chartHeight = height - padding.top - padding.bottom;
  const chartWidth = width - padding.left - padding.right;
  const max = Math.max(...data);
  const barGap = 4;
  const barWidth = (chartWidth - barGap * (data.length - 1)) / data.length;

  return (
    <svg width={width} height={height} className="overflow-visible">
      {data.map((value, i) => {
        const h = (value / max) * chartHeight;
        const x = padding.left + i * (barWidth + barGap);
        const y = padding.top + chartHeight - h;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={h}
              rx={3}
              fill={color}
              fillOpacity={0.85}
            />
            {labels && (
              <text
                x={x + barWidth / 2}
                y={height - 2}
                fontSize={9}
                fill="#9ca3af"
                textAnchor="middle"
              >
                {labels[i]}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ========================================================================
// STAT CARD — 6-up attendance-style summary cards
// ========================================================================
export function StatCard({
  icon: Icon,
  label,
  value,
  color = "text-gray-500",
  bg = "bg-gray-50",
  trend,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color?: string;
  bg?: string;
  trend?: string;
}) {
  return (
    <div className="rounded-2xl bg-white border border-gray-200 p-3 shadow-sm flex flex-col justify-between min-w-0">
      <div className="flex items-center justify-between mb-1.5">
        <div className={`h-6 w-6 rounded-lg ${bg} flex items-center justify-center`}>
          <Icon className={`h-3.5 w-3.5 ${color}`} />
        </div>
        {trend && (
          <span className="text-[9px] font-medium text-emerald-600">{trend}</span>
        )}
      </div>
      <div>
        <div className="text-base font-bold text-gray-900 leading-none tabular-nums">{value}</div>
        <div className="text-[10px] text-gray-500 mt-0.5 truncate">{label}</div>
      </div>
    </div>
  );
}

// ========================================================================
// PILL / BADGE
// ========================================================================
export function MockBadge({
  children,
  color = "gray",
}: {
  children: ReactNode;
  color?: "gray" | "emerald" | "amber" | "rose" | "blue" | "violet" | "yellow" | "pink";
}) {
  const colors = {
    gray: "bg-gray-100 text-gray-600",
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-700",
    blue: "bg-blue-50 text-blue-700",
    violet: "bg-violet-50 text-violet-700",
    yellow: "bg-[#FDB714]/10 text-[#a16207]",
    pink: "bg-[#E83B5E]/10 text-[#E83B5E]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-semibold ${colors[color]}`}
    >
      {children}
    </span>
  );
}

// ========================================================================
// PANEL — glass card section for dashboard
// ========================================================================
export function Panel({
  title,
  subtitle,
  right,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden ${className}`}
    >
      {(title || right) && (
        <div className="flex items-center justify-between px-3.5 pt-3 pb-2">
          <div>
            {title && (
              <div className="text-[11px] font-bold text-gray-900 leading-tight">
                {title}
              </div>
            )}
            {subtitle && (
              <div className="text-[9px] text-gray-500 mt-0.5">{subtitle}</div>
            )}
          </div>
          {right}
        </div>
      )}
      <div className="px-3.5 pb-3">{children}</div>
    </div>
  );
}
