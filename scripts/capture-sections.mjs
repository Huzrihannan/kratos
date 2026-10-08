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
  const port = process.env.PORT || "3016";
  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    "--remote-debugging-port=9229",
    "--hide-scrollbars",
    "--window-size=1280,900",
    `http://localhost:${port}/?noboot=true`,
  ]);

  await new Promise((r) => setTimeout(r, 2500));

  const list = await fetchJson("http://localhost:9229/json");
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

    await sendCdp(ws, "Runtime.evaluate", {
      expression: `
        (() => {
          const el = document.querySelector("${selector}");
          if (el) {
            window.scrollTo(0, el.offsetTop);
          }
        })()
      `,
    });

    await new Promise((r) => setTimeout(r, 600));

    const shot = await sendCdp(ws, "Page.captureScreenshot", { format: "png" });
    const buf = Buffer.from(shot.data, "base64");
    fs.writeFileSync(path.join(artifactsDir, filename), buf);
    console.log(`Saved ${filename} (${buf.length} bytes)`);
  }

  // 1. Desktop Sections
  await captureTarget("#services", "sections-modules-desktop-1280.png", 1280, 900);
  await captureTarget("#process", "sections-pipeline-desktop-1280.png", 1280, 900);
  await captureTarget("#work", "sections-work-desktop-1280.png", 1280, 900);
  await captureTarget("#proof", "sections-proof-light-desktop-1280.png", 1280, 900);

  // 2. Mobile Sections (360 width)
  await captureTarget("#services", "sections-modules-mobile-360.png", 360, 840);
  await captureTarget("#process", "sections-pipeline-mobile-360.png", 360, 840);
  await captureTarget("#work", "sections-work-mobile-360.png", 360, 840);
  await captureTarget("#proof", "sections-proof-mobile-360.png", 360, 840);

  ws.close();
  chrome.kill();
  console.log("All screenshots captured successfully.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
