"use client";

import { cn } from "@/lib/cn";

type CheckboxGroupOption = {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
};

type CheckboxGroupProps = {
  options: CheckboxGroupOption[];
  values?: string[];
  onChange?: (values: string[]) => void;
  label?: string;
  error?: string;
  direction?: "horizontal" | "vertical";
  className?: string;
};

export function CheckboxGroup({
  options,
  values = [],
  onChange,
  label,
  error,
  direction = "vertical",
  className,
}: CheckboxGroupProps) {
  const toggleValue = (val: string) => {
    if (values.includes(val)) {
      onChange?.(values.filter((v) => v !== val));
    } else {
      onChange?.([...values, val]);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <p className="text-sm font-medium text-[hsl(var(--color-text-secondary))]">{label}</p>
      )}
      <div
        role="group"
        aria-label={label}
        className={cn(
          direction === "horizontal" ? "flex flex-wrap gap-4" : "space-y-3",
        )}
      >
        {options.map((option) => {
          const optionId = `checkbox-group-${option.value}`;
          const checked = values.includes(option.value);
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={cn(
                "flex items-start gap-3 rounded-xl border p-4 transition-all duration-200 cursor-pointer",
                "border-white/[0.06] bg-white/[0.02]",
                checked
                  ? "border-blue-500/50 bg-blue-500/5"
                  : "hover:border-white/10 hover:bg-white/[0.04]",
                option.disabled && "cursor-not-allowed opacity-50",
              )}
            >
              <input
                id={optionId}
                type="checkbox"
                checked={checked}
                onChange={() => toggleValue(option.value)}
                disabled={option.disabled}
                className="sr-only"
              />
              <div
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200",
                  checked
                    ? "border-blue-500 bg-blue-600"
                    : "border-white/20 bg-white/5",
                )}
              >
                {checked && (
                  <svg
                    className="h-3 w-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
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
