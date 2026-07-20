"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";
import { ArrowRight, Code2, Zap } from "lucide-react";

const stats = [
  { value: "16+", label: "Services" },
  { value: "500+", label: "Projects" },
  { value: "98%", label: "Client Satisfaction" },
];

export function ServicesHero() {
  return (
    <Section padding="lg">
      <Container>
        <div className="relative py-16 md:py-24 lg:py-32">
          {/* Background decorations */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-40 top-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />
            <div className="absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-purple-500/10 blur-[120px]" />
            <div className="absolute left-1/2 top-0 h-60 w-60 -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[100px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <FadeIn delay={0.1}>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70">
                <Code2 className="h-4 w-4 text-blue-400" />
                Enterprise Solutions
              </span>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Enterprise{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Software Solutions
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/50 md:text-xl">
                From AI-powered automation to full-stack development, we deliver
                cutting-edge technology solutions that drive business growth.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="#services-grid">
                  <Button
                    size="lg"
                    icon={<ArrowRight className="h-5 w-5" />}
                    iconPosition="right"
                  >
                    Explore Services
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-white sm:text-3xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-white/40">{stat.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Animated floating icons */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <MotionDiv
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[15%] top-[20%] text-blue-500/20"
            >
              <Zap className="h-8 w-8" />
            </MotionDiv>
            <MotionDiv
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute left-[10%] top-[40%] text-purple-500/20"
            >
              <Code2 className="h-10 w-10" />
            </MotionDiv>
          </div>
        </div>
      </Container>
    </Section>
  );
}
