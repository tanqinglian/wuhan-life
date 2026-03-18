@echo off
chcp 65001 >nul
echo ==========================================
echo   MySQL 自动安装脚本
echo ==========================================

echo.
echo [1/3] 安装MySQL...
winget install Oracle.MySQL --accept-source-agreements --accept-package-agreements

echo.
echo [2/3] 等待安装完成（30秒）...
timeout /t 30 /nobreak >nul

echo.
echo [3/3] 配置环境变量...
setx PATH "%PATH%;C:\Program Files\MySQL\MySQL Server 8.0\bin" >nul

echo.
echo ==========================================
echo   安装完成！
echo ==========================================
echo.
echo 下一步：
echo 1. 重启PowerShell（刷新环境变量）
echo 2. 运行：database\setup-mysql.ps1
echo.
pause
