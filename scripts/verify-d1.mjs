import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const PORT = process.env.PORT || "3025";
const CHROME_PORT = "9280";
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
  console.log("[VERIFY-D1] Launching headless Chrome for D1 verification...");

  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    `--remote-debugging-port=${CHROME_PORT}`,
    "--hide-scrollbars",
    "--window-size=1280,900",
    `http://localhost:${PORT}/?noboot=true`,
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

    console.log("\n--- TEST 1: Initial Default Theme (Dark) Clean Load ---");
    await evalInPage(ws, "localStorage.clear(); document.cookie = 'krat-theme=; Max-Age=0; path=/';");
    await sendCdp(ws, "Page.navigate", { url: `http://localhost:${PORT}/?noboot=true` });
    await waitForCondition(ws, "document.querySelectorAll('[role=\"radio\"]').length === 3");

    const initialTheme = await evalInPage(ws, "document.documentElement.getAttribute('data-theme')");
    const initialScheme = await evalInPage(ws, "document.documentElement.style.colorScheme");
    const initialMeta = await evalInPage(ws, "document.querySelector('meta[name=\"theme-color\"]')?.content");
    assert(initialTheme === "dark", `Default theme is 'dark' (got: ${initialTheme})`);
    assert(initialScheme === "dark", `Color-scheme is 'dark' (got: ${initialScheme})`);
    assert(initialMeta === "#212121", `Meta theme-color is '#212121' (got: ${initialMeta})`);
    await captureScreenshot(ws, "d1-home-desktop-1280-dark.png");

    console.log("\n--- TEST 2: Switch to Light Theme via Nav Switcher ---");
    await evalInPage(ws, `document.querySelector('[data-theme-option="light"]')?.click()`);
    await waitForCondition(ws, "document.documentElement.getAttribute('data-theme') === 'light'");
    await sleep(600); // Wait for view transition to settle

    const lightTheme = await evalInPage(ws, "document.documentElement.getAttribute('data-theme')");
    const lightScheme = await evalInPage(ws, "document.documentElement.style.colorScheme");
    const lightMeta = await evalInPage(ws, "document.querySelector('meta[name=\"theme-color\"]')?.content");
    const lightStorage = await evalInPage(ws, "localStorage.getItem('krat-theme')");
    const lightCookie = await evalInPage(ws, "document.cookie.includes('krat-theme=light')");
    assert(lightTheme === "light", `data-theme updated to 'light' (got: ${lightTheme})`);
    assert(lightScheme === "light", `color-scheme updated to 'light' (got: ${lightScheme})`);
    assert(lightMeta === "#F6EFDD", `Meta theme-color updated to '#F6EFDD' (got: ${lightMeta})`);
    assert(lightStorage === "light", `localStorage saved 'light' (got: ${lightStorage})`);
    assert(lightCookie, `cookie krat-theme=light is set`);
    await captureScreenshot(ws, "d1-home-desktop-1280-light.png");

    console.log("\n--- TEST 3: Switch to Dream Theme via Nav Switcher (Cloud Wipe) ---");
    await evalInPage(ws, `document.querySelector('[data-theme-option="dream"]')?.click()`);
    // Wait for cloud wipe apex and completion
    await waitForCondition(ws, "document.documentElement.getAttribute('data-theme') === 'dream'");
    await sleep(800); // Allow wipe overlay to finish animating out

    const dreamTheme = await evalInPage(ws, "document.documentElement.getAttribute('data-theme')");
    const dreamScheme = await evalInPage(ws, "document.documentElement.style.colorScheme");
    const dreamMeta = await evalInPage(ws, "document.querySelector('meta[name=\"theme-color\"]')?.content");
    const dreamStorage = await evalInPage(ws, "localStorage.getItem('krat-theme')");
    const dreamTried = await evalInPage(ws, "localStorage.getItem('krat-dream-tried')");
    const dreamCookie = await evalInPage(ws, "document.cookie.includes('krat-theme=dream')");
    assert(dreamTheme === "dream", `data-theme updated to 'dream' (got: ${dreamTheme})`);
    assert(dreamScheme === "light", `color-scheme is 'light' for Dream (got: ${dreamScheme})`);
    assert(dreamMeta === "#6DB6F0", `Meta theme-color updated to '#6DB6F0' (got: ${dreamMeta})`);
    assert(dreamStorage === "dream", `localStorage saved 'dream' (got: ${dreamStorage})`);
    assert(dreamTried === "true", `localStorage saved 'krat-dream-tried=true'`);
    assert(dreamCookie, `cookie krat-theme=dream is set`);
    await captureScreenshot(ws, "d1-home-desktop-1280-dream.png");

    console.log("\n--- TEST 4: Persistence across Reload (Zero Flash Verification) ---");
    await sendCdp(ws, "Page.reload");
    await waitForCondition(ws, "document.querySelectorAll('[role=\"radio\"]').length === 3");
    const reloadedTheme = await evalInPage(ws, "document.documentElement.getAttribute('data-theme')");
    assert(reloadedTheme === "dream", `Persisted theme on reload is 'dream' (got: ${reloadedTheme})`);

    console.log("\n--- TEST 5: Switch back to Dark Theme via Keyboard Navigation (Arrow Keys) ---");
    await evalInPage(ws, `
      const dreamRadio = document.querySelector('[data-theme-option="dream"]');
      dreamRadio?.focus();
      dreamRadio?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    `);
    await waitForCondition(ws, "document.documentElement.getAttribute('data-theme') === 'dark'");
    await sleep(800);
    const backToDark = await evalInPage(ws, "document.documentElement.getAttribute('data-theme')");
    assert(backToDark === "dark", `data-theme returned to 'dark' via keyboard navigation (got: ${backToDark})`);

    console.log("\n--- TEST 6: URL Parameter Override (?theme=dream, ?theme=light) ---");
    await sendCdp(ws, "Page.navigate", { url: `http://localhost:${PORT}/?noboot=true&theme=dream` });
    await waitForCondition(ws, "document.documentElement.getAttribute('data-theme') === 'dream'");
    const urlDream = await evalInPage(ws, "document.documentElement.getAttribute('data-theme')");
    assert(urlDream === "dream", `URL ?theme=dream sets 'dream' (got: ${urlDream})`);

    await sendCdp(ws, "Page.navigate", { url: `http://localhost:${PORT}/?noboot=true&theme=light` });
    await waitForCondition(ws, "document.documentElement.getAttribute('data-theme') === 'light'");
    const urlLight = await evalInPage(ws, "document.documentElement.getAttribute('data-theme')");
    assert(urlLight === "light", `URL ?theme=light sets 'light' (got: ${urlLight})`);

    console.log("\n--- TEST 7: Mobile Viewport (360x780) Menu Switcher ---");
    await sendCdp(ws, "Emulation.setDeviceMetricsOverride", {
      width: 360,
      height: 780,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sendCdp(ws, "Page.navigate", { url: `http://localhost:${PORT}/?noboot=true&theme=dark` });
    await sleep(1500);
    await captureScreenshot(ws, "d1-home-mobile-360-dark.png");

    // Open mobile navigation menu
    await evalInPage(ws, `document.querySelector('button[aria-label="Open mobile menu"]')?.click()`);
    await waitForCondition(ws, "document.querySelector('[data-theme-card=\"dream\"]') !== null");

    // Click dream card in mobile menu
    await evalInPage(ws, `document.querySelector('[data-theme-card=\"dream\"]')?.click()`);
    await waitForCondition(ws, "document.documentElement.getAttribute('data-theme') === 'dream'");
    await sleep(1000);

    const mobileDreamTheme = await evalInPage(ws, "document.documentElement.getAttribute('data-theme')");
    assert(mobileDreamTheme === "dream", `Mobile menu switched to 'dream' (got: ${mobileDreamTheme})`);
    await captureScreenshot(ws, "d1-home-mobile-360-dream.png");

    // Open mobile menu again and switch to Light
    await evalInPage(ws, `document.querySelector('button[aria-label="Open mobile menu"]')?.click()`);
    await waitForCondition(ws, "document.querySelector('[data-theme-card=\"light\"]') !== null");
    await evalInPage(ws, `document.querySelector('[data-theme-card=\"light\"]')?.click()`);
    await waitForCondition(ws, "document.documentElement.getAttribute('data-theme') === 'light'");
    await sleep(1000);

    const mobileLightTheme = await evalInPage(ws, "document.documentElement.getAttribute('data-theme')");
    assert(mobileLightTheme === "light", `Mobile menu switched to 'light' (got: ${mobileLightTheme})`);
    await captureScreenshot(ws, "d1-home-mobile-360-light.png");

    console.log("\n--- TEST 8: Console Errors ---");
    if (consoleErrors.length > 0) {
      console.warn("⚠️ Console warnings/errors detected during run:");
      consoleErrors.forEach((e) => console.warn("  ", e));
    } else {
      console.log("✅ Zero console errors encountered during all theme switching operations.");
    }

    ws.close();
  } catch (err) {
    console.error("Verification script failed:", err);
    testFailures++;
  } finally {
    try {
      chrome.kill("SIGKILL");
    } catch {
      // ignore
    }
  }

  if (testFailures === 0) {
    console.log("\n🎉 ALL D1 THEME VERIFICATION TESTS PASSED!");
    process.exit(0);
  } else {
    console.error(`\n❌ ${testFailures} TEST(S) FAILED.`);
    process.exit(1);
  }
}

main();
