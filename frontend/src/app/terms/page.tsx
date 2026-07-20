import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/shared/legal-page-layout";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Read the terms and conditions governing your use of ${siteConfig.name} services and website.`,
  alternates: { canonical: `${siteConfig.url}/terms` },
  openGraph: {
    title: `Terms & Conditions | ${siteConfig.name}`,
    description: `Read the terms and conditions governing your use of ${siteConfig.name} services.`,
    url: `${siteConfig.url}/terms`,
  },
};

const toc = [
  { id: "introduction", label: "Introduction" },
  { id: "services", label: "Services" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "acceptable-use", label: "Acceptable Use" },
  { id: "accounts", label: "User Accounts" },
  { id: "payments", label: "Payments & Billing" },
  { id: "privacy", label: "Privacy" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "indemnification", label: "Indemnification" },
  { id: "termination", label: "Termination" },
  { id: "disputes", label: "Dispute Resolution" },
  { id: "governing-law", label: "Governing Law" },
  { id: "updates", label: "Updates to Terms" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      description="Please read these terms carefully before using our services."
      lastUpdated="January 1, 2026"
      tableOfContents={toc}
    >
      <section id="introduction">
        <h2 className="mb-4 text-2xl font-bold text-white">Introduction</h2>
        <p className="text-base leading-relaxed text-white/60">
          Welcome to {siteConfig.name}. These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of our website, products, and services (&quot;Services&quot;). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree, please do not use our Services.
        </p>
      </section>

      <section id="services">
        <h2 className="mb-4 text-2xl font-bold text-white">Services</h2>
        <p className="mb-4 text-base leading-relaxed text-white/60">
          {siteConfig.name} provides enterprise software development, AI automation, cloud platform solutions, data analytics, and security services. The specific scope, deliverables, and terms of each engagement are defined in separate service agreements or statements of work.
        </p>
        <ul className="space-y-2 text-base text-white/60">
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
            We reserve the right to modify, suspend, or discontinue any part of our Services at any time
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
            Service availability may vary by region and is subject to change without notice
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
            We may introduce new features, services, or pricing at our discretion
          </li>
        </ul>
      </section>

      <section id="intellectual-property">
        <h2 className="mb-4 text-2xl font-bold text-white">Intellectual Property</h2>
        <p className="mb-4 text-base leading-relaxed text-white/60">
          All content, features, and functionality of our Services — including but not limited to text, graphics, logos, icons, images, audio, video, software, and code — are the exclusive property of {siteConfig.name} or its licensors and are protected by copyright, trademark, patent, and other intellectual property laws.
        </p>
        <ul className="space-y-2 text-base text-white/60">
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
            You may not reproduce, distribute, or create derivative works without our express written permission
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
            Custom software developed for clients is governed by the applicable service agreement
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
            Open-source components are subject to their respective license terms
          </li>
        </ul>
      </section>

      <section id="acceptable-use">
        <h2 className="mb-4 text-2xl font-bold text-white">Acceptable Use</h2>
        <p className="mb-4 text-base leading-relaxed text-white/60">
          You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree not to:
        </p>
        <ul className="space-y-2 text-base text-white/60">
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
            Use the Services in any way that violates any applicable law or regulation
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
            Attempt to gain unauthorized access to any portion of the Services
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
            Interfere with or disrupt the Services or servers connected to the Services
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
            Use automated systems to access the Services without our express written permission
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
            Transfer or resell Services access without authorization
          </li>
        </ul>
      </section>

      <section id="accounts">
        <h2 className="mb-4 text-2xl font-bold text-white">User Accounts</h2>
        <p className="text-base leading-relaxed text-white/60">
          Certain Services require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these Terms.
        </p>
      </section>

      <section id="payments">
        <h2 className="mb-4 text-2xl font-bold text-white">Payments & Billing</h2>
        <p className="mb-4 text-base leading-relaxed text-white/60">
          Certain Services require payment. By purchasing our Services, you agree to the following terms:
        </p>
        <ul className="space-y-2 text-base text-white/60">
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            All fees are stated in USD unless otherwise specified
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            Payment terms are defined in individual service agreements
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            Fees are non-refundable unless explicitly stated in writing
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            We reserve the right to change pricing with 30 days&apos; notice
          </li>
        </ul>
      </section>

      <section id="privacy">
        <h2 className="mb-4 text-2xl font-bold text-white">Privacy</h2>
        <p className="text-base leading-relaxed text-white/60">
          Your use of our Services is also governed by our{" "}
          <Link href="/privacy" className="text-blue-400 underline decoration-blue-400/30 underline-offset-2 transition-colors hover:text-blue-300">
            Privacy Policy
          </Link>
          {" "}and{" "}
          <Link href="/cookies" className="text-blue-400 underline decoration-blue-400/30 underline-offset-2 transition-colors hover:text-blue-300">
            Cookie Policy
          </Link>
          , which are incorporated into these Terms by reference.
        </p>
      </section>

      <section id="liability">
        <h2 className="mb-4 text-2xl font-bold text-white">Limitation of Liability</h2>
        <p className="text-base leading-relaxed text-white/60">
          To the maximum extent permitted by law, {siteConfig.name} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the Services. Our total liability shall not exceed the amount paid by you to us in the twelve (12) months preceding the claim.
        </p>
      </section>

      <section id="indemnification">
        <h2 className="mb-4 text-2xl font-bold text-white">Indemnification</h2>
        <p className="text-base leading-relaxed text-white/60">
          You agree to indemnify, defend, and hold harmless {siteConfig.name}, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, or expenses (including reasonable attorney&apos;s fees) arising from your use of the Services, violation of these Terms, or infringement of any third-party rights.
        </p>
      </section>

      <section id="termination">
        <h2 className="mb-4 text-2xl font-bold text-white">Termination</h2>
        <p className="text-base leading-relaxed text-white/60">
          We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms. Upon termination, your right to use the Services will cease immediately. You may also terminate your account by contacting us.
        </p>
      </section>

      <section id="disputes">
        <h2 className="mb-4 text-2xl font-bold text-white">Dispute Resolution</h2>
        <p className="text-base leading-relaxed text-white/60">
          Any disputes arising out of or relating to these Terms or the Services shall first be attempted to be resolved through good-faith negotiation. If the dispute cannot be resolved through negotiation within thirty (30) days, it shall be submitted to binding arbitration in accordance with the rules of the American Arbitration Association.
        </p>
      </section>

      <section id="governing-law">
        <h2 className="mb-4 text-2xl font-bold text-white">Governing Law</h2>
        <p className="text-base leading-relaxed text-white/60">
          These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions. Any legal action or proceeding shall be brought exclusively in the courts located in San Francisco, California.
        </p>
      </section>

      <section id="updates">
        <h2 className="mb-4 text-2xl font-bold text-white">Updates to These Terms</h2>
        <p className="text-base leading-relaxed text-white/60">
          We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the updated Terms on this page and updating the &quot;Last updated&quot; date. Your continued use of the Services after any changes constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section id="contact">
        <h2 className="mb-4 text-2xl font-bold text-white">Contact Us</h2>
        <p className="mb-4 text-base leading-relaxed text-white/60">
          If you have questions about these Terms, please contact us:
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <p className="text-sm text-white/60"><strong className="text-white">Email:</strong> {siteConfig.contact.email}</p>
          <p className="mt-2 text-sm text-white/60"><strong className="text-white">Phone:</strong> {siteConfig.contact.phone}</p>
          <p className="mt-2 text-sm text-white/60">
            <strong className="text-white">Address:</strong> {siteConfig.company.address.street}, {siteConfig.company.address.city}, {siteConfig.company.address.state} {siteConfig.company.address.zip}
          </p>
        </div>
      </section>
    </LegalPageLayout>
  );
}
