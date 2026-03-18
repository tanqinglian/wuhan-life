'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface MarketFiltersProps {
  currentRating?: string;
  currentDistrict?: string;
  districts: string[];
}

export default function MarketFilters({ 
  currentRating, 
  currentDistrict,
  districts 
}: MarketFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeRating, setActiveRating] = useState<string>(currentRating || '');
  const [activeDistrict, setActiveDistrict] = useState<string>(currentDistrict || '');

  // 同步URL参数到本地状态
  useEffect(() => {
    setActiveRating(currentRating || '');
    setActiveDistrict(currentDistrict || '');
  }, [currentRating, currentDistrict]);

  const updateFilters = (rating: string, district: string) => {
    const params = new URLSearchParams();
    if (rating) params.set('rating', rating);
    if (district) params.set('district', district);
    
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(newUrl);
  };

  const toggleRating = (rating: string) => {
    const newRating = activeRating === rating ? '' : rating;
    setActiveRating(newRating);
    updateFilters(newRating, activeDistrict);
  };

  const toggleDistrict = (district: string) => {
    const newDistrict = activeDistrict === district ? '' : district;
    setActiveDistrict(newDistrict);
    updateFilters(activeRating, newDistrict);
  };

  const clearFilters = () => {
    setActiveRating('');
    setActiveDistrict('');
    router.push(pathname);
  };

  const hasActiveFilters = activeRating || activeDistrict;

  return (
    <div className="bg-white py-4 px-6 shadow-sm">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-3">
        {/* 评分筛选 */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm font-medium">评分:</span>
          <button
            onClick={() => toggleRating('4.5')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeRating === '4.5'
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ⭐ 4.5+
          </button>
          <button
            onClick={() => toggleRating('4.0')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeRating === '4.0'
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ⭐ 4.0+
          </button>
        </div>

        {/* 分隔线 */}
        <div className="h-8 w-px bg-gray-200"></div>

        {/* 区域筛选 */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm font-medium">区域:</span>
          {districts.map((district) => (
            <button
              key={district}
              onClick={() => toggleDistrict(district)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeDistrict === district
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {district}
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
