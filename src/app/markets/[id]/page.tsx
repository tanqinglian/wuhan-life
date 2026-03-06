import { prisma } from "@/lib/db";
import MarketDetailClient from "@/components/MarketDetailClient";

export default async function MarketDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // 参数验证
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">无效的夜市ID</p>
          <Link href="/markets" className="text-orange-500 hover:underline mt-2 inline-block">
            返回列表
          </Link>
        </div>
      </div>
    );
  }

  const market = await prisma.markets.findUnique({
    where: { id },
    include: {
      districts: true,
      foods: {
        orderBy: { rating: "desc" },
        take: 10,
      },
      reviews: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!market) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">夜市不存在</p>
          <Link href="/markets" className="text-orange-500 hover:underline mt-2 inline-block">
            返回列表
          </Link>
        </div>
      </div>
    );
  }

  // 转换Date对象为普通对象
  const marketData = {
    ...market,
    reviews: market.reviews.map(r => ({
      ...r,
      createdAt: r.createdAt
    }))
  };

  return <MarketDetailClient market={marketData} />;
}
