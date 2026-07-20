import { cn } from "@/lib/cn";
import { getInitials } from "@/utils";

type AvatarProps = {
  src?: string;
  alt: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizeStyles = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export function Avatar({ src, alt, name, size = "md", className }: AvatarProps) {
  const initials = getInitials(name);

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(
          "rounded-full object-cover ring-2 ring-white/10",
          sizeStyles[size],
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 font-medium text-white ring-2 ring-white/10",
        sizeStyles[size],
        className,
      )}
      aria-label={alt}
    >
      {initials}
    </div>
  );
}
