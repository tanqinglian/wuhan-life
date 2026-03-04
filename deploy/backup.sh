#!/bin/bash
# 数据库备份脚本

# 配置
DB_NAME="wuhan_life"
DB_USER="root"
BACKUP_DIR="/var/backups/mysql"
RETENTION_DAYS=7

# 创建备份目录
mkdir -p $BACKUP_DIR

# 备份文件名（带时间戳）
BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_$(date +%Y%m%d_%H%M%S).sql"

# 执行备份
echo "开始备份: $(date)"
mysqldump -u $DB_USER $DB_NAME > $BACKUP_FILE

# 压缩备份
gzip $BACKUP_FILE

echo "备份完成: $BACKUP_FILE.gz"

# 删除旧备份（保留最近7天）
find $BACKUP_DIR -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete
echo "已清理 $RETENTION_DAYS 天前的备份"

# 显示当前备份列表
echo ""
echo "当前备份文件："
ls -lh $BACKUP_DIR/*.sql.gz 2>/dev/null | tail -5
