// 公共卡片组件
// 创建时间：2026-03-07 22:51

import Link from 'next/link';
import styles from './Card.module.css';

interface CardProps {
  id: number;
  type: 'market' | 'route';
  name: string;
  emoji: string;
  rating?: number;
  viewCount?: number;
  description?: string;
  meta?: {
    label: string;
    value: string;
  }[];
  href: string;
}

export function Card({
  id,
  type,
  name,
  emoji,
  rating,
  viewCount,
  description,
  meta,
  href,
}: CardProps) {
  return (
    <Link href={href} className={styles.card}>
      <div className={styles.image}>
        <div className={styles.emoji}>{emoji}</div>
        {rating && (
          <div className={styles.badge}>
            ⭐ {rating.toFixed(1)}
          </div>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        {description && (
          <p className={styles.description}>{description}</p>
        )}
        {meta && (
          <div className={styles.meta}>
            {meta.map((item, index) => (
              <span key={index} className={styles.metaItem}>
                {item.label} {item.value}
              </span>
            ))}
          </div>
        )}
        <div className={styles.footer}>
          {viewCount !== undefined && (
            <span className={styles.views}>
              👁️ {viewCount} 次浏览
            </span>
          )}
          <span className={styles.link}>
            查看详情 →
          </span>
        </div>
      </div>
    </Link>
  );
}
