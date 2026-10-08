import { execSync } from "node:child_process";
import fs from "node:fs";

const routes = [
  { name: "home", path: "/?noboot=true" },
  { name: "services", path: "/services" },
  { name: "work", path: "/work" },
  { name: "start", path: "/start" },
];

const results = {};

for (const r of routes) {
  console.log(`Auditing route: ${r.name} (http://localhost:3025${r.path})...`);
  const outputPath = `./lighthouse-${r.name}.json`;
  try {
    execSync(
      `npx lighthouse "http://localhost:3025${r.path}" --output=json --output-path=${outputPath} --chrome-flags="--headless=new" --only-categories=performance,accessibility,best-practices,seo --quiet`,
      { stdio: "inherit" }
    );
    const data = JSON.parse(fs.readFileSync(outputPath, "utf8"));
    results[r.name] = {
      performance: Math.round(data.categories.performance.score * 100),
      accessibility: Math.round(data.categories.accessibility.score * 100),
      bestPractices: Math.round(data.categories["best-practices"].score * 100),
      seo: Math.round(data.categories.seo.score * 100),
      fcp: data.audits["first-contentful-paint"]?.displayValue,
      lcp: data.audits["largest-contentful-paint"]?.displayValue,
      cls: data.audits["cumulative-layout-shift"]?.displayValue,
      tbt: data.audits["total-blocking-time"]?.displayValue,
    };
    console.log(`Results for ${r.name}:`, results[r.name]);
  } catch (err) {
    console.error(`Error auditing ${r.name}:`, err.message);
  }
}

fs.writeFileSync("./lighthouse-summary.json", JSON.stringify(results, null, 2));
console.log("=== All Audits Complete ===");
