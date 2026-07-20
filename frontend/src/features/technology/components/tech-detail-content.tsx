"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { FadeIn } from "@/components/ui/fade-in";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { MotionDiv } from "@/lib/motion";
import { CheckCircle, TrendingUp, ArrowRight } from "lucide-react";
import { getTechnologyBySlug, type TechnologyData } from "@/data/technologies";
import { getProjectBySlug } from "@/data/projects";

type TechDetailContentProps = {
  technology: TechnologyData;
};

const experienceConfig: Record<
  string,
  { value: number; color: "emerald" | "blue" | "cyan" | "purple"; label: string; variant: "green" | "blue" | "amber" | "purple" }
> = {
  expert: { value: 100, color: "emerald", label: "Expert", variant: "green" },
  advanced: { value: 75, color: "blue", label: "Advanced", variant: "blue" },
  intermediate: { value: 50, color: "cyan", label: "Intermediate", variant: "amber" },
  beginner: { value: 25, color: "purple", label: "Beginner", variant: "purple" },
};

export function TechDetailContent({ technology }: TechDetailContentProps) {
  const config = experienceConfig[technology.experience] ?? experienceConfig.beginner;

  const relatedProjects = technology.projectSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter(Boolean);

  const relatedTechs = technology.relatedTechnologies
    .map((slug) => getTechnologyBySlug(slug))
    .filter(Boolean) as TechnologyData[];

  return (
    <Section padding="lg">
      <Container>
        <div className="space-y-20">
          <FadeIn direction="up">
            <div className="max-w-4xl space-y-4">
              <Heading level="h2" gradient>
                Overview
              </Heading>
              <p className="text-base leading-relaxed text-white/60">
                {technology.longDescription}
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up">
            <div className="space-y-6">
              <Heading level="h2" gradient>
                Use Cases
              </Heading>
              <Stagger staggerChildren={0.08} className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {technology.useCases.map((useCase) => (
                  <StaggerItem key={useCase}>
                    <Card glass hover className="h-full">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                          <CheckCircle className="h-4 w-4 text-emerald-400" />
                        </div>
                        <p className="text-sm leading-relaxed text-white/60">{useCase}</p>
                      </div>
                    </Card>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </FadeIn>

          <FadeIn direction="up">
            <div className="space-y-6">
              <Heading level="h2" gradient>
                Key Benefits
              </Heading>
              <Stagger staggerChildren={0.08} className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {technology.benefits.map((benefit) => (
                  <StaggerItem key={benefit}>
                    <Card glass hover className="h-full">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                          <TrendingUp className="h-4 w-4 text-blue-400" />
                        </div>
                        <p className="text-sm leading-relaxed text-white/60">{benefit}</p>
                      </div>
                    </Card>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </FadeIn>

          <FadeIn direction="up">
            <div className="space-y-6">
              <Heading level="h2" gradient>
                Experience Level
              </Heading>
              <Card glass className="max-w-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/70">Proficiency</span>
                  <Badge variant={config.variant} size="md">
                    {config.label}
                  </Badge>
                </div>
                <ProgressBar
                  value={config.value}
                  color={config.color}
                  size="lg"
                />
                <p className="text-xs text-white/40">
                  Our team has {config.label.toLowerCase()}-level expertise with {technology.name},
                  {technology.experience === "expert"
                    ? " having deployed it across multiple production projects at scale."
                    : technology.experience === "advanced"
                      ? " using it extensively in production environments."
                      : technology.experience === "intermediate"
                        ? " with growing production experience and proven results."
                        : " and are building our expertise through active projects."}
                </p>
              </Card>
            </div>
          </FadeIn>

          {relatedProjects.length > 0 && (
            <FadeIn direction="up">
              <div className="space-y-6">
                <Heading level="h2" gradient>
                  Projects Built
                </Heading>
                <Stagger staggerChildren={0.08} className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {relatedProjects.map((project) => (
                    <StaggerItem key={project!.slug}>
                      <MotionDiv whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                        <Link href={`/projects/${project!.slug}`}>
                          <Card glass hover glow="blue" className="h-full">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="text-base font-semibold text-white">{project!.title}</h4>
                                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-white/30" />
                              </div>
                              <p className="text-sm leading-relaxed text-white/50 line-clamp-2">
                                {project!.shortDescription}
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {project!.technologies.slice(0, 3).map((tech) => (
                                  <span
                                    key={tech}
                                    className="rounded-md bg-white/[0.03] px-2 py-0.5 text-xs text-white/40 border border-white/[0.06]"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </Card>
                        </Link>
                      </MotionDiv>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </FadeIn>
          )}

          {relatedTechs.length > 0 && (
            <FadeIn direction="up">
              <div className="space-y-6">
                <Heading level="h2" gradient>
                  Related Technologies
                </Heading>
                <div className="flex flex-wrap gap-3">
                  {relatedTechs.map((tech) => (
                    <Link key={tech.slug} href={`/technology/${tech.slug}`}>
                      <MotionDiv whileHover={{ y: -2, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                        <Badge variant="outline" size="md" className="cursor-pointer hover:border-blue-500/30 hover:text-blue-400 transition-colors">
                          {tech.name}
                        </Badge>
                      </MotionDiv>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </Container>
    </Section>
  );
}
