import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import GET from '@/app/api/search/markets/route';

describe('夜市搜索API', () => {
  it('应该返回夜市列表', async () => {
    const request = new NextRequest('http://localhost:3000/api/search/markets');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
    expect(data.pagination).toBeDefined();
    expect(data.pagination.page).toBe(1);
    expect(data.pagination.limit).toBe(10);
  });

  it('应该支持关键词搜索', async () => {
    const request = new NextRequest('http://localhost:3000/api/search/markets?q=武汉');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('应该支持评分筛选', async () => {
    const request = new NextRequest('http://localhost:3000/api/search/markets?minRating=4.5');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    
    // 验证所有返回的夜市评分都>=4.5
    data.data.forEach((market: any) => {
      expect(market.rating).toBeGreaterThanOrEqual(4.5);
    });
  });

  it('应该支持分页', async () => {
    const request = new NextRequest('http://localhost:3000/api/search/markets?page=2&limit=5');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.pagination.page).toBe(2);
    expect(data.pagination.limit).toBe(5);
  });

  it('应该支持排序', async () => {
    const request = new NextRequest('http://localhost:3000/api/search/markets?sortBy=rating&sortOrder=desc');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    
    // 验证评分降序排列
    const ratings = data.data.map((m: any) => m.rating);
    for (let i = 0; i < ratings.length - 1; i++) {
      expect(ratings[i]).toBeGreaterThanOrEqual(ratings[i + 1]);
    }
  });

  it('应该处理无效参数', async () => {
    const request = new NextRequest('http://localhost:3000/api/search/markets?page=-1');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
});
