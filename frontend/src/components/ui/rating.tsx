"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";
import { Star } from "lucide-react";

type RatingProps = {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
  allowHalf?: boolean;
  className?: string;
};

const sizeStyles = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-7 w-7",
};

export function Rating({
  value = 0,
  onChange,
  max = 5,
  size = "md",
  readonly = false,
  allowHalf = false,
  className,
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState(0);

  const handleClick = useCallback(
    (rating: number) => {
      if (!readonly) onChange?.(rating);
    },
    [readonly, onChange],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
      if (readonly) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const isHalf = allowHalf && x < rect.width / 2;
      setHoverValue(isHalf ? index + 0.5 : index + 1);
    },
    [readonly, allowHalf],
  );

  const displayValue = hoverValue || value;

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="group"
      aria-label={`Rating: ${value} out of ${max}`}
    >
      {Array.from({ length: max }, (_, i) => {
        const rating = i + 1;
        const filled = displayValue >= rating;
        const halfFilled = !filled && displayValue >= rating - 0.5;

        return (
          <button
            key={i}
            type="button"
            disabled={readonly}
            onClick={() => handleClick(halfFilled ? rating - 0.5 : rating)}
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => setHoverValue(0)}
            className={cn(
              "relative transition-transform duration-150",
              !readonly && "cursor-pointer hover:scale-110",
              readonly && "cursor-default",
            )}
            aria-label={`${rating} star${rating > 1 ? "s" : ""}`}
          >
            {/* Background (empty) star */}
            <Star
              className={cn(
                sizeStyles[size],
                "text-white/10",
              )}
              fill="currentColor"
            />
            {/* Filled star overlay */}
            {(filled || halfFilled) && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={halfFilled ? { width: "50%" } : undefined}
              >
                <Star
                  className={cn(
                    sizeStyles[size],
                    "text-amber-400",
                    !readonly && hoverValue > 0 && "text-blue-400",
                  )}
                  fill="currentColor"
                />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
