// 加载状态组件
// 创建时间：2026-03-07 22:47

import styles from './Loading.module.css';

export function LoadingSpinner() {
  return (
    <div className={styles.spinner}>
      <div className={styles.bounce1}></div>
      <div className={styles.bounce2}></div>
      <div className={styles.bounce3}></div>
    </div>
  );
}

export function LoadingOverlay() {
  return (
    <div className={styles.overlay}>
      <LoadingSpinner />
      <p className={styles.text}>加载中...</p>
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className={styles.page}>
      <LoadingSpinner />
      <p className={styles.text}>正在加载数据...</p>
    </div>
  );
}
