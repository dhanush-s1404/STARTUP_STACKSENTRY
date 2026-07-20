import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  glass?: boolean;
  hover?: boolean;
  glow?: "blue" | "purple" | "cyan" | "none";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
};

const glowStyles = {
  blue: "hover:shadow-blue-500/10 hover:border-blue-500/20",
  purple: "hover:shadow-purple-500/10 hover:border-purple-500/20",
  cyan: "hover:shadow-cyan-500/10 hover:border-cyan-500/20",
  none: "",
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass = true, hover = true, glow = "none", padding = "lg", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-2xl border border-white/[0.06] transition-all duration-300",
          glass && "bg-white/[0.02] backdrop-blur-sm",
          hover && "hover:bg-white/[0.04] hover:shadow-xl hover:-translate-y-0.5",
          glowStyles[glow],
          paddingStyles[padding],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";
