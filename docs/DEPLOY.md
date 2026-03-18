# 部署指南

## 概述

本文档介绍如何将wuhan-life部署到生产环境。

---

## 系统要求

### 服务器要求

**最低配置：**
- CPU: 2核
- 内存: 4GB
- 硬盘: 20GB
- 网络: 5Mbps

**推荐配置：**
- CPU: 4核
- 内存: 8GB
- 硬盘: 50GB
- 网络: 10Mbps

---

### 软件要求

**必需软件：**
- Node.js 18.17+
- MySQL 8.0+
- npm 9.0+

**可选软件：**
- PM2（进程管理）
- Nginx（反向代理）
- Certbot（SSL证书）

---

## 环境准备

### 1. 安装Node.js

**Ubuntu/Debian:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**CentOS/RHEL:**
```bash
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
```

**验证安装：**
```bash
node --version
npm --version
```

---

### 2. 安装MySQL

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install -y mysql-server
sudo mysql_secure_installation
```

**CentOS/RHEL:**
```bash
sudo yum install -y mysql-server
sudo systemctl start mysqld
sudo mysql_secure_installation
```

**验证安装：**
```bash
mysql --version
```

---

### 3. 创建数据库

**登录MySQL：**
```bash
mysql -u root -p
```

**创建数据库：**
```sql
CREATE DATABASE wuhan_life CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'wuhan_life'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON wuhan_life.* TO 'wuhan_life'@'localhost';
FLUSH PRIVILEGES;
```

---

## 部署步骤

### 第一步：获取代码

**克隆仓库：**
```bash
git clone https://github.com/tanqinglian/wuhan-life.git
cd wuhan-life
```

**切换分支：**
```bash
git checkout feature/initial-development
```

---

### 第二步：安装依赖

**安装npm包：**
```bash
npm install
```

**验证安装：**
```bash
npm list --depth=0
```

---

### 第三步：配置环境变量

**创建.env文件：**
```bash
cp .env.example .env
```

**编辑.env文件：**
```bash
nano .env
```

**配置内容：**
```env
# 数据库配置
DATABASE_URL="mysql://wuhan_life:your_password@localhost:3306/wuhan_life"

# 应用配置
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NEXT_PUBLIC_APP_NAME="wuhan-life"

# 安全配置
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-domain.com"
```

**生成密钥：**
```bash
openssl rand -base64 32
```

---

### 第四步：初始化数据库

**运行Prisma迁移：**
```bash
npx prisma migrate deploy
```

**生成Prisma客户端：**
```bash
npx prisma generate
```

**导入初始数据：**
```bash
mysql -u wuhan_life -p wuhan_life < scripts/init.sql
```

---

### 第五步：构建应用

**生产构建：**
```bash
npm run build
```

**验证构建：**
```bash
ls -la .next/
```

---

### 第六步：启动应用

**开发模式（测试）：**
```bash
npm run dev
```

**生产模式（正式）：**
```bash
npm run start
```

**PM2管理（推荐）：**
```bash
npm install -g pm2
pm2 start npm --name "wuhan-life" -- start
pm2 save
pm2 startup
```

---

## Nginx配置（可选）

### 1. 安装Nginx

**Ubuntu/Debian:**
```bash
sudo apt-get install -y nginx
```

**CentOS/RHEL:**
```bash
sudo yum install -y nginx
```

---

### 2. 配置Nginx

**创建配置文件：**
```bash
sudo nano /etc/nginx/sites-available/wuhan-life
```

**配置内容：**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**启用配置：**
```bash
sudo ln -s /etc/nginx/sites-available/wuhan-life /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

### 3. 配置SSL

**安装Certbot：**
```bash
sudo apt-get install -y certbot python3-certbot-nginx
```

**获取证书：**
```bash
sudo certbot --nginx -d your-domain.com
```

**自动续期：**
```bash
sudo certbot renew --dry-run
```

---

## Vercel部署（推荐）

### 1. 准备工作

**注册Vercel：**
- 访问 https://vercel.com
- 使用GitHub登录

**Fork仓库：**
- Fork https://github.com/tanqinglian/wuhan-life
- 启用GitHub Actions

---

### 2. 部署步骤

**导入项目：**
1. 登录Vercel
2. 点击"New Project"
3. 选择GitHub仓库
4. 选择wuhan-life

**配置环境变量：**
```
DATABASE_URL=mysql://...
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-app.vercel.app
```

**部署：**
1. 点击"Deploy"
2. 等待构建完成
3. 访问部署URL

---

### 3. 自定义域名

**添加域名：**
1. 进入项目Settings
2. 选择Domains
3. 添加自定义域名
4. 配置DNS记录

**DNS配置：**
```
类型: A
名称: @
值: 76.76.21.21

类型: CNAME
名称: www
值: cname.vercel-dns.com
```

---

## 数据库配置

### 1. 本地MySQL

**优点：**
- 完全控制
- 无额外费用
- 数据安全

**缺点：**
- 需要维护
- 需要备份
- 扩展性有限

