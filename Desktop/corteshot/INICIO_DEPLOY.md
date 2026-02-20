# 🚀 INÍCIO RÁPIDO - Deploy

## ⚡ Deploy em 5 Minutos

### 📋 Passo 1: Backend (Railway)

1. Acesse: **https://railway.app**
2. Login com GitHub
3. **New Project** → **Deploy from GitHub repo**
4. Repositório: `Leonardotrentini/hot`
5. **Root Directory:** `backend`
6. **Deploy!**
7. **Copie a URL** (ex: `https://xxx.up.railway.app`)

### 📋 Passo 2: Frontend (Vercel)

1. Acesse: **https://vercel.com**
2. Login com GitHub
3. **Add New Project**
4. Importe: `Leonardotrentini/hot`
5. **Root Directory:** `frontend`
6. **Environment Variable:**
   - `REACT_APP_API_URL` = URL do Railway (passo 1)
7. **Deploy!**

### ✅ Pronto!

Acesse a URL do Vercel e teste! 🎉

---

## 📚 Documentação Completa

- `DEPLOY_RAPIDO.md` - Guia rápido (5 min)
- `DEPLOY_COMPLETO.md` - Guia detalhado
- `COMO_FUNCIONA.md` - Como funciona o sistema
- `DEPLOY_BACKEND_RAILWAY.md` - Deploy backend passo a passo

---

## ✅ Arquivos de Configuração

Todos os arquivos necessários já estão criados:

- ✅ `backend/railway.json` - Config Railway
- ✅ `backend/render.yaml` - Config Render  
- ✅ `backend/Procfile` - Config Heroku
- ✅ `backend/nixpacks.toml` - Config FFmpeg
- ✅ `vercel.json` - Config Vercel
- ✅ `.vercelignore` - Ignorar backend

---

## 🎯 Tudo Pronto!

O projeto está **100% configurado** para deploy! 🚀
