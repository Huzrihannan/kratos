import { z } from "zod";

export const leadSchema = z.object({
  source: z.enum(["estimator", "contact"]).default("estimator"),
  name: z
    .string()
    .min(2, { message: "Please share your name (at least 2 letters)." })
    .max(100),
  email: z
    .string()
    .email({ message: "Please enter a valid email address so we can reach you." })
    .max(150),
  phone: z.string().max(40).optional().default(""),
  projectType: z.string().optional().default("General Inquiry"),
  needs: z.array(z.string()).optional().default(["Consultation"]),
  timeline: z.string().optional().default("Flexible"),
  budget: z.string().optional().default("Not specified"),
  message: z.string().max(2000).optional().default(""),
  link: z.string().max(500).optional().default(""),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please agree to receive our response." }),
  }),
  estimateMin: z.number().nonnegative().optional(),
  estimateMax: z.number().nonnegative().optional(),

  // Attribution & Context
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  pageUrl: z.string().max(500).optional(),
  referrer: z.string().max(500).optional(),

  // Anti-Spam protection
  website: z.string().max(100).optional(), // Honeypot field (must be empty!)
  turnstileToken: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const contactFormSchema = z.object({
  source: z.literal("contact").default("contact"),
  name: z.string().min(2, { message: "Please enter your name." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().optional().default(""),
  projectType: z.string().optional().default("General Inquiry"),
  budget: z.string().optional().default("Not specified"),
  message: z.string().min(10, { message: "Please tell us a little bit about your project (at least 10 characters)." }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please agree to receive our response." }),
  }),
  website: z.string().max(100).optional(), // Honeypot
  turnstileToken: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  pageUrl: z.string().optional(),
  referrer: z.string().optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
