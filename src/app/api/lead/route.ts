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
  const notifyEmail = process.env.LEAD_NOTIFY_EMAIL || "hello@krat-os.dev";
  const rawWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+1234567890";
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, "");

  const isMock = !apiKey || apiKey.startsWith("re_your_api");

  const formattedMin = lead.estimateMin ? `$${lead.estimateMin.toLocaleString()}` : "N/A";
  const formattedMax = lead.estimateMax ? `$${lead.estimateMax.toLocaleString()}` : "N/A";
  const rangeStr = lead.estimateMin && lead.estimateMax ? `${formattedMin} – ${formattedMax}` : lead.budget;

  // 1. Team Notification Email Content (Monospace OS Terminal Alert)
  const teamHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/></head>
<body style="margin: 0; padding: 24px 0; background-color: #161616; font-family: 'JetBrains Mono', Menlo, Consolas, Monaco, monospace; color: #EFE3CF;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 620px; margin: 0 auto; background-color: #212121; border: 1px solid #3A3A3A; border-radius: 2px;">
    <tr>
      <td style="padding: 24px 28px; border-bottom: 1px solid #3A3A3A;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <span style="display: inline-block; width: 4px; height: 18px; background-color: #FD142B; vertical-align: middle; margin-right: 8px;"></span>
              <strong style="font-size: 16px; letter-spacing: -0.02em; color: #EFE3CF;">KRAT.OS // INTAKE_DISPATCH</strong>
            </td>
            <td align="right" style="font-size: 11px; color: #A8A294; letter-spacing: 0.08em; text-transform: uppercase;">
              [INTAKE_ALERT]
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 24px 28px;">
        <div style="font-size: 12px; color: #A8A294; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.08em;">
          /01 SPECIFICATION // PAYLOAD_MANIFEST
        </div>

        <table role="presentation" width="100%" cellpadding="8" cellspacing="0" style="background-color: #2B2B2B; border: 1px solid #3A3A3A; border-radius: 2px; font-size: 13px; margin-bottom: 20px;">
          <tr style="border-bottom: 1px solid #3A3A3A;">
            <td width="35%" style="color: #A8A294; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #3A3A3A;">Client</td>
            <td style="color: #EFE3CF; font-weight: 700; border-bottom: 1px solid #3A3A3A;">${lead.name} &lt;<a href="mailto:${lead.email}" style="color: #EFE3CF; text-decoration: underline;">${lead.email}</a>&gt;</td>
          </tr>
          <tr style="border-bottom: 1px solid #3A3A3A;">
            <td style="color: #A8A294; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #3A3A3A;">Phone / WA</td>
            <td style="color: #EFE3CF; border-bottom: 1px solid #3A3A3A;">${lead.phone || "Not provided"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #3A3A3A;">
            <td style="color: #A8A294; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #3A3A3A;">Project Type</td>
            <td style="color: #EFE3CF; font-weight: 700; border-bottom: 1px solid #3A3A3A;">${lead.projectType}</td>
          </tr>
          <tr style="border-bottom: 1px solid #3A3A3A;">
            <td style="color: #A8A294; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #3A3A3A;">Capabilities</td>
            <td style="color: #EFE3CF; border-bottom: 1px solid #3A3A3A;">${lead.needs.join(", ")}</td>
          </tr>
          <tr style="border-bottom: 1px solid #3A3A3A;">
            <td style="color: #A8A294; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #3A3A3A;">Timeline</td>
            <td style="color: #EFE3CF; border-bottom: 1px solid #3A3A3A;">${lead.timeline}</td>
          </tr>
          <tr style="border-bottom: 1px solid #3A3A3A;">
            <td style="color: #A8A294; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #3A3A3A;">Budget Band</td>
            <td style="color: #EFE3CF; border-bottom: 1px solid #3A3A3A;">${lead.budget}</td>
          </tr>
          <tr style="border-bottom: 1px solid #3A3A3A;">
            <td style="color: #A8A294; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #3A3A3A;">Ballpark Range</td>
            <td style="color: #FD142B; font-weight: 800; border-bottom: 1px solid #3A3A3A; font-size: 14px;">${rangeStr}</td>
          </tr>
          ${
            lead.link
              ? `<tr style="border-bottom: 1px solid #3A3A3A;">
                  <td style="color: #A8A294; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #3A3A3A;">Reference</td>
                  <td style="border-bottom: 1px solid #3A3A3A;"><a href="${lead.link}" style="color: #FF5E70; text-decoration: underline;">${lead.link}</a></td>
                </tr>`
              : ""
          }
          ${
            lead.message
              ? `<tr>
                  <td style="color: #A8A294; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Project Notes</td>
                  <td style="color: #EFE3CF; white-space: pre-wrap;">${lead.message.replace(/\n/g, "<br/>")}</td>
                </tr>`
              : ""
          }
        </table>

        <div style="font-size: 11px; color: #7A7A7A; padding: 12px 16px; background-color: #1A1A1A; border: 1px solid #2B2B2B; border-radius: 2px;">
          <div>ATTRIBUTION: Source=${lead.source} | UTM_Source=${lead.utmSource || "direct"} | Page=${lead.pageUrl || "/"}</div>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding: 16px 28px; border-top: 1px solid #3A3A3A; font-size: 11px; color: #A8A294; text-align: center;">
        Krat.OS — Software solutions. Lead engine automated receipt.
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  // 2. Client Confirmation & Ballpark Auto-Reply (Terminal Receipt)
  const clientHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/></head>
<body style="margin: 0; padding: 24px 0; background-color: #161616; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #EFE3CF;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 620px; margin: 0 auto; background-color: #212121; border: 1px solid #3A3A3A; border-radius: 2px;">
    <tr>
      <td style="padding: 28px 32px 20px; border-bottom: 1px solid #3A3A3A;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width: 5px; height: 26px; background-color: #FD142B; padding: 0;"></td>
                  <td style="padding-left: 10px;">
                    <span style="font-family: 'JetBrains Mono', Menlo, Consolas, Monaco, monospace; font-size: 22px; font-weight: 800; color: #EFE3CF; letter-spacing: -0.04em;">Krat<span style="color: #FD142B;">.</span>OS</span>
                    <div style="font-family: 'JetBrains Mono', Menlo, Consolas, Monaco, monospace; font-size: 10px; color: #A8A294; letter-spacing: 0.08em; text-transform: uppercase;">Software solutions</div>
                  </td>
                </tr>
              </table>
            </td>
            <td align="right">
              <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: #3DDC84; vertical-align: middle; margin-right: 6px;"></span>
              <span style="font-family: 'JetBrains Mono', Menlo, Consolas, Monaco, monospace; font-size: 11px; color: #A8A294; text-transform: uppercase; letter-spacing: 0.05em;">[SPEC_LOGGED]</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <h2 style="font-family: 'JetBrains Mono', Menlo, Consolas, Monaco, monospace; font-size: 18px; font-weight: 700; color: #EFE3CF; margin: 0 0 12px 0; letter-spacing: -0.02em;">
          Hi ${lead.name}, your project intake has been compiled.
        </h2>
        <p style="font-size: 14px; line-height: 1.6; color: #A8A294; margin: 0 0 24px 0;">
          We received your configuration for <strong style="color: #EFE3CF;">${lead.projectType}</strong>. Based on your submitted scope and architectural requirements, here is your preliminary ballpark estimate:
        </p>

        <!-- Highlight Spec Box -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #2B2B2B; border: 1px solid #444444; border-radius: 2px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 24px; text-align: center;">
              <div style="font-family: 'JetBrains Mono', Menlo, Consolas, Monaco, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #A8A294; margin-bottom: 8px;">
                Estimated Ballpark Range
              </div>
              <div style="font-family: 'JetBrains Mono', Menlo, Consolas, Monaco, monospace; font-size: 32px; font-weight: 800; color: #EFE3CF; letter-spacing: -0.02em; margin-bottom: 8px;">
                ${rangeStr}
              </div>
              <div style="font-family: 'JetBrains Mono', Menlo, Consolas, Monaco, monospace; font-size: 12px; color: #A8A294;">
                Estimated Sprint Delivery: <strong style="color: #EFE3CF;">${lead.timeline}</strong>
              </div>
            </td>
          </tr>
        </table>

        <!-- Config Breakdown -->
        <div style="font-family: 'JetBrains Mono', Menlo, Consolas, Monaco, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #A8A294; margin-bottom: 10px;">
          /02 SCOPE // LOGGED_PARAMETERS
        </div>
        <table role="presentation" width="100%" cellpadding="8" cellspacing="0" style="background-color: #1A1A1A; border: 1px solid #3A3A3A; border-radius: 2px; font-family: 'JetBrains Mono', Menlo, Consolas, Monaco, monospace; font-size: 12px; margin-bottom: 24px;">
          <tr style="border-bottom: 1px solid #2B2B2B;">
            <td width="35%" style="color: #7A7A7A; border-bottom: 1px solid #2B2B2B;">MODULE</td>
            <td style="color: #EFE3CF; border-bottom: 1px solid #2B2B2B;">${lead.projectType}</td>
          </tr>
          <tr style="border-bottom: 1px solid #2B2B2B;">
            <td style="color: #7A7A7A; border-bottom: 1px solid #2B2B2B;">CAPABILITIES</td>
            <td style="color: #EFE3CF; border-bottom: 1px solid #2B2B2B;">${lead.needs.join(", ")}</td>
          </tr>
          <tr>
            <td style="color: #7A7A7A;">BUDGET TARGET</td>
            <td style="color: #EFE3CF;">${lead.budget}</td>
          </tr>
        </table>

        <!-- Signature Brand Statement -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; border-left: 3px solid #FD142B; padding-left: 14px;">
          <tr>
            <td>
              <div style="font-family: 'JetBrains Mono', Menlo, Consolas, Monaco, monospace; font-size: 14px; font-style: italic; color: #EFE3CF;">
                &ldquo;A ballpark, not a quote. Let&rsquo;s make it real.&rdquo;
              </div>
              <div style="font-size: 13px; color: #A8A294; line-height: 1.5; margin-top: 6px;">
                Our engineering team reviews every submission within 4 hours. We would love to chat through your timeline, goals, and technical details to give you an exact roadmap.
              </div>
            </td>
          </tr>
        </table>

        <!-- Conversion CTAs -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 28px 0 12px;">
          <tr>
            <td>
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius: 2px; background-color: #EFE3CF; border-left: 4px solid #FD142B;">
                    <a href="${process.env.NEXT_PUBLIC_BOOKING_URL || "https://cal.com/krat-os/15min"}" style="font-family: 'JetBrains Mono', Menlo, Consolas, Monaco, monospace; font-size: 13px; font-weight: 700; color: #212121; text-decoration: none; padding: 12px 22px; display: inline-block;">
                      Book a 15-Minute Call &rarr;
                    </a>
                  </td>
                  <td style="width: 12px;"></td>
                  <td style="border-radius: 2px; background-color: #2B2B2B; border: 1px solid #444444;">
                    <a href="https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("Hi Krat.OS! I just submitted an estimate for " + lead.projectType)}" style="font-family: 'JetBrains Mono', Menlo, Consolas, Monaco, monospace; font-size: 13px; font-weight: 600; color: #EFE3CF; text-decoration: none; padding: 12px 18px; display: inline-block;">
                      Chat on WhatsApp &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px 32px; border-top: 1px solid #3A3A3A; font-size: 11px; color: #7A7A7A; font-family: 'JetBrains Mono', Menlo, Consolas, Monaco, monospace; line-height: 1.6;">
        <div>Krat.OS &mdash; Software solutions. Web apps, mobile apps, and automation engineered end-to-end.</div>
        <div style="margin-top: 4px;">Global Remote (HQ: San Francisco, CA) &bull; <a href="https://krat-os.dev" style="color: #A8A294; text-decoration: underline;">krat-os.dev</a></div>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  if (isMock) {
    console.log("[Resend Mock] Internal Lead Alert to:", notifyEmail, `Subject: [INTAKE_ALERT] New Lead: ${lead.name}`);
    console.log("[Resend Mock] Auto-Reply to:", lead.email, `Subject: [SPEC_RECEIPT] Project Estimate Ballpark: ${lead.projectType}`);
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
        from: "Krat.OS Website <notifications@krat-os.dev>",
        to: [notifyEmail],
        reply_to: lead.email,
        subject: `[INTAKE_ALERT] New Lead: ${lead.name} (${lead.projectType})`,
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
        from: "Krat.OS Software Solutions <hello@krat-os.dev>",
        to: [lead.email],
        reply_to: notifyEmail,
        subject: `[SPEC_RECEIPT] Project Estimate Ballpark: ${lead.projectType}`,
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
