import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/shared/legal-page-layout";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: `${siteConfig.name} is committed to ensuring digital accessibility for all users. Learn about our accessibility features and compliance efforts.`,
  alternates: { canonical: `${siteConfig.url}/accessibility` },
  openGraph: {
    title: `Accessibility Statement | ${siteConfig.name}`,
    description: `${siteConfig.name} is committed to ensuring digital accessibility for all users.`,
    url: `${siteConfig.url}/accessibility`,
  },
};

const toc = [
  { id: "commitment", label: "Our Commitment" },
  { id: "wcag", label: "WCAG AA Compliance" },
  { id: "technologies", label: "Supported Technologies" },
  { id: "features", label: "Accessibility Features" },
  { id: "limitations", label: "Known Limitations" },
  { id: "feedback", label: "Feedback" },
  { id: "improvement", label: "Continuous Improvement" },
  { id: "contact", label: "Contact" },
];

export default function AccessibilityPage() {
  return (
    <LegalPageLayout
      title="Accessibility Statement"
      description="Our commitment to making our digital products accessible to everyone."
      lastUpdated="January 1, 2026"
      tableOfContents={toc}
    >
      <section id="commitment">
        <h2 className="mb-4 text-2xl font-bold text-white">Our Commitment</h2>
        <p className="text-base leading-relaxed text-white/60">
          {siteConfig.name} is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards to ensure we provide equal access to all users.
        </p>
      </section>

      <section id="wcag">
        <h2 className="mb-4 text-2xl font-bold text-white">WCAG AA Compliance</h2>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <p className="mb-2 text-base font-medium text-emerald-400">Target Compliance Level: WCAG 2.1 AA</p>
          <p className="text-base leading-relaxed text-white/60">
            We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at the AA level. These guidelines explain how to make web content more accessible for people with disabilities and more user-friendly for everyone. Our ongoing accessibility efforts work toward this goal.
          </p>
        </div>
      </section>

      <section id="technologies">
        <h2 className="mb-4 text-2xl font-bold text-white">Supported Technologies</h2>
        <p className="mb-4 text-base leading-relaxed text-white/60">
          Our website is designed to be compatible with the following assistive technologies:
        </p>
        <ul className="space-y-2 text-base text-white/60">
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
            <strong className="text-white">Screen Readers:</strong> NVDA, JAWS, VoiceOver (macOS/iOS), TalkBack (Android)
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
            <strong className="text-white">Browser Zoom:</strong> Up to 200% without loss of content or functionality
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
            <strong className="text-white">Keyboard Navigation:</strong> Full keyboard support for all interactive elements
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
            <strong className="text-white">Browsers:</strong> Chrome, Firefox, Safari, Edge (latest two versions)
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
            <strong className="text-white">Operating Systems:</strong> Windows, macOS, iOS, Android
          </li>
        </ul>
      </section>

      <section id="features">
        <h2 className="mb-4 text-2xl font-bold text-white">Accessibility Features</h2>
        <p className="mb-4 text-base leading-relaxed text-white/60">
          Our website includes the following accessibility features:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { title: "Semantic HTML", desc: "Proper heading hierarchy, landmarks, and semantic elements" },
            { title: "ARIA Labels", desc: "Descriptive labels for interactive elements and regions" },
            { title: "Focus Indicators", desc: "Visible focus states for all keyboard-navigable elements" },
            { title: "Alt Text", desc: "Descriptive alternative text for all meaningful images" },
            { title: "Color Contrast", desc: "Minimum 4.5:1 contrast ratio for normal text, 3:1 for large text" },
            { title: "Keyboard Navigation", desc: "Full keyboard access with logical tab order" },
            { title: "Skip Navigation", desc: "Skip-to-content links for screen reader users" },
            { title: "Reduced Motion", desc: "Respects prefers-reduced-motion media query" },
            { title: "Form Labels", desc: "Explicit labels and error messages for all form fields" },
            { title: "Language Declaration", desc: "Proper HTML lang attribute for screen readers" },
          ].map((feature) => (
            <div key={feature.title} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <h3 className="mb-1 text-sm font-semibold text-white">{feature.title}</h3>
              <p className="text-xs text-white/50">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="limitations">
        <h2 className="mb-4 text-2xl font-bold text-white">Known Limitations</h2>
        <p className="mb-4 text-base leading-relaxed text-white/60">
          We are aware of the following accessibility limitations and are actively working to address them:
        </p>
        <ul className="space-y-2 text-base text-white/60">
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
            Some older third-party embedded content may not be fully accessible
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
            Complex data visualizations may have limited screen reader support
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
            Some animations may not fully comply with reduced motion preferences
          </li>
        </ul>
        <p className="mt-4 text-base text-white/60">
          If you encounter any accessibility barriers, please <Link href="/contact" className="text-blue-400 hover:text-blue-300">contact us</Link> and we will work to resolve the issue.
        </p>
      </section>

      <section id="feedback">
        <h2 className="mb-4 text-2xl font-bold text-white">Feedback</h2>
        <p className="text-base leading-relaxed text-white/60">
          We welcome your feedback on the accessibility of our website. If you encounter accessibility barriers or have suggestions for improvement, please let us know. We take accessibility seriously and will respond to all inquiries promptly.
        </p>
        <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <p className="text-sm text-white/60"><strong className="text-white">Email:</strong> accessibility@stacksentry.com</p>
          <p className="mt-2 text-sm text-white/60"><strong className="text-white">Phone:</strong> {siteConfig.contact.phone}</p>
          <p className="mt-2 text-sm text-white/60">
            <strong className="text-white">Response Time:</strong> We aim to respond within 2 business days
          </p>
        </div>
      </section>

      <section id="improvement">
        <h2 className="mb-4 text-2xl font-bold text-white">Continuous Improvement</h2>
        <p className="text-base leading-relaxed text-white/60">
          {siteConfig.name} is committed to continuous accessibility improvement. Our efforts include regular accessibility audits, automated testing with tools like axe and Lighthouse, manual testing with assistive technologies, accessibility training for our development team, and incorporating accessibility into our design and development processes from the start.
        </p>
      </section>

      <section id="contact">
        <h2 className="mb-4 text-2xl font-bold text-white">Contact</h2>
        <p className="mb-4 text-base leading-relaxed text-white/60">
          For any accessibility-related inquiries, please reach out:
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <p className="text-sm text-white/60"><strong className="text-white">Email:</strong> accessibility@stacksentry.com</p>
          <p className="mt-2 text-sm text-white/60"><strong className="text-white">General Contact:</strong> {siteConfig.contact.email}</p>
          <p className="mt-2 text-sm text-white/60">
            <strong className="text-white">Address:</strong> {siteConfig.company.address.street}, {siteConfig.company.address.city}, {siteConfig.company.address.state} {siteConfig.company.address.zip}
          </p>
        </div>
        <p className="mt-4 text-sm text-white/40">
          See also: <Link href="/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link> | <Link href="/terms" className="text-blue-400 hover:text-blue-300">Terms & Conditions</Link>
        </p>
      </section>
    </LegalPageLayout>
  );
}
