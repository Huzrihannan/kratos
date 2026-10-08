import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { LayoutProvider } from "@/lib/modal-context";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { StickyCta } from "@/components/layout/StickyCta";
import { PageTransition } from "@/components/layout/PageTransition";
import { siteConfig } from "@/content/site";

const EstimatorModal = dynamic(
  () => import("@/components/estimator/EstimatorModal").then((mod) => mod.EstimatorModal)
);

const CursorFollower = dynamic(
  () => import("@/components/fx/CursorFollower").then((mod) => mod.CursorFollower)
);

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-mono",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://krat-os.dev"),
  title: {
    default: `${siteConfig.name} — ${siteConfig.positioning}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.shortPitch,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://krat-os.dev",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.positioning}`,
    description: siteConfig.shortPitch,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.positioning}`,
    description: siteConfig.shortPitch,
  },
  icons: {
    icon: "/brand/favicon.svg",
    apple: "/brand/app-icon.svg",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://krat-os.dev/#organization",
      name: siteConfig.name,
      url: "https://krat-os.dev",
      logo: "https://krat-os.dev/brand/logo-dark.svg",
      slogan: siteConfig.positioning,
      description: siteConfig.shortPitch,
      contactPoint: {
        "@type": "ContactPoint",
        email: siteConfig.contact.email,
        contactType: "customer service",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://krat-os.dev/#website",
      name: siteConfig.name,
      url: "https://krat-os.dev",
      publisher: {
        "@id": "https://krat-os.dev/#organization",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jetbrainsMono.variable} ${geist.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="bg-bg text-fg font-sans selection:bg-red selection:text-fg antialiased min-h-screen flex flex-col">
        <ThemeProvider>
          <LayoutProvider>
            {/* Accessible Skip Link */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99] focus:px-4 focus:py-2 focus:bg-surface focus:text-fg focus:border focus:border-red-text focus:outline-none focus:ring-2 focus:ring-red-text"
            >
              Skip to main content
            </a>

            <SmoothScroll>
              <PageTransition />
              <CursorFollower />
              <Nav />
              <main id="main-content" className="flex-1 pt-20 sm:pt-24">
                {children}
              </main>
              <Footer />
              <StickyCta />
              <EstimatorModal />
            </SmoothScroll>
          </LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
