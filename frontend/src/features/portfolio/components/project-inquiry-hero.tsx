"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";
import { Send, Clock, Shield, MessageSquare } from "lucide-react";

const stats = [
  { icon: Clock, label: "24h Response Time" },
  { icon: Shield, label: "100% Confidential" },
  { icon: MessageSquare, label: "Free Consultation" },
];

export function ProjectInquiryHero() {
  return (
    <Section padding="lg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <Container>
        <div className="relative z-10 py-16 md:py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <FadeIn delay={0.1}>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70">
                <Send className="h-4 w-4 text-blue-400" />
                Start a Project
              </span>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Start Your{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Project
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/50 md:text-xl">
                Tell us about your vision. Our team will get back to you within
                24 hours.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.5}>
            <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-6 md:gap-10">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2 text-sm text-white/50">
                  <stat.icon className="h-4 w-4 text-blue-400" />
                  {stat.label}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <MotionDiv
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[15%] top-[20%] text-blue-500/20"
        >
          <Send className="h-8 w-8" />
        </MotionDiv>
        <MotionDiv
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute left-[10%] top-[40%] text-purple-500/20"
        >
          <Shield className="h-10 w-10" />
        </MotionDiv>
      </div>
    </Section>
  );
}
