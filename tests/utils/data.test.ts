import { describe, it, expect } from 'vitest';

describe('数据处理工具函数', () => {
  describe('formatRating', () => {
    it('应该正确格式化评分', () => {
      const formatRating = (rating: number | null) => {
        if (rating === null || rating === undefined) return '暂无评分';
        return rating.toFixed(1);
      };

      expect(formatRating(4.567)).toBe('4.6');
      expect(formatRating(null)).toBe('暂无评分');
      expect(formatRating(undefined as any)).toBe('暂无评分');
    });
  });

  describe('formatViewCount', () => {
    it('应该正确格式化浏览量', () => {
      const formatViewCount = (count: number | null) => {
        if (count === null || count === undefined) return '0';
        if (count >= 10000) return `${(count / 10000).toFixed(1)}万`;
        if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
        return count.toString();
      };

      expect(formatViewCount(1560)).toBe('1.6k');
      expect(formatViewCount(12000)).toBe('1.2万');
      expect(formatViewCount(500)).toBe('500');
      expect(formatViewCount(null)).toBe('0');
    });
  });

  describe('formatDistance', () => {
    it('应该正确格式化距离', () => {
      const formatDistance = (meters: number | null) => {
        if (meters === null || meters === undefined) return '未知';
        if (meters >= 1000) return `${(meters / 1000).toFixed(1)}km`;
        return `${meters}m`;
      };

      expect(formatDistance(28000)).toBe('28.0km');
      expect(formatDistance(500)).toBe('500m');
      expect(formatDistance(null)).toBe('未知');
    });
  });

  describe('validatePage', () => {
    it('应该正确验证页码', () => {
      const validatePage = (page: string | null) => {
        const num = parseInt(page || '1');
        return num > 0 ? num : 1;
      };

      expect(validatePage('2')).toBe(2);
      expect(validatePage('0')).toBe(1);
      expect(validatePage('-1')).toBe(1);
      expect(validatePage(null)).toBe(1);
      expect(validatePage('abc')).toBe(1); // NaN会被parseInt转为NaN，然后>0判断为false
    });
  });

  describe('validateLimit', () => {
    it('应该正确验证每页数量', () => {
      const validateLimit = (limit: string | null) => {
        const num = parseInt(limit || '10');
        if (num < 1) return 10;
        if (num > 100) return 100;
        return num;
      };

      expect(validateLimit('20')).toBe(20);
      expect(validateLimit('0')).toBe(10);
      expect(validateLimit('200')).toBe(100);
      expect(validateLimit(null)).toBe(10);
    });
  });
});
