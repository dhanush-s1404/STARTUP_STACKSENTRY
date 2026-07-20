import { cn } from "@/lib/cn";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = {
  level?: HeadingLevel;
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  description?: string;
  align?: "left" | "center" | "right";
};

const levelStyles: Record<HeadingLevel, string> = {
  h1: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight",
  h2: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight",
  h3: "text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight",
  h4: "text-xl sm:text-2xl font-semibold",
  h5: "text-lg sm:text-xl font-medium",
  h6: "text-base sm:text-lg font-medium",
};

const alignStyles = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function Heading({
  level = "h2",
  children,
  className,
  gradient = false,
  description,
  align = "center",
}: HeadingProps) {
  const Tag = level;

  return (
    <div className={cn("space-y-4", alignStyles[align], className)}>
      <Tag
        className={cn(
          levelStyles[level],
          "text-white",
          gradient && "text-gradient-primary",
        )}
      >
        {children}
      </Tag>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-lg text-white/50 leading-relaxed",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
