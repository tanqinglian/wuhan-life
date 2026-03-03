import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            武汉生活
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-xl">
            发现武汉夜市的烟火气，探索周边跑山的自由感
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/markets"
              className="px-6 py-3 bg-white text-orange-600 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              🍢 探索夜市
            </Link>
            <Link
              href="/routes"
              className="px-6 py-3 bg-white/20 text-white rounded-full font-medium hover:bg-white/30 transition-colors border border-white/30"
            >
              🏔️ 跑山路线
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* 夜市卡片 */}
          <Link
            href="/markets"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 p-8 text-white"
          >
            <div className="relative z-10">
              <span className="text-5xl mb-4 block">🌃</span>
              <h2 className="text-2xl font-bold mb-2">夜市探索</h2>
              <p className="text-white/90 mb-4">
                收录武汉所有夜市，发现地道小吃，查看真实评价
              </p>
              <span className="inline-flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform">
                开始探索 →
              </span>
            </div>
            <div className="absolute top-0 right-0 text-[120px] opacity-20 translate-x-8 -translate-y-4">
              🍡
            </div>
          </Link>

          {/* 跑山卡片 */}
          <Link
            href="/routes"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 p-8 text-white"
          >
            <div className="relative z-10">
              <span className="text-5xl mb-4 block">🏔️</span>
              <h2 className="text-2xl font-bold mb-2">跑山路线</h2>
              <p className="text-white/90 mb-4">
                精选武汉周边一日游路线，周末出行不迷路
              </p>
              <span className="inline-flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform">
                查看路线 →
              </span>
            </div>
            <div className="absolute top-0 right-0 text-[120px] opacity-20 translate-x-8 -translate-y-4">
              🗺️
            </div>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900">50+</div>
              <div className="text-gray-500 mt-1">夜市收录</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900">200+</div>
              <div className="text-gray-500 mt-1">小吃推荐</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900">20+</div>
              <div className="text-gray-500 mt-1">跑山路线</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900">1000+</div>
              <div className="text-gray-500 mt-1">用户评价</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          准备好探索武汉了吗？
        </h2>
        <p className="text-gray-600 mb-8">
          今晚去哪个夜市？周末跑哪座山？让我们帮你决定
        </p>
        <Link
          href="/markets"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          开始探索
          <span>→</span>
        </Link>
      </section>
    </div>
  );
}
