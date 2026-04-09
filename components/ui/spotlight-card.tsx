"use client";

import type { LucideIcon } from "lucide-react";
import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface SpotlightItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  href?: string;
  badge?: string;
}

interface CardProps {
  item: SpotlightItem;
  dimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

function SpotlightCard({ item, dimmed, onHoverStart, onHoverEnd }: CardProps) {
  const Icon = item.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width;
    const normY = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (normY - 0.5) * -18,
      rotateY: (normX - 0.5) * 18,
    });
    setGlowPos({ x: normX * 100, y: normY * 100 });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    onHoverStart();
  }, [onHoverStart]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
    onHoverEnd();
  }, [onHoverEnd]);

  return (
    <div
      className={cn(
        "group relative flex flex-col gap-5 overflow-hidden rounded-2xl border p-6",
        "border-white/[0.06] bg-white/[0.03]",
        "transition-all duration-300 ease-out",
        "hover:border-white/[0.14]",
        dimmed && "scale-[0.96] opacity-50",
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={cardRef}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)${dimmed ? ' scale(0.96)' : ''}`,
        transition: isHovered ? 'transform 0.1s ease-out, opacity 0.3s, border-color 0.3s' : 'transform 0.4s ease-out, opacity 0.3s, border-color 0.3s',
      }}
    >
      {/* Static accent tint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at 20% 20%, ${item.color}14, transparent 65%)`,
        }}
      />

      {/* Hover glow layer — follows cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(ellipse at ${glowPos.x}% ${glowPos.y}%, ${item.color}2e, transparent 65%)`,
        }}
      />

      {/* Shimmer sweep */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[55%] -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.045] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[280%]"
      />

      {/* Icon badge */}
      <div
        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl"
        style={{
          background: `${item.color}18`,
          boxShadow: `inset 0 0 0 1px ${item.color}30`,
        }}
      >
        <Icon size={17} strokeWidth={1.9} style={{ color: item.color }} />
      </div>

      {/* Text */}
      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-[15px] tracking-tight" style={{ color: item.color }}>
            {item.title}
          </h3>
          {item.badge && (
            <span
              className="px-1.5 py-0.5 text-[9px] font-bold rounded"
              style={{ background: `${item.color}25`, color: item.color }}
            >
              {item.badge}
            </span>
          )}
        </div>
        <p className="text-[13px] text-gray-300 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Accent bottom line */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full transition-all duration-500 group-hover:w-full"
        style={{
          background: `linear-gradient(to right, ${item.color}80, transparent)`,
        }}
      />
    </div>
  );
}

export interface SpotlightCardsProps {
  items: SpotlightItem[];
  className?: string;
  columns?: 2 | 3;
}

export default function SpotlightCards({
  items,
  className,
  columns = 3,
}: SpotlightCardsProps) {
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "relative grid gap-3",
        columns === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2",
        className
      )}
    >
      {items.map((item) => (
        <SpotlightCard
          dimmed={hoveredTitle !== null && hoveredTitle !== item.title}
          item={item}
          key={item.title}
          onHoverEnd={() => setHoveredTitle(null)}
          onHoverStart={() => setHoveredTitle(item.title)}
        />
      ))}
    </div>
  );
}
