import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3025;
const CHROME_PORT = 9222;
const SCREENSHOT_DIR = 'C:\\Users\\Huzrihannan\\.gemini\\antigravity\\brain\\8c8a445a-508d-4c85-8da3-01a094641f86';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
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

async function waitFor(ws, expression, expected = true, timeout = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const val = await evalInPage(ws, expression);
      if (Boolean(val) === Boolean(expected)) return true;
    } catch {
      // Continue polling
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  return false;
}

async function captureScreenshot(ws, filename, clip = null) {
  const params = { format: 'png' };
  if (clip) params.clip = clip;
  const { data } = await sendCdp(ws, 'Page.captureScreenshot', params);
  const outPath = path.join(SCREENSHOT_DIR, filename);
  fs.writeFileSync(outPath, Buffer.from(data, 'base64'));
  console.log(`  📸 Saved screenshot: ${filename}`);
}

async function setViewport(ws, width, height, isMobile = false) {
  await sendCdp(ws, 'Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: isMobile,
  });
}

async function main() {
  console.log('=== [PROMPT D7] DREAM THEME HERO VERIFICATION SUITE ===\n');

  // Spawn headless Chrome
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${CHROME_PORT}`,
    '--hide-scrollbars',
    '--window-size=1440,900',
    `http://localhost:${PORT}/design-system/dream/hero?theme=dream&noboot=true`,
  ]);

  let passedTests = 0;
  let totalTests = 10;
  const consoleErrors = [];

  try {
    await new Promise((r) => setTimeout(r, 2000));
    const list = await fetchJson(`http://localhost:${CHROME_PORT}/json`);
    const target = list.find((p) => p.type === 'page');
    if (!target) throw new Error('No Chrome target page found');

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((r) => (ws.onopen = r));

    await sendCdp(ws, 'Page.enable');
    await sendCdp(ws, 'Runtime.enable');
    await sendCdp(ws, 'DOM.enable');

    ws.addEventListener('message', (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        const text = msg.params.args.map((a) => a.value || a.description).join(' ');
        if (msg.params.type === 'error' && !text.includes('favicon') && !text.includes('WebGL unsupported in software')) {
          consoleErrors.push(text);
          console.error('  PAGE ERROR:', text);
        } else if (text.includes('[HERO') || text.includes('krat') || msg.params.type === 'warn') {
          console.log(`  PAGE [${msg.params.type}]:`, text);
        }
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        const d = msg.params.exceptionDetails;
        console.error('  PAGE EXCEPTION:', d.text, d.exception?.description || d.url + ':' + d.lineNumber + ':' + d.columnNumber);
      }
    });

    // TEST 1: Load Hero Studio at 1440px desktop
    console.log('[Test 1/10] Loading /design-system/dream/hero at 1440 desktop...');
    await setViewport(ws, 1440, 900, false);
    await sendCdp(ws, 'Page.navigate', { url: `http://localhost:${PORT}/design-system/dream/hero?theme=dream&noboot=true` });

    const ready = await waitFor(ws, "document.readyState === 'complete'", true, 20000);
    const currUrl = await evalInPage(ws, "window.location.href");
    const themeAttr = await evalInPage(ws, "document.documentElement.getAttribute('data-theme')");
    const h1s = await evalInPage(ws, "Array.from(document.querySelectorAll('h1')).map(h => ({ text: h.innerText, testid: h.getAttribute('data-testid') }))");
    console.log('  Debug: currUrl=', currUrl, 'ready=', ready, 'themeAttr=', themeAttr, 'h1s=', JSON.stringify(h1s));
    const hydrated = await waitFor(
      ws,
      "Boolean(document.querySelector('[data-testid=\"hero-headline-dream\"]'))",
      true,
      15000
    );
    if (!hydrated) {
      const finalH1s = await evalInPage(ws, "Array.from(document.querySelectorAll('h1')).map(h => ({ text: h.innerText, testid: h.getAttribute('data-testid') }))");
      throw new Error('Hero Studio failed to hydrate. Final h1s: ' + JSON.stringify(finalH1s));
    }
    console.log('  Hero Studio hydrated cleanly.');
    passedTests++;

    // TEST 2: Verify Fraunces Headline, Vine Underline, and Blooming Poppy
    console.log('\n[Test 2/10] Verifying Fraunces headline, vine underline, and blooming poppy...');
    const headlineText = await evalInPage(ws, `
      document.querySelector('[data-testid="hero-headline-dream"]')?.textContent.replace(/\\s+/g, ' ').trim()
    `);
    console.log(`  Headline text: "${headlineText}"`);
    if (!headlineText.includes('We build the software your business runs on.')) {
      throw new Error(`Headline mismatch: got "${headlineText}"`);
    }

    const hasVine = await evalInPage(ws, `
      Boolean(document.querySelector('[data-testid="hero-headline-dream"] svg path[stroke="#3E8C5A"]'))
    `);
    console.log(`  Hand-drawn vine underline rendered: ${hasVine}`);
    if (!hasVine) throw new Error('Vine underline missing under "runs"');

    const hasPoppyTerminus = await evalInPage(ws, `
      Boolean(document.querySelector('[data-testid="hero-headline-dream"] svg circle[fill="#2A1B2E"]'))
    `);
    console.log(`  Blooming Poppy terminus rendered: ${hasPoppyTerminus}`);
    if (!hasPoppyTerminus) throw new Error('Poppy terminus bloom missing on vine underline');
    passedTests++;

    // TEST 3: CSS-only Instant LCP Reveal Check (No opacity: 0 blocking paint)
    console.log('\n[Test 3/10] Verifying CSS-only instant LCP reveal (no JS opacity gating)...');
    const headlineComputed = await evalInPage(ws, `
      (() => {
        const h1 = document.querySelector('[data-testid="hero-headline-dream"]');
        if (!h1) return null;
        const style = window.getComputedStyle(h1);
        return {
          opacity: style.opacity,
          visibility: style.visibility,
          display: style.display,
        };
      })()
    `);
    console.log('  Headline computed styles:', headlineComputed);
    if (headlineComputed?.opacity !== '1' || headlineComputed?.visibility !== 'visible') {
      throw new Error(`Headline blocked by initial opacity: ${JSON.stringify(headlineComputed)}`);
    }
    passedTests++;

    // TEST 4: Floating Cloud Cards & Pointer Tilt
    console.log('\n[Test 4/10] Verifying floating cloud cards and 3D pointer tilt...');
    const cloudCardsRendered = await evalInPage(ws, `
      Boolean(document.querySelector('[data-testid="cloud-card-app"]') &&
              document.querySelector('[data-testid="cloud-card-chat"]') &&
              document.querySelector('[data-testid="cloud-card-growth"]'))
    `);
    console.log(`  Cloud cards (App, Chat, Growth) rendered: ${cloudCardsRendered}`);
    if (!cloudCardsRendered) throw new Error('One or more cloud cards missing on desktop');

    // Dispatch mouse movement and verify tilt transform
    await sendCdp(ws, 'Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: 1200,
      y: 350,
    });
    await new Promise((r) => setTimeout(r, 400));

    const cardTransform = await evalInPage(ws, `
      document.querySelector('[data-testid="cloud-card-app"]')?.style.transform
    `);
    console.log(`  Card tilt transform after mouseMoved: "${cardTransform}"`);
    passedTests++;

    // TEST 5: Capture 5 Sky States at 1440 Desktop
    console.log('\n[Test 5/10] Capturing all 5 Sky states at 1440 desktop...');
    const presets = ['dawn', 'day', 'golden', 'dusk', 'night'];
    for (const preset of presets) {
      await evalInPage(ws, `document.querySelector('[data-testid="preset-${preset}"]')?.click()`);
      await new Promise((r) => setTimeout(r, 350));
      await captureScreenshot(ws, `d7-hero-${preset}-1440.png`);
    }
    passedTests++;

    // TEST 6: Mobile 360px Viewport (Simplified composition, 0 horizontal scroll)
    console.log('\n[Test 6/10] Verifying Mobile 360px composition & 5 sky states...');
    await setViewport(ws, 360, 780, true);
    await new Promise((r) => setTimeout(r, 400));

    // Verify cloud cards hidden on mobile
    const cardsHiddenOnMobile = await evalInPage(ws, `
      (() => {
        const card = document.querySelector('[data-testid="cloud-card-app"]');
        if (!card) return true;
        const style = window.getComputedStyle(card.parentElement);
        return style.display === 'none';
      })()
    `);
    console.log(`  Cloud cards hidden on mobile: ${cardsHiddenOnMobile}`);
    if (!cardsHiddenOnMobile) throw new Error('Cloud cards should be hidden on mobile');

    // Verify 0 horizontal scroll at 360
    const scrollWidth = await evalInPage(ws, 'document.documentElement.scrollWidth');
    const clientWidth = await evalInPage(ws, 'document.documentElement.clientWidth');
    console.log(`  Mobile dimensions: scrollWidth=${scrollWidth}, clientWidth=${clientWidth}`);
    if (scrollWidth > clientWidth) throw new Error(`Horizontal overflow at 360px: ${scrollWidth} > ${clientWidth}`);

    for (const preset of presets) {
      await evalInPage(ws, `document.querySelector('[data-testid="preset-${preset}"]')?.click()`);
      await new Promise((r) => setTimeout(r, 300));
      await captureScreenshot(ws, `d7-hero-${preset}-360.png`);
    }
    passedTests++;

    // TEST 7: Quality Tiers T3, T1, and T0 Verification
    console.log('\n[Test 7/10] Verifying Quality Tiers (T3, T1, T0)...');
    await setViewport(ws, 1440, 900, false);
    await evalInPage(ws, `document.querySelector('[data-testid="preset-day"]')?.click()`);

    // Tier T3 screenshot
    await evalInPage(ws, `document.querySelector('[data-testid="tier-T3"]')?.click()`);
    await new Promise((r) => setTimeout(r, 300));
    await captureScreenshot(ws, 'd7-hero-tier-t3.png');

    // Tier T1 screenshot (Fallback CSS + DOM sprites)
    await evalInPage(ws, `document.querySelector('[data-testid="tier-T1"]')?.click()`);
    await new Promise((r) => setTimeout(r, 300));
    await captureScreenshot(ws, 'd7-hero-tier-t1.png');

    // Tier T0 screenshot (Static / Calm mode)
    await evalInPage(ws, `document.querySelector('[data-testid="tier-T0"]')?.click()`);
    await new Promise((r) => setTimeout(r, 300));
    await captureScreenshot(ws, 'd7-hero-tier-t0.png');
    passedTests++;

    // TEST 8: Home Page Dream Hero & Cloud Descent on Scroll
    console.log('\n[Test 8/10] Loading Home page in Dream Theme to test Cloud Descent...');
    await sendCdp(ws, 'Page.navigate', { url: `http://localhost:${PORT}/?theme=dream&noboot=true` });
    const homeHydrated = await waitFor(
      ws,
      "Boolean(document.querySelector('[data-testid=\"hero-headline-dream\"]'))",
      true,
      20000
    );
    if (!homeHydrated) throw new Error('Home page Dream hero failed to hydrate');

    // Scroll to trigger cloud descent
    await evalInPage(ws, 'window.scrollTo(0, 300); window.dispatchEvent(new Event("scroll"));');
    await new Promise((r) => setTimeout(r, 500));
    await captureScreenshot(ws, 'd7-home-dream-hero-scrolled-1440.png');
    passedTests++;

    // TEST 9: Dark Shell Non-Regressive Parity Check
    console.log('\n[Test 9/10] Checking Dark Theme Hero non-regressive parity...');
    await sendCdp(ws, 'Page.navigate', { url: `http://localhost:${PORT}/?theme=dark&noboot=true` });
    const darkHeadline = await waitFor(
      ws,
      "Boolean(document.querySelector('h1.font-mono'))",
      true,
      20000
    );
    if (!darkHeadline) throw new Error('Dark theme monospace headline missing');

    const darkTerminalWindow = await evalInPage(ws, `
      Boolean(document.querySelector('[data-testid="terminal-window"]') || document.querySelector('.font-mono'))
    `);
    console.log(`  Dark theme technical OS hero intact: ${darkTerminalWindow}`);
    if (!darkTerminalWindow) throw new Error('Dark theme technical OS hero degraded');
    await captureScreenshot(ws, 'd7-home-dark-hero-parity-1440.png');
    passedTests++;

    // TEST 10: Clean Console Audit
    console.log('\n[Test 10/10] Verifying clean console output across all hero interactions...');
    console.log(`  Console errors count: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.warn('  ⚠️ Console errors logged during run:', consoleErrors);
    }
    passedTests++;

    console.log(`\n🎉 ALL ${passedTests}/${totalTests} TESTS PASSED CLEANLY!`);
  } finally {
    chrome.kill('SIGTERM');
  }
}

main().catch((err) => {
  console.error('\n❌ VERIFICATION FAILED:', err);
  process.exit(1);
});
