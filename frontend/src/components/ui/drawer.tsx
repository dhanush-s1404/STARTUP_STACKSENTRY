"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useLockedBody } from "@/hooks";
import { X } from "lucide-react";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
  side?: "left" | "right" | "top" | "bottom";
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
};

const sizeStyles = {
  left: {
    sm: "w-80",
    md: "w-96",
    lg: "w-[32rem]",
    xl: "w-[40rem]",
    full: "w-full",
  },
  right: {
    sm: "w-80",
    md: "w-96",
    lg: "w-[32rem]",
    xl: "w-[40rem]",
    full: "w-full",
  },
  top: {
    sm: "h-48",
    md: "h-64",
    lg: "h-80",
    xl: "h-96",
    full: "h-full",
  },
  bottom: {
    sm: "h-48",
    md: "h-64",
    lg: "h-80",
    xl: "h-96",
    full: "h-full",
  },
};

const positionStyles = {
  left: "inset-y-0 left-0",
  right: "inset-y-0 right-0",
  top: "inset-x-0 top-0",
  bottom: "inset-x-0 bottom-0",
};

const slideStyles = {
  left: "data-[state=open]:translate-x-0 data-[state=closed]:-translate-x-full",
  right: "data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full",
  top: "data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-full",
  bottom: "data-[state=open]:translate-y-0 data-[state=closed]:translate-y-full",
};

export function Drawer({
  isOpen,
  onClose,
  children,
  title,
  description,
  side = "right",
  size = "md",
  className,
}: DrawerProps) {
  useLockedBody(isOpen);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const isHorizontal = side === "left" || side === "right";

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in-scale"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "drawer-title" : undefined}
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "fixed z-50 bg-[hsl(222,40%,11%)] p-6 shadow-2xl",
          "transition-transform duration-300 ease-out",
          positionStyles[side],
          sizeStyles[side][size],
          slideStyles[side],
          isHorizontal ? "h-full" : "w-full",
          className,
        )}
      >
        {(title || description) && (
          <div className="mb-6 space-y-1">
            {title && (
              <h2 id="drawer-title" className="text-lg font-semibold text-white">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-[hsl(var(--color-text-muted))]">{description}</p>
            )}
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-[hsl(var(--color-text-muted))] transition-colors hover:bg-white/5 hover:text-white"
          aria-label="Close drawer"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}
