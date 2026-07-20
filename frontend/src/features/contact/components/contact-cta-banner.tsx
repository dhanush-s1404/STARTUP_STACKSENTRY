"use client";

import Link from "next/link";
import { Calendar, MessageSquare, Eye, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

export function ContactCTABanner() {
  return (
    <FadeIn direction="up">
      <Card
        glass
        padding="xl"
        className="relative overflow-hidden bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10 text-center"
      >
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-purple-500/5 blur-[100px]" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <MessageSquare className="h-12 w-12 text-blue-400 mx-auto mb-6" />
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Next Digital Project?
          </h3>
          <p className="text-white/40 mb-8 leading-relaxed max-w-2xl mx-auto">
            Let&apos;s discuss your vision, explore possibilities, and create something extraordinary together.
            Our team is ready to help you succeed.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/consultation">
              <Button variant="primary" size="lg" icon={<Calendar className="h-5 w-5" />} iconPosition="left">
                Schedule Consultation
              </Button>
            </Link>
            <Link href="/solutions">
              <Button variant="secondary" size="lg" icon={<Eye className="h-5 w-5" />} iconPosition="left">
                Explore Services
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" size="lg" icon={<Briefcase className="h-5 w-5" />} iconPosition="left">
                View Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </FadeIn>
  );
}
