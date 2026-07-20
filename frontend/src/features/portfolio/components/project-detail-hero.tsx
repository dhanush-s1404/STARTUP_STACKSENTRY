"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";
import { ArrowRight, Clock, Users, Calendar, Building2, Star } from "lucide-react";

type ProjectDetailHeroProps = {
  title: string;
  shortDescription: string;
  thumbnailUrl?: string;
  technologies: string[];
  industry: string;
  clientType: string;
  status: string;
  projectDuration: string;
  teamSize: number;
  year: number;
  isFeatured: boolean;
};

const statusVariant: Record<string, "green" | "blue" | "amber" | "default"> = {
  completed: "green",
  in_progress: "blue",
  maintenance: "amber",
};

const statusLabel: Record<string, string> = {
  completed: "Completed",
  in_progress: "In Progress",
  maintenance: "Maintenance",
};

const techColor: Array<"blue" | "purple" | "cyan" | "green" | "amber"> = [
  "blue",
  "purple",
  "cyan",
  "green",
  "amber",
];

export function ProjectDetailHero({
  title,
  shortDescription,
  technologies,
  industry,
  clientType,
  status,
  projectDuration,
  teamSize,
  year,
  isFeatured,
}: ProjectDetailHeroProps) {
  return (
    <Section padding="lg" background="gradient">
      <Container>
        <MotionDiv
          className="absolute -top-20 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10">
          <FadeIn direction="up">
            <Breadcrumb
              items={[
                { label: "Portfolio", href: "/portfolio" },
                { label: title },
              ]}
              className="mb-8"
            />
          </FadeIn>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
            <FadeIn direction="left" className="flex-1">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="mb-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                  <Badge variant="blue" size="md">{industry}</Badge>
                  <Badge variant={statusVariant[status] || "default"} size="md">
                    {statusLabel[status] || status}
                  </Badge>
                  {isFeatured && (
                    <Badge variant="amber" size="md">
                      <Star className="mr-1 h-3 w-3" /> Featured
                    </Badge>
                  )}
                </div>

                <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                  {title}
                </h1>

                <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/50">
                  {shortDescription}
                </p>

                <div className="mb-8 flex flex-wrap justify-center gap-2 lg:justify-start">
                  {technologies.map((tech, i) => (
                    <Badge key={tech} variant={techColor[i % techColor.length]} size="md">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                    <Clock className="mx-auto mb-1 h-4 w-4 text-blue-400" />
                    <p className="text-xs text-white/30">Duration</p>
                    <p className="text-sm font-medium text-white">{projectDuration}</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                    <Users className="mx-auto mb-1 h-4 w-4 text-purple-400" />
                    <p className="text-xs text-white/30">Team Size</p>
                    <p className="text-sm font-medium text-white">{teamSize}</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                    <Calendar className="mx-auto mb-1 h-4 w-4 text-cyan-400" />
                    <p className="text-xs text-white/30">Year</p>
                    <p className="text-sm font-medium text-white">{year}</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                    <Building2 className="mx-auto mb-1 h-4 w-4 text-emerald-400" />
                    <p className="text-xs text-white/30">Client Type</p>
                    <p className="text-sm font-medium text-white">{clientType}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    icon={<ArrowRight className="h-5 w-5" />}
                    iconPosition="right"
                  >
                    View Case Study
                  </Button>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      size="lg"
                      icon={<ArrowRight className="h-5 w-5" />}
                      iconPosition="right"
                    >
                      Start Similar Project
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2} className="flex-1">
              <div className="flex h-72 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-cyan-600/20 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                <span className="relative z-10 text-6xl font-bold text-white/10">
                  {title.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                </span>

                <MotionDiv
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/20 blur-[60px]"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <MotionDiv
                  className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-purple-500/20 blur-[60px]"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  );
}
