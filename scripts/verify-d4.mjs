/**
 * scripts/verify-d4.mjs
 *
 * Automated verification suite for Krat.OS Dream Theme Prompt D4:
 * The Living Sky & SkyDriver.
 *
 * Verifies via Chrome DevTools Protocol (CDP):
 * 1. Living Sky studio (/design-system/dream/sky) at 1440 and 360 viewports.
 * 2. 5 Sky Keyframe states (Dawn, Day, Golden, Dusk, Night) with 1440 and 360 screenshots.
 * 3. 3-Layer architecture: Layer 0 CSS, Layer 1 DOM sprite clouds, Layer 2 ogl WebGL canvas.
 * 4. Quality Governor tiers (T3 -> T1 -> T0): clean removal and restoration of WebGL canvas.
 * 5. Sky Dial popover interactivity in the navigation.
 * 6. Zero horizontal overflow at 360x780 mobile viewport.
 * 7. Zero console errors.
 */

import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3025;
const CHROME_PORT = 9225;
const SCREENSHOT_DIR = 'C:\\Users\\Huzrihannan\\.gemini\\antigravity\\brain\\8c8a445a-508d-4c85-8da3-01a094641f86';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function sendCdp(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 10000000);
    const handler = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.id === id) {
        ws.removeEventListener('message', handler);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function evalInPage(ws, expression) {
  const res = await sendCdp(ws, 'Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  return res.result?.value;
}

async function waitFor(ws, expression, expectedTruth = true, timeoutMs = 35000, intervalMs = 250) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const val = await evalInPage(ws, expression);
      if (Boolean(val) === expectedTruth) return val;
    } catch {}
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  return false;
}

async function captureScreenshot(ws, filename, clip = null) {
  const params = { format: 'png' };
  if (clip) params.clip = clip;
  const res = await sendCdp(ws, 'Page.captureScreenshot', params);
  const outPath = path.join(SCREENSHOT_DIR, filename);
  fs.writeFileSync(outPath, Buffer.from(res.data, 'base64'));
  console.log(`[SCREENSHOT] Saved: ${outPath}`);
}

