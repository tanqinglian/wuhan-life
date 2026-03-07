# 部署指南

**版本：** v1.0
**更新时间：** 2026-03-07 23:02
**适用环境：** Vercel / Docker / 传统服务器

---

## 📋 部署前检查清单

### 1. 环境变量
- [ ] DATABASE_URL已配置
- [ ] NEXTAUTH_SECRET已生成强密码
- [ ] NEXTAUTH_URL已设置生产URL
- [ ] NEXT_PUBLIC_AMAP_KEY已申请（如需地图功能）

### 2. 数据库
- [ ] MySQL数据库已创建
- [ ] 数据库连接测试通过
- [ ] Prisma schema已同步
- [ ] 初始数据已导入

### 3. 代码
- [ ] 所有依赖已安装
- [ ] 代码已通过ESLint检查
- [ ] 代码已通过TypeScript检查
- [ ] 所有测试已通过

### 4. 安全
- [ ] 环境变量无敏感信息泄露
- [ ] API Key已安全存储
- [ ] 安全Headers已配置
- [ ] CORS已配置

---

## 🚀 Vercel部署

### 步骤1: 准备项目
```bash
# 确保项目已构建
npm run build

# 确保项目已测试
npm test
```

### 步骤2: 连接GitHub
1. 确保代码已推送到GitHub
2. 访问 https://vercel.com
3. 导入GitHub仓库

### 步骤3: 配置环境变量
在Vercel项目设置中添加环境变量：
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `NEXT_PUBLIC_AMAP_KEY`（可选）

### 步骤4: 部署
```bash
# 方式1：通过Vercel CLI
vercel --prod

# 方式2：通过GitHub自动部署
# 推送到main分支即可自动触发部署
git push origin main
```

### 步骤5: 验证
- 访问生产URL
- 测试首页加载
- 测试API功能
- 检查错误日志

---

## 🐳 Docker部署

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mysql://root:password@db:3306/wuhan_life
      - NEXTAUTH_SECRET=your-secret-key
      - NEXTAUTH_URL=http://localhost:3000
    depends_on:
      - db

  db:
    image: mysql:8.4
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=wuhan_life
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

### 部署命令
```bash
# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

---

## 🖥️ 传统服务器部署

### 步骤1: 环境准备
```bash
# 安装Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装PM2
sudo npm install -g pm2

# 安装MySQL
sudo apt install mysql-server
```

### 步骤2: 代码部署
```bash
# 克隆代码
git clone https://github.com/tanqinglian/wuhan-life.git
cd wuhan-life

# 安装依赖
npm ci --production

# 配置环境变量
cp .env.example .env
# 编辑.env文件

# 构建项目
npm run build

# 初始化数据库
npx prisma generate
npx prisma db push
```

### 步骤3: 启动服务
```bash
# 使用PM2启动
pm2 start npm --name "wuhan-life" -- start

# 开机自启
pm2 startup
pm2 save

# 查看状态
pm2 status
pm2 logs wuhan-life
```

### 步骤4: Nginx反向代理
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

### 步骤5: HTTPS配置
```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo certbot renew --dry-run
```

---

## 📊 部署后监控

### 1. 性能监控
- 响应时间监控
- 错误率监控
- 资源使用监控

### 2. 日志管理
- 应用日志
- 访问日志
- 错误日志

### 3. 告警配置
- 服务宕机告警
- 性能异常告警
- 错误率告警

---

## 🔧 常见问题

### Q1: 部署后页面空白
**原因：** 环境变量未正确配置
**解决：** 检查Vercel环境变量设置

### Q2: 数据库连接失败
**原因：** DATABASE_URL配置错误
**解决：** 验证数据库连接字符串

### Q3: API 500错误
**原因：** Prisma Client未生成
**解决：** 运行 `npx prisma generate`

### Q4: 静态资源404
**原因：** 静态文件未正确部署
**解决：** 检查 `.next/static` 目录

---

## 📝 部署检查表

### 部署前
- [ ] 代码已审查
- [ ] 测试已通过
- [ ] 环境变量已配置
- [ ] 数据库已准备

### 部署中
- [ ] 构建成功
- [ ] 无错误日志
- [ ] 服务启动成功

### 部署后
- [ ] 首页可访问
- [ ] API功能正常
- [ ] 数据库连接正常
- [ ] 性能符合预期

---

**维护人：** Ops Agent
**更新时间：** 2026-03-07 23:02
**版本：** v1.0
