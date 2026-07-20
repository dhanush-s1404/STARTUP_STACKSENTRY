"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";
import { useScrollPosition } from "@/hooks";

type BackToTopProps = {
  className?: string;
  threshold?: number;
};

export function BackToTop({ className, threshold = 500 }: BackToTopProps) {
  const { scrollY } = useScrollPosition();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(scrollY > threshold);
  }, [scrollY, threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full",
        "bg-white/10 backdrop-blur-sm border border-white/10 text-white/60",
        "transition-all duration-300 hover:bg-white/15 hover:text-white hover:scale-105",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        className,
      )}
      aria-label="Back to top"
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
