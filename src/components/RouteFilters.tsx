'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface RouteFiltersProps {
  currentRating?: string;
  currentDifficulty?: string;
}

export default function RouteFilters({ 
  currentRating, 
  currentDifficulty
}: RouteFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeRating, setActiveRating] = useState<string>(currentRating || '');
  const [activeDifficulty, setActiveDifficulty] = useState<string>(currentDifficulty || '');

  const difficulties = ['简单', '中等', '困难'];

  // 同步URL参数到本地状态
  useEffect(() => {
    setActiveRating(currentRating || '');
    setActiveDifficulty(currentDifficulty || '');
  }, [currentRating, currentDifficulty]);

  const updateFilters = (rating: string, difficulty: string) => {
    const params = new URLSearchParams();
    if (rating) params.set('rating', rating);
    if (difficulty) params.set('difficulty', difficulty);
    
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(newUrl);
  };

  const toggleRating = (rating: string) => {
    const newRating = activeRating === rating ? '' : rating;
    setActiveRating(newRating);
    updateFilters(newRating, activeDifficulty);
  };

  const toggleDifficulty = (difficulty: string) => {
    const newDifficulty = activeDifficulty === difficulty ? '' : difficulty;
    setActiveDifficulty(newDifficulty);
    updateFilters(activeRating, newDifficulty);
  };

  const clearFilters = () => {
    setActiveRating('');
    setActiveDifficulty('');
    router.push(pathname);
  };

  const hasActiveFilters = activeRating || activeDifficulty;

  return (
    <div className="bg-white py-4 px-6 shadow-sm mb-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
        {/* 评分筛选 */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm font-medium">评分:</span>
          <button
            onClick={() => toggleRating('4.5')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeRating === '4.5'
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ⭐ 4.5+
          </button>
          <button
            onClick={() => toggleRating('4.0')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeRating === '4.0'
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ⭐ 4.0+
          </button>
        </div>

        {/* 分隔线 */}
        <div className="h-8 w-px bg-gray-200"></div>

        {/* 难度筛选 */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm font-medium">难度:</span>
          {difficulties.map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => toggleDifficulty(difficulty)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeDifficulty === difficulty
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>

        {/* 清除筛选 */}
        {hasActiveFilters && (
          <>
            <div className="h-8 w-px bg-gray-200"></div>
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-full text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all"
            >
              ✕ 清除筛选
            </button>
          </>
        )}
      </div>
    </div>
  );
}
