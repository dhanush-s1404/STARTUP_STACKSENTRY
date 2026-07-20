"use client";

import Link from "next/link";
import { Calendar, FileText, Send } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";

export function ContactHero() {
  return (
    <Section id="contact-hero" padding="lg" background="gradient">
      <Container>
        <div className="relative py-12 md:py-20">
          <MotionDiv
            className="absolute -top-20 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-purple-500/10 blur-[120px]"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <MotionDiv
            className="absolute -bottom-20 right-0 h-[300px] w-[400px] rounded-full bg-blue-500/8 blur-[100px]"
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <FadeIn direction="up" className="relative z-10 text-center max-w-4xl mx-auto">
            <Heading
              level="h1"
              gradient
              className="text-4xl md:text-5xl lg:text-6xl"
            >
              Let&apos;s Build Something <br />Extraordinary Together
            </Heading>

            <p className="mt-6 text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
              Whether you&apos;re a startup with a bold vision or an enterprise ready to transform,
              let&apos;s discuss how StackSentry can bring your next project to life.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/consultation">
                <Button variant="primary" size="lg" icon={<Calendar className="h-5 w-5" />} iconPosition="left">
                  Book a Consultation
                </Button>
              </Link>
              <Link href="#contact-form">
                <Button variant="secondary" size="lg" icon={<FileText className="h-5 w-5" />} iconPosition="left">
                  Request a Proposal
                </Button>
              </Link>
              <Link href="#contact-form">
                <Button variant="outline" size="lg" icon={<Send className="h-5 w-5" />} iconPosition="left">
                  Send a Message
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
