"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import {
  Check,
  Users,
  Briefcase,
  Award,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { JobCard } from "./job-card";
import { getJobsByDepartment } from "@/data/careers";
import type { JobData } from "@/data/careers";

type JobDetailContentProps = {
  job: JobData;
};

export function JobDetailContent({ job }: JobDetailContentProps) {
  const relatedJobs = getJobsByDepartment(job.departmentSlug)
    .filter((j) => j.id !== job.id && j.isActive)
    .slice(0, 3);

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <Briefcase className="h-4 w-4" />,
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">About the Role</h3>
            <p className="text-sm leading-relaxed text-white/60">{job.description}</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {job.technologyStack.map((tech) => (
                <Badge key={tech} variant="default" size="md">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "responsibilities",
      label: "Responsibilities",
      icon: <Check className="h-4 w-4" />,
      content: (
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">What You'll Do</h3>
          <ul className="space-y-3">
            {job.responsibilities.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "requirements",
      label: "Requirements",
      icon: <Award className="h-4 w-4" />,
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Must-Have Qualifications</h3>
            <ul className="space-y-3">
              {job.requirements.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {job.preferredSkills.length > 0 && (
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Nice-to-Have Skills</h3>
              <ul className="space-y-3">
                {job.preferredSkills.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "benefits",
      label: "Benefits",
      icon: <Award className="h-4 w-4" />,
      content: (
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">What We Offer</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {job.benefits.map((benefit) => (
              <Card key={benefit} padding="sm" hover={false}>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                    <Check className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="text-sm text-white/70">{benefit}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "interview",
      label: "Interview Process",
      icon: <MessageSquare className="h-4 w-4" />,
      content: (
        <div>
          <h3 className="mb-6 text-lg font-semibold text-white">Our Hiring Process</h3>
          <div className="relative space-y-0">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-white/[0.06]" />
            {job.interviewProcess.map((step, i) => (
              <div key={i} className="relative flex gap-4 pb-6">
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0f] text-sm font-semibold text-blue-400">
                  {i + 1}
                </div>
                <div className="pt-2">
                  <p className="text-sm text-white/70">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "team",
      label: "Hiring Team",
      icon: <Users className="h-4 w-4" />,
      content: (
        <div>
          <h3 className="mb-6 text-lg font-semibold text-white">Meet the Team</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {job.teamInfo.map((member) => (
              <Card key={member.name} padding="md" hover={false}>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-lg font-semibold text-white/80">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{member.name}</h4>
                    <p className="text-xs text-blue-400/80">{member.role}</p>
                    <p className="mt-2 text-xs leading-relaxed text-white/40">{member.bio}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <Section padding="lg">
      <Container>
        <Tabs items={tabs} variant="pills" className="mx-auto max-w-4xl" />

        {/* Company Overview Section */}
        <FadeIn className="mt-16">
          <div className="mx-auto max-w-4xl">
            <h3 className="mb-4 text-lg font-semibold text-white">About StackSentry</h3>
            <p className="text-sm leading-relaxed text-white/50">
              StackSentry Technologies is a leading enterprise software company specializing in
              AI-powered solutions that transform how organizations operate. With offices across
              15+ countries and a team of 200+ world-class engineers, designers, and thinkers, we
              build products that solve real enterprise challenges. Our platform serves thousands
              of organizations worldwide, and we&apos;re just getting started.
            </p>
          </div>
        </FadeIn>

        {/* Related Jobs */}
        {relatedJobs.length > 0 && (
          <FadeIn delay={0.1} className="mt-16">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Related Positions</h3>
                <Link
                  href="/careers/jobs"
                  className="flex items-center gap-1 text-sm text-blue-400 transition-colors hover:text-blue-300"
                >
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <Stagger staggerChildren={0.1}>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedJobs.map((relatedJob) => (
                    <StaggerItem key={relatedJob.id}>
                      <JobCard job={relatedJob} />
                    </StaggerItem>
                  ))}
                </div>
              </Stagger>
            </div>
          </FadeIn>
        )}

        {/* Bottom CTA */}
        <FadeIn delay={0.2} className="mt-16">
          <Card padding="xl" glow="blue" className="mx-auto max-w-4xl text-center">
            <h3 className="text-xl font-semibold text-white">Ready to Join Us?</h3>
            <p className="mx-auto mt-3 max-w-lg text-sm text-white/50">
              We review every application personally. Apply now and take the next step in your
              career with StackSentry.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href={`/careers/jobs/${job.slug}/apply`}>
                <Button
                  size="lg"
                  icon={<Briefcase className="h-4 w-4" />}
                  iconPosition="left"
                >
                  Apply for this Position
                </Button>
              </Link>
              <Link href="/careers/jobs">
                <Button variant="secondary" size="lg">
                  Browse More Jobs
                </Button>
              </Link>
            </div>
          </Card>
        </FadeIn>
      </Container>
    </Section>
  );
}
