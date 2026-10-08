"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, AlertCircle, MessageCircle } from "lucide-react";
import { contactFormSchema, ContactFormInput } from "@/lib/schema";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function ContactForm({ className }: { className?: string }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      source: "contact",
      name: "",
      email: "",
      phone: "",
      projectType: "Web App / SaaS",
      budget: "$15,000 – $30,000",
      message: "",
      consent: true,
      website: "",
    },
  });

  const onSubmit = async (data: ContactFormInput) => {
    setServerError(null);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "contact",
          pageUrl: typeof window !== "undefined" ? window.location.href : "/contact",
          referrer: typeof document !== "undefined" ? document.referrer : "",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message. Please try again.");
      }

      setIsSuccess(true);
      reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("An unexpected error occurred. Please contact us via WhatsApp or email.");
      }
    }
  };

  if (isSuccess) {
    return (
      <div className={cn("p-6 sm:p-8 rounded-[2px] border border-line bg-surface/95 font-mono text-xs", className)}>
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-line text-[11px]">
          <div className="flex items-center gap-2 text-ok">
            <span className="w-2 h-2 rounded-full bg-ok" />
            <span className="font-bold">HTTP/1.1 200 OK // INTAKE_RECORDED</span>
          </div>
          <span className="text-[10px] text-fg-muted">STATUS: DELIVERED</span>
        </div>

        <div className="space-y-4 mb-8">
          <div className="p-4 rounded-[2px] bg-bg border border-line space-y-2">
            <div className="flex items-center gap-2 text-ok font-bold">
              <span>[✓]</span>
              <span>INQUIRY_DISPATCH_SUCCESSFUL</span>
            </div>
            <p className="text-fg-muted leading-relaxed font-sans text-xs">
              Thank you for reaching out. A senior engineer will review your project requirements and email you an actionable response within <strong className="text-fg">4 business hours</strong>.
            </p>
          </div>

          <div className="text-[11px] text-fg-muted space-y-1">
            <div>&gt; target: engineering_dispatch_queue</div>
            <div>&gt; sla_countdown: ACTIVE (4h window)</div>
            <div>&gt; confidentiality: NDA protected</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-line">
          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[2px] bg-fg text-bg font-bold uppercase tracking-wider text-xs hover:bg-fg/90 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-red" />
            <span>Chat right now on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-[2px] border border-line hover:border-line-strong text-fg uppercase text-xs transition-colors"
          >
            Send another inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn("p-6 sm:p-8 rounded-[2px] border border-line bg-surface/95 font-mono text-xs space-y-5", className)}
    >
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-line text-[11px] text-fg-muted">
        <span>contact_dispatcher.sh</span>
        <span className="text-ok flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-ok" />
          <span>PORT: 443_SSL</span>
        </span>
      </div>

      {/* Honeypot field for bot suppression */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave blank</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {serverError && (
        <div className="flex items-center gap-2.5 p-3 rounded-[2px] bg-red/10 border border-red text-red-text text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {/* 2-Column: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label htmlFor="contact-name" className="block text-[11px] uppercase tracking-mono text-fg-muted mb-1.5">
            YOUR NAME <span className="text-red-text">*</span>
          </label>
          <div className="relative border border-line focus-within:border-line-strong focus-within:border-l-2 focus-within:border-l-red bg-bg rounded-[2px] transition-colors">
            <input
              id="contact-name"
              type="text"
              placeholder="Maya Lin"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name")}
              className="w-full px-3 py-2.5 bg-transparent text-fg placeholder:text-fg-muted/40 outline-none text-xs"
            />
          </div>
          {errors.name && (
            <p id="name-error" className="mt-1 text-[10px] text-red-text">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Work Email */}
        <div>
          <label htmlFor="contact-email" className="block text-[11px] uppercase tracking-mono text-fg-muted mb-1.5">
            WORK EMAIL <span className="text-red-text">*</span>
          </label>
          <div className="relative border border-line focus-within:border-line-strong focus-within:border-l-2 focus-within:border-l-red bg-bg rounded-[2px] transition-colors">
            <input
              id="contact-email"
              type="email"
              placeholder="name@company.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
              className="w-full px-3 py-2.5 bg-transparent text-fg placeholder:text-fg-muted/40 outline-none text-xs"
            />
          </div>
          {errors.email && (
            <p id="email-error" className="mt-1 text-[10px] text-red-text">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* 2-Column: Phone & Project Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone */}
        <div>
          <label htmlFor="contact-phone" className="block text-[11px] uppercase tracking-mono text-fg-muted mb-1.5">
            PHONE / WHATSAPP <span className="text-[10px] text-fg-muted/60">(OPTIONAL)</span>
          </label>
          <div className="relative border border-line focus-within:border-line-strong focus-within:border-l-2 focus-within:border-l-red bg-bg rounded-[2px] transition-colors">
            <input
              id="contact-phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              {...register("phone")}
              className="w-full px-3 py-2.5 bg-transparent text-fg placeholder:text-fg-muted/40 outline-none text-xs"
            />
          </div>
        </div>

        {/* Project Type */}
        <div>
          <label htmlFor="contact-project-type" className="block text-[11px] uppercase tracking-mono text-fg-muted mb-1.5">
            PROJECT CATEGORY
          </label>
          <div className="relative border border-line focus-within:border-line-strong focus-within:border-l-2 focus-within:border-l-red bg-bg rounded-[2px] transition-colors">
            <select
              id="contact-project-type"
              {...register("projectType")}
              className="w-full px-3 py-2.5 bg-bg text-fg outline-none text-xs cursor-pointer"
            >
              <option value="Web App / SaaS">Web App / SaaS</option>
              <option value="Mobile App">Mobile App (iOS & Android)</option>
              <option value="Modern E-Commerce">Modern E-Commerce</option>
              <option value="AI Workflows & Automation">AI Workflows & Automation</option>
              <option value="UI/UX & Product Design">UI/UX & Product Design</option>
              <option value="System Maintenance">System Maintenance</option>
              <option value="Other Project">Other / Not Sure Yet</option>
            </select>
          </div>
        </div>
      </div>

      {/* Budget */}
      <div>
        <label htmlFor="contact-budget" className="block text-[11px] uppercase tracking-mono text-fg-muted mb-1.5">
          ESTIMATED BUDGET BAND
        </label>
        <div className="relative border border-line focus-within:border-line-strong focus-within:border-l-2 focus-within:border-l-red bg-bg rounded-[2px] transition-colors">
          <select
            id="contact-budget"
            {...register("budget")}
            className="w-full px-3 py-2.5 bg-bg text-fg outline-none text-xs cursor-pointer"
          >
            <option value="Under $15,000">Under $15,000</option>
            <option value="$15,000 – $30,000">$15,000 – $30,000 (Typical starting sprint)</option>
            <option value="$30,000 – $60,000">$30,000 – $60,000 (Full platform build)</option>
            <option value="$60,000+">$60,000+ (Enterprise scope)</option>
            <option value="Not sure yet / Need guidance">Not sure yet / Need guidance</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-[11px] uppercase tracking-mono text-fg-muted mb-1.5">
          PROJECT SCOPE & OBJECTIVES <span className="text-red-text">*</span>
        </label>
        <div className="relative border border-line focus-within:border-line-strong focus-within:border-l-2 focus-within:border-l-red bg-bg rounded-[2px] transition-colors">
          <textarea
            id="contact-message"
            rows={4}
            placeholder="What are you building or modernizing? Detail your target goals, timeline, or architecture constraints..."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            {...register("message")}
            className="w-full px-3 py-2.5 bg-transparent text-fg placeholder:text-fg-muted/40 outline-none text-xs resize-none"
          />
        </div>
        {errors.message && (
          <p id="message-error" className="mt-1 text-[10px] text-red-text">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Consent Checkbox */}
      <div className="flex items-start gap-2.5 pt-1">
        <input
          id="contact-consent"
          type="checkbox"
          aria-invalid={Boolean(errors.consent)}
          {...register("consent")}
          className="mt-0.5 w-4 h-4 rounded-[2px] border border-line bg-bg accent-red text-red cursor-pointer"
        />
        <label htmlFor="contact-consent" className="text-[11px] text-fg-muted leading-relaxed cursor-pointer font-sans select-none">
          I agree to receive direct engineering communication from Krat.OS regarding this project. No marketing lists or sales harassment, ever.
        </label>
      </div>
      {errors.consent && (
        <p className="text-[10px] text-red-text">
          {errors.consent.message}
        </p>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[2px] bg-fg text-bg hover:bg-fg/90 font-bold uppercase tracking-wider text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <div className="w-3.5 h-3.5 rounded-full border-2 border-bg border-t-red animate-spin" />
              <span>Transmitting intake packet...</span>
            </>
          ) : (
            <>
              <span>Dispatch Project Inquiry</span>
              <Send className="w-3.5 h-3.5 text-red" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
