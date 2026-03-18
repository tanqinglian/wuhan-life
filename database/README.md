# MySQL 数据库设置指南

## 1. 安装MySQL

### Windows
1. 下载 MySQL Community Server: https://dev.mysql.com/downloads/mysql/
2. 安装时设置root密码
3. 记住密码，后续需要用到

### 或使用Docker（推荐）
```bash
docker run -d --name mysql-wuhan -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password mysql:8.0
```

## 2. 创建数据库

```bash
# 登录MySQL
mysql -u root -p

# 执行初始化脚本
source database/init.sql
```

## 3. 配置应用

复制环境变量文件：
```bash
cp .env.mysql .env
```

修改 `.env` 中的密码：
```
DATABASE_URL="mysql://root:你的密码@localhost:3306/wuhan_life"
```

## 4. 运行Prisma迁移（可选）

如果使用Prisma：
```bash
npx prisma migrate dev --name init
npx prisma generate
```

## 5. 测试连接

```bash
npx prisma studio
```

## ETL数据导入

```bash
cd xiaohongshu-crawler
pip install -r etl/requirements.txt
python etl/transform.py
```

## 常用命令

```sql
-- 查看所有表
SHOW TABLES;

-- 查看夜市数据
SELECT * FROM markets LIMIT 10;

-- 查看跑山数据
SELECT * FROM routes LIMIT 10;

-- 统计数据
SELECT 
  (SELECT COUNT(*) FROM markets) as markets,
  (SELECT COUNT(*) FROM routes) as routes,
  (SELECT COUNT(*) FROM foods) as foods;
```
