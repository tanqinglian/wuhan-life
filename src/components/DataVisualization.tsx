// 数据可视化组件
// 创建时间：2026-03-07 22:58

'use client';

import { useEffect, useState } from 'react';
import { performanceMonitor } from '@/lib/performance-monitor';
import styles from './DataVisualization.module.css';

interface Stats {
  totalMarkets: number;
  totalRoutes: number;
  totalViews: number;
  avgRating: number;
}

export function DataVisualization() {
  const [stats, setStats] = useState<Stats>({
    totalMarkets: 10,
    totalRoutes: 17,
    totalViews: 1000,
    avgRating: 4.5,
  });

  const [performanceData, setPerformanceData] = useState<any>({});

  useEffect(() => {
    // 获取性能数据
    const perfData = performanceMonitor.getPerformanceReport();
    setPerformanceData(perfData);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📊 数据统计</h2>

      {/* 基础统计 */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🌃</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.totalMarkets}</div>
            <div className={styles.statLabel}>夜市总数</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🏔️</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.totalRoutes}</div>
            <div className={styles.statLabel}>跑山路线</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>👁️</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.totalViews}+</div>
            <div className={styles.statLabel}>总浏览量</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>⭐</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.avgRating}</div>
            <div className={styles.statLabel}>平均评分</div>
          </div>
        </div>
      </div>

      {/* 性能数据 */}
      {Object.keys(performanceData).length > 0 && (
        <div className={styles.performanceSection}>
          <h3 className={styles.sectionTitle}>⚡ API性能</h3>
          <div className={styles.performanceList}>
            {Object.entries(performanceData).map(([apiName, data]: [string, any]) => (
              <div key={apiName} className={styles.performanceItem}>
                <span className={styles.apiName}>{apiName}</span>
                <span className={styles.apiAvg}>{data.avg.toFixed(0)}ms</span>
                <span className={styles.apiCount}>({data.count}次)</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 系统健康度 */}
      <div className={styles.healthSection}>
        <h3 className={styles.sectionTitle}>❤️ 系统健康度</h3>
        <div className={styles.healthBar}>
          <div className={styles.healthFill} style={{ width: '100%' }}></div>
        </div>
        <div className={styles.healthScore}>100/100</div>
      </div>
    </div>
  );
}
