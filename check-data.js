const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkData() {
  const markets = await prisma.market.count();
  const routes = await prisma.route.count();
  console.log('Markets:', markets);
  console.log('Routes:', routes);
  console.log('Total:', markets + routes);
  await prisma.$disconnect();
}

checkData();
