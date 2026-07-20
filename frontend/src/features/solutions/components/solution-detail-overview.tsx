"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";
import {
  AlertTriangle,
  Zap,
  TrendingUp,
  Check,
} from "lucide-react";

type SolutionDetailOverviewProps = {
  title: string;
  description: string;
  businessProblems: string[];
  keyFeatures: string[];
  businessBenefits: string[];
};

const sections = [
  {
    key: "problems" as const,
    title: "Business Challenges",
    icon: AlertTriangle,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    key: "features" as const,
    title: "Key Features",
    icon: Zap,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    key: "benefits" as const,
    title: "Business Benefits",
    icon: TrendingUp,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

export function SolutionDetailOverview({
  title,
  description: _description,
  businessProblems,
  keyFeatures,
  businessBenefits,
}: SolutionDetailOverviewProps) {
  const data: Record<string, string[]> = {
    problems: businessProblems,
    features: keyFeatures,
    benefits: businessBenefits,
  };

  return (
    <Section padding="lg">
      <Container>
        <FadeIn direction="up">
          <Heading
            level="h2"
            description={`How our ${title} addresses your core needs`}
            className="mb-16"
          >
            Overview
          </Heading>
        </FadeIn>

        <Stagger staggerChildren={0.12}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {sections.map((section) => (
              <StaggerItem key={section.key}>
                <Card padding="lg" hover glow="blue" className="h-full">
                  <MotionDiv
                    whileHover={{ scale: 1.05 }}
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${section.bg} ${section.color}`}
                  >
                    <section.icon className="h-6 w-6" />
                  </MotionDiv>

                  <h3 className="mb-4 text-lg font-semibold text-white">
                    {section.title}
                  </h3>

                  <ul className="space-y-3">
                    {data[section.key].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-white/60"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </Container>
    </Section>
  );
}
