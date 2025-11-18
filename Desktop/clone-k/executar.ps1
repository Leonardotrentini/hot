# Script para executar a aplicação Clone-K
# Navega para a pasta do projeto e executa o servidor

Write-Host "🚀 Iniciando Clone-K..." -ForegroundColor Green

# Navegar para a pasta do projeto
$projectPath = "C:\Users\Leonardo trentini\Desktop\clone-k"
Set-Location $projectPath

Write-Host "📁 Pasta do projeto: $projectPath" -ForegroundColor Cyan

# Verificar se as dependências estão instaladas
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install express cheerio jszip
}

# Verificar se o arquivo preview-server.js existe
if (Test-Path "preview-server.js") {
    Write-Host "✅ Arquivo preview-server.js encontrado!" -ForegroundColor Green
    Write-Host "🌐 Iniciando servidor em http://localhost:3001" -ForegroundColor Cyan
    Write-Host ""
    node preview-server.js
} else {
    Write-Host "❌ Arquivo preview-server.js não encontrado!" -ForegroundColor Red
    Write-Host "📋 Arquivos na pasta:" -ForegroundColor Yellow
    Get-ChildItem | Select-Object Name
    pause
}

