@echo off
chcp 65001 >nul
title Clone-K - Servidor
color 0A

echo.
echo ========================================
echo   Clone-K - Clonador de Páginas Web
echo ========================================
echo.

cd /d "%~dp0"

echo Verificando dependências...
if not exist "node_modules\puppeteer" (
    echo.
    echo Instalando dependências (primeira vez apenas)...
    echo Isso pode levar alguns minutos...
    echo.
    call npm install express cheerio jszip axios puppeteer
    echo.
)

echo.
echo Iniciando servidor...
echo.
echo Servidor disponível em: http://localhost:3001
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

node server-robusto.js

pause

