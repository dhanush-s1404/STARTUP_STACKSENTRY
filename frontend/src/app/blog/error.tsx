"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Blog error:", error);
  }, [error]);

  return (
    <Section padding="lg">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <h2 className="text-xl font-semibold text-white">Failed to load article</h2>
          <p className="mt-3 text-sm text-white/50">
            We couldn&apos;t load this blog post. Please try again.
          </p>
          <Button onClick={reset} variant="primary" className="mt-6">
            Try Again
          </Button>
        </div>
      </Container>
    </Section>
  );
}
