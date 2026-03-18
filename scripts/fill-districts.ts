import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const districts = [
  { name: '江岸区', order: 1 },
  { name: '江汉区', order: 2 },
  { name: '硚口区', order: 3 },
  { name: '汉阳区', order: 4 },
  { name: '武昌区', order: 5 },
  { name: '青山区', order: 6 },
  { name: '洪山区', order: 7 },
  { name: '东西湖区', order: 8 },
  { name: '汉南区', order: 9 },
  { name: '蔡甸区', order: 10 },
  { name: '江夏区', order: 11 },
  { name: '黄陂区', order: 12 },
  { name: '新洲区', order: 13 },
];

async function main() {
  console.log('开始填充districts数据...');
  
  for (const district of districts) {
    const result = await prisma.districts.upsert({
      where: { name: district.name },
      update: { order: district.order },
      create: district,
    });
    console.log(`[OK] ${result.name}`);
  }
  
  const count = await prisma.districts.count();
  console.log(`\n填充完成！共 ${count} 个区`);
}

main()
  .catch((e) => {
    console.error('[ERROR]', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
