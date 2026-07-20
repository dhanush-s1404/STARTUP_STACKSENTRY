import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type GridProps = {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  as?: React.ElementType;
};

const colStyles = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
  6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6",
};

const gapStyles = {
  none: "gap-0",
  xs: "gap-2",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-10",
};

export function Grid({
  children,
  cols = 3,
  gap = "md",
  className,
  as: Component = "div",
}: GridProps) {
  return (
    <Component className={cn("grid", colStyles[cols], gapStyles[gap], className)}>
      {children}
    </Component>
  );
}
