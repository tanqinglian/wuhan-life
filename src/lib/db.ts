import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  errorFormat: 'pretty',
})

// 数据库连接错误处理
if (process.env.NODE_ENV !== 'production') {
  prisma.$connect().catch((error) => {
    console.error('❌ 数据库连接失败:', error)
    console.error('请检查 DATABASE_URL 和 DIRECT_URL 环境变量是否正确配置')
  })
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
