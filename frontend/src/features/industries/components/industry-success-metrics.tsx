"use client";

import { BarChart3, TrendingUp, Target, Award } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { CountUp } from "@/components/ui/count-up";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";
import type { IndustryData } from "@/data/industries";

const metricIcons = [BarChart3, TrendingUp, Target, Award];

const progressMax: Record<string, number> = {
  "Patient Processing": 100,
  "Billing Errors": 100,
  "Record Access": 10,
  "Compliance Score": 100,
};

type IndustrySuccessMetricsProps = {
  industry: IndustryData;
};

export function IndustrySuccessMetrics({ industry }: IndustrySuccessMetricsProps) {
  return (
    <Section padding="lg">
      <Container>
        <FadeIn>
          <div className="mb-16 text-center">
            <Heading
              level="h2"
              description="Measurable outcomes delivered across our engagements"
            >
              Success Metrics
            </Heading>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industry.metrics.map((metric, i) => {
            const Icon = metricIcons[i % metricIcons.length];
            const numericValue = parseFloat(metric.value);
            const progressPercent = Math.min(
              (numericValue / (progressMax[metric.label] ?? 100)) * 100,
              100,
            );

            return (
              <MotionDiv
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Card glass hover className="group text-center">
                  <MotionDiv
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 transition-colors group-hover:from-purple-500/30 group-hover:to-blue-500/30">
                      <Icon className="h-6 w-6 text-purple-400" />
                    </div>

                    <div className="mb-2">
                      <CountUp
                        to={numericValue}
                        suffix={metric.suffix}
                        className="text-3xl font-bold text-white sm:text-4xl"
                      />
                    </div>

                    <p className="mb-4 text-sm text-white/40">{metric.label}</p>

                    <div className="mx-auto h-1 w-full max-w-[120px] overflow-hidden rounded-full bg-white/[0.06]">
                      <MotionDiv
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progressPercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                      />
                    </div>
                  </MotionDiv>
                </Card>
              </MotionDiv>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
