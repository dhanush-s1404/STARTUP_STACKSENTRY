"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks";

type CustomCursorProps = {
  className?: string;
};

export function CustomCursor({ className }: CustomCursorProps) {
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY],
  );

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isClickable =
      target.tagName === "A" ||
      target.tagName === "BUTTON" ||
      target.closest("a") ||
      target.closest("button") ||
      target.closest('[role="button"]');
    setIsHovering(!!isClickable);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  useEffect(() => {
    if (!isDesktop) return;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDesktop, handleMouseMove, handleMouseOver, handleMouseLeave, handleMouseEnter, handleMouseDown, handleMouseUp]);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        className={`pointer-events-none fixed z-[9999] ${className || ""}`}
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="h-4 w-4 rounded-full border-2 border-blue-400 bg-blue-400/20"
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-[9998]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.5 : isHovering ? 1.8 : 1,
            opacity: isVisible ? 0.3 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="h-8 w-8 rounded-full bg-blue-500/10"
        />
      </motion.div>
    </>
  );
}
