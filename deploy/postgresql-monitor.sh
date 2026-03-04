#!/bin/bash
# PostgreSQL 监控脚本

echo "=========================================="
echo "  PostgreSQL 数据库监控"
echo "=========================================="
echo ""

# 检查服务状态
echo "📊 服务状态："
systemctl status postgresql --no-pager | grep -E "Active:|Main PID:"
echo ""

# 检查连接数
echo "🔗 当前连接数："
sudo -u postgres psql -d wuhan_life -c "SELECT count(*) as connections FROM pg_stat_activity WHERE datname = 'wuhan_life';" 2>/dev/null || echo "无法获取连接信息"
echo ""

# 检查数据库大小
echo "💾 数据库大小："
sudo -u postgres psql -d wuhan_life -c "SELECT pg_size_pretty(pg_database_size('wuhan_life')) as size;" 2>/dev/null || echo "无法获取数据库大小"
echo ""

# 检查表大小
echo "📋 表大小："
sudo -u postgres psql -d wuhan_life -c "
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
LIMIT 10;
" 2>/dev/null || echo "无法获取表大小信息"
echo ""

# 检查 PostGIS 扩展
echo "🌍 PostGIS 状态："
sudo -u postgres psql -d wuhan_life -c "SELECT PostGIS_Version();" 2>/dev/null || echo "PostGIS 未安装或未启用"
echo ""

# 检查慢查询
echo "🐌 慢查询（执行时间 > 1秒）："
sudo -u postgres psql -d wuhan_life -c "
SELECT 
  pid,
  now() - pg_stat_activity.query_start AS duration,
  query,
  state
FROM pg_stat_activity
WHERE (now() - pg_stat_activity.query_start) > interval '1 second'
  AND datname = 'wuhan_life'
ORDER BY duration DESC;
" 2>/dev/null || echo "无慢查询"
echo ""

echo "✅ 监控完成"
