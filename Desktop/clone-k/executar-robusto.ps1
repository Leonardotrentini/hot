# Script para executar a versão ROBUSTA da aplicação Clone-K
# Com Puppeteer para renderização completa de JavaScript

Write-Host "🚀 Iniciando Clone-K (Versão Robusta)..." -ForegroundColor Green

# Navegar para a pasta do projeto
$projectPath = "C:\Users\Leonardo trentini\Desktop\clone-k"
Set-Location $projectPath

Write-Host "📁 Pasta do projeto: $projectPath" -ForegroundColor Cyan

# Verificar se as dependências estão instaladas
if (-not (Test-Path "node_modules\puppeteer")) {
    Write-Host "📦 Instalando dependências (isso pode levar alguns minutos)..." -ForegroundColor Yellow
    Write-Host "   Puppeteer baixará o Chromium automaticamente..." -ForegroundColor Yellow
    npm install express cheerio jszip axios puppeteer
} else {
    Write-Host "✅ Dependências já instaladas!" -ForegroundColor Green
}

# Verificar se o arquivo existe
if (Test-Path "server-robusto.js") {
    Write-Host "✅ Arquivo server-robusto.js encontrado!" -ForegroundColor Green
    Write-Host "🌐 Iniciando servidor em http://localhost:3001" -ForegroundColor Cyan
    Write-Host ""
    node server-robusto.js
} else {
    Write-Host "❌ Arquivo server-robusto.js não encontrado!" -ForegroundColor Red
    Write-Host "📋 Arquivos na pasta:" -ForegroundColor Yellow
    Get-ChildItem | Select-Object Name
    pause
}

