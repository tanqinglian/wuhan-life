const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 武汉夜市的真实经纬度坐标
const marketCoords = {
  '江汉路夜市': { lat: 30.5810, lng: 114.2820 },
  '户部巷夜市': { lat: 30.5540, lng: 114.3050 },
  '汉阳江滩夜市': { lat: 30.5520, lng: 114.2720 },
  '光谷步行街夜市': { lat: 30.5090, lng: 114.4160 },
  '黎黄陂路夜市': { lat: 30.5840, lng: 114.2980 },
  '保成路夜市': { lat: 30.5800, lng: 114.2850 },
  '长堤街夜市': { lat: 30.5480, lng: 114.2680 },
  '万松园夜市': { lat: 30.5900, lng: 114.2810 },
  '司门口夜市': { lat: 30.5520, lng: 114.3100 },
  '鲁巷夜市': { lat: 30.5050, lng: 114.4100 }
};

async function updateMarketCoords() {
  try {
    console.log('=== 更新Markets经纬度 ===\n');
    
    const markets = await prisma.markets.findMany();
    
    for (const market of markets) {
      const coords = marketCoords[market.name];
      if (coords) {
        await prisma.markets.update({
          where: { id: market.id },
          data: {
            latitude: coords.lat,
            longitude: coords.lng
          }
        });
        console.log(`✓ 已更新: ${market.name} (${coords.lat}, ${coords.lng})`);
      } else {
        console.log(`⚠ 未找到坐标: ${market.name}`);
      }
    }
    
    console.log('\n更新完成！');
    
  } catch (e) {
    console.error('错误:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

updateMarketCoords();
