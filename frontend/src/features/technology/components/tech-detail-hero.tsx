"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";
import { Code, Braces, Terminal } from "lucide-react";

type TechDetailHeroProps = {
  name: string;
  description: string;
  longDescription: string;
  experience: string;
  category: string;
};

const experienceConfig: Record<string, { variant: "green" | "blue" | "amber" | "purple"; label: string }> = {
  expert: { variant: "green", label: "Expert" },
  advanced: { variant: "blue", label: "Advanced" },
  intermediate: { variant: "amber", label: "Intermediate" },
  beginner: { variant: "purple", label: "Beginner" },
};

export function TechDetailHero({
  name,
  description,
  experience,
  category,
}: TechDetailHeroProps) {
  const config = experienceConfig[experience] ?? experienceConfig.beginner;

  return (
    <Section padding="lg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-1/4 h-80 w-80 rounded-full bg-blue-500/15 blur-[120px]" />
        <div className="absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-purple-500/15 blur-[120px]" />
      </div>

      <Container>
        <div className="relative z-10 py-12 md:py-16">
          <FadeIn delay={0.1}>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Technology", href: "/technology" },
                { label: name },
              ]}
              className="mb-8"
            />
          </FadeIn>

          <div className="relative">
            <MotionDiv
              className="absolute -right-20 top-0 h-[200px] w-[200px] rounded-full bg-blue-500/10 blur-[80px]"
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <MotionDiv
              className="absolute -left-10 top-10 h-[150px] w-[150px] rounded-full bg-purple-500/10 blur-[60px]"
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            <FadeIn delay={0.2}>
              <h1 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {name}
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="relative mt-4 max-w-3xl text-lg leading-relaxed text-white/50">
                {description}
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="relative mt-6 flex flex-wrap items-center gap-3">
                <Badge variant={config.variant} size="md">
                  {config.label}
                </Badge>
                <Badge variant="blue" size="md">
                  {category}
                </Badge>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.5}>
            <div className="pointer-events-none absolute -right-8 bottom-0 hidden lg:block">
              <MotionDiv
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Code className="h-16 w-16 text-blue-500/20" />
              </MotionDiv>
            </div>
            <div className="pointer-events-none absolute left-1/2 -bottom-4 hidden lg:block">
              <MotionDiv
                animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Braces className="h-12 w-12 text-purple-500/20" />
              </MotionDiv>
            </div>
            <div className="pointer-events-none absolute -left-8 bottom-4 hidden lg:block">
              <MotionDiv
                animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Terminal className="h-14 w-14 text-cyan-500/20" />
              </MotionDiv>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
