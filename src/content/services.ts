export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortPromise: string;
  iconName: "Globe" | "Smartphone" | "ShoppingBag" | "Cpu" | "Palette" | "ShieldCheck";
  outcomes: [string, string, string];
  tags: string[];
  illustration: "webapp" | "mobile" | "ecommerce" | "ai" | "design" | "maintenance";
  detailSummary: string;
  timeframe: string;
  deliverables: string[];
  processSteps: ServiceProcessStep[];
  faqs: ServiceFaq[];
  relatedWorkSlugs: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "web-apps",
    slug: "web-apps",
    title: "Web Applications & SaaS",
    shortPromise: "Bespoke cloud platforms and customer portals that scale gracefully without architectural debt.",
    iconName: "Globe",
    outcomes: [
      "Sub-second page speeds with Next.js App Router and edge caching",
      "Robust role-based access control and multi-tenant data isolation",
      "Seamless payment flows, subscription metering, and audit logs",
    ],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Supabase", "Prisma"],
    illustration: "webapp",
    detailSummary: "High-performance web apps built with modular architectures, strict TypeScript typing, and responsive fluid layouts.",
    timeframe: "Varies with scope",
    deliverables: [
      "Full Next.js 15 App Router source code in your private GitHub",
      "PostgreSQL database schema with automated migration scripts",
      "Enterprise authentication with role-based access control (RBAC)",
      "Automated CI/CD deployment pipelines on Vercel or AWS",
      "Interactive component design system matching brand tokens",
      "Comprehensive API documentation and developer runbook",
    ],
    processSteps: [
      {
        title: "Architecture & Data Modeling",
        description: "We map user journeys, state flows, and relational schemas before writing a single line of production code.",
      },
      {
        title: "Sprint-Based Engineering",
        description: "Two-week agile cycles with deployable staging environments and weekly video progress updates.",
      },
      {
        title: "Stress Testing & Edge Tuning",
        description: "End-to-end testing, query optimization, and Lighthouse 95+ performance auditing across viewports.",
      },
      {
        title: "Production Launch & Handover",
        description: "Domain setup, SSL, automated backups, and post-launch handover support with zero downtime.",
      },
    ],
    faqs: [
      {
        question: "Can we migrate data from our legacy database?",
        answer: "Yes. We regularly build ETL migration scripts to transfer users, subscriptions, and historical records with zero data loss or downtime.",
      },
      {
        question: "Do you build the admin dashboard as well?",
        answer: "Every custom web application includes a tailored back-office admin dashboard for user management, metric analytics, and support overrides.",
      },
      {
        question: "Who pays for cloud hosting?",
        answer: "Cloud hosting (Vercel, AWS, Supabase) is billed directly to your corporate accounts. We set up everything and hand over root access.",
      },
    ],
    relatedWorkSlugs: ["fintech-portal"],
  },
  {
    id: "mobile-apps",
    slug: "mobile-apps",
    title: "Mobile Apps (iOS & Android)",
    shortPromise: "Native-feel cross-platform mobile experiences with sub-frame response and 60fps performance.",
    iconName: "Smartphone",
    outcomes: [
      "Unified React Native or Flutter codebase running identically on iOS & Android",
      "Offline-first sync with SQLite and background push notification pipelines",
      "App Store & Google Play submission and certificate management included",
    ],
    tags: ["React Native", "Expo", "iOS", "Android", "TypeScript", "SQLite"],
    illustration: "mobile",
    detailSummary: "Fluid mobile apps designed for instant tactile feedback, rock-solid offline reliability, and delightful native gestures.",
    timeframe: "Varies with scope",
    deliverables: [
      "Cross-platform iOS and Android codebase with shared TypeScript logic",
      "Offline cache layer with automatic conflict resolution",
      "Push notification integration (APNs & Firebase Cloud Messaging)",
      "App Store & Google Play Store submission assets and review management",
      "Biometric authentication (Face ID / Touch ID / Fingerprint)",
      "Automated crash reporting and telemetry with Sentry",
    ],
    processSteps: [
      {
        title: "Touch UX & Gesture Flow",
        description: "We wireframe tactile mobile user flows adhering to iOS Human Interface Guidelines and Android Material standards.",
      },
      {
        title: "Native Component Assembly",
        description: "We implement custom 60fps gesture physics, haptic feedback hooks, and fluid screen transitions.",
      },
      {
        title: "Offline Sync Architecture",
        description: "Local SQLite storage ensures all critical features work flawlessly on spotty mobile connections.",
      },
      {
        title: "App Store Certification",
        description: "We handle Apple App Store and Google Play compliance review, testflight groups, and production deployment.",
      },
    ],
    faqs: [
      {
        question: "Will the app feel native on both iPhone and Android?",
        answer: "Yes. By utilizing React Native with native bridge primitives and platform-specific haptic patterns, users cannot distinguish our builds from pure Swift/Kotlin.",
      },
      {
        question: "How do in-app purchases and subscriptions work?",
        answer: "We integrate RevenueCat or native StoreKit/Google Play Billing for seamless auto-renewing subscriptions and paywalls.",
      },
      {
        question: "Do we need separate developer accounts for Apple and Google?",
        answer: "Yes, you will need your own Apple Developer and Google Play Console accounts, which ensures you maintain full ownership of your app listings.",
      },
    ],
    relatedWorkSlugs: ["healthtech-mobile"],
  },
  {
    id: "ecommerce",
    slug: "ecommerce",
    title: "Modern E-Commerce",
    shortPromise: "Custom storefronts and high-converting checkout flows with zero cookie-cutter template bloat.",
    iconName: "ShoppingBag",
    outcomes: [
      "Headless Shopify or Stripe custom checkouts with 1-click buy options",
      "Instant inventory sync and dynamic multi-currency pricing",
      "Lighthouse 95+ performance converting mobile visitors at industry-leading rates",
    ],
    tags: ["Headless", "Shopify Storefront API", "Stripe", "Next.js", "Tailwind CSS"],
    illustration: "ecommerce",
    detailSummary: "Custom e-commerce platforms focused on conversion rate optimization, lightning search, and frictionless checkout.",
    timeframe: "Varies with scope",
    deliverables: [
      "Custom headless storefront engineered with Next.js App Router",
      "Shopify Storefront API or Stripe custom checkout integration",
      "Instant algorithmic product search and faceted attribute filters",
      "Cart abandonment mitigation and transactional email templates",
      "Contentful or Sanity CMS setup for marketing banners and lookbooks",
      "Google Tag Manager and Meta Pixel enhanced conversion tracking",
    ],
    processSteps: [
      {
        title: "Funnel Analysis & Wireframing",
        description: "We optimize product page hierarchy, cart drawer interactions, and express checkout pathways.",
      },
      {
        title: "Headless Architecture Setup",
        description: "Decoupled frontend connected to your inventory catalog via high-speed GraphQL endpoints.",
      },
      {
        title: "Conversion Stress Testing",
        description: "Mobile payment testing (Apple Pay, Google Pay) and zero-friction international currency localization.",
      },
      {
        title: "Go-Live & Metric Calibration",
        description: "Domain switch with zero inventory downtime, heat-mapping integration, and conversion monitoring.",
      },
    ],
    faqs: [
      {
        question: "Why choose headless over standard Shopify themes?",
        answer: "Headless storefronts eliminate bloated liquid plugins, load instantly, and allow completely custom brand experiences designed for high conversion.",
      },
      {
        question: "Can our team still update inventory and prices in Shopify?",
        answer: "Absolutely. Your warehouse and operations team continue using standard Shopify Admin exactly as they do today. The custom frontend reflects changes automatically.",
      },
      {
        question: "Does this support international currencies and taxes?",
        answer: "Yes, we implement automatic geo-detection, localized pricing, VAT/GST calculation, and multi-language routing.",
      },
    ],
    relatedWorkSlugs: ["fintech-portal"],
  },
  {
    id: "ai-automation",
    slug: "ai-automation",
    title: "AI Workflows & Automation",
    shortPromise: "Eliminate repetitive manual busywork with smart LLM agents and automated data pipelines.",
    iconName: "Cpu",
    outcomes: [
      "Automated document processing, invoice OCR, and semantic data extraction",
      "Custom internal LLM agents connected securely to your internal databases",
      "Webhooks, cron jobs, and resilient retry queues that run reliably 24/7",
    ],
    tags: ["Python", "FastAPI", "OpenAI", "Anthropic", "Vector Search", "Docker"],
    illustration: "ai",
    detailSummary: "Pragmatic AI integrations and background automations that deliver measurable hour savings and operational clarity.",
    timeframe: "Varies with scope",
    deliverables: [
      "Custom asynchronous microservices built with Python / FastAPI",
      "Private semantic search and RAG knowledge base integration",
      "Automated document intake pipeline (PDF, CSV, scans) with structured JSON output",
      "Resilient Celery or BullMQ worker queues with automated retries and alerting",
      "Management dashboard for inspecting agent runs, tokens, and errors",
      "Zero data training guarantees ensuring your proprietary information stays private",
    ],
    processSteps: [
      {
        title: "Process Audit & ROI Scoping",
        description: "We identify the repetitive bottlenecks in your daily operations that yield the fastest payback.",
      },
      {
        title: "Pipeline & Schema Design",
        description: "We establish structured schema validation (Pydantic / Zod) to guarantee zero LLM hallucination in data output.",
      },
      {
        title: "Sandbox Calibration",
        description: "We benchmark extraction accuracy across complex edge-case documents to ensure production reliability.",
      },
      {
        title: "Integration & Monitoring",
        description: "Deployment with automated Slack alerts for unhandled exceptions and real-time cost tracking.",
      },
    ],
    faqs: [
      {
        question: "Will our proprietary business data be used to train AI models?",
        answer: "Never. We exclusively use enterprise API endpoints with contractual zero-data-retention and zero-model-training guarantees.",
      },
      {
        question: "What happens when an unreadable or corrupt document is uploaded?",
        answer: "Our pipeline validates confidence scores. If confidence drops below 95%, the document is routed to a human review queue with clear error highlights.",
      },
      {
        question: "Can these automations connect to our existing CRM or ERP?",
        answer: "Yes, we integrate via REST, GraphQL, webhooks, or direct database connections with Salesforce, HubSpot, SAP, QuickBooks, and internal tools.",
      },
    ],
    relatedWorkSlugs: ["logistics-automation"],
  },
  {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    title: "UI/UX & Product Design",
    shortPromise: "Precise, modular design systems and wireframes that turn complex workflows into intuitive speed.",
    iconName: "Palette",
    outcomes: [
      "Interactive Figma design systems complete with token architecture",
      "Comprehensive usability testing and customer journey mapping",
      "Production-ready design handoff with micro-interaction specifications",
    ],
    tags: ["Figma", "Design Systems", "Prototyping", "Design Tokens", "Accessibility"],
    illustration: "design",
    detailSummary: "User experience engineering that strikes the perfect balance between distinct brand personality and effortless clarity.",
    timeframe: "Varies with scope",
    deliverables: [
      "Full Figma component library with variants, auto-layout, and token definitions",
      "High-fidelity interactive prototype demonstrating key user journeys",
      "Mechanical micro-interaction documentation for front-end developers",
      "Accessibility audit report guaranteeing WCAG 2.1 AA compliance",
      "SVG icon set and custom brand graphic elements",
      "Design token export in CSS variables and Tailwind configuration",
    ],
    processSteps: [
      {
        title: "User Journey & Information Architecture",
        description: "We simplify multi-step flows and eliminate cognitive load before touching aesthetic styling.",
      },
      {
        title: "Token & Primitive Creation",
        description: "We establish colors, typography clamps, radius tokens, and elevation models in Figma.",
      },
      {
        title: "High-Fidelity Screen Prototyping",
        description: "Complete UI mockups for mobile, tablet, and desktop with interactive clickable states.",
      },
      {
        title: "Developer Handoff Package",
        description: "Clean specs, SVG exports, token JSON, and developer pairing sessions to ensure 1:1 fidelity.",
      },
    ],
    faqs: [
      {
        question: "Can we hire you just for UI/UX without development?",
        answer: "Yes! Many clients engage us for design systems and prototypes, then have their in-house engineering team build from our Figma specs.",
      },
      {
        question: "How do you test designs before coding?",
        answer: "We run unmoderated user tests using interactive Figma prototypes to validate comprehension, button discoverability, and flow speed.",
      },
      {
        question: "Will the design adhere to our existing brand guidelines?",
        answer: "We can either elevate your existing brand or build an entirely fresh visual language with our clean, technical, high-performance aesthetic.",
      },
    ],
    relatedWorkSlugs: ["fintech-portal", "healthtech-mobile"],
  },
  {
    id: "maintenance-support",
    slug: "maintenance-support",
    title: "Maintenance & System Evolution",
    shortPromise: "Proactive security monitoring, dependency upgrades, and on-call engineering after launch.",
    iconName: "ShieldCheck",
    outcomes: [
      "High-availability uptime monitoring with real-time error tracking and automated rollback",
      "Continuous dependency audits, patch releases, and performance profiling",
      "Direct engineer Slack/Discord channel with dedicated priority response",
    ],
    tags: ["Sentry", "AWS CloudWatch", "GitHub Actions", "Docker", "DevOps"],
    illustration: "maintenance",
    detailSummary: "Dedicated engineering support ensuring your digital assets stay secure, modern, and lightning fast.",
    timeframe: "Monthly Retainer",
    deliverables: [
      "24/7 automated uptime and latency monitoring with synthetic pings",
      "Weekly security vulnerability audits and automated dependabot merges",
      "Monthly allocation of engineering hours for feature enhancements",
      "Dedicated private Slack or Discord channel connecting to senior engineers",
      "Disaster recovery runbook with verified automated offsite database backups",
      "Quarterly performance, SEO, and accessibility re-certification",
    ],
    processSteps: [
      {
        title: "System Audit & Health Baseline",
        description: "We inspect your infrastructure, package vulnerabilities, and test coverage to set a clean baseline.",
      },
      {
        title: "Monitoring & Alert Setup",
        description: "We configure real-time error alerting (Sentry) and performance alerts straight into our incident response rotation.",
      },
      {
        title: "Continuous Maintenance Sprints",
        description: "Bi-weekly scheduled maintenance windows to upgrade libraries, patch security notices, and optimize queries.",
      },
      {
        title: "Feature Roadmapping",
        description: "Dedicated hours each month to ship requested enhancements, new integrations, and UI refinements.",
      },
    ],
    faqs: [
      {
        question: "What is your response protocol for critical production emergencies?",
        answer: "For critical production outages, our team initiates immediate emergency triage, incident notifications, and automated rollback protocols.",
      },
      {
        question: "Can unused monthly hours roll over to the next month?",
        answer: "Yes, up to 50% of unused feature development hours roll over into the following billing period.",
      },
      {
        question: "Can you maintain an application built by another agency?",
        answer: "Yes, after an initial technical architecture audit to review code quality and documentation.",
      },
    ],
    relatedWorkSlugs: ["logistics-automation"],
  },
];
