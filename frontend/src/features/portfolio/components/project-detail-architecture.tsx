"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Card } from "@/components/ui/card";
import { Shield, Zap, Database, Server, Lock, Globe } from "lucide-react";

type ProjectDetailArchitectureProps = {
  architecture: string;
  databaseDesign: string;
  apiArchitecture: string;
  securityMeasures: string[];
  scalabilityFeatures: string[];
};

export function ProjectDetailArchitecture({
  architecture,
  databaseDesign,
  apiArchitecture,
  securityMeasures,
  scalabilityFeatures,
}: ProjectDetailArchitectureProps) {
  return (
    <Section padding="lg" background="gradient">
      <Container>
        <FadeIn direction="up">
          <Heading level="h2" className="mb-12">
            Architecture &amp; Infrastructure
          </Heading>
        </FadeIn>

        <FadeIn direction="up">
          <Card glass padding="lg" className="mb-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                <Server className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-white">Architecture Overview</h3>
                <p className="leading-relaxed text-white/50">{architecture}</p>
              </div>
            </div>
          </Card>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-2">
          <FadeIn direction="left">
            <Card glass padding="lg" className="h-full">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/10">
                  <Database className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">Database Design</h3>
                  <p className="leading-relaxed text-white/50">{databaseDesign}</p>
                </div>
              </div>
            </Card>
          </FadeIn>

          <FadeIn direction="right">
            <Card glass padding="lg" className="h-full">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10">
                  <Globe className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-white">API Architecture</h3>
                  <p className="leading-relaxed text-white/50">{apiArchitecture}</p>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <FadeIn direction="left" delay={0.1}>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-400" />
                Security Measures
              </h3>
              <div className="space-y-3">
                {securityMeasures.map((measure) => (
                  <div
                    key={measure}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <Lock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span className="text-sm text-white/60">{measure}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.1}>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-400" />
                Scalability Features
              </h3>
              <div className="space-y-3">
                {scalabilityFeatures.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <Zap className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <span className="text-sm text-white/60">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
