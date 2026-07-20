"use client";

import Link from "next/link";
import { Check, Calendar } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

export function ContactSuccess() {
  return (
    <Section padding="lg">
      <Container>
        <FadeIn direction="up" className="max-w-2xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-green-500/10 flex items-center justify-center">
                <Check className="h-12 w-12 text-green-400" />
              </div>
              <div className="absolute inset-0 rounded-full bg-green-500/5 animate-ping" style={{ animationDuration: "2s" }} />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Thank You!
          </h1>
          <p className="text-lg text-white/40 mb-4 leading-relaxed">
            Your message has been received. Our team will review your inquiry and get back to you within 24 hours.
          </p>

          <Card glass padding="lg" className="text-left mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">What happens next?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-semibold text-blue-400">
                  1
                </div>
                <div>
                  <p className="text-sm font-medium text-white">We Review Your Inquiry</p>
                  <p className="text-xs text-white/40">Our team carefully reviews your project details and requirements.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-sm font-semibold text-purple-400">
                  2
                </div>
                <div>
                  <p className="text-sm font-medium text-white">We Reach Out</p>
                  <p className="text-xs text-white/40">We contact you within 24 hours to discuss next steps and schedule a consultation.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-sm font-semibold text-cyan-400">
                  3
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Let&apos;s Build Together</p>
                  <p className="text-xs text-white/40">We collaborate to define scope, timeline, and create your solution.</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/">
              <Button variant="outline" size="lg">
                Back to Home
              </Button>
            </Link>
            <Link href="/consultation">
              <Button variant="primary" size="lg" icon={<Calendar className="h-5 w-5" />} iconPosition="right">
                Book a Consultation
              </Button>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
