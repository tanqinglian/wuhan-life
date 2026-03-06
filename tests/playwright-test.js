const { chromium } = require('playwright');

async function testWuhanLife() {
  console.log('[TEST] Starting wuhan-life Playwright tests...');
  
  // Try system Chrome first
  let browser;
  try {
    browser = await chromium.launch({ 
      headless: true,
      channel: 'msedge' // Try Edge instead
    });
  } catch (e) {
    console.log('[WARN] Edge not available, trying firefox...');
    try {
      browser = await chromium.launch({ headless: true });
    } catch (e2) {
      console.log('[ERROR] No browser available');
      console.log('[INFO] Run: npx playwright install chromium');
      process.exit(1);
    }
  }
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const results = [];
  
  try {
    // Test 1: Homepage
    console.log('\n[TEST 1] Testing homepage...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    const homeTitle = await page.title();
    console.log(`  Title: ${homeTitle}`);
    results.push({ test: 'Homepage', status: 'PASS', title: homeTitle });
    
    // Test 2: Markets page
    console.log('\n[TEST 2] Testing markets page...');
    await page.goto('http://localhost:3000/markets', { waitUntil: 'networkidle' });
    const marketsTitle = await page.title();
    console.log(`  Title: ${marketsTitle}`);
    
    // Count market cards
    const marketCards = await page.locator('a[href^="/markets/"]').count();
    console.log(`  Market cards found: ${marketCards}`);
    
    // Check for district tabs
    const districtTabs = await page.locator('button').count();
    console.log(`  Buttons found: ${districtTabs}`);
    
    results.push({ 
      test: 'Markets Page', 
      status: marketCards > 0 ? 'PASS' : 'WARN', 
      cards: marketCards 
    });
    
    // Test 3: Click first market detail
    if (marketCards > 0) {
      console.log('\n[TEST 3] Testing market detail page...');
      const firstMarket = await page.locator('a[href^="/markets/"]').first();
      const marketName = await firstMarket.textContent();
      console.log(`  Clicking: ${marketName?.trim()}`);
      
      await firstMarket.click();
      await page.waitForLoadState('networkidle');
      
      const detailTitle = await page.title();
      console.log(`  Detail title: ${detailTitle}`);
      
      // Check for map
      const mapContainer = await page.locator('.leaflet-container').count();
      console.log(`  Map found: ${mapContainer > 0 ? 'YES' : 'NO'}`);
      
      results.push({ 
        test: 'Market Detail', 
        status: 'PASS', 
        name: marketName?.trim(),
        hasMap: mapContainer > 0
      });
    }
    
    // Test 4: Routes page
    console.log('\n[TEST 4] Testing routes page...');
    await page.goto('http://localhost:3000/routes', { waitUntil: 'networkidle' });
    const routesTitle = await page.title();
    console.log(`  Title: ${routesTitle}`);
    
    const routeCards = await page.locator('a[href^="/routes/"]').count();
    console.log(`  Route cards found: ${routeCards}`);
    
    results.push({ 
      test: 'Routes Page', 
      status: routeCards > 0 ? 'PASS' : 'WARN', 
      cards: routeCards 
    });
    
    // Test 5: Click first route detail
    if (routeCards > 0) {
      console.log('\n[TEST 5] Testing route detail page...');
      const firstRoute = await page.locator('a[href^="/routes/"]').first();
      const routeName = await firstRoute.textContent();
      console.log(`  Clicking: ${routeName?.trim()}`);
      
      await firstRoute.click();
      await page.waitForLoadState('networkidle');
      
      const detailTitle = await page.title();
      console.log(`  Detail title: ${detailTitle}`);
      
      // Check for tabs
      const tabs = await page.locator('button').count();
      console.log(`  Tabs found: ${tabs}`);
      
      // Check for map
      const mapContainer = await page.locator('.leaflet-container').count();
      console.log(`  Map found: ${mapContainer > 0 ? 'YES' : 'NO'}`);
      
      results.push({ 
        test: 'Route Detail', 
        status: 'PASS', 
        name: routeName?.trim(),
        hasMap: mapContainer > 0
      });
    }
    
    // Test 6: Search functionality
    console.log('\n[TEST 6] Testing search...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    const searchInput = await page.locator('input[type="text"], input[placeholder*="搜索"]').count();
    console.log(`  Search input found: ${searchInput > 0 ? 'YES' : 'NO'}`);
    
    results.push({ 
      test: 'Search Input', 
      status: searchInput > 0 ? 'PASS' : 'WARN'
    });
    
    // Test 7: Check console errors
    console.log('\n[TEST 7] Checking console errors...');
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('http://localhost:3000/markets', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    console.log(`  Console errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach(err => console.log(`    - ${err}`));
    }
    
    results.push({ 
      test: 'Console Errors', 
      status: consoleErrors.length === 0 ? 'PASS' : 'WARN',
      errors: consoleErrors.length
    });
    
  } catch (error) {
    console.error('\n[ERROR]', error.message);
    results.push({ test: 'Error', status: 'FAIL', error: error.message });
  } finally {
    await browser.close();
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('TEST SUMMARY');
  console.log('='.repeat(50));
  
  const passed = results.filter(r => r.status === 'PASS').length;
  const warned = results.filter(r => r.status === 'WARN').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  
  results.forEach(r => {
    const icon = r.status === 'PASS' ? '[OK]' : r.status === 'WARN' ? '[WARN]' : '[FAIL]';
    console.log(`${icon} ${r.test}: ${JSON.stringify(r)}`);
  });
  
  console.log('\n' + '-'.repeat(50));
  console.log(`Total: ${results.length} tests`);
  console.log(`Passed: ${passed}, Warnings: ${warned}, Failed: ${failed}`);
  console.log('='.repeat(50));
  
  return { passed, warned, failed, results };
}

testWuhanLife().catch(console.error);
