"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import {
  CheckCircle2,
  Clock,
  Award,
  Users,
  ArrowRight,
  Calendar,
  BookOpen,
} from "lucide-react";
import { INTERNSHIPS, DEPARTMENTS } from "@/data/careers";
import type { InternshipData } from "@/data/careers";

type InternshipDetailProps = {
  internship: InternshipData;
};

const departmentColorMap: Record<string, "blue" | "purple" | "cyan" | "green" | "amber"> = {
  engineering: "blue",
  "ai-ml": "purple",
  devops: "cyan",
  "cyber-security": "green",
  data: "blue",
  design: "amber",
  product: "amber",
  marketing: "green",
};

export function InternshipDetail({ internship }: InternshipDetailProps) {
  const department = DEPARTMENTS.find((d) => d.slug === internship.departmentSlug);
  const badgeVariant = departmentColorMap[internship.departmentSlug] ?? "blue";

  const relatedInternships = INTERNSHIPS.filter(
    (i) => i.id !== internship.id,
  ).slice(0, 3);

  return (
    <Section padding="lg">
      <Container>
        <div className="mx-auto max-w-4xl">
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3">
              {department && (
                <Badge variant={badgeVariant} size="md">
                  {department.name}
                </Badge>
              )}
              <span className="inline-flex items-center gap-1.5 text-sm text-white/40">
                <Clock className="h-4 w-4" />
                {internship.duration}
              </span>
              {internship.certificateProvided && (
                <Badge variant="amber" size="sm">
                  <Award className="mr-1 h-3 w-3" />
                  Certificate Provided
                </Badge>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
              {internship.title}
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-6 text-lg leading-relaxed text-white/60">
              {internship.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-10">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-white">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                Requirements
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {internship.requirements.map((req) => (
                  <div
                    key={req}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span className="text-sm text-white/70">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="mt-10">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-white">
                <Users className="h-5 w-5 text-purple-400" />
                Mentorship Details
              </h3>
              <Card className="bg-gradient-to-br from-purple-500/5 to-blue-500/5">
                <p className="text-base leading-relaxed text-white/60">
                  {internship.mentorshipDetails}
                </p>
              </Card>
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="mt-10">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-white">
                <Clock className="h-5 w-5 text-cyan-400" />
                Program Timeline
              </h3>
              <div className="relative ml-4 border-l-2 border-white/[0.06]">
                <div className="relative mb-8 ml-6">
                  <div className="absolute -left-[1.625rem] top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-500/30 bg-blue-500/10">
                    <Calendar className="h-3.5 w-3.5 text-blue-400" />
                  </div>
                  <p className="text-sm font-medium text-white">Application</p>
                  <p className="mt-1 text-sm text-white/40">Submit your application with resume and cover letter</p>
                </div>
                <div className="relative mb-8 ml-6">
                  <div className="absolute -left-[1.625rem] top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-purple-500/30 bg-purple-500/10">
                    <BookOpen className="h-3.5 w-3.5 text-purple-400" />
                  </div>
                  <p className="text-sm font-medium text-white">Interview Process</p>
                  <p className="mt-1 text-sm text-white/40">Technical screen and virtual on-site interview</p>
                </div>
                <div className="relative mb-8 ml-6">
                  <div className="absolute -left-[1.625rem] top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-cyan-500/30 bg-cyan-500/10">
                    <Clock className="h-3.5 w-3.5 text-cyan-400" />
                  </div>
                  <p className="text-sm font-medium text-white">{internship.duration}</p>
                  <p className="mt-1 text-sm text-white/40">Full-time program with mentorship and project work</p>
                </div>
                <div className="relative ml-6">
                  <div className="absolute -left-[1.625rem] top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-emerald-500/30 bg-emerald-500/10">
                    <Award className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <p className="text-sm font-medium text-white">Completion & Demo Day</p>
                  <p className="mt-1 text-sm text-white/40">
                    Present your work at demo day
                    {internship.certificateProvided && " and receive your certificate"}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.7}>
            <div className="mt-12 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-cyan-600/20 p-8 text-center">
              <h3 className="text-2xl font-bold text-white">Ready to Start Your Journey?</h3>
              <p className="mx-auto mt-3 max-w-lg text-sm text-white/50">
                Apply now for the {internship.title} and gain hands-on experience at StackSentry.
              </p>
              <Button
                size="lg"
                className="mt-6"
                icon={<ArrowRight className="h-5 w-5" />}
                iconPosition="right"
              >
                Apply Now
              </Button>
            </div>
          </FadeIn>

          {relatedInternships.length > 0 && (
            <FadeIn delay={0.8}>
              <div className="mt-16">
                <h3 className="mb-6 text-xl font-semibold text-white">
                  Related Internships
                </h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  {relatedInternships.map((rel) => {
                    const relDept = DEPARTMENTS.find(
                      (d) => d.slug === rel.departmentSlug,
                    );
                    return (
                      <a
                        key={rel.id}
                        href={`#${rel.slug}`}
                        className="group block rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:bg-white/[0.04] hover:shadow-lg"
                      >
                        {relDept && (
                          <Badge
                            variant={departmentColorMap[rel.departmentSlug] ?? "blue"}
                            size="sm"
                          >
                            {relDept.name}
                          </Badge>
                        )}
                        <h4 className="mt-3 text-sm font-semibold text-white transition-colors group-hover:text-blue-300">
                          {rel.title}
                        </h4>
                        <p className="mt-1 text-xs text-white/40">
                          {rel.duration}
                        </p>
                      </a>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </Container>
    </Section>
  );
}
