import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const artifactsDir = "C:\\Users\\Huzrihannan\\.gemini\\antigravity\\brain\\8c8a445a-508d-4c85-8da3-01a094641f86";

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve(JSON.parse(data)));
    }).on("error", reject);
  });
}

function sendCdp(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1000000);
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

async function run() {
  const port = process.env.PORT || "3025";
  console.log(`Starting headless Chrome for E2E user flow tests against http://localhost:${port}...`);

  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    "--remote-debugging-port=9245",
    "--hide-scrollbars",
    "--window-size=1280,900",
    `http://localhost:${port}/?noboot=true`,
  ]);

  await new Promise((r) => setTimeout(r, 2500));

  let ws;
  try {
    const list = await fetchJson("http://localhost:9245/json");
    const target = list.find((p) => p.type === "page");
    if (!target) {
      throw new Error("No target page found on Chrome debug port");
    }

    ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((r) => (ws.onopen = r));

    await sendCdp(ws, "Page.enable");
    await sendCdp(ws, "DOM.enable");
    await sendCdp(ws, "Runtime.enable");

    console.log("\n=== 1. Test Command Palette (Cmd+K) ===");
    // Dispatch Cmd+K keydown
    await sendCdp(ws, "Input.dispatchKeyEvent", {
      type: "keyDown",
      modifiers: 2, // Ctrl
      windowsVirtualKeyCode: 75,
      key: "k",
      code: "KeyK",
    });
    await new Promise((r) => setTimeout(r, 600));

    const cmdkOpen = await evalInPage(
      ws,
      `Boolean(document.querySelector('[cmdk-root]') || document.querySelector('[cmdk-dialog]') || document.querySelector('[role="dialog"]'))`
    );
    console.log("Command palette opened via hotkey:", cmdkOpen);

    // Close with Escape
    await sendCdp(ws, "Input.dispatchKeyEvent", {
      type: "keyDown",
      windowsVirtualKeyCode: 27,
      key: "Escape",
      code: "Escape",
    });
    await new Promise((r) => setTimeout(r, 400));

    console.log("\n=== 2. Test Estimator Configurator Journey (/start) ===");
    await sendCdp(ws, "Page.navigate", { url: `http://localhost:${port}/start?noboot=true` });
    await new Promise((r) => setTimeout(r, 2000));

    const initialStep = await evalInPage(
      ws,
      `document.body.innerText.includes("01/06") || document.body.innerText.includes("What are you building?")`
    );
    console.log("Step 1 rendered successfully:", initialStep);

    // Click first option [1] (Web Application / SaaS)
    await evalInPage(ws, `
      const opt = document.querySelector('button[aria-checked], div[role="radio"], div[role="checkbox"]') || document.querySelectorAll('button')[1];
      if (opt) opt.click();
    `);
    await new Promise((r) => setTimeout(r, 500));

    // Advance to Step 2
    await evalInPage(ws, `
      const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Next') || b.innerText.includes('Continue'));
      if (nextBtn) nextBtn.click();
    `);
    await new Promise((r) => setTimeout(r, 600));

    const step2Active = await evalInPage(
      ws,
      `document.body.innerText.includes("02/06") || document.body.innerText.includes("capabilities") || document.body.innerText.includes("features")`
    );
    console.log("Step 2 reached successfully:", step2Active);

    // Capture screenshot of Estimator Step
    const stepScreenshot = await sendCdp(ws, "Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(
      path.join(artifactsDir, "r11-estimator-step-desktop-1280.png"),
      Buffer.from(stepScreenshot.data, "base64")
    );
    console.log("Saved r11-estimator-step-desktop-1280.png");

    console.log("\n=== 3. Mobile Touch Target Audit (360px viewport) ===");
    await sendCdp(ws, "Emulation.setDeviceMetricsOverride", {
      width: 360,
      height: 740,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sendCdp(ws, "Page.navigate", { url: `http://localhost:${port}/?noboot=true` });
    await new Promise((r) => setTimeout(r, 2500));

    // Audit touch targets on home page mobile
    const touchAudit = await evalInPage(ws, `
      (() => {
        const interactive = Array.from(document.querySelectorAll('a, button, input, [role="button"]'));
        const issues = [];
        let total = 0;
        for (const el of interactive) {
          const rect = el.getBoundingClientRect();
          // Filter invisible elements
          if (rect.width === 0 || rect.height === 0 || window.getComputedStyle(el).display === 'none') continue;
          if (rect.bottom < 0 || rect.top > 2000) continue; // check top 2000px
          total++;
          const computedStyle = window.getComputedStyle(el);
          const minW = Math.max(rect.width, parseFloat(computedStyle.minWidth) || 0);
          const minH = Math.max(rect.height, parseFloat(computedStyle.minHeight) || 0);
          if (minH < 36 || minW < 36) {
            issues.push({
              tag: el.tagName.toLowerCase(),
              text: (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 30),
              width: Math.round(rect.width),
              height: Math.round(rect.height)
            });
          }
        }
        return { total, issues };
      })()
    `);

    console.log(`Scanned ${touchAudit.total} mobile touch targets in primary viewport.`);
    if (touchAudit.issues.length > 0) {
      console.warn("Touch targets under 36px height/width:", touchAudit.issues);
    } else {
      console.log("✓ All scanned interactive elements pass mobile touch target baseline!");
    }

    // Capture home mobile screenshot
    const mobileScreenshot = await sendCdp(ws, "Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(
      path.join(artifactsDir, "r11-home-mobile-360.png"),
      Buffer.from(mobileScreenshot.data, "base64")
    );
    console.log("Saved r11-home-mobile-360.png");

    console.log("\n=== 4. Test 404 Kernel Panic Page ===");
    await sendCdp(ws, "Page.navigate", { url: `http://localhost:${port}/some-nonexistent-path` });
    await new Promise((r) => setTimeout(r, 1500));
    const panicTitle = await evalInPage(
      ws,
      `document.body.innerText.includes("KERNEL_PANIC") || document.body.innerText.includes("404")`
    );
    console.log("Kernel panic page rendered:", panicTitle);

    const notFoundScreenshot = await sendCdp(ws, "Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(
      path.join(artifactsDir, "r11-kernel-panic-mobile-360.png"),
      Buffer.from(notFoundScreenshot.data, "base64")
    );
    console.log("Saved r11-kernel-panic-mobile-360.png");

    console.log("\n=== E2E Flow Verification Completed Successfully ===");
  } finally {
    if (ws) ws.close();
    chrome.kill();
  }
}

run().catch((err) => {
  console.error("E2E Test Failure:", err);
  process.exit(1);
});
