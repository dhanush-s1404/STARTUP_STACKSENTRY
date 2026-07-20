"use client";

import { cn } from "@/lib/cn";

type OtpInputProps = {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
};

export function OtpInput({
  length = 6,
  value = "",
  onChange,
  label,
  error,
  hint,
  disabled,
  autoFocus = false,
  className,
}: OtpInputProps) {
  const digits = value.split("");

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newValue = value.slice(0, index) + value.slice(index + 1);
      onChange?.(newValue);
      // Focus previous input
      const prev = (e.target as HTMLElement).previousElementSibling as HTMLInputElement | null;
      if (prev) prev.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (e.target as HTMLElement).previousElementSibling as HTMLInputElement | null;
      if (prev) prev.focus();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = (e.target as HTMLElement).nextElementSibling as HTMLInputElement | null;
      if (next) next.focus();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/\D/g, "").slice(-1);
    if (!val) return;

    const newValue = value.slice(0, index) + val + value.slice(index + 1);
    onChange?.(newValue.slice(0, length));

    // Auto-focus next input
    const next = (e.target as HTMLElement).nextElementSibling as HTMLInputElement | null;
    if (next) next.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange?.(pasted);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-[hsl(var(--color-text-secondary))]">
          {label}
        </label>
      )}
      <div className={cn("flex items-center gap-2", className)}>
        {Array.from({ length }, (_, i) => (
          <input
            key={i}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digits[i] || ""}
            onChange={(e) => handleInput(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
            autoFocus={autoFocus && i === 0}
            disabled={disabled}
            className={cn(
              "h-12 w-12 rounded-xl border bg-white/5 text-center text-lg font-semibold text-white",
              "transition-all duration-200",
              "focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25",
              "disabled:cursor-not-allowed disabled:opacity-50",
              digits[i]
                ? "border-blue-500/50 bg-blue-500/5"
                : "border-white/10",
              error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/25",
            )}
            aria-label={`Digit ${i + 1}`}
          />
        ))}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      {hint && !error && (
        <p className="text-xs text-[hsl(var(--color-text-muted))]">{hint}</p>
      )}
    </div>
  );
}
