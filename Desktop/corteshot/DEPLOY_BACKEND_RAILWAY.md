# 🚂 Deploy do Backend no Railway

## Por que Railway?

- ✅ Suporta FFmpeg
- ✅ Fácil de configurar
- ✅ Plano gratuito disponível
- ✅ Deploy automático do GitHub

## 📋 Passo a Passo

### 1. Instalar Railway CLI

```bash
npm i -g @railway/cli
```

### 2. Login

```bash
railway login
```

### 3. Criar Projeto

```bash
cd backend
railway init
```

### 4. Deploy

```bash
railway up
```

### 5. Configurar Variáveis (se necessário)

No painel do Railway:
- `PORT` - Railway define automaticamente
- Outras variáveis que você precisar

### 6. Obter URL do Backend

Após o deploy, Railway fornece uma URL como:
- `https://corteshot-backend-production.up.railway.app`

### 7. Configurar Frontend no Vercel

No painel do Vercel:
1. Vá em **Settings** → **Environment Variables**
2. Adicione:
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://corteshot-backend-production.up.railway.app`

## 🔧 Alternativa: Render

Se preferir Render:

1. Acesse: https://render.com
2. **New** → **Web Service**
3. Conecte seu repositório GitHub
4. Configure:
   - **Name:** `corteshot-backend`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Environment:** `Node`

5. Deploy!

## ✅ Verificar se Funcionou

Após o deploy, teste:

```bash
curl https://seu-backend.railway.app/api/test-ffmpeg
```

Deve retornar: `{ "ffmpeg": "installed" }`

## 🎯 Próximo Passo

Depois que o backend estiver no ar:
1. Configure `REACT_APP_API_URL` no Vercel
2. Faça deploy do frontend
3. Teste o corte de vídeos!
