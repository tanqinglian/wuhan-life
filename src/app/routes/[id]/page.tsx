import { prisma } from "@/lib/db";
import RouteDetailClient from "@/components/RouteDetailClient";

export default async function RouteDetailPage({
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
          <p className="text-gray-500 text-lg">无效的跑山路线ID</p>
        </div>
      </div>
    );
  }

  const route = await prisma.routes.findUnique({
    where: { id },
    include: {
      waypoints: {
        orderBy: { order: "asc" },
      },
      reviews: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!route) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">路线不存在</p>
        </div>
      </div>
    );
  }

  // 转换数据
  const routeData = {
    ...route,
    reviews: route.reviews.map(r => ({
      ...r,
      createdAt: r.createdAt
    }))
  };

  return <RouteDetailClient route={routeData} />;
}
