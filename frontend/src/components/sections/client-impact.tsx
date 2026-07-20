"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { CountUp } from "@/components/ui/count-up";
import { StoryReveal } from "./scroll-story";
import { TrendingUp, Clock, Globe, DollarSign, Rocket, ShieldCheck } from "lucide-react";

const impacts = [
  {
    icon: TrendingUp,
    label: "Average Performance Improvement",
    value: 340,
    suffix: "%",
    color: "text-blue-400",
    bg: "from-blue-500/15 to-blue-600/5",
    border: "border-blue-500/10",
  },
  {
    icon: Clock,
    label: "Time Saved Per Month (Avg)",
    value: 2400,
    suffix: "+ hrs",
    color: "text-purple-400",
    bg: "from-purple-500/15 to-purple-600/5",
    border: "border-purple-500/10",
  },
  {
    icon: Globe,
    label: "Countries with Deployments",
    value: 42,
    suffix: "+",
    color: "text-cyan-400",
    bg: "from-cyan-500/15 to-cyan-600/5",
    border: "border-cyan-500/10",
  },
  {
    icon: DollarSign,
    label: "Average Client Cost Savings",
    value: 45,
    suffix: "%",
    color: "text-emerald-400",
    bg: "from-emerald-500/15 to-emerald-600/5",
    border: "border-emerald-500/10",
  },
  {
    icon: Rocket,
    label: "Successful Deployments",
    value: 1200,
    suffix: "+",
    color: "text-amber-400",
    bg: "from-amber-500/15 to-amber-600/5",
    border: "border-amber-500/10",
  },
  {
    icon: ShieldCheck,
    label: "Security Incidents (All-time)",
    value: 0,
    suffix: "",
    color: "text-rose-400",
    bg: "from-rose-500/15 to-rose-600/5",
    border: "border-rose-500/10",
  },
];

function ImpactBar({ color }: { percent: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleX = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);

  return (
    <div ref={ref} className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  );
}

export function ClientImpact() {
  return (
    <Section id="success" padding="lg" background="subtle">
      <Container>
        <StoryReveal>
          <Heading
            level="h2"
            gradient
            description="Real, measurable outcomes delivered to organizations across every industry."
          >
            Client Impact
          </Heading>
        </StoryReveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {impacts.map((impact, index) => (
            <StoryReveal key={impact.label} delay={index * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`group rounded-2xl border ${impact.border} bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.04] hover:shadow-xl`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${impact.bg} transition-all duration-300 group-hover:scale-110`}>
                    <impact.icon className={`h-6 w-6 ${impact.color}`} />
                  </div>
                  <div className={`text-3xl font-bold tracking-tight ${impact.color}`}>
                    <CountUp to={impact.value} suffix={impact.suffix} />
                  </div>
                </div>
                <p className="mb-3 text-sm font-medium text-white/60">{impact.label}</p>
                <ImpactBar percent={100} color={`bg-gradient-to-r ${impact.bg}`} />
              </motion.div>
            </StoryReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
