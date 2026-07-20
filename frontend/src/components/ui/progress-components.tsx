"use client";

import { cn } from "@/lib/cn";

type ProgressBarProps = {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  color?: "blue" | "purple" | "cyan" | "emerald" | "gradient";
  showLabel?: boolean;
  className?: string;
  animated?: boolean;
};

const sizeStyles = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

const colorStyles = {
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  cyan: "bg-cyan-500",
  emerald: "bg-emerald-500",
  gradient: "bg-gradient-to-r from-blue-500 to-purple-500",
};

export function ProgressBar({
  value,
  max = 100,
  size = "md",
  color = "gradient",
  showLabel = false,
  className,
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs text-white/40">Progress</span>
          <span className="text-xs font-medium text-white/60">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn("w-full overflow-hidden rounded-full bg-white/5", sizeStyles[size])}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out",
            colorStyles[color],
            animated && "animate-[shimmer_2s_ease-in-out_infinite]",
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}

export function ProgressRing({
  value,
  max = 100,
  size = 64,
  strokeWidth = 4,
  color = "gradient",
  className,
}: {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: "blue" | "purple" | "cyan" | "emerald" | "gradient";
  className?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min((value / max) * 100, 100);
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-white/5"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn(
            "transition-all duration-700 ease-out",
            color === "blue" && "text-blue-500",
            color === "purple" && "text-purple-500",
            color === "cyan" && "text-cyan-500",
            color === "emerald" && "text-emerald-500",
            color === "gradient" && "text-blue-500",
          )}
        />
      </svg>
      <span className="absolute text-sm font-semibold text-white">{Math.round(percentage)}%</span>
    </div>
  );
}

export function StepProgress({
  currentStep,
  totalSteps,
  className,
}: {
  currentStep: number;
  totalSteps: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1.5 flex-1 rounded-full transition-all duration-300",
            i < currentStep
              ? "bg-gradient-to-r from-blue-500 to-purple-500"
              : i === currentStep
              ? "bg-white/20"
              : "bg-white/5",
          )}
        />
      ))}
    </div>
  );
}
