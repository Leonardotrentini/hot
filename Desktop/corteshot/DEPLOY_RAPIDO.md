# ⚡ Deploy Rápido - 5 Minutos

## 🚀 Passo a Passo Simplificado

### 1️⃣ Backend no Railway (2 min)

1. Acesse: https://railway.app
2. Login com GitHub
3. **New Project** → **Deploy from GitHub repo**
4. Selecione: `Leonardotrentini/hot`
5. Configure:
   - **Root Directory:** `backend`
   - Deixe o resto padrão
6. **Deploy!**
7. Copie a URL (ex: `https://xxx.up.railway.app`)

### 2️⃣ Frontend no Vercel (2 min)

1. Acesse: https://vercel.com
2. Login com GitHub
3. **Add New Project**
4. Importe: `Leonardotrentini/hot`
5. Configure:
   - **Root Directory:** `frontend`
   - **Framework:** Create React App
6. **Environment Variables:**
   - `REACT_APP_API_URL` = URL do Railway (passo 1)
7. **Deploy!**

### 3️⃣ Testar (1 min)

1. Acesse a URL do Vercel
2. Faça upload de um vídeo
3. Selecione duração
4. ✅ Funcionando!

---

## 🎯 URLs Finais

- **Frontend:** `https://seu-projeto.vercel.app`
- **Backend:** `https://seu-backend.railway.app`

---

## ✅ Pronto!

Tudo funcionando em 5 minutos! 🎉
