@echo off
chcp 65001 >nul
title Clone-K - Enviar Correções
color 0A

echo.
echo ========================================
echo   Clone-K - Enviar Correções
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Adicionando arquivos corrigidos...
git add .

echo.
echo [2/3] Fazendo commit...
git commit -m "Correcoes para deploy na Vercel - Funcionando"

echo.
echo [3/3] Enviando para GitHub...
git push

echo.
echo ========================================
echo   CONCLUIDO!
echo ========================================
echo.
echo A Vercel fara deploy automatico em 1-2 minutos
echo Acesse: https://clone-k.vercel.app
echo.
echo Se nao fizer deploy automatico:
echo 1. Va para vercel.com
echo 2. Acesse o projeto clone-k
echo 3. Clique em "Redeploy"
echo.
pause

