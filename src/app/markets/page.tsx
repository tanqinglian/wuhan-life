import Link from "next/link"
import { prisma } from "@/lib/db"

export default async function MarketsPage() {
  // 直接查询夜市数据
  const markets = await prisma.market.findMany({
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
          🍢 武汉夜市探索
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3">
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {markets.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">暂无夜市数据</p>
            <p className="text-gray-400 text-sm mt-2">
              请先配置数据库并添加数据
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {markets.map((market) => (
              <Link
                key={market.id}
                href={`/markets/${market.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                  <span className="text-4xl">🌃</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{market.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {market.description || '暂无描述'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{market.address}</span>
                    <span className="text-sm font-medium text-orange-500">
                      ⭐ {market.rating.toFixed(1)}
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
