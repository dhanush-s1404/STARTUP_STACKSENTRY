"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MotionDiv } from "@/lib/motion";
import { Users, Globe, Heart, Scale } from "lucide-react";

const breadcrumbItems = [
  { label: "Careers", href: "/careers" },
  { label: "Diversity, Equity & Inclusion" },
];

export function DiversityHero() {
  return (
    <Section padding="lg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-1/4 h-80 w-80 rounded-full bg-rose-500/10 blur-[120px]" />
        <div className="absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute left-1/2 top-0 h-60 w-60 -translate-x-1/2 rounded-full bg-amber-500/5 blur-[100px]" />
      </div>

      <Container>
        <div className="relative z-10 py-16 md:py-24 lg:py-32">
          <FadeIn delay={0.1}>
            <Breadcrumb items={breadcrumbItems} className="mb-8" />
          </FadeIn>

          <div className="mx-auto max-w-4xl text-center">
            <FadeIn delay={0.15}>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70">
                <Users className="h-4 w-4 text-rose-400" />
                Diversity, Equity & Inclusion
              </span>
            </FadeIn>

            <FadeIn delay={0.25}>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Diversity,{" "}
                <span className="bg-gradient-to-r from-rose-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
                  Equity & Inclusion
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/50 md:text-xl">
                We are committed to building a diverse and inclusive workplace
                where every voice is heard, every perspective is valued, and
                everyone can bring their authentic self to work.
              </p>
            </FadeIn>
          </div>

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <MotionDiv
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[15%] top-[20%] text-rose-500/15"
            >
              <Heart className="h-8 w-8" />
            </MotionDiv>
            <MotionDiv
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute left-[10%] top-[40%] text-purple-500/15"
            >
              <Globe className="h-10 w-10" />
            </MotionDiv>
            <MotionDiv
              animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute right-[8%] top-[65%] text-amber-500/15"
            >
              <Scale className="h-7 w-7" />
            </MotionDiv>
          </div>
        </div>
      </Container>
    </Section>
  );
}
