"use client";

import { cn } from "@/lib/cn";

type ProgressBarProps = {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  color?: "blue" | "purple" | "cyan" | "emerald" | "amber" | "rose";
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  indeterminate?: boolean;
  className?: string;
};

const sizeStyles = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

const colorStyles = {
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  cyan: "bg-cyan-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
};

const glowStyles = {
  blue: "shadow-[0_0_12px_hsl(221,83%,53%,0.4)]",
  purple: "shadow-[0_0_12px_hsl(263,70%,50%,0.4)]",
  cyan: "shadow-[0_0_12px_hsl(189,94%,43%,0.4)]",
  emerald: "shadow-[0_0_12px_hsl(160,84%,39%,0.4)]",
  amber: "shadow-[0_0_12px_hsl(38,92%,50%,0.4)]",
  rose: "shadow-[0_0_12px_hsl(0,84%,60%,0.4)]",
};

export function ProgressBar({
  value,
  max = 100,
  size = "md",
  color = "blue",
  showLabel = false,
  label,
  animated = true,
  indeterminate = false,
  className,
}: ProgressBarProps) {
  const percentage = indeterminate ? 0 : Math.min((value / max) * 100, 100);

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-medium text-[hsl(var(--color-text-secondary))]">
            {label || "Progress"}
          </span>
          {!indeterminate && (
            <span className="text-xs text-[hsl(var(--color-text-muted))]">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full overflow-hidden rounded-full bg-white/5",
          sizeStyles[size],
        )}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn(
            "h-full rounded-full",
            colorStyles[color],
            animated && "transition-all duration-500 ease-out",
            !indeterminate && glowStyles[color],
          )}
          style={indeterminate ? undefined : { width: `${percentage}%` }}
        >
          {indeterminate && (
            <div className="h-full w-[40%] animate-indeterminate rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          )}
        </div>
      </div>
    </div>
  );
}
