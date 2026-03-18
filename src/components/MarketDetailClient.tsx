'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// 动态导入地图组件（避免SSR问题）
const MapView = dynamic(() => import('./MapView'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400">加载地图中...</span>
    </div>
  )
});

interface Market {
  id: number;
  name: string;
  address: string;
  rating: number;
  viewCount: number;
  openHours?: string;
  bestTime?: string;
  traffic?: string;
  tips?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  district: {
    name: string;
  };
  foods: Array<{
    id: number;
    name: string;
    shopName?: string;
    price?: string;
    rating: number;
    recommend: number;
  }>;
  reviews: Array<{
    id: number;
    rating: number;
    content?: string;
    createdAt: Date;
  }>;
}

interface MarketDetailClientProps {
  market: Market;
}

export default function MarketDetailClient({ market }: MarketDetailClientProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'foods' | 'reviews'>('info');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部图片 */}
      <div className="relative h-64 bg-gradient-to-br from-orange-400 to-red-500">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <Link href="/markets" className="text-sm opacity-80 hover:opacity-100 mb-2 inline-block">
            ← 返回夜市列表
          </Link>
          <h1 className="text-3xl font-bold">{market.name}</h1>
          <p className="text-white/90 mt-1">{market.address}</p>
        </div>
      </div>

      {/* 内容 */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 左侧主要信息 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab切换 */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`flex-1 px-6 py-4 font-medium ${
                    activeTab === 'info'
                      ? 'text-orange-500 border-b-2 border-orange-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  基本信息
                </button>
                <button
                  onClick={() => setActiveTab('foods')}
                  className={`flex-1 px-6 py-4 font-medium ${
                    activeTab === 'foods'
                      ? 'text-orange-500 border-b-2 border-orange-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  推荐小吃 ({market.foods.length})
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 px-6 py-4 font-medium ${
                    activeTab === 'reviews'
                      ? 'text-orange-500 border-b-2 border-orange-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  用户评价 ({market.reviews.length})
                </button>
              </div>

              <div className="p-6">
                {/* 基本信息 */}
                {activeTab === 'info' && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-gray-400 w-20">营业时间</span>
                      <span className="text-gray-900">{market.openHours || "待定"}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-gray-400 w-20">最佳时间</span>
                      <span className="text-gray-900">{market.bestTime || "待定"}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-gray-400 w-20">交通指南</span>
                      <span className="text-gray-900">{market.traffic || "暂无"}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-gray-400 w-20">实用贴士</span>
                      <span className="text-gray-900">{market.tips || "暂无"}</span>
                    </div>
                    {market.description && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-gray-700">{market.description}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 推荐小吃 */}
                {activeTab === 'foods' && (
                  <>
                    {market.foods.length === 0 ? (
                      <p className="text-gray-400 text-sm">暂无推荐小吃</p>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {market.foods.map((food) => (
                          <div key={food.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                            <h3 className="font-bold text-gray-900">{food.name}</h3>
                            {food.shopName && (
                              <p className="text-sm text-gray-600 mt-1">{food.shopName}</p>
                            )}
                            {food.price && (
                              <p className="text-sm text-orange-600 mt-1">{food.price}</p>
                            )}
                            <div className="flex items-center gap-2 mt-2 text-sm">
                              <span className="text-orange-500">★ {food.rating.toFixed(1)}</span>
                              <span className="text-gray-300">|</span>
                              <span className="text-gray-400">{food.recommend}人推荐</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* 用户评价 */}
                {activeTab === 'reviews' && (
                  <>
                    {market.reviews.length === 0 ? (
                      <p className="text-gray-400 text-sm">暂无评价</p>
                    ) : (
                      <div className="space-y-4">
                        {market.reviews.map((review) => (
                          <div key={review.id} className="border-b pb-4 last:border-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-orange-500">★ {review.rating}</span>
                              <span className="text-gray-400 text-sm">
                                {new Date(review.createdAt).toLocaleDateString("zh-CN")}
                              </span>
                            </div>
                            {review.content && (
                              <p className="text-gray-700 text-sm">{review.content}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 右侧信息 */}
          <div className="space-y-6">
            {/* 统计信息 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-1">
                  {market.rating.toFixed(1)}
                </div>
                <div className="text-gray-600 text-sm mb-2">综合评分</div>
                <div className="text-gray-400 text-xs">
                  {market.viewCount}次浏览
                </div>
              </div>
            </div>

            {/* 位置信息 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">位置</h3>
              <p className="text-sm text-gray-600 mb-3">{market.address}</p>
              <p className="text-xs text-gray-400 mb-4">
                {market.district.name}
              </p>
              {/* 地图 */}
              {market.latitude && market.longitude && (
                <MapView 
                  latitude={market.latitude} 
                  longitude={market.longitude} 
                  name={market.name}
                  address={market.address}
                />
              )}
            </div>

            {/* 操作按钮 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <button className="w-full py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
                添加到收藏
              </button>
              <button className="w-full py-3 mt-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                写评价
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
