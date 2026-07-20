import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/shared/legal-page-layout";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Learn about how ${siteConfig.name} uses cookies and how you can manage your preferences.`,
  alternates: { canonical: `${siteConfig.url}/cookies` },
  openGraph: {
    title: `Cookie Policy | ${siteConfig.name}`,
    description: `Learn about how ${siteConfig.name} uses cookies and how you can manage your preferences.`,
    url: `${siteConfig.url}/cookies`,
  },
};

const toc = [
  { id: "introduction", label: "Introduction" },
  { id: "what-are-cookies", label: "What Are Cookies" },
  { id: "essential", label: "Essential Cookies" },
  { id: "analytics", label: "Analytics Cookies" },
  { id: "preference", label: "Preference Cookies" },
  { id: "marketing", label: "Future Marketing Cookies" },
  { id: "management", label: "Cookie Management" },
  { id: "browser", label: "Browser Settings" },
  { id: "changes", label: "Changes to This Policy" },
  { id: "contact", label: "Contact" },
];

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      description="Understand how we use cookies and manage your preferences."
      lastUpdated="January 1, 2026"
      tableOfContents={toc}
    >
      <section id="introduction">
        <h2 className="mb-4 text-2xl font-bold text-white">Introduction</h2>
        <p className="text-base leading-relaxed text-white/60">
          This Cookie Policy explains how {siteConfig.name} uses cookies and similar technologies when you visit our website. We are committed to being transparent about the technologies we use and giving you control over how they are employed.
        </p>
      </section>

      <section id="what-are-cookies">
        <h2 className="mb-4 text-2xl font-bold text-white">What Are Cookies</h2>
        <p className="text-base leading-relaxed text-white/60">
          Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently, provide a better user experience, and supply information to site owners. Cookies can be &quot;session cookies&quot; (deleted when you close your browser) or &quot;persistent cookies&quot; (remain until deleted).
        </p>
      </section>

      <section id="essential">
        <h2 className="mb-4 text-2xl font-bold text-white">Essential Cookies</h2>
        <p className="mb-4 text-base leading-relaxed text-white/60">
          These cookies are strictly necessary for the website to function. They cannot be disabled and are set in response to actions you take, such as setting your privacy preferences, logging in, or filling in forms.
        </p>
        <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/[0.06] bg-white/[0.03]">
              <tr>
                <th className="px-4 py-3 font-medium text-white/70">Cookie</th>
                <th className="px-4 py-3 font-medium text-white/70">Purpose</th>
                <th className="px-4 py-3 font-medium text-white/70">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              <tr>
                <td className="px-4 py-3 text-white/60 font-mono text-xs">session_id</td>
                <td className="px-4 py-3 text-white/60">Maintains your session</td>
                <td className="px-4 py-3 text-white/60">Session</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-white/60 font-mono text-xs">csrf_token</td>
                <td className="px-4 py-3 text-white/60">Security protection</td>
                <td className="px-4 py-3 text-white/60">Session</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-white/60 font-mono text-xs">cookie_consent</td>
                <td className="px-4 py-3 text-white/60">Stores your cookie preferences</td>
                <td className="px-4 py-3 text-white/60">1 year</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-white/60 font-mono text-xs">theme</td>
                <td className="px-4 py-3 text-white/60">Remembers dark/light mode</td>
                <td className="px-4 py-3 text-white/60">1 year</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="analytics">
        <h2 className="mb-4 text-2xl font-bold text-white">Analytics Cookies</h2>
        <p className="mb-4 text-base leading-relaxed text-white/60">
          These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us improve our website&apos;s functionality and user experience.
        </p>
        <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/[0.06] bg-white/[0.03]">
              <tr>
                <th className="px-4 py-3 font-medium text-white/70">Cookie</th>
                <th className="px-4 py-3 font-medium text-white/70">Purpose</th>
                <th className="px-4 py-3 font-medium text-white/70">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              <tr>
                <td className="px-4 py-3 text-white/60 font-mono text-xs">_ga</td>
                <td className="px-4 py-3 text-white/60">Google Analytics - distinguishes users</td>
                <td className="px-4 py-3 text-white/60">2 years</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-white/60 font-mono text-xs">_ga_*</td>
                <td className="px-4 py-3 text-white/60">Google Analytics - session state</td>
                <td className="px-4 py-3 text-white/60">2 years</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="preference">
        <h2 className="mb-4 text-2xl font-bold text-white">Preference Cookies</h2>
        <p className="text-base leading-relaxed text-white/60">
          These cookies enable a website to remember information that changes the way the website behaves or looks, like your preferred language or the region you are in. They may be set by us or by third-party providers whose services we have added to our pages.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-white/[0.06]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/[0.06] bg-white/[0.03]">
              <tr>
                <th className="px-4 py-3 font-medium text-white/70">Cookie</th>
                <th className="px-4 py-3 font-medium text-white/70">Purpose</th>
                <th className="px-4 py-3 font-medium text-white/70">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              <tr>
                <td className="px-4 py-3 text-white/60 font-mono text-xs">lang_pref</td>
                <td className="px-4 py-3 text-white/60">Remembers your language preference</td>
                <td className="px-4 py-3 text-white/60">1 year</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-white/60 font-mono text-xs">search_history</td>
                <td className="px-4 py-3 text-white/60">Stores recent searches</td>
                <td className="px-4 py-3 text-white/60">30 days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="marketing">
        <h2 className="mb-4 text-2xl font-bold text-white">Future Marketing Cookies</h2>
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
          <p className="mb-2 text-base font-medium text-amber-400">Coming Soon</p>
          <p className="text-base leading-relaxed text-white/60">
            In the future, we may use marketing cookies to deliver personalized advertisements and track the effectiveness of our marketing campaigns. These cookies will only be set with your explicit consent. You will be notified and given the opportunity to opt in before any marketing cookies are deployed.
          </p>
        </div>
      </section>

      <section id="management">
        <h2 className="mb-4 text-2xl font-bold text-white">Cookie Management</h2>
        <p className="mb-4 text-base leading-relaxed text-white/60">
          You can manage your cookie preferences at any time:
        </p>
        <ul className="space-y-2 text-base text-white/60">
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
            <strong className="text-white">Cookie Banner:</strong> Use the cookie consent banner when you first visit our site
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
            <strong className="text-white">Browser Settings:</strong> Configure your browser to block or delete cookies
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
            <strong className="text-white">Contact Us:</strong> Email us at {siteConfig.contact.email} for assistance
          </li>
        </ul>
      </section>

      <section id="browser">
        <h2 className="mb-4 text-2xl font-bold text-white">Browser Settings</h2>
        <p className="text-base leading-relaxed text-white/60">
          Most web browsers allow you to control cookies through their settings. You can set your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some parts of our website may not function properly.
        </p>
      </section>

      <section id="changes">
        <h2 className="mb-4 text-2xl font-bold text-white">Changes to This Policy</h2>
        <p className="text-base leading-relaxed text-white/60">
          We may update this Cookie Policy from time to time to reflect changes in technology or legislation. We will notify you of any material changes by posting the updated policy on this page.
        </p>
      </section>

      <section id="contact">
        <h2 className="mb-4 text-2xl font-bold text-white">Contact Us</h2>
        <p className="mb-4 text-base leading-relaxed text-white/60">
          If you have any questions about our use of cookies, please contact us:
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <p className="text-sm text-white/60"><strong className="text-white">Email:</strong> {siteConfig.contact.email}</p>
          <p className="mt-2 text-sm text-white/60"><strong className="text-white">Phone:</strong> {siteConfig.contact.phone}</p>
        </div>
        <p className="mt-4 text-sm text-white/40">
          See also: <Link href="/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link> | <Link href="/terms" className="text-blue-400 hover:text-blue-300">Terms & Conditions</Link>
        </p>
      </section>
    </LegalPageLayout>
  );
}
