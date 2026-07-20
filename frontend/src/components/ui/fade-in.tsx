"use client";

import { MotionDiv } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useInView } from "@/hooks";

type FadeInProps = {
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function FadeIn({
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 30,
  once = true,
  className,
  children,
}: FadeInProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const variants = {
    hidden: { opacity: 0, ...directionMap[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div ref={ref} className={cn(className)}>
      <MotionDiv
        initial="hidden"
        animate={once ? (isInView ? "visible" : "hidden") : isInView ? "visible" : "hidden"}
        variants={variants}
      >
        {children}
      </MotionDiv>
    </div>
  );
}
