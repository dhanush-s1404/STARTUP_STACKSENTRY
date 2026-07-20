"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/lib/icon-registry";

type RelatedService = {
  title: string;
  description: string;
  href: string;
  icon: string;
};

type ServiceDetailRelatedProps = {
  services: RelatedService[];
};

export function ServiceDetailRelated({ services }: ServiceDetailRelatedProps) {
  return (
    <Section padding="lg">
      <Container>
        <Heading
          level="h2"
          description="Discover how our other services can complement your project"
          className="mb-12"
        >
          Explore Related Services
        </Heading>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon);

            return (
              <FadeIn key={service.title} delay={index * 0.05}>
                <Link href={service.href} className="group block">
                  <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] hover:shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                        <Icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-white transition-colors group-hover:text-blue-400">
                          {service.title}
                        </h3>
                        <p className="mt-1 text-xs text-white/40 line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-blue-400 transition-all group-hover:gap-2">
                      Learn More
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
