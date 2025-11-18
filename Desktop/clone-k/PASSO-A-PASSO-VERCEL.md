# 🚀 Passo a Passo Completo - Deploy na Vercel

## ✅ PRÉ-REQUISITOS

- [x] Conta no GitHub criada
- [x] Repositório `clone-k` criado no GitHub
- [x] Conta na Vercel (criar em vercel.com se não tiver)

---

## 📋 PASSO 1: Limpar e Preparar o Git

### 1.1 - Remover o Git atual (se necessário)

```powershell
cd "C:\Users\Leonardo trentini\Desktop\clone-k"
Remove-Item -Recurse -Force .git -ErrorAction SilentlyContinue
```

### 1.2 - Inicializar Git novamente

```powershell
git init
git branch -M main
```

### 1.3 - Adicionar apenas os arquivos do projeto

```powershell
git add .
git commit -m "Clone-K - Versão inicial"
```

### 1.4 - Conectar ao GitHub

```powershell
git remote add origin https://github.com/Leonardotrentini/clone-k.git
```

### 1.5 - Enviar para o GitHub

```powershell
git push -u origin main
```

**Se pedir autenticação:**
- Use um Personal Access Token do GitHub
- Ou configure SSH

---

## 🌐 PASSO 2: Configurar Deploy na Vercel

### 2.1 - Acessar Vercel

1. Acesse: **https://vercel.com**
2. Faça login com sua conta GitHub
3. Clique em **"Add New..."** → **"Project"**

### 2.2 - Importar Repositório

1. Na lista de repositórios, encontre **`clone-k`**
2. Clique em **"Import"** ao lado do repositório

### 2.3 - Configurar Projeto

Na tela de configuração:

#### **Vercel Team:**
- Selecione seu time (ou deixe "Personal")

#### **Project Name:**
- Deixe como `clone-k` (ou mude se quiser)

#### **Framework Preset:**
- ⚠️ **IMPORTANTE:** Mude de "Other" para **"Next.js"**
- A Vercel detecta automaticamente, mas confirme que está "Next.js"

#### **Root Directory:**
- Deixe como `./` (ponto e barra)

#### **Build and Output Settings:**
- Clique para expandir
- **Build Command:** `npm run build` (já vem preenchido)
- **Output Directory:** `.next` (já vem preenchido)
- **Install Command:** `npm install` (já vem preenchido)

#### **Environment Variables:**
- Não precisa adicionar nada (deixe vazio)

### 2.4 - Fazer Deploy

1. Clique no botão grande **"Deploy"** na parte inferior
2. Aguarde o processo (1-2 minutos)
3. Você verá o progresso em tempo real

---

## ✅ PASSO 3: Verificar Deploy

### 3.1 - Aguardar Conclusão

- O deploy leva cerca de **1-2 minutos**
- Você verá mensagens como:
  - "Installing dependencies..."
  - "Building..."
  - "Deploying..."

### 3.2 - Acessar Aplicação

Quando terminar, você verá:
- ✅ **"Congratulations! Your project has been deployed"**
- Uma URL tipo: `https://clone-k.vercel.app`

### 3.3 - Testar

1. Clique na URL ou copie e cole no navegador
2. Teste a aplicação:
   - Cole uma URL para clonar
   - Teste substituição de links
   - Teste detecção de pixels

---

## 🔄 PASSO 4: Atualizações Futuras

Sempre que você fizer alterações:

```powershell
cd "C:\Users\Leonardo trentini\Desktop\clone-k"
git add .
git commit -m "Descrição da alteração"
git push
```

A Vercel **automaticamente** fará novo deploy! 🎉

---

## ⚙️ CONFIGURAÇÕES IMPORTANTES

### Timeout de API

O arquivo `vercel.json` já está configurado com timeout de 30 segundos.

### Domínio Personalizado (Opcional)

1. Vá em **Settings** → **Domains**
2. Adicione seu domínio
3. Siga as instruções de DNS

---

## 🐛 PROBLEMAS COMUNS

### Erro: "Build Failed"

**Solução:**
- Verifique se o Framework Preset está como **"Next.js"**
- Verifique se todas as dependências estão no `package.json`
- Veja os logs de erro na Vercel

### Erro: "Module not found"

**Solução:**
- Execute `npm install` localmente primeiro
- Verifique se todas as dependências estão listadas

### Erro: "Function Timeout"

**Solução:**
- Aumente o timeout no `vercel.json` (máximo 60s no plano gratuito)

---

## 📝 CHECKLIST FINAL

Antes de fazer deploy, verifique:

- [ ] `.gitignore` está configurado corretamente
- [ ] Apenas arquivos do projeto estão no Git
- [ ] `package.json` tem todas as dependências
- [ ] `vercel.json` existe e está configurado
- [ ] `next.config.js` existe
- [ ] Código foi enviado para GitHub
- [ ] Framework Preset está como "Next.js"

---

## 🎉 PRONTO!

Sua aplicação estará online e funcionando!

**URL da aplicação:** `https://clone-k.vercel.app` (ou o nome que você escolheu)

---

## 📞 PRECISA DE AJUDA?

Se algo der errado:
1. Veja os logs na Vercel (aba "Deployments")
2. Verifique se o Framework Preset está correto
3. Confirme que o código está no GitHub

