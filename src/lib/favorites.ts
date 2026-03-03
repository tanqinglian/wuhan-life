// 收藏相关API

import { prisma } from "@/lib/db";

export interface CreateFavoriteData {
  userId: string;
  targetType: "market" | "food" | "route";
  targetId: number;
}

// 添加收藏
export async function addFavorite(data: CreateFavoriteData) {
  // 检查是否已收藏
  const existing = await prisma.favorite.findFirst({
    where: {
      userId: data.userId,
      targetType: data.targetType,
      targetId: data.targetId,
    },
  });

  if (existing) {
    throw new Error("已经收藏过了");
  }

  const favorite = await prisma.favorite.create({
    data: {
      userId: data.userId,
      targetType: data.targetType,
      targetId: data.targetId,
    },
  });

  return favorite;
}

// 取消收藏
export async function removeFavorite(
  userId: string,
  targetType: string,
  targetId: number
) {
  await prisma.favorite.deleteMany({
    where: {
      userId,
      targetType,
      targetId,
    },
  });
}

// 检查是否已收藏
export async function isFavorited(
  userId: string,
  targetType: string,
  targetId: number
): Promise<boolean> {
  const count = await prisma.favorite.count({
    where: {
      userId,
      targetType,
      targetId,
    },
  });

  return count > 0;
}

// 获取用户收藏列表
export async function getUserFavorites(
  userId: string,
  targetType?: string,
  page: number = 1,
  pageSize: number = 20
) {
  const skip = (page - 1) * pageSize;

  const where: any = { userId };
  if (targetType) {
    where.targetType = targetType;
  }

  const [favorites, total] = await Promise.all([
    prisma.favorite.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.favorite.count({ where }),
  ]);

  return {
    favorites,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

// 批量检查收藏状态
export async function batchCheckFavorited(
  userId: string,
  items: Array<{ type: string; id: number }>
): Promise<Record<string, boolean>> {
  const results: Record<string, boolean> = {};

  for (const item of items) {
    const key = `${item.type}_${item.id}`;
    results[key] = await isFavorited(userId, item.type, item.id);
  }

  return results;
}
