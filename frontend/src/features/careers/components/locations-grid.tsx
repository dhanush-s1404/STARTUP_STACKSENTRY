"use client";

import { useMemo } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { LOCATIONS } from "@/data/careers";
import { LocationCard } from "./location-card";

export function LocationsGrid() {
  const groupedLocations = useMemo(() => {
    const groups: Record<string, typeof LOCATIONS> = {};
    for (const location of LOCATIONS) {
      const region = location.region;
      if (!groups[region]) {
        groups[region] = [];
      }
      groups[region].push(location);
    }
    return Object.entries(groups);
  }, []);

  return (
    <Section padding="lg" background="gradient">
      <Container>
        <Heading
          level="h2"
          description="With offices across four continents and a strong remote culture, find the location that works best for you."
        >
          Our Global Offices
        </Heading>

        <div className="mx-auto mt-12 max-w-7xl space-y-16">
          {groupedLocations.map(([region, locations]) => (
            <div key={region}>
              <div className="mb-6 flex items-center gap-3">
                <Badge variant="outline" size="md">
                  {region}
                </Badge>
                <span className="text-sm text-white/30">
                  {locations.length} location{locations.length !== 1 ? "s" : ""}
                </span>
              </div>

              <Stagger
                delay={0.1}
                staggerChildren={0.08}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {locations.map((location) => (
                  <StaggerItem key={location.id}>
                    <LocationCard location={location} />
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
