@echo off
REM GitHub Token 配置脚本

echo ========================================
echo GitHub Token 配置向导
echo ========================================
echo.
echo 请按照以下步骤操作：
echo.
echo 1. 访问 https://github.com/settings/tokens
echo 2. 点击 "Generate new token (classic)"
echo 3. 勾选 repo 权限
echo 4. 生成并复制token
echo.
echo ========================================
echo.

set /p TOKEN="请粘贴您的GitHub Token: "

if "%TOKEN%"=="" (
    echo 错误：Token不能为空
    pause
    exit /b 1
)

echo.
echo 正在配置Git...
git remote set-url origin https://%TOKEN%@github.com/tanqinglian/wuhan-life.git

echo.
echo 配置完成！
echo.
echo 现在可以运行以下命令推送代码：
echo   git push -u origin feature/initial-development
echo.

pause
