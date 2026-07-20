"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { X, SlidersHorizontal } from "lucide-react";
import { Checkbox } from "./checkbox";
import { Select } from "./select";

type FilterOption = {
  label: string;
  value: string;
};

type FilterField = {
  id: string;
  label: string;
  type: "checkbox" | "select" | "radio";
  options: FilterOption[];
};

type FilterPanelProps = {
  filters: FilterField[];
  values?: Record<string, string[]>;
  onChange?: (values: Record<string, string[]>) => void;
  onReset?: () => void;
  className?: string;
};

export function FilterPanel({
  filters,
  values = {},
  onChange,
  onReset,
  className,
}: FilterPanelProps) {
  const [localValues, setLocalValues] = useState<Record<string, string[]>>(values);
  const [isOpen, setIsOpen] = useState(false);

  const activeCount = Object.values(localValues).reduce(
    (count, arr) => count + (arr?.length || 0),
    0,
  );

  const toggleValue = (filterId: string, val: string) => {
    setLocalValues((prev) => {
      const current = prev[filterId] || [];
      const next = current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val];
      const updated = { ...prev, [filterId]: next };
      onChange?.(updated);
      return updated;
    });
  };

  const handleReset = () => {
    const empty: Record<string, string[]> = {};
    filters.forEach((f) => (empty[f.id] = []));
    setLocalValues(empty);
    onChange?.(empty);
    onReset?.();
  };

  return (
    <div className={cn("relative", className)}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all",
          activeCount > 0
            ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
            : "border-white/10 bg-white/5 text-[hsl(var(--color-text-secondary))] hover:bg-white/10",
        )}
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {activeCount > 0 && (
          <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
            {activeCount}
          </span>
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          className={cn(
            "absolute left-0 z-50 mt-2 w-72 rounded-xl border border-white/10 bg-[hsl(222,40%,11%)] p-4 shadow-xl",
            "animate-slide-up-fade",
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Filters</h3>
            <div className="flex items-center gap-2">
              {activeCount > 0 && (
                <button
                  onClick={handleReset}
                  className="text-xs text-[hsl(var(--color-text-muted))] hover:text-white transition-colors"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md p-1 text-[hsl(var(--color-text-muted))] hover:bg-white/5 hover:text-white"
                aria-label="Close filters"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {filters.map((filter) => (
              <div key={filter.id} className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--color-text-muted))]">
                  {filter.label}
                </p>
                {filter.type === "checkbox" && (
                  <div className="space-y-2">
                    {filter.options.map((option) => (
                      <Checkbox
                        key={option.value}
                        label={option.label}
                        checked={(localValues[filter.id] || []).includes(option.value)}
                        onChange={() => toggleValue(filter.id, option.value)}
                        size="sm"
                      />
                    ))}
                  </div>
                )}
                {filter.type === "select" && (
                  <Select
                    options={filter.options}
                    value={(localValues[filter.id] || [])[0] || ""}
                    onChange={(val) => {
                      setLocalValues((prev) => ({
                        ...prev,
                        [filter.id]: val ? [val] : [],
                      }));
                      onChange?.({
                        ...localValues,
                        [filter.id]: val ? [val] : [],
                      });
                    }}
                    placeholder={`Select ${filter.label}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
