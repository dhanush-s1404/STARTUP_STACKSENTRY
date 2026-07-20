"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { FadeIn } from "@/components/ui/fade-in";
import { Clock, FileText, Lightbulb } from "lucide-react";

type ApplicationFormHeroProps = {
  jobTitle: string;
};

const tips = [
  { icon: FileText, text: "Have your resume ready" },
  { icon: Clock, text: "Takes about 10 minutes" },
  { icon: Lightbulb, text: "Answer thoughtfully — quality matters" },
];

export function ApplicationFormHero({ jobTitle }: ApplicationFormHeroProps) {
  return (
    <Section padding="md" background="gradient">
      <Container>
        <FadeIn direction="up">
          <div className="space-y-6">
            <Breadcrumb
              items={[
                { label: "Careers", href: "/careers" },
                { label: "Jobs", href: "/careers/jobs" },
                { label: jobTitle },
                { label: "Apply" },
              ]}
            />

            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                Apply for{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {jobTitle}
                </span>
              </h1>
              <p className="max-w-2xl text-lg text-white/50">
                Take the next step in your career. Complete the application below and our
                recruitment team will review your profile within 5 business days.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {tips.map((tip) => (
                <div
                  key={tip.text}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-sm text-white/60"
                >
                  <tip.icon className="h-4 w-4 text-blue-400" />
                  {tip.text}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
