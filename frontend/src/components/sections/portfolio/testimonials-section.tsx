"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv, AnimatePresence } from "@/lib/motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO",
    company: "TechVentures Inc.",
    content:
      "StackSentry transformed our hiring process with their AI recruitment platform. The 60% reduction in hiring time has been game-changing for our growth.",
    rating: 5,
    industry: "Technology",
    initials: "SC",
  },
  {
    name: "James Mitchell",
    role: "VP Operations",
    company: "Global Health Network",
    content:
      "The hospital management system they built handles 10,000+ patients daily. Their understanding of healthcare workflows is exceptional.",
    rating: 5,
    industry: "Healthcare",
    initials: "JM",
  },
  {
    name: "Priya Sharma",
    role: "Founder & CEO",
    company: "EduLearn Platform",
    content:
      "Our LMS now serves 500,000 students across 20 countries. StackSentry's technical expertise and commitment to quality is unmatched.",
    rating: 5,
    industry: "Education",
    initials: "PS",
  },
  {
    name: "Michael Torres",
    role: "Director of IT",
    company: "Meridian Finance Group",
    content:
      "The CRM platform increased our sales conversion by 45%. Their team delivered exactly what they promised, on time and within budget.",
    rating: 5,
    industry: "Finance",
    initials: "MT",
  },
  {
    name: "Emily Watson",
    role: "Head of Digital",
    company: "RetailMax International",
    content:
      "Our e-commerce platform handles Black Friday traffic spikes flawlessly. StackSentry built a truly enterprise-grade solution.",
    rating: 5,
    industry: "Retail",
    initials: "EW",
  },
  {
    name: "David Park",
    role: "COO",
    company: "LogiFlow Solutions",
    content:
      "The fleet management system reduced our fuel costs by 30% and improved delivery times by 25%. Incredible ROI.",
    rating: 5,
    industry: "Logistics",
    initials: "DP",
  },
  {
    name: "Amanda Foster",
    role: "CEO",
    company: "InnovateAI Labs",
    content:
      "Working with StackSentry on our AI chatbot platform was seamless. Their AI/ML expertise is world-class.",
    rating: 5,
    industry: "Technology",
    initials: "AF",
  },
  {
    name: "Robert Kim",
    role: "Plant Manager",
    company: "Precision Manufacturing Co.",
    content:
      "The workflow automation engine eliminated 80% of manual processes. Our team can now focus on innovation.",
    rating: 5,
    industry: "Manufacturing",
    initials: "RK",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next, isPaused]);

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  };

  const t = testimonials[current];

  return (
    <Section padding="lg" background="subtle">
      <Container>
        <FadeIn>
          <Heading
            level="h2"
            gradient
            description="Hear from the leaders who trust StackSentry to power their most critical technology initiatives."
          >
            What Our Clients Say
          </Heading>
        </FadeIn>

        <div
          className="relative mx-auto mt-16 max-w-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <MotionDiv
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-sm md:p-10"
            >
              {/* Gradient border */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1), rgba(34,211,238,0.1))",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  padding: "1px",
                }}
              />

              <Quote className="mb-6 h-8 w-8 text-blue-500/30" />

              <p className="text-lg leading-relaxed text-white/70">
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="mt-6 flex gap-0.5">
                {Array.from({ length: t.rating }, (_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-sm text-white/50">
                    {t.role} at {t.company}
                  </div>
                  <Badge variant="outline" size="sm" className="mt-1">
                    {t.industry}
                  </Badge>
                </div>
              </div>
            </MotionDiv>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white"
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white"
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
