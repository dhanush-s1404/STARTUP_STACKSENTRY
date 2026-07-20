"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  label?: string;
  error?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
};

const sizeStyles = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const dotSizeStyles = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
  lg: "h-2.5 w-2.5",
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, error, description, size = "md", id, disabled, ...props }, ref) => {
    const radioId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <label
        htmlFor={radioId}
        className={cn(
          "flex items-start gap-3 cursor-pointer",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <div className="relative flex items-center pt-0.5">
          <input
            ref={ref}
            id={radioId}
            type="radio"
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "flex items-center justify-center rounded-full border transition-all duration-200",
              sizeStyles[size],
              "border-white/20 bg-white/5",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[hsl(230,63%,5%)]",
              "peer-checked:border-blue-500",
              "peer-hover:border-white/30",
              error && "border-red-500/50",
              !disabled && "peer-active:scale-95",
            )}
          >
            <div
              className={cn(
                "rounded-full bg-white opacity-0 transition-all duration-150 scale-0",
                dotSizeStyles[size],
                "peer-checked:opacity-100 peer-checked:scale-100",
              )}
            />
          </div>
        </div>
        {(label || description) && (
          <div className="space-y-0.5">
            {label && (
              <span className="text-sm font-medium text-[hsl(var(--color-text-secondary))]">
                {label}
              </span>
            )}
            {description && (
              <p className="text-xs text-[hsl(var(--color-text-muted))]">{description}</p>
            )}
            {error && <p className="text-xs text-red-400">{error}</p>}
          </div>
        )}
      </label>
    );
  },
);

Radio.displayName = "Radio";
