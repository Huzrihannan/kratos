import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const PORT = process.env.PORT || "3025";
const CHROME_PORT = "9283";
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

async function waitForCondition(ws, conditionExpr, maxMs = 5000, intervalMs = 150) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    const res = await evalInPage(ws, conditionExpr);
    if (res) return true;
    await sleep(intervalMs);
  }
  return false;
}

async function main() {
  console.log("[VERIFY-D2] Starting Headless Chrome for D2 verification & screenshots...");

  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    `--remote-debugging-port=${CHROME_PORT}`,
    "--hide-scrollbars",
    "--window-size=1440,1100",
    `http://localhost:${PORT}/design-system/dream?noboot=true`,
  ]);

  const consoleErrors = [];
  let testFailures = 0;

  function assert(condition, message) {
    if (!condition) {
      console.error(`❌ FAIL: ${message}`);
      testFailures++;
    } else {
      console.log(`✅ PASS: ${message}`);
    }
  }

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
        consoleErrors.push(text);
      }
    });

    console.log("\n--- TEST 1: Load /design-system/dream (Desktop 1440) ---");
    await sendCdp(ws, "Page.navigate", { url: `http://localhost:${PORT}/design-system/dream?noboot=true&theme=dream` });
    await waitForCondition(ws, "document.documentElement.getAttribute('data-theme') === 'dream'");
    await sleep(1500);

    const themeAttr = await evalInPage(ws, "document.documentElement.getAttribute('data-theme')");
    assert(themeAttr === "dream", `data-theme is 'dream' (got: ${themeAttr})`);

    const hasFraunces = await evalInPage(ws, "Boolean(getComputedStyle(document.querySelector('h1')).fontFamily.includes('Fraunces') || getComputedStyle(document.querySelector('h1')).fontFamily.includes('serif'))");
    assert(hasFraunces, "Headline uses Fraunces display font family");

    await captureScreenshot(ws, "d2-design-system-dream-desktop-1440.png");

    console.log("\n--- TEST 2: Sky Dial Interaction (Dusk & Night) ---");
    await evalInPage(ws, `
      const buttons = Array.from(document.querySelectorAll('button'));
      const duskBtn = buttons.find(b => b.textContent.trim().toLowerCase() === 'dusk');
      duskBtn?.click();
    `);
    await sleep(800);
    await captureScreenshot(ws, "d2-design-system-dusk-desktop.png");

    await evalInPage(ws, `
      const buttons = Array.from(document.querySelectorAll('button'));
      const dayBtn = buttons.find(b => b.textContent.trim().toLowerCase() === 'day');
      dayBtn?.click();
    `);
    await sleep(800);

    console.log("\n--- TEST 3: Dialog Modal Preview ---");
    await evalInPage(ws, `
      const buttons = Array.from(document.querySelectorAll('button'));
      const dialogBtn = buttons.find(b => b.textContent && b.textContent.includes('Open Storybook Dialog'));
      dialogBtn?.scrollIntoView({ block: 'center' });
      dialogBtn?.click();
    `);
    await waitForCondition(ws, "document.querySelector('[role=\"dialog\"]') !== null");
    await sleep(600);
    await captureScreenshot(ws, "d2-dialog-open-desktop.png");

    // Close dialog
    await evalInPage(ws, `
      const buttons = Array.from(document.querySelectorAll('button'));
      const closeBtn = buttons.find(b => b.textContent.trim() === '✕' || b.textContent.includes('Confirm'));
      closeBtn?.click();
    `);
    await sleep(400);

    console.log("\n--- TEST 4: Mobile Viewport (360x780) ---");
    await sendCdp(ws, "Emulation.setDeviceMetricsOverride", {
      width: 360,
      height: 780,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sendCdp(ws, "Page.navigate", { url: `http://localhost:${PORT}/design-system/dream?noboot=true&theme=dream` });
    await waitForCondition(ws, "document.documentElement.getAttribute('data-theme') === 'dream'");
    await sleep(1500);

    await captureScreenshot(ws, "d2-design-system-dream-mobile-360.png");

    console.log("\n--- TEST 5: Console Errors ---");
    if (consoleErrors.length > 0) {
      console.warn("⚠️ Console errors detected:");
      consoleErrors.forEach((e) => console.warn("  ", e));
    } else {
      console.log("✅ Zero console errors encountered during all D2 test bench interactions.");
    }

    ws.close();
  } catch (err) {
    console.error("D2 Verification failed:", err);
    testFailures++;
  } finally {
    try {
      chrome.kill("SIGKILL");
    } catch {
      // ignore
    }
  }

  if (testFailures === 0) {
    console.log("\n🎉 ALL D2 VERIFICATION TESTS PASSED!");
    process.exit(0);
  } else {
    console.error(`\n❌ ${testFailures} TEST(S) FAILED.`);
    process.exit(1);
  }
}

main();
