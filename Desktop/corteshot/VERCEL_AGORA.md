# ⚡ Deploy no Vercel - AGORA!

## 🎯 Passo a Passo Rápido

### ⚠️ IMPORTANTE: Você precisa de 2 serviços

1. **Backend no Railway** (para FFmpeg funcionar)
2. **Frontend no Vercel** (interface)

---

## 1️⃣ BACKEND NO RAILWAY (Primeiro!)

### Por quê primeiro?
Você precisa da URL do backend para configurar o frontend.

### Como fazer:

1. **Acesse:** https://railway.app
2. **Login** com GitHub
3. **New Project** → **Deploy from GitHub repo**
4. Selecione: `Leonardotrentini/hot`
5. **Root Directory:** `backend`
6. **Deploy!** (aguarde 2-3 minutos)
7. **Copie a URL** que aparece (ex: `https://xxx.up.railway.app`)

✅ **Backend pronto!**

---

## 2️⃣ FRONTEND NO VERCEL (Agora!)

### Como fazer:

1. **Acesse:** https://vercel.com
2. **Login** com GitHub
3. **Add New Project**
4. Importe: `Leonardotrentini/hot`
5. **Configure:**
   - **Root Directory:** `frontend` ⚠️ **MUITO IMPORTANTE!**
   - **Framework:** Create React App
6. **Environment Variables:**
   - Clique em **"Environment Variables"**
   - Adicione:
     - **Key:** `REACT_APP_API_URL`
     - **Value:** Cole a URL do Railway (do passo 1)
   - Clique em **"Add"**
7. **Deploy!**

✅ **Frontend pronto!**

---

## ✅ Testar

1. Acesse a URL do Vercel
2. Faça upload de um vídeo
3. Selecione duração
4. ✅ Funcionando!

---

## 🎉 Pronto!

- **Frontend:** `https://seu-projeto.vercel.app`
- **Backend:** `https://seu-backend.railway.app`

---

## ❓ Por que 2 serviços?

- **Vercel:** Serverless, não suporta FFmpeg
- **Railway:** Suporta FFmpeg, processa vídeos

**Solução:** Frontend no Vercel + Backend no Railway = ✅ Funciona!

---

## 📚 Mais Detalhes

Veja `DEPLOY_VERCEL_FINAL.md` para guia completo com troubleshooting.
