"use client";

import type { LucideIcon } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const TILT_MAX = 9;
const TILT_SPRING = { stiffness: 300, damping: 28 } as const;
const GLOW_SPRING = { stiffness: 180, damping: 22 } as const;

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

  const normX = useMotionValue(0.5);
  const normY = useMotionValue(0.5);

  const rawRotateX = useTransform(normY, [0, 1], [TILT_MAX, -TILT_MAX]);
  const rawRotateY = useTransform(normX, [0, 1], [-TILT_MAX, TILT_MAX]);

  const rotateX = useSpring(rawRotateX, TILT_SPRING);
  const rotateY = useSpring(rawRotateY, TILT_SPRING);
  const glowOpacity = useSpring(0, GLOW_SPRING);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    normX.set((e.clientX - rect.left) / rect.width);
    normY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseEnter = () => {
    glowOpacity.set(1);
    onHoverStart();
  };

  const handleMouseLeave = () => {
    normX.set(0.5);
    normY.set(0.5);
    glowOpacity.set(0);
    onHoverEnd();
  };

  return (
    <motion.div
      animate={{
        scale: dimmed ? 0.96 : 1,
        opacity: dimmed ? 0.5 : 1,
      }}
      className={cn(
        "group relative flex flex-col gap-5 overflow-hidden rounded-2xl border p-6",
        "border-white/[0.06] bg-white/[0.03] shadow-none",
        "transition-[border-color] duration-300",
        "hover:border-white/[0.14]"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {/* Static accent tint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at 20% 20%, ${item.color}14, transparent 65%)`,
        }}
      />

      {/* Hover glow layer */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(ellipse at 20% 20%, ${item.color}2e, transparent 65%)`,
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
          <h3 className="font-semibold text-[14px] text-white tracking-tight">
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
        <p className="text-[12.5px] text-white/40 leading-relaxed">
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
    </motion.div>
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
