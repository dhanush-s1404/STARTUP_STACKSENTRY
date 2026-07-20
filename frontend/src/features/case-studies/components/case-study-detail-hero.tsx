"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";

type CaseStudyDetailHeroProps = {
  title: string;
  subtitle: string;
  heroImageUrl?: string;
  technologiesUsed: string[];
};

export function CaseStudyDetailHero({
  title,
  subtitle,
  technologiesUsed,
}: CaseStudyDetailHeroProps) {
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
                { label: "Case Studies", href: "/case-studies" },
                { label: title },
              ]}
              className="mb-8"
            />
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/50">
              {subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-6 flex flex-wrap gap-2">
              {technologiesUsed.map((tech) => (
                <Badge key={tech} variant="blue" size="md">
                  {tech}
                </Badge>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
