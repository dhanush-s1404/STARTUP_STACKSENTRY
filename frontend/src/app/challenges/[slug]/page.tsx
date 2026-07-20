"use client";

import { notFound, useParams } from "next/navigation";
import { AlertTriangle, Lightbulb, Building2, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getChallengeBySlug, getChallengesByCategory } from "@/data/challenges";
import { INDUSTRIES } from "@/data/industries";

const impactColors: Record<string, "amber" | "default" | "outline"> = {
  Critical: "amber",
  High: "default",
  Medium: "outline",
} as const;

export default function ChallengeDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const challenge = getChallengeBySlug(slug);

  if (!challenge) {
    notFound();
  }

  const relatedChallenges = getChallengesByCategory(challenge.category)
    .filter((c) => c.slug !== challenge.slug)
    .slice(0, 3);

  const relevantIndustries = challenge.relevantIndustries
    .map((is) => INDUSTRIES.find((i) => i.slug === is))
    .filter(Boolean);

  return (
    <main className="flex-1 pt-16">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Challenges", href: "/challenges" },
          { label: challenge.title },
        ]}
      />

      {/* Hero */}
      <Section padding="lg" background="gradient">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <Badge variant={impactColors[challenge.impact] ?? "default"} size="md">
                  {challenge.impact} Impact
                </Badge>
                <Badge variant="default" size="sm">
                  {challenge.category}
                </Badge>
              </div>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10">
                <AlertTriangle className="h-8 w-8 text-amber-400" />
              </div>
              <Heading level="h1">{challenge.title}</Heading>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/50">
                {challenge.description}
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Symptoms */}
      <Section padding="lg">
        <Container>
          <FadeIn>
            <div className="mb-12">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Symptoms & Indicators</h2>
              </div>
              <p className="max-w-2xl text-base text-white/50">
                How this challenge manifests in organizations.
              </p>
            </div>
          </FadeIn>

          <Stagger staggerChildren={0.08}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {challenge.symptoms.map((symptom, i) => (
                <StaggerItem key={i}>
                  <Card glass className="h-full">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                        <span className="text-xs font-bold text-amber-400">{i + 1}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-white/60">{symptom}</p>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </Container>
      </Section>

      {/* Root Cause & Solutions */}
      <Section padding="lg" background="subtle">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Root Cause */}
            <FadeIn>
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Root Cause</h2>
                </div>
                <Card glass className="border-l-4 border-l-red-500/30">
                  <p className="text-base leading-relaxed text-white/60">
                    {challenge.rootCause}
                  </p>
                </Card>
              </div>
            </FadeIn>

            {/* Our Solutions */}
            <FadeIn>
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
                    <Lightbulb className="h-5 w-5 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Our Solutions</h2>
                </div>
                <div className="space-y-3">
                  {challenge.solutions.map((solution, i) => (
                    <Card key={i} glass className="border-l-4 border-l-cyan-500/30">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                        <p className="text-sm leading-relaxed text-white/60">{solution}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Relevant Industries */}
      {relevantIndustries.length > 0 && (
        <Section padding="lg">
          <Container>
            <FadeIn>
              <div className="mb-12">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                    <Building2 className="h-5 w-5 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Affected Industries</h2>
                </div>
                <p className="max-w-2xl text-base text-white/50">
                  Industries that commonly face this challenge.
                </p>
              </div>
            </FadeIn>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relevantIndustries.map((industry) => (
                <Link key={industry!.slug} href={`/industries/${industry!.slug}`}>
                  <Card glass glow="blue" hover className="group flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white transition-colors group-hover:text-blue-300">
                        {industry!.title}
                      </p>
                      <p className="mt-0.5 text-xs text-white/40">{industry!.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/20 transition-all group-hover:translate-x-0.5 group-hover:text-blue-400" />
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Related Challenges */}
      {relatedChallenges.length > 0 && (
        <Section padding="lg" background="subtle">
          <Container>
            <FadeIn>
              <div className="mb-12">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Related Challenges</h2>
                </div>
                <p className="max-w-2xl text-base text-white/50">
                  Other challenges in the same category.
                </p>
              </div>
            </FadeIn>

            <Stagger staggerChildren={0.05}>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedChallenges.map((rc) => (
                  <StaggerItem key={rc.slug}>
                    <Link href={`/challenges/${rc.slug}`}>
                      <Card glass hover glow="none" className="group h-full">
                        <div className="mb-3 flex items-center justify-between">
                          <Badge variant={impactColors[rc.impact] ?? "default"} size="sm">
                            {rc.impact}
                          </Badge>
                          <Badge variant="default" size="sm">
                            {rc.category}
                          </Badge>
                        </div>
                        <h3 className="mb-2 text-base font-semibold text-white transition-colors group-hover:text-amber-300">
                          {rc.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-white/50">{rc.description}</p>
                      </Card>
                    </Link>
                  </StaggerItem>
                ))}
              </div>
            </Stagger>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section padding="lg">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <Heading
                level="h2"
                description="Let's discuss how we can help you overcome this challenge with a tailored solution."
              >
                Ready to Solve This Challenge?
              </Heading>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/solutions">
                  <Button size="lg" variant="primary">
                    Explore Solutions <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="ghost">
                    Talk to an Expert
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </main>
  );
}
