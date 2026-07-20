"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowRight } from "lucide-react";
import { JobCard } from "./job-card";
import { getFeaturedJobs } from "@/data/careers";

export function FeaturedJobs() {
  const featuredJobs = getFeaturedJobs();

  return (
    <Section id="featured-jobs" padding="lg" background="gradient">
      <Container>
        <FadeIn>
          <Heading
            level="h2"
            description="Discover roles where your expertise drives real impact. Every position comes with competitive compensation, equity, and world-class benefits."
          >
            Featured Opportunities
          </Heading>
        </FadeIn>

        <Stagger staggerChildren={0.1} delay={0.2} className="mt-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.map((job) => (
              <StaggerItem key={job.id}>
                <JobCard job={job} />
              </StaggerItem>
            ))}
          </div>
        </Stagger>

        <FadeIn delay={0.4} className="mt-12 text-center">
          <Link href="/careers/jobs">
            <Button
              variant="secondary"
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
            >
              View All Positions
            </Button>
          </Link>
        </FadeIn>
      </Container>
    </Section>
  );
}
