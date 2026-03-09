const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fillDistricts() {
  try {
    console.log('=== 填充Districts表 ===\n');
    
    // 需要添加的区（按顺序）
    const districtsToAdd = [
      { name: '硚口区', order: 4 },
      { name: '青山区', order: 6 },
      { name: '东西湖区', order: 8 },
      { name: '蔡甸区', order: 9 },
      { name: '江夏区', order: 10 },
      { name: '黄陂区', order: 11 },
      { name: '新洲区', order: 12 },
      { name: '汉南区', order: 13 }
    ];
    
    // 检查现有数据
    const existing = await prisma.districts.findMany({
      orderBy: { order: 'asc' }
    });
    console.log(`现有 ${existing.length} 个区:`, existing.map(d => d.name).join(', '));
    
    // 添加缺失的区
    for (const district of districtsToAdd) {
      const exists = await prisma.districts.findFirst({
        where: { name: district.name }
      });
      
      if (!exists) {
        await prisma.districts.create({
          data: district
        });
        console.log(`✓ 已添加: ${district.name} (order: ${district.order})`);
      } else {
        console.log(`  跳过 (已存在): ${district.name}`);
      }
    }
    
    // 验证结果
    const final = await prisma.districts.findMany({
      orderBy: { order: 'asc' }
    });
    console.log(`\n最终结果: ${final.length} 个区`);
    final.forEach(d => console.log(`  ${d.order}. ${d.name}`));
    
  } catch (e) {
    console.error('错误:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

fillDistricts();
