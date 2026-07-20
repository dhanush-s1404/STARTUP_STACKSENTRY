"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";
import { useInView } from "@/hooks";

type TimelineEntry = {
  phase: string;
  duration: string;
  description: string;
};

type ProjectDetailTimelineProps = {
  developmentTimeline: TimelineEntry[];
};

const dotColors = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-cyan-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
];

const lineColors = [
  "from-blue-500/20 to-purple-500/20",
  "from-purple-500/20 to-cyan-500/20",
  "from-cyan-500/20 to-emerald-500/20",
  "from-emerald-500/20 to-amber-500/20",
  "from-amber-500/20 to-rose-500/20",
];

function TimelineItem({
  entry,
  index,
  isLast,
}: {
  entry: TimelineEntry;
  index: number;
  isLast: boolean;
}) {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <div ref={ref} className="relative flex gap-6 pb-8">
      <div className="flex flex-col items-center">
        <MotionDiv
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${dotColors[index % dotColors.length]}`}
        >
          <span className="text-sm font-bold text-white">{index + 1}</span>
        </MotionDiv>
        {!isLast && (
          <div className={`h-full w-px bg-gradient-to-b ${lineColors[index % lineColors.length]}`} />
        )}
      </div>

      <MotionDiv
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 pb-4"
      >
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-semibold text-white">{entry.phase}</h3>
            <span className="rounded-full bg-white/5 px-3 py-0.5 text-xs text-white/50 border border-white/[0.06]">
              {entry.duration}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-white/50">{entry.description}</p>
        </div>
      </MotionDiv>
    </div>
  );
}

export function ProjectDetailTimeline({
  developmentTimeline,
}: ProjectDetailTimelineProps) {
  return (
    <Section padding="lg">
      <Container size="md">
        <FadeIn direction="up">
          <Heading level="h2" className="mb-12">
            Development Timeline
          </Heading>
        </FadeIn>

        <div className="relative">
          {developmentTimeline.map((entry, index) => (
            <TimelineItem
              key={entry.phase}
              entry={entry}
              index={index}
              isLast={index === developmentTimeline.length - 1}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
