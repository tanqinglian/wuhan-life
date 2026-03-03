import Link from "next/link";

// 模拟路线详情数据
const routeData: Record<number, {
  id: number;
  name: string;
  direction: string;
  distance: number;
  duration: string;
  difficulty: number;
  description: string;
  roadCondition: string;
  bestSeason: string;
  tips: string;
  startpoint: string;
  endpoint: string;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  waypoints: Array<{
    id: number;
    name: string;
    description: string;
    isHighlight: boolean;
  }>;
  foods: Array<{
    name: string;
    description: string;
    location: string;
  }>;
  reviews: Array<{
    id: number;
    user: string;
    avatar: string;
    rating: number;
    content: string;
    date: string;
  }>;
}> = {
  1: {
    id: 1,
    name: "东湖绿道环线",
    direction: "东",
    distance: 28,
    duration: "2-3小时",
    difficulty: 1,
    description: "东湖绿道是武汉城市中的一片净土，全长101.98公里，是世界级城市环湖绿道。这条路线选取了最美的一段，沿途可以欣赏湖光山色，感受城市中的自然之美。",
    roadCondition: "全程柏油路面，路况极佳，机动车禁止通行，非常安全。部分路段有树荫，夏天也比较凉爽。",
    bestSeason: "春秋两季最佳，3-5月和9-11月。夏天建议早晚出行，避开正午高温。",
    tips: "周末人较多，建议工作日或早上去。可以租自行车或电动车，绿道内有很多租车点。带好防晒和饮用水。",
    startpoint: "武汉市东湖风景区听涛景区",
    endpoint: "回到起点（环线）",
    rating: 4.9,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=400",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    ],
    waypoints: [
      { id: 1, name: "听涛景区", description: "起点，有停车场和租车点", isHighlight: true },
      { id: 2, name: "磨山景区", description: "樱花季必打卡，樱园就在这里", isHighlight: true },
      { id: 3, name: "落雁景区", description: "原生态湿地，适合观鸟", isHighlight: false },
      { id: 4, name: "白马景区", description: "有农家乐可以休息用餐", isHighlight: false },
      { id: 5, name: "吹笛景区", description: "终点前最后的休息点", isHighlight: false },
    ],
    foods: [
      { name: "东湖鱼庄", description: "正宗东湖鱼，鲜嫩可口", location: "白马景区附近" },
      { name: "农家土菜馆", description: "地道的湖北农家菜", location: "磨山景区附近" },
    ],
    reviews: [
      {
        id: 1,
        user: "骑行爱好者",
        avatar: "https://i.pravatar.cc/40?img=3",
        rating: 5,
        content: "武汉最美的骑行路线没有之一！周末早上6点出发，人少景美，太舒服了",
        date: "2天前",
      },
      {
        id: 2,
        user: "摄影师老张",
        avatar: "https://i.pravatar.cc/40?img=4",
        rating: 5,
        content: "拍了好多美照，日出时分的东湖简直绝美。强烈推荐早起骑行！",
        date: "1周前",
      },
    ],
  },
};

const difficultyLabels = ["", "新手", "简单", "中等", "困难", "挑战"];
const difficultyColors = ["", "bg-green-100 text-green-700", "bg-emerald-100 text-emerald-700", "bg-yellow-100 text-yellow-700", "bg-orange-100 text-orange-700", "bg-red-100 text-red-700"];

export default function RouteDetailPage({ params }: { params: { id: string } }) {
  const route = routeData[1]; // MVP 使用固定数据

  if (!route) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">路线不存在</h2>
          <Link href="/routes" className="text-emerald-500 hover:underline">
            返回路线列表
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
          src={route.image}
          alt={route.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">
                {route.direction}方向
              </span>
              <span className={`text-xs px-2 py-0.5 rounded ${difficultyColors[route.difficulty]}`}>
                {difficultyLabels[route.difficulty]}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{route.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{route.distance}km</div>
                  <div className="text-gray-500 text-sm">总里程</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{route.duration}</div>
                  <div className="text-gray-500 text-sm">预计时长</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl font-bold text-gray-900">{route.rating}</span>
                    <span className="text-amber-400">★</span>
                  </div>
                  <div className="text-gray-500 text-sm">{route.reviewCount}条评价</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">路线介绍</h2>
              <p className="text-gray-600 leading-relaxed">{route.description}</p>
            </div>

            {/* Waypoints */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">🗺️ 途经点</h2>
              <div className="space-y-4">
                {route.waypoints.map((wp, index) => (
                  <div key={wp.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        wp.isHighlight ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-600"
                      }`}>
                        {index + 1}
                      </div>
                      {index < route.waypoints.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">{wp.name}</h3>
                        {wp.isHighlight && (
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                            推荐
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm mt-1">{wp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Road Condition & Tips */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>🛣️</span> 路况说明
                  </h3>
                  <p className="text-gray-600 text-sm">{route.roadCondition}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>🌸</span> 最佳季节
                  </h3>
                  <p className="text-gray-600 text-sm">{route.bestSeason}</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                <div className="flex items-center gap-2 text-emerald-800 font-medium mb-1">
                  <span>💡</span> 出行建议
                </div>
                <p className="text-emerald-700 text-sm">{route.tips}</p>
              </div>
            </div>

            {/* Foods */}
            {route.foods.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">🍜 沿途美食</h2>
                <div className="space-y-3">
                  {route.foods.map((food, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-xl">🍽️</span>
                      <div>
                        <div className="font-medium text-gray-900">{food.name}</div>
                        <p className="text-gray-500 text-sm">{food.description}</p>
                        <p className="text-gray-400 text-xs mt-1">📍 {food.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">💬 骑友评价</h2>
              <div className="space-y-4">
                {route.reviews.map((review) => (
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
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-4 shadow-sm sticky top-20">
              <button className="w-full py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors mb-3">
                🗺️ 开始导航
              </button>
              <button className="w-full py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors mb-3">
                📥 下载轨迹
              </button>
              <button className="w-full py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                ❤️ 收藏路线
              </button>
            </div>

            {/* Route Info */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">📍 起终点</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-500">●</span>
                  <div>
                    <div className="text-gray-500">起点</div>
                    <div className="text-gray-900">{route.startpoint}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">●</span>
                  <div>
                    <div className="text-gray-500">终点</div>
                    <div className="text-gray-900">{route.endpoint}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photos */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">📷 路线照片</h3>
              <div className="grid grid-cols-3 gap-2">
                {route.images.map((img, i) => (
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
