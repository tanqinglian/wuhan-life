#!/bin/bash
# PostgreSQL 自动备份脚本

set -e

# 配置
DB_NAME="wuhan_life"
DB_USER="wuhan_user"
BACKUP_DIR="/var/backups/postgresql"
RETENTION_DAYS=7

# 创建备份目录
mkdir -p ${BACKUP_DIR}

# 生成备份文件名
BACKUP_FILE="${BACKUP_DIR}/${DB_NAME}_$(date +%Y%m%d_%H%M%S).sql"

# 执行备份
echo "开始备份数据库: ${DB_NAME}"
pg_dump -U ${DB_USER} -d ${DB_NAME} -F p -f ${BACKUP_FILE}

# 压缩备份
gzip ${BACKUP_FILE}
echo "备份完成: ${BACKUP_FILE}.gz"

# 清理旧备份
find ${BACKUP_DIR} -name "*.sql.gz" -mtime +${RETENTION_DAYS} -delete
echo "已清理 ${RETENTION_DAYS} 天前的旧备份"

# 显示当前备份列表
echo ""
echo "当前备份文件："
ls -lh ${BACKUP_DIR}/*.sql.gz 2>/dev/null | tail -5
