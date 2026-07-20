"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Accordion } from "@/components/ui/accordion";
import { FadeIn } from "@/components/ui/fade-in";

const faqItems = [
  {
    id: "tech-stack",
    title: "What technologies do you specialize in?",
    content:
      "We specialize in a full-stack technology ecosystem including React, Next.js, Node.js, Python, Go, and Rust on the frontend and backend. For cloud infrastructure, we work with AWS, Azure, and GCP. Our AI/ML capabilities span TensorFlow, PyTorch, and custom model development. We also have deep expertise in Kubernetes, Terraform, and modern DevOps practices.",
  },
  {
    id: "timeline",
    title: "How long does a typical project take?",
    content:
      "Project timelines vary based on scope and complexity. A focused MVP or prototype can be delivered in 4-8 weeks. Mid-scale applications typically take 3-6 months, while enterprise-grade platforms may require 6-12 months. We use agile methodology with bi-weekly sprints, so you'll see working software early and often. We provide detailed timelines during our discovery phase.",
  },
  {
    id: "support",
    title: "Do you provide ongoing support?",
    content:
      "Absolutely. We offer comprehensive maintenance and support packages that include 24/7 monitoring, performance optimization, security patches, and feature enhancements. Our support tiers range from basic monitoring to dedicated engineering teams embedded within your organization. We also provide SLA-backed response times for critical issues.",
  },
  {
    id: "industries",
    title: "What industries do you serve?",
    content:
      "We serve a wide range of industries including fintech, healthcare, e-commerce, SaaS, logistics, education, and manufacturing. Our team has domain expertise in regulatory compliance (HIPAA, SOC 2, GDPR), payment processing, real-time data systems, and scalable consumer applications. We adapt our approach to meet industry-specific requirements.",
  },
  {
    id: "collaboration",
    title: "Can you work with our existing team?",
    content:
      "Yes, we frequently collaborate with in-house engineering teams. We can embed senior engineers within your team, provide technical consulting, or take ownership of specific modules or features. Our flexible engagement models are designed to complement your existing workflows and tech stack, whether you use Scrum, Kanban, or another methodology.",
  },
  {
    id: "methodology",
    title: "What is your development methodology?",
    content:
      "We follow agile development practices with a focus on iterative delivery. Our process includes daily standups, bi-weekly sprints, sprint reviews, and retrospectives. We use tools like Jira, Linear, and GitHub Projects for transparency. Every sprint delivers working software, and we involve stakeholders regularly through demos and feedback sessions.",
  },
  {
    id: "quality",
    title: "How do you ensure code quality?",
    content:
      "Code quality is foundational to our process. We enforce it through mandatory code reviews, automated testing (unit, integration, and e2e), static analysis, and CI/CD pipelines that catch issues before deployment. We follow clean architecture principles, maintain comprehensive documentation, and conduct regular architecture reviews to prevent technical debt accumulation.",
  },
  {
    id: "security",
    title: "What about data security?",
    content:
      "Security is embedded in every stage of our development lifecycle. We follow OWASP best practices, implement encryption at rest and in transit, conduct regular penetration testing, and maintain SOC 2 compliance. Our infrastructure uses zero-trust principles, and we perform automated vulnerability scanning in CI/CD pipelines. We also conduct security training for all team members.",
  },
];

export function ServiceFAQ() {
  return (
    <Section padding="lg">
      <Container size="md">
        <Heading
          level="h2"
          description="Everything you need to know about working with us"
          className="mb-12"
        >
          Frequently Asked Questions
        </Heading>

        <FadeIn delay={0.1}>
          <Accordion items={faqItems} type="multiple" />
        </FadeIn>
      </Container>
    </Section>
  );
}
