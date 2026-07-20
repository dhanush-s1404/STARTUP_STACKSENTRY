"use client";

import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselProps = {
  children: ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  loop?: boolean;
  className?: string;
  itemClassName?: string;
};

export function Carousel({
  children,
  autoPlay = false,
  interval = 5000,
  showDots = true,
  showArrows = true,
  loop = true,
  className,
  itemClassName,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = children.length;

  const goTo = useCallback(
    (index: number) => {
      if (loop) {
        setCurrentIndex((index + total) % total);
      } else {
        setCurrentIndex(Math.max(0, Math.min(index, total - 1)));
      }
    },
    [total, loop],
  );

  const next = useCallback(() => goTo(currentIndex + 1), [goTo, currentIndex]);
  const prev = useCallback(() => goTo(currentIndex - 1), [goTo, currentIndex]);

  // Auto play
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, next]);

  // Drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(translateX) > 50) {
      if (translateX > 0) prev();
      else next();
    }
    setTranslateX(0);
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={containerRef}
        className="overflow-hidden rounded-2xl"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${isDragging ? translateX : 0}px))`,
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className={cn("w-full shrink-0", itemClassName)}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {showArrows && total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && total > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: total }, (_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "rounded-full transition-all duration-300",
                i === currentIndex
                  ? "h-2 w-6 bg-blue-500"
                  : "h-2 w-2 bg-white/20 hover:bg-white/40",
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
