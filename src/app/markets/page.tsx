import Link from "next/link";
import { prisma } from "@/lib/db";

// 夜市数据（MVP 阶段使用静态数据）
const markets = [
  {
    id: 1,
    name: "万松园夜市",
    district: "江汉区",
    address: "江汉区万松园路",
    description: "武汉最火的夜市之一，小吃种类丰富，人流量大",
    openHours: "18:00-02:00",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
    tags: ["烧烤", "小龙虾", "甜品"],
  },
  {
    id: 2,
    name: "雪松路夜市",
    district: "江汉区",
    address: "江汉区雪松路",
    description: "本地人最爱的夜市，价格实惠，味道正宗",
    openHours: "17:30-01:30",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    tags: ["热干面", "豆皮", "汤包"],
  },
  {
    id: 3,
    name: "粮道街夜市",
    district: "武昌区",
    address: "武昌区粮道街",
    description: "老武汉的味道，传统小吃聚集地",
    openHours: "18:00-00:00",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    tags: ["面窝", "糊汤粉", "烧麦"],
  },
  {
    id: 4,
    name: "光谷步行街夜市",
    district: "洪山区",
    address: "洪山区光谷步行街",
    description: "年轻人的聚集地，网红小吃多",
    openHours: "18:00-02:00",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400",
    tags: ["奶茶", "炸鸡", "网红小吃"],
  },
  {
    id: 5,
    name: "钟家村夜市",
    district: "汉阳区",
    address: "汉阳区钟家村",
    description: "汉阳最大的夜市，品类齐全",
    openHours: "17:00-01:00",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
    tags: ["烧烤", "串串", "冰粉"],
  },
  {
    id: 6,
    name: "司门口夜市",
    district: "武昌区",
    address: "武昌区司门口",
    description: "黄鹤楼脚下的老夜市，游客必打卡",
    openHours: "18:00-23:30",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400",
    tags: ["臭豆腐", "烤冷面", "糖葫芦"],
  },
];

const districts = ["全部", "江汉区", "武昌区", "洪山区", "汉阳区", "硚口区"];

export default function MarketsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">夜市探索</h1>
          <p className="text-white/90">发现武汉最地道的夜市美食</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b sticky top-14 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {districts.map((district) => (
              <button
                key={district}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  district === "全部"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {district}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Market Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.map((market) => (
            <Link
              key={market.id}
              href={`/markets/${market.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={market.image}
                  alt={market.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <span className="text-amber-500">★</span>
                  {market.rating}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{market.name}</h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {market.district}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                  {market.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{market.openHours}</span>
                  <div className="flex gap-1">
                    {market.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
