# wuhan-life 数据库部署指南

## 架构选型

**数据库：** PostgreSQL 15
**扩展：** PostGIS 3（地理空间支持）
**ORM：** Prisma

---

## 一、部署步骤

### 1. 准备服务器
- 系统：Ubuntu 20.04+ 或 Debian 11+
- 内存：至少 1GB
- 存储：至少 10GB

### 2. 执行部署脚本
```bash
# 上传脚本到服务器
scp deploy/postgresql-setup.sh root@your-server:/root/

# 执行部署
ssh root@your-server
chmod +x postgresql-setup.sh
./postgresql-setup.sh
```

### 3. 记录连接信息
脚本会自动生成：
- 数据库名：wuhan_life
- 用户名：wuhan_user
- 密码：24位随机密码

**⚠️ 请妥善保存密码！**

### 4. 配置应用
将输出的 `DATABASE_URL` 添加到 `.env` 文件。

---

## 二、安全加固

### 1. 防火墙（推荐）
```bash
# 只允许应用服务器 IP 访问
ufw allow from 应用服务器IP to any port 5432
```

### 2. 强密码
脚本已自动生成 24 位随机密码，无需修改。

### 3. SSL 连接（生产环境推荐）
```bash
# 生成自签名证书
openssl req -new -x509 -days 365 -nodes \
  -text -out server.crt \
  -keyout server.key \
  -subj "/CN=localhost"

# 配置 PostgreSQL
echo "ssl = on" >> /etc/postgresql/15/main/postgresql.conf
echo "ssl_cert_file = '/var/lib/postgresql/server.crt'" >> /etc/postgresql/15/main/postgresql.conf
echo "ssl_key_file = '/var/lib/postgresql/server.key'" >> /etc/postgresql/15/main/postgresql.conf

# 重启服务
systemctl restart postgresql
```

---

## 三、备份策略

### 手动备份
```bash
./deploy/postgresql-backup.sh
```

### 自动备份（crontab）
```bash
# 编辑定时任务
crontab -e

# 添加（每天凌晨 3 点备份）
0 3 * * * /root/wuhan-life/deploy/postgresql-backup.sh >> /var/log/postgresql-backup.log 2>&1
```

### 恢复备份
```bash
# 解压备份
gunzip wuhan_life_20260304.sql.gz

# 恢复数据
psql -U wuhan_user -d wuhan_life -f wuhan_life_20260304.sql
```

---

## 四、监控

### 运行监控
```bash
./deploy/postgresql-monitor.sh
```

### 监控指标
- 服务状态
- 连接数
- 数据库大小
- 表大小
- PostGIS 状态
- 慢查询

---

## 五、性能优化

### 1. 内存配置
编辑 `/etc/postgresql/15/main/postgresql.conf`：
```ini
# 根据服务器内存调整
shared_buffers = 256MB          # 内存 / 4
effective_cache_size = 768MB    # 内存 * 0.75
work_mem = 4MB
maintenance_work_mem = 64MB
```

### 2. 连接池
```bash
# 安装 PgBouncer
apt install pgbouncer

# 配置（略）
```

### 3. 索引优化
Prisma 已自动创建索引，无需额外优化。

---

## 六、PostGIS 使用

### 地理空间查询示例
```sql
-- 查询 5km 内的夜市
SELECT name, 
  ST_Distance(
    ST_MakePoint(longitude, latitude)::geography,
    ST_MakePoint(114.3, 30.5)::geography
  ) as distance
FROM markets
WHERE ST_DWithin(
  ST_MakePoint(longitude, latitude)::geography,
  ST_MakePoint(114.3, 30.5)::geography,
  5000
)
ORDER BY distance;
```

---

## 七、常见问题

### Q: 连接超时
A: 检查防火墙和 pg_hba.conf 配置

### Q: 权限错误
A: 确保用户有 schema public 权限

### Q: PostGIS 找不到
A: 确保已执行 `CREATE EXTENSION postgis;`

---

## 八、迁移清单

- [ ] 准备云服务器
- [ ] 执行部署脚本
- [ ] 记录连接信息
- [ ] 配置应用 .env
- [ ] 执行 `prisma migrate deploy`
- [ ] 执行 `prisma db seed`
- [ ] 配置自动备份
- [ ] 配置监控
- [ ] 测试应用连接

---

**部署负责人：** Dev Agent
**文档更新：** 2026-03-04
