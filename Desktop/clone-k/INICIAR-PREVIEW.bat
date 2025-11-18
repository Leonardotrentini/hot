@echo off
chcp 65001 >nul
title Clone-K - Preview
color 0B

echo.
echo ========================================
echo   Clone-K - Preview (Versão Simples)
echo ========================================
echo.

cd /d "%~dp0"

echo Verificando dependências...
if not exist "node_modules\express" (
    echo.
    echo Instalando dependências...
    echo.
    call npm install express cheerio jszip
    echo.
)

echo.
echo Iniciando servidor preview...
echo.
echo Servidor disponível em: http://localhost:3001
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

node preview-server.js

pause

