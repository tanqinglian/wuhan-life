'use client';

import { useState, useEffect } from 'react';

interface FavoriteButtonProps {
  type: 'market' | 'route';
  id: number;
  name: string;
}

export default function FavoriteButton({ type, id, name }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // 从localStorage读取收藏状态
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const key = `${type}-${id}`;
    setIsFavorite(favorites.some((f: string) => f === key));
  }, [type, id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const key = `${type}-${id}`;

    if (isFavorite) {
      // 取消收藏
      const newFavorites = favorites.filter((f: string) => f !== key);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      // 添加收藏
      favorites.push(key);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
      style={{
        background: isFavorite
          ? 'linear-gradient(135deg, #FF006E 0%, #FF4D8D 100%)'
          : 'rgba(0, 245, 255, 0.1)',
        border: `2px solid ${isFavorite ? '#FF006E' : '#00F5FF'}`,
        color: isFavorite ? '#FFFFFF' : '#00F5FF',
        boxShadow: isFavorite
          ? '0 0 20px rgba(255, 0, 110, 0.5)'
          : '0 0 20px rgba(0, 245, 255, 0.3)',
      }}
    >
      <svg
        className="w-5 h-5"
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span>{isFavorite ? '已收藏' : '收藏'}</span>
    </button>
  );
}
