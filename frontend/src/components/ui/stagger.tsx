"use client";

import { MotionDiv } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useInView } from "@/hooks";

type StaggerProps = {
  delay?: number;
  staggerChildren?: number;
  once?: boolean;
  className?: string;
  children: React.ReactNode;
};

const containerVariants = {
  hidden: {},
  visible: (custom: { staggerChildren: number; delay: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerChildren,
      delayChildren: custom.delay,
    },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function Stagger({
  delay = 0,
  staggerChildren = 0.1,
  once = true,
  className,
  children,
}: StaggerProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div ref={ref} className={cn(className)}>
      <MotionDiv
        initial="hidden"
        animate={once ? (isInView ? "visible" : "hidden") : isInView ? "visible" : "hidden"}
        variants={containerVariants}
        custom={{ staggerChildren, delay }}
      >
        {children}
      </MotionDiv>
    </div>
  );
}

type StaggerItemProps = {
  className?: string;
  children: React.ReactNode;
};

export function StaggerItem({ className, children }: StaggerItemProps) {
  return (
    <MotionDiv variants={itemVariants} className={cn(className)}>
      {children}
    </MotionDiv>
  );
}
