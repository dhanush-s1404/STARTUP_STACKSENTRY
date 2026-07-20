"use client";

import { cn } from "@/lib/cn";

type SkeletonProps = {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string;
  height?: string;
};

const variantStyles = {
  text: "rounded-md",
  circular: "rounded-full",
  rectangular: "rounded-xl",
};

export function Skeleton({
  className,
  variant = "text",
  width,
  height,
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-white/5",
        variantStyles[variant],
        className,
      )}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
