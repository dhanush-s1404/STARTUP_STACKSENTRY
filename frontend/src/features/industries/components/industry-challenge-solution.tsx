"use client";

import { AlertTriangle, Lightbulb, ArrowRight, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { IndustryData } from "@/data/industries";
import type { ChallengeData } from "@/data/challenges";

type IndustryChallengeSolutionProps = {
  industry: IndustryData;
  challenges: ChallengeData[];
};

export function IndustryChallengeSolution({
  industry,
  challenges,
}: IndustryChallengeSolutionProps) {
  return (
    <Section padding="lg" background="subtle">
      <Container>
        <FadeIn>
          <div className="mb-16 text-center">
            <Heading level="h2" description="Turning obstacles into opportunities with targeted solutions">
              Challenges & Solutions
            </Heading>
          </div>
        </FadeIn>

        <div className="space-y-8">
          {challenges.map((challenge, index) => {
            const isEven = index % 2 === 0;
            const solutionText =
              industry.solutions[index % industry.solutions.length] ??
              "Tailored solution addressing this challenge with proven methodologies.";

            return (
              <FadeIn
                key={challenge.slug}
                direction={isEven ? "left" : "right"}
                delay={index * 0.08}
              >
                <div
                  className={cn(
                    "flex flex-col items-stretch gap-0 lg:flex-row lg:items-stretch",
                    !isEven && "lg:flex-row-reverse",
                  )}
                >
                  <Card
                    glass
                    hover
                    className="group flex-1 border-amber-500/10 !bg-amber-500/[0.02] transition-all hover:border-amber-500/20"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 transition-colors group-hover:bg-amber-500/20">
                        <AlertTriangle className="h-5 w-5 text-amber-400" />
                      </div>
                      <div>
                        <Badge variant="amber" size="sm">
                          Challenge
                        </Badge>
                      </div>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">
                      {challenge.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-white/50">
                      {challenge.description}
                    </p>
                    {challenge.symptoms.length > 0 && (
                      <div className="border-t border-white/[0.06] pt-4">
                        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-amber-400/60">
                          Symptoms
                        </p>
                        <ul className="space-y-1.5">
                          {challenge.symptoms.slice(0, 2).map((symptom) => (
                            <li
                              key={symptom}
                              className="flex items-start gap-2 text-xs text-white/40"
                            >
                              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-amber-400/40" />
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Card>

                  <div className="flex items-center justify-center px-4 py-4 lg:px-0 lg:py-0">
                    <MotionDiv
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
                    >
                      <ArrowRight className="h-4 w-4 text-white/30 rotate-90 lg:rotate-0" />
                    </MotionDiv>
                  </div>

                  <Card
                    glass
                    hover
                    glow="cyan"
                    className="group flex-1 !bg-emerald-500/[0.02] transition-all hover:border-emerald-500/20"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 transition-colors group-hover:bg-emerald-500/20">
                        <Lightbulb className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <Badge variant="green" size="sm">
                          Solution
                        </Badge>
                      </div>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">
                      {challenge.solutions[0] ?? "Custom Solution"}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-white/50">
                      {solutionText}
                    </p>
                    {challenge.impact && (
                      <div className="border-t border-white/[0.06] pt-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-emerald-400" />
                          <span className="text-xs font-medium text-emerald-400/80">
                            Impact: {challenge.impact}
                          </span>
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
