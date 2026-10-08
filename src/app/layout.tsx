import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Fredoka, Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { LayoutProvider } from "@/lib/modal-context";
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

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kratos.dev"),
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
    url: "https://kratos.dev",
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
      "@id": "https://kratos.dev/#organization",
      name: siteConfig.name,
      url: "https://kratos.dev",
      logo: "https://kratos.dev/brand/logo.svg",
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
      "@id": "https://kratos.dev/#website",
      url: "https://kratos.dev",
      name: siteConfig.name,
      publisher: {
        "@id": "https://kratos.dev/#organization",
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
    <html lang="en" className={`${fredoka.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="bg-cream text-ink font-body selection:bg-orange selection:text-ink antialiased min-h-screen flex flex-col">
        <LayoutProvider>
          {/* Accessible Skip Link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99] focus:px-4 focus:py-2 focus:bg-orange focus:text-ink focus:rounded-full focus:font-bold focus:shadow-pill focus:outline-none focus:ring-4 focus:ring-orange-deep"
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
      </body>
    </html>
  );
}
