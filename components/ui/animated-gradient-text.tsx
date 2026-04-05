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
        "animate-gradient bg-gradient-to-r from-[#2866F0] via-[#60A5FA] to-[#2866F0] bg-[length:300%_100%] bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
