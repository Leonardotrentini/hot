# Clone-K - Clonador de Páginas Web

Aplicação web para clonar páginas web com funcionalidades avançadas de substituição de links e gerenciamento de pixels.

## 🚀 Funcionalidades

- ✅ **Clonagem Completa de Páginas** - Clone qualquer página web
- ✅ **Substituição de Links** - Substitua links de botões automaticamente
- ✅ **Detecção de Pixels** - Detecta pixels do Facebook, Google Analytics, etc.
- ✅ **Gerenciamento de Pixels** - Remova pixels existentes e adicione novos
- ✅ **Download de Bibliotecas** - Baixe todos os arquivos de uma URL em ZIP
- ✅ **Conversão de Recursos** - Converte links relativos para absolutos

## 🛠️ Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Cheerio** - Parsing de HTML
- **JSZip** - Criação de arquivos ZIP

## 📦 Instalação Local

```bash
npm install
npm run dev
```

Acesse: `http://localhost:3000`

## 🌐 Deploy na Vercel

### Opção 1: Deploy via GitHub (Recomendado)

1. **Criar repositório no GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/SEU-USUARIO/clone-k.git
   git push -u origin main
   ```

2. **Conectar na Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com GitHub
   - Clique em "New Project"
   - Selecione o repositório `clone-k`
   - Clique em "Deploy"

3. **Pronto!** Sua aplicação estará online em segundos!

### Opção 2: Deploy via CLI

```bash
npm i -g vercel
vercel
```

## 📝 Como Usar

1. **Clonar Página:**
   - Cole a URL da página
   - (Opcional) Defina novo link para botões
   - (Opcional) Adicione código de pixel
   - Clique em "Clonar Página"

2. **Gerenciar Pixels:**
   - Se um pixel for detectado, você verá um aviso
   - Marque a opção para remover pixel atual
   - Cole o código do novo pixel

3. **Download de Biblioteca:**
   - Cole a URL da biblioteca
   - Clique em "Baixar Todos os Arquivos (ZIP)"

## ⚙️ Configuração

A aplicação está configurada para funcionar na Vercel com:
- Timeout de 30 segundos para APIs
- Suporte a CORS
- Limite de 50MB para requisições

## 📄 Licença

Uso pessoal

## 🤝 Contribuindo

Este é um projeto pessoal, mas sugestões são bem-vindas!
