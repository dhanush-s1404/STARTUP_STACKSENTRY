"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";
import { CountUp } from "@/components/ui/count-up";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MotionDiv } from "@/lib/motion";
import { Gift, Heart, Star, Sparkles } from "lucide-react";

const breadcrumbItems = [
  { label: "Careers", href: "/careers" },
  { label: "Benefits" },
];

const counters = [
  { value: 12, suffix: "+", label: "Benefits" },
  { value: 5, suffix: "", label: "Categories" },
  { value: 100, suffix: "%", label: "Coverage" },
];

export function BenefitsHero() {
  return (
    <Section padding="lg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute left-1/2 top-0 h-60 w-60 -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <Container>
        <div className="relative z-10 py-16 md:py-24 lg:py-32">
          <FadeIn delay={0.1}>
            <Breadcrumb items={breadcrumbItems} className="mb-8" />
          </FadeIn>

          <div className="mx-auto max-w-4xl text-center">
            <FadeIn delay={0.15}>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70">
                <Gift className="h-4 w-4 text-blue-400" />
                Benefits & Perks
              </span>
            </FadeIn>

            <FadeIn delay={0.25}>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Employee{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Benefits & Perks
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/50 md:text-xl">
                We believe in taking care of our people with a comprehensive
                benefits package designed to support your health, wealth, and
                overall well-being.
              </p>
            </FadeIn>

            <FadeIn delay={0.45}>
              <div className="mx-auto mt-12 grid max-w-lg grid-cols-3 gap-8">
                {counters.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-white sm:text-4xl">
                      <CountUp
                        to={stat.value}
                        suffix={stat.suffix}
                        duration={2}
                      />
                    </div>
                    <div className="mt-1 text-sm text-white/40">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <MotionDiv
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[15%] top-[20%] text-blue-500/15"
            >
              <Heart className="h-8 w-8" />
            </MotionDiv>
            <MotionDiv
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute left-[10%] top-[40%] text-purple-500/15"
            >
              <Star className="h-10 w-10" />
            </MotionDiv>
            <MotionDiv
              animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute right-[8%] top-[65%] text-cyan-500/15"
            >
              <Sparkles className="h-7 w-7" />
            </MotionDiv>
          </div>
        </div>
      </Container>
    </Section>
  );
}
