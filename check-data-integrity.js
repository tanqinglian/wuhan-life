const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkIntegrity() {
  try {
    console.log('=== 数据完整性检查 ===\n');
    
    // 1. 检查markets数据完整性
    console.log('【Markets表检查】');
    const markets = await prisma.markets.findMany({
      include: { districts: true }
    });
    
    const marketIssues = [];
    markets.forEach(m => {
      const issues = [];
      if (!m.address) issues.push('缺少address');
      if (!m.description) issues.push('缺少description');
      if (!m.openHours) issues.push('缺少openHours');
      if (!m.traffic) issues.push('缺少traffic');
      if (!m.latitude || !m.longitude) issues.push('缺少经纬度');
      if (!m.districtId) issues.push('缺少districtId');
      if (!m.districts) issues.push('districtId关联无效');
      
      if (issues.length > 0) {
        marketIssues.push({ name: m.name, issues });
      }
    });
    
    if (marketIssues.length > 0) {
      console.log(`发现 ${marketIssues.length} 个market有缺失字段:`);
      marketIssues.forEach(m => {
        console.log(`  - ${m.name}: ${m.issues.join(', ')}`);
      });
    } else {
      console.log('✓ 所有markets数据完整');
    }
    console.log(`总计: ${markets.length} 条记录\n`);
    
    // 2. 检查routes数据完整性
    console.log('【Routes表检查】');
    const routes = await prisma.routes.findMany();
    
    const routeIssues = [];
    routes.forEach(r => {
      const issues = [];
      if (!r.direction) issues.push('缺少direction');
      if (!r.distance) issues.push('缺少distance');
      if (!r.duration) issues.push('缺少duration');
      if (!r.description) issues.push('缺少description');
      if (!r.roadCondition) issues.push('缺少roadCondition');
      if (!r.startpoint) issues.push('缺少startpoint');
      if (!r.endpoint) issues.push('缺少endpoint');
      if (!r.coordinates) issues.push('缺少coordinates');
      
      if (issues.length > 0) {
        routeIssues.push({ name: r.name, issues });
      }
    });
    
    if (routeIssues.length > 0) {
      console.log(`发现 ${routeIssues.length} 个route有缺失字段:`);
      routeIssues.forEach(r => {
        console.log(`  - ${r.name}: ${r.issues.join(', ')}`);
      });
    } else {
      console.log('✓ 所有routes数据完整');
    }
    console.log(`总计: ${routes.length} 条记录\n`);
    
    // 3. 检查districts关联
    console.log('【Districts关联检查】');
    const districts = await prisma.districts.findMany({
      include: { markets: true },
      orderBy: { order: 'asc' }
    });
    
    districts.forEach(d => {
      console.log(`  ${d.name}: ${d.markets.length} 个markets`);
    });
    console.log('');
    
    // 4. 检查waypoints
    console.log('【Waypoints检查】');
    const routesWithWaypoints = await prisma.routes.findMany({
      include: { waypoints: true }
    });
    
    const routesWithoutWaypoints = routesWithWaypoints.filter(r => r.waypoints.length === 0);
    if (routesWithoutWaypoints.length > 0) {
      console.log(`⚠ ${routesWithoutWaypoints.length} 个routes缺少waypoints`);
    } else {
      console.log('✓ 所有routes都有waypoints');
    }
    console.log('');
    
  } catch (e) {
    console.error('错误:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkIntegrity();
