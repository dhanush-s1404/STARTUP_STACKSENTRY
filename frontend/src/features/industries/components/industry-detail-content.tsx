"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  BarChart3,
  Cpu,
  BookOpen,
  FolderOpen,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { CountUp } from "@/components/ui/count-up";
import { MotionDiv } from "@/lib/motion";
import type { IndustryData } from "@/data/industries";

const techColors: Array<"blue" | "purple" | "cyan" | "green" | "amber"> = [
  "blue",
  "purple",
  "cyan",
  "green",
  "amber",
];

type IndustryDetailContentProps = {
  industry: IndustryData;
};

export function IndustryDetailContent({ industry }: IndustryDetailContentProps) {
  return (
    <>
      {/* Business Challenges */}
      <Section padding="lg" background="subtle">
        <Container>
          <FadeIn>
            <div className="mb-12">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Business Challenges</h2>
              </div>
              <p className="max-w-2xl text-base text-white/50">
                Key pain points that organizations in {industry.title.toLowerCase()} face
                without modern software solutions.
              </p>
            </div>
          </FadeIn>

          <Stagger staggerChildren={0.1}>
            <div className="grid gap-6 md:grid-cols-3">
              {industry.challenges.map((challenge, i) => (
                <StaggerItem key={i}>
                  <Card glass hover glow="purple" className="group h-full">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 transition-colors group-hover:bg-amber-500/20">
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                    </div>
                    <p className="text-sm leading-relaxed text-white/60">{challenge}</p>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </Container>
      </Section>

      {/* Solutions Delivered */}
      <Section padding="lg">
        <Container>
          <FadeIn>
            <div className="mb-12">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Lightbulb className="h-5 w-5 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Solutions Delivered</h2>
              </div>
              <p className="max-w-2xl text-base text-white/50">
                Purpose-built solutions that address the unique challenges of{" "}
                {industry.title.toLowerCase()} organizations.
              </p>
            </div>
          </FadeIn>

          <Stagger staggerChildren={0.1}>
            <div className="grid gap-6 md:grid-cols-3">
              {industry.solutions.map((solution, i) => (
                <StaggerItem key={i}>
                  <Card glass hover glow="blue" className="group h-full">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 transition-colors group-hover:bg-blue-500/20">
                      <Lightbulb className="h-5 w-5 text-blue-400" />
                    </div>
                    <p className="text-sm leading-relaxed text-white/60">{solution}</p>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </Container>
      </Section>

      {/* Key Benefits */}
      <Section padding="lg" background="subtle">
        <Container>
          <FadeIn>
            <div className="mb-12">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Key Benefits</h2>
              </div>
              <p className="max-w-2xl text-base text-white/50">
                Measurable outcomes that {industry.title.toLowerCase()} businesses achieve
                with our solutions.
              </p>
            </div>
          </FadeIn>

          <Stagger staggerChildren={0.1}>
            <div className="grid gap-6 md:grid-cols-3">
              {industry.benefits.map((benefit, i) => (
                <StaggerItem key={i}>
                  <Card glass hover glow="cyan" className="group h-full">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 transition-colors group-hover:bg-emerald-500/20">
                      <TrendingUp className="h-5 w-5 text-emerald-400" />
                    </div>
                    <p className="text-sm leading-relaxed text-white/60">{benefit}</p>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </Container>
      </Section>

      {/* Impact Metrics */}
      <Section padding="lg">
        <Container>
          <FadeIn>
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center justify-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                  <BarChart3 className="h-5 w-5 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Impact Metrics</h2>
              </div>
              <p className="mx-auto max-w-2xl text-base text-white/50">
                Real results delivered across {industry.title.toLowerCase()} engagements.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {industry.metrics.map((metric, i) => (
              <MotionDiv
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card glass className="group text-center">
                  <div className="mb-2">
                    <CountUp
                      to={parseFloat(metric.value)}
                      suffix={metric.suffix}
                      className="text-3xl font-bold text-white sm:text-4xl"
                    />
                  </div>
                  <p className="text-sm text-white/40">{metric.label}</p>
                </Card>
              </MotionDiv>
            ))}
          </div>
        </Container>
      </Section>

      {/* Technologies Used */}
      <Section padding="lg" background="subtle">
        <Container>
          <FadeIn>
            <div className="mb-12">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
                  <Cpu className="h-5 w-5 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Technologies Used</h2>
              </div>
              <p className="max-w-2xl text-base text-white/50">
                Modern technology stack powering our {industry.title.toLowerCase()} solutions.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="flex flex-wrap gap-3">
              {industry.technologies.map((tech, i) => (
                <Badge
                  key={tech}
                  variant={techColors[i % techColors.length]}
                  size="md"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Related Case Studies */}
      {industry.caseStudySlugs.length > 0 && (
        <Section padding="lg">
          <Container>
            <FadeIn>
              <div className="mb-12">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                    <BookOpen className="h-5 w-5 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Related Case Studies</h2>
                </div>
                <p className="max-w-2xl text-base text-white/50">
                  In-depth stories of how we delivered results for {industry.title.toLowerCase()} clients.
                </p>
              </div>
            </FadeIn>

            <Stagger staggerChildren={0.1}>
              <div className="grid gap-6 md:grid-cols-2">
                {industry.caseStudySlugs.map((slug) => (
                  <StaggerItem key={slug}>
                    <Link href={`/case-studies/${slug}`}>
                      <Card glass hover glow="blue" className="group">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-wider text-white/30">
                              Case Study
                            </p>
                            <h3 className="mt-1 text-lg font-semibold text-white transition-colors group-hover:text-blue-300">
                              {slug
                                .split("-")
                                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                                .join(" ")}
                            </h3>
                            <p className="mt-1 text-sm text-white/40">
                              {industry.title} Solutions
                            </p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-blue-400" />
                        </div>
                      </Card>
                    </Link>
                  </StaggerItem>
                ))}
              </div>
            </Stagger>
          </Container>
        </Section>
      )}

      {/* Related Projects */}
      {industry.relatedProjectSlugs.length > 0 && (
        <Section padding="lg" background="subtle">
          <Container>
            <FadeIn>
              <div className="mb-12">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                    <FolderOpen className="h-5 w-5 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Related Projects</h2>
                </div>
                <p className="max-w-2xl text-base text-white/50">
                  Explore our portfolio of {industry.title.toLowerCase()} software projects.
                </p>
              </div>
            </FadeIn>

            <Stagger staggerChildren={0.1}>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {industry.relatedProjectSlugs.map((slug) => (
                  <StaggerItem key={slug}>
                    <Link href={`/portfolio/${slug}`}>
                      <Card glass hover glow="purple" className="group flex h-full flex-col">
                        <div className="mb-4 flex h-40 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-purple-600/20 via-blue-600/10 to-cyan-600/20">
                          <span className="text-3xl font-bold text-white/10">
                            {slug
                              .split("-")
                              .slice(0, 2)
                              .map((w) => w.charAt(0).toUpperCase())
                              .join("")}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col">
                          <Badge variant="purple" size="sm" className="mb-2 w-fit">
                            {industry.title}
                          </Badge>
                          <h3 className="mb-2 text-lg font-semibold text-white leading-snug transition-colors group-hover:text-purple-300">
                            {slug
                              .split("-")
                              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                              .join(" ")}
                          </h3>
                          <div className="mt-auto flex items-center justify-end border-t border-white/[0.06] pt-4">
                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-400 transition-colors group-hover:text-purple-300">
                              View Project
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </StaggerItem>
                ))}
              </div>
            </Stagger>
          </Container>
        </Section>
      )}
    </>
  );
}
