// 骨架屏组件
// 创建时间：2026-03-07 22:46

import styles from './Skeleton.module.css';

export function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.image}></div>
      <div className={styles.content}>
        <div className={styles.title}></div>
        <div className={styles.text}></div>
        <div className={styles.textShort}></div>
      </div>
    </div>
  );
}

export function SkeletonList({ count = 6 }: { count?: number }) {
  return (
    <div className={styles.list}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonDetail() {
  return (
    <div className={styles.detail}>
      <div className={styles.headerImage}></div>
      <div className={styles.detailContent}>
        <div className={styles.titleLarge}></div>
        <div className={styles.text}></div>
        <div className={styles.text}></div>
        <div className={styles.textShort}></div>
      </div>
    </div>
  );
}
