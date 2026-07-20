"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MotionDiv } from "@/lib/motion";
import { GraduationCap, Rocket, Users } from "lucide-react";

export function GraduateHero() {
  return (
    <Section padding="lg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute left-1/2 top-0 h-60 w-60 -translate-x-1/2 rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <Container>
        <div className="relative z-10 py-16 md:py-24 lg:py-32">
          <FadeIn delay={0.1}>
            <Breadcrumb
              items={[
                { label: "Careers", href: "/careers" },
                { label: "Graduate Programs" },
              ]}
            />
          </FadeIn>

          <div className="mx-auto mt-8 max-w-4xl text-center">
            <FadeIn delay={0.2}>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70">
                <GraduationCap className="h-4 w-4 text-blue-400" />
                Graduate Programs
              </span>
            </FadeIn>

            <FadeIn delay={0.3}>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Start Your{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Career Journey
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/50 md:text-xl">
                Our structured graduate programs give you the mentorship,
                hands-on experience, and career foundation to become a
                world-class engineer, researcher, or leader.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.5}>
            <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { icon: Rocket, label: "Structured Learning", value: "12-Month Program" },
                { icon: Users, label: "Dedicated Mentors", value: "1:1 Coaching" },
                { icon: GraduationCap, label: "Career Conversion", value: "Full-Time Path" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="group flex flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04]"
                >
                  <stat.icon className="mb-3 h-5 w-5 text-blue-400 transition-colors group-hover:text-blue-300" />
                  <span className="text-lg font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-sm text-white/50">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <MotionDiv
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[15%] top-[20%] text-blue-500/20"
            >
              <GraduationCap className="h-8 w-8" />
            </MotionDiv>
            <MotionDiv
              animate={{ y: [0, 20, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute left-[10%] top-[40%] text-emerald-500/20"
            >
              <Rocket className="h-10 w-10" />
            </MotionDiv>
          </div>
        </div>
      </Container>
    </Section>
  );
}
