"use client";

import {
  Lightbulb,
  BookOpen,
  Award,
  Globe,
  TrendingUp,
  Microscope,
  GitBranch,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { MotionDiv } from "@/lib/motion";

type CultureValue = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const values: CultureValue[] = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We encourage experimentation and creative problem-solving. 20% time for personal projects.",
  },
  {
    icon: BookOpen,
    title: "Learning",
    description: "Continuous growth through courses, conferences, and knowledge sharing sessions.",
  },
  {
    icon: Award,
    title: "Ownership",
    description: "Every team member owns their work end-to-end. Autonomy and accountability.",
  },
  {
    icon: Globe,
    title: "Remote Work",
    description: "Remote-first culture. Work from anywhere with flexible hours.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Clear career ladders, mentorship programs, and promotion paths.",
  },
  {
    icon: Microscope,
    title: "Research",
    description: "Dedicated R&D time. Explore new technologies and publish findings.",
  },
  {
    icon: GitBranch,
    title: "Open Source",
    description: "Contributing back to the community. Regular open-source contributions.",
  },
  {
    icon: Heart,
    title: "Work-Life Balance",
    description: "Unlimited PTO, mental health support, team retreats.",
  },
];

export function CompanyCulture() {
  return (
    <Section id="company-culture" padding="lg" background="gradient">
      <Container>
        <Heading
          level="h2"
          description="The values that drive everything we do"
          className="mb-12"
        >
          Our Culture
        </Heading>

        <Stagger staggerChildren={0.06} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <StaggerItem key={value.title}>
                <MotionDiv
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="h-full"
                >
                  <Card glass hover className="group h-full">
                    <div className="flex h-full flex-col items-center text-center space-y-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 transition-all duration-300 group-hover:bg-blue-500/20 group-hover:text-blue-300">
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        {value.title}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </Card>
                </MotionDiv>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
