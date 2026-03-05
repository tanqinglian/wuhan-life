import Link from "next/link"
import { prisma } from "@/lib/db"

export default async function RoutesPage() {
  // 直接查询跑山路线数据
  const routes = await prisma.route.findMany({
    orderBy: { rating: 'desc' },
    take: 20
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
          ← 返回首页
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">
          🏔️ 武汉跑山路线
        </h1>
        <p className="text-gray-600 mt-1">
          探索武汉周边最美的山路，享受驾驶乐趣
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {routes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">暂无跑山路线数据</p>
            <p className="text-gray-400 text-sm mt-2">
              请先配置数据库并添加数据
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {routes.map((route) => (
              <Link
                key={route.id}
                href={`/routes/${route.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                  <span className="text-4xl">🏔️</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{route.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {route.description || '暂无描述'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{route.distance}公里</span>
                    <span className="text-sm font-medium text-green-500">
                      ⭐ {route.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
