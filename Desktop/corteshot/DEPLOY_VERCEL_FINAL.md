# 🚀 Deploy na Vercel - Passo a Passo

## ⚠️ IMPORTANTE

O **Vercel é serverless** e **NÃO suporta FFmpeg** para processamento de vídeo.

**Solução:** Frontend no Vercel + Backend em Railway/Render

---

## 📋 PARTE 1: Deploy do Backend (Railway) - OBRIGATÓRIO

**Por quê?** O backend precisa de FFmpeg para processar vídeos, e o Vercel não suporta isso.

### Passo a Passo:

1. **Acesse:** https://railway.app
2. **Login** com GitHub
3. **New Project** → **Deploy from GitHub repo**
4. Selecione: `Leonardotrentini/hot`
5. Configure:
   - **Root Directory:** `backend`
   - Deixe o resto padrão
6. **Deploy!**
7. **Copie a URL** (ex: `https://corteshot-backend-production.up.railway.app`)

**⏱️ Tempo:** ~3 minutos

---

## 📋 PARTE 2: Deploy do Frontend (Vercel)

### Passo a Passo:

1. **Acesse:** https://vercel.com
2. **Login** com GitHub
3. Clique em **"Add New..."** → **"Project"**
4. **Import Git Repository:**
   - Selecione: `Leonardotrentini/hot`
   - Clique em **"Import"**

5. **Configure o Projeto:**
   - **Project Name:** `corteshot` (ou o que preferir)
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend` ⚠️ **IMPORTANTE!**
   - **Build Command:** `npm run build` (ou deixe padrão)
   - **Output Directory:** `build`

6. **Environment Variables:**
   - Clique em **"Environment Variables"**
   - Adicione:
     - **Key:** `REACT_APP_API_URL`
     - **Value:** URL do Railway (do Passo 1)
       - Exemplo: `https://corteshot-backend-production.up.railway.app`
   - Clique em **"Add"**

7. **Deploy:**
   - Clique em **"Deploy"**
   - Aguarde o build (2-3 minutos)

8. **Pronto!**
   - Vercel fornece uma URL como: `https://corteshot.vercel.app`
   - Acesse e teste!

---

## ✅ Verificação

### 1. Backend Funcionando?
Teste no navegador:
```
https://seu-backend.railway.app/
```
Deve retornar: `{ "message": "CortesHot API", "status": "running" }`

### 2. Frontend Conectado?
1. Acesse a URL do Vercel
2. Abra o Console (F12)
3. Verifique se não há erros
4. Tente fazer upload de um vídeo

---

## 🔧 Troubleshooting

### Erro: "Cannot connect to backend"
- ✅ Verifique se `REACT_APP_API_URL` está configurada no Vercel
- ✅ Verifique se o backend está rodando no Railway
- ✅ Teste a URL do backend diretamente no navegador

### Erro: "CORS"
- ✅ CORS já está configurado no backend
- ✅ Verifique se a URL do backend está correta

### Erro: "FFmpeg not found"
- ✅ Isso só acontece no backend (Railway)
- ✅ Railway geralmente tem FFmpeg disponível
- ✅ Se não funcionar, veja `DEPLOY_BACKEND_RAILWAY.md`

---

## 📝 Checklist

- [ ] Backend deployado no Railway
- [ ] URL do backend copiada
- [ ] Frontend deployado no Vercel
- [ ] Variável `REACT_APP_API_URL` configurada
- [ ] Teste de upload funcionando
- [ ] Teste de processamento funcionando

---

## 🎉 Pronto!

Sua plataforma está no ar!

- **Frontend:** `https://seu-projeto.vercel.app`
- **Backend:** `https://seu-backend.railway.app`

---

## 💡 Dica

Se quiser usar apenas Vercel (sem Railway), você precisaria:
- Usar um serviço externo de processamento de vídeo (AWS Lambda com FFmpeg layer, Cloudflare Workers, etc.)
- Ou aceitar que o processamento não funcionará no Vercel

**Recomendação:** Use Railway para o backend (grátis e fácil)!