**适用场景：** 小型应用、内部系统

---

### 2. Vercel Postgres

**优点：**
- 无需维护
- 自动备份
- 与Vercel集成

**缺点：**
- 有费用
- 数据量限制
- 依赖Vercel

**适用场景：** Vercel部署、中小型应用

---

### 3. Neon（推荐）

**优点：**
- 免费额度充足
- 自动扩展
- 分支功能

**缺点：**
- 需要注册
- 网络延迟

**适用场景：** 生产环境、需要扩展性

**配置步骤：**
1. 注册 https://neon.tech
2. 创建项目
3. 获取连接字符串
4. 更新DATABASE_URL

---

## 监控与日志

### 1. 应用监控

**PM2监控：**
```bash
pm2 monit
pm2 logs
pm2 status
```

**Vercel监控：**
- 访问项目Analytics
- 查看访问统计
- 查看性能指标

---

### 2. 日志管理

**查看日志：**
```bash
pm2 logs wuhan-life
```

**日志位置：**
```
~/.pm2/logs/wuhan-life-out.log
~/.pm2/logs/wuhan-life-error.log
```

**日志轮转：**
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

---

### 3. 性能监控

**推荐工具：**
- Vercel Analytics
- Google Analytics
- Sentry（错误追踪）

**关键指标：**
- 响应时间
- 并发数
- 错误率
- CPU/内存使用率

---

## 备份策略

### 1. 数据库备份

**手动备份：**
```bash
mysqldump -u wuhan_life -p wuhan_life > backup_$(date +%Y%m%d).sql
```

**自动备份（Cron）：**
```bash
crontab -e
```

**添加任务：**
```cron
0 2 * * * /usr/bin/mysqldump -u wuhan_life -ppassword wuhan_life > /backup/wuhan_life_$(date +\%Y\%m\%d).sql
```

---

### 2. 代码备份

**Git备份：**
```bash
git push origin main
```

**定期推送：**
- 每次更新后推送
- 使用GitHub备份

---

### 3. 环境备份

**备份.env文件：**
```bash
cp .env .env.backup
```

**安全存储：**
- 使用密码管理器
- 加密存储

---

## 故障排查

### 1. 应用无法启动

**检查日志：**
```bash
pm2 logs wuhan-life
```

**常见问题：**
- 端口被占用
- 数据库连接失败
- 环境变量缺失

**解决方案：**
```bash
# 检查端口
lsof -i :3000

# 测试数据库连接
mysql -u wuhan_life -p

# 检查环境变量
cat .env
```

---

### 2. 数据库连接失败

**检查MySQL：**
```bash
sudo systemctl status mysql
```

**检查连接：**
```bash
mysql -u wuhan_life -p -h localhost wuhan_life
```

**常见问题：**
- MySQL未启动
- 用户权限不足
- 密码错误

---

### 3. 页面加载缓慢

**检查资源：**
```bash
top
df -h
```

**优化方案：**
- 启用缓存
- 压缩资源
- CDN加速

---

## 安全加固

### 1. 防火墙配置

**Ubuntu UFW：**
```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

**CentOS Firewalld：**
```bash
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

---

### 2. SSL配置

**强制HTTPS：**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

---

### 3. 安全Headers

**Nginx配置：**
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

---

## 更新维护

### 1. 应用更新

**拉取最新代码：**
```bash
git pull origin main
```

**安装依赖：**
```bash
npm install
```

**重新构建：**
```bash
npm run build
```

**重启应用：**
```bash
pm2 restart wuhan-life
```

---

### 2. 数据库迁移

**运行迁移：**
```bash
npx prisma migrate deploy
```

**备份数据：**
```bash
mysqldump -u wuhan_life -p wuhan_life > backup_before_migration.sql
```

---

### 3. 依赖更新

**检查更新：**
```bash
npm outdated
```

**更新依赖：**
```bash
npm update
```

**安全更新：**
```bash
npm audit fix
```

---

## 性能优化

### 1. 启用缓存

**Nginx缓存：**
```nginx
location /_next/static/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

### 2. 资源压缩

**Gzip压缩：**
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
gzip_min_length 1000;
```

---

### 3. CDN加速

**推荐CDN：**
- Cloudflare（免费）
- AWS CloudFront
- 阿里云CDN

---

## 检查清单

### 部署前检查

- [ ] 代码已推送到GitHub
- [ ] 环境变量已配置
- [ ] 数据库已创建
- [ ] 依赖已安装
- [ ] 构建成功

---

### 部署后检查

- [ ] 应用正常启动
- [ ] 数据库连接正常
- [ ] 页面正常访问
- [ ] API响应正常
- [ ] SSL证书有效
- [ ] 日志无错误

---

### 定期检查

- [ ] 备份正常执行
- [ ] 磁盘空间充足
- [ ] 性能指标正常
- [ ] 安全更新及时
- [ ] 日志轮转正常

---

**文档版本：** v1.0.0
**最后更新：** 2026-03-08 09:00
**维护者：** Doc Agent
