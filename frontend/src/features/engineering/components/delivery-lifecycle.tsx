"use client";

import {
  Search,
  PenTool,
  Palette,
  Code2,
  TestTube,
  Rocket,
  LifeBuoy,
  RefreshCw,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { cn } from "@/lib/cn";

const PHASES = [
  {
    icon: Search,
    title: "Discovery",
    description: "Understanding business goals, user needs, and technical constraints through stakeholder interviews and research.",
    duration: "1-2 weeks",
    color: "blue",
  },
  {
    icon: PenTool,
    title: "Planning",
    description: "Defining project scope, milestones, technical architecture, and resource allocation with detailed roadmaps.",
    duration: "1-2 weeks",
    color: "purple",
  },
  {
    icon: Palette,
    title: "Design",
    description: "Creating wireframes, prototypes, and UI/UX designs with user testing and iterative refinement.",
    duration: "2-4 weeks",
    color: "cyan",
  },
  {
    icon: Code2,
    title: "Development",
    description: "Building the application with agile sprints, daily standups, and continuous integration.",
    duration: "4-12 weeks",
    color: "green",
  },
  {
    icon: TestTube,
    title: "Testing",
    description: "Comprehensive QA with automated testing, user acceptance testing, and performance validation.",
    duration: "2-4 weeks",
    color: "amber",
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Production deployment with monitoring, rollback plans, and staged rollouts for risk mitigation.",
    duration: "1 week",
    color: "blue",
  },
  {
    icon: LifeBuoy,
    title: "Support",
    description: "Post-launch monitoring, bug fixes, performance tuning, and user feedback incorporation.",
    duration: "Ongoing",
    color: "purple",
  },
  {
    icon: RefreshCw,
    title: "Continuous Improvement",
    description: "Regular retrospectives, feature iterations, and technology upgrades to keep the product competitive.",
    duration: "Ongoing",
    color: "cyan",
  },
];

const COLOR_MAP: Record<string, { badge: "blue" | "purple" | "cyan" | "green" | "amber"; dot: string }> = {
  blue: { badge: "blue", dot: "bg-blue-500" },
  purple: { badge: "purple", dot: "bg-purple-500" },
  cyan: { badge: "cyan", dot: "bg-cyan-500" },
  green: { badge: "green", dot: "bg-emerald-500" },
  amber: { badge: "amber", dot: "bg-amber-500" },
};

export function DeliveryLifecycle() {
  return (
    <Section id="lifecycle" padding="lg" background="gradient">
      <Container>
        <FadeIn direction="up">
          <Heading
            level="h2"
            gradient
            description="Our end-to-end delivery process — from discovery to continuous improvement."
            className="mb-16"
          >
            Delivery Lifecycle
          </Heading>
        </FadeIn>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/40 via-purple-500/40 to-cyan-500/40 sm:left-1/2" />

          <div className="space-y-8">
            {PHASES.map((phase, index) => {
              const isLeft = index % 2 === 0;
              const colors = COLOR_MAP[phase.color] || COLOR_MAP.blue;

              return (
                <Stagger key={phase.title} staggerChildren={0.1}>
                  <StaggerItem>
                    <div className="relative flex items-start gap-4 sm:gap-0">
                      <div className="hidden sm:flex absolute left-1/2 top-6 z-10 h-4 w-4 -translate-x-1/2 items-center justify-center">
                        <div className={`h-3 w-3 rounded-full ${colors.dot} ring-4 ring-[hsl(230,63%,5%)]`} />
                      </div>

                      <div
                        className={cn(
                          "flex w-full sm:w-[calc(50%-2rem)]",
                          isLeft ? "sm:mr-auto sm:pr-8" : "sm:ml-auto sm:pl-8",
                        )}
                      >
                        <Card glass hover padding="md" className="w-full">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 sm:hidden">
                              <phase.icon className="h-5 w-5 text-white/70" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-white">{phase.title}</h3>
                                <Badge variant={colors.badge} size="sm">
                                  {phase.duration}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <p className="mt-3 text-sm text-white/50 leading-relaxed">{phase.description}</p>
                        </Card>
                      </div>
                    </div>
                  </StaggerItem>
                </Stagger>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
