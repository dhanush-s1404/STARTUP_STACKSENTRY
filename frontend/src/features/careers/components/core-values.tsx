"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { GlowCard } from "@/components/ui/glow-card";
import { cn } from "@/lib/cn";
import {
  Lightbulb,
  ShieldCheck,
  Award,
  Users,
  TrendingUp,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type CoreValue = {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  iconBg: string;
};

const coreValues: CoreValue[] = [
  {
    title: "Innovation",
    description:
      "We challenge the status quo and explore new frontiers. Every team member is empowered to experiment, take risks, and push the boundaries of what's possible.",
    icon: Lightbulb,
    gradient: "from-amber-500/20 to-orange-500/20",
    iconBg: "from-amber-500 to-orange-500",
  },
  {
    title: "Integrity",
    description:
      "We operate with honesty and transparency in everything we do. Our commitments to customers, partners, and each other are built on a foundation of trust.",
    icon: ShieldCheck,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconBg: "from-blue-500 to-cyan-500",
  },
  {
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards. From code quality to customer interactions, we strive for excellence in every detail of our work.",
    icon: Award,
    gradient: "from-purple-500/20 to-pink-500/20",
    iconBg: "from-purple-500 to-pink-500",
  },
  {
    title: "Collaboration",
    description:
      "Great things are built together. We foster an environment where diverse perspectives come together to solve complex problems and create extraordinary outcomes.",
    icon: Users,
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconBg: "from-emerald-500 to-teal-500",
  },
  {
    title: "Growth",
    description:
      "We invest in our people and encourage continuous learning. Your development is our priority, with resources, mentorship, and opportunities to advance your career.",
    icon: TrendingUp,
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconBg: "from-cyan-500 to-blue-500",
  },
  {
    title: "Impact",
    description:
      "We measure our success by the impact we create. Every feature, every decision, and every interaction is driven by the desire to make a meaningful difference.",
    icon: Zap,
    gradient: "from-rose-500/20 to-red-500/20",
    iconBg: "from-rose-500 to-red-500",
  },
];

export function CoreValues() {
  return (
    <Section padding="lg" background="gradient">
      <Container>
        <FadeIn>
          <Heading
            level="h2"
            description="The guiding principles that shape our culture and drive everything we do"
            className="mb-12"
          >
            Our Core Values
          </Heading>
        </FadeIn>

        <Stagger staggerChildren={0.08} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((value) => {
            const Icon = value.icon;
            return (
              <StaggerItem key={value.title}>
                <GlowCard color="blue">
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8",
                      "transition-all duration-300 hover:bg-white/[0.04] hover:shadow-xl hover:-translate-y-0.5",
                    )}
                  >
                    <div
                      className={cn(
                        "pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-40 blur-2xl",
                        value.gradient,
                      )}
                    />

                    <div className="relative z-10">
                      <div
                        className={cn(
                          "mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br",
                          value.iconBg,
                        )}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>

                      <h3 className="mb-3 text-xl font-bold text-white">
                        {value.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-white/50">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </GlowCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
