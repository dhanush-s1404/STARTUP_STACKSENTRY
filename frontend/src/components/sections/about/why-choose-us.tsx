"use client";

import {
  Users,
  Layers,
  Cloud,
  Scaling,
  Shield,
  Brain,
  Zap,
  MessageSquare,
  Headphones,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { MotionDiv } from "@/lib/motion";

type Advantage = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const advantages: Advantage[] = [
  { icon: Users, title: "Experienced Engineers", description: "Senior developers with 5+ years average experience" },
  { icon: Layers, title: "Modern Architecture", description: "Cloud-native, microservices, event-driven design" },
  { icon: Cloud, title: "Cloud-Native", description: "AWS, Azure, GCP certified expertise" },
  { icon: Scaling, title: "Scalable Solutions", description: "Built to handle millions of users and transactions" },
  { icon: Shield, title: "Enterprise Security", description: "SOC2, GDPR compliant, end-to-end encryption" },
  { icon: Brain, title: "AI-Powered", description: "Intelligent automation in every solution" },
  { icon: Zap, title: "Fast Delivery", description: "Agile sprints, 2-week delivery cycles" },
  { icon: MessageSquare, title: "Transparent Communication", description: "Daily updates, dedicated project manager" },
  { icon: Headphones, title: "Long-Term Support", description: "24/7 maintenance, 99.99% SLA" },
  { icon: RefreshCw, title: "Agile Methodology", description: "Scrum-based, iterative development" },
];

export function WhyChooseUs() {
  return (
    <Section id="why-choose-us" padding="lg">
      <Container>
        <Heading
          level="h2"
          description="What sets us apart from the competition"
          className="mb-12"
        >
          Why Choose StackSentry
        </Heading>

        <Stagger staggerChildren={0.06} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {advantages.map((advantage) => {
            const Icon = advantage.icon;
            return (
              <StaggerItem key={advantage.title}>
                <MotionDiv
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card glass hover glow="blue" className="h-full">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-white">
                          {advantage.title}
                        </h3>
                        <p className="text-sm text-white/50 leading-relaxed">
                          {advantage.description}
                        </p>
                      </div>
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
