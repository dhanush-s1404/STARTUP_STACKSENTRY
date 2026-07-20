"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useInView } from "@/hooks";
import { Clock, Layers } from "lucide-react";

type TimelineEvent = {
  phase: string;
  title: string;
  description: string;
  duration: string;
};

type CaseStudyTimelineProps = {
  events: TimelineEvent[];
};

const phaseConfig: Record<
  string,
  { color: string; badgeVariant: "blue" | "purple" | "amber" | "cyan" | "green"; dotBg: string; glow: string }
> = {
  Discovery: {
    color: "text-blue-400",
    badgeVariant: "blue",
    dotBg: "bg-blue-500",
    glow: "shadow-blue-500/40",
  },
  Design: {
    color: "text-purple-400",
    badgeVariant: "purple",
    dotBg: "bg-purple-500",
    glow: "shadow-purple-500/40",
  },
  Development: {
    color: "text-amber-400",
    badgeVariant: "amber",
    dotBg: "bg-amber-500",
    glow: "shadow-amber-500/40",
  },
  Testing: {
    color: "text-cyan-400",
    badgeVariant: "cyan",
    dotBg: "bg-cyan-500",
    glow: "shadow-cyan-500/40",
  },
  Deployment: {
    color: "text-emerald-400",
    badgeVariant: "green",
    dotBg: "bg-emerald-500",
    glow: "shadow-emerald-500/40",
  },
};

function getPhaseConfig(phase: string) {
  const normalized = Object.keys(phaseConfig).find(
    (key) => phase.toLowerCase().includes(key.toLowerCase()),
  );
  return normalized ? phaseConfig[normalized] : phaseConfig.Discovery;
}

function PhaseProgress({ events, activeIndex }: { events: TimelineEvent[]; activeIndex: number }) {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <div ref={ref} className="mb-12">
      <div className="flex items-center justify-between gap-2">
        {events.map((event, i) => {
          const config = getPhaseConfig(event.phase);
          const isPast = i < activeIndex;
          const isCurrent = i === activeIndex;

          return (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <MotionDiv
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: i * 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500",
                  isPast && "border-transparent bg-white/10",
                  isCurrent && cn("border-transparent shadow-lg", config.dotBg, config.glow),
                  !isPast && !isCurrent && "border-white/10 bg-transparent",
                )}
              >
                <span className={cn("text-xs font-bold", isPast || isCurrent ? "text-white" : "text-white/30")}>
                  {i + 1}
                </span>
                {isCurrent && (
                  <MotionDiv
                    className={cn("absolute inset-0 rounded-full", config.dotBg, "opacity-30")}
                    animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </MotionDiv>
              <span
                className={cn(
                  "hidden text-xs font-medium sm:block",
                  isPast || isCurrent ? "text-white/70" : "text-white/30",
                )}
              >
                {event.phase}
              </span>
            </div>
          );
        })}
      </div>
      <div className="relative mx-auto mt-4 h-1 max-w-full overflow-hidden rounded-full bg-white/5">
        <MotionDiv
          className={cn(
            "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500",
          )}
          initial={{ width: "0%" }}
          animate={isInView ? { width: `${((activeIndex + 1) / events.length) * 100}%` } : { width: "0%" }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function TimelineEntry({
  event,
  index,
}: {
  event: TimelineEvent;
  index: number;
}) {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const isLeft = index % 2 === 0;
  const config = getPhaseConfig(event.phase);

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      {/* Left or right spacer */}
      <div className="hidden w-1/2 md:block">
        {isLeft && (
          <MotionDiv
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="pr-12"
          >
            <EntryCard event={event} config={config} />
          </MotionDiv>
        )}
      </div>

      {/* Center dot */}
      <div className="absolute left-1/2 z-10 -translate-x-1/2">
        <MotionDiv
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div
            className={cn(
              "flex h-4 w-4 items-center justify-center rounded-full border-2 border-black",
              config.dotBg,
            )}
          >
            <MotionDiv
              className={cn("absolute inset-0 rounded-full", config.dotBg, "opacity-40")}
              animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
            />
          </div>
        </MotionDiv>
      </div>

      {/* Right or left spacer */}
      <div className="hidden w-1/2 md:block">
        {!isLeft && (
          <MotionDiv
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="pl-12"
          >
            <EntryCard event={event} config={config} />
          </MotionDiv>
        )}
      </div>

      {/* Mobile: always visible below the dot */}
      <div className="absolute top-8 left-4 w-[calc(100%-2rem)] md:hidden">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <EntryCard event={event} config={config} />
        </MotionDiv>
      </div>
    </div>
  );
}

function EntryCard({
  event,
  config,
}: {
  event: TimelineEvent;
  config: (typeof phaseConfig)[string];
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] p-6",
        "transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04] hover:shadow-xl",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          "bg-gradient-to-br from-white/[0.02] to-transparent",
        )}
      />

      <div className="relative z-10">
        <div className="mb-3 flex items-center gap-2">
          <Badge variant={config.badgeVariant} size="sm">
            {event.phase}
          </Badge>
          <span className="inline-flex items-center gap-1 text-xs text-white/40">
            <Clock className="h-3 w-3" />
            {event.duration}
          </span>
        </div>

        <h3 className={cn("text-lg font-semibold text-white", config.color)}>
          {event.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-white/50">
          {event.description}
        </p>
      </div>

      <div
        className={cn(
          "absolute -bottom-12 -right-12 h-24 w-24 rounded-full blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100",
          config.dotBg,
          "opacity-10",
        )}
      />
    </div>
  );
}

export function CaseStudyTimeline({ events }: CaseStudyTimelineProps) {
  if (events.length === 0) return null;

  return (
    <Section padding="lg">
      <Container size="md">
        <FadeIn>
          <Heading
            level="h2"
            description="A phase-by-phase breakdown of how we delivered results."
          >
            <span className="inline-flex items-center gap-3">
              <Layers className="h-8 w-8 text-blue-400" />
              Project Timeline
            </span>
          </Heading>
        </FadeIn>

        {/* Phase progress indicator */}
        <PhaseProgress events={events} activeIndex={events.length - 1} />

        {/* Desktop alternating timeline */}
        <div className="relative mx-auto mt-4 hidden max-w-4xl md:block">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
            <div className="relative h-full w-px bg-white/10">
              <TimelineLine />
            </div>
          </div>

          <div className="space-y-12">
            {events.map((event, i) => (
              <TimelineEntry key={i} event={event} index={i} />
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="relative mt-4 md:hidden">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />

          <div className="space-y-8">
            {events.map((event, i) => {
              const { ref, isInView } = useInView({ threshold: 0.2 });
              const config = getPhaseConfig(event.phase);

              return (
                <div key={i} ref={ref} className="relative flex gap-6">
                  <MotionDiv
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-black"
                  >
                    <div className={cn("h-2.5 w-2.5 rounded-full", config.dotBg)} />
                  </MotionDiv>

                  <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 pb-2"
                  >
                    <EntryCard event={event} config={config} />
                  </MotionDiv>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function TimelineLine() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div ref={ref} className="h-full">
      <MotionDiv
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-emerald-500/50"
        initial={{ height: "0%" }}
        animate={isInView ? { height: "100%" } : { height: "0%" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
