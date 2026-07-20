"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import type { Author } from "@/data/authors";

type AuthorCardProps = {
  author: Author;
  size?: "sm" | "md" | "lg";
};

export function AuthorCard({ author, size = "md" }: AuthorCardProps) {
  return (
    <Link href={`/blog/author/${author.slug}`}>
      <Card glass hover padding="md" className="flex items-center gap-4">
        <Avatar
          src={author.avatar}
          alt={author.name}
          name={author.name}
          size={size === "lg" ? "lg" : size === "sm" ? "sm" : "md"}
        />
        <div>
          <p className={`font-semibold text-white ${size === "lg" ? "text-lg" : "text-sm"}`}>
            {author.name}
          </p>
          <p className="text-xs text-white/40">{author.role}</p>
        </div>
      </Card>
    </Link>
  );
}
