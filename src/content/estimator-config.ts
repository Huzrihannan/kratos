export interface ProjectTypeOption {
  id: string;
  label: string;
  description: string;
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
  multiplier: number;
  iconName: string;
}

export interface TimelineOption {
  id: string;
  label: string;
  description: string;
  multiplier: number;
  rushWeeksMultiplier: number;
}

export interface BudgetBandOption {
  id: string;
  label: string;
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
      multiplier: 1.15,
      iconName: "Palette",
    },
    {
      id: "dev",
      label: "Full-Stack Development",
      description: "Frontend, backend APIs, database architecture",
      multiplier: 1.25,
      iconName: "Code2",
    },
    {
      id: "integrations",
      label: "Integrations & APIs",
      description: "Stripe, CRM, third-party services, webhooks",
      multiplier: 1.1,
      iconName: "Workflow",
    },
    {
      id: "devops",
      label: "Hosting & DevOps",
      description: "CI/CD pipelines, DNS, security, serverless setup",
      multiplier: 1.08,
      iconName: "Cloud",
    },
    {
      id: "maintenance",
      label: "Maintenance & Support",
      description: "Ongoing updates, monitoring, performance tuning",
      multiplier: 1.12,
      iconName: "ShieldCheck",
    },
    {
      id: "consulting",
      label: "Not sure yet",
      description: "Need technical guidance to define the scope",
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
        multiplier: 1.15,
        iconName: "Palette",
      },
      {
        id: "dev",
        label: "Responsive Development",
        description: "Next.js, Tailwind, SEO optimization, smooth scroll",
        multiplier: 1.2,
        iconName: "Code2",
      },
      {
        id: "cms",
        label: "CMS Integration",
        description: "Easy content updates for your marketing team",
        multiplier: 1.12,
        iconName: "FileText",
      },
      {
        id: "devops",
        label: "Hosting & Analytics",
        description: "Custom domain, fast CDN, privacy-friendly analytics",
        multiplier: 1.06,
        iconName: "Cloud",
      },
      {
        id: "maintenance",
        label: "Ongoing Support",
        description: "Monthly maintenance and content refreshes",
        multiplier: 1.1,
        iconName: "ShieldCheck",
      },
      {
        id: "consulting",
        label: "Not sure yet",
        description: "Help me figure out the right setup",
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
      multiplier: 1.2,
      rushWeeksMultiplier: 0.65,
    },
    {
      id: "1_3_months",
      label: "1–3 Months",
      description: "Standard production pace",
      multiplier: 1.0,
      rushWeeksMultiplier: 1.0,
    },
    {
      id: "3_6_months",
      label: "3–6 Months",
      description: "Flexible, phased milestone launch",
      multiplier: 0.95,
      rushWeeksMultiplier: 1.4,
    },
    {
      id: "exploring",
      label: "Just Exploring",
      description: "Gathering estimates for upcoming quarter",
      multiplier: 1.0,
      rushWeeksMultiplier: 1.0,
    },
  ],

  budgetBands: [
    { id: "5k_10k", label: "$5,000 – $10,000", min: 5000, max: 10000 },
    { id: "10k_25k", label: "$10,000 – $25,000", min: 10000, max: 25000 },
    { id: "25k_50k", label: "$25,000 – $50,000", min: 25000, max: 50000 },
    { id: "50k_plus", label: "$50,000+", min: 50000 },
    { id: "not_sure", label: "Not sure, advise me", isCustom: true },
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
