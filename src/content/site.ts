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

const rawWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+1234567890";
const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, "");

export const siteConfig: SiteConfig = {
  name: "Kratos Software Solutions",
  tagline: "software solutions",
  positioning: "Strong underneath. Friendly on top.",
  shortPitch:
    "We build web apps, mobile apps, and smart automations for teams who want dependable results without the jargon.",

  availability: {
    status: "available",
    chipText: "Taking on new projects for November",
    details: "Currently scheduling discovery calls and technical roadmaps.",
  },

  contact: {
    email: process.env.LEAD_NOTIFY_EMAIL || "hello@kratos.dev",
    phone: rawWhatsapp,
    whatsappNumber: rawWhatsapp,
    whatsappUrl: `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
      "Hi Kratos! I would like to chat about a project."
    )}`,
    bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "https://cal.com/kratos/15min",
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
        { label: "Web Applications", href: "/services#web" },
        { label: "Mobile Apps (iOS & Android)", href: "/services#mobile" },
        { label: "Automation & Workflows", href: "/services#automations" },
        { label: "System Modernization", href: "/services#modernization" },
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
        { label: "Book a 15-min Call", href: process.env.NEXT_PUBLIC_BOOKING_URL || "https://cal.com/kratos/15min", external: true },
        { label: "Chat on WhatsApp", href: `https://wa.me/${cleanWhatsapp}`, external: true },
        { label: "hello@kratos.dev", href: "mailto:hello@kratos.dev" },
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
