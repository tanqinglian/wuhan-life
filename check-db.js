const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const markets = await prisma.markets.count();
    const routes = await prisma.routes.count();
    console.log('Markets:', markets, '| Routes:', routes);
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

check();
