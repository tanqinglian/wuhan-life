# wuhan-life 部署文档

**版本：** v1.0
**更新时间：** 2026-03-07 20:43
**适用环境：** 开发环境 / 生产环境

---

## 📋 目录

1. [环境要求](#环境要求)
2. [快速开始](#快速开始)
3. [详细步骤](#详细步骤)
4. [环境变量配置](#环境变量配置)
5. [数据库配置](#数据库配置)
6. [常见问题](#常见问题)

---

## 环境要求

### 必需软件

| 软件 | 版本 | 说明 |
|------|------|------|
| Node.js | >= 18.0.0 | JavaScript运行时 |
| npm | >= 9.0.0 | 包管理器 |
| MySQL | >= 8.0 | 数据库 |
| Git | >= 2.0.0 | 版本控制 |

### 推荐配置

- **操作系统：** Windows 10/11, macOS, Linux
- **内存：** >= 4GB
- **硬盘：** >= 10GB可用空间

---

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/tanqinglian/wuhan-life.git
cd wuhan-life
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

```bash
cp .env.example .env
# 编辑.env文件，填写数据库配置
```

### 4. 初始化数据库

```bash
npx prisma generate
npx prisma db push
```

### 5. 启动服务

```bash
npm run dev
```

访问 http://localhost:3000

---

## 详细步骤

### 步骤1: 环境准备

#### Windows环境

1. **安装Node.js**
   ```bash
   # 下载并安装Node.js
   https://nodejs.org/
   
   # 验证安装
   node --version
   npm --version
   ```

2. **安装MySQL**
   ```bash
   # 下载并安装MySQL
   https://dev.mysql.com/downloads/mysql/
   
   # 验证安装
   mysql --version
   ```

3. **安装Git**
   ```bash
   # 下载并安装Git
   https://git-scm.com/
   
   # 验证安装
   git --version
   ```

#### macOS环境

```bash
# 使用Homebrew安装
brew install node
brew install mysql
brew install git

# 验证安装
node --version
mysql --version
git --version
```

#### Linux环境

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm mysql-server git

# CentOS/RHEL
sudo yum install nodejs npm mysql-server git

# 验证安装
node --version
mysql --version
git --version
```

---

### 步骤2: 数据库配置

#### 创建数据库

```bash
# 登录MySQL
mysql -u root -p

# 创建数据库
CREATE DATABASE wuhan_life CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 创建用户（可选）
CREATE USER 'wuhan_life'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON wuhan_life.* TO 'wuhan_life'@'localhost';
FLUSH PRIVILEGES;
```

#### 导入初始数据

```bash
# 如果有初始数据SQL文件
mysql -u root -p wuhan_life < database/init.sql
```

---

### 步骤3: 项目配置

#### 克隆项目

```bash
git clone https://github.com/tanqinglian/wuhan-life.git
cd wuhan-life
```

#### 安装依赖

```bash
npm install
```

#### 配置环境变量

创建`.env`文件：

```bash
cp .env.example .env
```

编辑`.env`文件：

```env
# 数据库配置
DATABASE_URL="mysql://root:password@localhost:3306/wuhan_life"

# NextAuth配置
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# 其他配置（可选）
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

---

### 步骤4: 初始化项目

#### 生成Prisma Client

```bash
npx prisma generate
```

#### 同步数据库结构

```bash
npx prisma db push
```

#### 填充初始数据（可选）

```bash
# 如果有种子数据脚本
npm run seed
```

---

### 步骤5: 启动服务

#### 开发环境

```bash
npm run dev
```

服务将启动在 http://localhost:3000

#### 生产环境

```bash
# 构建项目
npm run build

# 启动服务
npm start
```

---

## 环境变量配置

### 必需变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| DATABASE_URL | 数据库连接字符串 | mysql://root:password@localhost:3306/wuhan_life |
| NEXTAUTH_SECRET | NextAuth密钥 | your-secret-key-here |
| NEXTAUTH_URL | 应用URL | http://localhost:3000 |

### 可选变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| NEXT_PUBLIC_API_URL | API地址 | http://localhost:3000/api |
| NODE_ENV | 运行环境 | development |

---

## 数据库配置

### MySQL配置优化

编辑MySQL配置文件（`my.cnf`或`my.ini`）：

```ini
[mysqld]
# 字符集
character-set-server=utf8mb4
collation-server=utf8mb4_unicode_ci

# 连接数
max_connections=200

# 缓冲区
innodb_buffer_pool_size=1G

# 日志
slow_query_log=1
slow_query_log_file=/var/log/mysql/slow.log
```

### 连接池配置

在`.env`文件中配置连接池：

```env
DATABASE_URL="mysql://root:password@localhost:3306/wuhan_life?connection_limit=10&pool_timeout=30"
```

---

## 常见问题

### Q1: npm install失败

**问题：** 依赖安装失败

**解决方案：**
```bash
# 清理npm缓存
npm cache clean --force

# 删除node_modules
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

---

### Q2: 数据库连接失败

**问题：** 无法连接到MySQL

**解决方案：**
1. 检查MySQL服务是否启动
   ```bash
   # Windows
   net start MySQL84
   
   # macOS/Linux
   sudo systemctl start mysql
   ```

2. 检查数据库配置
   ```bash
   # 验证连接
   mysql -u root -p -h localhost wuhan_life
   ```

3. 检查防火墙
   ```bash
   # 确保3306端口开放
   ```

---

### Q3: Prisma命令失败

**问题：** prisma generate或db push失败

**解决方案：**
```bash
# 检查Prisma版本
npx prisma --version

# 重新安装Prisma
npm install prisma@latest @prisma/client@latest

# 重新生成
npx prisma generate
npx prisma db push
```

---

### Q4: 端口被占用

**问题：** 3000端口已被占用

**解决方案：**
```bash
# 查找占用进程
# Windows
netstat -ano | findstr :3000

# macOS/Linux
lsof -i :3000

# 终止进程或修改端口
PORT=3001 npm run dev
```

---

### Q5: 内存不足

**问题：** Node.js内存不足

**解决方案：**
```bash
# 增加Node.js内存限制
export NODE_OPTIONS="--max-old-space-size=4096"
npm run dev
```

---

## 生产部署建议

### 1. 使用PM2

```bash
# 安装PM2
npm install -g pm2

# 启动服务
pm2 start npm --name "wuhan-life" -- start

# 开机自启
pm2 startup
pm2 save
```

### 2. 使用Nginx反向代理

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
    }
}
```

### 3. 使用HTTPS

```bash
# 使用Let's Encrypt
sudo certbot --nginx -d your-domain.com
```

---

## 性能优化

### 1. 启用缓存

```env
# 在.env中配置
NEXT_PUBLIC_ENABLE_CACHE=true
```

### 2. 数据库索引

```sql
-- 为常用查询字段添加索引
CREATE INDEX idx_markets_rating ON markets(rating);
CREATE INDEX idx_routes_difficulty ON routes(difficulty);
```

### 3. CDN配置

将静态资源上传到CDN，提升加载速度。

---

## 监控和日志

### 1. 应用监控

```bash
# 使用PM2监控
pm2 monit

# 查看日志
pm2 logs wuhan-life
```

### 2. 数据库监控

```bash
# MySQL慢查询日志
tail -f /var/log/mysql/slow.log
```

---

## 备份策略

### 1. 数据库备份

```bash
# 每日备份脚本
mysqldump -u root -p wuhan_life > backup_$(date +%Y%m%d).sql

# 自动备份（crontab）
0 2 * * * mysqldump -u root -pPASSWORD wuhan_life > /backup/wuhan_life_$(date +\%Y\%m\%d).sql
```

### 2. 代码备份

```bash
# Git备份
git push origin main
```

---

## 技术支持

**文档维护：** Dev + Doc Agent
**问题反馈：** https://github.com/tanqinglian/wuhan-life/issues
**更新日志：** CHANGELOG.md

---

**版本历史：**
- v1.0 (2026-03-07): 初始版本
