'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import FavoriteButton from './FavoriteButton';

// 动态导入地图组件
const MapView = dynamic(() => import('./MapView'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-gray-400">加载地图中...</span>
    </div>
  )
});

interface Waypoint {
  id: number;
  name: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  order: number;
  isHighlight: boolean;
}

interface Route {
  id: number;
  name: string;
  startpoint: string;
  endpoint: string;
  distance: number;
  duration: string;
  difficulty: number;
  description?: string;
  roadCondition?: string;
  bestSeason?: string;
  tips?: string;
  rating: number;
  viewCount: number;
  latitude?: number;
  longitude?: number;
  waypoints: Waypoint[];
  reviews: Array<{
    id: number;
    rating: number;
    content?: string;
    createdAt: Date;
  }>;
}

interface RouteDetailClientProps {
  route: Route;
}

export default function RouteDetailClient({ route }: RouteDetailClientProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'waypoints' | 'reviews'>('info');
  
  const difficultyLabels = ["", "简单", "较易", "中等", "较难", "困难"];
  const difficultyColors = ["", "bg-green-100 text-green-700", "bg-emerald-100 text-emerald-700", "bg-yellow-100 text-yellow-700", "bg-orange-100 text-orange-700", "bg-red-100 text-red-700"];

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
            {/* Tab切换 */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`flex-1 px-6 py-4 font-medium ${
                    activeTab === 'info'
                      ? 'text-emerald-500 border-b-2 border-emerald-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  路线详情
                </button>
                <button
                  onClick={() => setActiveTab('waypoints')}
                  className={`flex-1 px-6 py-4 font-medium ${
                    activeTab === 'waypoints'
                      ? 'text-emerald-500 border-b-2 border-emerald-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  打卡点 ({route.waypoints.length})
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 px-6 py-4 font-medium ${
                    activeTab === 'reviews'
                      ? 'text-emerald-500 border-b-2 border-emerald-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  用户评价 ({route.reviews.length})
                </button>
              </div>

              <div className="p-6">
                {/* 路线详情 */}
                {activeTab === 'info' && (
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
                      <span className={`px-2 py-1 rounded text-sm font-medium ${difficultyColors[route.difficulty]}`}>
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
                    {route.description && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-gray-700">{route.description}</p>
                      </div>
                    )}
                    {route.tips && (
                      <div className="mt-4 pt-4 border-t">
                        <h3 className="font-bold text-gray-900 mb-2">出行建议</h3>
                        <p className="text-gray-700 text-sm">{route.tips}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 打卡点 */}
                {activeTab === 'waypoints' && (
                  <>
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
                  </>
                )}

                {/* 用户评价 */}
                {activeTab === 'reviews' && (
                  <>
                    {route.reviews.length === 0 ? (
                      <p className="text-gray-400 text-sm">暂无评价</p>
                    ) : (
                      <div className="space-y-4">
                        {route.reviews.map((review) => (
                          <div key={review.id} className="border-b pb-4 last:border-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-emerald-500">★ {review.rating}</span>
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
                <div className="text-4xl font-bold text-emerald-500 mb-1">
                  {route.rating.toFixed(1)}
                </div>
                <div className="text-gray-600 text-sm mb-2">综合评分</div>
                <div className="text-gray-400 text-xs">
                  {route.viewCount}次浏览
                </div>
              </div>
            </div>

            {/* 位置信息 */}
            {route.latitude && route.longitude && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">路线位置</h3>
                <p className="text-sm text-gray-600 mb-3">
                  起点: {route.startpoint}
                </p>
                <MapView 
                  latitude={route.latitude} 
                  longitude={route.longitude} 
                  name={route.name}
                  address={route.startpoint}
                />
              </div>
            )}

            {/* 操作按钮 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <FavoriteButton type="route" id={route.id} name={route.name} />
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
