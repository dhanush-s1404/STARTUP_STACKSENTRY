"use client";

import { useCallback } from "react";
import { cn } from "@/lib/cn";
import { MotionDiv, AnimatePresence } from "@/lib/motion";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useLocalStorage } from "@/hooks";

type JobBookmarkButtonProps = {
  jobId: string;
  className?: string;
  showCount?: boolean;
};

export function JobBookmarkButton({ jobId, className, showCount = false }: JobBookmarkButtonProps) {
  const [savedJobs, setSavedJobs] = useLocalStorage<string[]>("stacksentry-saved-jobs", []);
  const isSaved = savedJobs.includes(jobId);

  const toggleBookmark = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setSavedJobs((prev) =>
        prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId],
      );
    },
    [jobId, setSavedJobs],
  );

  return (
    <button
      onClick={toggleBookmark}
      aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
      className={cn(
        "relative flex items-center gap-1.5 rounded-lg p-2 transition-all duration-200",
        "text-white/40 hover:text-white/80 hover:bg-white/[0.05]",
        isSaved && "text-blue-400 hover:text-blue-300",
        className,
      )}
    >
      <AnimatePresence mode="wait">
        <MotionDiv
          key={isSaved ? "saved" : "unsaved"}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {isSaved ? (
            <BookmarkCheck className="h-5 w-5" />
          ) : (
            <Bookmark className="h-5 w-5" />
          )}
        </MotionDiv>
      </AnimatePresence>
      {showCount && (
        <span className="text-xs font-medium">
          {savedJobs.length > 0 ? savedJobs.length : ""}
        </span>
      )}
    </button>
  );
}
