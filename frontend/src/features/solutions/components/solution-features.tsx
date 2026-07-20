"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { Card } from "@/components/ui/card";
import { MotionDiv } from "@/lib/motion";
import {
  Layers,
  Brain,
  Cloud,
  Shield,
  Settings,
  HeadphonesIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Layers,
    title: "Scalable Architecture",
    description: "Built to grow with your business",
  },
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Intelligent automation and insights",
  },
  {
    icon: Cloud,
    title: "Cloud-Native",
    description: "Deploy anywhere, scale infinitely",
  },
  {
    icon: Shield,
    title: "Secure",
    description: "Enterprise-grade security built in",
  },
  {
    icon: Settings,
    title: "Customizable",
    description: "Tailored to your exact needs",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Always there when you need us",
  },
];

export function SolutionFeatures() {
  return (
    <Section padding="lg" background="subtle">
      <Container>
        <Heading
          level="h2"
          description="Every solution is built with these core capabilities"
          className="mb-16"
        >
          Why Our Solutions
        </Heading>

        <Stagger staggerChildren={0.1}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <Card padding="lg" hover glow="blue">
                  <MotionDiv
                    whileHover={{ scale: 1.05 }}
                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"
                  >
                    <feature.icon className="h-6 w-6" />
                  </MotionDiv>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/50">{feature.description}</p>
                </Card>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </Container>
    </Section>
  );
}
