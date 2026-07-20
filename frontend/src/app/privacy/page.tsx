import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/shared/legal-page-layout";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Learn how ${siteConfig.name} collects, uses, and protects your personal information. Read our complete privacy policy.`,
  alternates: { canonical: `${siteConfig.url}/privacy` },
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description: `Learn how ${siteConfig.name} collects, uses, and protects your personal information.`,
    url: `${siteConfig.url}/privacy`,
  },
};

const toc = [
  { id: "introduction", label: "Introduction" },
  { id: "info-collect", label: "Information We Collect", children: [
    { id: "personal-info", label: "Personal Information" },
    { id: "usage-info", label: "Usage Information" },
  ]},
  { id: "info-use", label: "How We Use Your Information" },
  { id: "cookies", label: "Cookies & Tracking" },
  { id: "data-retention", label: "Data Retention" },
  { id: "third-party", label: "Third-Party Services" },
  { id: "security", label: "Data Security" },
  { id: "rights", label: "Your Rights" },
  { id: "children", label: "Children's Privacy" },
  { id: "changes", label: "Changes to This Policy" },
  { id: "contact-info", label: "Contact Information" },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      description="Your privacy is important to us. This policy explains how we handle your data."
      lastUpdated="January 1, 2026"
      tableOfContents={toc}
    >
      <section id="introduction">
        <h2 className="mb-4 text-2xl font-bold text-white">Introduction</h2>
        <p className="text-base leading-relaxed text-white/60">
          {siteConfig.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. By using our services, you agree to the collection and use of information in accordance with this policy.
        </p>
      </section>

      <section id="info-collect">
        <h2 className="mb-4 text-2xl font-bold text-white">Information We Collect</h2>
        <p className="mb-4 text-base leading-relaxed text-white/60">
          We collect information that you provide directly to us and information that is automatically collected when you use our services.
        </p>

        <div id="personal-info" className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <h3 className="mb-3 text-lg font-semibold text-white">Personal Information</h3>
          <ul className="space-y-2 text-base text-white/60">
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
              Name, email address, and contact information
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
              Company name, job title, and professional information
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
              Payment and billing information (when applicable)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
              Communications you send to us (support requests, feedback)
            </li>
          </ul>
        </div>

        <div id="usage-info" className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <h3 className="mb-3 text-lg font-semibold text-white">Usage Information</h3>
          <ul className="space-y-2 text-base text-white/60">
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
              Log data (IP address, browser type, pages visited, time spent)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
              Device information and identifiers
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
              Usage patterns and preferences
            </li>
          </ul>
        </div>
      </section>

      <section id="info-use">
        <h2 className="mb-4 text-2xl font-bold text-white">How We Use Your Information</h2>
        <p className="mb-4 text-base leading-relaxed text-white/60">
          We use the information we collect for the following purposes:
        </p>
        <ul className="space-y-2 text-base text-white/60">
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            To provide, maintain, and improve our services
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            To send you technical updates, security alerts, and support messages
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            To respond to your comments, questions, and customer service requests
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            To monitor and analyze usage trends and preferences
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            To detect, prevent, and address fraud, abuse, and technical issues
          </li>
        </ul>
      </section>

      <section id="cookies">
        <h2 className="mb-4 text-2xl font-bold text-white">Cookies & Tracking Technologies</h2>
        <p className="mb-4 text-base leading-relaxed text-white/60">
          We use cookies and similar tracking technologies to enhance your experience. For detailed information about the cookies we use, please see our{" "}
          <Link href="/cookies" className="text-blue-400 underline decoration-blue-400/30 underline-offset-2 transition-colors hover:text-blue-300">
            Cookie Policy
          </Link>.
        </p>
      </section>

      <section id="data-retention">
        <h2 className="mb-4 text-2xl font-bold text-white">Data Retention</h2>
        <p className="text-base leading-relaxed text-white/60">
          We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When data is no longer needed, we securely delete or anonymize it.
        </p>
      </section>

      <section id="third-party">
        <h2 className="mb-4 text-2xl font-bold text-white">Third-Party Services</h2>
        <p className="mb-4 text-base leading-relaxed text-white/60">
          We may employ third-party companies and individuals to facilitate our services, provide services on our behalf, or perform service-related activities. These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
        </p>
        <p className="text-base leading-relaxed text-white/60">
          Third-party services we use include cloud hosting providers, analytics services, and email communication platforms. Each operates under their own privacy policies.
        </p>
      </section>

      <section id="security">
        <h2 className="mb-4 text-2xl font-bold text-white">Data Security</h2>
        <p className="text-base leading-relaxed text-white/60">
          The security of your data is important to us. We implement industry-standard security measures including encryption (TLS/SSL), access controls, regular security audits, and secure data storage practices. While no method of transmission over the Internet is 100% secure, we strive to use commercially acceptable means to protect your personal information.
        </p>
      </section>

      <section id="rights">
        <h2 className="mb-4 text-2xl font-bold text-white">Your Rights</h2>
        <p className="mb-4 text-base leading-relaxed text-white/60">
          Depending on your location, you may have the following rights:
        </p>
        <ul className="space-y-2 text-base text-white/60">
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
            <strong className="text-white">Access:</strong> Request a copy of the personal data we hold about you
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
            <strong className="text-white">Rectification:</strong> Request correction of inaccurate personal data
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
            <strong className="text-white">Erasure:</strong> Request deletion of your personal data
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
            <strong className="text-white">Portability:</strong> Request transfer of your data in a structured format
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
            <strong className="text-white">Objection:</strong> Object to processing of your personal data
          </li>
        </ul>
      </section>

      <section id="children">
        <h2 className="mb-4 text-2xl font-bold text-white">Children&apos;s Privacy</h2>
        <p className="text-base leading-relaxed text-white/60">
          Our services are not directed to individuals under 16 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete that information promptly.
        </p>
      </section>

      <section id="changes">
        <h2 className="mb-4 text-2xl font-bold text-white">Changes to This Policy</h2>
        <p className="text-base leading-relaxed text-white/60">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this policy periodically. Your continued use of our services after any modifications constitutes your acceptance of the updated policy.
        </p>
      </section>

      <section id="contact-info">
        <h2 className="mb-4 text-2xl font-bold text-white">Contact Information</h2>
        <p className="mb-4 text-base leading-relaxed text-white/60">
          If you have any questions about this Privacy Policy, please contact us:
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
