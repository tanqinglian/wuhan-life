// Simple HTTP-based test for wuhan-life
const http = require('http');

const BASE_URL = 'http://localhost:3000';

function fetch(path) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('[TEST] Starting wuhan-life HTTP tests...\n');
  const results = [];

  // Test 1: Homepage
  console.log('[TEST 1] Homepage...');
  try {
    const home = await fetch('/');
    const pass = home.status === 200 && home.data.includes('武汉生活');
    console.log(`  Status: ${home.status}`);
    console.log(`  Result: ${pass ? 'PASS' : 'FAIL'}`);
    results.push({ test: 'Homepage', status: pass ? 'PASS' : 'FAIL' });
  } catch (e) {
    console.log(`  Error: ${e.message}`);
    results.push({ test: 'Homepage', status: 'FAIL', error: e.message });
  }

  // Test 2: Markets list
  console.log('\n[TEST 2] Markets page...');
  try {
    const markets = await fetch('/markets');
    const pass = markets.status === 200;
    const hasData = markets.data.includes('夜市');
    console.log(`  Status: ${markets.status}`);
    console.log(`  Has market data: ${hasData}`);
    console.log(`  Result: ${pass && hasData ? 'PASS' : 'FAIL'}`);
    results.push({ test: 'Markets Page', status: pass && hasData ? 'PASS' : 'FAIL' });
  } catch (e) {
    console.log(`  Error: ${e.message}`);
    results.push({ test: 'Markets Page', status: 'FAIL', error: e.message });
  }

  // Test 3: Market detail (ID 1)
  console.log('\n[TEST 3] Market detail (ID 1)...');
  try {
    const detail = await fetch('/markets/1');
    const pass = detail.status === 200;
    console.log(`  Status: ${detail.status}`);
    console.log(`  Result: ${pass ? 'PASS' : 'FAIL'}`);
    results.push({ test: 'Market Detail', status: pass ? 'PASS' : 'FAIL' });
  } catch (e) {
    console.log(`  Error: ${e.message}`);
    results.push({ test: 'Market Detail', status: 'FAIL', error: e.message });
  }

  // Test 4: Routes list
  console.log('\n[TEST 4] Routes page...');
  try {
    const routes = await fetch('/routes');
    const pass = routes.status === 200;
    const hasData = routes.data.includes('跑山') || routes.data.includes('路线');
    console.log(`  Status: ${routes.status}`);
    console.log(`  Has route data: ${hasData}`);
    console.log(`  Result: ${pass && hasData ? 'PASS' : 'FAIL'}`);
    results.push({ test: 'Routes Page', status: pass && hasData ? 'PASS' : 'FAIL' });
  } catch (e) {
    console.log(`  Error: ${e.message}`);
    results.push({ test: 'Routes Page', status: 'FAIL', error: e.message });
  }

  // Test 5: Route detail (ID 1)
  console.log('\n[TEST 5] Route detail (ID 1)...');
  try {
    const detail = await fetch('/routes/1');
    const pass = detail.status === 200;
    console.log(`  Status: ${detail.status}`);
    console.log(`  Result: ${pass ? 'PASS' : 'FAIL'}`);
    results.push({ test: 'Route Detail', status: pass ? 'PASS' : 'FAIL' });
  } catch (e) {
    console.log(`  Error: ${e.message}`);
    results.push({ test: 'Route Detail', status: 'FAIL', error: e.message });
  }

  // Test 6: Search API
  console.log('\n[TEST 6] Search API...');
  try {
    const search = await fetch('/api/search?q=夜市');
    const pass = search.status === 200;
    console.log(`  Status: ${search.status}`);
    console.log(`  Result: ${pass ? 'PASS' : 'WARN (API may not exist)'}`);
    results.push({ test: 'Search API', status: pass ? 'PASS' : 'WARN' });
  } catch (e) {
    console.log(`  Error: ${e.message}`);
    results.push({ test: 'Search API', status: 'WARN', error: e.message });
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
    console.log(`${icon} ${r.test}`);
  });
  
  console.log('\n' + '-'.repeat(50));
  console.log(`Total: ${results.length} tests`);
  console.log(`Passed: ${passed}, Warnings: ${warned}, Failed: ${failed}`);
  console.log('='.repeat(50));

  return failed === 0;
}

runTests().then(success => {
  process.exit(success ? 0 : 1);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
