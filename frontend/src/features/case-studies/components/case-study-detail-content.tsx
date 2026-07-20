"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import {
  Target,
  Lightbulb,
  TrendingUp,
  BarChart3,
  BookOpen,
  Map,
  Clock,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

type TimelineEvent = {
  phase: string;
  title: string;
  description: string;
  duration: string;
};

type KPIResult = {
  metric: string;
  before: string;
  after: string;
  improvement: string;
};

type CaseStudyDetailContentProps = {
  clientBackground: string;
  businessChallenge: string;
  discoveryPhase: string;
  requirements: string[];
  research: string;
  developmentProcess: string;
  deployment: string;
  results: string;
  kpis: KPIResult[];
  roi: string;
  performanceImprovements: string[];
  lessonsLearned: string[];
  futureRoadmap: string[];
  timelineEvents: TimelineEvent[];
};

export function CaseStudyDetailContent({
  clientBackground,
  businessChallenge,
  discoveryPhase,
  requirements,
  research,
  developmentProcess,
  deployment,
  results,
  kpis,
  roi,
  performanceImprovements,
  lessonsLearned,
  futureRoadmap,
  timelineEvents,
}: CaseStudyDetailContentProps) {
  return (
    <Section padding="lg" background="subtle">
      <Container size="md">
        {/* Client Background */}
        <FadeIn>
          <div className="mb-16">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Target className="h-5 w-5 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Client Background</h2>
            </div>
            <p className="text-base leading-relaxed text-white/60">
              {clientBackground}
            </p>
          </div>
        </FadeIn>

        {/* Business Challenge */}
        <FadeIn>
          <div className="mb-16">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <Lightbulb className="h-5 w-5 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Business Challenge</h2>
            </div>
            <p className="text-base leading-relaxed text-white/60">
              {businessChallenge}
            </p>
          </div>
        </FadeIn>

        {/* Discovery & Research */}
        <FadeIn>
          <div className="mb-16">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
                <BookOpen className="h-5 w-5 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Discovery & Research</h2>
            </div>
            <p className="mb-4 text-base leading-relaxed text-white/60">
              {discoveryPhase}
            </p>
            <p className="mb-4 text-base leading-relaxed text-white/60">
              {research}
            </p>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/40">
                Key Requirements
              </h3>
              <ul className="space-y-2">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        {/* Development Process */}
        <FadeIn>
          <div className="mb-16">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <Clock className="h-5 w-5 text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Development Process</h2>
            </div>
            <p className="text-base leading-relaxed text-white/60">
              {developmentProcess}
            </p>
          </div>
        </FadeIn>

        {/* Timeline */}
        <FadeIn>
          <div className="mb-16">
            <h2 className="mb-8 text-2xl font-bold text-white">Project Timeline</h2>
            <div className="relative ml-4 border-l-2 border-white/10 pl-8">
              {timelineEvents.map((event, i) => (
                <div key={i} className="relative mb-10 last:mb-0">
                  <div className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-blue-500 bg-black">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                  </div>
                  <Badge variant="blue" size="sm" className="mb-2">
                    {event.phase} &middot; {event.duration}
                  </Badge>
                  <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/50">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* KPI Results */}
        <FadeIn>
          <div className="mb-16">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <BarChart3 className="h-5 w-5 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Key Results</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {kpis.map((kpi) => (
                <div
                  key={kpi.metric}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
                >
                  <p className="text-sm text-white/40">{kpi.metric}</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-sm text-white/30 line-through">
                      {kpi.before}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                    <span className="text-xl font-bold text-white">
                      {kpi.after}
                    </span>
                  </div>
                  <Badge variant="green" size="sm" className="mt-2">
                    {kpi.improvement}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Deployment & Results */}
        <FadeIn>
          <div className="mb-16">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <TrendingUp className="h-5 w-5 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Deployment & Results</h2>
            </div>
            <p className="mb-4 text-base leading-relaxed text-white/60">
              {deployment}
            </p>
            <p className="text-base leading-relaxed text-white/60">
              {results}
            </p>
          </div>
        </FadeIn>

        {/* ROI */}
        <FadeIn>
          <div className="mb-16 rounded-xl border border-white/[0.06] bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10 p-6">
            <h2 className="mb-3 text-xl font-bold text-white">Return on Investment</h2>
            <p className="text-base leading-relaxed text-white/60">{roi}</p>
          </div>
        </FadeIn>

        {/* Performance Improvements */}
        <FadeIn>
          <div className="mb-16">
            <h2 className="mb-4 text-2xl font-bold text-white">Performance Improvements</h2>
            <ul className="space-y-3">
              {performanceImprovements.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* Lessons Learned */}
        <FadeIn>
          <div className="mb-16">
            <h2 className="mb-4 text-2xl font-bold text-white">Lessons Learned</h2>
            <ul className="space-y-3">
              {lessonsLearned.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* Future Roadmap */}
        <FadeIn>
          <div>
            <h2 className="mb-4 text-2xl font-bold text-white">Future Roadmap</h2>
            <ul className="space-y-3">
              {futureRoadmap.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                  <Map className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
