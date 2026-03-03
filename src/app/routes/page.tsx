import Link from "next/link";

// 跑山路线数据（MVP 阶段使用静态数据）
const routes = [
  {
    id: 1,
    name: "东湖绿道环线",
    direction: "东",
    distance: 28,
    duration: "2-3小时",
    difficulty: 1,
    description: "城市中的骑行天堂，湖光山色美不胜收",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400",
    tags: ["新手友好", "骑行", "湖景"],
  },
  {
    id: 2,
    name: "江夏八分山",
    direction: "南",
    distance: 45,
    duration: "3-4小时",
    difficulty: 2,
    description: "武汉南部的制高点，俯瞰城市全景",
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=400",
    tags: ["观景", "日出", "摄影"],
  },
  {
    id: 3,
    name: "蔡甸后官湖",
    direction: "西",
    distance: 35,
    duration: "2-3小时",
    difficulty: 1,
    description: "环湖路线，路况良好，适合休闲骑行",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    tags: ["湖景", "休闲", "露营"],
  },
  {
    id: 4,
    name: "黄陂木兰山",
    direction: "北",
    distance: 85,
    duration: "5-6小时",
    difficulty: 4,
    description: "挑战级路线，山路蜿蜒，风景绝美",
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400",
    tags: ["挑战", "山路", "寺庙"],
  },
  {
    id: 5,
    name: "新洲道观河",
    direction: "东",
    distance: 55,
    duration: "3-4小时",
    difficulty: 2,
    description: "沿河而行，田园风光，适合周末放松",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400",
    tags: ["田园", "河景", "农家乐"],
  },
  {
    id: 6,
    name: "孝感双峰山",
    direction: "北",
    distance: 120,
    duration: "6-7小时",
    difficulty: 5,
    description: "长途挑战路线，翻山越岭，适合老司机",
    image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=400",
    tags: ["长途", "挑战", "山景"],
  },
];

const directions = [
  { key: "all", label: "全部" },
  { key: "东", label: "东 🌅" },
  { key: "南", label: "南 🌴" },
  { key: "西", label: "西 🌄" },
  { key: "北", label: "北 ⛰️" },
];

const difficultyLabels = ["", "新手", "简单", "中等", "困难", "挑战"];

export default function RoutesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">跑山路线</h1>
          <p className="text-white/90">精选武汉周边一日游路线，周末出行不迷路</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b sticky top-14 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {directions.map((dir) => (
              <button
                key={dir.key}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  dir.key === "all"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {dir.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Route Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route) => (
            <Link
              key={route.id}
              href={`/routes/${route.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={route.image}
                  alt={route.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                  {route.direction}方向
                </div>
                <div className="absolute top-3 right-3 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {difficultyLabels[route.difficulty]}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2">{route.name}</h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                  {route.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <span>里程 {route.distance}km</span>
                  <span>时长 {route.duration}</span>
                </div>
                <div className="flex gap-1">
                  {route.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
