"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin error:", error);
  }, [error]);

  return (
    <Section padding="lg">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <h2 className="text-xl font-semibold text-white">Admin panel error</h2>
          <p className="mt-3 text-sm text-white/50">
            Something went wrong in the admin panel. Please try again.
          </p>
          <Button onClick={reset} variant="primary" className="mt-6">
            Try Again
          </Button>
        </div>
      </Container>
    </Section>
  );
}
