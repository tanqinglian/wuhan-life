// 国际化配置
// 创建时间：2026-03-07 22:59

export const locales = ['zh-CN', 'en-US'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'zh-CN';

export const localeNames: Record<Locale, string> = {
  'zh-CN': '简体中文',
  'en-US': 'English',
};

export const i18nConfig = {
  defaultLocale,
  locales,
  localeNames,
  // 语言检测策略
  localeDetection: true,
};

// 文本资源
export const resources = {
  'zh-CN': {
    common: {
      home: '首页',
      markets: '夜市探索',
      routes: '跑山路线',
      search: '搜索',
      loading: '加载中...',
      error: '出错了',
      retry: '重试',
      backHome: '返回首页',
    },
    markets: {
      title: '夜市探索',
      subtitle: '发现武汉最地道的夜市美食',
      rating: '评分',
      views: '浏览量',
      address: '地址',
      openHours: '营业时间',
      description: '简介',
      tips: '游玩贴士',
      foods: '推荐美食',
    },
    routes: {
      title: '跑山路线',
      subtitle: '探索武汉周边最美的骑行路线',
      difficulty: '难度',
      distance: '距离',
      duration: '时长',
      startpoint: '起点',
      endpoint: '终点',
      bestSeason: '最佳季节',
    },
  },
  'en-US': {
    common: {
      home: 'Home',
      markets: 'Night Markets',
      routes: 'Cycling Routes',
      search: 'Search',
      loading: 'Loading...',
      error: 'Error',
      retry: 'Retry',
      backHome: 'Back to Home',
    },
    markets: {
      title: 'Night Markets',
      subtitle: 'Discover authentic night markets in Wuhan',
      rating: 'Rating',
      views: 'Views',
      address: 'Address',
      openHours: 'Open Hours',
      description: 'Description',
      tips: 'Tips',
      foods: 'Recommended Foods',
    },
    routes: {
      title: 'Cycling Routes',
      subtitle: 'Explore beautiful cycling routes around Wuhan',
      difficulty: 'Difficulty',
      distance: 'Distance',
      duration: 'Duration',
      startpoint: 'Start Point',
      endpoint: 'End Point',
      bestSeason: 'Best Season',
    },
  },
};

export type Resources = typeof resources;
