import { cn } from "@/lib/cn";

type StackSentryLogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeStyles = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-10 w-10",
};

const textSizeStyles = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function StackSentryLogo({ className, size = "md" }: StackSentryLogoProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600",
        sizeStyles[size],
        className,
      )}
    >
      <span className={cn("font-bold text-white", textSizeStyles[size])}>S</span>
    </div>
  );
}
