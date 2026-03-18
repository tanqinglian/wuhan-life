import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import GET from '@/app/api/search/routes/route';

describe('跑山路线搜索API', () => {
  it('应该返回跑山路线列表', async () => {
    const request = new NextRequest('http://localhost:3000/api/search/routes');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
    expect(data.pagination).toBeDefined();
  });

  it('应该支持关键词搜索', async () => {
    const request = new NextRequest('http://localhost:3000/api/search/routes?q=东湖');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('应该支持分页', async () => {
    const request = new NextRequest('http://localhost:3000/api/search/routes?page=1&limit=5');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.pagination.page).toBe(1);
    expect(data.pagination.limit).toBe(5);
  });

  it('应该支持排序', async () => {
    const request = new NextRequest('http://localhost:3000/api/search/routes?sortBy=rating&sortOrder=desc');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    
    // 验证评分降序排列
    const ratings = data.data.map((r: any) => r.rating);
    for (let i = 0; i < ratings.length - 1; i++) {
      expect(ratings[i]).toBeGreaterThanOrEqual(ratings[i + 1]);
    }
  });

  it('应该包含途经点数量', async () => {
    const request = new NextRequest('http://localhost:3000/api/search/routes?limit=5');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    data.data.forEach((route: any) => {
      expect(route._count).toBeDefined();
      expect(route._count.waypoints).toBeDefined();
    });
  });
});
