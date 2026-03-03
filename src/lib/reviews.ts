// 评价相关API

import { prisma } from "@/lib/db";

export interface CreateReviewData {
  userId: string;
  targetType: "market" | "food" | "route";
  targetId: number;
  rating: number;
  content?: string;
  images?: string[];
  isAnonymous?: boolean;
}

// 创建评价
export async function createReview(data: CreateReviewData) {
  const review = await prisma.review.create({
    data: {
      userId: data.userId,
      targetType: data.targetType,
      targetId: data.targetId,
      rating: data.rating,
      content: data.content,
      images: data.images || [],
      isAnonymous: data.isAnonymous || false,
    },
  });

  // 更新目标的平均评分
  await updateTargetRating(data.targetType, data.targetId);

  return review;
}

// 获取评价列表
export async function getReviews(
  targetType: string,
  targetId: number,
  page: number = 1,
  pageSize: number = 10
) {
  const skip = (page - 1) * pageSize;

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where: { targetType, targetId },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.review.count({
      where: { targetType, targetId },
    }),
  ]);

  return {
    reviews,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

// 更新目标评分
async function updateTargetRating(targetType: string, targetId: number) {
  const result = await prisma.review.aggregate({
    where: { targetType, targetId },
    _avg: { rating: true },
    _count: { id: true },
  });

  const avgRating = result._avg.rating || 0;

  // 根据类型更新对应的表
  if (targetType === "market") {
    await prisma.market.update({
      where: { id: targetId },
      data: { rating: avgRating },
    });
  } else if (targetType === "route") {
    await prisma.route.update({
      where: { id: targetId },
      data: { rating: avgRating },
    });
  } else if (targetType === "food") {
    await prisma.food.update({
      where: { id: targetId },
      data: { rating: avgRating },
    });
  }
}

// 删除评价
export async function deleteReview(reviewId: number, userId: string) {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review || review.userId !== userId) {
    throw new Error("无权删除此评价");
  }

  await prisma.review.delete({
    where: { id: reviewId },
  });

  // 更新目标评分
  await updateTargetRating(review.targetType, review.targetId);
}
