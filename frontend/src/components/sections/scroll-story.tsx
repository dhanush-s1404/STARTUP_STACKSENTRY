"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";

type ScrollStoryProps = {
  children: React.ReactNode;
  className?: string;
  sectionNumber?: number;
  sectionTitle?: string;
  id?: string;
};

export function ScrollStorySection({
  children,
  className,
  sectionNumber,
  sectionTitle,
  id,
}: ScrollStoryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);

  return (
    <motion.div
      ref={ref}
      id={id}
      style={{ opacity, y }}
      className={cn("relative", className)}
    >
      {sectionNumber !== undefined && (
        <div className="pointer-events-none absolute left-4 top-0 hidden select-none text-[200px] font-bold leading-none text-white/[0.015] lg:block">
          {String(sectionNumber).padStart(2, "0")}
        </div>
      )}
      {sectionTitle && (
        <div className="pointer-events-none absolute left-4 top-8 hidden lg:block">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/20">
            {sectionTitle}
          </span>
        </div>
      )}
      {children}
    </motion.div>
  );
}

type StoryRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function StoryReveal({ children, className, delay = 0 }: StoryRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

type DividerProps = {
  text?: string;
};

export function StoryDivider({ text }: DividerProps) {
  return (
    <div className="relative flex items-center justify-center py-8">
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      {text && (
        <span className="relative z-10 rounded-full border border-white/[0.06] bg-[hsl(230,63%,4%)] px-4 py-1 text-xs font-medium text-white/30">
          {text}
        </span>
      )}
    </div>
  );
}
