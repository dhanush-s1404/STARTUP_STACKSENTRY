import { cn } from "@/lib/cn";

type BadgeVariant = "default" | "blue" | "purple" | "cyan" | "green" | "amber" | "outline";
type BadgeSize = "sm" | "md";

type BadgeProps = {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
};

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-white/5 text-white/70 border-white/10",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  outline: "bg-transparent text-white/60 border-white/20",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export function Badge({ variant = "default", size = "sm", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
