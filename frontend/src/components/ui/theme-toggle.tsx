"use client";

import { cn } from "@/lib/cn";
import { useTheme } from "@/providers/theme-provider";
import { Sun, Moon, Monitor } from "lucide-react";

type ThemeToggleProps = {
  variant?: "button" | "segmented";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const themes = [
  { value: "dark" as const, icon: Moon, label: "Dark" },
  { value: "light" as const, icon: Sun, label: "Light" },
  { value: "system" as const, icon: Monitor, label: "System" },
];

export function ThemeToggle({ variant = "segmented", size = "md", className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  if (variant === "button") {
    const current = themes.find((t) => t.value === theme) || themes[0];
    const Icon = current.icon;

    return (
      <button
        onClick={() => {
          const nextIndex = (themes.findIndex((t) => t.value === theme) + 1) % themes.length;
          setTheme(themes[nextIndex].value);
        }}
        className={cn(
          "flex items-center justify-center rounded-xl transition-all duration-200",
          "bg-white/5 text-[hsl(var(--color-text-secondary))] hover:bg-white/10 hover:text-white",
          size === "sm" && "h-8 w-8",
          size === "md" && "h-10 w-10",
          size === "lg" && "h-12 w-12",
          className,
        )}
        aria-label={`Current theme: ${current.label}. Click to change.`}
      >
        <Icon className={cn(size === "sm" && "h-4 w-4", size === "md" && "h-5 w-5", size === "lg" && "h-6 w-6")} />
      </button>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex rounded-xl bg-white/5 p-1",
        className,
      )}
      role="radiogroup"
      aria-label="Theme selection"
    >
      {themes.map((t) => {
        const Icon = t.icon;
        const isActive = theme === t.value;
        return (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            role="radio"
            aria-checked={isActive}
            aria-label={`${t.label} theme`}
            className={cn(
              "relative flex items-center justify-center gap-1.5 rounded-lg font-medium transition-all duration-200",
              size === "sm" && "h-7 px-2 text-xs",
              size === "md" && "h-8 px-3 text-sm",
              size === "lg" && "h-10 px-4 text-sm",
              isActive
                ? "bg-white/10 text-white shadow-sm"
                : "text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text-secondary))]",
            )}
          >
            <Icon className={cn(size === "sm" ? "h-3 w-3" : "h-4 w-4")} />
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
