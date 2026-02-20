# 🚀 Deploy Rápido - CortesHot

## ⚡ Deploy em 5 Minutos

### 1️⃣ Backend (Railway) - 2 min

1. Acesse: **https://railway.app**
2. Login com GitHub
3. **New Project** → **Deploy from GitHub repo**
4. Repositório: `Leonardotrentini/hot`
5. Configure:
   - **Root Directory:** `backend`
6. **Deploy!**
7. **Copie a URL** (ex: `https://xxx.up.railway.app`)

### 2️⃣ Frontend (Vercel) - 2 min

1. Acesse: **https://vercel.com**
2. Login com GitHub
3. **Add New Project**
4. Importe: `Leonardotrentini/hot`
5. Configure:
   - **Root Directory:** `frontend`
   - **Framework:** Create React App
6. **Environment Variables:**
   - Key: `REACT_APP_API_URL`
   - Value: URL do Railway (do passo 1)
7. **Deploy!**

### 3️⃣ Testar - 1 min

1. Acesse a URL do Vercel
2. Faça upload de um vídeo
3. ✅ Funcionando!

---

## 📋 Arquivos de Configuração Criados

✅ `backend/railway.json` - Config Railway
✅ `backend/render.yaml` - Config Render
✅ `backend/Procfile` - Config Heroku
✅ `backend/nixpacks.toml` - Config FFmpeg
✅ `vercel.json` - Config Vercel (frontend)
✅ `.vercelignore` - Ignorar backend no Vercel

---

## 🎯 URLs Finais

- **Frontend:** `https://seu-projeto.vercel.app`
- **Backend:** `https://seu-backend.railway.app`

---

## ✅ Tudo Pronto!

O projeto está **100% pronto para deploy**! 🎉

Siga os passos acima e em 5 minutos estará funcionando!
