"use client";

import { useState, useEffect, useCallback } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Avatar } from "@/components/ui/avatar";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { MotionDiv, AnimatePresence } from "@/lib/motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO",
    company: "Meridian Health Systems",
    content: "StackSentry transformed our entire hiring pipeline. Their AI recruitment platform reduced our time-to-hire by 80% while significantly improving candidate quality. The team's technical expertise and attention to detail is unmatched.",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Marcus Rodriguez",
    role: "VP of Engineering",
    company: "Atlas Financial",
    content: "We've partnered with StackSentry on three major enterprise projects now. Their ability to deliver complex, scalable solutions on time and within budget consistently exceeds our expectations. Truly world-class development.",
    rating: 5,
    avatar: "MR",
  },
  {
    name: "Elena Vasquez",
    role: "Head of Digital",
    company: "NovaTech Industries",
    content: "The automation platform StackSentry built for us saves over 2,000 hours per month across our operations. Their understanding of enterprise workflows and attention to security compliance was impressive.",
    rating: 5,
    avatar: "EV",
  },
  {
    name: "James Mitchell",
    role: "Founder & CEO",
    company: "CloudScale",
    content: "From initial consultation to deployment, StackSentry delivered an exceptional experience. Their cloud infrastructure reduced our costs by 40% while improving performance by 3x. Highly recommended.",
    rating: 5,
    avatar: "JM",
  },
  {
    name: "Dr. Amara Okafor",
    role: "Chief Data Officer",
    company: "GlobalMed Solutions",
    content: "StackSentry's healthcare platform handles millions of patient records with HIPAA compliance. Their AI diagnostic assistance tool has become invaluable for our medical staff. Outstanding technical delivery.",
    rating: 5,
    avatar: "AO",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <Section id="testimonials" padding="lg" background="subtle">
      <Container>
        <ScrollReveal>
          <Heading
            level="h2"
            gradient
            description="Hear from the leaders who trust StackSentry to power their most critical technology initiatives."
          >
            Client Testimonials
          </Heading>
        </ScrollReveal>

        <div className="relative mt-16 mx-auto max-w-3xl">
          <AnimatePresence mode="wait" custom={direction}>
            <MotionDiv
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-sm md:p-10"
            >
              <Quote className="mb-6 h-8 w-8 text-blue-500/30" />
              <p className="text-body-lg leading-relaxed text-[hsl(var(--color-text-secondary))]">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Avatar name={t.name} alt={t.name} size="lg" />
                <div>
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-sm text-[hsl(var(--color-text-muted))]">
                    {t.role} at {t.company}
                  </div>
                  <div className="mt-1 flex gap-0.5">
                    {Array.from({ length: t.rating }, (_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </MotionDiv>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[hsl(var(--color-text-muted))] transition-all hover:bg-white/10 hover:text-white"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "h-2 w-6 bg-blue-500"
                      : "h-2 w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[hsl(var(--color-text-muted))] transition-all hover:bg-white/10 hover:text-white"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
