// 代码分割工具
// 创建时间：2026-03-07 22:49

import dynamic from 'next/dynamic';
import { LoadingSpinner } from './Loading';

// 动态导入组件（带加载状态）
export function dynamicImport<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: {
    ssr?: boolean;
    loading?: string;
  } = {}
) {
  return dynamic(importFn, {
    ssr: options.ssr ?? false,
    loading: () => <LoadingSpinner />,
    ...options,
  });
}

// 预加载组件
export function preloadComponent(importFn: () => Promise<any>) {
  return importFn();
}

// 预加载页面
export function preloadPage(route: string) {
  if (typeof window !== 'undefined') {
    // 预加载页面资源
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  }
}
