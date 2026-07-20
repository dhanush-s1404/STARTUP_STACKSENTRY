"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/lib/motion";
import { Briefcase, Send, Mail } from "lucide-react";

export function CareersCta() {
  return (
    <Section id="careers-cta" padding="lg">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-cyan-600/20" />
          <div className="absolute inset-0 mesh-gradient opacity-50" />
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/20 blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-purple-500/20 blur-[80px]" />

          <div className="relative z-10 px-8 py-16 text-center md:px-16 md:py-24">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 text-white">
                Ready to{" "}
                <span className="text-gradient-primary">Join Our Team</span>?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-[hsl(var(--color-text-tertiary))]">
                We&apos;re always looking for talented people who are passionate about
                building enterprise software that makes a difference. Explore our
                open roles and take the next step in your career.
              </p>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link href="/careers/jobs">
                <Button
                  size="xl"
                  icon={<Briefcase className="h-5 w-5" />}
                  iconPosition="right"
                >
                  View Open Positions
                </Button>
              </Link>
              <Link href="/careers/apply">
                <Button
                  variant="secondary"
                  size="xl"
                  icon={<Send className="h-4 w-4" />}
                >
                  Apply Now
                </Button>
              </Link>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6"
            >
              <Link href="mailto:careers@stacksentry.com">
                <Button variant="ghost">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact HR
                </Button>
              </Link>
            </MotionDiv>
          </div>
        </div>
      </Container>
    </Section>
  );
}
