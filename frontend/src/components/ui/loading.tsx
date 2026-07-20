"use client";

import { cn } from "@/lib/cn";

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "blue" | "purple" | "cyan" | "white";
  className?: string;
};

const sizeStyles = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

const colorStyles = {
  blue: "border-blue-500",
  purple: "border-purple-500",
  cyan: "border-cyan-500",
  white: "border-white",
};

export function LoadingSpinner({ size = "md", color = "blue", className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn("animate-spin rounded-full border-2 border-current border-t-transparent", sizeStyles[size], colorStyles[color], className)}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

type LoadingPageProps = {
  text?: string;
  className?: string;
};

export function LoadingPage({ text, className }: LoadingPageProps) {
  return (
    <div className={cn("flex min-h-[400px] flex-col items-center justify-center gap-4", className)}>
      <LoadingSpinner size="lg" />
      {text && (
        <p className="text-sm text-[hsl(var(--color-text-muted))]">{text}</p>
      )}
    </div>
  );
}

type LoadingOverlayProps = {
  visible?: boolean;
  text?: string;
  className?: string;
};

export function LoadingOverlay({ visible = true, text, className }: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 z-40 flex flex-col items-center justify-center rounded-xl bg-black/50 backdrop-blur-sm",
        className,
      )}
    >
      <LoadingSpinner size="lg" color="white" />
      {text && (
        <p className="mt-3 text-sm text-white/70">{text}</p>
      )}
    </div>
  );
}

type DotLoaderProps = {
  className?: string;
};

export function DotLoader({ className }: DotLoaderProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)} role="status" aria-label="Loading">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-2 w-2 rounded-full bg-blue-500 animate-dot-pulse"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
