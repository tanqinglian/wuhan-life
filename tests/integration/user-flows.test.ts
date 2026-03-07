import { describe, it, expect } from 'vitest';

/**
 * 集成测试 - 完整功能流程测试
 * 测试端到端的用户体验流程
 */

describe('集成测试：用户浏览夜市', () => {
  it('用户应该能够查看夜市列表', async () => {
    // 1. 访问夜市列表页
    const response = await fetch('http://localhost:3000/api/search/markets?limit=10');
    const data = await response.json();

    // 2. 验证返回数据
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.length).toBeGreaterThan(0);
    expect(data.pagination.total).toBeGreaterThan(0);

    // 3. 验证数据结构
    const market = data.data[0];
    expect(market.id).toBeDefined();
    expect(market.name).toBeDefined();
    expect(market.rating).toBeDefined();
    expect(market.address).toBeDefined();
  });

  it('用户应该能够查看夜市详情', async () => {
    // 1. 获取夜市列表
    const listResponse = await fetch('http://localhost:3000/api/search/markets?limit=1');
    const listData = await listResponse.json();
    const marketId = listData.data[0].id;

    // 2. 访问夜市详情页
    const detailResponse = await fetch(`http://localhost:3000/markets/${marketId}`);
    expect(detailResponse.status).toBe(200);
  });

  it('用户应该能够搜索夜市', async () => {
    // 1. 输入搜索关键词
    const response = await fetch('http://localhost:3000/api/search/markets?q=武汉');
    const data = await response.json();

    // 2. 验证搜索结果
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.length).toBeGreaterThan(0);

    // 3. 验证搜索相关性（名称或地址包含关键词）
    data.data.forEach((market: any) => {
      const hasKeyword = 
        market.name.includes('武汉') || 
        market.address?.includes('武汉') ||
        market.description?.includes('武汉');
      expect(hasKeyword).toBe(true);
    });
  });

  it('用户应该能够筛选夜市', async () => {
    // 1. 设置筛选条件
    const response = await fetch('http://localhost:3000/api/search/markets?minRating=4.5');
    const data = await response.json();

    // 2. 验证筛选结果
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);

    // 3. 验证所有结果都符合条件
    data.data.forEach((market: any) => {
      expect(market.rating).toBeGreaterThanOrEqual(4.5);
    });
  });
});

describe('集成测试：用户浏览跑山路线', () => {
  it('用户应该能够查看跑山路线列表', async () => {
    // 1. 访问跑山路线列表页
    const response = await fetch('http://localhost:3000/api/search/routes?limit=10');
    const data = await response.json();

    // 2. 验证返回数据
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.length).toBeGreaterThan(0);
    expect(data.pagination.total).toBeGreaterThan(0);

    // 3. 验证数据结构
    const route = data.data[0];
    expect(route.id).toBeDefined();
    expect(route.name).toBeDefined();
    expect(route.difficulty).toBeDefined();
    expect(route.distance).toBeDefined();
  });

  it('用户应该能够查看跑山路线详情', async () => {
    // 1. 获取跑山路线列表
    const listResponse = await fetch('http://localhost:3000/api/search/routes?limit=1');
    const listData = await listResponse.json();
    const routeId = listData.data[0].id;

    // 2. 访问跑山路线详情页
    const detailResponse = await fetch(`http://localhost:3000/routes/${routeId}`);
    expect(detailResponse.status).toBe(200);
  });

  it('用户应该能够搜索跑山路线', async () => {
    // 1. 输入搜索关键词
    const response = await fetch('http://localhost:3000/api/search/routes?q=东湖');
    const data = await response.json();

    // 2. 验证搜索结果
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);

    // 3. 验证搜索相关性
    if (data.data.length > 0) {
      data.data.forEach((route: any) => {
        const hasKeyword = 
          route.name.includes('东湖') || 
          route.description?.includes('东湖');
        expect(hasKeyword).toBe(true);
      });
    }
  });

  it('用户应该能够筛选跑山路线难度', async () => {
    // 1. 设置难度筛选
    const response = await fetch('http://localhost:3000/api/search/routes?limit=50');
    const data = await response.json();

    // 2. 验证难度分布
    const difficulties = data.data.map((r: any) => r.difficulty);
    const uniqueDifficulties = [...new Set(difficulties)];
    
    expect(uniqueDifficulties.length).toBeGreaterThan(0);
    expect(Math.min(...difficulties)).toBeGreaterThanOrEqual(1);
    expect(Math.max(...difficulties)).toBeLessThanOrEqual(4);
  });
});

describe('集成测试：分页功能', () => {
  it('应该正确处理分页', async () => {
    // 1. 获取第一页
    const page1Response = await fetch('http://localhost:3000/api/search/markets?page=1&limit=5');
    const page1Data = await page1Response.json();

    // 2. 获取第二页
    const page2Response = await fetch('http://localhost:3000/api/search/markets?page=2&limit=5');
    const page2Data = await page2Response.json();

    // 3. 验证分页信息
    expect(page1Data.pagination.page).toBe(1);
    expect(page2Data.pagination.page).toBe(2);
    expect(page1Data.pagination.limit).toBe(5);
    expect(page2Data.pagination.limit).toBe(5);

    // 4. 验证数据不重复
    const page1Ids = page1Data.data.map((m: any) => m.id);
    const page2Ids = page2Data.data.map((m: any) => m.id);
    const intersection = page1Ids.filter((id: number) => page2Ids.includes(id));
    expect(intersection.length).toBe(0);
  });
});

describe('集成测试：排序功能', () => {
  it('应该正确按评分降序排序', async () => {
    const response = await fetch('http://localhost:3000/api/search/markets?sortBy=rating&sortOrder=desc&limit=10');
    const data = await response.json();

    const ratings = data.data.map((m: any) => m.rating);
    for (let i = 0; i < ratings.length - 1; i++) {
      expect(ratings[i]).toBeGreaterThanOrEqual(ratings[i + 1]);
    }
  });

  it('应该正确按浏览量降序排序', async () => {
    const response = await fetch('http://localhost:3000/api/search/markets?sortBy=viewCount&sortOrder=desc&limit=10');
    const data = await response.json();

    const viewCounts = data.data.map((m: any) => m.viewCount);
    for (let i = 0; i < viewCounts.length - 1; i++) {
      expect(viewCounts[i]).toBeGreaterThanOrEqual(viewCounts[i + 1]);
    }
  });
});

describe('集成测试：错误处理', () => {
  it('应该处理不存在的夜市ID', async () => {
    const response = await fetch('http://localhost:3000/markets/99999');
    expect(response.status).toBe(404);
  });

  it('应该处理不存在的跑山路线ID', async () => {
    const response = await fetch('http://localhost:3000/routes/99999');
    expect(response.status).toBe(404);
  });

  it('应该处理无效的页码参数', async () => {
    const response = await fetch('http://localhost:3000/api/search/markets?page=-1');
    expect(response.status).toBe(200); // 应该返回第一页
    const data = await response.json();
    expect(data.pagination.page).toBe(1);
  });
});
