# 武汉生活 🌃

一站式探索武汉夜市美食和周边跑山路线

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **数据库**: PostgreSQL (Neon / Prisma)
- **部署**: Vercel

## 本地开发

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 填入数据库连接信息

# 初始化数据库
npx prisma db push

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

## 部署到 Vercel

### 1. 注册 Neon 数据库（免费）

1. 访问 https://neon.tech
2. 注册并创建项目
3. 获取数据库连接字符串

### 2. 部署到 Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
cd projects/wuhan-life/app
vercel
```

### 3. 配置环境变量

在 Vercel Dashboard 中设置：

- `DATABASE_URL`: Neon 数据库连接字符串（带 pooler）
- `DIRECT_URL`: Neon 直连字符串（不带 pooler）

### 4. 初始化数据库

```bash
# 本地执行（需要有数据库访问权限）
npx prisma db push
```

## 项目结构

```
src/
├── app/
│   ├── layout.tsx      # 全局布局
│   ├── page.tsx        # 首页
│   ├── markets/        # 夜市模块
│   │   ├── page.tsx    # 列表页
│   │   └── [id]/       # 详情页
│   └── routes/         # 跑山模块
│       ├── page.tsx    # 列表页
│       └── [id]/       # 详情页
└── lib/
    └── db.ts           # 数据库连接
prisma/
└── schema.prisma       # 数据模型
```

## 待开发功能

- [ ] 接入真实数据库
- [ ] 微信登录
- [ ] 用户评价系统
- [ ] 收藏功能
- [ ] 地图导航
- [ ] 后台管理
- [ ] 小红书/B站数据爬取

## License

MIT
