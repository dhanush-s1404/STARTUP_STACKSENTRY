"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { cn } from "@/lib/cn";
import { Building2, Rocket, Brain, Globe, Award } from "lucide-react";

const milestones = [
  {
    year: "2024",
    title: "Company Founded",
    description:
      "StackSentry was founded with a vision to transform enterprise software through AI-powered solutions. The founding team brought together expertise from leading tech companies.",
    icon: Building2,
    color: "blue",
  },
  {
    year: "2024",
    title: "First Enterprise Client",
    description:
      "Secured our first major enterprise client, delivering a custom AI-driven automation platform that streamlined their operations by 40%.",
    icon: Rocket,
    color: "purple",
  },
  {
    year: "2025",
    title: "AI Division Launch",
    description:
      "Launched our dedicated AI research and development division, focusing on building cutting-edge machine learning models and intelligent automation tools.",
    icon: Brain,
    color: "cyan",
  },
  {
    year: "2025",
    title: "Global Expansion",
    description:
      "Expanded operations across 40+ countries, opening offices in New York, London, Singapore, and Dubai to serve a growing international client base.",
    icon: Globe,
    color: "emerald",
  },
  {
    year: "2026",
    title: "500+ Projects Delivered",
    description:
      "Reached the milestone of 500+ successful enterprise projects, serving over 200 clients worldwide with a team of 150+ skilled developers and engineers.",
    icon: Award,
    color: "blue",
  },
];

const colorClasses: Record<string, string> = {
  blue: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  purple: "border-purple-500/30 bg-purple-500/10 text-purple-400",
  cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
  emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
};

const dotColors: Record<string, string> = {
  blue: "bg-blue-500 shadow-blue-500/50",
  purple: "bg-purple-500 shadow-purple-500/50",
  cyan: "bg-cyan-500 shadow-cyan-500/50",
  emerald: "bg-emerald-500 shadow-emerald-500/50",
};

export function CompanyStory() {
  return (
    <Section id="story" padding="lg" background="subtle">
      <Container>
        <FadeIn direction="up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Badge variant="purple" size="md">Our Journey</Badge>
          </div>
          <Heading
            level="h2"
            gradient
            description="From a bold vision to a global enterprise — explore the key milestones that shaped StackSentry."
          >
            Our Journey
          </Heading>
        </FadeIn>

        <div className="relative mt-20">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px bg-gradient-to-b from-blue-500/40 via-purple-500/40 to-cyan-500/40 md:block" />

          <Stagger staggerChildren={0.2}>
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;

              return (
                <StaggerItem key={milestone.title}>
                  <div className="relative mb-16 last:mb-0">
                    {/* Timeline dot */}
                    <div className={cn(
                      "absolute left-1/2 top-6 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full shadow-lg md:block",
                      dotColors[milestone.color],
                    )} />

                    <div className={cn(
                      "flex flex-col md:flex-row gap-8 md:gap-16",
                      isLeft ? "md:flex-row" : "md:flex-row-reverse",
                    )}>
                      {/* Content card */}
                      <div className={cn(
                        "flex-1",
                        isLeft ? "md:text-right" : "md:text-left",
                      )}>
                        <div className={cn(
                          "glass-strong rounded-2xl border p-6 md:p-8",
                          colorClasses[milestone.color],
                        )}>
                          <div className={cn(
                            "mb-4 flex items-center gap-3",
                            isLeft ? "md:justify-end" : "md:justify-start",
                          )}>
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05]">
                              <milestone.icon className="h-5 w-5" />
                            </div>
                          </div>
                          <span className={cn(
                            "mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold",
                            colorClasses[milestone.color],
                          )}>
                            {milestone.year}
                          </span>
                          <h3 className="mt-3 text-xl font-semibold text-white">
                            {milestone.title}
                          </h3>
                          <p className="mt-3 text-sm text-[hsl(var(--color-text-secondary))] leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </div>

                      {/* Spacer for the other side */}
                      <div className="hidden flex-1 md:block" />
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
