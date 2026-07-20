"use client";

import {
  ClipboardCheck,
  Compass,
  Layers,
  Rocket,
  Zap,
  Sparkles,
  CheckCircle,
  Clock,
  Circle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/cn";
import { MotionDiv } from "@/lib/motion";
import type { IndustryData } from "@/data/industries";

const phaseIcons: LucideIcon[] = [
  ClipboardCheck,
  Compass,
  Layers,
  Rocket,
  Zap,
  Sparkles,
];

const statusConfig = {
  completed: { icon: CheckCircle, label: "Completed", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  "in-progress": { icon: Clock, label: "In Progress", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  pending: { icon: Circle, label: "Pending", color: "text-white/30", bg: "bg-white/5", border: "border-white/10" },
} as const;

type PhaseStatus = "completed" | "in-progress" | "pending";

type RoadmapPhase = {
  phase: number;
  title: string;
  duration: string;
  description: string;
};

const defaultPhases: (RoadmapPhase & { status: PhaseStatus })[] = [
  { phase: 1, title: "Assessment & Audit", duration: "2-4 weeks", description: "Evaluate current state of technology, processes, and organizational readiness to identify gaps and opportunities.", status: "completed" },
  { phase: 2, title: "Strategy & Planning", duration: "4-6 weeks", description: "Define a clear digital transformation roadmap with milestones, resource allocation, and risk mitigation strategies.", status: "completed" },
  { phase: 3, title: "Foundation Building", duration: "8-12 weeks", description: "Establish core infrastructure, data architecture, and integration frameworks to support new digital capabilities.", status: "in-progress" },
  { phase: 4, title: "Implementation", duration: "12-24 weeks", description: "Deploy solutions in iterative sprints, ensuring each module is tested, validated, and integrated with existing systems.", status: "pending" },
  { phase: 5, title: "Optimization", duration: "4-8 weeks", description: "Fine-tune system performance, scale infrastructure, and optimize workflows based on real-world usage data.", status: "pending" },
  { phase: 6, title: "Innovation", duration: "Ongoing", description: "Continuous improvement with AI-driven insights, feature expansion, and staying ahead of industry technology trends.", status: "pending" },
];

type IndustryDigitalRoadmapProps = {
  industry: IndustryData;
};

export function IndustryDigitalRoadmap({ industry }: IndustryDigitalRoadmapProps) {
  const phases = defaultPhases;

  return (
    <Section padding="lg" background="gradient">
      <Container>
        <Heading
          level="h2"
          description={`A structured transformation journey for ${industry.title.toLowerCase()} organizations`}
          className="mb-16"
        >
          Digital Transformation Roadmap
        </Heading>

        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-emerald-500/50 via-blue-500/50 to-white/10 lg:block" />

          <div className="space-y-12 lg:space-y-0">
            {phases.map((phase, index) => {
              const Icon = phaseIcons[index] ?? Sparkles;
              const status = statusConfig[phase.status];
              const StatusIcon = status.icon;
              const isEven = index % 2 === 0;
              const isActive = phase.status === "in-progress";

              return (
                <FadeIn
                  key={phase.phase}
                  direction={isEven ? "left" : "right"}
                  delay={index * 0.1}
                  className="relative"
                >
                  <div
                    className={cn(
                      "flex items-center gap-8 lg:gap-0",
                      isEven ? "lg:flex-row" : "lg:flex-row-reverse",
                    )}
                  >
                    <div
                      className={cn(
                        "flex-1 lg:w-1/2",
                        isEven ? "lg:pr-16 lg:text-right" : "lg:pl-16",
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 sm:p-8",
                          isActive
                            ? "border-blue-500/30 bg-blue-500/[0.04] shadow-lg shadow-blue-500/10"
                            : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:shadow-lg",
                          isEven ? "lg:ml-auto" : "lg:mr-auto",
                        )}
                      >
                        <div
                          className={cn(
                            "mb-4 flex items-center gap-3",
                            isEven ? "lg:flex-row-reverse" : "",
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-xl",
                              isActive
                                ? "bg-gradient-to-br from-blue-500/30 to-purple-500/30"
                                : "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
                            )}
                          >
                            <Icon className={cn("h-5 w-5", isActive ? "text-blue-300" : "text-blue-400")} />
                          </div>
                          <span className="text-sm font-medium text-white/30">
                            Phase {phase.phase}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white">{phase.title}</h3>
                        <p className="mt-1 text-xs text-white/30">{phase.duration}</p>
                        <p className="mt-2 text-sm leading-relaxed text-white/50">
                          {phase.description}
                        </p>
                        <div className={cn("mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1", status.border, status.bg)}>
                          <StatusIcon className={cn("h-3 w-3", status.color)} />
                          <span className={cn("text-xs font-medium", status.color)}>{status.label}</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 hidden lg:flex lg:w-0 lg:items-center lg:justify-center">
                      <MotionDiv
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-sm",
                          isActive
                            ? "border-blue-500/40 bg-blue-500/20 shadow-lg shadow-blue-500/20"
                            : status.border + " bg-black/50",
                        )}
                      >
                        <span className={cn("text-sm font-bold", isActive ? "text-blue-300" : "text-white")}>
                          {phase.phase}
                        </span>
                      </MotionDiv>
                    </div>

                    <div className="hidden lg:block lg:w-1/2" />
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
