import { argv, exit } from "node:process";

const baseUrl = process.env.BASE_URL || argv[2] || "http://localhost:3025";

const testRoutes = [
  "/",
  "/services",
  "/services/web-apps",
  "/work",
  "/work/fintech-portal",
  "/about",
  "/contact",
  "/start",
];

async function validateStructuredData() {
  console.log(`\nValidating Schema.org Structured Data against ${baseUrl}...\n`);
  let totalErrors = 0;
  let totalSchemas = 0;

  for (const path of testRoutes) {
    const url = `${baseUrl}${path}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`❌ HTTP ${res.status} fetching ${url}`);
        totalErrors++;
        continue;
      }

      const html = await res.text();
      const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
      let match;
      let foundOnPage = 0;

      console.log(`Route: ${path}`);
      while ((match = regex.exec(html)) !== null) {
        foundOnPage++;
        totalSchemas++;
        try {
          const parsed = JSON.parse(match[1]);
          if (!parsed["@context"] || !parsed["@context"].includes("schema.org")) {
            console.error(`  ⚠️ Schema #${foundOnPage} missing valid @context`);
            totalErrors++;
          }

          if (parsed["@graph"] && Array.isArray(parsed["@graph"])) {
            const types = parsed["@graph"].map((item) => item["@type"]).join(", ");
            console.log(`  ✓ Schema #${foundOnPage} [@graph: ${types}]`);
          } else if (parsed["@type"]) {
            console.log(`  ✓ Schema #${foundOnPage} [@type: ${parsed["@type"]}]`);
          } else {
            console.error(`  ⚠️ Schema #${foundOnPage} missing @type or @graph`);
            totalErrors++;
          }
        } catch (e) {
          console.error(`  ❌ Invalid JSON on ${path}: ${e.message}`);
          totalErrors++;
        }
      }

      if (foundOnPage === 0) {
        console.warn(`  ⚠️ No JSON-LD scripts found on ${path}`);
      }
    } catch (err) {
      console.error(`❌ Connection error fetching ${url}: ${err.message}`);
      totalErrors++;
    }
  }

  console.log(`\nStructured Data Summary: ${totalSchemas} schemas audited, ${totalErrors} errors.`);
  if (totalErrors > 0) {
    exit(1);
  }
}

validateStructuredData();
