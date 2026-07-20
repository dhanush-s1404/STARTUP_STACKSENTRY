"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useLockedBody } from "@/hooks";
import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
};

const sizeStyles = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-3xl",
};

export function Modal({
  isOpen,
  onClose,
  children,
  className,
  title,
  description,
  size = "md",
}: ModalProps) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby={description ? "modal-description" : undefined}
        className={cn(
          "relative z-50 w-full rounded-2xl border border-white/10 bg-[hsl(240,5%,6%)] p-6 shadow-2xl",
          "animate-in fade-in zoom-in-95 duration-200",
          sizeStyles[size],
          className,
        )}
      >
        {(title || description) && (
          <div className="mb-4 space-y-1">
            {title && (
              <h2 id="modal-title" className="text-lg font-semibold text-white">
                {title}
              </h2>
            )}
            {description && (
              <p id="modal-description" className="text-sm text-white/50">
                {description}
              </p>
            )}
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/5 hover:text-white"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}
