import { cn } from "@/lib/cn";

type CircularProgressProps = {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: "blue" | "purple" | "cyan" | "emerald" | "amber" | "rose";
  showLabel?: boolean;
  label?: string;
  className?: string;
};

const colorMap = {
  blue: "stroke-blue-500",
  purple: "stroke-purple-500",
  cyan: "stroke-cyan-500",
  emerald: "stroke-emerald-500",
  amber: "stroke-amber-500",
  rose: "stroke-rose-500",
};

const glowMap = {
  blue: "drop-shadow-[0_0_6px_hsl(221,83%,53%,0.5)]",
  purple: "drop-shadow-[0_0_6px_hsl(263,70%,50%,0.5)]",
  cyan: "drop-shadow-[0_0_6px_hsl(189,94%,43%,0.5)]",
  emerald: "drop-shadow-[0_0_6px_hsl(160,84%,39%,0.5)]",
  amber: "drop-shadow-[0_0_6px_hsl(38,92%,50%,0.5)]",
  rose: "drop-shadow-[0_0_6px_hsl(0,84%,60%,0.5)]",
};

export function CircularProgress({
  value,
  max = 100,
  size = 64,
  strokeWidth = 4,
  color = "blue",
  showLabel = false,
  label,
  className,
}: CircularProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-white/5"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(colorMap[color], glowMap[color], "transition-all duration-700 ease-out")}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-white">
            {label || `${Math.round(percentage)}%`}
          </span>
        </div>
      )}
    </div>
  );
}
