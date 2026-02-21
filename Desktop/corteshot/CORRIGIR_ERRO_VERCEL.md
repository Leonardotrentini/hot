# 🔧 Corrigir Erro FFmpeg no Vercel

## ❌ Erro que você está vendo:

```
Error: File /vercel/path0/node_modules/ffmpeg-static/ffmpeg does not exist.
```

## 🔍 Causa do Problema

O Vercel está tentando buildar o projeto inteiro (incluindo o backend com FFmpeg), mas o Vercel não suporta FFmpeg.

## ✅ Solução

### Opção 1: Configurar Root Directory no Vercel (RECOMENDADO)

**No painel do Vercel:**

1. Vá em **Settings** → **General**
2. Role até **"Root Directory"**
3. Clique em **"Edit"**
4. Digite: `frontend`
5. Clique em **"Save"**
6. Faça um novo deploy

**Isso força o Vercel a buildar apenas a pasta `frontend/`**

---

### Opção 2: Usar vercel.json (Alternativa)

Já atualizei o `vercel.json` para forçar o build apenas do frontend.

**Se a Opção 1 não funcionar, o `vercel.json` já está configurado.**

---

## 📋 Passo a Passo Completo

### 1. No Painel do Vercel:

1. Acesse seu projeto no Vercel
2. Vá em **Settings** (no topo)
3. Clique em **General** (menu lateral)
4. Role até **"Root Directory"**
5. Clique em **"Edit"**
6. Digite: `frontend`
7. Clique em **"Save"**

### 2. Fazer Novo Deploy:

1. Vá em **Deployments** (no topo)
2. Clique nos **3 pontinhos** do último deploy
3. Selecione **"Redeploy"**
4. Ou faça um novo commit e push

### 3. Verificar:

- ✅ Build deve passar
- ✅ Não deve mais aparecer erro de FFmpeg
- ✅ Frontend deve funcionar

---

## ⚠️ Importante

**Root Directory: `frontend`** é ESSENCIAL!

Sem isso, o Vercel tenta buildar tudo (incluindo backend) e dá erro de FFmpeg.

---

## 🎯 Configuração Final

Depois de configurar o Root Directory, seu projeto deve ter:

```
✅ Root Directory: frontend
✅ Framework: Create React App
✅ Build Command: npm run build (automático)
✅ Output Directory: build (automático)
✅ Environment Variable: REACT_APP_API_URL=https://hot-8g7t.onrender.com
```

---

## 🐛 Se Ainda Der Erro

1. **Delete o projeto no Vercel**
2. **Crie novamente** com Root Directory: `frontend` desde o início
3. **Configure** `REACT_APP_API_URL`
4. **Deploy**

---

## ✅ Checklist

- [ ] Root Directory configurado como `frontend` no Vercel
- [ ] Environment Variable `REACT_APP_API_URL` configurada
- [ ] Novo deploy feito
- [ ] Build passou sem erro de FFmpeg
- [ ] Frontend funcionando

---

## 💡 Por que isso acontece?

- Vercel builda a raiz do projeto por padrão
- A raiz tem `package.json` com dependências do backend
- Backend tem `ffmpeg-static` que não funciona no Vercel
- Solução: Buildar apenas `frontend/` onde não tem FFmpeg

**Configure o Root Directory e faça novo deploy!** 🚀
