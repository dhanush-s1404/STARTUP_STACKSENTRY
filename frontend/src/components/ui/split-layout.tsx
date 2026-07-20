"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type SplitLayoutProps = {
  left: ReactNode;
  right: ReactNode;
  ratio?: "1:1" | "1:2" | "2:1" | "1:3" | "3:1";
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
  className?: string;
};

const ratioStyles = {
  "1:1": "lg:grid-cols-2",
  "1:2": "lg:grid-cols-[1fr_2fr]",
  "2:1": "lg:grid-cols-[2fr_1fr]",
  "1:3": "lg:grid-cols-[1fr_3fr]",
  "3:1": "lg:grid-cols-[3fr_1fr]",
};

const gapStyles = {
  none: "gap-0",
  sm: "gap-4",
  md: "gap-8",
  lg: "gap-12",
  xl: "gap-16",
};

const alignStyles = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export function SplitLayout({
  left,
  right,
  ratio = "1:1",
  gap = "lg",
  align = "center",
  className,
}: SplitLayoutProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1",
        ratioStyles[ratio],
        gapStyles[gap],
        alignStyles[align],
        className,
      )}
    >
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}
