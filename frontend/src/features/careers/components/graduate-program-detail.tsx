"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/cn";
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  Gift,
  Circle,
} from "lucide-react";
import type { GraduateProgramData } from "@/data/careers";

type GraduateProgramDetailProps = {
  program: GraduateProgramData;
};

export function GraduateProgramDetail({ program }: GraduateProgramDetailProps) {
  return (
    <Section padding="lg">
      <Container>
        <div className="mx-auto max-w-4xl">
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3">
              <Badge variant="blue" size="md">
                Graduate Program
              </Badge>
              <span className="inline-flex items-center gap-1.5 text-sm text-white/40">
                <Clock className="h-4 w-4" />
                {program.duration}
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
              {program.title}
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-6 text-lg leading-relaxed text-white/60">
              {program.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-10">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-white">
                <BookOpen className="h-5 w-5 text-blue-400" />
                Learning Roadmap
              </h3>
              <div className="relative ml-4 border-l-2 border-white/[0.06]">
                {program.roadmapItems.map((item, index) => {
                  const colors = [
                    "blue",
                    "purple",
                    "cyan",
                    "amber",
                    "emerald",
                    "rose",
                  ];
                  const color = colors[index % colors.length];
                  return (
                    <div key={item.step} className="relative mb-8 ml-6 last:mb-0">
                      <div
                        className={cn(
                          "absolute -left-[1.625rem] top-1 flex h-8 w-8 items-center justify-center rounded-full border-2",
                          color === "blue" && "border-blue-500/30 bg-blue-500/10",
                          color === "purple" && "border-purple-500/30 bg-purple-500/10",
                          color === "cyan" && "border-cyan-500/30 bg-cyan-500/10",
                          color === "amber" && "border-amber-500/30 bg-amber-500/10",
                          color === "emerald" && "border-emerald-500/30 bg-emerald-500/10",
                          color === "rose" && "border-rose-500/30 bg-rose-500/10",
                        )}
                      >
                        <span
                          className={cn(
                            "text-xs font-bold",
                            color === "blue" && "text-blue-400",
                            color === "purple" && "text-purple-400",
                            color === "cyan" && "text-cyan-400",
                            color === "amber" && "text-amber-400",
                            color === "emerald" && "text-emerald-400",
                            color === "rose" && "text-rose-400",
                          )}
                        >
                          {item.step}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-white/40">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="mt-10">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-white">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                Requirements
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {program.requirements.map((req) => (
                  <div
                    key={req}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span className="text-sm text-white/70">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="mt-10">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-white">
                <Gift className="h-5 w-5 text-amber-400" />
                Program Benefits
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {program.benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <Circle className="h-2 w-2 shrink-0 fill-blue-400 text-blue-400" />
                    <span className="text-sm text-white/70">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.7}>
            <div className="mt-12 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-emerald-600/20 p-8 text-center">
              <h3 className="text-2xl font-bold text-white">
                Ready to Begin?
              </h3>
              <p className="mx-auto mt-3 max-w-lg text-sm text-white/50">
                Apply now for the {program.title} and take the first step toward
                your career at StackSentry.
              </p>
              <Button
                size="lg"
                className="mt-6"
                icon={<ArrowRight className="h-5 w-5" />}
                iconPosition="right"
              >
                Apply Now
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}


