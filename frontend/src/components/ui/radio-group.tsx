"use client";

import { cn } from "@/lib/cn";

type RadioGroupOption = {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
};

type RadioGroupProps = {
  options: RadioGroupOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  label?: string;
  error?: string;
  direction?: "horizontal" | "vertical";
  className?: string;
};

export function RadioGroup({
  options,
  value,
  onChange,
  name,
  label,
  error,
  direction = "vertical",
  className,
}: RadioGroupProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <p className="text-sm font-medium text-[hsl(var(--color-text-secondary))]">{label}</p>
      )}
      <div
        role="radiogroup"
        aria-label={label}
        className={cn(
          direction === "horizontal" ? "flex flex-wrap gap-4" : "space-y-3",
        )}
      >
        {options.map((option) => {
          const optionId = `${name}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={cn(
                "flex items-start gap-3 rounded-xl border p-4 transition-all duration-200 cursor-pointer",
                "border-white/[0.06] bg-white/[0.02]",
                value === option.value
                  ? "border-blue-500/50 bg-blue-500/5"
                  : "hover:border-white/10 hover:bg-white/[0.04]",
                option.disabled && "cursor-not-allowed opacity-50",
              )}
            >
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange?.(option.value)}
                disabled={option.disabled}
                className="sr-only"
              />
              <div
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
                  value === option.value
                    ? "border-blue-500 bg-blue-600"
                    : "border-white/20 bg-white/5",
                )}
              >
                {value === option.value && (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </div>
              <div className="space-y-0.5">
                <span className="text-sm font-medium text-[hsl(var(--color-text-secondary))]">
                  {option.label}
                </span>
                {option.description && (
                  <p className="text-xs text-[hsl(var(--color-text-muted))]">
                    {option.description}
                  </p>
                )}
              </div>
            </label>
          );
        })}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
