"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Globe,
  Layers,
  Smartphone,
  ShoppingBag,
  Cpu,
  Sparkles,
  Palette,
  Code2,
  Workflow,
  Cloud,
  ShieldCheck,
  FileText,
  AlertCircle,
} from "lucide-react";
import {
  estimatorConfig,
  calculateBallpark,
  BallparkCalculation,
} from "@/content/estimator-config";
import { EstimatorProgress } from "@/components/estimator/EstimatorProgress";
import { ResultScreen } from "@/components/estimator/ResultScreen";
import { BubbleOption } from "@/components/ui/BubbleOption";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { trackEvent } from "@/lib/analytics";
import { getAttribution } from "@/lib/utm";

interface EstimatorState {
  projectType: string;
  needs: string[];
  timeline: string;
  budget: string;
  message: string;
  link: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
}

const INITIAL_STATE: EstimatorState = {
  projectType: "webapp",
  needs: ["dev"],
  timeline: "1_3_months",
  budget: "10k_25k",
  message: "",
  link: "",
  name: "",
  email: "",
  phone: "",
  consent: true,
};

const STORAGE_KEY = "kratos_estimator_session";

interface EstimatorWizardProps {
  onClose?: () => void;
  isModal?: boolean;
}

export function EstimatorWizard({ onClose, isModal = false }: EstimatorWizardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [currentStep, setCurrentStep] = useState(1);
  const [state, setState] = useState<EstimatorState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<BallparkCalculation | null>(null);
  const [honeypot, setHoneypot] = useState("");

  // Restore state from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // non-fatal
    }
    trackEvent("estimator_open");
  }, []);

  // Save state changes to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // non-fatal
    }
  }, [state]);

  const stepTitles = [
    "Project Type",
    "Scope & Needs",
    "Timeline",
    "Budget",
    "Details",
    "Contact",
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe":
        return <Globe className="w-5 h-5 text-orange" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-orange" />;
      case "Smartphone":
        return <Smartphone className="w-5 h-5 text-orange" />;
      case "ShoppingBag":
        return <ShoppingBag className="w-5 h-5 text-orange" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-orange" />;
      case "Palette":
        return <Palette className="w-5 h-5 text-orange" />;
      case "Code2":
        return <Code2 className="w-5 h-5 text-orange" />;
      case "Workflow":
        return <Workflow className="w-5 h-5 text-orange" />;
      case "Cloud":
        return <Cloud className="w-5 h-5 text-orange" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-orange" />;
      case "FileText":
        return <FileText className="w-5 h-5 text-orange" />;
      default:
        return <Sparkles className="w-5 h-5 text-orange" />;
    }
  };

  const currentNeeds =
    estimatorConfig.needsByProjectType[state.projectType] ||
    estimatorConfig.defaultNeeds;

  const handleNext = () => {
    setErrorMsg(null);
    if (currentStep < 6) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      trackEvent(`estimator_step_${nextStep}` as "estimator_step_1" | "estimator_step_2" | "estimator_step_3" | "estimator_step_4" | "estimator_step_5" | "estimator_step_6");
    }
  };

  const handleBack = () => {
    setErrorMsg(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // non-fatal
    }
    setState(INITIAL_STATE);
    setCurrentStep(1);
    setResult(null);
    setErrorMsg(null);
  };

  const handleProjectTypeSelect = (id: string) => {
    setState((prev) => ({
      ...prev,
      projectType: id,
      needs: ["dev"], // reset needs to sensible default
    }));
  };

  const handleNeedToggle = (needId: string) => {
    setState((prev) => {
      const exists = prev.needs.includes(needId);
      if (exists) {
        if (prev.needs.length === 1) return prev; // keep at least 1 need
        return { ...prev, needs: prev.needs.filter((id) => id !== needId) };
      }
      return { ...prev, needs: [...prev.needs, needId] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Basic frontend checks
    if (!state.name.trim() || state.name.trim().length < 2) {
      setErrorMsg("Please enter your name (at least 2 letters).");
      return;
    }
    if (!state.email.trim() || !state.email.includes("@")) {
      setErrorMsg("Please enter a valid work email address.");
      return;
    }

    setIsSubmitting(true);

    const calculation = calculateBallpark(
      state.projectType,
      state.needs,
      state.timeline
    );

    const attribution = getAttribution();

    try {
      const payload = {
        source: "estimator",
        name: state.name.trim(),
        email: state.email.trim(),
        phone: state.phone.trim() || undefined,
        projectType: state.projectType,
        needs: state.needs,
        timeline: state.timeline,
        budget: state.budget,
        message: state.message.trim() || undefined,
        link: state.link.trim() || undefined,
        consent: true,
        estimateMin: calculation.estimateMin,
        estimateMax: calculation.estimateMax,
        website: honeypot || undefined,
        utmSource: attribution.utmSource,
        utmMedium: attribution.utmMedium,
        utmCampaign: attribution.utmCampaign,
        pageUrl: attribution.pageUrl,
        referrer: attribution.referrer,
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to submit your estimate. Please try again.");
      }

      trackEvent("lead_submitted", { source: "estimator", email: state.email });
      setResult(calculation);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to submit. Please check your connection or contact us on WhatsApp.";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result) {
    const selectedProj = estimatorConfig.projectTypes.find((p) => p.id === state.projectType);
    return (
      <ResultScreen
        calculation={result}
        leadName={state.name}
        leadEmail={state.email}
        projectTypeName={selectedProj?.label || "Custom Software"}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div
      className={`w-full max-w-2xl mx-auto flex flex-col justify-between ${
        isModal ? "p-3 sm:p-6" : "p-4 sm:p-8"
      }`}
    >
      {/* Top Progress Track with Back & Close buttons */}
      <EstimatorProgress
        currentStep={currentStep}
        totalSteps={6}
        onBack={handleBack}
        onClose={onClose}
        stepTitle={stepTitles[currentStep - 1]}
      />

      {/* Error Banner */}
      {errorMsg && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-2xl bg-orange/20 border border-orange-deep text-ink flex items-center gap-3 text-sm font-medium"
        >
          <AlertCircle className="w-5 h-5 text-orange-deep shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Animated Step View Container */}
      <div className="relative min-h-[380px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {/* STEP 1: What are we building? */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="space-y-6"
            >
              <div className="text-left">
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight mb-2">
                  What are we building?
                </h2>
                <p className="font-body text-ink-soft text-sm sm:text-base">
                  Pick the product that best matches your vision.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {estimatorConfig.projectTypes.map((pt) => (
                  <BubbleOption
                    key={pt.id}
                    title={pt.label}
                    description={pt.description}
                    icon={getIcon(pt.iconName)}
                    selected={state.projectType === pt.id}
                    onClick={() => handleProjectTypeSelect(pt.id)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: What do you need? */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="space-y-6"
            >
              <div className="text-left">
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight mb-2">
                  What scope do you need?
                </h2>
                <p className="font-body text-ink-soft text-sm sm:text-base">
                  Select all that apply. Options adapt to your project type.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {currentNeeds.map((need) => (
                  <BubbleOption
                    key={need.id}
                    title={need.label}
                    description={need.description}
                    icon={getIcon(need.iconName)}
                    selected={state.needs.includes(need.id)}
                    onClick={() => handleNeedToggle(need.id)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: How soon? */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="space-y-6"
            >
              <div className="text-left">
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight mb-2">
                  How soon do you need it?
                </h2>
                <p className="font-body text-ink-soft text-sm sm:text-base">
                  Timeline directly affects sprint pacing and availability.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {estimatorConfig.timelines.map((tl) => (
                  <BubbleOption
                    key={tl.id}
                    title={tl.label}
                    description={tl.description}
                    selected={state.timeline === tl.id}
                    onClick={() => setState((prev) => ({ ...prev, timeline: tl.id }))}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4: Budget range */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="space-y-6"
            >
              <div className="text-left">
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight mb-2">
                  What is your target budget?
                </h2>
                <p className="font-body text-ink-soft text-sm sm:text-base">
                  Helps us recommend the best tech stack and feature phasing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {estimatorConfig.budgetBands.map((b) => (
                  <BubbleOption
                    key={b.id}
                    title={b.label}
                    description={b.isCustom ? "We'll suggest appropriate phases" : "Approximate budget pool"}
                    selected={state.budget === b.id}
                    onClick={() => setState((prev) => ({ ...prev, budget: b.id }))}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 5: Tell us about it */}
          {currentStep === 5 && (
            <motion.div
              key="step-5"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="space-y-5"
            >
              <div className="text-left">
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight mb-2">
                  Tell us a bit about it
                </h2>
                <p className="font-body text-ink-soft text-sm sm:text-base">
                  Optional, but helps us understand what problem you are solving.
                </p>
              </div>

              <Textarea
                label="Project notes (optional)"
                placeholder="A sentence is plenty — what problem does this solve?"
                value={state.message}
                onChange={(e) => setState((prev) => ({ ...prev, message: e.target.value }))}
                rows={4}
              />

              <Input
                label="Reference link or Figma (optional)"
                placeholder="https://..."
                value={state.link}
                onChange={(e) => setState((prev) => ({ ...prev, link: e.target.value }))}
              />
            </motion.div>
          )}

          {/* STEP 6: Where do we send your estimate? */}
          {currentStep === 6 && (
            <motion.div
              key="step-6"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="space-y-5"
            >
              <div className="text-left">
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight mb-2">
                  Where do we send your estimate?
                </h2>
                <p className="font-body text-ink-soft text-sm sm:text-base">
                  Get your instant ballpark range and full breakdown by email.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Hidden Honeypot Trap */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  aria-hidden="true"
                />

                <Input
                  label="Your Name *"
                  placeholder="Alex Mercer"
                  required
                  value={state.name}
                  onChange={(e) => setState((prev) => ({ ...prev, name: e.target.value }))}
                />

                <Input
                  label="Work Email *"
                  type="email"
                  placeholder="alex@company.com"
                  required
                  value={state.email}
                  onChange={(e) => setState((prev) => ({ ...prev, email: e.target.value }))}
                />

                <Input
                  label="WhatsApp or Phone (optional)"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={state.phone}
                  onChange={(e) => setState((prev) => ({ ...prev, phone: e.target.value }))}
                />

                <label className="flex items-start gap-3 cursor-pointer pt-2 text-left">
                  <input
                    type="checkbox"
                    checked={state.consent}
                    onChange={(e) => setState((prev) => ({ ...prev, consent: e.target.checked }))}
                    className="mt-1 w-4 h-4 rounded text-orange focus:ring-orange-deep accent-orange"
                    required
                  />
                  <span className="text-xs text-ink-soft leading-relaxed font-body">
                    I agree to receive my ballpark estimate and project communication from Kratos Software Solutions. (No spam, ever).
                  </span>
                </label>

                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting || !state.name || !state.email}
                    isLoading={isSubmitting}
                    className="w-full justify-center min-h-[52px] text-base"
                    withArrow
                  >
                    {isSubmitting ? "Calculating your estimate..." : "Calculate My Ballpark Estimate"}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step Navigation Button (Steps 1 to 5) */}
        {currentStep < 6 && (
          <div className="pt-8 flex justify-end">
            <Button
              variant="primary"
              size="lg"
              onClick={handleNext}
              withArrow
              className="min-w-[140px]"
            >
              Next Step
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
