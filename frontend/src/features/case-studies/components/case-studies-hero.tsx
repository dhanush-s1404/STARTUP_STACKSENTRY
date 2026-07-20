"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";
import { BookOpen, Building2, CheckCircle } from "lucide-react";

const stats = [
  { icon: BookOpen, value: "15+", label: "Case Studies" },
  { icon: Building2, value: "12+", label: "Industries" },
  { icon: CheckCircle, value: "100%", label: "Success Rate" },
];

export function CaseStudiesHero() {
  return (
    <Section padding="lg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute left-1/2 top-0 h-60 w-60 -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <Container>
        <div className="relative z-10 py-16 md:py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <FadeIn delay={0.1}>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70">
                <BookOpen className="h-4 w-4 text-blue-400" />
                Case Studies
              </span>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Case{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Studies
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/50 md:text-xl">
                Deep dives into how we solve complex business challenges with
                technology
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                      <stat.icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold text-white sm:text-3xl">
                      {stat.value}
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
              className="absolute right-[15%] top-[20%] text-blue-500/20"
            >
              <BookOpen className="h-8 w-8" />
            </MotionDiv>
            <MotionDiv
              animate={{ y: [0, 20, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute left-[10%] top-[40%] text-purple-500/20"
            >
              <CheckCircle className="h-10 w-10" />
            </MotionDiv>
          </div>
        </div>
      </Container>
    </Section>
  );
}
