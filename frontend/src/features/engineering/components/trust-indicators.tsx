"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { CountUp } from "@/components/ui/count-up";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { MotionDiv } from "@/lib/motion";
import {
  Award,
  Clock,
  Users,
  CheckCircle,
  Shield,
  HeartHandshake,
} from "lucide-react";

const METRICS = [
  { icon: Award, value: 10, prefix: "", suffix: "+", label: "Years Engineering Excellence", color: "text-blue-400", bgColor: "bg-blue-500/10" },
  { icon: Clock, value: 99, prefix: "", suffix: ".9%", label: "Uptime Guarantee", color: "text-green-400", bgColor: "bg-green-500/10" },
  { icon: Users, value: 50, prefix: "", suffix: "+", label: "Enterprise Clients", color: "text-purple-400", bgColor: "bg-purple-500/10" },
  { icon: CheckCircle, value: 100, prefix: "", suffix: "%", label: "Project Delivery Rate", color: "text-amber-400", bgColor: "bg-amber-500/10" },
];

const TRUST_BADGES = [
  { icon: Shield, label: "SOC 2 Compliant" },
  { icon: Shield, label: "GDPR Ready" },
  { icon: HeartHandshake, label: "ISO 27001" },
  { icon: Award, label: "AWS Partner" },
];

export function TrustIndicators() {
  return (
    <Section id="trust" padding="lg">
      <Container>
        <FadeIn direction="up">
          <Heading
            level="h2"
            gradient
            description="Trusted by enterprises worldwide to deliver mission-critical software."
            className="mb-12"
          >
            Why Trust StackSentry
          </Heading>
        </FadeIn>

        <Stagger staggerChildren={0.1} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {METRICS.map((metric) => (
            <StaggerItem key={metric.label}>
              <Card glass hover padding="lg" className="text-center">
                <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${metric.bgColor}`}>
                  <metric.icon className={`h-7 w-7 ${metric.color}`} />
                </div>
                <div className="mt-4">
                  <span className={`text-4xl font-bold ${metric.color}`}>
                    <CountUp
                      to={metric.value}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                      duration={2.5}
                    />
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/50">{metric.label}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn direction="up" delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {TRUST_BADGES.map((badge) => (
              <MotionDiv
                key={badge.label}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5"
              >
                <badge.icon className="h-4 w-4 text-white/50" />
                <span className="text-sm text-white/60">{badge.label}</span>
              </MotionDiv>
            ))}
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
