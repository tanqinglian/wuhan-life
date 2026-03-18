const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const markets = await prisma.market.findMany({ take: 1 });
    console.log('Markets:', markets.length);

    const routes = await prisma.route.findMany({ take: 1 });
    console.log('Routes:', routes.length);
  } catch (e) {
    console.log('Error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
