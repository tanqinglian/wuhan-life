import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import styles from '@/app/page.module.css';

// 服务端组件：获取热门推荐数据
export default async function PopularRecommendations() {
  // 并行获取夜市和跑山数据
  const [topMarkets, topRoutes] = await Promise.all([
    // 获取评分最高的3个夜市
    prisma.markets.findMany({
      where: {
        isActive: true,
        rating: {
          gt: 0, // 只获取有评分的
        },
      },
      orderBy: [
        { rating: 'desc' },
        { viewCount: 'desc' },
      ],
      take: 3,
      select: {
        id: true,
        name: true,
        rating: true,
      },
    }),
    // 获取评分最高的3个跑山路线
    prisma.routes.findMany({
      where: {
        isActive: true,
        rating: {
          gt: 0,
        },
      },
      orderBy: [
        { rating: 'desc' },
        { viewCount: 'desc' },
      ],
      take: 3,
      select: {
        id: true,
        name: true,
        rating: true,
      },
    }),
  ]);

  // 合并并按评分排序，取前3个
  const allItems = [
    ...topMarkets.map(market => ({
      id: market.id,
      name: market.name,
      rating: market.rating || 0,
      type: 'market' as const,
      emoji: '🌃',
    })),
    ...topRoutes.map(route => ({
      id: route.id,
      name: route.name,
      rating: route.rating || 0,
      type: 'route' as const,
      emoji: '🏔️',
    })),
  ]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className={styles.popularGrid}>
      {allItems.map((item, index) => (
        <Link
          key={`${item.type}-${item.id}`}
          href={item.type === 'market' ? `/markets/${item.id}` : `/routes/${item.id}`}
          className={styles.popularItem}
        >
          <span className={styles.popularEmoji}>{item.emoji}</span>
          <span className={styles.popularText}>{item.name}</span>
          <span className={styles.popularRating}>⭐ {item.rating.toFixed(1)}</span>
        </Link>
      ))}
    </div>
  );
}
