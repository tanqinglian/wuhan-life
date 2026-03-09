const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAll() {
  try {
    console.log('=== 数据库数据状态检查 ===\n');
    
    // 检查districts
    const districts = await prisma.districts.findMany({
      orderBy: { order: 'asc' }
    });
    console.log(`Districts表 (${districts.length} 条记录):`);
    districts.forEach(d => console.log(`  - ${d.name} (order: ${d.order})`));
    console.log('');
    
    // 检查markets
    const markets = await prisma.markets.findMany({
      select: {
        id: true,
        name: true,
        districtId: true,
        address: true,
        isActive: true
      }
    });
    console.log(`Markets表 (${markets.length} 条记录):`);
    markets.forEach(m => console.log(`  - [${m.id}] ${m.name} (districtId: ${m.districtId}, active: ${m.isActive})`));
    console.log('');
    
    // 检查routes
    const routes = await prisma.routes.findMany({
      select: {
        id: true,
        name: true,
        direction: true,
        distance: true,
        difficulty: true,
        isActive: true
      }
    });
    console.log(`Routes表 (${routes.length} 条记录):`);
    routes.forEach(r => console.log(`  - [${r.id}] ${r.name} (${r.direction}, ${r.distance}km, difficulty: ${r.difficulty})`));
    console.log('');
    
    // 检查foods
    const foods = await prisma.foods.count();
    console.log(`Foods表: ${foods} 条记录\n`);
    
    // 检查waypoints
    const waypoints = await prisma.waypoints.count();
    console.log(`Waypoints表: ${waypoints} 条记录\n`);
    
  } catch (e) {
    console.error('错误:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkAll();
