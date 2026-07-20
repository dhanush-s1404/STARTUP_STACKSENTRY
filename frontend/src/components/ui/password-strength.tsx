"use client";

import { cn } from "@/lib/cn";

type PasswordStrengthProps = {
  password?: string;
  className?: string;
  showLabel?: boolean;
};

type StrengthLevel = {
  label: string;
  score: number;
  color: string;
  bgColor: string;
};

function getPasswordStrength(password: string): StrengthLevel {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { label: "Weak", score: 1, color: "bg-red-500", bgColor: "text-red-400" };
  if (score <= 3) return { label: "Fair", score: 2, color: "bg-amber-500", bgColor: "text-amber-400" };
  if (score <= 4) return { label: "Good", score: 3, color: "bg-blue-500", bgColor: "text-blue-400" };
  return { label: "Strong", score: 4, color: "bg-emerald-500", bgColor: "text-emerald-400" };
}

export function PasswordStrength({ password = "", className, showLabel = true }: PasswordStrengthProps) {
  const strength = getPasswordStrength(password);

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex gap-1.5">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              i < strength.score ? strength.color : "bg-white/10",
            )}
          />
        ))}
      </div>
      {showLabel && password.length > 0 && (
        <p className={cn("text-xs font-medium", strength.bgColor)}>
          {strength.label}
        </p>
      )}
    </div>
  );
}
