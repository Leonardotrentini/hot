# 🚀 Deploy no Vercel - CortesHot

## ⚠️ IMPORTANTE: Limitações do Vercel para Processamento de Vídeo

O **Vercel é uma plataforma serverless** e **NÃO é ideal** para processamento de vídeo pesado porque:

1. **Timeout de 10 segundos** (funções serverless) ou **300 segundos** (com configuração)
2. **Sem FFmpeg pré-instalado** no ambiente
3. **Memória limitada** (512MB a 3GB)
4. **Sem armazenamento persistente** (arquivos temporários)

## 🔧 Soluções Recomendadas

### Opção 1: Arquitetura Híbrida (Recomendado)

**Frontend no Vercel + Backend em outro serviço:**

1. **Frontend (Vercel):**
   - Interface React
   - Estático e rápido
   - ✅ Funciona perfeitamente

2. **Backend (Outro serviço):**
   - **Railway** (recomendado) - https://railway.app
   - **Render** - https://render.com
   - **DigitalOcean App Platform** - https://www.digitalocean.com
   - **AWS EC2/Lambda** - https://aws.amazon.com
   - **Heroku** - https://www.heroku.com

### Opção 2: AWS Lambda com Layer FFmpeg

Se quiser usar serverless mesmo assim:

1. Crie uma Lambda Function
2. Adicione o layer: `arn:aws:lambda:us-east-1:753240598075:layer:LambdaFFmpegLayer:1`
3. Configure timeout para 15 minutos
4. Use S3 para armazenar vídeos

### Opção 3: Processamento Assíncrono

1. Frontend no Vercel
2. Backend em servidor dedicado (Railway/Render)
3. Fila de processamento (Bull/BullMQ)
4. Notificação via WebSocket ou polling

## 📋 Configuração para Vercel (Apenas Frontend)

Se você quiser fazer deploy **apenas do frontend** no Vercel:

### 1. Configurar `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "frontend/$1"
    }
  ]
}
```

### 2. Atualizar `frontend/package.json`:

```json
{
  "scripts": {
    "build": "react-scripts build",
    "vercel-build": "npm run build"
  }
}
```

### 3. Variáveis de Ambiente:

No painel do Vercel, configure:
- `REACT_APP_API_URL` = URL do seu backend (ex: `https://seu-backend.railway.app`)

## 🚂 Deploy no Railway (Backend Recomendado)

### 1. Instalar Railway CLI:

```bash
npm i -g @railway/cli
```

### 2. Login:

```bash
railway login
```

### 3. Inicializar projeto:

```bash
cd backend
railway init
```

### 4. Deploy:

```bash
railway up
```

### 5. Configurar variáveis:

No painel do Railway, adicione:
- `PORT` = 5000 (ou deixe Railway definir)
- Outras variáveis necessárias

## 🎯 Arquitetura Recomendada Final

```
┌─────────────────┐
│  Frontend       │
│  (Vercel)       │  ← Interface React
└────────┬────────┘
         │
         │ API Calls
         │
┌────────▼────────┐
│  Backend        │
│  (Railway)      │  ← Processamento de vídeo
│                 │     Automações Telegram
│                 │     SyncPayments
└─────────────────┘
```

## 📝 Passos para Deploy Completo

1. **Deploy do Frontend (Vercel):**
   ```bash
   cd frontend
   vercel
   ```

2. **Deploy do Backend (Railway):**
   ```bash
   cd backend
   railway up
   ```

3. **Atualizar URL da API no Frontend:**
   - Configure `REACT_APP_API_URL` no Vercel apontando para o Railway

4. **Testar:**
   - Acesse a URL do Vercel
   - Teste upload e processamento de vídeo

## ⚡ Alternativa Rápida: Render

Render também é uma boa opção para o backend:

1. Acesse: https://render.com
2. Conecte seu repositório GitHub
3. Selecione "Web Service"
4. Configure:
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && node server.js`
   - **Environment:** Node

## 🔗 Links Úteis

- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [AWS Lambda FFmpeg Layer](https://github.com/serverlesspub/ffmpeg-aws-lambda-layer)

## 💡 Dica Final

Para produção, considere usar **Cloudflare Workers** ou **AWS Lambda** com **S3** para processamento de vídeo, ou um **servidor dedicado** com FFmpeg instalado.