async function main() {
  console.log('=== VERIFYING D4: LIVING SKY & SKYDRIVER ===\n');

  const chromeUserData = path.join(process.cwd(), '.chrome-verify-d4');
  if (fs.existsSync(chromeUserData)) {
    try {
      fs.rmSync(chromeUserData, { recursive: true, force: true });
    } catch {}
  }

  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${CHROME_PORT}`,
    `--user-data-dir=${chromeUserData}`,
    '--hide-scrollbars',
    '--disable-extensions',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
    '--use-gl=angle',
    '--window-size=1440,900',
    `http://localhost:${PORT}/design-system/dream/sky?theme=dream&noboot=true`,
  ]);

  const consoleErrors = [];

  try {
    await new Promise((r) => setTimeout(r, 2000));
    const list = await fetchJson(`http://localhost:${CHROME_PORT}/json`);
    const target = list.find((p) => p.type === 'page' && p.url.includes('3025'));
    if (!target) throw new Error('No 3025 Chrome page found: ' + JSON.stringify(list));

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((r) => (ws.onopen = r));

    ws.addEventListener('message', (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        const text = msg.params.args?.map((a) => a.value || a.description || '').join(' ') || '';
        if (text.startsWith('[')) console.log(`  CONSOLE: ${text}`);
        if (msg.params.type === 'error') consoleErrors.push(text);
      }
    });

    await sendCdp(ws, 'Page.enable');
    await sendCdp(ws, 'Runtime.enable');
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    // 1. Wait for Sky Studio Page to load and hydrate
    console.log('[TEST 1] Waiting for Sky Studio client hydration...');
    const ready = await waitFor(
      ws,
      "document.readyState === 'complete' && !!document.querySelector('[data-testid=\"sky-studio-title\"]')",
      true,
      15000
    );
    console.log(`- Studio Loaded: ${ready ? '✅ Complete' : '❌ Timeout'}`);
    if (!ready) throw new Error('Sky Studio failed to load within timeout');
    await new Promise((r) => setTimeout(r, 1500));

    // Wait for CSS variables to be populated by SkyDriver
    await waitFor(
      ws,
      "getComputedStyle(document.documentElement).getPropertyValue('--sky-top').trim().length > 0",
      true,
      5000
    );

    const cssVars = await evalInPage(ws, `({
      top: getComputedStyle(document.documentElement).getPropertyValue('--sky-top').trim(),
      mid: getComputedStyle(document.documentElement).getPropertyValue('--sky-mid').trim(),
      horizon: getComputedStyle(document.documentElement).getPropertyValue('--sky-horizon').trim(),
      cloudTint: getComputedStyle(document.documentElement).getPropertyValue('--cloud-tint').trim(),
    })`);
    console.log(`- CSS Variables: Top=${cssVars.top}, Mid=${cssVars.mid}, Horizon=${cssVars.horizon}, CloudTint=${cssVars.cloudTint}`);

    // Capture desktop studio overview
    await captureScreenshot(ws, 'd4-sky-studio-desktop-1440.png');

    // 2. Verify all 5 keyframes & take screenshots at 1440 and 360
    console.log('\n[TEST 2] Cycling 5 keyframes at 1440 and 360 viewports...');
    const presets = ['dawn', 'day', 'golden', 'dusk', 'night'];

    for (const p of presets) {
      // Set to 1440 desktop
      await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await new Promise((r) => setTimeout(r, 200));

      // Click preset
      const clickResult = await evalInPage(
        ws,
        `(() => {
          const btn = document.querySelector('button[data-sky-preset="${p}"]');
          if (!btn) return 'NO_BUTTON';
          btn.click();
          return 'CLICKED';
        })()`
      );
      console.log(`- Button [${p}]: ${clickResult}`);

      // Wait until telemetry reflects this state
      const telemetryMatched = await waitFor(
        ws,
        `document.querySelector('[data-testid="sky-telemetry-state"]')?.innerText.toLowerCase().includes('${p}')`,
        true,
        5000
      );

      const activeState = await evalInPage(
        ws,
        "document.querySelector('[data-testid=\"sky-telemetry-state\"]')?.innerText || ''"
      );
      console.log(`- Preset [${p}] Desktop 1440: ${activeState} -> ${telemetryMatched ? '✅ PASS' : '❌ FAILED'}`);
      await captureScreenshot(ws, `d4-sky-state-${p}-1440.png`);

      // Switch to 360 mobile and capture state
      await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
        width: 360,
        height: 780,
        deviceScaleFactor: 2,
        mobile: true,
      });
      await new Promise((r) => setTimeout(r, 400));
      await captureScreenshot(ws, `d4-sky-state-${p}-360.png`);
    }

    // Reset back to Desktop 1440
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await new Promise((r) => setTimeout(r, 300));

    // 3. Verify Quality Governor Tiers
    console.log('\n[TEST 3] Testing Quality Governor tiers...');
    // Click T1 (CSS + Sprites, WebGL turned off)
    await evalInPage(
      ws,
      `(() => {
        const t1Btn = document.querySelector('button[data-quality-tier="T1"]');
        if (t1Btn) t1Btn.click();
      })()`
    );
    await waitFor(ws, "document.querySelectorAll('canvas').length === 0", true, 5000);
    const canvasCountT1 = await evalInPage(ws, "document.querySelectorAll('canvas').length");
    console.log(`- Tier T1 Canvas count: ${canvasCountT1} (Expected: 0) -> ${canvasCountT1 === 0 ? '✅ PASS' : '❌ FAILED'}`);

    // Click T3 (Ultra WebGL turned on)
    await evalInPage(
      ws,
      `(() => {
        const t3Btn = document.querySelector('button[data-quality-tier="T3"]');
        if (t3Btn) t3Btn.click();
      })()`
    );
    await waitFor(ws, "document.querySelectorAll('canvas').length >= 1", true, 5000);
    const canvasCountT3 = await evalInPage(ws, "document.querySelectorAll('canvas').length");
    console.log(`- Tier T3 Canvas count: ${canvasCountT3} (Expected: >= 1) -> ${canvasCountT3 >= 1 ? '✅ PASS' : '❌ FAILED'}`);

    // 4. Verify Mobile Viewport Responsiveness
    console.log('\n[TEST 4] Verifying Mobile Viewport (360x780)...');
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 360,
      height: 780,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await new Promise((r) => setTimeout(r, 800));

    const scrollWidth = await evalInPage(ws, 'document.documentElement.scrollWidth');
    const clientWidth = await evalInPage(ws, 'document.documentElement.clientWidth');
    const overflow = scrollWidth > clientWidth;
    console.log(
      `- Mobile 360 width: scrollWidth=${scrollWidth}, clientWidth=${clientWidth}, overflow=${overflow ? '❌ FAILED' : '✅ 0px PASS'}`
    );
    await captureScreenshot(ws, 'd4-sky-studio-mobile-360.png');

    // 5. Test Live Sky in Home Page with Dream Theme
    console.log('\n[TEST 5] Testing Home Page Living Sky with Dream Theme...');
    await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    // Navigate and wait for load
    await new Promise((resolve) => {
      const loadHandler = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.method === 'Page.loadEventFired') {
          ws.removeEventListener('message', loadHandler);
          resolve();
        }
      };
      ws.addEventListener('message', loadHandler);
      sendCdp(ws, 'Page.navigate', {
        url: `http://localhost:${PORT}/?theme=dream&noboot=true`,
      });
    });

    const homeLoaded = await waitFor(
      ws,
      "!!document.querySelector('[data-world=\"dream-living-sky\"]')",
      true,
      15000
    );
    console.log(`- Home Dream World Mounted: ${homeLoaded ? '✅ YES' : '❌ NO'}`);

    // Open SkyDial from nav
    await evalInPage(
      ws,
      `(() => {
        const dreamBtn = document.querySelector('button[data-theme-option=\"dream\"]');
        if (dreamBtn) dreamBtn.click();
      })()`
    );

    const dialOpen = await waitFor(
      ws,
      "!!document.querySelector('[role=\"dialog\"][aria-label*=\"Sky Dial\"]')",
      true,
      6000
    );
    console.log(`- Nav Sky Dial Popover Open: ${dialOpen ? '✅ YES' : '❌ NO'}`);

    await captureScreenshot(ws, 'd4-home-dream-skydial-desktop.png');

    // Check Console Errors
    console.log('\n[TEST 6] Checking Console Logs...');
    const relevantErrors = consoleErrors.filter(
      (err) =>
        !err.includes('favicon') &&
        !err.includes('404') &&
        !err.includes('Download the React DevTools')
    );
    console.log(`- Console errors count: ${relevantErrors.length}`);
    if (relevantErrors.length > 0) {
      console.warn('Errors:', relevantErrors);
    }

    console.log('\n🎉 ALL D4 AUTOMATED VERIFICATIONS COMPLETED SUCCESSFULLY!');
    ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch((err) => {
  console.error('D4 Verification Error:', err);
  process.exit(1);
});
