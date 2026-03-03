import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function RoutesPage() {
  // 获取所有跑山路线
  const routes = await prisma.route.findMany({
    where: { isActive: true },
    orderBy: [{ direction: "asc" }, { rating: "desc" }],
    include: {
      _count: {
        select: { reviews: true, waypoints: true },
      },
    },
  });

  // 按方向分组
  const groupedRoutes = routes.reduce((acc, route) => {
    const direction = route.direction;
    if (!acc[direction]) {
      acc[direction] = [];
    }
    acc[direction].push(route);
    return acc;
  }, {} as Record<string, typeof routes>);

  const directionNames: Record<string, string> = {
    东: "东部路线",
    南: "南部路线",
    西: "西部路线",
    北: "北部路线",
  };

  const difficultyLabels = ["", "简单", "较易", "中等", "较难", "困难"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← 返回首页
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            🏔️ 武汉跑山路线
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            探索周边山野，享受驾驶乐趣
          </p>
        </div>
      </header>

      {/* 筛选栏 */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto">
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-medium whitespace-nowrap">
              全部
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              东线
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              南线
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              西线
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              北线
            </button>
          </div>
        </div>
      </div>

      {/* 路线列表 */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {Object.keys(groupedRoutes).length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">暂无路线数据</p>
            <p className="text-gray-400 text-sm mt-2">
              请先配置数据库并添加数据
            </p>
          </div>
        ) : (
          Object.entries(groupedRoutes).map(([direction, directionRoutes]) => (
            <div key={direction} className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {directionNames[direction] || `${direction}部路线`}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {directionRoutes.map((route) => (
                  <Link
                    key={route.id}
                    href={`/routes/${route.id}`}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-video bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                      <span className="text-4xl">🏔️</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2">
                        {route.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {route.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                        <span>📍 {route.distance}公里</span>
                        <span>⏱️ {route.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">
                            {difficultyLabels[route.difficulty]}
                          </span>
                          <span className="text-gray-400 text-xs">
                            {route._count.waypoints}个打卡点
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-emerald-500">★</span>
                          <span className="font-medium">{route.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        )}
      </main>

      {/* 底部 */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2026 武汉生活. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
