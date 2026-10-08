"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  FileCode2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  estimatorConfig,
  calculateBallpark,
  BallparkCalculation,
} from "@/content/estimator-config";
import { EstimatorProgress } from "@/components/estimator/EstimatorProgress";
import { ResultScreen } from "@/components/estimator/ResultScreen";
import { ConfigJsonWindow } from "@/components/estimator/ConfigJsonWindow";
import { KeyOption } from "@/components/estimator/KeyOption";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Decode } from "@/components/fx/Decode";
import { trackEvent } from "@/lib/analytics";
import { getAttribution } from "@/lib/utm";
import { cn } from "@/lib/utils";

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

const STORAGE_KEY = "krat_os_estimator_session";

interface EstimatorWizardProps {
  onClose?: () => void;
  isModal?: boolean;
}

export function EstimatorWizard({ onClose, isModal = false }: EstimatorWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [state, setState] = useState<EstimatorState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<BallparkCalculation | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [isMobileJsonOpen, setIsMobileJsonOpen] = useState(false);

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
    "Project Architecture",
    "Scope & Capabilities",
    "Delivery Pacing",
    "Target Investment",
    "Technical Notes",
    "Owner Specification",
  ];

  const stepHeadlines = [
    "What are we building?",
    "What scope do you need?",
    "How soon do you need it?",
    "What is your target budget?",
    "Tell us a bit about it",
    "Where do we send your estimate?",
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe":
        return <Globe className="w-4 h-4" />;
      case "Layers":
        return <Layers className="w-4 h-4" />;
      case "Smartphone":
        return <Smartphone className="w-4 h-4" />;
      case "ShoppingBag":
        return <ShoppingBag className="w-4 h-4" />;
      case "Cpu":
        return <Cpu className="w-4 h-4" />;
      case "Palette":
        return <Palette className="w-4 h-4" />;
      case "Code2":
        return <Code2 className="w-4 h-4" />;
      case "Workflow":
        return <Workflow className="w-4 h-4" />;
      case "Cloud":
        return <Cloud className="w-4 h-4" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-4 h-4" />;
      case "FileText":
        return <FileText className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const currentNeeds =
    estimatorConfig.needsByProjectType[state.projectType] ||
    estimatorConfig.defaultNeeds;

  const handleNext = useCallback(() => {
    setErrorMsg(null);
    if (currentStep < 6) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      trackEvent(
        `estimator_step_${nextStep}` as
          | "estimator_step_1"
          | "estimator_step_2"
          | "estimator_step_3"
          | "estimator_step_4"
          | "estimator_step_5"
          | "estimator_step_6"
      );
    }
  }, [currentStep]);

  const handleBack = useCallback(() => {
    setErrorMsg(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

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
      needs: ["dev"],
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

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      setErrorMsg(null);

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
        const msg =
          err instanceof Error
            ? err.message
            : "Failed to submit. Please check your connection or contact us on WhatsApp.";
        setErrorMsg(msg);
      } finally {
        setIsSubmitting(false);
      }
    },
    [state, honeypot]
  );

  // Keyboard Navigation Handler (1-6 keys, Enter, ArrowLeft, Escape)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      const isInputActive = activeTag === "input" || activeTag === "textarea";

      // Allow Esc to close even if in input
      if (e.key === "Escape") {
        if (onClose) {
          e.preventDefault();
          onClose();
        }
        return;
      }

      // If user is typing in an input field, do not trigger numeric shortcuts or arrow navigation
      if (isInputActive) {
        if (e.key === "Enter" && currentStep === 6) {
          e.preventDefault();
          handleSubmit();
        }
        return;
      }

      if (e.key === "ArrowLeft") {
        if (currentStep > 1) {
          e.preventDefault();
          handleBack();
        }
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (currentStep < 6) {
          handleNext();
        } else {
          handleSubmit();
        }
        return;
      }

      // Number keys 1-6
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1) {
        const optionIndex = num - 1;

        if (currentStep === 1) {
          const item = estimatorConfig.projectTypes[optionIndex];
          if (item) {
            e.preventDefault();
            handleProjectTypeSelect(item.id);
          }
        } else if (currentStep === 2) {
          const item = currentNeeds[optionIndex];
          if (item) {
            e.preventDefault();
            handleNeedToggle(item.id);
          }
        } else if (currentStep === 3) {
          const item = estimatorConfig.timelines[optionIndex];
          if (item) {
            e.preventDefault();
            setState((prev) => ({ ...prev, timeline: item.id }));
          }
        } else if (currentStep === 4) {
          const item = estimatorConfig.budgetBands[optionIndex];
          if (item) {
            e.preventDefault();
            setState((prev) => ({ ...prev, budget: item.id }));
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, currentNeeds, handleBack, handleNext, handleSubmit, onClose]);

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
      className={cn(
        "w-full max-w-6xl mx-auto flex flex-col justify-between select-none",
        isModal ? "p-3 sm:p-6" : "p-4 sm:p-8"
      )}
    >
      {/* Top Progress Track with Back & Close buttons */}
      <EstimatorProgress
        currentStep={currentStep}
        totalSteps={6}
        onBack={handleBack}
        onClose={onClose}
        stepTitle={stepTitles[currentStep - 1]}
        className="mb-6 sm:mb-8"
      />

      {/* Error Banner */}
      {errorMsg && (
        <div
          role="alert"
          className="mb-6 p-3 sm:p-4 rounded-[2px] bg-red/10 border border-red text-red-text flex items-center gap-3 text-xs sm:text-sm font-mono font-medium"
        >
          <AlertCircle className="w-4 h-4 text-red shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Two-Column Configurator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Question & KeyOptions (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between min-h-[460px]">
          <div>
            {/* Step Question Header */}
            <div className="mb-6">
              <span className="font-mono text-xs text-red-text uppercase tracking-widest font-bold block mb-1">
                STEP 0{currentStep}{" // "}{stepTitles[currentStep - 1]}
              </span>
              <h2 className="font-mono text-2xl sm:text-3xl font-extrabold text-fg tracking-tight leading-tight">
                <Decode
                  key={`headline-${currentStep}`}
                  text={stepHeadlines[currentStep - 1]}
                  speed={25}
                />
              </h2>
              <p className="font-sans text-xs sm:text-sm text-fg-muted mt-2">
                {currentStep === 1 && "Pick the software architecture that best matches your target application."}
                {currentStep === 2 && "Select all capabilities that apply. Options adapt to your application type."}
                {currentStep === 3 && "Delivery pacing directly affects sprint allocation and engineer availability."}
                {currentStep === 4 && "Helps us recommend appropriate technical architecture and release phasing."}
                {currentStep === 5 && "Optional notes or specification links to clarify your data models or workflows."}
                {currentStep === 6 && "Get your instant ballpark range and full milestone breakdown via email."}
              </p>
            </div>

            {/* Step 1: Project Type */}
            {currentStep === 1 && (
              <div
                role="radiogroup"
                aria-label="Select Architecture Type"
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {estimatorConfig.projectTypes.map((pt, idx) => (
                  <KeyOption
                    key={pt.id}
                    keyIndex={idx + 1}
                    title={pt.label}
                    description={pt.description}
                    icon={getIcon(pt.iconName)}
                    selected={state.projectType === pt.id}
                    onClick={() => handleProjectTypeSelect(pt.id)}
                  />
                ))}
              </div>
            )}

            {/* Step 2: Needs / Capabilities */}
            {currentStep === 2 && (
              <div
                role="group"
                aria-label="Select Capabilities"
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {currentNeeds.map((need, idx) => (
                  <KeyOption
                    key={need.id}
                    keyIndex={idx + 1}
                    title={need.label}
                    description={need.description}
                    icon={getIcon(need.iconName)}
                    selected={state.needs.includes(need.id)}
                    type="checkbox"
                    onClick={() => handleNeedToggle(need.id)}
                  />
                ))}
              </div>
            )}

            {/* Step 3: Timeline */}
            {currentStep === 3 && (
              <div
                role="radiogroup"
                aria-label="Select Delivery Pacing"
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {estimatorConfig.timelines.map((tl, idx) => (
                  <KeyOption
                    key={tl.id}
                    keyIndex={idx + 1}
                    title={tl.label}
                    description={tl.description}
                    selected={state.timeline === tl.id}
                    onClick={() => setState((prev) => ({ ...prev, timeline: tl.id }))}
                  />
                ))}
              </div>
            )}

            {/* Step 4: Budget Range */}
            {currentStep === 4 && (
              <div
                role="radiogroup"
                aria-label="Select Target Investment"
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {estimatorConfig.budgetBands.map((b, idx) => (
                  <KeyOption
                    key={b.id}
                    keyIndex={idx + 1}
                    title={b.label}
                    description={b.isCustom ? "Phased scope rollout" : "Planned budget pool"}
                    selected={state.budget === b.id}
                    onClick={() => setState((prev) => ({ ...prev, budget: b.id }))}
                  />
                ))}
              </div>
            )}

            {/* Step 5: Details / Notes */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <Textarea
                  label="System notes or problem description (optional)"
                  placeholder="What core business process does this software automate?"
                  value={state.message}
                  onChange={(e) => setState((prev) => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="font-mono text-xs"
                />

                <Input
                  label="Figma or technical spec link (optional)"
                  placeholder="https://figma.com/... or https://github.com/..."
                  value={state.link}
                  onChange={(e) => setState((prev) => ({ ...prev, link: e.target.value }))}
                  className="font-mono text-xs"
                />
              </div>
            )}

            {/* Step 6: Contact Info */}
            {currentStep === 6 && (
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
                    className="mt-1 w-4 h-4 rounded-[2px] border-line-strong bg-surface text-red accent-red focus:ring-red-text"
                    required
                  />
                  <span className="text-xs text-fg-muted leading-relaxed font-sans">
                    I agree to receive my ballpark estimate and project communication from Krat.OS Software Solutions. (No spam, ever).
                  </span>
                </label>
              </form>
            )}
          </div>

          {/* Navigation Controls Bar */}
          <div className="pt-8 mt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            {/* Keyboard Shortcuts Hint */}
            <div className="text-fg-muted/70 text-[11px] hidden sm:flex items-center gap-3">
              <span>[1-6] SELECT</span>
              <span>•</span>
              <span>[ENTER] CONTINUE</span>
              <span>•</span>
              <span>[←] BACK</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {currentStep > 1 && (
                <Button
                  variant="ghost"
                  size="md"
                  onClick={handleBack}
                  className="font-mono text-xs uppercase border-line hover:border-line-strong"
                >
                  Back
                </Button>
              )}

              {currentStep < 6 ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNext}
                  withArrow
                  className="font-mono text-xs uppercase w-full sm:w-auto"
                >
                  Continue [Enter]
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={() => handleSubmit()}
                  disabled={isSubmitting || !state.name || !state.email}
                  isLoading={isSubmitting}
                  withArrow
                  className="font-mono text-xs uppercase w-full sm:w-auto"
                >
                  {isSubmitting ? "Compiling spec..." : "Compile Ballpark Spec [Enter]"}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live "krat.config.json" Output Window (5 cols on desktop) */}
        <div className="hidden lg:block lg:col-span-5 h-full">
          <ConfigJsonWindow currentStep={currentStep} totalSteps={6} state={state} />
        </div>
      </div>

      {/* MOBILE: Collapsible krat.config.json Bottom Drawer */}
      <div className="lg:hidden mt-6 pt-4 border-t border-line">
        <button
          type="button"
          onClick={() => setIsMobileJsonOpen((prev) => !prev)}
          className="w-full flex items-center justify-between p-3 bg-surface border border-line rounded-[2px] font-mono text-xs text-fg"
        >
          <div className="flex items-center gap-2">
            <FileCode2 className="w-4 h-4 text-red-text" />
            <span>krat.config.json ({state.projectType})</span>
          </div>
          <div className="flex items-center gap-1.5 text-fg-muted text-[11px]">
            <span>{isMobileJsonOpen ? "HIDE SPEC" : "VIEW SPEC"}</span>
            {isMobileJsonOpen ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </div>
        </button>

        {isMobileJsonOpen && (
          <div className="mt-2">
            <ConfigJsonWindow currentStep={currentStep} totalSteps={6} state={state} />
          </div>
        )}
      </div>
    </div>
  );
}
