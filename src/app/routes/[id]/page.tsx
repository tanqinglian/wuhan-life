import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function RouteDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // 参数验证
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">无效的跑山路线ID</p>
          <Link href="/routes" className="text-green-500 hover:underline mt-2 inline-block">
            返回列表
          </Link>
        </div>
      </div>
    );
  }

  const route = await prisma.route.findUnique({
    where: { id },
    include: {
      waypoints: {
        orderBy: { order: "asc" },
      },
      reviews: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!route) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">路线不存在</p>
          <Link href="/routes" className="text-emerald-500 hover:underline mt-2 inline-block">
            返回列表
          </Link>
        </div>
      </div>
    );
  }

  const difficultyLabels = ["", "简单", "较易", "中等", "较难", "困难"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部图片 */}
      <div className="relative h-64 bg-gradient-to-br from-emerald-400 to-teal-500">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <Link href="/routes" className="text-sm opacity-80 hover:opacity-100 mb-2 inline-block">
            ← 返回路线列表
          </Link>
          <h1 className="text-3xl font-bold">{route.name}</h1>
          <p className="text-white/90 mt-1">
            {route.distance}公里 · {route.duration}
          </p>
        </div>
      </div>

      {/* 内容 */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 左侧主要信息 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 路线信息 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">路线详情</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 w-24">起点</span>
                  <span className="text-gray-900">{route.startpoint}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 w-24">终点</span>
                  <span className="text-gray-900">{route.endpoint}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 w-24">里程</span>
                  <span className="text-gray-900">{route.distance}公里</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 w-24">时长</span>
                  <span className="text-gray-900">{route.duration}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 w-24">难度</span>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-sm font-medium">
                    {difficultyLabels[route.difficulty]}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 w-24">路况</span>
                  <span className="text-gray-900">{route.roadCondition || "暂无"}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 w-24">最佳季节</span>
                  <span className="text-gray-900">{route.bestSeason || "四季皆宜"}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-gray-700">{route.description}</p>
              </div>
              {route.tips && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="font-bold text-gray-900 mb-2">出行建议</h3>
                  <p className="text-gray-700 text-sm">{route.tips}</p>
                </div>
              )}
            </div>

            {/* 途经点 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                途经打卡点 ({route.waypoints.length})
              </h2>
              {route.waypoints.length === 0 ? (
                <p className="text-gray-400 text-sm">暂无打卡点</p>
              ) : (
                <div className="space-y-3">
                  {route.waypoints.map((waypoint, index) => (
                    <div key={waypoint.id} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                          {waypoint.name}
                          {waypoint.isHighlight && (
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">
                              推荐
                            </span>
                          )}
                        </h3>
                        {waypoint.description && (
                          <p className="text-sm text-gray-600 mt-1">{waypoint.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 用户评价 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">用户评价</h2>
              {route.reviews.length === 0 ? (
                <p className="text-gray-400 text-sm">暂无评价</p>
              ) : (
                <div className="space-y-4">
                  {route.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-emerald-500">★ {review.rating}</span>
                        <span className="text-gray-400 text-sm">
                          {review.createdAt.toLocaleDateString("zh-CN")}
                        </span>
                      </div>
                      {review.content && (
                        <p className="text-gray-700 text-sm">{review.content}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 右侧信息 */}
          <div className="space-y-6">
            {/* 统计信息 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-500 mb-1">
                  {route.rating.toFixed(1)}
                </div>
                <div className="text-gray-600 text-sm mb-2">综合评分</div>
                <div className="text-gray-400 text-xs">
                  {route.viewCount}次浏览
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <button className="w-full py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors">
                添加到收藏
              </button>
              <button className="w-full py-3 mt-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                写评价
              </button>
              <button className="w-full py-3 mt-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                导航到起点
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
