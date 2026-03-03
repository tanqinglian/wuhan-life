import { describe, it, expect } from 'vitest'
import { prisma } from '@/lib/db'

describe('Database Connection', () => {
  it('should connect to database', async () => {
    await expect(prisma.$connect()).resolves.not.toThrow()
  })

  it('should have districts data', async () => {
    const districts = await prisma.district.findMany()
    expect(districts.length).toBeGreaterThan(0)
    expect(districts[0].name).toBeDefined()
  })

  it('should have markets data', async () => {
    const markets = await prisma.market.findMany()
    expect(markets.length).toBeGreaterThan(0)
    expect(markets[0].name).toBeDefined()
    expect(markets[0].rating).toBeDefined()
  })

  it('should have routes data', async () => {
    const routes = await prisma.route.findMany()
    expect(routes.length).toBeGreaterThan(0)
    expect(routes[0].name).toBeDefined()
    expect(routes[0].distance).toBeDefined()
  })
})

describe('Database Queries', () => {
  it('should query market with district', async () => {
    const market = await prisma.market.findFirst({
      include: { district: true }
    })
    expect(market).toBeDefined()
    expect(market?.district.name).toBeDefined()
  })

  it('should query route', async () => {
    const route = await prisma.route.findFirst()
    expect(route).toBeDefined()
    expect(route?.name).toBeDefined()
    expect(route?.distance).toBeDefined()
  })

  it('should filter markets by rating', async () => {
    const markets = await prisma.market.findMany({
      where: { rating: { gte: 4.0 } },
      orderBy: { rating: 'desc' }
    })
    expect(markets.length).toBeGreaterThan(0)
    expect(markets[0].rating).toBeGreaterThanOrEqual(4.0)
  })

  it('should count markets', async () => {
    const count = await prisma.market.count()
    expect(count).toBe(3)
  })

  it('should count routes', async () => {
    const count = await prisma.route.count()
    expect(count).toBe(2)
  })

  it('should query districts with markets', async () => {
    const districts = await prisma.district.findMany({
      include: {
        markets: true
      }
    })
    expect(districts.length).toBeGreaterThan(0)
    expect(districts[0].markets).toBeDefined()
  })
})
