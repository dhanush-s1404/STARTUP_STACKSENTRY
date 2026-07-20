"use client";

import { forwardRef, type InputHTMLAttributes, useState } from "react";
import { cn } from "@/lib/cn";

type FloatingInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
};

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, error, hint, icon, id, type = "text", ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const isFloating = focused || hasValue;

    return (
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[hsl(var(--color-text-muted))]">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
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
            "peer h-14 w-full rounded-xl border bg-white/5 px-4 pt-5 pb-1 text-sm text-white",
            "transition-all duration-200",
            "focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25",
            "disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pl-11",
            error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/25",
            className,
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "pointer-events-none absolute left-4 text-sm transition-all duration-200",
            icon && "left-11",
            isFloating
              ? "top-1.5 text-xs text-[hsl(var(--color-text-muted))]"
              : "top-1/2 -translate-y-1/2 text-[hsl(var(--color-text-tertiary))]",
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

FloatingInput.displayName = "FloatingInput";
