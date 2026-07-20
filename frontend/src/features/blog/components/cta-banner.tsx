"use client";

import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

type CTABannerProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTABanner({
  title = "Ready to Start Your Next Digital Project?",
  description = "Let's discuss how StackSentry can help bring your vision to life with cutting-edge technology solutions.",
  primaryLabel = "Schedule Consultation",
  primaryHref = "/contact",
  secondaryLabel = "Explore Services",
  secondaryHref = "/solutions",
}: CTABannerProps) {
  return (
    <FadeIn direction="up">
      <Card
        glass
        padding="xl"
        className="relative overflow-hidden bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10 text-center"
      >
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-purple-500/5 blur-[100px]" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <MessageSquare className="h-12 w-12 text-blue-400 mx-auto mb-6" />
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {title}
          </h3>
          <p className="text-white/40 mb-8 leading-relaxed max-w-xl mx-auto">
            {description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href={primaryHref}>
              <Button variant="primary" size="lg" icon={<ArrowRight className="h-5 w-5" />} iconPosition="right">
                {primaryLabel}
              </Button>
            </Link>
            <Link href={secondaryHref}>
              <Button variant="outline" size="lg">
                {secondaryLabel}
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </FadeIn>
  );
}
