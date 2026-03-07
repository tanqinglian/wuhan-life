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

    const skip = (page - 1) * limit;

    // 构建查询条件
    const where: any = {};
    
    if (query) {
      where.OR = [
        { name: { contains: query } },
        { description: { contains: query } },
      ];
    }

    // 构建排序
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // 查询数据
    const [routes, total] = await Promise.all([
      prisma.routes.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          _count: {
            select: { waypoints: true }
          }
        }
      }),
      prisma.routes.count({ where })
    ]);

    return NextResponse.json({
      success: true,
      data: routes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('搜索跑山路线失败:', error);
    return NextResponse.json(
      { success: false, error: '搜索失败' },
      { status: 500 }
    );
  }
}
