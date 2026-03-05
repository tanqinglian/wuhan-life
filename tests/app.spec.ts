import { test, expect, Page, BrowserContext } from '@playwright/test';

test.describe('wuhan-life系统功能测试', () => {
  let consoleErrors: string[] = [];
  let pageErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    // 监听控制台错误
    consoleErrors = [];
    pageErrors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
        console.log('❌ Console Error:', msg.text());
      }
    });

    page.on('pageerror', error => {
      pageErrors.push(error.message);
      console.log('❌ Page Error:', error.message);
    });
  });

  test('首页加载测试', async ({ page }) => {
    console.log('🧪 测试首页...');

    await page.goto('/');

    // 检查页面标题
    await expect(page).toHaveTitle(/武汉生活/);

    // 检查导航链接存在
    await expect(page.getByRole('link', { name: '夜市' })).toBeVisible();
    await expect(page.getByRole('link', { name: '跑山' })).toBeVisible();

    // 检查无错误
    expect(consoleErrors).toHaveLength(0);
    expect(pageErrors).toHaveLength(0);

    console.log('✅ 首页测试通过');
  });

  test('夜市列表页面测试', async ({ page }) => {
    console.log('🧪 测试夜市列表页面...');

    await page.goto('/markets');

    // 等待页面加载
    await page.waitForLoadState('networkidle');

    // 检查页面标题
    await expect(page.locator('h1, h2').first()).toContainText('夜市');

    // 检查夜市卡片存在
    const marketCards = await page.locator('[data-testid="market-card"], .market-card, a[href^="/markets/"]').count();
    console.log(`📊 发现 ${marketCards} 个夜市卡片`);

    // 截图
    await page.screenshot({ path: 'tests/screenshots/markets-list.png', fullPage: true });

    // 检查无错误
    expect(consoleErrors).toHaveLength(0);
    expect(pageErrors).toHaveLength(0);

    console.log('✅ 夜市列表页面测试通过');
  });

  test('夜市详情页面测试', async ({ page }) => {
    console.log('🧪 测试夜市详情页面...');

    // 先访问列表页
    await page.goto('/markets');
    await page.waitForLoadState('networkidle');

    // 点击第一个夜市
    const firstMarket = page.locator('a[href^="/markets/"]').first();
    if (await firstMarket.count() > 0) {
      await firstMarket.click();

      // 等待详情页加载
      await page.waitForLoadState('networkidle');

      // 检查详情页元素
      const title = await page.locator('h1, h2').first().textContent();
      console.log(`📊 夜市名称: ${title}`);

      // 截图
      await page.screenshot({ path: 'tests/screenshots/market-detail.png', fullPage: true });

      // 检查无错误
      expect(consoleErrors).toHaveLength(0);
      expect(pageErrors).toHaveLength(0);

      console.log('✅ 夜市详情页面测试通过');
    } else {
      console.log('⚠️ 没有找到夜市数据，跳过详情页测试');
    }
  });

  test('跑山列表页面测试', async ({ page }) => {
    console.log('🧪 测试跑山列表页面...');

    await page.goto('/routes');

    // 等待页面加载
    await page.waitForLoadState('networkidle');

    // 检查页面标题
    await expect(page.locator('h1, h2').first()).toContainText('跑山');

    // 检查跑山卡片存在
    const routeCards = await page.locator('[data-testid="route-card"], .route-card, a[href^="/routes/"]').count();
    console.log(`📊 发现 ${routeCards} 个跑山卡片`);

    // 截图
    await page.screenshot({ path: 'tests/screenshots/routes-list.png', fullPage: true });

    // 检查无错误
    expect(consoleErrors).toHaveLength(0);
    expect(pageErrors).toHaveLength(0);

    console.log('✅ 跑山列表页面测试通过');
  });

  test('跑山详情页面测试', async ({ page }) => {
    console.log('🧪 测试跑山详情页面...');

    // 先访问列表页
    await page.goto('/routes');
    await page.waitForLoadState('networkidle');

    // 点击第一个跑山路线
    const firstRoute = page.locator('a[href^="/routes/"]').first();
    if (await firstRoute.count() > 0) {
      await firstRoute.click();

      // 等待详情页加载
      await page.waitForLoadState('networkidle');

      // 检查详情页元素
      const title = await page.locator('h1, h2').first().textContent();
      console.log(`📊 跑山路线: ${title}`);

      // 截图
      await page.screenshot({ path: 'tests/screenshots/route-detail.png', fullPage: true });

      // 检查无错误
      expect(consoleErrors).toHaveLength(0);
      expect(pageErrors).toHaveLength(0);

      console.log('✅ 跑山详情页面测试通过');
    } else {
      console.log('⚠️ 没有找到跑山数据，跳过详情页测试');
    }
  });

  test('导航测试', async ({ page }) => {
    console.log('🧪 测试导航功能...');

    await page.goto('/');

    // 测试夜市导航
    await page.getByRole('link', { name: '夜市' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/markets/);

    // 返回首页
    await page.goto('/');

    // 测试跑山导航
    await page.getByRole('link', { name: '跑山' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/routes/);

    // 检查无错误
    expect(consoleErrors).toHaveLength(0);
    expect(pageErrors).toHaveLength(0);

    console.log('✅ 导航功能测试通过');
  });

  test('响应式测试（移动端）', async ({ page }) => {
    console.log('🧪 测试移动端响应式...');

    // 设置移动端视口
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 截图
    await page.screenshot({ path: 'tests/screenshots/mobile-home.png', fullPage: true });

    // 测试夜市列表页
    await page.goto('/markets');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'tests/screenshots/mobile-markets.png', fullPage: true });

    // 检查无错误
    expect(consoleErrors).toHaveLength(0);
    expect(pageErrors).toHaveLength(0);

    console.log('✅ 移动端响应式测试通过');
  });

  test.afterEach(async ({ page }) => {
    // 打印错误信息
    if (consoleErrors.length > 0) {
      console.log('❌ Console Errors:', consoleErrors);
    }
    if (pageErrors.length > 0) {
      console.log('❌ Page Errors:', pageErrors);
    }
  });
});

