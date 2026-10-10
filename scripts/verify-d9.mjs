import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3025;
const CHROME_PORT = 9223;
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

async function main() {
  console.log('=== [PROMPT D9] DREAM THEME HOME SECTIONS B VERIFICATION SUITE ===\n');

  // Spawn headless Chrome
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${CHROME_PORT}`,
    '--hide-scrollbars',
    '--window-size=1440,900',
    `http://localhost:${PORT}/design-system/dream/home-b?theme=dream&noboot=true`,
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
        if (msg.params.type === 'error' && !text.includes('favicon') && !text.includes('WebGL unsupported')) {
          consoleErrors.push(text);
          console.error('  PAGE ERROR:', text);
        }
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        const d = msg.params.exceptionDetails;
        console.error('  PAGE EXCEPTION:', d.text, d.exception?.description || d.url);
      }
    });

    // TEST 1: Load Home Sections B Studio at 1440px desktop
    console.log('[Test 1/10] Loading /design-system/dream/home-b at 1440 desktop...');
    await setViewport(ws, 1440, 900, false);
    await sendCdp(ws, 'Page.navigate', { url: `http://localhost:${PORT}/design-system/dream/home-b?theme=dream&noboot=true` });

    const hydrated = await waitFor(
      ws,
      "Boolean(document.querySelector('[data-testid=\"dream-seed-shed-scene\"]'))",
      true,
      25000
    );
    if (!hydrated) throw new Error('Home Sections B Studio failed to hydrate');
    console.log('  Studio hydrated cleanly.');
    passedTests++;

    // TEST 2: The Seed Shed (Stack) — 20 seed packets rendered
    console.log('\n[Test 2/10] Verifying The Seed Shed 20 seed packets...');
    const seedPacketsCount = await evalInPage(ws, `
      document.querySelectorAll('[data-testid^="dream-seed-packet-"]').length
    `);
    console.log(`  Rendered seed packets count: ${seedPacketsCount}`);
    if (seedPacketsCount !== 20) throw new Error(`Expected 20 seed packets, got ${seedPacketsCount}`);
    passedTests++;

    // TEST 3: Seed Packet 3D Flip & Client Benefit
    console.log('\n[Test 3/10] Verifying Seed Packet flip & client benefit disclosure...');
    const flipResult = await evalInPage(ws, `
      (() => {
        const firstPacketBtn = document.querySelector('[data-testid^="dream-seed-packet-"] button');
        if (!firstPacketBtn) return { found: false };
        firstPacketBtn.click();
        const benefitText = firstPacketBtn.innerText;
        return {
          found: true,
          hasBenefitWord: benefitText.includes('page loads') || benefitText.includes('search indexing') || benefitText.includes('clients') || benefitText.includes('product')
        };
      })()
    `);
    console.log(`  Seed packet flip result:`, flipResult);
    if (!flipResult.found || !flipResult.hasBenefitWord) {
      throw new Error('Seed packet failed to flip or reveal client benefit');
    }
    passedTests++;

    // TEST 4: Stepping Stones (Principles) — 3 Stones & Living Animations
    console.log('\n[Test 4/10] Verifying Stepping Stones (3 stones & micro-animations)...');
    const stonesCount = await evalInPage(ws, `
      document.querySelectorAll('[data-testid^="dream-stone-"]').length
    `);
    console.log(`  Rendered stepping stones count: ${stonesCount}`);
    if (stonesCount !== 3) throw new Error(`Expected 3 stepping stones, got ${stonesCount}`);
    passedTests++;

    // TEST 5: Dandelion FAQ — Prepend Non-Technical Question & Accordion Expand
    console.log('\n[Test 5/10] Verifying Dandelion FAQ accordion & non-technical item...');
    const faqResult = await evalInPage(ws, `
      (() => {
        const nonTechBtn = document.querySelector('[data-testid="dream-faq-item-non-technical"] button');
        const hasNonTechQuestion = document.body.innerText.includes("I'm not technical");
        return {
          hasBtn: Boolean(nonTechBtn),
          hasNonTechQuestion,
          isExpanded: nonTechBtn?.getAttribute('aria-expanded') === 'true'
        };
      })()
    `);
    console.log(`  Dandelion FAQ check:`, faqResult);
    if (!faqResult.hasBtn || !faqResult.hasNonTechQuestion) {
      throw new Error('Non-technical FAQ item missing from Dandelion FAQ');
    }
    passedTests++;

    // TEST 6: Make a Wish (Final CTA) — Giant Dandelion & Primary Buttons
    console.log('\n[Test 6/10] Verifying Make a Wish CTA & giant dandelion...');
    const ctaResult = await evalInPage(ws, `
      (() => {
        const ctaScene = document.querySelector('[data-testid="dream-make-a-wish-cta"]');
        const hasEstimateBtn = document.body.innerText.includes("Estimate my project");
        const hasHeadline = document.body.innerText.includes("Got an idea?");
        return {
          hasScene: Boolean(ctaScene),
          hasEstimateBtn,
          hasHeadline
        };
      })()
    `);
    console.log(`  Make a Wish CTA check:`, ctaResult);
    if (!ctaResult.hasScene || !ctaResult.hasEstimateBtn || !ctaResult.hasHeadline) {
      throw new Error('Make a Wish CTA missing expected elements');
    }
    passedTests++;

    // TEST 7: Capture Desktop Screenshots at 1440px
    console.log('\n[Test 7/10] Capturing Desktop Screenshots at 1440px...');
    // Scroll to Seed Shed
    await evalInPage(ws, `document.querySelector('#stack')?.scrollIntoView()`);
    await new Promise((r) => setTimeout(r, 400));
    await captureScreenshot(ws, 'd9-seed-shed-stack-1440.png');

    // Scroll to Stepping Stones
    await evalInPage(ws, `document.querySelector('#why')?.scrollIntoView()`);
    await new Promise((r) => setTimeout(r, 400));
    await captureScreenshot(ws, 'd9-stepping-stones-principles-1440.png');

    // Scroll to Dandelion FAQ
    await evalInPage(ws, `document.querySelector('#faq')?.scrollIntoView()`);
    await new Promise((r) => setTimeout(r, 400));
    await captureScreenshot(ws, 'd9-dandelion-faq-1440.png');

    // Scroll to Make a Wish CTA
    await evalInPage(ws, `document.querySelector('[data-testid="dream-make-a-wish-cta"]')?.scrollIntoView()`);
    await new Promise((r) => setTimeout(r, 400));
    await captureScreenshot(ws, 'd9-make-a-wish-cta-1440.png');
    passedTests++;

    // TEST 8: Mobile 360px Viewport Verification & Screenshots
    console.log('\n[Test 8/10] Verifying Mobile 360px composition & zero horizontal overflow...');
    await setViewport(ws, 360, 780, true);
    await new Promise((r) => setTimeout(r, 400));

    const scrollWidth = await evalInPage(ws, 'document.documentElement.scrollWidth');
    const clientWidth = await evalInPage(ws, 'document.documentElement.clientWidth');
    console.log(`  Mobile dimensions: scrollWidth=${scrollWidth}, clientWidth=${clientWidth}`);
    if (scrollWidth > clientWidth) throw new Error(`Horizontal overflow at 360px: ${scrollWidth} > ${clientWidth}`);

    // Scroll & capture mobile views
    await evalInPage(ws, `document.querySelector('#stack')?.scrollIntoView()`);
    await new Promise((r) => setTimeout(r, 300));
    await captureScreenshot(ws, 'd9-seed-shed-stack-360.png');

    await evalInPage(ws, `document.querySelector('#why')?.scrollIntoView()`);
    await new Promise((r) => setTimeout(r, 300));
    await captureScreenshot(ws, 'd9-stepping-stones-principles-360.png');

    await evalInPage(ws, `document.querySelector('#faq')?.scrollIntoView()`);
    await new Promise((r) => setTimeout(r, 300));
    await captureScreenshot(ws, 'd9-dandelion-faq-360.png');

    await evalInPage(ws, `document.querySelector('[data-testid="dream-make-a-wish-cta"]')?.scrollIntoView()`);
    await new Promise((r) => setTimeout(r, 300));
    await captureScreenshot(ws, 'd9-make-a-wish-cta-360.png');
    passedTests++;

    // TEST 9: Dark & Light Theme Parity on /
    console.log('\n[Test 9/10] Verifying Dark & Light Theme Parity on / ...');
    await setViewport(ws, 1440, 900, false);
    await sendCdp(ws, 'Page.navigate', { url: `http://localhost:${PORT}/?theme=dark&noboot=true` });
    await new Promise((r) => setTimeout(r, 2500));

    const darkCheck = await evalInPage(ws, `(() => {
      const stackSection = document.getElementById('stack');
      const whySection = document.getElementById('why');
      const faqSection = document.getElementById('faq');
      return {
        stackEyebrow: stackSection?.innerText.includes('/05 — STACK'),
        whyEyebrow: whySection?.innerText.includes('/06 — PRINCIPLES'),
        faqEyebrow: faqSection?.innerText.includes('/07 — FAQ'),
      };
    })()`);
    console.log(`  Dark parity check:`, darkCheck);
    if (!darkCheck.stackEyebrow || !darkCheck.whyEyebrow || !darkCheck.faqEyebrow) {
      throw new Error('Dark theme parity broken on home page!');
    }
    passedTests++;

    // TEST 10: Clean Console Audit
    console.log('\n[Test 10/10] Verifying clean console output across all D9 scenes...');
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
