@echo off
chcp 65001 >nul
title SnipX - Local Preview
cd /d "%~dp0"

echo ============================================================
echo   Local live preview (Astro dev server, hot reload)
echo   Chinese: http://127.0.0.1:4325/zh-cn/
echo   English: http://127.0.0.1:4325/
echo   Open these links after Astro reports ready.
echo   Stop: close this window or press Ctrl+C
echo ============================================================
echo.

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm not found in PATH. Please install Node.js first.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo node_modules not found. Installing dependencies, please wait...
  call npm ci
  if errorlevel 1 (
    echo [ERROR] npm ci failed.
    pause
    exit /b 1
  )
)

echo Starting dev server...
echo.
call npm run dev -- --host 127.0.0.1 --port 4325 --strictPort

echo.
echo Dev server stopped.
pause
