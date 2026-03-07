import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function MarketDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const market = await prisma.markets.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      districts: true,
      foods: {
        take: 5,
        orderBy: { rating: 'desc' },
      },
    },
  });

  if (!market) {
    notFound();
  }

  return (
    <div className={styles.container}>
      {/* Header Image */}
      <div className={styles.headerImage}>
        <div className={styles.placeholder}>🌃</div>
        <Link href="/markets" className={styles.backButton}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回列表
        </Link>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{market.name}</h1>
          <div className={styles.meta}>
            <span className={styles.rating}>⭐ {market.rating?.toFixed(1) || '暂无'}</span>
            <span className={styles.views}>👁️ {market.viewCount || 0} 次浏览</span>
          </div>
        </div>

        {/* Info Cards */}
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>📍</div>
            <div className={styles.infoContent}>
              <div className={styles.infoLabel}>地址</div>
              <div className={styles.infoValue}>{market.address || '未知'}</div>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>🕐</div>
            <div className={styles.infoContent}>
              <div className={styles.infoLabel}>营业时间</div>
              <div className={styles.infoValue}>{market.openHours || '未知'}</div>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>🕐</div>
            <div className={styles.infoContent}>
              <div className={styles.infoLabel}>最佳时间</div>
              <div className={styles.infoValue}>{market.bestTime || '未知'}</div>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>🚇</div>
            <div className={styles.infoContent}>
              <div className={styles.infoLabel}>交通指南</div>
              <div className={styles.infoValue}>{market.traffic || '未知'}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>简介</h2>
          <p className={styles.description}>{market.description || '暂无描述'}</p>
        </div>

        {/* Tips */}
        {market.tips && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>游玩贴士</h2>
            <p className={styles.tips}>{market.tips}</p>
          </div>
        )}

        {/* Foods */}
        {market.foods.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>推荐美食</h2>
            <div className={styles.foodsGrid}>
              {market.foods.map((food) => (
                <div key={food.id} className={styles.foodCard}>
                  <div className={styles.foodEmoji}>🍜</div>
                  <div className={styles.foodInfo}>
                    <div className={styles.foodName}>{food.name}</div>
                    <div className={styles.foodMeta}>
                      <span>{food.shopName}</span>
                      <span>⭐ {food.rating?.toFixed(1) || '暂无'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Map Placeholder */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>位置地图</h2>
          <div className={styles.mapPlaceholder}>
            <span>🗺️ 地图功能开发中...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
