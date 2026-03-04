@echo off
chcp 65001 >nul
echo ========================================
echo   武汉生活 - MySQL数据库初始化
echo ========================================
echo.

REM 检查MySQL是否运行
echo [1/4] 检查MySQL服务...
sc query MySQL80 | find "RUNNING" >nul
if %errorlevel% neq 0 (
    echo [ERROR] MySQL服务未运行，请先启动MySQL
    pause
    exit /b 1
)
echo [OK] MySQL服务运行中

REM 提示输入密码
echo.
echo [2/4] 创建数据库...
set /p MYSQL_PASSWORD="请输入MySQL root密码: "

REM 执行SQL脚本
mysql -u root -p%MYSQL_PASSWORD% < database\init.sql
if %errorlevel% neq 0 (
    echo [ERROR] 数据库创建失败
    pause
    exit /b 1
)
echo [OK] 数据库创建成功

REM 复制环境变量文件
echo.
echo [3/4] 配置环境变量...
copy .env.mysql .env >nul
echo [OK] 环境变量已配置

REM 提示
echo.
echo [4/4] 下一步操作
echo ========================================
echo 1. 修改 .env 文件中的密码
echo 2. 运行: npx prisma generate
echo 3. 运行: cd xiaohongshu-crawler ^&^& python etl/transform.py
echo ========================================
echo.
pause
