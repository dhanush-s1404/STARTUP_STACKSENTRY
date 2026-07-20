"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import {
  Search,
  Target,
  Palette,
  Boxes,
  Code2,
  FlaskConical,
  Rocket,
  Headphones,
} from "lucide-react";

const steps = [
  { icon: Search, title: "Research", description: "Deep dive into your business, users, and market landscape." },
  { icon: Target, title: "Planning", description: "Technical architecture, roadmap, and sprint planning." },
  { icon: Palette, title: "UI/UX", description: "User research, wireframes, prototypes, and design systems." },
  { icon: Boxes, title: "Architecture", description: "Scalable system design, database modeling, and API contracts." },
  { icon: Code2, title: "Development", description: "Agile sprints with CI/CD, code reviews, and daily demos." },
  { icon: FlaskConical, title: "Testing", description: "Automated testing, performance audits, and security scans." },
  { icon: Rocket, title: "Deployment", description: "Zero-downtime deployments with monitoring and alerting." },
  { icon: Headphones, title: "Support", description: "24/7 monitoring, maintenance, and continuous improvement." },
];

export function ProcessSection() {
  return (
    <Section id="process" padding="lg" background="subtle">
      <Container>
        <ScrollReveal>
          <Heading
            level="h2"
            gradient
            description="A battle-tested methodology refined through hundreds of successful enterprise deliveries."
          >
            Our Process
          </Heading>
        </ScrollReveal>

        <div className="relative mt-16">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-cyan-500/30 lg:block" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <ScrollReveal key={step.title} delay={index * 0.08}>
                  <div className={`relative flex items-center gap-8 lg:gap-0 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                    {/* Content */}
                    <div className={`flex-1 ${isLeft ? "lg:text-right lg:pr-12" : "lg:text-left lg:pl-12"}`}>
                      <div className={`inline-flex items-center gap-3 ${!isLeft && "lg:flex-row-reverse"}`}>
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/[0.06]">
                          <step.icon className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className={isLeft ? "text-right" : "text-left"}>
                          <h3 className="text-base font-semibold text-white">{step.title}</h3>
                          <p className="mt-1 max-w-xs text-sm text-[hsl(var(--color-text-muted))]">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="relative z-10 hidden lg:flex h-4 w-4 shrink-0 items-center justify-center">
                      <div className="h-4 w-4 rounded-full border-2 border-blue-500/50 bg-[hsl(230,63%,5%)]" />
                      <div className="absolute h-2 w-2 rounded-full bg-blue-500" />
                    </div>

                    {/* Empty spacer for alternating layout */}
                    <div className="hidden flex-1 lg:block" />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Mobile layout */}
          <div className="lg:hidden">
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-cyan-500/30" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
