# MySQL安装和初始化脚本

Write-Host "=========================================="
Write-Host "  MySQL 安装和初始化"
Write-Host "=========================================="

# 1. 检查MySQL是否安装
Write-Host "`n[1/5] 检查MySQL安装..."
$mysqlPath = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"

if (Test-Path $mysqlPath) {
    Write-Host "[OK] MySQL已安装"
} else {
    Write-Host "[WARN] MySQL未安装，正在安装..."
    winget install Oracle.MySQL --accept-source-agreements --accept-package-agreements
}

# 2. 设置环境变量
Write-Host "`n[2/5] 设置环境变量..."
$env:Path += ";C:\Program Files\MySQL\MySQL Server 8.0\bin"

# 3. 启动MySQL服务
Write-Host "`n[3/5] 启动MySQL服务..."
Start-Service MySQL80 -ErrorAction SilentlyContinue

# 4. 创建数据库
Write-Host "`n[4/5] 创建数据库..."
$password = Read-Host "请输入MySQL root密码"

$createDbSql = @"
CREATE DATABASE IF NOT EXISTS wuhan_life CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE wuhan_life;
SOURCE database\init.sql;
"@

$createDbSql | & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p$password

# 5. 验证
Write-Host "`n[5/5] 验证数据库..."
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p$password -e "SHOW DATABASES LIKE 'wuhan_life';"

Write-Host "`n=========================================="
Write-Host "  MySQL初始化完成"
Write-Host "=========================================="
