import Link from "next/link";

// 模拟夜市详情数据
const marketData: Record<number, {
  id: number;
  name: string;
  district: string;
  address: string;
  description: string;
  openHours: string;
  bestTime: string;
  traffic: string;
  tips: string;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  foods: Array<{
    id: number;
    name: string;
    shopName: string;
    price: string;
    description: string;
    rating: number;
    image: string;
    tags: string[];
  }>;
  reviews: Array<{
    id: number;
    user: string;
    avatar: string;
    rating: number;
    content: string;
    date: string;
    images: string[];
  }>;
}> = {
  1: {
    id: 1,
    name: "万松园夜市",
    district: "江汉区",
    address: "江汉区万松园路",
    description: "武汉最火的夜市之一，汇聚了来自全国各地的美食。这里的小吃种类丰富，从武汉本地特色到网红小吃应有尽有。人流量大，氛围热闹，是体验武汉夜生活的绝佳去处。",
    openHours: "18:00-02:00",
    bestTime: "19:00-21:00",
    traffic: "地铁2号线青年路站B口，步行约500米",
    tips: "周末人特别多，建议早点去占座。部分摊位只收现金或特定支付方式。",
    rating: 4.8,
    reviewCount: 328,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    ],
    foods: [
      {
        id: 1,
        name: "麻辣小龙虾",
        shopName: "老王龙虾",
        price: "68-128元/份",
        description: "招牌必点，麻辣鲜香，虾肉饱满Q弹",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
        tags: ["辣", "人气TOP"],
      },
      {
        id: 2,
        name: "炭烤生蚝",
        shopName: "蚝门盛宴",
        price: "5-8元/个",
        description: "新鲜生蚝，蒜蓉烤制，鲜嫩多汁",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400",
        tags: ["鲜美", "性价比高"],
      },
      {
        id: 3,
        name: "手工冰粉",
        shopName: "冰粉奶奶",
        price: "8-15元/份",
        description: "传统手工冰粉，配料丰富，清凉解辣",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
        tags: ["解辣神器", "甜品"],
      },
      {
        id: 4,
        name: "铁板鱿鱼",
        shopName: "鱿鱼哥",
        price: "15-25元/份",
        description: "现烤现卖，外焦里嫩，酱香浓郁",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400",
        tags: ["下酒", "必吃"],
      },
    ],
    reviews: [
      {
        id: 1,
        user: "吃货小王",
        avatar: "https://i.pravatar.cc/40?img=1",
        rating: 5,
        content: "武汉夜市的天花板！小龙虾太绝了，吃完还想去",
        date: "3天前",
        images: [],
      },
      {
        id: 2,
        user: "美食探店家",
        avatar: "https://i.pravatar.cc/40?img=2",
        rating: 4,
        content: "种类很多，价格略贵但味道确实好。建议避开周末高峰期",
        date: "1周前",
        images: ["https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200"],
      },
    ],
  },
};

export default function MarketDetailPage({ params }: { params: { id: string } }) {
  const market = marketData[1]; // MVP 使用固定数据

  if (!market) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">夜市不存在</h2>
          <Link href="/markets" className="text-orange-500 hover:underline">
            返回夜市列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-64 md:h-80">
        <img
          src={market.image}
          alt={market.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">
                {market.district}
              </span>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-amber-400">★</span>
                {market.rating}
                <span className="text-white/70">({market.reviewCount}条评价)</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{market.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Info Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-gray-600 mb-6">{market.description}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <div className="font-medium text-gray-900">地址</div>
                    <div className="text-gray-500 text-sm">{market.address}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">🕐</span>
                  <div>
                    <div className="font-medium text-gray-900">营业时间</div>
                    <div className="text-gray-500 text-sm">{market.openHours}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">🚇</span>
                  <div>
                    <div className="font-medium text-gray-900">交通指南</div>
                    <div className="text-gray-500 text-sm">{market.traffic}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">⏰</span>
                  <div>
                    <div className="font-medium text-gray-900">最佳时间</div>
                    <div className="text-gray-500 text-sm">{market.bestTime}</div>
                  </div>
                </div>
              </div>
              {market.tips && (
                <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                  <div className="flex items-center gap-2 text-amber-800 font-medium mb-1">
                    <span>💡</span> 实用贴士
                  </div>
                  <p className="text-amber-700 text-sm">{market.tips}</p>
                </div>
              )}
            </div>

            {/* Foods Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">🍢 必吃推荐</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {market.foods.map((food) => (
                  <div
                    key={food.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-[3/2] relative">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 px-2 py-0.5 rounded text-sm font-medium flex items-center gap-1">
                        <span className="text-amber-500">★</span>
                        {food.rating}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-bold text-gray-900">{food.name}</h3>
                        <span className="text-orange-500 text-sm font-medium">
                          {food.price}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm mb-2">{food.shopName}</p>
                      <p className="text-gray-600 text-sm mb-3">{food.description}</p>
                      <div className="flex gap-1">
                        {food.tags.map((tag) => (
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
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">💬 用户评价</h2>
              <div className="space-y-4">
                {market.reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={review.avatar}
                        alt={review.user}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{review.user}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={
                                  i < review.rating ? "text-amber-400" : "text-gray-300"
                                }
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span>{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.content}</p>
                    {review.images.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {review.images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt=""
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-3 text-center text-orange-500 font-medium hover:bg-orange-50 rounded-xl transition-colors">
                查看更多评价
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-4 shadow-sm sticky top-20">
              <button className="w-full py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors mb-3">
                🗺️ 导航前往
              </button>
              <button className="w-full py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                ❤️ 收藏夜市
              </button>
            </div>

            {/* Photo Gallery */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">📷 照片</h3>
              <div className="grid grid-cols-3 gap-2">
                {market.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="aspect-square rounded-lg object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
