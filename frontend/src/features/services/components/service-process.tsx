"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/cn";
import {
  Search,
  Compass,
  PenTool,
  Code2,
  Rocket,
  HeartHandshake,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ProcessStep = {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

const steps: ProcessStep[] = [
  {
    number: 1,
    title: "Discovery & Analysis",
    description: "Understanding your business needs, goals, and technical requirements",
    icon: Search,
  },
  {
    number: 2,
    title: "Strategy & Planning",
    description: "Architecture design, technology selection, and project roadmap",
    icon: Compass,
  },
  {
    number: 3,
    title: "Design & Prototyping",
    description: "UI/UX design, wireframes, and interactive prototypes",
    icon: PenTool,
  },
  {
    number: 4,
    title: "Development & Testing",
    description: "Agile sprints, code reviews, automated testing",
    icon: Code2,
  },
  {
    number: 5,
    title: "Deployment & Launch",
    description: "CI/CD, cloud deployment, performance optimization",
    icon: Rocket,
  },
  {
    number: 6,
    title: "Support & Evolution",
    description: "24/7 monitoring, updates, and continuous improvement",
    icon: HeartHandshake,
  },
];

export function ServiceProcess() {
  return (
    <Section padding="lg" background="gradient">
      <Container>
        <Heading
          level="h2"
          description="A proven methodology that delivers results every time"
          className="mb-16"
        >
          Our Development Process
        </Heading>

        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-cyan-500/50 lg:block" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <FadeIn
                  key={step.number}
                  direction={isEven ? "left" : "right"}
                  delay={index * 0.1}
                  className="relative"
                >
                  <div
                    className={cn(
                      "flex items-center gap-8 lg:gap-0",
                      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                    )}
                  >
                    {/* Content */}
                    <div
                      className={cn(
                        "flex-1 lg:w-1/2",
                        isEven ? "lg:pr-16 lg:text-right" : "lg:pl-16"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04] hover:shadow-lg sm:p-8",
                          isEven ? "lg:ml-auto" : "lg:mr-auto"
                        )}
                      >
                        <div
                          className={cn(
                            "mb-4 flex items-center gap-3",
                            isEven ? "lg:flex-row-reverse" : ""
                          )}
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                            <Icon className="h-5 w-5 text-blue-400" />
                          </div>
                          <span className="text-sm font-medium text-white/30">
                            Step {step.number}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/50">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Center dot (desktop) */}
                    <div className="relative z-10 hidden lg:flex lg:w-0 lg:items-center lg:justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-sm">
                        <span className="text-sm font-bold text-white">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Spacer for the other side */}
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
