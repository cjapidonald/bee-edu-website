import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "animate-gradient bg-gradient-to-r from-[#16a34a] via-[#facc15] to-[#16a34a] bg-[length:300%_100%] bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
