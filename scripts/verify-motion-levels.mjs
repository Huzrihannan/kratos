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
  const port = process.env.PORT || "3025";
  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    "--remote-debugging-port=9240",
    "--hide-scrollbars",
    "--window-size=1280,900",
    `http://localhost:${port}/?noboot=true`,
  ]);

  await new Promise((r) => setTimeout(r, 2500));

  const list = await fetchJson("http://localhost:9240/json");
  const target = list.find((p) => p.type === "page");
  if (!target) {
    console.error("No target page found");
    chrome.kill();
    return;
  }

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));

  await sendCdp(ws, "Page.enable");
  await sendCdp(ws, "DOM.enable");
  await sendCdp(ws, "Emulation.setDeviceMetricsOverride", {
    width: 1280,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });

  async function capture(filename) {
    const shot = await sendCdp(ws, "Page.captureScreenshot", { format: "png" });
    const buffer = Buffer.from(shot.data, "base64");
    fs.writeFileSync(path.join(artifactsDir, filename), buffer);
    console.log(`Saved screenshot: ${filename}`);
  }

  // 1. Verify FULL Motion
  console.log("=== Testing Motion Level: FULL ===");
  await sendCdp(ws, "Runtime.evaluate", {
    expression: `
      localStorage.setItem('krat_os_motion_level', 'full');
      window.location.href = 'http://localhost:${port}/?noboot=true';
    `,
  });
  await new Promise((r) => setTimeout(r, 2000));

  const fullCheck = await sendCdp(ws, "Runtime.evaluate", {
    expression: `
      (() => {
        const hasCanvas = !!document.querySelector('canvas');
        const hasShader = !!document.querySelector('.relative.w-full.h-full canvas');
        const levelText = document.querySelector('footer')?.innerText?.includes('MOTION:');
        return { hasCanvas, hasShader, levelText };
      })()
    `,
    returnByValue: true,
  });
  console.log("Full motion check:", fullCheck.result.value);
  await capture("r9-motion-full-desktop-1280.png");

  // 2. Verify LITE Motion
  console.log("=== Testing Motion Level: LITE ===");
  await sendCdp(ws, "Runtime.evaluate", {
    expression: `
      localStorage.setItem('krat_os_motion_level', 'lite');
      window.location.reload();
    `,
  });
  await new Promise((r) => setTimeout(r, 2000));

  const liteCheck = await sendCdp(ws, "Runtime.evaluate", {
    expression: `
      (() => {
        const hasCanvas = !!document.querySelector('canvas');
        const hasCrosshair = !!document.querySelector('[data-cursor="true"]');
        return { hasCanvas, hasCrosshair };
      })()
    `,
    returnByValue: true,
  });
  console.log("Lite motion check (canvas should be false):", liteCheck.result.value);
  await capture("r9-motion-lite-desktop-1280.png");

  // 3. Verify OFF Motion
  console.log("=== Testing Motion Level: OFF ===");
  await sendCdp(ws, "Runtime.evaluate", {
    expression: `
      localStorage.setItem('krat_os_motion_level', 'off');
      window.location.reload();
    `,
  });
  await new Promise((r) => setTimeout(r, 2000));

  const offCheck = await sendCdp(ws, "Runtime.evaluate", {
    expression: `
      (() => {
        const hasCanvas = !!document.querySelector('canvas');
        return { hasCanvas };
      })()
    `,
    returnByValue: true,
  });
  console.log("Off motion check (canvas should be false):", offCheck.result.value);
  await capture("r9-motion-off-desktop-1280.png");

  // 4. Verify OS prefers-reduced-motion: reduce
  console.log("=== Testing OS prefers-reduced-motion: reduce ===");
  await sendCdp(ws, "Emulation.setEmulatedMedia", {
    media: "screen",
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await sendCdp(ws, "Runtime.evaluate", {
    expression: `
      localStorage.removeItem('krat_os_motion_level');
      window.location.reload();
    `,
  });
  await new Promise((r) => setTimeout(r, 2000));

  const reducedMotionCheck = await sendCdp(ws, "Runtime.evaluate", {
    expression: `
      (() => {
        const matchesReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const hasCanvas = !!document.querySelector('canvas');
        return { matchesReduced, hasCanvas };
      })()
    `,
    returnByValue: true,
  });
  console.log("OS reduced motion check:", reducedMotionCheck.result.value);
  await capture("r9-prefers-reduced-motion-desktop-1280.png");

  ws.close();
  chrome.kill();
  console.log("=== Motion Levels Verification Complete ===");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
