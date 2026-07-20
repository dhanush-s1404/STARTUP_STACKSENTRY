"use client";

import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import {
  Heart,
  TrendingUp,
  PiggyBank,
  Plane,
  Baby,
  BookOpen,
  Monitor,
  Dumbbell,
  ShieldCheck,
  Clock,
  Target,
  Coffee,
  Phone,
  Sun,
  Lightbulb,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { BenefitData } from "@/data/careers";

const iconMap: Record<string, LucideIcon> = {
  Heart,
  TrendingUp,
  PiggyBank,
  Plane,
  Baby,
  BookOpen,
  Monitor,
  Dumbbell,
  ShieldCheck,
  Clock,
  Target,
  Coffee,
  Phone,
  Sun,
  Lightbulb,
};

const categoryConfig: Record<
  BenefitData["category"],
  { variant: "green" | "blue" | "purple" | "cyan" | "amber"; label: string }
> = {
  health: { variant: "green", label: "Health" },
  financial: { variant: "blue", label: "Financial" },
  lifestyle: { variant: "purple", label: "Lifestyle" },
  learning: { variant: "cyan", label: "Learning" },
  perks: { variant: "amber", label: "Perks" },
};

const iconGradientMap: Record<BenefitData["category"], string> = {
  health: "from-emerald-500 to-teal-500",
  financial: "from-blue-500 to-indigo-500",
  lifestyle: "from-purple-500 to-pink-500",
  learning: "from-cyan-500 to-blue-500",
  perks: "from-amber-500 to-orange-500",
};

type BenefitCardProps = {
  benefit: BenefitData;
};

export function BenefitCard({ benefit }: BenefitCardProps) {
  const Icon = iconMap[benefit.icon] || Heart;
  const { variant, label } = categoryConfig[benefit.category];
  const gradient = iconGradientMap[benefit.category];

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6",
        "backdrop-blur-sm transition-all duration-300",
        "hover:bg-white/[0.04] hover:shadow-xl hover:-translate-y-0.5",
        "hover:shadow-blue-500/5 hover:border-blue-500/10",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40",
          gradient,
        )}
      />

      <div className="relative z-10">
        <div className="mb-4 flex items-start justify-between">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br",
              gradient,
            )}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
          <Badge variant={variant} size="sm">
            {label}
          </Badge>
        </div>

        <h3 className="mb-2 text-lg font-bold text-white">{benefit.title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-white/50">
          {benefit.description}
        </p>

        <ul className="space-y-2">
          {benefit.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                <Check className="h-2.5 w-2.5 text-emerald-400" />
              </div>
              <span className="text-xs text-white/45">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
