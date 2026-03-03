import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function MarketsPage() {
  // 获取所有夜市数据（示例数据）
  const districts = await prisma.district.findMany({
    include: {
      markets: {
        where: { isActive: true },
        orderBy: { rating: "desc" },
      },
    },
    orderBy: { order: "asc" },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← 返回首页
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            🍢 武汉夜市探索
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            发现江城最美夜市，品尝地道美食
          </p>
        </div>
      </header>

      {/* 筛选栏 */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-medium whitespace-nowrap">
              全部
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              江汉区
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              武昌区
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              汉阳区
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              洪山区
            </button>
          </div>
        </div>
      </div>

      {/* 夜市列表 */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {districts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">暂无夜市数据</p>
            <p className="text-gray-400 text-sm mt-2">
              请先配置数据库并添加数据
            </p>
          </div>
        ) : (
          districts.map((district) => (
            <div key={district.id} className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {district.name}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {district.markets.map((market) => (
                  <Link
                    key={market.id}
                    href={`/markets/${market.id}`}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-video bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                      <span className="text-4xl">🌃</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1">
                        {market.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {market.description || "暂无描述"}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <span className="text-orange-500">★</span>
                          <span className="font-medium">{market.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-gray-400">
                          {market.openHours || "营业时间待定"}
                        </span>
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
