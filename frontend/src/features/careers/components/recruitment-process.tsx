"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { HIRING_STAGES, type HiringStageData } from "@/data/careers";
import { cn } from "@/lib/cn";
import {
  FileSearch,
  Phone,
  UserRound,
  Code,
  Monitor,
  Building2,
  Users,
  Crown,
  FileCheck,
  PartyPopper,
  Lightbulb,
  Clock,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileSearch,
  Phone,
  UserRound,
  Code,
  Monitor,
  Building2,
  Users,
  Crown,
  FileCheck,
  PartyPopper,
};

const stageColors = [
  "from-blue-500 to-blue-600",
  "from-cyan-500 to-cyan-600",
  "from-purple-500 to-purple-600",
  "from-indigo-500 to-indigo-600",
  "from-violet-500 to-violet-600",
  "from-emerald-500 to-emerald-600",
  "from-teal-500 to-teal-600",
  "from-amber-500 to-amber-600",
  "from-rose-500 to-rose-600",
  "from-yellow-500 to-yellow-600",
];

function StageCard({ stage, index }: { stage: HiringStageData; index: number }) {
  const Icon = iconMap[stage.icon] || FileSearch;
  const isLeft = index % 2 === 0;
  const color = stageColors[index % stageColors.length];

  return (
    <div
      className={cn(
        "group relative flex items-start gap-6 md:gap-0",
        "md:justify-center",
      )}
    >
      {/* Desktop: alternating layout */}
      <div className="hidden md:grid md:grid-cols-[1fr_80px_1fr] md:items-start md:gap-0 w-full">
        {/* Left content */}
        <div className={cn("flex", isLeft ? "justify-end pr-8" : "justify-end pr-8")}>
          {isLeft ? (
            <div className="w-full max-w-md text-right">
              <FadeIn direction="right" delay={index * 0.08}>
                <Card className="group-hover:border-white/[0.12]">
                  <div className="space-y-3">
                    <div className="flex items-center justify-end gap-2">
                      <h3 className="text-lg font-semibold text-white">{stage.title}</h3>
                    </div>
                    <p className="text-sm text-white/50">{stage.description}</p>
                    <div className="flex items-center justify-end gap-2 text-xs text-white/40">
                      <Clock className="h-3.5 w-3.5" />
                      {stage.estimatedDuration}
                    </div>
                    {stage.tips.length > 0 && (
                      <div className="mt-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                        <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-amber-400">
                          <Lightbulb className="h-3.5 w-3.5" />
                          Tips
                        </div>
                        <ul className="space-y-1">
                          {stage.tips.map((tip) => (
                            <li key={tip} className="text-xs text-white/40">
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Card>
              </FadeIn>
            </div>
          ) : (
            <div className="w-full max-w-md" />
          )}
        </div>

        {/* Center node */}
        <div className="relative flex flex-col items-center">
          <FadeIn direction="none" delay={index * 0.08}>
            {/* Pulsing dot */}
            <div className="relative">
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-lg z-10",
                  color,
                )}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div
                className={cn(
                  "absolute inset-0 rounded-full animate-ping opacity-20 bg-gradient-to-br",
                  color,
                )}
              />
              {/* Step number */}
              <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(230,63%,5%)] text-[10px] font-bold text-white ring-2 ring-[hsl(230,63%,5%)]">
                {index + 1}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right content */}
        <div className={cn("flex", !isLeft ? "justify-start pl-8" : "justify-start pl-8")}>
          {!isLeft ? (
            <div className="w-full max-w-md">
              <FadeIn direction="left" delay={index * 0.08}>
                <Card className="group-hover:border-white/[0.12]">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-white">{stage.title}</h3>
                    </div>
                    <p className="text-sm text-white/50">{stage.description}</p>
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <Clock className="h-3.5 w-3.5" />
                      {stage.estimatedDuration}
                    </div>
                    {stage.tips.length > 0 && (
                      <div className="mt-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                        <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-amber-400">
                          <Lightbulb className="h-3.5 w-3.5" />
                          Tips
                        </div>
                        <ul className="space-y-1">
                          {stage.tips.map((tip) => (
                            <li key={tip} className="text-xs text-white/40">
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Card>
              </FadeIn>
            </div>
          ) : (
            <div className="w-full max-w-md" />
          )}
        </div>
      </div>

      {/* Mobile: single column */}
      <div className="md:hidden relative flex flex-col items-center">
        <FadeIn direction="none" delay={index * 0.08}>
          <div className="relative">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-lg z-10",
                color,
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div
              className={cn(
                "absolute inset-0 rounded-full animate-ping opacity-20 bg-gradient-to-br",
                color,
              )}
            />
            <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(230,63%,5%)] text-[10px] font-bold text-white ring-2 ring-[hsl(230,63%,5%)]">
              {index + 1}
            </div>
          </div>
        </FadeIn>
      </div>
      <div className="md:hidden flex-1">
        <FadeIn direction="up" delay={index * 0.08}>
          <Card className="group-hover:border-white/[0.12]">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">{stage.title}</h3>
              <p className="text-sm text-white/50">{stage.description}</p>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <Clock className="h-3.5 w-3.5" />
                {stage.estimatedDuration}
              </div>
              {stage.tips.length > 0 && (
                <div className="mt-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                  <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-amber-400">
                    <Lightbulb className="h-3.5 w-3.5" />
                    Tips
                  </div>
                  <ul className="space-y-1">
                    {stage.tips.map((tip) => (
                      <li key={tip} className="text-xs text-white/40">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}

export function RecruitmentProcess() {
  return (
    <Section padding="lg" background="gradient">
      <Container>
        <FadeIn direction="up">
          <Heading
            description="A transparent look at how we evaluate candidates. Each stage is designed to be fair, informative, and respectful of your time."
          >
            Our Recruitment Process
          </Heading>
        </FadeIn>

        <div className="mt-16 space-y-8 md:space-y-0 md:space-y-12">
          {HIRING_STAGES.map((stage, index) => (
            <StageCard key={stage.id} stage={stage} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
