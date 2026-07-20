"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import {
  CheckCircle2,
  FileSearch,
  Phone,
  Users,
  PartyPopper,
  Linkedin,
  Twitter,
  Link2,
  ArrowLeft,
} from "lucide-react";

function generateReferenceNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SS-${timestamp}-${random}`;
}

const timelineSteps = [
  {
    icon: FileSearch,
    title: "Application Review",
    description: "Our talent team will review your application within 5 business days.",
  },
  {
    icon: Phone,
    title: "Initial Phone Screen",
    description:
      "If your profile matches, a recruiter will reach out to schedule a 30-minute call.",
  },
  {
    icon: Users,
    title: "Interview Process",
    description:
      "Technical and behavioral interviews with the hiring team over 2-3 weeks.",
  },
  {
    icon: PartyPopper,
    title: "Offer & Onboarding",
    description:
      "Receive your offer and begin the onboarding journey to become a StackSenterite.",
  },
];

export function ApplicationSuccess() {
  const referenceNumber = useMemo(() => generateReferenceNumber(), []);

  return (
    <Section padding="lg">
      <Container size="md">
        <div className="space-y-12 text-center">
          {/* Animated checkmark */}
          <FadeIn direction="up" delay={0.1}>
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="success-checkmark flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 ring-1 ring-emerald-500/30">
                  <CheckCircle2 className="h-12 w-12 text-emerald-400" />
                </div>
                <div className="success-checkmark absolute inset-0 rounded-full bg-emerald-500/10 blur-xl" />
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Application Submitted Successfully
                </h1>
                <p className="mx-auto max-w-lg text-lg text-white/50">
                  Thank you for applying! We&apos;ve received your application and our
                  recruitment team will review it shortly.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-4">
                <p className="text-xs uppercase tracking-wider text-white/40">Reference Number</p>
                <p className="mt-1 font-mono text-lg font-semibold text-blue-400">{referenceNumber}</p>
              </div>
            </div>
          </FadeIn>

          {/* What happens next */}
          <FadeIn direction="up" delay={0.3}>
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white">What Happens Next</h2>

              <div className="relative mx-auto max-w-2xl">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent" />

                <Stagger staggerChildren={0.15} className="space-y-6">
                  {timelineSteps.map((step, i) => (
                    <StaggerItem key={step.title}>
                      <div className="flex items-start gap-5 text-left">
                        <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-[hsl(230,63%,5%)]">
                          <step.icon className="h-5 w-5 text-blue-400" />
                          <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                            {i + 1}
                          </div>
                        </div>
                        <div className="pt-1">
                          <h3 className="font-medium text-white">{step.title}</h3>
                          <p className="mt-1 text-sm text-white/50">{step.description}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </div>
          </FadeIn>

          {/* Share & Actions */}
          <FadeIn direction="up" delay={0.5}>
            <Card className="space-y-6">
              <p className="text-sm text-white/60">
                Know someone who&apos;d be a great fit? Share this opportunity with them.
              </p>

              <div className="flex items-center justify-center gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:border-white/20"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:border-white/20"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </a>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigator.clipboard?.writeText(window.location.href)}
                >
                  <Link2 className="h-4 w-4" />
                  Copy Link
                </Button>
              </div>

              <div className="border-t border-white/[0.06] pt-6">
                <Link href="/careers/jobs">
                  <Button variant="ghost" icon={<ArrowLeft className="h-4 w-4" />}>
                    Back to All Jobs
                  </Button>
                </Link>
              </div>
            </Card>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
