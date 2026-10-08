import { NextRequest, NextResponse } from "next/server";
import { leadSchema, LeadInput } from "@/lib/schema";
import { checkRateLimit } from "@/lib/rate-limit";

// Helper to verify Cloudflare Turnstile token
async function verifyTurnstileToken(token: string | undefined, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey || secretKey.startsWith("0x4AAAAAAyour")) {
    // Development or placeholder key: bypass verification
    return true;
  }

  if (!token) {
    return false;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    formData.append("remoteip", ip);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });
    const outcome = await res.json();
    return Boolean(outcome.success);
  } catch (err) {
    console.error("[Turnstile error]", err);
    return false;
  }
}

// Helper to save lead to Supabase
async function saveLeadToSupabase(lead: LeadInput, ip: string, userAgent: string): Promise<string | null> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey || supabaseUrl.includes("your-project") || serviceKey.includes("your_service_role")) {
    console.log("[Supabase Mock/Dev Mode] Lead saved to local logger:", {
      email: lead.email,
      name: lead.name,
      projectType: lead.projectType,
      budget: lead.budget,
    });
    return null;
  }

  try {
    const payload = {
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
      utm_source: lead.utmSource || null,
      utm_medium: lead.utmMedium || null,
      utm_campaign: lead.utmCampaign || null,
      page_url: lead.pageUrl || null,
      referrer: lead.referrer || null,
      ip_address: ip,
      user_agent: userAgent,
    };

    const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[Supabase insert error]", errText);
      return null;
    }

    const inserted = await res.json();
    return inserted?.[0]?.id || null;
  } catch (err) {
    console.error("[Supabase request error]", err);
    return null;
  }
}

