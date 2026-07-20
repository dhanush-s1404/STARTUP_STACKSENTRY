"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { CountUp } from "@/components/ui/count-up";
import { cn } from "@/lib/cn";
import { Lightbulb, BookOpen, Users, Globe, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type CulturePillar = {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  keyPoints: string[];
  stat: { value: number; suffix: string; label: string };
};

const pillars: CulturePillar[] = [
  {
    title: "Innovation",
    description:
      "We dedicate time and resources to explore new ideas, experiment with emerging technologies, and push the boundaries of what's possible. Innovation isn't just encouraged — it's embedded in how we work.",
    icon: Lightbulb,
    gradient: "from-amber-500 to-orange-500",
    keyPoints: [
      "Quarterly hackathons for experimentation",
      "10% time for personal exploration projects",
      "Innovation award program with cash prizes",
      "Internal incubator for new product ideas",
    ],
    stat: { value: 50, suffix: "+", label: "Projects per year" },
  },
  {
    title: "Learning",
    description:
      "Continuous learning is core to our DNA. We provide structured programs, budgets, and a supportive environment to help every team member grow their skills and advance their career.",
    icon: BookOpen,
    gradient: "from-cyan-500 to-blue-500",
    keyPoints: [
      "$3,000 annual learning budget per employee",
      "Internal tech talks and lunch-and-learns",
      "Online course subscriptions included",
      "Certification support and reimbursement",
    ],
    stat: { value: 200, suffix: "+", label: "Learning hours / year" },
  },
  {
    title: "Mentorship",
    description:
      "Every team member has access to mentorship from experienced leaders. We pair new hires with dedicated mentors and run structured programs to accelerate career growth at every level.",
    icon: Users,
    gradient: "from-emerald-500 to-teal-500",
    keyPoints: [
      "Dedicated onboarding buddy for first 90 days",
      "Senior mentorship program at all levels",
      "Regular career development conversations",
      "Cross-team knowledge sharing sessions",
    ],
    stat: { value: 95, suffix: "%", label: "Mentee satisfaction" },
  },
  {
    title: "Community",
    description:
      "We build strong bonds within our teams and with the broader tech community. From team offsites to open source contributions, we believe in the power of community to drive impact.",
    icon: Globe,
    gradient: "from-rose-500 to-purple-500",
    keyPoints: [
      "Annual company retreat at inspiring locations",
      "Employee resource groups and affinity clubs",
      "Open source contribution support",
      "Community volunteer programs and events",
    ],
    stat: { value: 16, suffix: "h", label: "Volunteer hours / year" },
  },
];

export function CultureSection() {
  return (
    <Section padding="lg" background="gradient">
      <Container>
        <FadeIn>
          <Heading
            level="h2"
            description="The four pillars that define how we work, learn, and grow together"
            className="mb-16"
          >
            Our Work Culture
          </Heading>
        </FadeIn>

        <div className="space-y-20">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const isReversed = index % 2 !== 0;

            return (
              <FadeIn key={pillar.title} delay={0.1}>
                <div
                  className={cn(
                    "grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center",
                    isReversed && "lg:[direction:rtl]",
                  )}
                >
                  {/* Visual */}
                  <div className="lg:[direction:ltr]">
                    <div
                      className={cn(
                        "relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-10",
                      )}
                    >
                      <div
                        className={cn(
                          "pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br opacity-30 blur-3xl",
                          pillar.gradient,
                        )}
                      />

                      <div className="relative z-10 flex flex-col items-center text-center">
                        <div
                          className={cn(
                            "mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br",
                            pillar.gradient,
                          )}
                        >
                          <Icon className="h-10 w-10 text-white" />
                        </div>

                        <h3 className="mb-4 text-2xl font-bold text-white">
                          {pillar.title}
                        </h3>

                        <div className="grid w-full grid-cols-1 gap-4">
                          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
                            <div className="text-3xl font-bold text-white">
                              <CountUp
                                to={pillar.stat.value}
                                suffix={pillar.stat.suffix}
                                duration={2}
                              />
                            </div>
                            <div className="mt-1 text-xs text-white/40">
                              {pillar.stat.label}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:[direction:ltr]">
                    <Stagger staggerChildren={0.05}>
                      <StaggerItem>
                        <p className="mb-6 text-white/50 leading-relaxed">
                          {pillar.description}
                        </p>
                      </StaggerItem>

                      <StaggerItem>
                        <ul className="space-y-3">
                          {pillar.keyPoints.map((point, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                                <Check className="h-3 w-3 text-emerald-400" />
                              </div>
                              <span className="text-sm text-white/60 leading-relaxed">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </StaggerItem>
                    </Stagger>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
