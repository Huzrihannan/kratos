export interface ProjectTypeOption {
  id: string;
  label: string;
  description: string;
  hint?: string;
  basePriceMin: number;
  basePriceMax: number;
  baseWeeksMin: number;
  baseWeeksMax: number;
  iconName: string;
}

export interface NeedOption {
  id: string;
  label: string;
  description: string;
  hint?: string;
  multiplier: number;
  iconName: string;
}

export interface TimelineOption {
  id: string;
  label: string;
  description: string;
  hint?: string;
  multiplier: number;
  rushWeeksMultiplier: number;
}

export interface BudgetBandOption {
  id: string;
  label: string;
  hint?: string;
  min?: number;
  max?: number;
  isCustom?: boolean;
}

export interface EstimatorConfig {
  approved: boolean;
  showEstimate: boolean;
  projectTypes: ProjectTypeOption[];
  needsByProjectType: Record<string, NeedOption[]>;
  defaultNeeds: NeedOption[];
  timelines: TimelineOption[];
  budgetBands: BudgetBandOption[];
}

export const estimatorConfig: EstimatorConfig = {
  // Price bands must be approved by the owner before showEstimate can be enabled
  approved: false,
  showEstimate: false,

  projectTypes: [
    {
      id: "website",
      label: "Marketing Website",
      description: "High-converting brand site or landing pages",
      hint: "A fast, beautifully crafted site designed to showcase your brand and turn visitors into enquiries.",
      basePriceMin: 4500,
      basePriceMax: 8500,
      baseWeeksMin: 2,
      baseWeeksMax: 4,
      iconName: "Globe",
    },
    {
      id: "webapp",
      label: "Web App / SaaS",
      description: "Custom platform, dashboard, or portal with user auth",
      hint: "Custom software that clients, teams, or customers log into directly through their web browser.",
      basePriceMin: 12000,
      basePriceMax: 24000,
      baseWeeksMin: 6,
      baseWeeksMax: 10,
      iconName: "Layers",
    },
    {
      id: "mobile",
      label: "Mobile App",
      description: "Native or cross-platform iOS & Android application",
      hint: "An iOS and Android application that customers install from the App Store or Google Play.",
      basePriceMin: 15000,
      basePriceMax: 30000,
      baseWeeksMin: 8,
      baseWeeksMax: 14,
      iconName: "Smartphone",
    },
    {
      id: "ecommerce",
      label: "E-Commerce",
      description: "Storefront, payments, inventory, and custom checkout",
      hint: "An online store with shopping carts, product catalogs, customer accounts, and secure checkout.",
      basePriceMin: 8000,
      basePriceMax: 18000,
      baseWeeksMin: 4,
      baseWeeksMax: 8,
      iconName: "ShoppingBag",
    },
    {
      id: "ai_automation",
      label: "AI / Smart Automation",
      description: "Internal tooling, AI workflows, API integrations",
      hint: "Smart background workflows, automated data processing, and custom AI tools that save hours of manual work.",
      basePriceMin: 7500,
      basePriceMax: 16000,
      baseWeeksMin: 3,
      baseWeeksMax: 6,
      iconName: "Cpu",
    },
    {
      id: "custom",
      label: "Something Else",
      description: "Specialized architectures, migrations, or custom builds",
      hint: "Tailored software solutions for unique business workflows, migrations, or custom architectures.",
      basePriceMin: 9000,
      basePriceMax: 20000,
      baseWeeksMin: 4,
      baseWeeksMax: 8,
      iconName: "Sparkles",
    },
  ],

  defaultNeeds: [
    {
      id: "design",
      label: "UI/UX Design",
      description: "Wireframes, high-fidelity prototypes, brand styling",
      hint: "Wireframes, typography, layouts, and complete user-friendly visual styling before building.",
      multiplier: 1.15,
      iconName: "Palette",
    },
    {
      id: "dev",
      label: "Full-Stack Development",
      description: "Frontend, backend APIs, database architecture",
      hint: "Clean, robust programming that brings your interface to life and connects to databases.",
      multiplier: 1.25,
      iconName: "Code2",
    },
    {
      id: "integrations",
      label: "Integrations & APIs",
      description: "Stripe, CRM, third-party services, webhooks",
      hint: "Connecting external tools like payment gateways, email marketing, CRMs, or accounting.",
      multiplier: 1.1,
      iconName: "Workflow",
    },
    {
      id: "devops",
      label: "Hosting & DevOps",
      description: "CI/CD pipelines, DNS, security, serverless setup",
      hint: "High-speed global cloud hosting, automated deployment pipelines, security, and domain setup.",
      multiplier: 1.08,
      iconName: "Cloud",
    },
    {
      id: "maintenance",
      label: "Maintenance & Support",
      description: "Ongoing updates, monitoring, performance tuning",
      hint: "Post-launch updates, dependency management, security patches, and performance checks.",
      multiplier: 1.12,
      iconName: "ShieldCheck",
    },
    {
      id: "consulting",
      label: "Not sure yet",
      description: "Need technical guidance to define the scope",
      hint: "Collaborative discovery sessions to clarify your technical roadmap and feature scope.",
      multiplier: 1.0,
      iconName: "HelpCircle",
    },
  ],

  needsByProjectType: {
    website: [
      {
        id: "design",
        label: "Brand & UI/UX Design",
        description: "Visual identity, copywriting support, animations",
        hint: "Custom visual identity, wireframes, and responsive layouts tailored to your brand.",
        multiplier: 1.15,
        iconName: "Palette",
      },
      {
        id: "dev",
        label: "Responsive Development",
        description: "Next.js, Tailwind, SEO optimization, smooth scroll",
        hint: "Lightweight, lightning-fast web engineering built with Next.js and Tailwind CSS.",
        multiplier: 1.2,
        iconName: "Code2",
      },
      {
        id: "cms",
        label: "CMS Integration",
        description: "Easy content updates for your marketing team",
        hint: "An easy administrative dashboard so your team can publish blog posts and edit copy without code.",
        multiplier: 1.12,
        iconName: "FileText",
      },
      {
        id: "devops",
        label: "Hosting & Analytics",
        description: "Custom domain, fast CDN, privacy-friendly analytics",
        hint: "Fast global CDN hosting, SSL certificates, privacy analytics, and custom domain setup.",
        multiplier: 1.06,
        iconName: "Cloud",
      },
      {
        id: "maintenance",
        label: "Ongoing Support",
        description: "Monthly maintenance and content refreshes",
        hint: "Continuous uptime monitoring, minor copy updates, and software library patches.",
        multiplier: 1.1,
        iconName: "ShieldCheck",
      },
      {
        id: "consulting",
        label: "Not sure yet",
        description: "Help me figure out the right setup",
        hint: "Strategic advice on messaging structure, site architecture, and tech choices.",
        multiplier: 1.0,
        iconName: "HelpCircle",
      },
    ],
  },

  timelines: [
    {
      id: "asap",
      label: "ASAP",
      description: "Fast-track sprint (< 1 month)",
      hint: "High-priority dedicated development sprint targeting rapid market launch in under 4 weeks.",
      multiplier: 1.2,
      rushWeeksMultiplier: 0.65,
    },
    {
      id: "1_3_months",
      label: "1–3 Months",
      description: "Standard production pace",
      hint: "Comfortable standard pace allowing thoughtful review cycles and comprehensive testing.",
      multiplier: 1.0,
      rushWeeksMultiplier: 1.0,
    },
    {
      id: "3_6_months",
      label: "3–6 Months",
      description: "Flexible, phased milestone launch",
      hint: "Phased multi-milestone rollout ideal for larger platforms with extensive feature sets.",
      multiplier: 0.95,
      rushWeeksMultiplier: 1.4,
    },
    {
      id: "exploring",
      label: "Just Exploring",
      description: "Gathering estimates for upcoming quarter",
      hint: "Early feasibility planning and budgeting for an upcoming quarter or investment round.",
      multiplier: 1.0,
      rushWeeksMultiplier: 1.0,
    },
  ],

  budgetBands: [
    {
      id: "5k_10k",
      label: "$5,000 – $10,000",
      hint: "Best suited for focused marketing websites, landing systems, or scoped interactive audits.",
      min: 5000,
      max: 10000,
    },
    {
      id: "10k_25k",
      label: "$10,000 – $25,000",
      hint: "Ideal for comprehensive websites, customer portals, or initial software MVPs.",
      min: 10000,
      max: 25000,
    },
    {
      id: "25k_50k",
      label: "$25,000 – $50,000",
      hint: "Designed for full-featured web applications, native mobile apps, or custom platforms.",
      min: 25000,
      max: 50000,
    },
    {
      id: "50k_plus",
      label: "$50,000+",
      hint: "For multi-platform systems, enterprise workflows, or extensive custom AI platforms.",
      min: 50000,
    },
    {
      id: "not_sure",
      label: "Not sure, advise me",
      hint: "We will review your goals and suggest a realistic, phased milestone budget.",
      isCustom: true,
    },
  ],
};

