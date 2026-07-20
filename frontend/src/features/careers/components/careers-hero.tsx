"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";
import { useAnimatedCounter } from "@/hooks";
import { ArrowRight, Sparkles, Users, Globe, FolderOpen } from "lucide-react";

const stats = [
  { value: 200, suffix: "+", label: "Team Members", icon: Users },
  { value: 15, suffix: "+", label: "Countries", icon: Globe },
  { value: 30, suffix: "+", label: "Open Positions", icon: Sparkles },
  { value: 150, suffix: "+", label: "Projects", icon: FolderOpen },
];

function StatCounter({ end, suffix, label, icon: Icon }: { end: number; suffix: string; label: string; icon: React.ElementType }) {
  const { count, ref } = useAnimatedCounter(end, 2000);

  return (
    <div ref={ref} className="text-center">
      <div className="mb-2 inline-flex items-center justify-center rounded-xl bg-white/[0.03] p-3">
        <Icon className="h-5 w-5 text-blue-400/70" />
      </div>
      <div className="text-3xl font-bold text-white sm:text-4xl">
        {count}
        <span className="text-blue-400">{suffix}</span>
      </div>
      <div className="mt-1 text-sm text-white/40">{label}</div>
    </div>
  );
}

export function CareersHero() {
  return (
    <Section padding="lg">
      <div className="relative overflow-hidden">
        <Container>
          <div className="relative py-20 md:py-28 lg:py-36">
            {/* Layered background */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_50%,rgba(168,85,247,0.08),transparent)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_20%_60%,rgba(34,211,238,0.06),transparent)]" />
              <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-blue-500/8 blur-[150px]" />
              <div className="absolute -left-32 top-1/2 h-80 w-80 rounded-full bg-purple-500/8 blur-[130px]" />
              <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />
              <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            {/* Animated gradient orbs */}
            <MotionDiv
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -20, 10, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[10%] top-[15%] h-64 w-64 rounded-full bg-blue-500/[0.04] blur-[80px]"
            />
            <MotionDiv
              animate={{
                x: [0, -20, 30, 0],
                y: [0, 15, -25, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[15%] bottom-[20%] h-52 w-52 rounded-full bg-purple-500/[0.04] blur-[80px]"
            />

            <div className="relative z-10 mx-auto max-w-5xl text-center">
              <FadeIn delay={0.1}>
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/70 backdrop-blur-sm">
                  <Sparkles className="h-4 w-4 text-blue-400" />
                  We&apos;re Hiring Across the Globe
                </span>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h1 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                  Build the Future with{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    StackSentry
                  </span>{" "}
                  Technologies
                </h1>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-white/50 md:text-xl">
                  Join a team of world-class engineers, designers, and thinkers
                  building AI-powered enterprise software that transforms how
                  organizations operate. Your next chapter starts here.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link href="#featured-jobs">
                    <Button
                      size="xl"
                      icon={<ArrowRight className="h-5 w-5" />}
                      iconPosition="right"
                    >
                      View Open Positions
                    </Button>
                  </Link>
                  <Link href="/careers/apply">
                    <Button variant="outline" size="xl">
                      Apply Now
                    </Button>
                  </Link>
                  <Link href="/careers/life">
                    <Button variant="ghost" size="xl">
                      Life at StackSentry
                    </Button>
                  </Link>
                </div>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4">
                  {stats.map((stat) => (
                    <StatCounter
                      key={stat.label}
                      end={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                      icon={stat.icon}
                    />
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
