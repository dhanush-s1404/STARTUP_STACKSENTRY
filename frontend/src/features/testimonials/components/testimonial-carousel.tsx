"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";
import { AnimatePresence, MotionDiv } from "@/lib/motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";
import { useDesktop } from "@/hooks";
import { TestimonialCard } from "./testimonial-card";
import type { TestimonialCardProps } from "./testimonial-card";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TestimonialCarouselProps = {
  testimonials: TestimonialCardProps[];
  autoPlay?: boolean;
  interval?: number;
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.95,
  }),
};

export function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
}: TestimonialCarouselProps) {
  const isDesktop = useDesktop();
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const visibleCount = isDesktop ? 3 : 1;
  const totalPages = Math.ceil(testimonials.length / visibleCount);

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prev]) => {
        const next = prev + newDirection;
        if (next < 0) return [totalPages - 1, newDirection];
        if (next >= totalPages) return [0, newDirection];
        return [next, newDirection];
      });
    },
    [totalPages],
  );

  const goToPage = useCallback(
    (target: number) => {
      setPage(([prev]) => [target, target > prev ? 1 : -1]);
    },
    [],
  );

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isPaused) return;
    const timer = setInterval(() => paginate(1), interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, isPaused, paginate]);

  const startIndex = page * visibleCount;
  const visibleTestimonials = testimonials.slice(startIndex, startIndex + visibleCount);

  // Fill remaining slots if we're at the end
  if (visibleTestimonials.length < visibleCount) {
    visibleTestimonials.push(
      ...testimonials.slice(0, visibleCount - visibleTestimonials.length),
    );
  }

  return (
    <Section padding="md">
      <Container>
        <FadeIn>
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
          >
            {/* Carousel track */}
            <div className="overflow-hidden rounded-2xl">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <MotionDiv
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                  }}
                  className={cn(
                    "grid gap-6",
                    isDesktop ? "grid-cols-3" : "grid-cols-1",
                  )}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Page ${page + 1} of ${totalPages}`}
                >
                  {visibleTestimonials.map((testimonial, idx) => (
                    <div key={`${testimonial.clientName}-${page}-${idx}`}>
                      <TestimonialCard {...testimonial} />
                    </div>
                  ))}
                </MotionDiv>
              </AnimatePresence>
            </div>

            {/* Previous arrow */}
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous testimonials"
              className={cn(
                "absolute -left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center",
                "rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-sm",
                "transition-all hover:border-white/20 hover:bg-white/10 hover:text-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                "md:-left-5 md:h-12 md:w-12",
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Next arrow */}
            <button
              onClick={() => paginate(1)}
              aria-label="Next testimonials"
              className={cn(
                "absolute -right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center",
                "rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-sm",
                "transition-all hover:border-white/20 hover:bg-white/10 hover:text-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                "md:-right-5 md:h-12 md:w-12",
              )}
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Navigation dots */}
            <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Testimonial pages">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  role="tab"
                  aria-selected={i === page}
                  aria-label={`Go to page ${i + 1}`}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                    i === page
                      ? "h-2 w-6 bg-amber-400"
                      : "h-2 w-2 bg-white/20 hover:bg-white/40",
                  )}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
