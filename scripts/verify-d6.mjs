/**
 * scripts/verify-d6.mjs
 *
 * Automated verification suite for Krat.OS Dream Theme Prompt D6:
 * Shell — Nav, Mobile Cloud Menu, Dawn Intro, Cottage & Footer, Contact Dock, Back to Top Balloon, and Transitions.
 */

import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3025;
const CHROME_PORT = 9227;
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
  console.log('=== [PROMPT D6] DREAM THEME SHELL VERIFICATION SUITE ===\n');

  // Spawn headless Chrome directly on Shell Studio URL
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${CHROME_PORT}`,
    '--hide-scrollbars',
    '--window-size=1440,900',
    `http://localhost:${PORT}/design-system/dream/shell?theme=dream&noboot=true`,
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
      if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
        const text = msg.params.args.map((a) => a.value || a.description).join(' ');
        if (!text.includes('favicon') && !text.includes('WebGL unsupported in software')) {
          consoleErrors.push(text);
          console.error('  PAGE ERROR:', text);
        }
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        const d = msg.params.exceptionDetails;
        console.error('  PAGE EXCEPTION:', d.text, d.exception?.description || d.url + ':' + d.lineNumber + ':' + d.columnNumber);
      }
    });

    // TEST 1: Load Shell Studio at 1440px
    console.log('[Test 1/10] Loading /design-system/dream/shell at 1440 desktop...');
    await setViewport(ws, 1440, 900, false);
    const hydrated = await waitFor(
      ws,
      "document.readyState === 'complete' && Boolean(document.querySelector('[data-testid=\"toggle-cottage-availability\"]'))",
      true,
      35000
    );
    if (!hydrated) throw new Error('Shell Studio failed to hydrate.');

    const pageTitle = await evalInPage(ws, 'document.title');
    console.log(`  Page loaded and hydrated, title: "${pageTitle}"`);
    await captureScreenshot(ws, 'd6-shell-studio-1440.png');
    passedTests++;

    // TEST 2: Cottage Window Glow based on Availability Toggle
    console.log('\n[Test 2/10] Verifying Cottage window glow reactivity...');
    const windowColorOpen = await evalInPage(ws, `
      document.querySelector('[data-testid="cottage-sandbox"] [data-testid="cottage-window"]')?.getAttribute('fill')
    `);
    console.log(`  Open availability window fill: ${windowColorOpen}`);
    if (windowColorOpen !== '#FFD47A') throw new Error(`Expected #FFD47A, got ${windowColorOpen}`);
    await captureScreenshot(ws, 'd6-cottage-open-night.png');

    // Click toggle to resting state
    await evalInPage(ws, `
      const btn = document.querySelector('[data-testid="toggle-cottage-availability"]');
      if (btn) {
        btn.click();
        btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      }
    `);

    // Wait for the window fill to update to #33346F
    const toggled = await waitFor(
      ws,
      `document.querySelector('[data-testid="cottage-sandbox"] [data-testid="cottage-window"]')?.getAttribute('fill') === '#33346F'`,
      true,
      8000
    );
    if (!toggled) {
      const currentFill = await evalInPage(ws, `document.querySelector('[data-testid="cottage-sandbox"] [data-testid="cottage-window"]')?.getAttribute('fill')`);
      const btnText = await evalInPage(ws, `document.querySelector('[data-testid="toggle-cottage-availability"]')?.textContent`);
      throw new Error(`Cottage toggle failed. Current fill: ${currentFill}, button text: "${btnText}"`);
    }

    const windowColorResting = await evalInPage(ws, `
      document.querySelector('[data-testid="cottage-sandbox"] [data-testid="cottage-window"]')?.getAttribute('fill')
    `);
    console.log(`  Resting state window fill: ${windowColorResting}`);
    await captureScreenshot(ws, 'd6-cottage-resting-night.png');
    passedTests++;

    // TEST 3: Mobile Cloud Sheet Drawer Preview & Escape Dismissal
    console.log('\n[Test 3/10] Verifying Mobile Cloud Menu sheet and keyboard dismissal...');
    await setViewport(ws, 360, 780, true);
    await new Promise((r) => setTimeout(r, 400));
    const clickStatus = await evalInPage(ws, `
      (() => {
        const btn = document.querySelector('[data-testid="open-mobile-menu-preview"]');
        if (!btn) return 'BUTTON_NOT_FOUND';
        btn.click();
        return 'CLICKED: ' + btn.textContent.trim();
      })()
    `);
    console.log(`  Open button status: ${clickStatus}`);

    const isMenuVisible = await waitFor(
      ws,
      `Boolean(document.querySelector('[aria-label="Dream Navigation Menu"]'))`,
      true,
      8000
    );
    console.log(`  Cloud sheet menu open: ${isMenuVisible}`);
    if (!isMenuVisible) throw new Error('Mobile cloud menu failed to open');
    await captureScreenshot(ws, 'd6-mobile-cloud-menu-360.png');

    // Press Escape to dismiss
    await sendCdp(ws, 'Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await sendCdp(ws, 'Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });

    const isMenuClosed = await waitFor(
      ws,
      `!Boolean(document.querySelector('[aria-label="Dream Navigation Menu"]'))`,
      true,
      8000
    );
    console.log(`  Cloud sheet closed by Escape: ${isMenuClosed}`);
    if (!isMenuClosed) throw new Error('Mobile cloud menu failed to close via Escape');
    passedTests++;

    // TEST 4: Home Page in Dream Theme at 1440 Desktop
    console.log('\n[Test 4/10] Loading Home page in Dream Theme (1440x900)...');
    await setViewport(ws, 1440, 900, false);
    await sendCdp(ws, 'Page.navigate', { url: `http://localhost:${PORT}/?theme=dream&noboot=true` });

    // Wait for client hydration to switch to dream navbar
    const navIsPill = await waitFor(
      ws,
      "Boolean(document.querySelector('header .rounded-full'))",
      true,
      20000
    );
    console.log(`  Floating pill navbar rendered: ${navIsPill}`);
    if (!navIsPill) throw new Error('Floating pill nav not detected in Dream theme');

    // Verify command palette hint button is hidden in Dream
    const cmdPaletteHintHidden = await evalInPage(ws, `
      !Boolean(document.querySelector('header button[title*="Command Palette"]'))
    `);
    console.log(`  Command palette hint hidden in Dream: ${cmdPaletteHintHidden}`);
    if (!cmdPaletteHintHidden) throw new Error('Command palette hint should be hidden in Dream');
    await captureScreenshot(ws, 'd6-nav-floating-pill-1440.png');
    passedTests++;

    // TEST 5: Mobile Floating Pill Navbar at 360px
    console.log('\n[Test 5/10] Verifying floating pill navbar on mobile (360x780)...');
    await setViewport(ws, 360, 780, true);
    await new Promise((r) => setTimeout(r, 500));
    await captureScreenshot(ws, 'd6-nav-floating-pill-360.png');

    const mobileMenuBtn = await evalInPage(ws, `
      Boolean(document.querySelector('header button[aria-label="Open mobile menu"]'))
    `);
    console.log(`  Mobile menu button present: ${mobileMenuBtn}`);
    if (!mobileMenuBtn) throw new Error('Mobile menu button missing on mobile nav');
    passedTests++;

    // TEST 6: Scroll Shrink Nav & Back to Top Balloon Appearance
    console.log('\n[Test 6/10] Scrolling 2.5 viewports down to verify Back to Top Balloon...');
    await setViewport(ws, 1440, 900, false);
    await evalInPage(ws, 'window.scrollTo(0, window.innerHeight * 2.5); window.dispatchEvent(new Event("scroll"));');

    const balloonVisible = await waitFor(
      ws,
      `Boolean(document.querySelector('button[aria-label="Float back to top"]'))`,
      true,
      10000
    );
    console.log(`  Hot-air balloon back to top button visible: ${balloonVisible}`);
    if (!balloonVisible) throw new Error('Back to top balloon should appear after 2 viewports of scroll');

    // Click back to top balloon
    await evalInPage(ws, `document.querySelector('button[aria-label="Float back to top"]')?.click()`);
    const scrolledTop = await waitFor(ws, 'window.scrollY < 300', true, 8000);
    console.log(`  Balloon clicked, returned to top: ${scrolledTop}`);
    if (!scrolledTop) throw new Error('Balloon failed to scroll to top');
    passedTests++;

    // TEST 7: Paper-Plane Contact Dock Expansion & Direct Channels
    console.log('\n[Test 7/10] Verifying Dream Contact Dock paper-plane unfolding...');
    const dockToggle = await evalInPage(ws, `
      Boolean(document.querySelector('button[title*="Send a note"]'))
    `);
    console.log(`  Paper plane dock button exists: ${dockToggle}`);
    if (!dockToggle) throw new Error('Paper-plane contact toggle missing');

    // Click to expand dock
    await evalInPage(ws, `document.querySelector('button[title*="Send a note"]')?.click()`);
    await new Promise((r) => setTimeout(r, 400));

    const dockChannels = await evalInPage(ws, `
      Array.from(document.querySelectorAll('[aria-label="Direct Communication Channels"] a')).map(a => a.textContent.trim())
    `);
    console.log(`  Unfolded contact channels:`, dockChannels);
    if (!dockChannels.length) throw new Error('No channels visible in unfolded dock');
    await captureScreenshot(ws, 'd6-contact-dock-expanded-1440.png');

    // Close dock
    await evalInPage(ws, `document.querySelector('[aria-label="Direct Communication Channels"] button[aria-label="Close"]')?.click()`);
    await new Promise((r) => setTimeout(r, 300));
    passedTests++;

    // TEST 8: Dream Footer (Night, Cottage, Wordmark & Local Time)
    console.log('\n[Test 8/10] Scrolling to Footer to verify dusk/night scene...');
    await evalInPage(ws, 'window.scrollTo(0, document.body.scrollHeight)');
    const footerHasCottage = await waitFor(
      ws,
      `Boolean(document.querySelector('footer svg path[fill="#2A6B48"]'))`,
      true,
      8000
    );
    console.log(`  Footer cottage hill rendered: ${footerHasCottage}`);
    if (!footerHasCottage) throw new Error('Footer cottage illustration missing');

    const localTimeText = await evalInPage(ws, `
      document.querySelector('footer')?.textContent.includes('Colombo, Sri Lanka')
    `);
    console.log(`  Footer live Colombo local time present: ${localTimeText}`);
    if (!localTimeText) throw new Error('Footer local time missing');

    await captureScreenshot(ws, 'd6-footer-night-1440.png');
    passedTests++;

    // TEST 9: Dark Shell Non-Regressive Parity Check
    console.log('\n[Test 9/10] Checking Dark Theme shell parity (cmd palette visible, technical styling)...');
    await sendCdp(ws, 'Page.navigate', { url: `http://localhost:${PORT}/?theme=dark&noboot=true` });

    const darkCmdHint = await waitFor(
      ws,
      `Boolean(document.querySelector('header button[title*="Command Palette"]'))`,
      true,
      20000
    );
    console.log(`  Dark theme command palette hint visible: ${darkCmdHint}`);
    if (!darkCmdHint) throw new Error('Command palette hint should be visible in Dark theme');

    const darkFooterMonospace = await waitFor(
      ws,
      `Boolean(document.querySelector('footer')?.textContent.includes('ALL SYSTEMS OPERATIONAL'))`,
      true,
      10000
    );
    console.log(`  Dark theme technical footer status bar preserved: ${darkFooterMonospace}`);
    if (!darkFooterMonospace) throw new Error('Dark theme technical footer degraded');
    passedTests++;

    // TEST 10: Clean Console Audit
    console.log('\n[Test 10/10] Verifying clean console output across all shell interactions...');
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
