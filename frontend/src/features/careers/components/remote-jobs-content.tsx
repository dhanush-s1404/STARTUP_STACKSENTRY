"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { FadeIn } from "@/components/ui/fade-in";
import { DEPARTMENTS, LOCATIONS, getJobsByWorkModel } from "@/data/careers";
import {
  MapPin,
  Clock,
  DollarSign,
  ArrowRight,
  Wifi,
  Laptop,
  Globe,
  Heart,
} from "lucide-react";

const remoteBenefits = [
  {
    icon: Laptop,
    title: "Home Office Stipend",
    description: "$2,500 to set up your ideal workspace at home",
  },
  {
    icon: Globe,
    title: "Work From Anywhere",
    description: "Flexible location with quarterly team gatherings",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Async-first culture that respects your schedule",
  },
  {
    icon: Heart,
    title: "Wellness Support",
    description: "Mental health resources and wellness programs",
  },
];

export function RemoteJobsContent() {
  const remoteJobs = getJobsByWorkModel("remote");

  return (
    <>
      <Section padding="lg" background="gradient">
        <Container>
          <Heading
            level="h2"
            description="Join our distributed team and work from anywhere in the world."
          >
            Open Remote Positions
          </Heading>

          <Stagger
            delay={0.2}
            staggerChildren={0.08}
            className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-4 lg:grid-cols-2"
          >
            {remoteJobs.map((job) => {
              const department = DEPARTMENTS.find(
                (d) => d.slug === job.departmentSlug,
              );
              const location = LOCATIONS.find(
                (l) => l.slug === job.locationSlug,
              );

              return (
                <StaggerItem key={job.id}>
                  <Link href={`/careers/${job.slug}`} className="block h-full">
                    <Card padding="none" hover className="group h-full overflow-hidden">
                      <div className="p-6">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {department && (
                              <Badge variant="blue" size="sm">
                                {department.name}
                              </Badge>
                            )}
                            <Badge variant="green" size="sm">
                              <Wifi className="mr-1 h-3 w-3" />
                              Remote
                            </Badge>
                          </div>
                          {job.isFeatured && (
                            <Badge variant="amber" size="sm">
                              Featured
                            </Badge>
                          )}
                        </div>

                        <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-blue-300">
                          {job.title}
                        </h3>

                        <p className="mb-4 text-sm text-white/50 line-clamp-2">
                          {job.shortDescription}
                        </p>

                        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-white/40">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {location?.city ?? "Remote"}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {job.employmentType}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <DollarSign className="h-3.5 w-3.5" />
                            {job.salaryCurrency} {(job.salaryMin / 1000).toFixed(0)}k - {(job.salaryMax / 1000).toFixed(0)}k
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {job.technologyStack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-white/40"
                            >
                              {tech}
                            </span>
                          ))}
                          {job.technologyStack.length > 4 && (
                            <span className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-white/30">
                              +{job.technologyStack.length - 4}
                            </span>
                          )}
                        </div>

                        <div className="mt-4 flex items-center justify-end">
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 transition-all duration-200 group-hover:gap-2">
                            View Details
                            <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>

          {remoteJobs.length === 0 && (
            <div className="mt-12 text-center">
              <p className="text-white/50">
                No remote positions available at the moment. Check back soon!
              </p>
            </div>
          )}
        </Container>
      </Section>

      <Section padding="lg">
        <Container>
          <FadeIn>
            <Heading
              level="h3"
              description="We invest in making remote work effective and enjoyable for everyone."
            >
              Benefits of Remote Work at StackSentry
            </Heading>
          </FadeIn>

          <Stagger
            delay={0.2}
            staggerChildren={0.1}
            className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {remoteBenefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <Card padding="md" className="text-center">
                  <benefit.icon className="mx-auto mb-4 h-8 w-8 text-emerald-400" />
                  <h4 className="mb-2 text-sm font-semibold text-white">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-white/50">
                    {benefit.description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn delay={0.4}>
            <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-white/[0.06] bg-gradient-to-br from-emerald-600/10 via-blue-600/5 to-purple-600/10 p-8 text-center">
              <h4 className="text-xl font-bold text-white">
                Our Remote Culture
              </h4>
              <p className="mx-auto mt-3 max-w-lg text-sm text-white/50">
                We&apos;re async-first, documentation-driven, and results-focused.
                Our remote teams collaborate across time zones using Slack, Zoom,
                Notion, and GitHub to deliver exceptional products.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {["Async-First", "Documentation-Driven", "Results-Focused", "Trust-Based"].map(
                  (tag) => (
                    <Badge key={tag} variant="outline" size="md">
                      {tag}
                    </Badge>
                  ),
                )}
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
