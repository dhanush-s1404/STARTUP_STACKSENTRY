"use client";

import { forwardRef, type TextareaHTMLAttributes, useState } from "react";
import { cn } from "@/lib/cn";

type FloatingTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const textareaId = id || label.toLowerCase().replace(/\s+/g, "-");
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const isFloating = focused || hasValue;

    return (
      <div className="relative">
        <textarea
          ref={ref}
          id={textareaId}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(!!e.target.value);
          }}
          onChange={(e) => {
            setHasValue(!!e.target.value);
            props.onChange?.(e);
          }}
          placeholder=" "
          className={cn(
            "peer min-h-[140px] w-full resize-none rounded-xl border bg-white/5 px-4 pt-5 pb-1 text-sm text-white",
            "transition-all duration-200",
            "focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/25",
            className,
          )}
          {...props}
        />
        <label
          htmlFor={textareaId}
          className={cn(
            "pointer-events-none absolute left-4 text-sm transition-all duration-200",
            isFloating
              ? "top-1.5 text-xs text-[hsl(var(--color-text-muted))]"
              : "top-4 text-[hsl(var(--color-text-tertiary))]",
          )}
        >
          {label}
        </label>
        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
        {hint && !error && (
          <p className="mt-1.5 text-xs text-[hsl(var(--color-text-muted))]">{hint}</p>
        )}
      </div>
    );
  },
);

FloatingTextarea.displayName = "FloatingTextarea";
