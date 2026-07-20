"use client";

import { motion, useScroll, useSpring } from "framer-motion";

type ScrollProgressProps = {
  variant?: "page" | "reading";
  className?: string;
};

export function ScrollProgress({ variant = "page", className }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className={`fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 ${className || ""}`}
      role="progressbar"
      aria-label={variant === "reading" ? "Reading progress" : "Page scroll progress"}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
