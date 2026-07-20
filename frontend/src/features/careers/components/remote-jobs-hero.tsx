"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MotionDiv } from "@/lib/motion";
import { Globe, Wifi, Laptop, Users } from "lucide-react";

const stats = [
  { label: "Remote Employees", value: "40%+", icon: Users },
  { label: "Countries", value: "25+", icon: Globe },
  { label: "Time Zones", value: "12", icon: Wifi },
];

export function RemoteJobsHero() {
  return (
    <Section padding="lg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute left-1/2 top-0 h-60 w-60 -translate-x-1/2 rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <Container>
        <div className="relative z-10 py-16 md:py-24 lg:py-32">
          <FadeIn delay={0.1}>
            <Breadcrumb
              items={[
                { label: "Careers", href: "/careers" },
                { label: "Remote Work" },
              ]}
            />
          </FadeIn>

          <div className="mx-auto mt-8 max-w-4xl text-center">
            <FadeIn delay={0.2}>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70">
                <Globe className="h-4 w-4 text-emerald-400" />
                Remote Work
              </span>
            </FadeIn>

            <FadeIn delay={0.3}>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Remote Work at{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  StackSentry
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/50 md:text-xl">
                We believe great work happens when talented people have the
                flexibility to work from wherever they do their best thinking.
                Our remote-first culture empowers you to thrive.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.5}>
            <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group flex flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04]"
                >
                  <stat.icon className="mb-3 h-5 w-5 text-emerald-400 transition-colors group-hover:text-emerald-300" />
                  <span className="text-2xl font-bold text-white">
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
              className="absolute right-[15%] top-[20%] text-emerald-500/20"
            >
              <Globe className="h-8 w-8" />
            </MotionDiv>
            <MotionDiv
              animate={{ y: [0, 20, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute left-[10%] top-[40%] text-blue-500/20"
            >
              <Laptop className="h-10 w-10" />
            </MotionDiv>
            <MotionDiv
              animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute right-[8%] top-[65%] text-purple-500/15"
            >
              <Wifi className="h-6 w-6" />
            </MotionDiv>
          </div>
        </div>
      </Container>
    </Section>
  );
}
