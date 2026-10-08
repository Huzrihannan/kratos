"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Send, AlertCircle, MessageCircle } from "lucide-react";
import { contactFormSchema, ContactFormInput } from "@/lib/schema";
import { Squish } from "@/components/fx/Squish";
import { BlobConfetti } from "@/components/fx/BlobConfetti";
import { siteConfig } from "@/content/site";

export function ContactForm() {
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
        setServerError("An unexpected error occurred. Please try contacting us on WhatsApp or email.");
      }
    }
  };

  return (
    <div className="w-full rounded-[32px] bg-peach/40 border-2 border-peach/80 p-6 sm:p-8 md:p-10 shadow-sm">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative flex flex-col items-center text-center py-8 sm:py-12 overflow-visible"
          >
            <BlobConfetti count={32} />
            <div className="w-16 h-16 rounded-full bg-orange flex items-center justify-center text-ink mb-6 shadow-md">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-3">
              Message received!
            </h3>
            <p className="text-ink-soft text-base sm:text-lg max-w-md mb-8 leading-relaxed">
              Thank you for reaching out. A senior engineer will review your project and email you back within <strong>4 hours</strong> on business days.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-sm shadow-sm hover:opacity-95 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                Chat right now on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="px-6 py-3.5 rounded-full bg-cream text-ink text-sm font-semibold hover:bg-peach transition-colors border border-peach"
              >
                Send another note
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            {/* Honeypot field for bot suppression */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Leave this field blank</label>
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </div>

            {serverError && (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-orange/20 border border-orange text-ink text-sm">
                <AlertCircle className="w-5 h-5 text-orange-deep shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">
                  Your Name <span className="text-orange-deep">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="e.g. Maya Lin"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  {...register("name")}
                  className={`w-full px-5 py-3.5 rounded-full bg-cream/90 text-ink placeholder:text-ink-soft/40 border-2 transition-all outline-none text-sm sm:text-base ${
                    errors.name
                      ? "border-orange-deep focus-visible:ring-4 focus-visible:ring-orange-deep/30 focus-visible:shadow-[0_0_20px_rgba(244,123,58,0.35)]"
                      : "border-peach/70 hover:border-orange/50 focus-visible:border-orange-deep focus-visible:ring-4 focus-visible:ring-orange/30 focus-visible:shadow-[0_0_24px_rgba(251,154,94,0.3)]"
                  }`}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-xs text-orange-deep font-medium">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">
                  Work Email <span className="text-orange-deep">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="name@company.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email")}
                  className={`w-full px-5 py-3.5 rounded-full bg-cream/90 text-ink placeholder:text-ink-soft/40 border-2 transition-all outline-none text-sm sm:text-base ${
                    errors.email
                      ? "border-orange-deep focus-visible:ring-4 focus-visible:ring-orange-deep/30 focus-visible:shadow-[0_0_20px_rgba(244,123,58,0.35)]"
                      : "border-peach/70 hover:border-orange/50 focus-visible:border-orange-deep focus-visible:ring-4 focus-visible:ring-orange/30 focus-visible:shadow-[0_0_24px_rgba(251,154,94,0.3)]"
                  }`}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs text-orange-deep font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Phone / WhatsApp */}
              <div>
                <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">
                  Phone / WhatsApp <span className="text-ink-soft/50 font-normal lowercase">(optional)</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  {...register("phone")}
                  className="w-full px-5 py-3.5 rounded-full bg-cream/90 text-ink placeholder:text-ink-soft/40 border-2 border-peach/70 hover:border-orange/50 focus-visible:border-orange-deep focus-visible:ring-4 focus-visible:ring-orange/30 focus-visible:shadow-[0_0_24px_rgba(251,154,94,0.3)] transition-all outline-none text-sm sm:text-base"
                />
              </div>

              {/* Project Type */}
              <div>
                <label htmlFor="contact-project-type" className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">
                  Project Type
                </label>
                <select
                  id="contact-project-type"
                  {...register("projectType")}
                  className="w-full px-5 py-3.5 rounded-full bg-cream/90 text-ink border-2 border-peach/70 hover:border-orange/50 focus-visible:border-orange-deep focus-visible:ring-4 focus-visible:ring-orange/30 focus-visible:shadow-[0_0_24px_rgba(251,154,94,0.3)] transition-all outline-none text-sm sm:text-base cursor-pointer"
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

            {/* Budget */}
            <div>
              <label htmlFor="contact-budget" className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">
                Estimated Investment Budget
              </label>
              <select
                id="contact-budget"
                {...register("budget")}
                className="w-full px-5 py-3.5 rounded-full bg-cream/90 text-ink border-2 border-peach/70 hover:border-orange/50 focus-visible:border-orange-deep focus-visible:ring-4 focus-visible:ring-orange/30 focus-visible:shadow-[0_0_24px_rgba(251,154,94,0.3)] transition-all outline-none text-sm sm:text-base cursor-pointer"
              >
                <option value="Under $15,000">Under $15,000</option>
                <option value="$15,000 – $30,000">$15,000 – $30,000 (Typical starting sprint)</option>
                <option value="$30,000 – $60,000">$30,000 – $60,000 (Full platform build)</option>
                <option value="$60,000+">$60,000+ (Enterprise scope)</option>
                <option value="Not sure yet / Need guidance">Not sure yet / Need guidance</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">
                Project Summary & Goals <span className="text-orange-deep">*</span>
              </label>
              <textarea
                id="contact-message"
                rows={4}
                placeholder="What are you hoping to build or solve? Tell us about your goals, current bottlenecks, or target timeline..."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                {...register("message")}
                className={`w-full px-5 py-4 rounded-[24px] bg-cream/90 text-ink placeholder:text-ink-soft/40 border-2 transition-all outline-none text-sm sm:text-base resize-none ${
                  errors.message
                    ? "border-orange-deep focus-visible:ring-4 focus-visible:ring-orange-deep/30 focus-visible:shadow-[0_0_20px_rgba(244,123,58,0.35)]"
                    : "border-peach/70 hover:border-orange/50 focus-visible:border-orange-deep focus-visible:ring-4 focus-visible:ring-orange/30 focus-visible:shadow-[0_0_24px_rgba(251,154,94,0.3)]"
                }`}
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 text-xs text-orange-deep font-medium">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-3 pt-1">
              <input
                id="contact-consent"
                type="checkbox"
                aria-invalid={Boolean(errors.consent)}
                {...register("consent")}
                className="mt-1 w-5 h-5 rounded-md border-2 border-peach accent-orange cursor-pointer focus-visible:ring-2 focus-visible:ring-orange-deep"
              />
              <label htmlFor="contact-consent" className="text-xs text-ink-soft leading-normal cursor-pointer select-none">
                I agree to let Krat.OS Software Solutions contact me by email or phone regarding this project inquiry. Zero spam, ever.
              </label>
            </div>
            {errors.consent && (
              <p className="text-xs text-orange-deep font-medium">
                {errors.consent.message}
              </p>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <Squish>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-orange hover:bg-orange-deep text-ink font-bold text-base shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-orange-deep"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 rounded-full border-2 border-ink/30 border-t-ink animate-spin" />
                      <span>Sending note...</span>
                    </>
                  ) : (
                    <>
                      <span>Start Conversation</span>
                      <Send className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </Squish>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
