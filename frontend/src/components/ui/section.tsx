import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  as?: React.ElementType;
  background?: "none" | "gradient" | "mesh" | "subtle";
};

const paddingStyles = {
  none: "",
  sm: "py-16 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-28 md:py-36",
};

const backgroundStyles = {
  none: "",
  gradient: "bg-gradient-to-b from-transparent via-white/[0.02] to-transparent",
  mesh: "mesh-gradient",
  subtle: "bg-white/[0.01]",
};

export function Section({
  id,
  children,
  className,
  padding = "lg",
  as: Component = "section",
  background = "none",
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn("relative", paddingStyles[padding], backgroundStyles[background], className)}
    >
      {children}
    </Component>
  );
}
