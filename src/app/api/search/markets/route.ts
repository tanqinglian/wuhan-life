import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortBy = searchParams.get('sortBy') || 'rating';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const minRating = searchParams.get('minRating');
    const maxRating = searchParams.get('maxRating');

    const skip = (page - 1) * limit;

    // 构建查询条件
    const where: any = {};
    
    if (query) {
      where.OR = [
        { name: { contains: query } },
        { address: { contains: query } },
        { description: { contains: query } },
      ];
    }

    // 评分范围筛选
    if (minRating || maxRating) {
      where.rating = {};
      if (minRating) where.rating.gte = parseFloat(minRating);
      if (maxRating) where.rating.lte = parseFloat(maxRating);
    }

    // 构建排序
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // 查询数据
    const [markets, total] = await Promise.all([
      prisma.market.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          district: true,
          _count: {
            select: { foods: true, reviews: true }
          }
        }
      }),
      prisma.market.count({ where })
    ]);

    return NextResponse.json({
      success: true,
      data: markets,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('搜索夜市失败:', error);
    return NextResponse.json(
      { success: false, error: '搜索失败' },
      { status: 500 }
    );
  }
}
