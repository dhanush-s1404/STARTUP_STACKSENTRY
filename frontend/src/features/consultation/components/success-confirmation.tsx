"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Calendar, FileText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

type Props = {
  type: "project" | "meeting";
};

export function SuccessConfirmation({ type }: Props) {
  return (
    <Section padding="lg">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10"
          >
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CheckCircle className="h-12 w-12 text-emerald-400" />
            </motion.div>
          </motion.div>

          <FadeIn delay={0.4}>
            <Heading
              level="h2"
              description={
                type === "project"
                  ? "We've received your project details and will review them within 1-2 business days."
                  : "We've received your meeting request and will confirm the schedule within 24 hours."
              }
            >
              {type === "project" ? "Project Inquiry Submitted!" : "Meeting Request Sent!"}
            </Heading>
          </FadeIn>

          {/* Next steps */}
          <FadeIn delay={0.6}>
            <div className="my-10 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 text-left">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
                What happens next?
              </h3>
              <ol className="space-y-3">
                {[
                  "Our team reviews your submission within 1-2 business days",
                  type === "project"
                    ? "We analyze your requirements and prepare tailored recommendations"
                    : "We confirm your meeting time and send calendar invitations",
                  "A senior consultant reaches out to discuss next steps",
                  "We provide a detailed proposal and estimated timeline",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-medium text-blue-400">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </FadeIn>

          <FadeIn delay={0.8}>
            <div className="flex flex-wrap justify-center gap-4">
              {type === "project" && (
                <Link href="/consultation/meeting">
                  <Button variant="secondary">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book a Meeting Instead
                  </Button>
                </Link>
              )}
              <Link href="/solutions">
                <Button variant="ghost">
                  <FileText className="mr-2 h-4 w-4" />
                  Explore Solutions
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost">Back to Home</Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
