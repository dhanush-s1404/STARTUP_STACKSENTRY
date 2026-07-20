"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Building2, Wifi } from "lucide-react";
import type { LocationData } from "@/data/careers";

type LocationCardProps = {
  location: LocationData;
};

function countryCodeToFlag(code: string): string {
  if (code === "XX") return "🌍";
  const base = 127397;
  return [...code.toUpperCase()]
    .map((char) => String.fromCodePoint(char.charCodeAt(0) + base))
    .join("");
}

const regionBadgeVariant: Record<string, "blue" | "purple" | "cyan" | "green" | "amber"> = {
  "North America": "blue",
  Europe: "purple",
  "Asia Pacific": "cyan",
  "Middle East": "amber",
  Worldwide: "green",
};

export function LocationCard({ location }: LocationCardProps) {
  const flag = countryCodeToFlag(location.countryCode);
  const badgeVariant = regionBadgeVariant[location.region] ?? "blue";

  return (
    <Card padding="none" hover className="group flex flex-col overflow-hidden">
      <div className="relative z-10 flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl" role="img" aria-label={location.country}>
              {flag}
            </span>
            <div>
              <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-blue-300">
                {location.city}
              </h3>
              <p className="text-sm text-white/40">{location.country}</p>
            </div>
          </div>
          <Badge variant={badgeVariant} size="sm">
            {location.region}
          </Badge>
        </div>

        <div className="mt-2 space-y-3">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <MapPin className="h-4 w-4 shrink-0 text-white/30" />
            <span>{location.city}, {location.country}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-white/50">
            <Clock className="h-4 w-4 shrink-0 text-white/30" />
            <span>{location.timezone}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-white/50">
            <Building2 className="h-4 w-4 shrink-0 text-white/30" />
            <span>{location.officeSize}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          {location.isRemote ? (
            <Badge variant="green" size="sm">
              <Wifi className="mr-1 h-3 w-3" />
              Remote
            </Badge>
          ) : (
            <Badge variant="outline" size="sm">
              <Building2 className="mr-1 h-3 w-3" />
              On-site
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
