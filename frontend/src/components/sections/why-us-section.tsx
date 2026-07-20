"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { MotionDiv } from "@/lib/motion";
import {
  Lightbulb,
  ShieldCheck,
  Maximize,
  Zap,
  Code2,
  Rocket,
  Globe,
  Users,
  Eye,
  GitBranch,
} from "lucide-react";

const reasons = [
  { icon: Lightbulb, title: "Innovation", description: "Cutting-edge AI and ML integrated into every solution we build." },
  { icon: ShieldCheck, title: "Security", description: "Bank-grade encryption, SOC2 compliance, and enterprise security." },
  { icon: Maximize, title: "Scalability", description: "Architected to handle millions of users from day one." },
  { icon: Zap, title: "Performance", description: "Sub-100ms response times with optimized infrastructure." },
  { icon: Code2, title: "Clean Architecture", description: "Maintainable, testable code following industry best practices." },
  { icon: Rocket, title: "Modern Tech", description: "Latest frameworks, cloud-native, and AI-first approaches." },
  { icon: Globe, title: "Global Support", description: "24/7 support across time zones with dedicated account managers." },
  { icon: Users, title: "Dedicated Teams", description: "Embedded teams that become extensions of your organization." },
  { icon: Eye, title: "Transparency", description: "Full visibility into development with daily updates and demos." },
  { icon: GitBranch, title: "Agile Process", description: "2-week sprints with continuous delivery and feedback loops." },
];

export function WhyUsSection() {
  return (
    <Section id="why-us" padding="lg">
      <Container>
        <ScrollReveal>
          <Heading
            level="h2"
            gradient
            description="The principles and practices that make us the preferred technology partner for enterprises worldwide."
          >
            Why StackSentry
          </Heading>
        </ScrollReveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {reasons.map((reason, index) => (
            <ScrollReveal key={reason.title} delay={index * 0.05}>
              <MotionDiv
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-center transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 transition-all duration-300 group-hover:from-blue-500/20 group-hover:to-purple-500/20">
                  <reason.icon className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-white">{reason.title}</h3>
                <p className="text-xs leading-relaxed text-[hsl(var(--color-text-muted))]">
                  {reason.description}
                </p>
              </MotionDiv>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
