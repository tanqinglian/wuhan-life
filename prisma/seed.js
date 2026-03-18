const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 区域数据
  const districts = await prisma.districts.createMany({
    data: [
      { id: 1, name: '江汉区', order: 1 },
      { id: 2, name: '武昌区', order: 2 },
      { id: 3, name: '汉阳区', order: 3 },
      { id: 4, name: '洪山区', order: 4 },
      { id: 5, name: '江岸区', order: 5 },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${districts.count} districts`);

  // 夜市数据
  const markets = await prisma.markets.createMany({
    data: [
      { id: 1, name: '江汉路夜市', districtId: 1, address: '江汉路步行街', description: '武汉最繁华的夜市，汇集各地小吃', openHours: '18:00-02:00', bestTime: '20:00-23:00', traffic: '地铁2号线江汉路站', tips: '周末人多，建议工作日前往', rating: 4.5, viewCount: 1250, isActive: true },
      { id: 2, name: '户部巷夜市', districtId: 2, address: '武昌区户部巷', description: '武汉传统小吃街，热干面发源地', openHours: '17:00-01:00', bestTime: '19:00-22:00', traffic: '公交户部巷站', tips: '建议早点去，热门店铺会排长队', rating: 4.3, viewCount: 980, isActive: true },
      { id: 3, name: '汉阳江滩夜市', districtId: 3, address: '汉阳江滩公园', description: '江景夜市，环境优美', openHours: '18:00-23:00', bestTime: '19:00-21:00', traffic: '地铁4号线拦江路站', tips: '适合约会，夜景很美', rating: 4.2, viewCount: 654, isActive: true },
      { id: 4, name: '光谷步行街夜市', districtId: 4, address: '光谷步行街', description: '年轻人聚集地，网红小吃多', openHours: '18:00-02:00', bestTime: '20:00-24:00', traffic: '地铁2号线光谷广场站', tips: '周末非常热闹，注意保管财物', rating: 4.4, viewCount: 1100, isActive: true },
      { id: 5, name: '黎黄陂路夜市', districtId: 5, address: '江岸区黎黄陂路', description: '文艺小资夜市，咖啡酒吧', openHours: '17:00-01:00', bestTime: '19:00-23:00', traffic: '公交黎黄陂路站', tips: '适合拍照，氛围很好', rating: 4.6, viewCount: 890, isActive: true },
      { id: 6, name: '保成路夜市', districtId: 1, address: '江汉区保成路', description: '老武汉夜市，烟火气十足', openHours: '18:00-02:00', bestTime: '20:00-23:00', traffic: '地铁2号线循礼门站', tips: '小吃价格实惠，推荐烤串', rating: 4.4, viewCount: 756, isActive: true },
      { id: 7, name: '长堤街夜市', districtId: 3, address: '汉阳区长堤街', description: '汉阳最热闹的夜市', openHours: '17:00-01:00', bestTime: '19:00-22:00', traffic: '公交长堤街站', tips: '烧烤很有名', rating: 4.3, viewCount: 623, isActive: true },
      { id: 8, name: '万松园夜市', districtId: 1, address: '江汉区万松园路', description: '美食聚集地，宵夜首选', openHours: '18:00-03:00', bestTime: '21:00-01:00', traffic: '地铁2号线青年路站', tips: '小龙虾季节人超多', rating: 4.7, viewCount: 1560, isActive: true },
      { id: 9, name: '司门口夜市', districtId: 2, address: '武昌区司门口', description: '武昌老夜市，历史悠久', openHours: '17:00-24:00', bestTime: '19:00-22:00', traffic: '公交司门口站', tips: '豆皮和热干面必吃', rating: 4.2, viewCount: 534, isActive: true },
      { id: 10, name: '鲁巷夜市', districtId: 4, address: '洪山区鲁巷', description: '大学生最爱，价格便宜', openHours: '18:00-01:00', bestTime: '20:00-23:00', traffic: '地铁2号线光谷广场站', tips: '适合学生党消费', rating: 4.1, viewCount: 876, isActive: true },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${markets.count} markets`);

  // 跑山路线数据
  const routes = await prisma.routes.createMany({
    data: [
      { id: 1, name: '木兰山环线', direction: '北', distance: 85, duration: '3-4小时', difficulty: 3, description: '武汉北部经典跑山路线，山景优美', roadCondition: '柏油路，路况良好', bestSeason: '春秋两季', tips: '建议早上出发，带好饮用水', startpoint: '黄陂区木兰山脚下', endpoint: '木兰山风景区', rating: 4.7, viewCount: 560, isActive: true },
      { id: 2, name: '东湖绿道环线', direction: '东', distance: 28, duration: '1-2小时', difficulty: 1, description: '东湖湖景路线，适合新手', roadCondition: '柏油路，骑行道', bestSeason: '四季皆宜', tips: '周末人多，建议工作日', startpoint: '东湖梨园', endpoint: '东湖磨山', rating: 4.5, viewCount: 890, isActive: true },
      { id: 3, name: '江夏青龙山', direction: '南', distance: 45, duration: '2-3小时', difficulty: 2, description: '南部山区路线，风景秀丽', roadCondition: '部分山路，注意安全', bestSeason: '春夏季节', tips: '山路弯多，控制车速', startpoint: '江夏区纸坊', endpoint: '青龙山森林公园', rating: 4.3, viewCount: 320, isActive: true },
      { id: 4, name: '蔡甸九真山', direction: '西', distance: 60, duration: '3小时', difficulty: 2, description: '西部山区路线，空气清新', roadCondition: '柏油路为主', bestSeason: '春秋季节', tips: '有农家乐，可以品尝农家菜', startpoint: '蔡甸区城区', endpoint: '九真山风景区', rating: 4.4, viewCount: 280, isActive: true },
      { id: 5, name: '新洲道观河', direction: '北', distance: 70, duration: '3-4小时', difficulty: 3, description: '北部水库路线，风景宜人', roadCondition: '乡道为主，注意会车', bestSeason: '春夏季节', tips: '途经水库，风景很好', startpoint: '新洲区城区', endpoint: '道观河水库', rating: 4.2, viewCount: 210, isActive: true },
      { id: 6, name: '黄陂云雾山', direction: '北', distance: 90, duration: '4-5小时', difficulty: 4, description: '武汉最高峰，挑战性强', roadCondition: '山路较多，需要经验', bestSeason: '春季', tips: '杜鹃花季最美，需要门票', startpoint: '黄陂区李家集', endpoint: '云雾山风景区', rating: 4.6, viewCount: 450, isActive: true },
      { id: 7, name: '江夏八分山', direction: '南', distance: 35, duration: '2小时', difficulty: 1, description: '适合半日游的小众路线', roadCondition: '柏油路，路况好', bestSeason: '四季皆宜', tips: '山顶视野很好，适合拍照', startpoint: '江夏区纸坊', endpoint: '八分山', rating: 4.1, viewCount: 189, isActive: true },
      { id: 8, name: '黄陂木兰天池', direction: '北', distance: 55, duration: '2-3小时', difficulty: 2, description: '山水相依，风景优美', roadCondition: '柏油路为主', bestSeason: '春秋季节', tips: '可以顺便游览景区', startpoint: '黄陂区长轩岭', endpoint: '木兰天池', rating: 4.4, viewCount: 367, isActive: true },
      { id: 9, name: '蔡甸嵩阳山', direction: '西', distance: 40, duration: '2小时', difficulty: 2, description: '西部山区短途路线', roadCondition: '部分山路', bestSeason: '春秋季节', tips: '人少安静，适合放松', startpoint: '蔡甸区索河', endpoint: '嵩阳寺', rating: 4.0, viewCount: 156, isActive: true },
      { id: 10, name: '东西湖金银湖', direction: '西', distance: 25, duration: '1-2小时', difficulty: 1, description: '湖景路线，平坦好走', roadCondition: '柏油路', bestSeason: '四季皆宜', tips: '适合骑行和散步', startpoint: '东西湖区金银湖', endpoint: '金银湖湿地公园', rating: 4.2, viewCount: 234, isActive: true },
      { id: 11, name: '汉南纱帽街', direction: '南', distance: 50, duration: '2-3小时', difficulty: 2, description: '南部沿江路线', roadCondition: '柏油路，路况好', bestSeason: '春秋季节', tips: '江景不错，适合傍晚', startpoint: '汉南区纱帽', endpoint: '长江边', rating: 4.0, viewCount: 145, isActive: true },
      { id: 12, name: '黄陂清凉寨', direction: '北', distance: 100, duration: '4-5小时', difficulty: 4, description: '夏季避暑胜地', roadCondition: '山路较多', bestSeason: '夏季', tips: '夏季温度比市区低5-8度', startpoint: '黄陂区蔡店', endpoint: '清凉寨风景区', rating: 4.5, viewCount: 389, isActive: true },
      { id: 13, name: '新洲涨渡湖', direction: '北', distance: 45, duration: '2小时', difficulty: 1, description: '湿地风光路线', roadCondition: '乡道', bestSeason: '春秋季节', tips: '观鸟好去处', startpoint: '新洲区涨渡湖', endpoint: '涨渡湖湿地', rating: 4.1, viewCount: 178, isActive: true },
      { id: 14, name: '江夏梁子湖', direction: '南', distance: 60, duration: '3小时', difficulty: 2, description: '湖北第二大湖', roadCondition: '柏油路为主', bestSeason: '夏秋季节', tips: '可以吃梁子湖大闸蟹', startpoint: '江夏区豹澥', endpoint: '梁子湖', rating: 4.3, viewCount: 298, isActive: true },
      { id: 15, name: '黄陂锦里沟', direction: '北', distance: 75, duration: '3-4小时', difficulty: 3, description: '土家风情景区', roadCondition: '山路', bestSeason: '春夏季节', tips: '有玻璃桥，适合拍照', startpoint: '黄陂区蔡店', endpoint: '锦里沟', rating: 4.4, viewCount: 312, isActive: true },
      { id: 16, name: '蔡甸后官湖', direction: '西', distance: 30, duration: '1-2小时', difficulty: 1, description: '湖景绿道路线', roadCondition: '绿道', bestSeason: '四季皆宜', tips: '适合骑行', startpoint: '蔡甸区后官湖', endpoint: '后官湖绿道', rating: 4.2, viewCount: 267, isActive: true },
      { id: 17, name: '黄陂大余湾', direction: '北', distance: 65, duration: '3小时', difficulty: 2, description: '古村落路线', roadCondition: '柏油路+乡道', bestSeason: '春秋季节', tips: '明清古建筑群', startpoint: '黄陂区木兰乡', endpoint: '大余湾古村', rating: 4.3, viewCount: 198, isActive: true },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${routes.count} routes`);

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
