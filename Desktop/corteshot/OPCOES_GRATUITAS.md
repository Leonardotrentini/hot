# 🆓 Opções GRATUITAS para Deploy

## ✅ Melhores Opções GRATUITAS

### 1. **Render.com** ⭐ RECOMENDADO
- ✅ **Plano gratuito disponível**
- ✅ **Suporta FFmpeg**
- ✅ **Fácil de configurar**
- ✅ **Já tem arquivo de configuração pronto!**

**Limites do plano gratuito:**
- 750 horas/mês (suficiente para uso pessoal)
- Pode "dormir" após 15min de inatividade
- Primeira requisição após dormir pode demorar ~30s

**Como usar:**
1. Acesse: https://render.com
2. Login com GitHub
3. New → Web Service
4. Conecte o repositório `Leonardotrentini/hot`
5. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free
6. Deploy!

**Arquivo já configurado:** `backend/render.yaml` ✅

---

### 2. **Railway.app** ⭐ TAMBÉM GRATUITO
- ✅ **$5 grátis por mês** (créditos)
- ✅ **Suporta FFmpeg**
- ✅ **Não "dorme"**
- ✅ **Muito rápido**

**Limites:**
- $5 de créditos grátis/mês
- Geralmente suficiente para uso pessoal
- Se acabar, pode adicionar cartão (mas não cobra se não usar)

**Como usar:**
1. Acesse: https://railway.app
2. Login com GitHub
3. New Project → Deploy from GitHub
4. Root Directory: `backend`
5. Deploy!

**Arquivo já configurado:** `backend/railway.json` ✅

---

### 3. **Fly.io** 🆕
- ✅ **Plano gratuito**
- ✅ **Suporta FFmpeg**
- ✅ **Não "dorme"**

**Limites:**
- 3 VMs compartilhadas grátis
- 160GB de transferência/mês

**Como usar:**
1. Instale Fly CLI: `iwr https://fly.io/install.ps1 -useb | iex`
2. Login: `fly auth login`
3. Deploy: `cd backend && fly launch`

---

### 4. **Replit** 🆕
- ✅ **Plano gratuito**
- ✅ **Suporta FFmpeg**
- ✅ **Interface web completa**

**Limites:**
- Pode "dormir" após inatividade
- Recursos limitados

**Como usar:**
1. Acesse: https://replit.com
2. Importe do GitHub
3. Configure e rode

---

## 🎯 RECOMENDAÇÃO FINAL

### Para começar AGORA (mais fácil):
**Render.com** - Já está tudo configurado!

### Para uso contínuo (não dorme):
**Railway.app** - $5 grátis/mês, geralmente suficiente

---

## 📋 Comparação Rápida

| Plataforma | Grátis? | FFmpeg? | Dorme? | Fácil? |
|------------|---------|---------|--------|--------|
| **Render** | ✅ Sim | ✅ Sim | ⚠️ Sim (15min) | ⭐⭐⭐⭐⭐ |
| **Railway** | ✅ $5/mês | ✅ Sim | ❌ Não | ⭐⭐⭐⭐⭐ |
| **Fly.io** | ✅ Sim | ✅ Sim | ❌ Não | ⭐⭐⭐ |
| **Replit** | ✅ Sim | ✅ Sim | ⚠️ Sim | ⭐⭐⭐⭐ |

---

## 🚀 Deploy Rápido no Render (GRATUITO)

### Passo a Passo:

1. **Acesse:** https://render.com
2. **Login** com GitHub
3. **New** → **Web Service**
4. **Conecte repositório:** `Leonardotrentini/hot`
5. **Configure:**
   ```
   Name: corteshot-backend
   Region: Oregon (ou mais próximo)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: node server.js
   Plan: Free
   ```
6. **Environment Variables** (se necessário):
   - `NODE_ENV=production`
   - `PORT=10000` (Render define automaticamente)
7. **Create Web Service**
8. **Aguarde deploy** (~3-5 minutos)
9. **Copie a URL** (ex: `https://corteshot-backend.onrender.com`)

✅ **Pronto!** Use essa URL no Vercel como `REACT_APP_API_URL`

---

## ⚠️ Importante sobre "Dormir"

**Render (Free):**
- Primeira requisição após dormir pode demorar ~30s
- Depois funciona normal
- Se usar frequentemente, não dorme

**Solução:**
- Use Railway se quiser que nunca durma
- Ou aceite o delay inicial no Render (é grátis!)

---

## 💡 Dica

**Comece com Render (grátis e fácil)**
Se precisar de algo que nunca dorme, migre para Railway depois.

**Ambos são GRATUITOS para começar!** 🎉
