#!/bin/bash
# PostgreSQL + PostGIS 部署脚本
# 适用于 Ubuntu/Debian 系统

set -e

echo "=========================================="
echo "  wuhan-life PostgreSQL 部署脚本"
echo "=========================================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 配置变量（请根据实际情况修改）
DB_NAME="wuhan_life"
DB_USER="wuhan_user"
DB_PASSWORD="$(openssl rand -base64 24)"  # 自动生成24位随机密码
POSTGRES_VERSION="15"

echo -e "${YELLOW}[1/7] 检查系统环境...${NC}"
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}请使用 root 权限运行此脚本${NC}"
  exit 1
fi

echo -e "${YELLOW}[2/7] 安装 PostgreSQL ${POSTGRES_VERSION}...${NC}"
# 添加 PostgreSQL 官方源
sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

apt update
apt install -y postgresql-${POSTGRES_VERSION} postgresql-contrib-${POSTGRES_VERSION}

echo -e "${YELLOW}[3/7] 安装 PostGIS 扩展...${NC}"
apt install -y postgresql-${POSTGRES_VERSION}-postgis-3

echo -e "${YELLOW}[4/7] 启动 PostgreSQL 服务...${NC}"
systemctl start postgresql
systemctl enable postgresql

echo -e "${YELLOW}[5/7] 创建数据库和用户...${NC}"
sudo -u postgres psql <<EOF
-- 创建用户
CREATE USER ${DB_USER} WITH ENCRYPTED PASSWORD '${DB_PASSWORD}';

-- 创建数据库
CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};

-- 授予权限
GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};

-- 连接到目标数据库
\c ${DB_NAME}

-- 启用 PostGIS 扩展
CREATE EXTENSION IF NOT EXISTS postgis;

-- 授予 schema 权限
GRANT ALL ON SCHEMA public TO ${DB_USER};
EOF

echo -e "${YELLOW}[6/7] 配置远程访问...${NC}"
# 修改 postgresql.conf
PG_CONF="/etc/postgresql/${POSTGRES_VERSION}/main/postgresql.conf"
sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" ${PG_CONF}

# 修改 pg_hba.conf
PG_HBA="/etc/postgresql/${POSTGRES_VERSION}/main/pg_hba.conf"
echo "" >> ${PG_HBA}
echo "# wuhan-life 应用访问" >> ${PG_HBA}
echo "host    ${DB_NAME}    ${DB_USER}    0.0.0.0/0    md5" >> ${PG_HBA}

# 重启服务
systemctl restart postgresql

echo -e "${YELLOW}[7/7] 配置防火墙...${NC}"
if command -v ufw &> /dev/null; then
    echo "检测到 UFW 防火墙"
    read -p "是否开放 5432 端口？(y/n): " open_port
    if [ "$open_port" = "y" ]; then
        ufw allow 5432/tcp
        echo -e "${GREEN}已开放 5432 端口${NC}"
    fi
fi

echo ""
echo -e "${GREEN}=========================================="
echo "  ✅ PostgreSQL + PostGIS 安装完成！"
echo "==========================================${NC}"
echo ""
echo "数据库连接信息："
echo "  主机: $(curl -s ifconfig.me || echo '服务器IP')"
echo "  端口: 5432"
echo "  数据库: ${DB_NAME}"
echo "  用户名: ${DB_USER}"
echo "  密码: ${DB_PASSWORD}"
echo ""
echo "请将以下内容添加到 .env 文件："
echo ""
echo "DATABASE_URL=\"postgresql://${DB_USER}:$(python3 -c "import urllib.parse; print(urllib.parse.quote('${DB_PASSWORD}'))")@$(curl -s ifconfig.me || echo '服务器IP'):5432/${DB_NAME}?schema=public\""
echo "DIRECT_URL=\"postgresql://${DB_USER}:$(python3 -c "import urllib.parse; print(urllib.parse.quote('${DB_PASSWORD}'))")@$(curl -s ifconfig.me || echo '服务器IP'):5432/${DB_NAME}?schema=public\""
echo ""
echo -e "${YELLOW}⚠️  请妥善保存以上密码信息！${NC}"
echo ""
