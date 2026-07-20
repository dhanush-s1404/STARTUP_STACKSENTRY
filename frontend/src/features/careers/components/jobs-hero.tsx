"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SearchInput } from "@/components/ui/search-input";
import { JOBS } from "@/data/careers";
import { Briefcase } from "lucide-react";

type JobsHeroProps = {
  searchValue?: string;
  onSearch?: (value: string) => void;
  onClear?: () => void;
};

export function JobsHero({ searchValue = "", onSearch, onClear }: JobsHeroProps) {
  const totalJobs = JOBS.filter((j) => j.isActive).length;

  return (
    <Section padding="lg">
      <Container>
        <div className="relative py-12 md:py-16">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-40 top-0 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />
            <div className="absolute -left-40 top-1/2 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />
          </div>

          <div className="relative z-10">
            <FadeIn>
              <Breadcrumb
                items={[
                  { label: "Careers", href: "/careers" },
                  { label: "Jobs" },
                ]}
              />
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="mt-8 flex items-center gap-3">
                <Heading level="h1">Open Positions</Heading>
                <Badge variant="blue" size="md">
                  <Briefcase className="mr-1 h-3.5 w-3.5" />
                  {totalJobs} roles
                </Badge>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-4 max-w-2xl text-lg text-white/50">
                Find your next opportunity. We&apos;re looking for talented people who are
                passionate about building enterprise software that makes a difference.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-8 max-w-xl">
                <SearchInput
                  value={searchValue}
                  onChange={(e) => onSearch?.(e.target.value)}
                  onSearch={onSearch}
                  onClear={onClear}
                  placeholder="Search by title, skill, or keyword..."
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  );
}
