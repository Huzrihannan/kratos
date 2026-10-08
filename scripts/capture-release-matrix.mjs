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

async function capture(ws, filename) {
  const screenshot = await sendCdp(ws, "Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(artifactsDir, filename), Buffer.from(screenshot.data, "base64"));
  console.log(`Saved ${filename}`);
}

async function run() {
  const port = process.env.PORT || "3025";
  console.log(`Capturing multi-device release matrix against http://localhost:${port}...`);

  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    "--remote-debugging-port=9250",
    "--hide-scrollbars",
    "--window-size=1280,900",
    `http://localhost:${port}/?noboot=true`,
  ]);

  await new Promise((r) => setTimeout(r, 2500));

  let ws;
  try {
    const list = await fetchJson("http://localhost:9250/json");
    const target = list.find((p) => p.type === "page");
    if (!target) throw new Error("No target page found on Chrome debug port");

    ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((r) => (ws.onopen = r));

    await sendCdp(ws, "Page.enable");
    await sendCdp(ws, "DOM.enable");
    await sendCdp(ws, "Runtime.enable");

    // 1. Mobile 360
    console.log("Capturing Mobile 360px...");
    await sendCdp(ws, "Emulation.setDeviceMetricsOverride", {
      width: 360,
      height: 740,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sendCdp(ws, "Page.navigate", { url: `http://localhost:${port}/?noboot=true` });
    await new Promise((r) => setTimeout(r, 2000));
    await capture(ws, "r11-home-mobile-360.png");

    // 2. Tablet 768
    console.log("Capturing Tablet 768px...");
    await sendCdp(ws, "Emulation.setDeviceMetricsOverride", {
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      mobile: false,
    });
    await new Promise((r) => setTimeout(r, 1500));
    await capture(ws, "r11-home-tablet-768.png");

    // 3. Desktop 1280
    console.log("Capturing Desktop 1280px...");
    await sendCdp(ws, "Emulation.setDeviceMetricsOverride", {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1.5,
      mobile: false,
    });
    await new Promise((r) => setTimeout(r, 1500));
    await capture(ws, "r11-home-desktop-1280.png");

    // 4. Wide Desktop 1920
    console.log("Capturing Wide Desktop 1920px...");
    await sendCdp(ws, "Emulation.setDeviceMetricsOverride", {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await new Promise((r) => setTimeout(r, 1500));
    await capture(ws, "r11-home-wide-1920.png");

    // 5. Desktop Light Theme
    console.log("Capturing Desktop 1280px Light Mode...");
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
    await new Promise((r) => setTimeout(r, 800));
    await capture(ws, "r11-home-light-desktop-1280.png");

    // Restore dark mode
    await evalInPage(ws, `
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    `);

    // 6. Services Page
    console.log("Capturing Services Page...");
    await sendCdp(ws, "Page.navigate", { url: `http://localhost:${port}/services?noboot=true` });
    await new Promise((r) => setTimeout(r, 1800));
    await capture(ws, "r11-services-desktop-1280.png");

    // 7. Work Page
    console.log("Capturing Work Page...");
    await sendCdp(ws, "Page.navigate", { url: `http://localhost:${port}/work?noboot=true` });
    await new Promise((r) => setTimeout(r, 1800));
    await capture(ws, "r11-work-desktop-1280.png");

    // 8. Estimator Page
    console.log("Capturing Estimator Page...");
    await sendCdp(ws, "Page.navigate", { url: `http://localhost:${port}/start?noboot=true` });
    await new Promise((r) => setTimeout(r, 1800));
    await capture(ws, "r11-estimator-desktop-1280.png");

    console.log("=== Multi-Device Release Matrix Capture Complete ===");
  } finally {
    if (ws) ws.close();
    chrome.kill();
  }
}

run().catch((err) => {
  console.error("Capture Failure:", err);
  process.exit(1);
});
