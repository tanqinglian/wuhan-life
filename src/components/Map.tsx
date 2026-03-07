// 地图组件
// 创建时间：2026-03-07 22:54
// 说明：地图功能占位组件，待集成高德地图API

'use client';

import { useEffect, useRef } from 'react';
import styles from './Map.module.css';

interface MapProps {
  latitude?: number;
  longitude?: number;
  title?: string;
  address?: string;
  className?: string;
}

export function Map({
  latitude,
  longitude,
  title,
  address,
  className = '',
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO: 集成高德地图API
    // 1. 加载高德地图SDK
    // 2. 初始化地图实例
    // 3. 添加标记点
    // 4. 设置地图中心

    if (mapRef.current) {
      // 占位符：显示地图加载提示
      mapRef.current.innerHTML = `
        <div class="${styles.placeholder}">
          <div class="${styles.icon}">🗺️</div>
          <p class="${styles.text}">地图功能开发中...</p>
          <p class="${styles.hint}">经纬度: ${latitude || '未设置'}, ${longitude || '未设置'}</p>
        </div>
      `;
    }
  }, [latitude, longitude]);

  return (
    <div className={`${styles.container} ${className}`}>
      <div ref={mapRef} className={styles.map}></div>
      {title && (
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          {address && <p className={styles.address}>{address}</p>}
        </div>
      )}
    </div>
  );
}

// 路线地图组件
interface RouteMapProps {
  coordinates?: string; // JSON字符串，包含路线坐标
  startpoint?: string;
  endpoint?: string;
  className?: string;
}

export function RouteMap({
  coordinates,
  startpoint,
  endpoint,
  className = '',
}: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO: 集成高德地图API
    // 1. 解析路线坐标
    // 2. 绘制路线轨迹
    // 3. 添加起点终点标记
    // 4. 计算路线距离

    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <div class="${styles.placeholder}">
          <div class="${styles.icon}">🗺️</div>
          <p class="${styles.text}">路线地图开发中...</p>
          <p class="${styles.hint}">起点: ${startpoint || '未设置'} → 终点: ${endpoint || '未设置'}</p>
        </div>
      `;
    }
  }, [coordinates, startpoint, endpoint]);

  return (
    <div className={`${styles.container} ${className}`}>
      <div ref={mapRef} className={styles.map}></div>
      <div className={styles.routeInfo}>
        <div className={styles.routePoint}>
          <span className={styles.label}>起点</span>
          <span className={styles.value}>{startpoint || '未知'}</span>
        </div>
        <div className={styles.routeLine}></div>
        <div className={styles.routePoint}>
          <span className={styles.label}>终点</span>
          <span className={styles.value}>{endpoint || '未知'}</span>
        </div>
      </div>
    </div>
  );
}
