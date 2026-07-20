"use client";

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type PopoverProps = {
  children: ReactNode;
  content: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  trigger?: "click" | "hover";
  className?: string;
  contentClassName?: string;
};

export function Popover({
  children,
  content,
  side = "bottom",
  align = "center",
  trigger = "click",
  className,
  contentClassName,
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, close]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  const positionStyles = {
    top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
    bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
    left: "right-full top-1/2 mr-2 -translate-y-1/2",
    right: "left-full top-1/2 ml-2 -translate-y-1/2",
  };

  const alignOffset = {
    start: side === "top" || side === "bottom" ? "left-0 -translate-x-0" : "",
    center: "",
    end: side === "top" || side === "bottom" ? "right-0 translate-x-0" : "",
  };

  const triggerProps =
    trigger === "hover"
      ? {
          onMouseEnter: () => setIsOpen(true),
          onMouseLeave: close,
        }
      : {
          onClick: () => setIsOpen(!isOpen),
        };

  return (
    <div ref={containerRef} className={cn("relative inline-flex", className)}>
      <div {...triggerProps}>{children}</div>
      {isOpen && (
        <div
          role="tooltip"
          className={cn(
            "absolute z-50 min-w-[200px] rounded-xl border border-white/10 bg-[hsl(222,40%,11%)] p-3 shadow-xl",
            "animate-slide-up-fade",
            positionStyles[side],
            align !== "center" && alignOffset[align],
            contentClassName,
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
