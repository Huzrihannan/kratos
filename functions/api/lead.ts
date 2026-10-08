import { leadSchema, LeadInput } from "../../src/lib/schema";

interface Env {
  TURNSTILE_SECRET_KEY?: string;
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  RESEND_API_KEY?: string;
  LEAD_NOTIFY_EMAIL?: string;
  NEXT_PUBLIC_BOOKING_URL?: string;
}

// In-memory rate limiting map per edge worker instance
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + 10 * 60 * 1000 });
    return true;
  }

  if (entry.count >= 10) {
    return false;
  }

  entry.count += 1;
  return true;
}

async function verifyTurnstile(token: string | undefined, ip: string, secretKey?: string): Promise<boolean> {
  if (!secretKey || secretKey.startsWith("0x4AAAAAAyour")) {
    return true;
  }
  if (!token) return false;

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    formData.append("remoteip", ip);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });
    const outcome = (await res.json()) as { success?: boolean };
    return Boolean(outcome.success);
  } catch (err) {
    console.error("[Turnstile error]", err);
    return false;
  }
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const { request, env } = context;

    const ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return Response.json(
        { error: "Too many submissions from this connection. Please wait a few minutes before trying again." },
        { status: 429, headers: { "Retry-After": "600" } }
      );
    }

    let rawBody: Record<string, unknown>;
    try {
      rawBody = (await request.json()) as Record<string, unknown>;
    } catch {
      return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    // Silent honeypot check
    if (rawBody.website && typeof rawBody.website === "string" && rawBody.website.trim().length > 0) {
      console.warn("[Spam Trap] Honeypot triggered by IP:", ip);
      return Response.json({ success: true, message: "Thank you for your message." });
    }

    // Turnstile check
    const isHuman = await verifyTurnstile(rawBody.turnstileToken as string | undefined, ip, env.TURNSTILE_SECRET_KEY);
    if (!isHuman) {
      return Response.json({ error: "Security check failed. Please refresh and try again." }, { status: 400 });
    }

    // Zod validation
    const parseResult = leadSchema.safeParse(rawBody);
    if (!parseResult.success) {
      const firstError = parseResult.error.errors[0]?.message || "Invalid submission details.";
      return Response.json(
        { error: firstError, fieldErrors: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const lead: LeadInput = parseResult.data;

    // Optional Supabase persist
    if (env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY && !env.SUPABASE_URL.includes("your-project")) {
      try {
        await fetch(`${env.SUPABASE_URL}/rest/v1/leads`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: env.SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
          },
          body: JSON.stringify({
            source: lead.source,
            name: lead.name,
            email: lead.email,
            phone: lead.phone || null,
            project_type: lead.projectType,
            needs: lead.needs,
            timeline: lead.timeline,
            budget: lead.budget,
            message: lead.message || null,
            link: lead.link || null,
            estimate_min: lead.estimateMin || null,
            estimate_max: lead.estimateMax || null,
            ip_address: ip,
            user_agent: request.headers.get("user-agent") || "unknown",
          }),
        });
      } catch (err) {
        console.error("[Supabase error]", err);
      }
    }

    // Optional Resend email
    if (env.RESEND_API_KEY && !env.RESEND_API_KEY.startsWith("re_your_api")) {
      try {
        const notifyEmail = env.LEAD_NOTIFY_EMAIL || "hello@krat-os.dev";
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Krat.OS Website <notifications@krat-os.dev>",
            to: [notifyEmail],
            reply_to: lead.email,
            subject: `[INTAKE_ALERT] New Lead: ${lead.name} (${lead.projectType})`,
            text: `New lead from ${lead.name} (${lead.email}):\nProject: ${lead.projectType}\nBudget: ${lead.budget}\nMessage: ${lead.message}`,
          }),
        });
      } catch (err) {
        console.error("[Resend error]", err);
      }
    }

    return Response.json({
      success: true,
      message: "Lead recorded successfully. Ballpark estimate generated.",
      data: {
        name: lead.name,
        email: lead.email,
        projectType: lead.projectType,
        estimateMin: lead.estimateMin,
        estimateMax: lead.estimateMax,
      },
    });
  } catch (err: unknown) {
    console.error("[Lead Edge Handler Error]", err);
    return Response.json({ error: "Internal server error occurred." }, { status: 500 });
  }
};
