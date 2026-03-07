-- wuhan-life 数据库索引优化
-- 创建时间：2026-03-07 21:24
-- 作者：Dev + Ops Agent

-- ==================== 夜市表索引 ====================

-- 评分索引（降序，用于按评分排序）
CREATE INDEX IF NOT EXISTS idx_markets_rating ON markets(rating DESC);

-- 行政区索引（用于按行政区筛选）
CREATE INDEX IF NOT EXISTS idx_markets_district ON markets(districtId);

-- 活跃状态索引（用于过滤活跃夜市）
CREATE INDEX IF NOT EXISTS idx_markets_active ON markets(isActive);

-- 浏览量索引（用于按浏览量排序）
CREATE INDEX IF NOT EXISTS idx_markets_viewcount ON markets(viewCount DESC);

-- 创建时间索引（用于按时间排序）
CREATE INDEX IF NOT EXISTS idx_markets_created ON markets(createdAt DESC);

-- 复合索引：评分+活跃状态（常用查询组合）
CREATE INDEX IF NOT EXISTS idx_markets_rating_active ON markets(rating DESC, isActive);

-- ==================== 跑山路线表索引 ====================

-- 评分索引（降序，用于按评分排序）
CREATE INDEX IF NOT EXISTS idx_routes_rating ON routes(rating DESC);

-- 难度索引（用于按难度筛选）
CREATE INDEX IF NOT EXISTS idx_routes_difficulty ON routes(difficulty);

-- 活跃状态索引（用于过滤活跃路线）
CREATE INDEX IF NOT EXISTS idx_routes_active ON routes(isActive);

-- 浏览量索引（用于按浏览量排序）
CREATE INDEX IF NOT EXISTS idx_routes_viewcount ON routes(viewCount DESC);

-- 创建时间索引（用于按时间排序）
CREATE INDEX IF NOT EXISTS idx_routes_created ON routes(createdAt DESC);

-- 复合索引：难度+评分（常用查询组合）
CREATE INDEX IF NOT EXISTS idx_routes_difficulty_rating ON routes(difficulty, rating DESC);

-- 复合索引：评分+活跃状态（常用查询组合）
CREATE INDEX IF NOT EXISTS idx_routes_rating_active ON routes(rating DESC, isActive);

-- ==================== 行政区表索引 ====================

-- 排序索引（用于按顺序展示行政区）
CREATE INDEX IF NOT EXISTS idx_districts_order ON districts(order ASC);

-- ==================== 路线途经点表索引 ====================

-- 路线ID索引（用于查询某条路线的途经点）
CREATE INDEX IF NOT EXISTS idx_waypoints_route ON waypoints(routeId);

-- 顺序索引（用于按顺序展示途经点）
CREATE INDEX IF NOT EXISTS idx_waypoints_order ON waypoints(routeId, order ASC);

-- ==================== 美食表索引 ====================

-- 夜市ID索引（用于查询某个夜市的美食）
CREATE INDEX IF NOT EXISTS idx_foods_market ON foods(marketId);

-- 评分索引（用于按评分排序）
CREATE INDEX IF NOT EXISTS idx_foods_rating ON foods(rating DESC);

-- 复合索引：夜市+评分（常用查询组合）
CREATE INDEX IF NOT EXISTS idx_foods_market_rating ON foods(marketId, rating DESC);

-- ==================== 验证索引创建 ====================

-- 查看所有索引
SHOW INDEX FROM markets;
SHOW INDEX FROM routes;
SHOW INDEX FROM districts;
SHOW INDEX FROM waypoints;
SHOW INDEX FROM foods;

-- ==================== 性能测试查询 ====================

-- 测试夜市评分排序查询
EXPLAIN SELECT * FROM markets WHERE isActive = true ORDER BY rating DESC LIMIT 10;

-- 测试跑山难度筛选查询
EXPLAIN SELECT * FROM routes WHERE difficulty = 2 AND isActive = true ORDER BY rating DESC LIMIT 10;

-- 测试行政区夜市查询
EXPLAIN SELECT * FROM markets WHERE districtId = 1 AND isActive = true ORDER BY rating DESC;
