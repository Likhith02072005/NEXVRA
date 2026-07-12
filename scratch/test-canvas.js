const { chromium } = require('playwright');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`[CONSOLE ${msg.type().toUpperCase()}]:`, msg.text());
  });

  page.on('pageerror', err => {
    console.log('[PAGE ERROR]:', err.stack || err.message);
  });

  page.on('requestfailed', request => {
    console.log('[REQUEST FAILED]:', request.url(), request.failure().errorText);
  });

  console.log('Navigating to https://nexvra.in ...');
  try {
    await page.goto('https://nexvra.in', { waitUntil: 'load', timeout: 30000 });
    console.log('Navigation complete. Waiting 5 seconds...');
    await page.waitForTimeout(5000);
  } catch (err) {
    console.error('Navigation error:', err);
  }

  await browser.close();
  console.log('Browser closed.');
})();
