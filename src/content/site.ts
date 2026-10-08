export interface NavLink {
  label: string;
  href: string;
  isButton?: boolean;
}

export interface FooterColumn {
  title: string;
  links: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}

export interface SocialLink {
  platform: string;
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  positioning: string;
  shortPitch: string;
  availability: {
    status: "available" | "busy" | "booked";
    chipText: string;
    details: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsappNumber: string;
    whatsappUrl: string;
    bookingUrl: string;
    location: string;
  };
  navLinks: NavLink[];
  footerColumns: FooterColumn[];
  socialLinks: SocialLink[];
  legalLinks: Array<{ label: string; href: string }>;
  cta: {
    estimator: {
      label: string;
      href: string;
    };
    contact: {
      label: string;
      href: string;
    };
  };
}

function getCurrentAvailabilityMonth(): string {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[new Date().getMonth()];
}

const rawWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, "");

export const siteConfig: SiteConfig = {
  name: "Krat.OS",
  tagline: "Software solutions",
  positioning: "We build the software your business runs on.",
  shortPitch:
    "We build web applications, mobile platforms, and automated workflow engines for teams who want dependable results without the jargon.",

  availability: {
    status: "available",
    chipText: `Taking on new projects for ${getCurrentAvailabilityMonth()}`,
    details: "Currently scheduling technical discovery sessions and system architecture audits.",
  },

  contact: {
    email: process.env.LEAD_NOTIFY_EMAIL || "hello@krat-os.dev",
    phone: rawWhatsapp,
    whatsappNumber: rawWhatsapp,
    whatsappUrl: cleanWhatsapp
      ? `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
          "Hi Krat.OS! I would like to chat about a project."
        )}`
      : "",
    bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
    location: "Global Remote (HQ: San Francisco, CA)",
  },

  navLinks: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  footerColumns: [
    {
      title: "Services",
      links: [
        { label: "Web Applications", href: "/services#web-apps" },
        { label: "Mobile Apps (iOS & Android)", href: "/services#mobile-apps" },
        { label: "AI & Automation", href: "/services#ai-automation" },
        { label: "System Maintenance", href: "/services#maintenance-support" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Work & Case Studies", href: "/work" },
        { label: "About Our Team", href: "/about" },
        { label: "Project Estimator", href: "/start" },
        { label: "Design System", href: "/design-system" },
      ],
    },
    {
      title: "Reach Out",
      links: [
        { label: "Start a Conversation", href: "/contact" },
        ...(process.env.NEXT_PUBLIC_BOOKING_URL
          ? [{ label: "Book a 15-min Call", href: process.env.NEXT_PUBLIC_BOOKING_URL, external: true }]
          : []),
        ...(cleanWhatsapp
          ? [{ label: "Chat on WhatsApp", href: `https://wa.me/${cleanWhatsapp}`, external: true }]
          : []),
        { label: "hello@krat-os.dev", href: "mailto:hello@krat-os.dev" },
      ],
    },
  ],

  socialLinks: [
    { platform: "GitHub", label: "GitHub", href: "https://github.com" },
    { platform: "LinkedIn", label: "LinkedIn", href: "https://linkedin.com" },
    { platform: "X", label: "X / Twitter", href: "https://x.com" },
  ],

  legalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],

  cta: {
    estimator: {
      label: "Estimate my project",
      href: "/start",
    },
    contact: {
      label: "Start a project",
      href: "/contact",
    },
  },
};
