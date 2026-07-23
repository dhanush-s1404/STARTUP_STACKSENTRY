import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/providers/query-provider";
import { siteMetadata } from "@/config/site";
import { Suspense } from "react";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { FloatingActions } from "@/components/shared/floating-actions";
import { CustomCursor } from "@/components/shared/custom-cursor";
import { PageLoader } from "@/components/shared/page-loader";
import { SearchOverlay } from "@/components/shared/search-overlay";
import { StructuredData } from "@/components/shared/structured-data";
import { AnnouncementBar } from "@/components/shared/announcement-bar";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo";
import "./globals.css";
import "@/styles/animations.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050816" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('stacksentry-theme') || 'dark';
    var root = document.documentElement;
    if (theme === 'system') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    root.classList.add(theme);
  } catch(e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Providers>
          <StructuredData data={generateOrganizationSchema()} />
          <StructuredData data={generateWebsiteSchema()} />
          <ScrollProgress />
          <Suspense fallback={null}>
            <PageLoader />
          </Suspense>
          <AnnouncementBar />
          {children}
          <FloatingActions />
          <SearchOverlay />
          <CustomCursor />
        </Providers>
      </body>
    </html>
  );
}
