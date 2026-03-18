// 错误提示组件
// 创建时间：2026-03-07 22:47

import styles from './Error.module.css';

interface ErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({ 
  title = '出错了', 
  message = '抱歉，发生了一些错误',
  onRetry 
}: ErrorProps) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠️</div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.button} onClick={onRetry}>
          重试
        </button>
      )}
    </div>
  );
}

export function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>🔍</div>
      <h2 className={styles.title}>页面未找到</h2>
      <p className={styles.message}>抱歉，您访问的页面不存在</p>
      <a href="/" className={styles.button}>
        返回首页
      </a>
    </div>
  );
}

export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>🌐</div>
      <h2 className={styles.title}>网络错误</h2>
      <p className={styles.message}>网络连接失败，请检查网络设置</p>
      {onRetry && (
        <button className={styles.button} onClick={onRetry}>
          重试
        </button>
      )}
    </div>
  );
}
