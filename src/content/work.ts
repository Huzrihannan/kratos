export interface CaseStudyResult {
  label: string;
  value: string;
  detail: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  industry: string;
  serviceType: "web" | "mobile" | "automation";
  serviceSlug: string;
  summary: string;
  metricValue: string;
  metricLabel: string;
  tags: string[];
  imageSrc: string;
  isPlaceholder: boolean;
  accentColor: "orange" | "butter" | "peach";
  challenge: string;
  approach: string;
  solution: string;
  results: CaseStudyResult[];
  keyDeliverables: string[];
  clientQuote?: {
    text: string;
    author: string;
    title: string;
  };
  nextSlug: string;
  nextTitle: string;
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "fintech-portal",
    slug: "fintech-portal",
    title: "[PLACEHOLDER] NovaLedger: Real-Time Institutional Settlement Portal",
    clientName: "[PLACEHOLDER] NovaLedger Capital",
    industry: "FinTech & Trading",
    serviceType: "web",
    serviceSlug: "web-apps",
    summary: "Re-engineered a legacy multi-tenant transaction engine into an ultra-fast Next.js platform with edge reconciliation and sub-100ms response times.",
    metricValue: "+142%",
    metricLabel: "Conversion velocity",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Edge Caching"],
    imageSrc: "/work/fintech-preview.svg",
    isPlaceholder: true,
    accentColor: "orange",
    challenge:
      "Institutional investors were experiencing 3–5 second latency spikes during market close reconciliations. The previous monolithic portal suffered from cascading timeout errors, cryptic failure modals, and zero real-time trade verification, leading to high drop-off rates on high-value asset transfers.",
    approach:
      "We tore down the legacy client polling layer and designed an event-driven edge gateway. 'Strong underneath': We modeled a strict PostgreSQL ledger with optimistic balance concurrency locks and WebSocket real-time trade broadcasting. 'Friendly on top': We redesigned the transaction interface with large, reassuring tactile buttons, live pill-status trackers, and inline instant error resolution.",
    solution:
      "A modular Next.js 15 App Router web application backed by Supabase Edge Functions. Institutional traders now receive sub-100ms trade verifications, tactile tactile confirmation feedback, and automated PDF settlement receipts with one-click sharing.",
    results: [
      {
        label: "Settlement Speed",
        value: "82ms",
        detail: "Average round-trip transaction verification, down from 3.8s",
      },
      {
        label: "Conversion Velocity",
        value: "+142%",
        detail: "Increase in completed fund allocations in first 60 days",
      },
      {
        label: "Client Support Tickets",
        value: "-76%",
        detail: "Reduction in transaction discrepancy inquiries",
      },
    ],
    keyDeliverables: [
      "Custom Next.js App Router trader dashboard with edge caching",
      "PostgreSQL ledger with automated reconciliation audit trail",
      "Real-time WebSocket market ticker and balance sync",
      "Tailwind component system matching brand tokens",
      "Full ISO-27001 compliant role-based authentication suite",
    ],
    clientQuote: {
      text: "[PLACEHOLDER] Kratos delivered software that our institutional traders actually enjoy using. Complex settlement mechanics feel effortlessly simple.",
      author: "[PLACEHOLDER] Marcus Vance",
      title: "Chief Operating Officer, NovaLedger Capital",
    },
    nextSlug: "healthtech-mobile",
    nextTitle: "BloomHealth: Pediatric Care Management App",
  },
  {
    id: "healthtech-mobile",
    slug: "healthtech-mobile",
    title: "[PLACEHOLDER] BloomHealth: Pediatric Care Management App",
    clientName: "[PLACEHOLDER] BloomHealth Clinics",
    industry: "HealthTech & Telehealth",
    serviceType: "mobile",
    serviceSlug: "mobile-apps",
    summary: "Built an intuitive cross-platform mobile application supporting encrypted telehealth messaging, appointment scheduling, and offline chart sync.",
    metricValue: "4.9★",
    metricLabel: "App Store rating (50k+ reviews)",
    tags: ["React Native", "iOS", "Android", "HIPAA Ready", "Offline Sync"],
    imageSrc: "/work/healthtech-preview.svg",
    isPlaceholder: true,
    accentColor: "butter",
    challenge:
      "Parents of young pediatric patients found existing health portal software confusing, clinical, and stressful to navigate during late-night emergencies. Clinics reported a 28% no-show rate and nurses were overwhelmed answering routine prescription status phone calls.",
    approach:
      "We took a radically empathetic, friendly design approach. 'Strong underneath': Encrypted SQLite local storage with end-to-end HIPAA compliant messaging queues and automated retry sync. 'Friendly on top': Soft pastel pill interfaces, soothing Fredoka typography, one-tap doctor calling, and cheerful milestone badges for kids' vaccinations.",
    solution:
      "A React Native mobile application for iOS and Android featuring biometric login, instant video triage, offline prescription history, and interactive medication reminders with friendly push notifications.",
    results: [
      {
        label: "App Store Satisfaction",
        value: "4.9★",
        detail: "Across 50,000+ parent reviews on iOS and Android",
      },
      {
        label: "Clinic No-Show Rate",
        value: "-64%",
        detail: "Decreased from 28% to 10% within 3 months of rollout",
      },
      {
        label: "Nurse Desk Calls",
        value: "-51%",
        detail: "Parents self-serve appointments and refills directly in-app",
      },
    ],
    keyDeliverables: [
      "Universal React Native iOS and Android application",
      "Encrypted SQLite offline-first patient record database",
      "WebRTC video consultation bridge with in-call chat",
      "App Store and Google Play publication & compliance approvals",
      "Push notification dispatch pipeline with localized reminders",
    ],
    clientQuote: {
      text: "[PLACEHOLDER] For worried parents, Kratos turned an intimidating hospital process into an encouraging, warm pocket companion. The feedback has been overwhelmingly joyful.",
      author: "[PLACEHOLDER] Dr. Elena Ramos",
      title: "Medical Director, BloomHealth Clinics",
    },
    nextSlug: "logistics-automation",
    nextTitle: "PulseFlow: Automated Freight Dispatch Engine",
  },
  {
    id: "logistics-automation",
    slug: "logistics-automation",
    title: "[PLACEHOLDER] PulseFlow: Automated Freight Dispatch Engine",
    clientName: "[PLACEHOLDER] PulseFlow Global",
    industry: "Logistics & Supply Chain",
    serviceType: "automation",
    serviceSlug: "ai-automation",
    summary: "Replaced 40 hours/week of manual spreadsheet coordination with an automated dispatch workflow powered by Python heuristics and webhook sync.",
    metricValue: "-68%",
    metricLabel: "Manual processing hours",
    tags: ["Python", "FastAPI", "Docker", "Background Workers", "Webhooks"],
    imageSrc: "/work/logistics-preview.svg",
    isPlaceholder: true,
    accentColor: "peach",
    challenge:
      "Dispatchers spent over 40 hours every week manually copying bills of lading from PDFs into legacy ERP software, cross-referencing carrier rates on third-party portals, and texting drivers individually. Human data-entry errors caused expensive misrouted shipments.",
    approach:
      "We automated the entire logistics data pipeline from ingestion to truck dispatch. 'Strong underneath': Resilient Celery task workers with Redis queues, Pydantic schema validation, and multi-carrier API connectors. 'Friendly on top': A simple, single-screen control room showing active loads in rounded cards with clear status pills.",
    solution:
      "An automated dispatch backend with FastAPI and a modern dispatcher dashboard. Incoming PDF bills of lading are parsed instantly with 99.8% accuracy, optimal carriers are matched automatically by price and proximity, and confirmation texts dispatch to drivers automatically.",
    results: [
      {
        label: "Manual Processing Time",
        value: "-68%",
        detail: "Cut down from 40 hours to under 12 hours per dispatcher weekly",
      },
      {
        label: "Data Entry Accuracy",
        value: "99.8%",
        detail: "Near-zero misrouted loads across 15,000 monthly shipments",
      },
      {
        label: "Carrier Booking Time",
        value: "45 sec",
        detail: "From PDF receipt to carrier confirmation, down from 35 minutes",
      },
    ],
    keyDeliverables: [
      "FastAPI background pipeline with Celery and Redis workers",
      "Document ingestion microservice extracting structured JSON from PDFs",
      "Carrier rate comparison algorithm with live bidding webhooks",
      "Dispatcher management dashboard with real-time status pills",
      "Automated SMS & email dispatch notifications to freight drivers",
    ],
    clientQuote: {
      text: "[PLACEHOLDER] PulseFlow runs faster, cleaner, and with zero chaos now. Kratos replaced hundreds of frantic spreadsheet rows with a system that just works.",
      author: "[PLACEHOLDER] Tariq Mansoor",
      title: "VP of Logistics, PulseFlow Global",
    },
    nextSlug: "fintech-portal",
    nextTitle: "NovaLedger: Real-Time Institutional Settlement Portal",
  },
];
