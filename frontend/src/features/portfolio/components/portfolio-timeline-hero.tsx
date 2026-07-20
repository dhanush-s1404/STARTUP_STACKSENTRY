"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";
import { Clock, CalendarDays } from "lucide-react";

export function PortfolioTimelineHero() {
  return (
    <Section padding="lg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-1/4 h-80 w-80 rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <Container>
        <div className="relative z-10 py-16 md:py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <FadeIn delay={0.1}>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70">
                <Clock className="h-4 w-4 text-blue-400" />
                Project Timelines
              </span>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Project{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Timelines
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/50 md:text-xl">
                A comprehensive view of our project delivery journey
              </p>
            </FadeIn>
          </div>

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <MotionDiv
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[15%] top-[20%] text-purple-500/20"
            >
              <Clock className="h-8 w-8" />
            </MotionDiv>
            <MotionDiv
              animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute left-[10%] top-[40%] text-blue-500/20"
            >
              <CalendarDays className="h-10 w-10" />
            </MotionDiv>
            <MotionDiv
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute right-[25%] top-[60%] text-cyan-500/15"
            >
              <Clock className="h-6 w-6" />
            </MotionDiv>
          </div>
        </div>
      </Container>
    </Section>
  );
}
