// 性能监控工具
// 创建时间：2026-03-07 21:44

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // 记录API响应时间
  recordApiResponse(apiName: string, duration: number) {
    if (!this.metrics.has(apiName)) {
      this.metrics.set(apiName, []);
    }
    this.metrics.get(apiName)!.push(duration);
    
    // 只保留最近100条记录
    const records = this.metrics.get(apiName)!;
    if (records.length > 100) {
      records.shift();
    }
  }

  // 获取API平均响应时间
  getAverageResponseTime(apiName: string): number {
    const records = this.metrics.get(apiName);
    if (!records || records.length === 0) return 0;
    
    const sum = records.reduce((a, b) => a + b, 0);
    return sum / records.length;
  }

  // 获取性能报告
  getPerformanceReport(): Record<string, { avg: number; min: number; max: number; count: number }> {
    const report: Record<string, any> = {};
    
    this.metrics.forEach((records, apiName) => {
      if (records.length === 0) return;
      
      report[apiName] = {
        avg: this.getAverageResponseTime(apiName),
        min: Math.min(...records),
        max: Math.max(...records),
        count: records.length,
      };
    });
    
    return report;
  }

  // 清空记录
  clear() {
    this.metrics.clear();
  }
}

// 导出单例
export const performanceMonitor = PerformanceMonitor.getInstance();

// API性能装饰器
export function measurePerformance(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = async function (...args: any[]) {
    const start = Date.now();
    const result = await originalMethod.apply(this, args);
    const duration = Date.now() - start;
    
    performanceMonitor.recordApiResponse(propertyKey, duration);
    
    return result;
  };
  
  return descriptor;
}
