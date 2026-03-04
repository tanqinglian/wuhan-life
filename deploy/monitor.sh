#!/bin/bash
# 服务器监控脚本（2核2G配置）

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "=========================================="
echo "  wuhan-life 服务器监控"
echo "=========================================="

# 1. 内存监控
echo -e "\n${YELLOW}[1] 内存使用${NC}"
free -h | grep "Mem:" | awk '{printf "总计: %s | 已用: %s | 空闲: %s | 使用率: %.1f%%\n", $2, $3, $4, ($3/$2)*100}'

# 警告阈值：80%
MEM_USAGE=$(free | grep Mem | awk '{printf "%.0f", ($3/$2)*100}')
if [ $MEM_USAGE -gt 80 ]; then
    echo -e "${RED}⚠️  内存使用超过80%！${NC}"
fi

# 2. CPU监控
echo -e "\n${YELLOW}[2] CPU使用${NC}"
CPU_IDLE=$(top -bn1 | grep "Cpu(s)" | awk '{print $8}' | cut -d'%' -f1)
CPU_USAGE=$(echo "100 - $CPU_IDLE" | bc)
echo "CPU使用率: ${CPU_USAGE}%"

if [ ${CPU_USAGE%.*} -gt 80 ]; then
    echo -e "${RED}⚠️  CPU使用超过80%！${NC}"
fi

# 3. 磁盘监控
echo -e "\n${YELLOW}[3] 磁盘使用${NC}"
df -h / | tail -1 | awk '{printf "总计: %s | 已用: %s | 可用: %s | 使用率: %s\n", $2, $3, $4, $5}'

DISK_USAGE=$(df / | tail -1 | awk '{print $5}' | cut -d'%' -f1)
if [ $DISK_USAGE -gt 80 ]; then
    echo -e "${RED}⚠️  磁盘使用超过80%！${NC}"
fi

# 4. 服务状态
echo -e "\n${YELLOW}[4] 服务状态${NC}"

# MySQL
if systemctl is-active --quiet mysql; then
    echo -e "MySQL:  ${GREEN}✓ 运行中${NC}"
else
    echo -e "MySQL:  ${RED}✗ 未运行${NC}"
fi

# Nginx
if systemctl is-active --quiet nginx; then
    echo -e "Nginx:  ${GREEN}✓ 运行中${NC}"
else
    echo -e "Nginx:  ${RED}✗ 未运行${NC}"
fi

# PM2 (wuhan-life)
if pm2 list | grep -q "wuhan-life.*online"; then
    echo -e "wuhan-life: ${GREEN}✓ 运行中${NC}"
else
    echo -e "wuhan-life: ${RED}✗ 未运行${NC}"
fi

# 5. 网络连接
echo -e "\n${YELLOW}[5] 网络连接${NC}"
CONNECTIONS=$(netstat -an | grep :3000 | grep ESTABLISHED | wc -l)
echo "当前连接数: $CONNECTIONS"

# 6. 最近日志（错误）
echo -e "\n${YELLOW}[6] 最近错误日志${NC}"
if [ -f /var/log/pm2/wuhan-life-error.log ]; then
    tail -3 /var/log/pm2/wuhan-life-error.log 2>/dev/null || echo "无错误日志"
else
    echo "无错误日志"
fi

echo ""
echo "=========================================="
echo "  检查完成: $(date '+%Y-%m-%d %H:%M:%S')"
echo "=========================================="