// Helper to send transactional emails via Resend
async function sendResendEmails(lead: LeadInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.LEAD_NOTIFY_EMAIL || "hello@kratos.dev";

  const isMock = !apiKey || apiKey.startsWith("re_your_api");

  const formattedMin = lead.estimateMin ? `$${lead.estimateMin.toLocaleString()}` : "N/A";
  const formattedMax = lead.estimateMax ? `$${lead.estimateMax.toLocaleString()}` : "N/A";
  const rangeStr = lead.estimateMin && lead.estimateMax ? `${formattedMin} – ${formattedMax}` : lead.budget;

  // 1. Team Notification Email Content
  const teamHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #FDEBD9; padding: 32px; border-radius: 24px; color: #2A1810;">
      <h2 style="color: #F47B3A; margin-top: 0;">🚀 New Project Lead: ${lead.name}</h2>
      <p style="font-size: 16px;"><strong>Source:</strong> ${lead.source}</p>
      <div style="background: #ffffff; padding: 24px; border-radius: 16px; margin: 20px 0;">
        <p><strong>Contact:</strong> ${lead.name} &lt;${lead.email}&gt;</p>
        <p><strong>Phone / WhatsApp:</strong> ${lead.phone || "Not provided"}</p>
        <p><strong>Project Type:</strong> ${lead.projectType}</p>
        <p><strong>Needs:</strong> ${lead.needs.join(", ")}</p>
        <p><strong>Timeline:</strong> ${lead.timeline}</p>
        <p><strong>Budget Band:</strong> ${lead.budget}</p>
        <p><strong>Computed Ballpark:</strong> ${rangeStr}</p>
        ${lead.link ? `<p><strong>Link / Reference:</strong> <a href="${lead.link}">${lead.link}</a></p>` : ""}
        ${lead.message ? `<p><strong>Project Notes:</strong><br/>${lead.message.replace(/\n/g, "<br/>")}</p>` : ""}
      </div>
      <p style="font-size: 12px; color: #6B4A3A;">Attribution: UTM Source=${lead.utmSource || "direct"} | Page=${lead.pageUrl || "/"}</p>
    </div>
  `;

  // 2. Client Confirmation & Ballpark Auto-Reply
  const clientHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #FDEBD9; padding: 36px; border-radius: 28px; color: #2A1810;">
      <h1 style="color: #2A1810; margin-top: 0; font-size: 26px;">Hi ${lead.name}, thank you for reaching out to Kratos!</h1>
      <p style="font-size: 16px; line-height: 1.5; color: #6B4A3A;">
        We received your project details for <strong>${lead.projectType}</strong>. Here is the ballpark estimate based on your scope:
      </p>
      <div style="background: #FFD9B8; border: 2px solid #FB9A5E; padding: 24px; border-radius: 20px; text-align: center; margin: 24px 0;">
        <span style="font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #F47B3A;">Estimated Ballpark Range</span>
        <div style="font-size: 32px; font-weight: bold; color: #2A1810; margin: 8px 0;">${rangeStr}</div>
        <span style="font-size: 13px; color: #6B4A3A;">Estimated timeline: ${lead.timeline}</span>
      </div>
      <p style="font-size: 15px; color: #2A1810; line-height: 1.6;">
        <em>A ballpark, not a quote. Let's make it real.</em> We would love to chat through your timeline, goals, and technical details to give you an exact roadmap.
      </p>
      <div style="margin: 28px 0; text-align: center;">
        <a href="${process.env.NEXT_PUBLIC_BOOKING_URL || "https://cal.com/kratos/15min"}" style="background: #FB9A5E; color: #2A1810; font-weight: bold; text-decoration: none; padding: 14px 28px; border-radius: 9999px; display: inline-block; font-size: 16px;">
          Book a 15-Minute Call
        </a>
      </div>
      <p style="font-size: 13px; color: #6B4A3A; margin-top: 32px; border-top: 1px solid #FFD9B8; padding-top: 16px;">
        Kratos Software Solutions • Strong underneath. Friendly on top.
      </p>
    </div>
  `;

  if (isMock) {
    console.log("[Resend Mock] Internal Lead Alert to:", notifyEmail, `Subject: New Lead: ${lead.name}`);
    console.log("[Resend Mock] Auto-Reply to:", lead.email, `Subject: Your Kratos Ballpark Estimate`);
    return;
  }

  try {
    // Send team alert
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Kratos Website <notifications@kratos.dev>",
        to: [notifyEmail],
        reply_to: lead.email,
        subject: `🚀 New Lead: ${lead.name} (${lead.projectType})`,
        html: teamHtml,
      }),
    });

    // Send client auto-reply
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Kratos Software Solutions <hello@kratos.dev>",
        to: [lead.email],
        reply_to: notifyEmail,
        subject: `Your Kratos Ballpark Estimate for ${lead.projectType}`,
        html: clientHtml,
      }),
    });
  } catch (err) {
    console.error("[Resend sending error]", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. IP Rate Limiting Check
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: "Too many submissions from this connection. Please wait a few minutes before trying again.",
        },
        { status: 429, headers: { "Retry-After": "600" } }
      );
    }

    // 2. Parse JSON body
    let rawBody;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    // 3. Honeypot check: If the hidden 'website' field has any content, silently discard spam
    if (rawBody.website && typeof rawBody.website === "string" && rawBody.website.trim().length > 0) {
      console.warn("[Spam Trap] Honeypot triggered by IP:", ip);
      // Return 200 OK so bots believe they succeeded
      return NextResponse.json({ success: true, message: "Thank you for your message." });
    }

    // 4. Cloudflare Turnstile Verification
    const isHuman = await verifyTurnstileToken(rawBody.turnstileToken, ip);
    if (!isHuman) {
      return NextResponse.json(
        { error: "Security check failed. Please refresh and try again." },
        { status: 400 }
      );
    }

    // 5. Shared Zod Schema Validation
    const parseResult = leadSchema.safeParse(rawBody);
    if (!parseResult.success) {
      const firstError = parseResult.error.errors[0]?.message || "Invalid submission details.";
      return NextResponse.json(
        {
          error: firstError,
          fieldErrors: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const leadData = parseResult.data;
    const userAgent = request.headers.get("user-agent") || "unknown";

    // 6. Persistence & Emails
    const leadId = (await saveLeadToSupabase(leadData, ip, userAgent)) || crypto.randomUUID();
    await sendResendEmails(leadData);

    return NextResponse.json({
      success: true,
      leadId,
      message: "Estimate request received successfully.",
    });
  } catch (error) {
    console.error("[API Lead Route Error]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request. Please try again or reach out on WhatsApp." },
      { status: 500 }
    );
  }
}
