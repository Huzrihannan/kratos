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

async function run() {
  const port = process.env.PORT || "3017";
  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    "--remote-debugging-port=9230",
    "--hide-scrollbars",
    "--window-size=1280,900",
    `http://localhost:${port}/?noboot=true`,
  ]);

  await new Promise((r) => setTimeout(r, 2500));

  const list = await fetchJson("http://localhost:9230/json");
  const target = list.find((p) => p.type === "page");
  if (!target) {
    console.error("No target page found");
    chrome.kill();
    return;
  }

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));

  await sendCdp(ws, "Page.enable");

  async function captureTarget(selector, filename, width = 1280, height = 900) {
    await sendCdp(ws, "Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 768,
    });

    const scrollRes = await sendCdp(ws, "Runtime.evaluate", {
      expression: `
        (() => {
          const el = document.querySelector('${selector}');
          if (el) {
            window.scrollTo(0, el.offsetTop);
            return { found: true, top: el.offsetTop };
          }
          return { found: false };
        })()
      `,
      returnByValue: true,
    });
    console.log(`Scrolled to ${selector}:`, scrollRes.result?.value);

    await new Promise((r) => setTimeout(r, 700));

    const shot = await sendCdp(ws, "Page.captureScreenshot", { format: "png" });
    const buf = Buffer.from(shot.data, "base64");
    fs.writeFileSync(path.join(artifactsDir, filename), buf);
    console.log(`Saved ${filename} (${buf.length} bytes)`);
  }

  // 1. Desktop Sections B (1280 width)
  await captureTarget("#stack", "sections-stack-desktop-1280.png", 1280, 900);
  await captureTarget("#why", "sections-principles-desktop-1280.png", 1280, 900);
  await captureTarget("#faq", "sections-faq-desktop-1280.png", 1280, 900);
  await captureTarget('section[aria-label="Call to Action"]', "sections-finalcta-desktop-1280.png", 1280, 900);

  // 2. Mobile Sections B (360 width)
  await captureTarget("#stack", "sections-stack-mobile-360.png", 360, 840);
  await captureTarget("#why", "sections-principles-mobile-360.png", 360, 840);
  await captureTarget("#faq", "sections-faq-mobile-360.png", 360, 840);
  await captureTarget('section[aria-label="Call to Action"]', "sections-finalcta-mobile-360.png", 360, 840);

  ws.close();
  chrome.kill();
  console.log("All Sections B screenshots captured successfully.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
