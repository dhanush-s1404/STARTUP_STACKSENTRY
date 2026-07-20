"use client";

import { useState, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ChevronDown } from "lucide-react";

type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
};

type AccordionProps = {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultOpen?: string[];
  className?: string;
  itemClassName?: string;
};

export function Accordion({
  items,
  type = "single",
  defaultOpen = [],
  className,
  itemClassName,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));

  const toggleItem = useCallback(
    (id: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (type === "single") {
            next.clear();
          }
          next.add(id);
        }
        return next;
      });
    },
    [type],
  );

  return (
    <div className={cn("space-y-2", className)} role="region">
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div
            key={item.id}
            className={cn(
              "overflow-hidden rounded-xl border border-white/[0.06] transition-all duration-200",
              isOpen ? "bg-white/[0.03]" : "bg-transparent",
              itemClassName,
            )}
          >
            <button
              type="button"
              role="button"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              id={`accordion-trigger-${item.id}`}
              disabled={item.disabled}
              onClick={() => toggleItem(item.id)}
              className={cn(
                "flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium",
                "transition-colors duration-200",
                "hover:bg-white/[0.02]",
                "disabled:cursor-not-allowed disabled:opacity-50",
                isOpen ? "text-white" : "text-[hsl(var(--color-text-secondary))]",
              )}
            >
              <span className="flex items-center gap-3">
                {item.icon}
                {item.title}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-[hsl(var(--color-text-muted))] transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              id={`accordion-content-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              className={cn(
                "overflow-hidden transition-all duration-300",
                isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
              )}
            >
              <div className="px-5 pb-4 text-sm text-[hsl(var(--color-text-tertiary))]">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
