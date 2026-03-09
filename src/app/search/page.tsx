'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [type, setType] = useState<'markets' | 'routes'>('markets');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 从URL参数读取初始查询
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
      // 自动执行搜索
      handleSearchWithQuery(q, 1);
    }
  }, [searchParams]);

  const handleSearchWithQuery = async (searchQuery: string, pageNum: number = 1) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `/api/search/${type}?q=${encodeURIComponent(searchQuery)}&page=${pageNum}&limit=10&sortBy=rating&sortOrder=desc`
      );
      const data = await res.json();
      
      if (data.success) {
        setResults(data.data);
        setTotalPages(data.pagination.totalPages);
        setPage(pageNum);
      }
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (pageNum: number = 1) => {
    await handleSearchWithQuery(query, pageNum);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部搜索栏 */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">🔍 搜索{type === 'markets' ? '夜市' : '跑山路线'}</h1>
          
          <div className="flex gap-4">
            {/* 类型切换 */}
            <div className="flex bg-white/20 rounded-lg p-1">
              <button
                onClick={() => {
                  setType('markets');
                  setResults([]);
                }}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  type === 'markets' ? 'bg-white text-orange-500' : 'text-white hover:bg-white/10'
                }`}
              >
                🍢 夜市
              </button>
              <button
                onClick={() => {
                  setType('routes');
                  setResults([]);
                }}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  type === 'routes' ? 'bg-white text-green-500' : 'text-white hover:bg-white/10'
                }`}
              >
                🏔️ 跑山
              </button>
            </div>
          </div>

          {/* 搜索框 */}
          <div className="mt-6 flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`搜索${type === 'markets' ? '夜市名称、地址、特色' : '跑山路线、地点'}...`}
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-orange-300"
            />
            <button
              onClick={() => handleSearch(1)}
              disabled={loading}
              className="px-8 py-4 bg-white text-orange-500 rounded-lg font-bold hover:bg-orange-50 transition-colors disabled:opacity-50"
            >
              {loading ? '搜索中...' : '搜索'}
            </button>
          </div>
        </div>
      </div>

      {/* 搜索结果 */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {results.length > 0 ? (
          <>
            <div className="mb-4 text-gray-600">
              找到 {results.length} 个结果（第 {page}/{totalPages} 页）
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={`/${type}/${item.id}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                  {item.address && (
                    <p className="text-gray-600 text-sm mb-2">📍 {item.address}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-orange-500 font-bold">
                      ⭐ {item.rating.toFixed(1)}
                    </span>
                    {item._count && (
                      <>
                        {type === 'markets' && (
                          <>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-600">🍢 {item._count.foods || 0} 种小吃</span>
                            <span className="text-gray-600">💬 {item._count.reviews || 0} 条评价</span>
                          </>
                        )}
                        {type === 'routes' && (
                          <>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-600">📍 {item._count.waypoints || 0} 个途经点</span>
                            <span className="text-gray-600">💬 {item._count.reviews || 0} 条评价</span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* 分页 */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  onClick={() => handleSearch(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  上一页
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = page - 2 + i;
                  if (pageNum < 1 || pageNum > totalPages) return null;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handleSearch(pageNum)}
                      className={`px-4 py-2 rounded-lg ${
                        pageNum === page
                          ? 'bg-orange-500 text-white'
                          : 'bg-white border hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handleSearch(page + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  下一页
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">输入关键词开始搜索</p>
          </div>
        )}
      </div>
    </div>
  );
}
