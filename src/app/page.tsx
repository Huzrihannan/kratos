import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";

const Services = dynamic(() => import("@/components/sections/Services").then((m) => m.Services));
const Process = dynamic(() => import("@/components/sections/Process").then((m) => m.Process));
const Work = dynamic(() => import("@/components/sections/Work").then((m) => m.Work));
const Proof = dynamic(() => import("@/components/sections/Proof").then((m) => m.Proof));
const StackMarquee = dynamic(() => import("@/components/sections/StackMarquee").then((m) => m.StackMarquee));
const Principles = dynamic(() => import("@/components/sections/Principles").then((m) => m.Principles));
const Faq = dynamic(() => import("@/components/sections/Faq").then((m) => m.Faq));
const FinalCta = dynamic(() => import("@/components/sections/FinalCta").then((m) => m.FinalCta));

export default function Home() {
  return (
    <div className="w-full overflow-hidden">
      {/* 1. Signature Hero Moment (5-second OS hook) */}
      <Hero />

      {/* 2. Modules /01: What we build (6 interactive OS windows with SVG motion scenes) */}
      <Services />

      {/* 3. Pipeline /02: How we work (Scroll-driven CI/CD engineering track) */}
      <Process />

      {/* 4. Selected Work /03: Things we're proud of (Case studies with metrics HUD) */}
      <Work />

      {/* 5. Signal & Proof /04: Verified reliability (Cream rhythm break band) */}
      <Proof />

      {/* 6. Stack /05: Tools we trust (Dual velocity-reactive ribbons with hover decode) */}
      <StackMarquee />

      {/* 7. Principles /06: Why Krat.OS (Bento grid with micro-animations) */}
      <Principles />

      {/* 8. FAQ /07: Direct answers (Mechanical accordion + FAQPage JSON-LD) */}
      <Faq />

      {/* 9. Final CTA: Giant display headline with Caret & SpotlightGrid */}
      <FinalCta />
    </div>
  );
}
