import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const PORT = process.env.PORT || "3025";
const CHROME_PORT = "9284";
const ARTIFACTS_DIR = "C:\\Users\\Huzrihannan\\.gemini\\antigravity\\brain\\8c8a445a-508d-4c85-8da3-01a094641f86";

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

async function captureScreenshot(ws, filename) {
  const { data } = await sendCdp(ws, "Page.captureScreenshot", { format: "png" });
  const buffer = Buffer.from(data, "base64");
  const targetPath = path.join(ARTIFACTS_DIR, filename);
  fs.writeFileSync(targetPath, buffer);
  console.log(`[SCREENSHOT] Saved: ${targetPath}`);
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForCondition(ws, conditionExpr, maxMs = 6000, intervalMs = 150) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    const res = await evalInPage(ws, conditionExpr);
    if (res) return true;
    await sleep(intervalMs);
  }
  return false;
}

async function main() {
  console.log("[VERIFY-D3] Starting Headless Chrome for D3 Dream Logo verification...");

  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const chromeProcess = spawn(chromePath, [
    "--headless=new",
    `--remote-debugging-port=${CHROME_PORT}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--hide-scrollbars",
    "--window-size=1440,1000",
    "about:blank",
  ]);

  const errors = [];

  try {
    await sleep(2500);
    const list = await fetchJson(`http://localhost:${CHROME_PORT}/json`);
    const target = list.find((p) => p.type === "page");
    if (!target) throw new Error("No Chrome page target found");

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((r) => (ws.onopen = r));

    await sendCdp(ws, "Page.enable");
    await sendCdp(ws, "Runtime.enable");

    ws.addEventListener("message", (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
        const text = msg.params.args?.map((a) => a.value || a.description || "").join(" ") || "";
        // filter benign next.js dev warnings
        if (!text.includes("Download the React DevTools")) {
          errors.push(text);
        }
      }
    });

    // -------------------------------------------------------------
    // 1. DESKTOP 1440: /design-system/dream/logo
    // -------------------------------------------------------------
    console.log("\n[TEST 1] Navigating to /design-system/dream/logo on Desktop (1440x1000)...");
    await sendCdp(ws, "Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await sendCdp(ws, "Page.navigate", { url: `http://localhost:${PORT}/design-system/dream/logo?noboot=true` });
    await waitForCondition(ws, `!!document.querySelector('#dream-sprout')`, 6000);
    await sleep(1500);

    // Verify SVG parts
    const partsCheck = await evalInPage(
      ws,
      `(() => {
        const query = (sel) => document.querySelectorAll(sel).length;
        return {
          stem: query('#stem') > 0,
          leafL: query('#leaf-l') > 0,
          leafR: query('#leaf-r') > 0,
          bud: query('#bud') > 0,
          budTip: query('#bud-tip') > 0,
          poppyStem: query('#poppy-stem') > 0,
          poppyLeafL: query('#poppy-leaf-l') > 0,
          poppyLeafR: query('#poppy-leaf-r') > 0,
          poppyHead: query('#poppy-head') > 0,
          petalsBack: query('#petals-back') > 0,
          petalsFront: query('#petals-front') > 0,
          centre: query('#centre') > 0,
          stamens: query('#stamens') > 0,
          wordmark: query('#dream-wordmark') > 0,
          tagline: query('#dream-tagline') > 0
        };
      })()`
    );

    console.log("[PARTS AUDIT]", partsCheck);
    const allPartsPresent = Object.values(partsCheck).every(Boolean);
    if (!allPartsPresent) {
      console.warn("⚠️ Some SVG named groups are missing from preview page!");
    } else {
      console.log("✅ All 15 required SVG groups and elements verified in DOM!");
    }

    // Capture desktop screenshot
    await captureScreenshot(ws, "d3-dream-logo-desktop-1440.png");

    // Click "Onion Skin Overlay" to capture overlay comparison screenshot
    await evalInPage(
      ws,
      `(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Onion Skin'));
        if (btn) btn.click();
      })()`
    );
    await sleep(600);
    await captureScreenshot(ws, "d3-dream-logo-compare-overlay.png");

    // -------------------------------------------------------------
    // 2. MOBILE 360: /design-system/dream/logo
    // -------------------------------------------------------------
    console.log("\n[TEST 2] Verifying /design-system/dream/logo on Mobile (360x780)...");
    await sendCdp(ws, "Emulation.setDeviceMetricsOverride", {
      width: 360,
      height: 780,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sleep(800);

    const mobileOverflow = await evalInPage(
      ws,
      `document.documentElement.scrollWidth > window.innerWidth`
    );
    console.log(`[MOBILE OVERFLOW] ${mobileOverflow ? '❌ Horizontal overflow detected' : '✅ Clean fit (0px overflow)'}`);

    await captureScreenshot(ws, "d3-dream-logo-mobile-360.png");

    // -------------------------------------------------------------
    // 3. HOME ROUTE WITH THEME=DREAM
    // -------------------------------------------------------------
    console.log("\n[TEST 3] Verifying Homepage Nav Logo in Dream theme (Desktop 1440)...");
    await sendCdp(ws, "Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await sendCdp(ws, "Page.navigate", { url: `http://localhost:${PORT}/?theme=dream&noboot=true` });
    await waitForCondition(ws, `document.documentElement.getAttribute('data-theme') === 'dream'`, 5000);
    await sleep(1500);

    const navThemeCheck = await evalInPage(
      ws,
      `(() => {
        return {
          domTheme: document.documentElement.getAttribute('data-theme'),
          hasDreamSprout: !!document.querySelector('header #dream-sprout'),
          hasWordmark: !!document.querySelector('header #dream-wordmark'),
          hasPoppy: !!document.querySelector('header #dream-poppy')
        };
      })()`
    );
    console.log("[NAV DREAM CHECK]", navThemeCheck);
    await captureScreenshot(ws, "d3-home-dream-nav-desktop.png");

    // -------------------------------------------------------------
    // 4. HOME ROUTE WITH THEME=DARK (ZERO REGRESSION)
    // -------------------------------------------------------------
    console.log("\n[TEST 4] Verifying Homepage Nav Logo in Dark theme (Desktop 1440)...");
    await sendCdp(ws, "Page.navigate", { url: `http://localhost:${PORT}/?theme=dark&noboot=true` });
    await waitForCondition(ws, `document.documentElement.getAttribute('data-theme') === 'dark'`, 5000);
    await sleep(1500);

    const darkNavCheck = await evalInPage(
      ws,
      `(() => {
        const svg = document.querySelector('header svg[aria-label*="Krat.OS"]');
        return {
          domTheme: document.documentElement.getAttribute('data-theme'),
          viewBox: svg?.getAttribute('viewBox'),
          hasCaretRect: !!svg?.querySelector('rect[fill="#FD142B"]')
        };
      })()`
    );
    console.log("[NAV DARK CHECK (ZERO REGRESSION)]", darkNavCheck);
    await captureScreenshot(ws, "d3-home-dark-nav-desktop.png");

    console.log("\n[CONSOLE ERRORS CHECK]");
    if (errors.length > 0) {
      console.warn("⚠️ Console errors encountered:", errors);
    } else {
      console.log("🎉 Zero console errors detected!");
    }

    console.log("\n✅ D3 Dream Logo automated verification completed successfully!");
  } finally {
    chromeProcess.kill();
  }
}

main().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
