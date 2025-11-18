@echo off
chcp 65001 >nul
title Clone-K - Enviar para GitHub
color 0A

echo.
echo ========================================
echo   Clone-K - Enviar para GitHub
echo ========================================
echo.

cd /d "%~dp0"

echo Verificando se estamos na pasta correta...
if not exist "package.json" (
    echo ERRO: package.json nao encontrado!
    echo Certifique-se de estar na pasta clone-k
    pause
    exit /b 1
)

echo.
echo [1/6] Removendo Git antigo (se existir)...
if exist ".git" (
    echo Removendo...
    rmdir /s /q .git 2>nul
    timeout /t 1 >nul
)

echo.
echo [2/6] Inicializando Git...
git init
git branch -M main

echo.
echo [3/6] Adicionando arquivos do projeto...
git add .

echo.
echo [4/6] Fazendo commit...
git commit -m "Clone-K - Versao inicial completa"

echo.
echo [5/6] Conectando ao GitHub...
git remote remove origin 2>nul
git remote add origin https://github.com/Leonardotrentini/clone-k.git

echo.
echo [6/6] Enviando para GitHub...
echo.
echo ATENCAO: Se pedir autenticacao:
echo - Use seu Personal Access Token do GitHub
echo - Ou configure SSH
echo.
git push -u origin main

echo.
echo ========================================
echo   CONCLUIDO!
echo ========================================
echo.
echo Agora va para vercel.com e faca o deploy
echo Veja o arquivo: PASSO-A-PASSO-VERCEL.md
echo.
pause

