// 缓存工具
// 创建时间：2026-03-07 22:50

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class CacheManager {
  private cache: Map<string, CacheItem<any>> = new Map();
  private defaultExpiry: number = 5 * 60 * 1000; // 5分钟

  // 设置缓存
  set<T>(key: string, data: T, expiry: number = this.defaultExpiry): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry,
    });
  }

  // 获取缓存
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    // 检查是否过期
    if (Date.now() - item.timestamp > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  // 删除缓存
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  // 清空缓存
  clear(): void {
    this.cache.clear();
  }

  // 获取缓存大小
  size(): number {
    return this.cache.size;
  }

  // 检查缓存是否存在
  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;
    
    // 检查是否过期
    if (Date.now() - item.timestamp > item.expiry) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }
}

// 导出单例
export const cache = new CacheManager();

// API缓存装饰器
export function cacheApi(expiry: number = 5 * 60 * 1000) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cacheKey = `${propertyKey}_${JSON.stringify(args)}`;
      
      // 检查缓存
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        return cachedData;
      }
      
      // 执行原方法
      const result = await originalMethod.apply(this, args);
      
      // 缓存结果
      cache.set(cacheKey, result, expiry);
      
      return result;
    };

    return descriptor;
  };
}
