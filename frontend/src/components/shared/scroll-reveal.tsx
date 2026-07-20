"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "@/hooks";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
  once = true,
}: ScrollRevealProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const shouldShow = once ? isInView : isInView;

  const directionStyles: Record<string, string> = {
    up: "translate-y-10",
    down: "-translate-y-10",
    left: "translate-x-10",
    right: "-translate-x-10",
    none: "",
  };

  return (
    <div ref={ref} className={cn(className)}>
      <div
        className={cn(
          "transition-all",
          !shouldShow && "opacity-0",
          !shouldShow && directionStyles[direction],
        )}
        style={{
          transitionDuration: `${duration}s`,
          transitionDelay: `${delay}s`,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
