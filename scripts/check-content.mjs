import http from "node:http";
import { spawn } from "node:child_process";

const PORT = process.env.PORT || "3025";
const CHROME_PORT = "9277";

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

function sendCdp(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 10000000);
    const handler = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.id === id) {
        ws.removeEventListener("message", handler);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
    ws.addEventListener("message", handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function evalInPage(ws, expression) {
  const res = await sendCdp(ws, "Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  return res.result?.value;
}

const routes = [
  { slug: "home", path: "/" },
  { slug: "services", path: "/services" },
  { slug: "services-web-apps", path: "/services/web-apps" },
  { slug: "services-mobile-apps", path: "/services/mobile-apps" },
  { slug: "services-ecommerce", path: "/services/ecommerce" },
  { slug: "services-ai-automation", path: "/services/ai-automation" },
  { slug: "services-ui-ux-design", path: "/services/ui-ux-design" },
  { slug: "services-maintenance-support", path: "/services/maintenance-support" },
  { slug: "work", path: "/work" },
  { slug: "about", path: "/about" },
  { slug: "contact", path: "/contact" },
  { slug: "estimator", path: "/estimator" },
  { slug: "start", path: "/start" },
  { slug: "privacy", path: "/privacy" },
  { slug: "terms", path: "/terms" },
  { slug: "design-system", path: "/design-system" },
  { slug: "design-system-dream", path: "/design-system/dream" },
  { slug: "design-system-dream-logo", path: "/design-system/dream/logo" },
];

const FORBIDDEN_TEXT_PATTERNS = [
  { name: "PLACEHOLDER token", regex: /\[placeholder\]/i },
  { name: "LOREM IPSUM text", regex: /lorem\s+ipsum/i },
  { name: "TODO marker", regex: /\bTODO\b/ },
  { name: "TBD marker", regex: /\bTBD\b/ },
  { name: "UNDEFINED token", regex: /\bundefined\b/ },
  { name: "NAN token", regex: /\bNaN\b/ },
  { name: "MONTH token", regex: /\[month\]/i },
  { name: "TEMPLATE bracket token", regex: /\[(xxx|insert|replace|your-company|client-name)\]/i },
];

async function main() {
  console.log(`[CONTENT GUARDRAIL] Checking rendered routes against http://localhost:${PORT}...`);

  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    `--remote-debugging-port=${CHROME_PORT}`,
    "--hide-scrollbars",
    "--window-size=1280,900",
    `http://localhost:${PORT}/?noboot=true`,
  ]);

  let exitCode = 0;
  const violations = [];

  try {
    await new Promise((r) => setTimeout(r, 2000));
    const list = await fetchJson(`http://localhost:${CHROME_PORT}/json`);
    const target = list.find((p) => p.type === "page");
    if (!target) throw new Error("No Chrome page target found");

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((r) => (ws.onopen = r));

    await sendCdp(ws, "Page.enable");
    await sendCdp(ws, "Runtime.enable");

    const consoleErrors = [];
    ws.addEventListener("message", (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
        const text = msg.params.args?.map((a) => a.value || a.description || "").join(" ") || "";
        consoleErrors.push(text);
      }
    });

    for (const route of routes) {
      consoleErrors.length = 0;
      const targetUrl = `http://localhost:${PORT}${route.path}?noboot=true`;
      await sendCdp(ws, "Page.navigate", { url: targetUrl });
      await new Promise((r) => setTimeout(r, 1200));

      const pageText = await evalInPage(ws, "document.body.innerText || ''");
      const deadHrefs = await evalInPage(ws, `
        Array.from(document.querySelectorAll('a'))
          .map(a => a.getAttribute('href'))
          .filter(h => h === '#' || h === '' || h === 'null' || h === 'undefined')
      `);

      // Check forbidden patterns
      for (const pattern of FORBIDDEN_TEXT_PATTERNS) {
        if (pattern.regex.test(pageText)) {
          violations.push({
            route: route.path,
            type: `Forbidden pattern: ${pattern.name}`,
            match: pageText.match(pattern.regex)?.[0],
          });
        }
      }

      // Check dead links
      if (deadHrefs && deadHrefs.length > 0) {
        violations.push({
          route: route.path,
          type: "Dead '#' or empty link detected",
          deadHrefs,
        });
      }

      // Check console errors
      if (consoleErrors.length > 0) {
        violations.push({
          route: route.path,
          type: "Console errors detected",
          errors: [...consoleErrors],
        });
      }
    }

    ws.close();
  } catch (err) {
    console.error("[CONTENT GUARDRAIL ERROR]:", err);
    exitCode = 1;
  } finally {
    try {
      chrome.kill("SIGKILL");
    } catch {
      // ignore
    }
  }

  if (violations.length > 0) {
    console.error("\n[CONTENT GUARDRAIL FAILED] The following violations were found:");
    violations.forEach((v) => {
      console.error(JSON.stringify(v, null, 2));
    });
    process.exit(1);
  } else {
    console.log("\n[CONTENT GUARDRAIL PASSED] All routes verified clean with zero placeholder or dead link violations.");
    process.exit(exitCode);
  }
}

main();
