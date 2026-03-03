import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('开始填充种子数据...')

  // 创建区域数据
  const districts = await prisma.district.createMany({
    data: [
      { id: 1, name: '江汉区', order: 1 },
      { id: 2, name: '武昌区', order: 2 },
      { id: 3, name: '汉阳区', order: 3 },
      { id: 4, name: '洪山区', order: 4 },
      { id: 5, name: '江岸区', order: 5 },
    ],
  })
  console.log(`✅ 创建了 ${districts.count} 个区域`)

  // 创建夜市数据
  const markets = await prisma.market.createMany({
    data: [
      {
        id: 1,
        name: '江汉路夜市',
        districtId: 1,
        address: '江汉路步行街',
        description: '武汉最繁华的夜市，汇集各地小吃',
        openHours: '18:00-02:00',
        bestTime: '20:00-23:00',
        traffic: '地铁2号线江汉路站',
        tips: '周末人多，建议工作日前往',
        images: '[]',
        rating: 4.5,
        viewCount: 1250,
        isActive: true,
      },
      {
        id: 2,
        name: '户部巷夜市',
        districtId: 2,
        address: '武昌区户部巷',
        description: '武汉传统小吃街，热干面发源地',
        openHours: '17:00-01:00',
        bestTime: '19:00-22:00',
        traffic: '公交户部巷站',
        tips: '建议早点去，热门店铺会排长队',
        images: '[]',
        rating: 4.3,
        viewCount: 980,
        isActive: true,
      },
      {
        id: 3,
        name: '汉阳江滩夜市',
        districtId: 3,
        address: '汉阳江滩公园',
        description: '江景夜市，环境优美',
        openHours: '18:00-23:00',
        bestTime: '19:00-21:00',
        traffic: '地铁4号线拦江路站',
        tips: '适合约会，夜景很美',
        images: '[]',
        rating: 4.2,
        viewCount: 654,
        isActive: true,
      },
    ],
  })
  console.log(`✅ 创建了 ${markets.count} 个夜市`)

  // 创建跑山路线数据
  const routes = await prisma.route.createMany({
    data: [
      {
        id: 1,
        name: '木兰山环线',
        direction: '北',
        distance: 85,
        duration: '3-4小时',
        difficulty: 3,
        description: '武汉北部经典跑山路线，山景优美',
        roadCondition: '柏油路，路况良好',
        bestSeason: '春秋两季',
        tips: '建议早上出发，带好饮用水',
        startpoint: '黄陂区木兰山脚下',
        endpoint: '木兰山风景区',
        images: '[]',
        rating: 4.7,
        viewCount: 560,
        isActive: true,
      },
      {
        id: 2,
        name: '东湖绿道环线',
        direction: '东',
        distance: 28,
        duration: '1-2小时',
        difficulty: 1,
        description: '东湖湖景路线，适合新手',
        roadCondition: '柏油路，骑行道',
        bestSeason: '四季皆宜',
        tips: '周末人多，建议工作日',
        startpoint: '东湖梨园',
        endpoint: '东湖磨山',
        images: '[]',
        rating: 4.5,
        viewCount: 890,
        isActive: true,
      },
    ],
  })
  console.log(`✅ 创建了 ${routes.count} 条跑山路线`)

  console.log('✅ 种子数据填充完成！')
}

main()
  .catch((e) => {
    console.error('❌ 错误:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
