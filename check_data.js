const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkData() {
  const markets = await prisma.market.count();
  const routes = await prisma.route.count();
  console.log('MySQL数据统计:');
  console.log('夜市:', markets);
  console.log('跑山:', routes);
  console.log('总计:', markets + routes);
  await prisma.$disconnect();
}

checkData();
