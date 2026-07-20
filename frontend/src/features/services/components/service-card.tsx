"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { TiltCard } from "@/components/ui/tilt-card";
import { ArrowRight, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  href: string;
  className?: string;
};

export function ServiceCard({
  title,
  description,
  icon: Icon,
  features,
  href,
  className,
}: ServiceCardProps) {
  return (
    <TiltCard maxTilt={8} glare className={cn("h-full", className)}>
      <Link href={href} className="group block h-full">
        <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] hover:shadow-xl sm:p-8">
          {/* Gradient border on hover */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1), rgba(34,211,238,0.1))",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              padding: "1px",
            }}
          />

          {/* Icon */}
          <div className="relative mb-5 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-3">
            <Icon className="h-6 w-6 text-blue-400" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-blue-400">
            {title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-sm leading-relaxed text-white/50">
            {description}
          </p>

          {/* Features */}
          <ul className="mt-4 space-y-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-white/40">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                {feature}
              </li>
            ))}
          </ul>

          {/* Learn More */}
          <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 transition-all group-hover:gap-2.5">
            Learn More
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
