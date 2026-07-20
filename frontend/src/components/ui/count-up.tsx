"use client";

import { MotionSpan } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useInView } from "@/hooks";

type CountUpProps = {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

export function CountUp({
  from = 0,
  to,
  duration = 2,
  suffix = "",
  prefix = "",
  className,
}: CountUpProps) {
  const { ref, isInView } = useInView({ threshold: 0.5 });

  return (
    <span ref={ref} className={cn(className)}>
      <MotionSpan
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      >
        <MotionSpan
          initial={{ n: from }}
          animate={isInView ? { n: to } : { n: from }}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
        >
          {({ n }: { n: number }) => (
            <>
              {prefix}
              {Number.isInteger(to) ? Math.round(n).toLocaleString() : n.toFixed(2)}
              {suffix}
            </>
          )}
        </MotionSpan>
      </MotionSpan>
    </span>
  );
}
