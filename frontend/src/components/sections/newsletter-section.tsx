"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { MotionDiv } from "@/lib/motion";
import { CheckCircle, Send } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    setSubmitted(true);
  };

  return (
    <Section id="newsletter" padding="md" background="subtle">
      <Container size="md">
        <ScrollReveal>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center md:p-12">
            <Heading level="h3" description="Stay updated with our latest insights, case studies, and company news.">
              Subscribe to Our Newsletter
            </Heading>

            {submitted ? (
              <MotionDiv
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
                  <CheckCircle className="h-7 w-7 text-emerald-400" />
                </div>
                <p className="text-lg font-semibold text-white">You&apos;re subscribed!</p>
                <p className="mt-2 text-sm text-[hsl(var(--color-text-muted))]">
                  Thank you for subscribing. Check your inbox for a confirmation email.
                </p>
              </MotionDiv>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8">
                <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="Enter your email"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-[hsl(var(--color-text-muted))] focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25"
                      aria-label="Email address"
                    />
                    {error && (
                      <p className="mt-1.5 text-left text-xs text-red-400">{error}</p>
                    )}
                  </div>
                  <Button type="submit" size="lg">
                    <Send className="mr-2 h-4 w-4" />
                    Subscribe
                  </Button>
                </div>
                <p className="mt-3 text-xs text-[hsl(var(--color-text-muted))]">
                  No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </form>
            )}
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
