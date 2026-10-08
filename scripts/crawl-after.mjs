import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.join(__dirname, "../audit/after");
fs.mkdirSync(outDir, { recursive: true });

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
  { slug: "start", path: "/start" },
  { slug: "privacy", path: "/privacy" },
  { slug: "terms", path: "/terms" },
  { slug: "design-system", path: "/design-system" },
  { slug: "404", path: "/404" },
  { slug: "deliberately-wrong", path: "/deliberately-nonexistent-url" },
];

async function run() {
  const port = process.env.PORT || "3025";
  console.log(`Starting headless Chrome for Phase 3 After-Crawl on http://localhost:${port}...`);

  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    "--remote-debugging-port=9299",
    "--hide-scrollbars",
    "--window-size=1280,900",
    `http://localhost:${port}/?noboot=true`,
  ]);

  await new Promise((r) => setTimeout(r, 2500));

  let ws;
  try {
    const list = await fetchJson("http://localhost:9299/json");
    const target = list.find((p) => p.type === "page");
    if (!target) throw new Error("No target page found on Chrome debug port");

    ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((r) => (ws.onopen = r));

    await sendCdp(ws, "Page.enable");
    await sendCdp(ws, "DOM.enable");
    await sendCdp(ws, "Runtime.enable");
    await sendCdp(ws, "Network.enable");

    const consoleLogs = {};
    const networkFailures = {};
    const renderedTexts = {};

    let currentRouteSlug = "init";

    ws.addEventListener("message", (evt) => {
      try {
        const msg = JSON.parse(evt.data);
        if (msg.method === "Runtime.consoleAPICalled") {
          const type = msg.params.type;
          const text = (msg.params.args || [])
            .map((a) => (a.value !== undefined ? a.value : a.description || ""))
            .join(" ");
          if (!consoleLogs[currentRouteSlug]) consoleLogs[currentRouteSlug] = [];
          consoleLogs[currentRouteSlug].push({ type, text, timestamp: Date.now() });
        }
        if (msg.method === "Network.responseReceived") {
          const resp = msg.params.response;
          if (resp.status >= 400 && !resp.url.includes("/deliberately-nonexistent-url") && !resp.url.includes("/404")) {
            if (!networkFailures[currentRouteSlug]) networkFailures[currentRouteSlug] = [];
            networkFailures[currentRouteSlug].push({
              url: resp.url,
              status: resp.status,
              statusText: resp.statusText,
            });
          }
        }
        if (msg.method === "Network.loadingFailed") {
          if (!networkFailures[currentRouteSlug]) networkFailures[currentRouteSlug] = [];
          networkFailures[currentRouteSlug].push({
            url: msg.params.url || "",
            errorText: msg.params.errorText || "",
          });
        }
      } catch {}
    });

    for (const r of routes) {
      currentRouteSlug = r.slug;
      consoleLogs[r.slug] = [];
      networkFailures[r.slug] = [];

      const targetUrl = `http://localhost:${port}${r.path}${r.path.includes("?") ? "&" : "?"}noboot=true`;
      console.log(`\nCrawling Route: ${r.slug} (${targetUrl})...`);

      // 1. Desktop 1280 Dark Full
      await sendCdp(ws, "Emulation.setDeviceMetricsOverride", {
        width: 1280,
        height: 900,
        deviceScaleFactor: 1.5,
        mobile: false,
      });
      await sendCdp(ws, "Page.navigate", { url: targetUrl });
      await new Promise((res) => setTimeout(res, 1800));

      // Extract rendered text
      const visibleText = await evalInPage(ws, "document.body.innerText");
      renderedTexts[r.slug] = visibleText || "";

      // Capture screenshot 1280 dark full
      const shot1280Dark = await sendCdp(ws, "Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(
        path.join(outDir, `${r.slug}-1280-dark-full.png`),
        Buffer.from(shot1280Dark.data, "base64")
      );

      // 2. Mobile 360 Dark Full
      await sendCdp(ws, "Emulation.setDeviceMetricsOverride", {
        width: 360,
        height: 740,
        deviceScaleFactor: 2,
        mobile: true,
      });
      await new Promise((res) => setTimeout(res, 500));
      const shot360Dark = await sendCdp(ws, "Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(
        path.join(outDir, `${r.slug}-360-dark-full.png`),
        Buffer.from(shot360Dark.data, "base64")
      );

      // 3. Tablet 768 Dark Full
      await sendCdp(ws, "Emulation.setDeviceMetricsOverride", {
        width: 768,
        height: 1024,
        deviceScaleFactor: 2,
        mobile: false,
      });
      await new Promise((res) => setTimeout(res, 500));
      const shot768Dark = await sendCdp(ws, "Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(
        path.join(outDir, `${r.slug}-768-dark-full.png`),
        Buffer.from(shot768Dark.data, "base64")
      );

      // 4. Wide Desktop 1920 Dark Full
      await sendCdp(ws, "Emulation.setDeviceMetricsOverride", {
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await new Promise((res) => setTimeout(res, 500));
      const shot1920Dark = await sendCdp(ws, "Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(
        path.join(outDir, `${r.slug}-1920-dark-full.png`),
        Buffer.from(shot1920Dark.data, "base64")
      );

      // 5. Desktop 1280 Light Theme
      await sendCdp(ws, "Emulation.setDeviceMetricsOverride", {
        width: 1280,
        height: 900,
        deviceScaleFactor: 1.5,
        mobile: false,
      });
      await evalInPage(ws, `
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        document.documentElement.setAttribute('data-theme', 'light');
      `);
      await new Promise((res) => setTimeout(res, 500));
      const shot1280Light = await sendCdp(ws, "Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(
        path.join(outDir, `${r.slug}-1280-light-full.png`),
        Buffer.from(shot1280Light.data, "base64")
      );

      // Restore dark theme
      await evalInPage(ws, `
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      `);

      // 6. Motion Lite
      await evalInPage(ws, `
        window.__TEST_MOTION_LEVEL__ = 'lite';
        window.dispatchEvent(new CustomEvent('krat:motion-change', { detail: 'lite' }));
      `);
      await new Promise((res) => setTimeout(res, 400));
      const shotLite = await sendCdp(ws, "Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(
        path.join(outDir, `${r.slug}-1280-dark-lite.png`),
        Buffer.from(shotLite.data, "base64")
      );

      // 7. Motion Off
      await evalInPage(ws, `
        window.__TEST_MOTION_LEVEL__ = 'off';
        window.dispatchEvent(new CustomEvent('krat:motion-change', { detail: 'off' }));
      `);
      await new Promise((res) => setTimeout(res, 400));
      const shotOff = await sendCdp(ws, "Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(
        path.join(outDir, `${r.slug}-1280-dark-off.png`),
        Buffer.from(shotOff.data, "base64")
      );

      console.log(`  ✓ Completed captures and text extraction for ${r.slug}`);
    }

    // Save JSON data sets
    fs.writeFileSync(path.join(outDir, "console-logs.json"), JSON.stringify(consoleLogs, null, 2));
    fs.writeFileSync(path.join(outDir, "network-failures.json"), JSON.stringify(networkFailures, null, 2));
    fs.writeFileSync(path.join(outDir, "rendered-text.json"), JSON.stringify(renderedTexts, null, 2));

    console.log("\n=== Phase 3 After-Crawl Completed Successfully ===");
    console.log(`Artifacts saved in: ${outDir}`);
  } finally {
    if (ws) ws.close();
    chrome.kill();
  }
}

run().catch((err) => {
  console.error("Crawl Failure:", err);
  process.exit(1);
});
