"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { MapPin, Briefcase, Clock } from "lucide-react";

type ApplicationHeroProps = {
  jobTitle: string;
  department: string;
  location: string;
};

export function ApplicationHero({ jobTitle, department, location }: ApplicationHeroProps) {
  return (
    <Section padding="lg" background="gradient">
      <Container>
        <FadeIn direction="up" className="space-y-8">
          <Breadcrumb
            items={[
              { label: "Careers", href: "/careers" },
              { label: "Jobs", href: "/careers/jobs" },
              { label: jobTitle, href: `/careers/jobs/${jobTitle.toLowerCase().replace(/\s+/g, "-")}` },
              { label: "Apply" },
            ]}
          />

          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Apply for{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {jobTitle}
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-white/50">
              We&apos;re excited about your interest in joining StackSentry. Complete your
              application and our talent team will get back to you promptly.
            </p>

            <div className="flex flex-wrap gap-3">
              <Badge variant="blue" size="md">
                <Briefcase className="mr-1.5 h-3.5 w-3.5" />
                {department}
              </Badge>
              <Badge variant="purple" size="md">
                <MapPin className="mr-1.5 h-3.5 w-3.5" />
                {location}
              </Badge>
              <Badge variant="cyan" size="md">
                <Clock className="mr-1.5 h-3.5 w-3.5" />
                Full-time
              </Badge>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
