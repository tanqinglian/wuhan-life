/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态资源缓存配置
  async headers() {
    return [
      {
        // 静态资源缓存（1年）
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // 图片资源缓存（1个月）
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        // API缓存（5分钟）
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=600',
          },
        ],
      },
    ];
  },

  // 图片优化配置
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 实验性功能
  experimental: {
    // 优化包导入
    optimizePackageImports: ['@prisma/client'],
  },

  // 压缩配置
  compress: true,

  // 生成Etags
  generateEtags: true,

  // powered-by头
  poweredByHeader: false,
};

module.exports = nextConfig;
