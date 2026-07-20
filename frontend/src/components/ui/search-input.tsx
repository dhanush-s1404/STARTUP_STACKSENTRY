"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Search } from "lucide-react";

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  onSearch?: (value: string) => void;
  onClear?: () => void;
  showClearButton?: boolean;
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onSearch, onClear, showClearButton = true, value, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearch?.((e.target as HTMLInputElement).value);
      }
    };

    return (
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--color-text-muted))]" />
        <input
          ref={ref}
          type="search"
          value={value}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-10 py-2 text-sm text-white",
            "placeholder:text-[hsl(var(--color-text-muted))]",
            "transition-colors duration-200",
            "focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "[&::-webkit-search-cancel-button]:hidden",
            className,
          )}
          {...props}
        />
        {showClearButton && value && (
          <button
            onClick={() => {
              onClear?.();
              const input = ref as React.RefObject<HTMLInputElement>;
              input?.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--color-text-muted))] hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