export interface BallparkCalculation {
  estimateMin: number;
  estimateMax: number;
  weeksMin: number;
  weeksMax: number;
  formattedRange: string;
  formattedTimeline: string;
}

export function calculateBallpark(
  projectTypeId: string,
  selectedNeedIds: string[],
  timelineId: string
): BallparkCalculation {
  const projectType =
    estimatorConfig.projectTypes.find((p) => p.id === projectTypeId) ||
    estimatorConfig.projectTypes[0];

  const availableNeeds =
    estimatorConfig.needsByProjectType[projectTypeId] ||
    estimatorConfig.defaultNeeds;

  const timeline =
    estimatorConfig.timelines.find((t) => t.id === timelineId) ||
    estimatorConfig.timelines[1];

  // Compute needs compound multiplier
  let needsMultiplier = 1.0;
  selectedNeedIds.forEach((needId) => {
    const need = availableNeeds.find((n) => n.id === needId);
    if (need && need.id !== "consulting") {
      needsMultiplier *= need.multiplier;
    }
  });

  const speedMultiplier = timeline.multiplier;

  // Min and Max calculations with 10% lower floor and 20% scope buffer
  const rawMin = projectType.basePriceMin * needsMultiplier * speedMultiplier * 0.9;
  const rawMax = projectType.basePriceMax * needsMultiplier * speedMultiplier * 1.15;

  // Round cleanly to nearest 500
  const estimateMin = Math.round(rawMin / 500) * 500;
  const estimateMax = Math.round(rawMax / 500) * 500;

  const rawWeeksMin = Math.max(
    2,
    Math.round(projectType.baseWeeksMin * timeline.rushWeeksMultiplier)
  );
  const rawWeeksMax = Math.max(
    rawWeeksMin + 1,
    Math.round(projectType.baseWeeksMax * timeline.rushWeeksMultiplier)
  );

  return {
    estimateMin,
    estimateMax,
    weeksMin: rawWeeksMin,
    weeksMax: rawWeeksMax,
    formattedRange: `$${estimateMin.toLocaleString()} – $${estimateMax.toLocaleString()}`,
    formattedTimeline: `${rawWeeksMin}–${rawWeeksMax} weeks`,
  };
}
