"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";
import { ArrowRight, Code2, GitBranch, Shield, Zap } from "lucide-react";

const highlights = [
  { icon: Code2, label: "Clean Architecture" },
  { icon: GitBranch, label: "CI/CD Pipelines" },
  { icon: Shield, label: "Security First" },
  { icon: Zap, label: "Performance Driven" },
];

const ctas = [
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Architecture", href: "#architecture" },
  { label: "Principles", href: "#principles" },
  { label: "DevOps", href: "#devops" },
];

export function EngineeringHero() {
  return (
    <Section padding="lg" background="gradient">
      <Container>
        <div className="flex flex-col items-center text-center">
          <FadeIn direction="up">
            <Badge variant="blue" size="md" className="mb-6">
              Engineering Hub
            </Badge>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <Heading level="h1" gradient className="mb-6">
              Engineering Excellence
            </Heading>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="mx-auto max-w-2xl text-lg text-white/50 leading-relaxed">
              How StackSentry builds software — our principles, practices, and the
              technology choices that power enterprise-grade applications.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {highlights.map((item) => (
                <MotionDiv
                  key={item.label}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
                >
                  <item.icon className="h-4 w-4 text-blue-400" />
                  {item.label}
                </MotionDiv>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Button
                size="lg"
                icon={<ArrowRight className="h-5 w-5" />}
                iconPosition="right"
              >
                <Link href="#tech-stack">Explore Our Stack</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="#principles">View Principles</Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.5}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {ctas.map((cta) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className="text-sm text-white/40 transition-colors hover:text-white/80"
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
