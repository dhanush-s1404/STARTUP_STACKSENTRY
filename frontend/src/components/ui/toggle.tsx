"use client";

import { cn } from "@/lib/cn";

type ToggleProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md";
  className?: string;
};

const sizeStyles = {
  sm: { track: "h-5 w-9", thumb: "h-3.5 w-3.5", translate: "translate-x-4" },
  md: { track: "h-6 w-11", thumb: "h-4 w-4", translate: "translate-x-5" },
};

export function Toggle({
  checked = false,
  onChange,
  label,
  disabled,
  size = "md",
  className,
}: ToggleProps) {
  const styles = sizeStyles[size];

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      )}
    >
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "relative rounded-full transition-colors duration-200",
          styles.track,
          checked ? "bg-blue-600" : "bg-white/10",
        )}
      >
        <span
          className={cn(
            "absolute left-0.5 top-1/2 -translate-y-1/2 rounded-full bg-white transition-transform duration-200",
            styles.thumb,
            checked && styles.translate,
          )}
        />
      </button>
      {label && <span className="text-sm text-white/70">{label}</span>}
    </label>
  );
}
