import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import MarketFilters from '@/components/MarketFilters';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function MarketsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = typeof searchParams.q === 'string' ? searchParams.q : '';
  const ratingFilter = typeof searchParams.rating === 'string' ? searchParams.rating : '';
  const districtFilter = typeof searchParams.district === 'string' ? searchParams.district : '';

  // 获取所有区域
  const allDistricts = await prisma.districts.findMany({
    select: { name: true },
    orderBy: { name: 'asc' }
  });
  const districtNames = allDistricts.map(d => d.name);

  // 构建查询条件
  const where: any = {};
  
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { address: { contains: search } },
      { description: { contains: search } },
    ];
  }

  if (ratingFilter) {
    where.rating = { gte: parseFloat(ratingFilter) };
  }

  if (districtFilter) {
    const district = await prisma.districts.findFirst({
      where: { name: districtFilter }
    });
    if (district) {
      where.districtId = district.id;
    }
  }

  const [markets, total] = await Promise.all([
    prisma.markets.findMany({
      where,
      include: {
        districts: true,
        _count: { select: { foods: true } },
      },
      orderBy: { rating: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.markets.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.backButton}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回首页
          </Link>
          <h1 className={styles.title}>🌃 夜市探索</h1>
          <p className={styles.subtitle}>发现武汉最地道的夜市美食</p>
        </div>
      </header>

      {/* Filter Bar */}
      <MarketFilters 
        currentRating={ratingFilter}
        currentDistrict={districtFilter}
        districts={districtNames}
      />

      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <span className={styles.statItem}>共 {total} 个夜市</span>
        <span className={styles.statDivider}>|</span>
        <span className={styles.statItem}>第 {page} / {totalPages} 页</span>
      </div>

      {/* Market Grid */}
      <div className={styles.grid}>
        {markets.map((market) => (
          <Link
            key={market.id}
            href={`/markets/${market.id}`}
            className={styles.card}
          >
            <div className={styles.cardImage}>
              <div className={styles.cardPlaceholder}>🌃</div>
              <div className={styles.cardBadge}>
                ⭐ {market.rating?.toFixed(1) || '暂无'}
              </div>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{market.name}</h3>
              <div className={styles.cardInfo}>
                <span className={styles.cardDistrict}>
                  📍 {market.districts?.name || '未知'}
                </span>
                <span className={styles.cardFoods}>
                  🍜 {market._count.foods} 种美食
                </span>
              </div>
              <p className={styles.cardAddress}>{market.address}</p>
              <div className={styles.cardMeta}>
                <span className={styles.cardViews}>
                  👁️ {market.viewCount || 0} 次浏览
                </span>
                <span className={styles.cardHours}>
                  🕐 {market.openHours || '未知'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        {page > 1 && (
          <Link
            href={`/markets?page=${page - 1}&limit=${limit}${search ? `&q=${search}` : ''}`}
            className={styles.pageButton}
          >
            ← 上一页
          </Link>
        )}
        <span className={styles.pageInfo}>
          {page} / {totalPages}
        </span>
        {page < totalPages && (
          <Link
            href={`/markets?page=${page + 1}&limit=${limit}${search ? `&q=${search}` : ''}`}
            className={styles.pageButton}
          >
            下一页 →
          </Link>
        )}
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2026 wuhan-life</p>
      </footer>
    </div>
  );
}
