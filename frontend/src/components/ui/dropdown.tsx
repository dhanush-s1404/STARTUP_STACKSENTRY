"use client";

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ChevronDown } from "lucide-react";

type DropdownItem = {
  label: string;
  value: string;
  icon?: ReactNode;
  description?: string;
  disabled?: boolean;
  separator?: boolean;
};

type DropdownProps = {
  items: DropdownItem[];
  value?: string;
  onSelect?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  align?: "left" | "right";
};

export function Dropdown({
  items,
  value,
  onSelect,
  placeholder = "Select...",
  label,
  error,
  disabled,
  className,
  align = "left",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedItem = items.find((i) => i.value === value);
  const enabledItems = items.filter((i) => !i.separator && !i.disabled);

  const close = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(-1);
    buttonRef.current?.focus();
  }, []);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setHighlightedIndex(0);
        } else {
          setHighlightedIndex((prev) =>
            Math.min(prev + 1, enabledItems.length - 1),
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0) {
          onSelect?.(enabledItems[highlightedIndex].value);
          close();
        } else {
          setIsOpen(true);
          setHighlightedIndex(0);
        }
        break;
    }
  };

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-[hsl(var(--color-text-secondary))]">
          {label}
        </label>
      )}
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={() => {
          if (!disabled) setIsOpen(!isOpen);
        }}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-lg border bg-white/5 px-3 py-2 text-sm text-white",
          "transition-colors duration-200",
          "focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25",
          "disabled:cursor-not-allowed disabled:opacity-50",
          isOpen ? "border-blue-500/50" : "border-white/10",
          error && "border-red-500/50",
        )}
      >
        <span className={cn(!selectedItem && "text-[hsl(var(--color-text-muted))]")}>
          {selectedItem ? (
            <span className="flex items-center gap-2">
              {selectedItem.icon}
              {selectedItem.label}
            </span>
          ) : (
            placeholder
          )}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-[hsl(var(--color-text-muted))] transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>
      {isOpen && (
        <div
          role="listbox"
          className={cn(
            "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-white/10 bg-[hsl(222,40%,11%)] p-1 shadow-xl",
            "animate-slide-up-fade",
            align === "right" && "right-0",
          )}
        >
          {items.map((item) => {
            if (item.separator) {
              return <div key={item.label} className="my-1 h-px bg-white/[0.06]" />;
            }
            const isSelected = item.value === value;
            return (
              <button
                key={item.value}
                role="option"
                aria-selected={isSelected}
                disabled={item.disabled}
                onClick={() => {
                  onSelect?.(item.value);
                  close();
                }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                  isSelected
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-[hsl(var(--color-text-secondary))] hover:bg-white/[0.05] hover:text-white",
                  item.disabled && "cursor-not-allowed opacity-50",
                )}
              >
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                <div className="flex-1 text-left">
                  <div>{item.label}</div>
                  {item.description && (
                    <div className="text-xs text-[hsl(var(--color-text-muted))]">
                      {item.description}
                    </div>
                  )}
                </div>
                {isSelected && (
                  <svg className="h-4 w-4 shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
