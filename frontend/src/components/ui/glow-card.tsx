"use client";

import { MotionDiv } from "@/lib/motion";
import { cn } from "@/lib/cn";

type GlowCardProps = {
  color?: "blue" | "purple" | "cyan" | "emerald";
  children: React.ReactNode;
  className?: string;
};

const colorMap = {
  blue: "hsl(221,83%,53%)",
  purple: "hsl(263,70%,50%)",
  cyan: "hsl(189,94%,43%)",
  emerald: "hsl(160,84%,39%)",
};

export function GlowCard({ color = "blue", children, className }: GlowCardProps) {
  return (
    <MotionDiv
      whileHover={{ scale: 1.02 }}
      className={cn("group relative overflow-hidden rounded-2xl", className)}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 50%), ${colorMap[color]}22, transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </MotionDiv>
  );
}
