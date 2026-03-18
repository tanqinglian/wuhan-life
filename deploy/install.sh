#!/bin/bash
# wuhan-life 一键部署脚本（2核2G配置）
# 适用于 Ubuntu 20.04/22.04

set -e

echo "=========================================="
echo "  wuhan-life 自动部署脚本"
echo "  配置：2核2G"
echo "=========================================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 检查root权限
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}请使用root权限运行此脚本${NC}"
  exit 1
fi

# 1. 更新系统
echo -e "${YELLOW}[1/8] 更新系统...${NC}"
apt update && apt upgrade -y

# 2. 安装Node.js 18
echo -e "${YELLOW}[2/8] 安装Node.js 18...${NC}"
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# 3. 安装MySQL
echo -e "${YELLOW}[3/8] 安装MySQL...${NC}"
export DEBIAN_FRONTEND=noninteractive
apt install -y mysql-server

# 启动MySQL
systemctl start mysql
systemctl enable mysql

# 4. 安装Nginx
echo -e "${YELLOW}[4/8] 安装Nginx...${NC}"
apt install -y nginx

# 5. 安装PM2
echo -e "${YELLOW}[5/8] 安装PM2...${NC}"
npm install -g pm2

# 6. 克隆项目
echo -e "${YELLOW}[6/8] 克隆项目...${NC}"
cd /var/www
git clone https://github.com/tanqinglian/wuhan-life.git
cd wuhan-life

# 7. 安装依赖
echo -e "${YELLOW}[7/8] 安装依赖...${NC}"
npm install

# 8. 配置数据库
echo -e "${YELLOW}[8/8] 配置数据库...${NC}"

# 创建数据库
mysql -u root <<EOF
CREATE DATABASE IF NOT EXISTS wuhan_life CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EOF

# 导入表结构
mysql -u root wuhan_life < database/init.sql

# 创建环境变量文件
cat > .env <<EOF
DATABASE_URL="mysql://root@localhost:3306/wuhan_life"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="http://localhost:3000"
EOF

# 生成Prisma客户端
npx prisma generate

# 构建应用
npm run build

# 配置PM2
pm2 start npm --name wuhan-life -- run start
pm2 startup
pm2 save

# 配置Nginx
cat > /etc/nginx/sites-available/wuhan-life <<'EOF'
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

ln -sf /etc/nginx/sites-available/wuhan-life /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

echo ""
echo -e "${GREEN}=========================================="
echo "  ✅ 部署完成！"
echo "==========================================${NC}"
echo ""
echo "应用地址："
echo "  http://你的服务器IP"
echo ""
echo "数据库信息："
echo "  数据库：wuhan_life"
echo "  用户：root"
echo "  密码：无（本地连接）"
echo ""
echo "常用命令："
echo "  查看日志：pm2 logs wuhan-life"
echo "  重启应用：pm2 restart wuhan-life"
echo "  查看状态：pm2 status"
echo ""
