"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { CountUp } from "@/components/ui/count-up";
import { MotionDiv } from "@/lib/motion";
import { useInView } from "@/hooks";
import {
  ArrowUpRight,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

type KPIResult = {
  metric: string;
  before: string;
  after: string;
  improvement: string;
};

type CaseStudyResultsProps = {
  kpis: KPIResult[];
  roi: string;
  performanceImprovements: string[];
};

function extractNumeric(value: string): { num: number; suffix: string } | null {
  const match = value.match(/^([\d,.]+)\s*(.*)$/);
  if (!match) return null;
  const num = parseFloat(match[1].replace(/,/g, ""));
  if (isNaN(num)) return null;
  return { num, suffix: match[2] };
}

function KPICard({ kpi, index }: { kpi: KPIResult; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const afterVal = extractNumeric(kpi.after);

  return (
    <MotionDiv
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] hover:shadow-xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-white/40">{kpi.metric}</span>
            <BarChart3 className="h-4 w-4 text-white/20" />
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-lg text-white/25 line-through decoration-white/20">
              {kpi.before}
            </span>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-emerald-400" />
            <span className="text-2xl font-bold text-white">
              {afterVal ? (
                <CountUp to={afterVal.num} suffix={afterVal.suffix ? ` ${afterVal.suffix}` : ""} duration={1.5} />
              ) : (
                kpi.after
              )}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Badge variant="green" size="sm">
              <Sparkles className="mr-1 h-3 w-3" />
              {kpi.improvement}
            </Badge>
          </div>

          <ProgressBar index={index} />
        </div>

        <div className="absolute -bottom-8 -right-8 h-20 w-20 rounded-full bg-emerald-500/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
      </div>
    </MotionDiv>
  );
}

function ProgressBar({ index }: { index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.5 });
  const width = 60 + Math.random() * 35;

  return (
    <div ref={ref} className="mt-4">
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
        <MotionDiv
          className="h-full rounded-full bg-gradient-to-r from-emerald-500/60 to-emerald-400/40"
          initial={{ width: "0%" }}
          animate={isInView ? { width: `${width}%` } : { width: "0%" }}
          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function ROICard({ roi }: { roi: string }) {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const roiVal = extractNumeric(roi);

  return (
    <FadeIn>
      <div ref={ref} className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10 p-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/10 blur-[80px]" />
          <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-purple-500/10 blur-[80px]" />
        </div>

        <div className="relative z-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
              <TrendingUp className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Return on Investment</h3>
              <p className="text-sm text-white/40">Measurable business impact</p>
            </div>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            {roiVal ? (
              <span className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                <CountUp to={roiVal.num} suffix={roiVal.suffix ? ` ${roiVal.suffix}` : ""} duration={2} />
              </span>
            ) : (
              <span className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                {roi}
              </span>
            )}
          </div>

          <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/5">
            <MotionDiv
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
              initial={{ width: "0%" }}
              animate={isInView ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function PerformanceList({ items }: { items: string[] }) {
  return (
    <FadeIn>
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">Performance Improvements</h3>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <PerformanceItem key={i} item={item} index={i} />
          ))}
        </ul>
      </div>
    </FadeIn>
  );
}

function PerformanceItem({ item, index }: { item: string; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <MotionDiv
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <li className="flex items-start gap-3 text-sm text-white/60">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
        {item}
      </li>
    </MotionDiv>
  );
}

export function CaseStudyResults({
  kpis,
  roi,
  performanceImprovements,
}: CaseStudyResultsProps) {
  return (
    <Section padding="lg" background="subtle">
      <Container size="md">
        <FadeIn>
          <Heading
            level="h2"
            description="Quantifiable outcomes that demonstrate the impact of our solutions."
          >
            <span className="inline-flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-emerald-400" />
              Key Results
            </span>
          </Heading>
        </FadeIn>

        {/* KPI Cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {kpis.map((kpi, i) => (
            <KPICard key={kpi.metric} kpi={kpi} index={i} />
          ))}
        </div>

        {/* ROI Section */}
        <div className="mt-12">
          <ROICard roi={roi} />
        </div>

        {/* Performance Improvements */}
        <div className="mt-8">
          <PerformanceList items={performanceImprovements} />
        </div>
      </Container>
    </Section>
  );
}
