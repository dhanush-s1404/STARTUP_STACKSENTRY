"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type TabItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  content?: ReactNode;
  disabled?: boolean;
};

type TabsProps = {
  items: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onTabChange?: (id: string) => void;
  variant?: "default" | "pills" | "underline";
  className?: string;
  contentClassName?: string;
};

export function Tabs({
  items,
  defaultTab,
  activeTab: controlledTab,
  onTabChange,
  variant = "default",
  className,
  contentClassName,
}: TabsProps) {
  const [internalTab, setInternalTab] = useState(defaultTab || items[0]?.id);
  const activeTab = controlledTab ?? internalTab;
  const tabListRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  const handleTabChange = (id: string) => {
    if (controlledTab === undefined) {
      setInternalTab(id);
    }
    onTabChange?.(id);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, _index: number) => {
    const enabledItems = items.filter((i) => !i.disabled);
    const currentEnabledIndex = enabledItems.findIndex((i) => i.id === activeTab);
    let nextIndex: number;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        nextIndex = (currentEnabledIndex + 1) % enabledItems.length;
        handleTabChange(enabledItems[nextIndex].id);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        nextIndex = (currentEnabledIndex - 1 + enabledItems.length) % enabledItems.length;
        handleTabChange(enabledItems[nextIndex].id);
        break;
      case "Home":
        e.preventDefault();
        handleTabChange(enabledItems[0].id);
        break;
      case "End":
        e.preventDefault();
        handleTabChange(enabledItems[enabledItems.length - 1].id);
        break;
    }
  };

  // Scroll active tab into view
  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeTab]);

  const variantStyles = {
    default: "rounded-xl bg-white/[0.03] p-1",
    pills: "gap-1",
    underline: "gap-0 border-b border-white/[0.06]",
  };

  const tabStyles = {
    default: (active: boolean) =>
      cn(
        "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
        active
          ? "bg-white/10 text-white shadow-sm"
          : "text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text-secondary))] hover:bg-white/[0.03]",
      ),
    pills: (active: boolean) =>
      cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
        active
          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
          : "text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text-secondary))] hover:bg-white/[0.05]",
      ),
    underline: (active: boolean) =>
      cn(
        "relative px-4 py-3 text-sm font-medium transition-all duration-200",
        active
          ? "text-blue-400"
          : "text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text-secondary))]",
      ),
  };

  const activeItem = items.find((i) => i.id === activeTab);

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={tabListRef}
        role="tablist"
        aria-orientation="horizontal"
        className={cn("flex", variantStyles[variant])}
      >
        {items.map((item, index) => {
          const isActive = item.id === activeTab;
          return (
            <button
              key={item.id}
              ref={isActive ? activeRef : undefined}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tab-panel-${item.id}`}
              id={`tab-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              onClick={() => handleTabChange(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                tabStyles[variant](isActive),
                variant === "underline" && "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:transition-all after:duration-200",
                variant === "underline" && isActive && "after:bg-blue-500",
                variant === "underline" && !isActive && "after:bg-transparent",
                item.disabled && "cursor-not-allowed opacity-50",
              )}
            >
              <span className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      {activeItem?.content && (
        <div
          id={`tab-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          tabIndex={0}
          className={cn("mt-4", contentClassName)}
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
}
