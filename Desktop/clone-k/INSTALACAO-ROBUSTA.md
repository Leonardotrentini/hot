# 🚀 Instalação da Versão Robusta

## 📦 Passo 1: Instalar Dependências

```powershell
cd "C:\Users\Leonardo trentini\Desktop\clone-k"
npm install express cheerio jszip axios puppeteer
```

## ⚙️ Passo 2: Executar Servidor

```powershell
node server-robusto.js
```

## 🌐 Passo 3: Acessar

Abra no navegador: `http://localhost:3001`

---

## ✨ O que mudou na versão robusta?

### ✅ Melhorias Implementadas:

1. **Puppeteer** - Renderiza JavaScript completamente
   - Páginas com JS dinâmico agora funcionam
   - Aguarda carregamento completo
   - Captura HTML após renderização

2. **Axios** - Requisições HTTP mais robustas
   - Melhor tratamento de erros
   - Timeouts configuráveis
   - Headers adequados

3. **Logs Detalhados** - Console mostra progresso
   - Ver o que está acontecendo
   - Debug mais fácil
   - Mensagens claras

4. **Tratamento de Erros** - Mais robusto
   - Erros específicos
   - Mensagens claras
   - Recuperação automática

5. **Substituição de Links** - Mais completa
   - Detecta mais tipos de botões
   - Substitui data attributes
   - Melhor cobertura

---

## 🎯 Funcionalidades Garantidas:

✅ Clonagem completa de HTML  
✅ Renderização de JavaScript  
✅ Substituição de links  
✅ Detecção de pixels  
✅ Remoção/adição de pixels  
✅ Download de bibliotecas  
✅ Conversão de recursos relativos  

---

## ⚠️ Nota sobre Puppeteer

O Puppeteer baixa o Chromium automaticamente na primeira instalação. Isso pode levar alguns minutos, mas é uma única vez.

Se der erro de instalação do Puppeteer, tente:

```powershell
npm install puppeteer --ignore-scripts
```

Ou use a versão sem Puppeteer (mais rápida, mas sem renderização JS):

```powershell
node preview-server.js
```

