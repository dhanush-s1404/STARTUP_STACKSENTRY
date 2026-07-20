"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Card } from "@/components/ui/card";
import { Activity, Gauge, Users, TrendingUp, FlaskConical, Rocket, BarChart3 } from "lucide-react";

type ProjectDetailMetricsProps = {
  performanceMetrics: {
    responseTime?: string;
    uptime?: string;
    concurrentUsers?: string;
    loadTime?: string;
    [key: string]: string | undefined;
  };
  testingStrategy: string;
  deploymentInfo: string;
  monitoring: string;
};

const metricIcons: Record<string, React.ReactNode> = {
  responseTime: <Gauge className="h-5 w-5 text-blue-400" />,
  uptime: <Activity className="h-5 w-5 text-emerald-400" />,
  concurrentUsers: <Users className="h-5 w-5 text-purple-400" />,
  loadTime: <TrendingUp className="h-5 w-5 text-cyan-400" />,
};

const metricLabels: Record<string, string> = {
  responseTime: "Response Time",
  uptime: "Uptime",
  concurrentUsers: "Concurrent Users",
  loadTime: "Load Time",
};

export function ProjectDetailMetrics({
  performanceMetrics,
  testingStrategy,
  deploymentInfo,
  monitoring,
}: ProjectDetailMetricsProps) {
  const metricEntries = Object.entries(performanceMetrics).filter(
    ([, value]) => value !== undefined,
  );

  return (
    <Section padding="lg" background="gradient">
      <Container>
        <FadeIn direction="up">
          <Heading level="h2" className="mb-12">
            Performance &amp; Metrics
          </Heading>
        </FadeIn>

        {metricEntries.length > 0 && (
          <div className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {metricEntries.map(([key, value], index) => (
              <FadeIn key={key} direction="up" delay={index * 0.1}>
                <Card glass padding="lg" className="text-center">
                  <div className="mb-3 flex justify-center">
                    {metricIcons[key] || <BarChart3 className="h-5 w-5 text-blue-400" />}
                  </div>
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <p className="mt-1 text-sm text-white/40">{metricLabels[key] || key}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          <FadeIn direction="up" delay={0.2}>
            <Card glass padding="lg" className="h-full">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                  <FlaskConical className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Testing Strategy</h3>
              </div>
              <p className="text-sm leading-relaxed text-white/50">{testingStrategy}</p>
            </Card>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <Card glass padding="lg" className="h-full">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                  <Rocket className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Deployment</h3>
              </div>
              <p className="text-sm leading-relaxed text-white/50">{deploymentInfo}</p>
            </Card>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <Card glass padding="lg" className="h-full">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
                  <Activity className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Monitoring</h3>
              </div>
              <p className="text-sm leading-relaxed text-white/50">{monitoring}</p>
            </Card>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
