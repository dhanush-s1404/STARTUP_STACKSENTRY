/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  motion,
  AnimatePresence,
  useInView as useFramerInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { forwardRef, type CSSProperties, type ReactNode } from "react";

type AnimationProps = {
  initial?: any;
  animate?: any;
  exit?: any;
  variants?: any;
  transition?: any;
  whileHover?: any;
  whileTap?: any;
  whileFocus?: any;
  whileDrag?: any;
  whileInView?: any;
  viewport?: any;
  layout?: boolean | string;
  layoutId?: string;
  drag?: boolean | "x" | "y";
  dragConstraints?: any;
  dragElastic?: number;
  onAnimationStart?: () => void;
  onUpdate?: (latest: Record<string, any>) => void;
};

type IntrinsicTag = "div" | "span" | "section" | "h1" | "h2" | "p" | "a" | "button" | "li" | "nav" | "footer";

function createMotionComponent<Tag extends IntrinsicTag>(tag: Tag) {
  const MotionComp = (motion as any)[tag];
  return forwardRef<any, Record<string, any> & AnimationProps & { className?: string; style?: CSSProperties; children?: ReactNode }>(
    (props, ref) => <MotionComp ref={ref} {...props} />,
  );
}

export const MotionDiv = createMotionComponent("div");
export const MotionSpan = createMotionComponent("span");
export const MotionSection = createMotionComponent("section");
export const MotionH1 = createMotionComponent("h1");
export const MotionH2 = createMotionComponent("h2");
export const MotionP = createMotionComponent("p");
export const MotionA = createMotionComponent("a");
export const MotionButton = createMotionComponent("button");
export const MotionLi = createMotionComponent("li");
export const MotionNav = createMotionComponent("nav");
export const MotionFooter = createMotionComponent("footer");

export { AnimatePresence };
export { useMotionValue, useSpring, useMotionTemplate, useScroll, useTransform };

export function useInView(ref: React.RefObject<HTMLElement | null>, options?: { once?: boolean; amount?: number }) {
  return useFramerInView(ref as any, { amount: 0.1, ...options } as any);
}
