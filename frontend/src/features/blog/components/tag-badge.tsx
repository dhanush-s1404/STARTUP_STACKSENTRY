import Link from "next/link";

type TagBadgeProps = {
  tag: string;
  active?: boolean;
};

export function TagBadge({ tag, active }: TagBadgeProps) {
  return (
    <Link
      href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium transition-all duration-200 ${
        active
          ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
          : "bg-white/[0.03] text-white/40 border-white/[0.06] hover:bg-white/[0.06] hover:text-white/60"
      }`}
    >
      #{tag}
    </Link>
  );
}
