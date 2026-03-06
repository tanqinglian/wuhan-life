@echo off
REM wuhan-life 安全启动脚本
REM 防止项目崩溃影响 OpenClaw

echo [START] wuhan-life safe launcher...

cd /d D:\workspace\wuhan-life

REM 检查端口是否被占用
netstat -ano | findstr :3000 >nul
if %errorlevel% == 0 (
    echo [WARN] Port 3000 is in use, killing existing process...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
        taskkill /F /PID %%a 2>nul
    )
    timeout /t 2 >nul
)

REM 启动项目（带错误处理）
echo [RUN] Starting Next.js dev server...
start /B npm run dev 2>&1 | cmd /q /k "echo off"

echo [OK] wuhan-life started in background
echo [INFO] Access at http://localhost:3000

REM 等待启动完成
timeout /t 5 >nul

REM 检查是否启动成功
netstat -ano | findstr :3000 >nul
if %errorlevel% == 0 (
    echo [SUCCESS] Server is running on port 3000
) else (
    echo [ERROR] Failed to start server
    exit /b 1
)
