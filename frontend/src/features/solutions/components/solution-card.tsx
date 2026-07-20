"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { TiltCard } from "@/components/ui/tilt-card";
import { GlowCard } from "@/components/ui/glow-card";
import { cn } from "@/lib/cn";
import { ArrowRight, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type SolutionCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  slug: string;
};

export function SolutionCard({ title, description, icon: Icon, features, slug }: SolutionCardProps) {
  return (
    <TiltCard maxTilt={8} glare>
      <GlowCard color="blue" className="h-full">
        <Card padding="lg" hover className="group relative h-full">
          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-colors group-hover:bg-blue-500/20">
              <Icon className="h-6 w-6" />
            </div>

            <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
            <p className="mb-6 text-sm leading-relaxed text-white/50">{description}</p>

            <ul className="mb-6 flex-1 space-y-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-white/60">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/solutions/${slug}`}
              className={cn(
                "inline-flex items-center gap-1.5 text-sm font-medium text-blue-400",
                "transition-colors hover:text-blue-300",
              )}
            >
              View Solution
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Card>
      </GlowCard>
    </TiltCard>
  );
}
