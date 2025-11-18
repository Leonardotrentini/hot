@echo off
chcp 65001 >nul
title Clone-K - Limpar e Enviar para GitHub
color 0A

echo.
echo ========================================
echo   Clone-K - Preparar para GitHub
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] Removendo Git antigo (se existir)...
if exist ".git" (
    rmdir /s /q .git 2>nul
    echo Git antigo removido.
) else (
    echo Nenhum Git antigo encontrado.
)

echo.
echo [2/5] Inicializando Git...
git init
git branch -M main

echo.
echo [3/5] Adicionando arquivos...
git add .

echo.
echo [4/5] Fazendo commit...
git commit -m "Clone-K - Versão inicial completa"

echo.
echo [5/5] Conectando ao GitHub...
git remote remove origin 2>nul
git remote add origin https://github.com/Leonardotrentini/clone-k.git

echo.
echo ========================================
echo   PRÓXIMOS PASSOS:
echo ========================================
echo.
echo 1. Execute: git push -u origin main
echo.
echo 2. Se pedir autenticação, use um Personal
echo    Access Token do GitHub
echo.
echo 3. Depois vá para vercel.com e faça o deploy
echo.
echo ========================================
echo.

pause

