import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sample lead input for testing
const sampleLead = {
  source: "estimator_wizard",
  name: "Alexander Vance",
  email: "alexander@apexlogistics.io",
  phone: "+1 (415) 890-2341",
  projectType: "Full Web Platform",
  needs: ["Interactive UI", "Auth & RBAC", "Real-time sync", "REST / GraphQL API"],
  timeline: "4–6 weeks",
  budget: "$15,000 – $25,000",
  message: "We need to replace an internal spreadsheet dispatcher with an event-driven operations desk.",
  link: "https://apexlogistics.io/spec-v1",
  estimateMin: 14500,
  estimateMax: 22000,
  utmSource: "linkedin",
  utmMedium: "organic",
  utmCampaign: "q4_migration",
  pageUrl: "/start",
  referrer: "https://news.ycombinator.com",
};

// Extract template generation logic from src/app/api/lead/route.ts
const routeContent = fs.readFileSync(path.join(__dirname, "../src/app/api/lead/route.ts"), "utf-8");

// Extract teamHtml template literal
const teamHtmlMatch = routeContent.match(/const teamHtml =\s*`([\s\S]*?)`;/);
const clientHtmlMatch = routeContent.match(/const clientHtml =\s*`([\s\S]*?)`;/);

if (!teamHtmlMatch || !clientHtmlMatch) {
  console.error("Could not find teamHtml or clientHtml in route.ts!");
  process.exit(1);
}

function renderTemplate(templateStr, lead) {
  const formattedMin = lead.estimateMin ? `$${lead.estimateMin.toLocaleString()}` : "N/A";
  const formattedMax = lead.estimateMax ? `$${lead.estimateMax.toLocaleString()}` : "N/A";
  const rangeStr = lead.estimateMin && lead.estimateMax ? `${formattedMin} – ${formattedMax}` : lead.budget;
  const cleanWhatsapp = (lead.phone || "").replace(/[^0-9]/g, "");

  // Safe evaluation function simulating route scope
  const fn = new Function(
    "lead",
    "rangeStr",
    "cleanWhatsapp",
    "process",
    `return \`${templateStr}\`;`
  );

  return fn(lead, rangeStr, cleanWhatsapp, {
    env: {
      NEXT_PUBLIC_BOOKING_URL: "https://cal.com/krat-os/15min",
      NEXT_PUBLIC_WHATSAPP_NUMBER: "+1234567890",
    },
  });
}

const renderedTeam = renderTemplate(teamHtmlMatch[1], sampleLead);
const renderedClient = renderTemplate(clientHtmlMatch[1], sampleLead);

const outDir = path.join(__dirname, "../out/email-previews");
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(path.join(outDir, "team-lead-alert.html"), renderedTeam);
fs.writeFileSync(path.join(outDir, "client-ballpark-receipt.html"), renderedClient);

console.log(`✅ Rendered email previews saved to ${outDir}`);
console.log(`- ${path.join(outDir, "team-lead-alert.html")}`);
console.log(`- ${path.join(outDir, "client-ballpark-receipt.html")}`);
