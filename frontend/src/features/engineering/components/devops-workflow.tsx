"use client";

import {
  ClipboardList,
  Code2,
  Hammer,
  TestTube,
  Rocket,
  Cloud,
  Settings,
  Monitor,
  Container,
  Network,
  GitBranch,
  Server,
} from "lucide-react";
import { Container as UiContainer } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { MotionDiv } from "@/lib/motion";

const PIPELINE_STAGES = [
  { icon: ClipboardList, title: "Plan", description: "Define requirements and architecture" },
  { icon: Code2, title: "Code", description: "Write and review code" },
  { icon: Hammer, title: "Build", description: "Compile and package artifacts" },
  { icon: TestTube, title: "Test", description: "Automated testing and validation" },
  { icon: Rocket, title: "Release", description: "Version and package releases" },
  { icon: Cloud, title: "Deploy", description: "Ship to production environments" },
  { icon: Settings, title: "Operate", description: "Run and manage infrastructure" },
  { icon: Monitor, title: "Monitor", description: "Observe and alert on health" },
];

const DEVOPS_PRACTICES = [
  {
    icon: Container,
    title: "Containerization",
    tool: "Docker",
    description:
      "Package applications with Docker for consistent environments across development, staging, and production.",
    benefits: ["Reproducible builds", "Environment parity", "Isolated dependencies"],
  },
  {
    icon: Network,
    title: "Orchestration",
    tool: "Kubernetes",
    description:
      "Manage containerized workloads at scale with automatic scaling, rolling updates, and self-healing.",
    benefits: ["Auto-scaling", "Zero-downtime deploys", "Service discovery"],
  },
  {
    icon: GitBranch,
    title: "CI/CD",
    tool: "GitHub Actions",
    description:
      "Automate build, test, and deployment pipelines triggered by code changes for rapid, reliable delivery.",
    benefits: ["Fast feedback loops", "Automated quality gates", "Repeatable deployments"],
  },
  {
    icon: Server,
    title: "Infrastructure as Code",
    tool: "Terraform",
    description:
      "Define and provision infrastructure declaratively for version-controlled, auditable, and repeatable environments.",
    benefits: ["Version-controlled infra", "One-click provisioning", "Drift detection"],
  },
];

export function DevopsWorkflow() {
  return (
    <Section id="devops" padding="lg" background="gradient">
      <UiContainer>
        <FadeIn direction="up">
          <Heading
            level="h2"
            gradient
            description="Our end-to-end DevOps pipeline — from planning to monitoring."
            className="mb-12"
          >
            DevOps Workflow
          </Heading>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <div className="mb-16 overflow-x-auto pb-4">
            <div className="flex items-center gap-2 min-w-max">
              {PIPELINE_STAGES.map((stage, index) => (
                <div key={stage.title} className="flex items-center gap-2">
                  <MotionDiv whileHover={{ scale: 1.05, y: -2 }} className="shrink-0">
                    <Card glass hover padding="sm" className="w-28 text-center">
                      <stage.icon className="mx-auto h-5 w-5 text-blue-400" />
                      <h4 className="mt-2 text-xs font-semibold text-white">{stage.title}</h4>
                      <p className="mt-1 text-[10px] text-white/40 leading-tight">{stage.description}</p>
                    </Card>
                  </MotionDiv>
                  {index < PIPELINE_STAGES.length - 1 && (
                    <div className="flex h-px w-4 shrink-0 items-center">
                      <div className="h-px w-full bg-gradient-to-r from-blue-500/40 to-purple-500/40" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <Heading level="h3" className="mb-8">
            Key DevOps Practices
          </Heading>
        </FadeIn>

        <Stagger staggerChildren={0.1} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DEVOPS_PRACTICES.map((practice) => (
            <StaggerItem key={practice.title}>
              <Card glass hover glow="purple" padding="md" className="h-full">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
                    <practice.icon className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{practice.title}</h3>
                    <Badge variant="purple" size="sm">
                      {practice.tool}
                    </Badge>
                  </div>
                </div>
                <p className="mt-3 text-sm text-white/50 leading-relaxed">{practice.description}</p>
                <ul className="mt-3 space-y-1.5">
                  {practice.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-1.5 text-xs text-white/50">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-purple-400" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </UiContainer>
    </Section>
  );
}
