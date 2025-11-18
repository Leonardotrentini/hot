# Script para executar a versão Next.js completa
# Navega para a pasta do projeto e executa o servidor Next.js

Write-Host "🚀 Iniciando Clone-K (Next.js)..." -ForegroundColor Green

# Navegar para a pasta do projeto
$projectPath = "C:\Users\Leonardo trentini\Desktop\clone-k"
Set-Location $projectPath

Write-Host "📁 Pasta do projeto: $projectPath" -ForegroundColor Cyan

# Verificar se as dependências estão instaladas
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install
}

# Verificar se o package.json tem o script dev
Write-Host "🌐 Iniciando servidor Next.js em http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
npm run dev

