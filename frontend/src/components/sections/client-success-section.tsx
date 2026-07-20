"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { MotionDiv } from "@/lib/motion";
import { CountUp } from "@/components/ui/count-up";
import {
  TrendingUp,
  Clock,
  Globe,
  DollarSign,
  Rocket,
  ShieldCheck,
} from "lucide-react";

const metrics = [
  {
    icon: TrendingUp,
    label: "Average Performance Improvement",
    value: 340,
    suffix: "%",
    color: "text-blue-400",
    bg: "from-blue-500/10 to-blue-600/5",
  },
  {
    icon: Clock,
    label: "Time Saved Per Month",
    value: 2400,
    suffix: "+ hrs",
    color: "text-purple-400",
    bg: "from-purple-500/10 to-purple-600/5",
  },
  {
    icon: Globe,
    label: "Countries with Active Deployments",
    value: 42,
    suffix: "+",
    color: "text-cyan-400",
    bg: "from-cyan-500/10 to-cyan-600/5",
  },
  {
    icon: DollarSign,
    label: "Client Cost Savings (Average)",
    value: 45,
    suffix: "%",
    color: "text-emerald-400",
    bg: "from-emerald-500/10 to-emerald-600/5",
  },
  {
    icon: Rocket,
    label: "Successful Deployments",
    value: 1200,
    suffix: "+",
    color: "text-amber-400",
    bg: "from-amber-500/10 to-amber-600/5",
  },
  {
    icon: ShieldCheck,
    label: "Security Incidents",
    value: 0,
    suffix: "",
    color: "text-rose-400",
    bg: "from-rose-500/10 to-rose-600/5",
  },
];

export function ClientSuccessSection() {
  return (
    <Section id="success" padding="lg">
      <Container>
        <ScrollReveal>
          <Heading
            level="h2"
            gradient
            description="Real results from real deployments. Our clients see measurable impact from day one."
          >
            Client Success
          </Heading>
        </ScrollReveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric, index) => (
            <ScrollReveal key={metric.label} delay={index * 0.05}>
              <MotionDiv
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${metric.bg}`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className={`text-4xl font-bold tracking-tight ${metric.color}`}>
                  <CountUp to={metric.value} suffix={metric.suffix} />
                </div>
                <p className="mt-2 text-sm text-[hsl(var(--color-text-muted))]">
                  {metric.label}
                </p>
              </MotionDiv>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
