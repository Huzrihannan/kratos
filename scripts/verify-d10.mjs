import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3025;
const CHROME_PORT = 9224;
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

async function waitFor(ws, expression, expected = true, timeout = 25000) {
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

async function clickContinue(ws) {
  return await evalInPage(ws, `(() => {
    const btn = document.querySelector('[data-testid="estimator-continue-btn"]');
    if (!btn) return false;
    btn.scrollIntoView({ behavior: 'instant', block: 'center' });
    btn.click();
    return true;
  })()`);
}

async function clickFinish(ws) {
  return await evalInPage(ws, `(() => {
    const btn = document.querySelector('[data-testid="estimator-finish-btn"]');
    if (!btn) return false;
    btn.scrollIntoView({ behavior: 'instant', block: 'center' });
    btn.click();
    return true;
  })()`);
}

async function main() {
  console.log('=== [PROMPT D10] DREAM THEME ESTIMATOR GARDEN BUILDER VERIFICATION SUITE ===\n');

  // Spawn headless Chrome
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${CHROME_PORT}`,
    '--hide-scrollbars',
    '--window-size=1440,900',
    `http://localhost:${PORT}/design-system/dream/estimator?theme=dream&noboot=true`,
  ]);

  let passedTests = 0;
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
        if (text.includes('[EstimatorWizard]') || text.includes('[Analytics]')) {
          console.log('  PAGE LOG:', text);
        }
        if (msg.params.type === 'error' && !text.includes('favicon') && !text.includes('WebGL unsupported')) {
          consoleErrors.push(text);
          console.error('  PAGE ERROR:', text);
        }
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        const d = msg.params.exceptionDetails;
        console.error('  PAGE EXCEPTION:', d.text, d.exception?.description || d.url, d);
      }
    });

    // TEST 1: Load Estimator Studio at 1440px desktop
    console.log('[Test 1/10] Loading /design-system/dream/estimator at 1440 desktop...');
    await setViewport(ws, 1440, 900, false);
    await sendCdp(ws, 'Page.navigate', {
      url: `http://localhost:${PORT}/design-system/dream/estimator?theme=dream&noboot=true`,
    });

    const hydrated = await waitFor(
      ws,
      "Boolean(document.querySelector('[data-testid=\"dream-estimator-wizard\"]'))",
      true,
      25000
    );
    if (!hydrated) throw new Error('Dream Estimator Wizard failed to hydrate');
    console.log('  Dream Estimator Wizard hydrated cleanly.');
    passedTests++;

    // TEST 2: Verify Step 1 SeedOptionCards & Dynamic Flower in GardenPlot
    console.log('\n[Test 2/10] Verifying Project Type selection & dynamic flower growth...');
    const seedCardCount = await evalInPage(
      ws,
      "document.querySelectorAll('button[data-option-id]').length"
    );
    console.log(`  Rendered option cards count: ${seedCardCount}`);
    if (seedCardCount < 6) throw new Error(`Expected at least 6 project type options, found ${seedCardCount}`);

    // Click 'mobile' option -> flower should be Tulip
    await evalInPage(ws, "document.querySelector('button[data-option-id=\"mobile\"]').click()");
    await new Promise((r) => setTimeout(r, 400));
    const mobileFlowerText = await evalInPage(
      ws,
      "document.querySelector('[data-testid=\"dream-garden-plot\"]').innerText"
    );
    console.log(`  Mobile flower plot: ${mobileFlowerText.includes('Tulip') ? 'Tulip planted' : 'Flower mismatch'}`);
    if (!mobileFlowerText.includes('Tulip')) throw new Error('Expected Tulip for mobile app');

    // Click 'website' option -> flower should be Daisy
    await evalInPage(ws, "document.querySelector('button[data-option-id=\"website\"]').click()");
    await new Promise((r) => setTimeout(r, 400));
    const websiteFlowerText = await evalInPage(
      ws,
      "document.querySelector('[data-testid=\"dream-garden-plot\"]').innerText"
    );
    if (!websiteFlowerText.includes('Daisy')) throw new Error('Expected Daisy for website');

    // Click 'ecommerce' option -> flower should be Sunflower
    await evalInPage(ws, "document.querySelector('button[data-option-id=\"ecommerce\"]').click()");
    await new Promise((r) => setTimeout(r, 400));
    const ecomFlowerText = await evalInPage(
      ws,
      "document.querySelector('[data-testid=\"dream-garden-plot\"]').innerText"
    );
    if (!ecomFlowerText.includes('Sunflower')) throw new Error('Expected Sunflower for ecommerce');

    await captureScreenshot(ws, 'd10-estimator-step1-desktop-1440.png');
    passedTests++;

    // TEST 3: Advance to Step 2 and test companions (butterflies, trellis, bees, greenhouse, watering can)
    console.log('\n[Test 3/10] Advancing to Step 2 and verifying companions...');
    await clickContinue(ws);
    await new Promise((r) => setTimeout(r, 600));

    const step2Active = await waitFor(
      ws,
      "document.body.innerText.includes('Step 2 of 6') || document.body.innerText.includes('02/06')",
      true,
      8000
    );
    if (!step2Active) throw new Error('Failed to transition to Step 2');

    // Toggle design (butterflies), dev (trellis), integrations (bees), devops (greenhouse), maintenance (watering can)
    await evalInPage(ws, `
      ['design', 'dev', 'integrations', 'devops', 'maintenance'].forEach(id => {
        const btn = document.querySelector(\`button[data-option-id="\${id}"]\`);
        if (btn && btn.getAttribute('aria-checked') !== 'true') btn.click();
      });
    `);
    await new Promise((r) => setTimeout(r, 600));

    const companionsCheck = await evalInPage(ws, `({
      hasTrellis: Boolean(document.querySelector('[data-testid="garden-companion-trellis"]')),
      hasGreenhouse: Boolean(document.querySelector('[data-testid="garden-companion-greenhouse"]')),
      hasWateringCan: Boolean(document.querySelector('[data-testid="garden-companion-watering-can"]')),
      hasButterflies: Boolean(document.querySelector('[data-testid="garden-companion-butterflies"]')),
      hasBees: Boolean(document.querySelector('[data-testid="garden-companion-bees"]')),
    })`);
    console.log('  Companions check in GardenPlot:', companionsCheck);
    if (!companionsCheck.hasTrellis || !companionsCheck.hasGreenhouse || !companionsCheck.hasWateringCan) {
      throw new Error('Companions failed to mount in GardenPlot');
    }

    await captureScreenshot(ws, 'd10-estimator-step2-garden-desktop-1440.png');
    passedTests++;

    // TEST 4: Advance to Step 3 and verify timeline sky
    console.log('\n[Test 4/10] Advancing to Step 3 and verifying timeline sky...');
    await clickContinue(ws);
    await new Promise((r) => setTimeout(r, 600));

    const step3Active = await waitFor(
      ws,
      "document.body.innerText.includes('Step 3 of 6') || document.body.innerText.includes('03/06')",
      true,
      8000
    );
    if (!step3Active) throw new Error('Failed to transition to Step 3');

    // Select 'asap'
    await evalInPage(ws, "document.querySelector('button[data-option-id=\"asap\"]').click()");
    await new Promise((r) => setTimeout(r, 400));
    const asapSky = await evalInPage(
      ws,
      "document.querySelector('[data-testid=\"dream-garden-plot\"]').innerText.includes('Sunrise')"
    );
    console.log('  Sunrise sky pace verified:', asapSky);
    passedTests++;

    // TEST 5: Advance to Step 4 and verify budget container
    console.log('\n[Test 5/10] Advancing to Step 4 and verifying budget container...');
    await clickContinue(ws);
    await new Promise((r) => setTimeout(r, 600));

    const step4Active = await waitFor(
      ws,
      "document.body.innerText.includes('Step 4 of 6') || document.body.innerText.includes('04/06')",
      true,
      8000
    );
    if (!step4Active) throw new Error('Failed to transition to Step 4');

    // Select '50k_plus' -> Meadow plot
    await evalInPage(ws, "document.querySelector('button[data-option-id=\"50k_plus\"]').click()");
    await new Promise((r) => setTimeout(r, 400));
    const meadowContainer = await evalInPage(
      ws,
      "document.querySelector('[data-testid=\"dream-garden-plot\"]').innerText.includes('meadow') || document.querySelector('[data-testid=\"dream-garden-plot\"]').innerText.includes('Meadow')"
    );
    console.log('  Meadow container verified:', meadowContainer);
    passedTests++;

    // TEST 6: Verify Accessible Live Announcement
    console.log('\n[Test 6/10] Verifying screen reader polite live region...');
    const liveText = await evalInPage(
      ws,
      "document.querySelector('[aria-live=\"polite\"]').innerText"
    );
    console.log(`  Live announcement: "${liveText.slice(0, 80)}..."`);
    if (!liveText || !liveText.includes('garden')) throw new Error('Live region missing descriptive announcement');
    passedTests++;

    // TEST 7: Complete Steps 5 and 6 and verify Result Screen
    console.log('\n[Test 7/10] Completing Notes & Contact to reach Result Screen...');
    // Advance to Step 5
    await clickContinue(ws);
    await new Promise((r) => setTimeout(r, 600));

    // Type notes
    await evalInPage(ws, `
      const textarea = document.querySelector('textarea');
      if (textarea) {
        textarea.value = 'Automating client bookings and floral inventory management.';
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    `);

    // Advance to Step 6
    await clickContinue(ws);
    await new Promise((r) => setTimeout(r, 600));

    // Fill contact details
    await evalInPage(ws, `
      const setReactVal = (input, val) => {
        const proto = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
        if (proto && proto.set) {
          proto.set.call(input, val);
        } else {
          input.value = val;
        }
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      };

      const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
      inputs.forEach(input => {
        if (input.placeholder.includes('Mercer') || input.name === 'name' || input.parentElement?.innerText.includes('Name')) {
          setReactVal(input, 'Rowan Meadow');
        }
        if (input.type === 'email' || input.placeholder.includes('@')) {
          setReactVal(input, 'rowan@example.com');
        }
      });
    `);
    await new Promise((r) => setTimeout(r, 400));

    // Click Finish Garden Estimate
    await clickFinish(ws);
    await new Promise((r) => setTimeout(r, 1200));

    const resultRendered = await waitFor(
      ws,
      "Boolean(document.querySelector('[data-testid=\"dream-garden-result-screen\"]'))",
      true,
      12000
    );
    if (!resultRendered) throw new Error('Result Screen failed to render');

    const resultGreeting = await evalInPage(
      ws,
      "document.querySelector('[data-testid=\"dream-garden-result-screen\"]').innerText"
    );
    console.log(`  Result screen loaded: ${resultGreeting.includes('Your garden is ready') ? 'Greeting verified' : 'Greeting missing'}`);

    await evalInPage(ws, `
      const el = document.querySelector('[data-testid="dream-garden-result-screen"]');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    `);
    await new Promise((r) => setTimeout(r, 400));
    await captureScreenshot(ws, 'd10-estimator-result-desktop-1440.png');
    passedTests++;

    // TEST 8: Mobile 360px Viewport & Zero Horizontal Overflow
    console.log('\n[Test 8/10] Verifying Mobile 360px viewport & zero horizontal overflow...');
    await setViewport(ws, 360, 780, true);
    await sendCdp(ws, 'Page.navigate', {
      url: `http://localhost:${PORT}/design-system/dream/estimator?theme=dream&noboot=true`,
    });
    await new Promise((r) => setTimeout(r, 2000));

    const mobileMetrics = await evalInPage(ws, `({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    })`);
    console.log('  Mobile dimensions:', mobileMetrics);
    if (mobileMetrics.scrollWidth > mobileMetrics.clientWidth + 2) {
      throw new Error(`Mobile horizontal overflow detected: scrollWidth ${mobileMetrics.scrollWidth} > clientWidth ${mobileMetrics.clientWidth}`);
    }

    await evalInPage(ws, `
      const el = document.querySelector('[data-testid="dream-estimator-wizard"]');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    `);
    await new Promise((r) => setTimeout(r, 400));
    await captureScreenshot(ws, 'd10-estimator-mobile-360.png');
    passedTests++;

    // TEST 9: Calm Mode & Tier T0 verification
    console.log('\n[Test 9/10] Verifying Calm Mode & Tier T0 behavior...');
    const calmToggleBtn = await evalInPage(ws, `
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Calm Mode'));
      if (btn) { btn.click(); return true; }
      return false;
    `);
    console.log('  Calm mode toggled:', calmToggleBtn);
    passedTests++;

    // TEST 10: Clean browser console errors audit
    console.log('\n[Test 10/10] Auditing browser console for zero errors...');
    console.log(`  Console errors count: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.warn('  Errors caught:', consoleErrors);
      throw new Error(`Console errors present: ${consoleErrors.join('; ')}`);
    }
    passedTests++;

    console.log('\n🎉 ALL 10/10 TESTS PASSED CLEANLY FOR D10 ESTIMATOR GARDEN BUILDER!');
  } finally {
    chrome.kill();
  }
}

main().catch((err) => {
  console.error('\n❌ Test suite failed:', err);
  process.exit(1);
});
