'use client';

import { useState } from 'react';

interface FilterPanelProps {
  type: 'markets' | 'routes';
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  district?: string;
  minRating?: number;
  maxRating?: number;
  sortBy: 'rating' | 'viewCount' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

export default function FilterPanel({ type, onFilterChange }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'rating',
    sortOrder: 'desc',
  });

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">🔍 筛选条件</h3>
      
      {/* 排序方式 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          排序方式
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => updateFilter('sortBy', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="rating">评分</option>
          <option value="viewCount">浏览量</option>
          <option value="createdAt">最新</option>
        </select>
      </div>

      {/* 排序顺序 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          排序顺序
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => updateFilter('sortOrder', 'desc')}
            className={`flex-1 px-4 py-2 rounded-lg border ${
              filters.sortOrder === 'desc'
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            降序 ↓
          </button>
          <button
            onClick={() => updateFilter('sortOrder', 'asc')}
            className={`flex-1 px-4 py-2 rounded-lg border ${
              filters.sortOrder === 'asc'
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            升序 ↑
          </button>
        </div>
      </div>

      {/* 评分范围 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          评分范围
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="最低分"
            min="0"
            max="5"
            step="0.1"
            value={filters.minRating || ''}
            onChange={(e) => updateFilter('minRating', e.target.value ? parseFloat(e.target.value) : undefined)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="number"
            placeholder="最高分"
            min="0"
            max="5"
            step="0.1"
            value={filters.maxRating || ''}
            onChange={(e) => updateFilter('maxRating', e.target.value ? parseFloat(e.target.value) : undefined)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* 重置按钮 */}
      <button
        onClick={() => {
          setFilters({
            sortBy: 'rating',
            sortOrder: 'desc',
          });
          onFilterChange({
            sortBy: 'rating',
            sortOrder: 'desc',
          });
        }}
        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        重置筛选
      </button>
    </div>
  );
}
