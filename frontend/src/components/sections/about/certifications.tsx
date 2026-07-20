"use client";

import { Shield, CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stagger, StaggerItem } from "@/components/ui/stagger";
import { MotionDiv } from "@/lib/motion";

type Certification = {
  name: string;
  description: string;
  issuer: string;
};

const certifications: Certification[] = [
  { name: "ISO 27001", description: "Information Security Management", issuer: "Issued by ISO" },
  { name: "SOC 2 Type II", description: "Service Organization Control", issuer: "Audited by Deloitte" },
  { name: "GDPR", description: "General Data Protection Regulation", issuer: "EU Compliant" },
  { name: "PCI DSS", description: "Payment Card Industry Data Security", issuer: "Level 1 Compliant" },
  { name: "HIPAA", description: "Health Insurance Portability", issuer: "US Healthcare Compliant" },
];

export function Certifications() {
  return (
    <Section id="certifications" padding="lg">
      <Container>
        <Heading
          level="h2"
          description="Industry-leading security and compliance standards"
          className="mb-12"
        >
          Security &amp; Compliance
        </Heading>

        <Stagger staggerChildren={0.08} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <StaggerItem key={cert.name}>
              <MotionDiv
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full"
              >
                <div className="group relative h-full overflow-hidden rounded-2xl p-[1px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-cyan-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <Card glass className="relative z-10 h-full">
                    <div className="flex h-full flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                          <Shield className="h-6 w-6" />
                        </div>
                        <Badge variant="green" size="sm">
                          Active
                        </Badge>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-white">
                          {cert.name}
                        </h3>
                        <p className="text-sm text-white/50">
                          {cert.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-emerald-400">
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span>{cert.issuer}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </MotionDiv>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
