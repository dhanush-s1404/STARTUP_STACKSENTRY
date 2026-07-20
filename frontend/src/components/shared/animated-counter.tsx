"use client";

import { useAnimatedCounter } from "@/hooks";
import { cn } from "@/lib/cn";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  className?: string;
  duration?: number;
};

export function AnimatedCounter({ value, suffix = "", prefix = "", label, className, duration = 2000 }: AnimatedCounterProps) {
  const { count, ref } = useAnimatedCounter(value, duration);

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <div className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {prefix}{count}{suffix}
      </div>
      <div className="mt-2 text-sm text-white/40">{label}</div>
    </div>
  );
}
