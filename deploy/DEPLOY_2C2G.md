# wuhan-life 部署指南（2核2G配置）

## 服务器配置

**推荐配置：**
- CPU：2核
- 内存：2GB
- 带宽：3-4Mbps
- 存储：40-60GB SSD
- 系统：Ubuntu 20.04 / 22.04

**推荐云厂商：**
- 腾讯云轻量应用服务器：62元/月
- 阿里云轻量应用服务器：60元/月

---

## 部署步骤

### 1. 购买服务器

**腾讯云：**
1. 访问：https://cloud.tencent.com/product/lighthouse
2. 选择配置：2核2G，带宽4M
3. 选择地域：武汉/上海（就近）
4. 购买时长：建议1年起（更优惠）

**阿里云：**
1. 访问：https://www.aliyun.com/product/swas
2. 选择配置：2核2G，带宽3M
3. 选择地域：华东/华中
4. 购买时长：建议1年起

---

### 2. 连接服务器

```bash
# Windows (PowerShell)
ssh root@你的服务器IP

# 或使用SSH工具
# Putty / Xshell / Termius
```

---

### 3. 一键部署脚本

**创建部署脚本：**
```bash
# 下载脚本
wget https://raw.githubusercontent.com/tanqinglian/wuhan-life/main/deploy/install.sh

# 添加执行权限
chmod +x install.sh

# 执行部署
./install.sh
```

---

### 4. 配置说明

**环境变量：**
```bash
# 编辑 .env 文件
nano /var/www/wuhan-life/.env

# 必须配置：
DATABASE_URL="mysql://root:你的密码@localhost:3306/wuhan_life"
NEXTAUTH_SECRET="随机生成的密钥"
NEXTAUTH_URL="http://你的域名或IP:3000"
```

---

### 5. 启动服务

```bash
# 启动应用
cd /var/www/wuhan-life
npm run build
pm2 start npm --name wuhan-life -- run start

# 配置Nginx（可选）
# 见 deploy/nginx.conf
```

---

## 性能优化（2G内存）

### 1. Node.js内存限制
```bash
# 限制Node.js内存使用
export NODE_OPTIONS="--max-old-space-size=1536"
```

### 2. MySQL配置优化
```ini
# /etc/mysql/mysql.conf.d/low-memory.cnf
[mysqld]
performance_schema = OFF
innodb_buffer_pool_size = 128M
innodb_log_buffer_size = 8M
max_connections = 50
```

### 3. PM2集群模式
```json
// ecosystem.config.js
{
  "apps": [{
    "name": "wuhan-life",
    "script": "npm",
    "args": "run start",
    "max_memory_restart": "1.5G",
    "instances": 1,
    "exec_mode": "fork"
  }]
}
```

---

## 监控与维护

### 1. 内存监控
```bash
# 查看内存使用
free -h

# 查看进程内存
ps aux --sort=-%mem | head
```

### 2. 日志查看
```bash
# PM2日志
pm2 logs wuhan-life

# Nginx日志
tail -f /var/log/nginx/access.log
```

### 3. 自动重启
```bash
# PM2开机自启
pm2 startup
pm2 save
```

---

## 预估成本

| 项目 | 月费用 |
|------|--------|
| 云服务器 | 60-62元 |
| 域名（可选） | 10-50元 |
| SSL证书（可选） | 0-100元 |
| **总计** | **60-212元/月** |

---

## 下一步

1. [ ] 购买云服务器
2. [ ] 连接服务器
3. [ ] 运行部署脚本
4. [ ] 配置域名（可选）
5. [ ] 启动应用
