"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";
import { SearchBar } from "./search-bar";

export function BlogHero() {
  return (
    <Section id="blog-hero" padding="lg" background="gradient">
      <Container>
        <div className="relative py-8 md:py-12">
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

          <FadeIn direction="up" className="relative z-10 text-center">
            <Heading
              level="h1"
              gradient
              description="Expert perspectives on technology, innovation, and business transformation"
            >
              Insights &amp; Resources
            </Heading>

            <div className="mt-8 max-w-xl mx-auto">
              <SearchBar />
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
