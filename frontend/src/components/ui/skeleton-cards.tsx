import { cn } from "@/lib/cn";

type SkeletonCardProps = {
  className?: string;
  lines?: number;
  hasImage?: boolean;
  hasAvatar?: boolean;
};

export function SkeletonCard({ className, lines = 3, hasImage = true, hasAvatar = false }: SkeletonCardProps) {
  return (
    <div className={cn("rounded-xl border border-white/[0.06] bg-white/[0.02] p-5", className)}>
      {hasImage && (
        <div className="mb-4 h-48 w-full animate-pulse rounded-lg bg-white/5" />
      )}
      {hasAvatar && (
        <div className="mb-3 flex items-center gap-3">
          <div className="h-10 w-10 animate-pulse rounded-full bg-white/5" />
          <div className="space-y-1.5">
            <div className="h-3 w-24 animate-pulse rounded bg-white/5" />
            <div className="h-2.5 w-16 animate-pulse rounded bg-white/5" />
          </div>
        </div>
      )}
      <div className="space-y-2.5">
        <div className="h-4 w-3/4 animate-pulse rounded bg-white/5" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-white/5" />
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-3 w-full animate-pulse rounded bg-white/5" style={{ width: `${85 - i * 10}%` }} />
        ))}
      </div>
    </div>
  );
}

export function SkeletonHero({ className }: { className?: string }) {
  return (
    <div className={cn("py-20", className)}>
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <div className="mx-auto h-6 w-48 animate-pulse rounded-full bg-white/5" />
        <div className="space-y-3">
          <div className="mx-auto h-12 w-full max-w-xl animate-pulse rounded-lg bg-white/5" />
          <div className="mx-auto h-12 w-3/4 animate-pulse rounded-lg bg-white/5" />
        </div>
        <div className="mx-auto max-w-lg space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-white/5" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-white/5" />
        </div>
        <div className="flex justify-center gap-4 pt-4">
          <div className="h-12 w-40 animate-pulse rounded-xl bg-white/5" />
          <div className="h-12 w-36 animate-pulse rounded-xl bg-white/5" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonArticle({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="h-6 w-3/4 animate-pulse rounded bg-white/5" />
      <div className="h-4 w-1/4 animate-pulse rounded bg-white/5" />
      <div className="h-64 w-full animate-pulse rounded-xl bg-white/5" />
      <div className="space-y-2.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-3.5 w-full animate-pulse rounded bg-white/5" style={{ width: `${95 - (i % 3) * 15}%` }} />
        ))}
      </div>
    </div>
  );
}

export function SkeletonForm({ className, fields = 4 }: { className?: string; fields?: number }) {
  return (
    <div className={cn("space-y-5", className)}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-3.5 w-24 animate-pulse rounded bg-white/5" />
          <div className="h-12 w-full animate-pulse rounded-xl bg-white/5" />
        </div>
      ))}
      <div className="h-12 w-36 animate-pulse rounded-xl bg-white/5" />
    </div>
  );
}

export function SkeletonGrid({ count = 6, columns = 3, className }: { count?: number; columns?: number; className?: string }) {
  return (
    <div className={cn("grid gap-5", className)} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} hasImage={i % 2 === 0} lines={2} />
      ))}
    </div>
  );
}