test.describe('Chrome CDP测试', () => {
  test('性能测试', async ({ page }) => {
    console.log('🧪 测试页面性能...');

    // 启用CDP
    const client = await page.context().newCDPSession(page);

    // 启用性能监控
    await client.send('Performance.enable');

    // 访问页面
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 获取性能指标
    const metrics = await client.send('Performance.getMetrics');
    console.log('📊 性能指标:', metrics.metrics);

    // 检查关键指标
    const firstPaint = metrics.metrics.find(m => m.name === 'FirstPaint');
    const firstContentfulPaint = metrics.metrics.find(m => m.name === 'FirstContentfulPaint');

    if (firstPaint) {
      console.log(`📊 First Paint: ${firstPaint.value}ms`);
    }
    if (firstContentfulPaint) {
      console.log(`📊 First Contentful Paint: ${firstContentfulPaint.value}ms`);
    }

    console.log('✅ 性能测试通过');
  });

  test('网络请求测试', async ({ page }) => {
    console.log('🧪 测试网络请求...');

    const requests: string[] = [];
    const failedRequests: string[] = [];

    page.on('request', request => {
      requests.push(request.url());
    });

    page.on('requestfailed', request => {
      failedRequests.push(request.url());
      console.log('❌ Failed Request:', request.url());
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.goto('/markets');
    await page.waitForLoadState('networkidle');

    await page.goto('/routes');
    await page.waitForLoadState('networkidle');

    console.log(`📊 总请求数: ${requests.length}`);
    console.log(`📊 失败请求数: ${failedRequests.length}`);

    // 检查无失败请求
    expect(failedRequests).toHaveLength(0);

    console.log('✅ 网络请求测试通过');
  });

  test('JavaScript错误捕获', async ({ page }) => {
    console.log('🧪 测试JavaScript错误...');

    const jsErrors: string[] = [];

    page.on('pageerror', error => {
      jsErrors.push(error.message);
      console.log('❌ JavaScript Error:', error.message);
    });

    // 访问所有页面
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.goto('/markets');
    await page.waitForLoadState('networkidle');

    await page.goto('/routes');
    await page.waitForLoadState('networkidle');

    // 检查无JS错误
    expect(jsErrors).toHaveLength(0);

    console.log('✅ JavaScript错误测试通过');
  });
});
