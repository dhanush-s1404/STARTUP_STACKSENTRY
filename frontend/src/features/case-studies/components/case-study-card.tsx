"use client";

import Link from "next/link";
import { MotionDiv } from "@/lib/motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star } from "lucide-react";

type KPI = {
  metric: string;
  improvement: string;
};

type CaseStudyCardProps = {
  slug: string;
  title: string;
  subtitle: string;
  heroImageUrl?: string;
  clientBackground?: string;
  kpis: KPI[];
  technologiesUsed: string[];
  isFeatured: boolean;
};

export function CaseStudyCard({
  slug,
  title,
  subtitle,
  kpis,
  technologiesUsed,
  isFeatured,
}: CaseStudyCardProps) {
  return (
    <MotionDiv whileHover={{ y: -6 }} className="group h-full">
      <Link href={`/case-studies/${slug}`} className="block h-full">
        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] hover:shadow-xl">
          {/* Gradient border on hover */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1), rgba(34,211,238,0.1))",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              padding: "1px",
            }}
          />

          {/* Hero image area */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-cyan-600/20">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            {isFeatured && (
              <div className="absolute right-3 top-3 z-10">
                <Badge variant="amber" size="sm">
                  <Star className="mr-1 h-3 w-3 fill-current" />
                  Featured
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-blue-400">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              {subtitle}
            </p>

            {/* KPI badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              {kpis.map((kpi) => (
                <Badge key={kpi.metric} variant="green" size="sm">
                  {kpi.metric}: {kpi.improvement}
                </Badge>
              ))}
            </div>

            {/* Technology pills */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {technologiesUsed.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-white/40"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-auto pt-6">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 transition-all group-hover:gap-2.5">
                Read Case Study
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </MotionDiv>
  );
}
