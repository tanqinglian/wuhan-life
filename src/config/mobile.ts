// 移动端优化配置
// 创建时间：2026-03-07 22:56

export const mobileConfig = {
  // 断点
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1280,
  },

  // 触摸反馈
  touch: {
    delay: 100, // 触摸延迟（毫秒）
    scale: 0.98, // 按压缩放
    opacity: 0.9, // 按压透明度
  },

  // 滚动
  scroll: {
    threshold: 50, // 滚动阈值
    debounce: 100, // 防抖延迟
  },

  // 图片
  image: {
    lazyLoad: true, // 懒加载
    placeholder: true, // 占位图
    quality: 75, // 图片质量
  },

  // 动画
  animation: {
    duration: 300, // 动画时长
    easing: 'ease-out', // 缓动函数
  },

  // 缓存
  cache: {
    api: 5 * 60 * 1000, // API缓存（5分钟）
    static: 24 * 60 * 60 * 1000, // 静态资源缓存（24小时）
  },

  // 性能
  performance: {
    prefetch: true, // 预加载
    preload: true, // 预取
    optimize: true, // 优化
  },
};

// 移动端检测
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// 触摸设备检测
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;

  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// 获取设备像素比
export function getDevicePixelRatio(): number {
  if (typeof window === 'undefined') return 1;

  return window.devicePixelRatio || 1;
}

// 获取安全区域
export function getSafeAreaInsets(): {
  top: number;
  bottom: number;
  left: number;
  right: number;
} {
  if (typeof window === 'undefined') {
    return { top: 0, bottom: 0, left: 0, right: 0 };
  }

  const style = getComputedStyle(document.documentElement);

  return {
    top: parseInt(style.getPropertyValue('env(safe-area-inset-top)') || '0'),
    bottom: parseInt(style.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
    left: parseInt(style.getPropertyValue('env(safe-area-inset-left)') || '0'),
    right: parseInt(style.getPropertyValue('env(safe-area-inset-right)') || '0'),
  };
}
