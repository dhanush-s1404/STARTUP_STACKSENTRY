"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { CountUp } from "@/components/ui/count-up";
import { MotionDiv } from "@/lib/motion";
import { ArrowRight, FolderKanban } from "lucide-react";

const stats = [
  { label: "Projects", value: 15, suffix: "+" },
  { label: "Industries", value: 12, suffix: "+" },
  { label: "Technologies", value: 50, suffix: "+" },
  { label: "Client Satisfaction", value: 100, suffix: "%" },
];

export function PortfolioHero() {
  return (
    <Section id="portfolio-hero" padding="lg" background="gradient">
      <Container>
        <div className="relative py-8 md:py-12">
          <MotionDiv
            className="absolute -top-20 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <MotionDiv
            className="absolute top-10 right-10 h-32 w-32 rounded-full bg-purple-500/10 blur-[80px] sm:right-20"
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <MotionDiv
            className="absolute bottom-10 left-10 h-24 w-24 rounded-full bg-cyan-500/10 blur-[60px] sm:left-20"
            animate={{ y: [0, 15, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />

          <FadeIn direction="up" className="relative z-10 text-center">
            <Heading
              level="h1"
              gradient
              description="Explore our collection of enterprise-grade software solutions that have transformed businesses across industries."
            >
              Our Portfolio
            </Heading>
          </FadeIn>

          <div className="relative z-10 mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {stats.map((stat, index) => (
              <FadeIn key={stat.label} direction="up" delay={0.1 + index * 0.1}>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold text-white sm:text-4xl">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-sm text-white/50">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn direction="up" delay={0.5} className="relative z-10 mt-12 text-center">
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="#projects-grid">
                <Button
                  size="lg"
                  icon={<FolderKanban className="h-5 w-5" />}
                  iconPosition="right"
                >
                  Explore Projects
                </Button>
              </Link>
              <Link href="/portfolio/inquiry">
                <Button
                  variant="outline"
                  size="lg"
                  icon={<ArrowRight className="h-5 w-5" />}
                  iconPosition="right"
                >
                  Start Your Project
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
