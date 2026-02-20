# 🚀 Deploy Completo - CortesHot

Guia passo a passo para fazer deploy completo da plataforma.

## 📋 Pré-requisitos

- Conta no GitHub (já tem ✅)
- Conta no Vercel (grátis)
- Conta no Railway ou Render (grátis)

## 🎯 Arquitetura

```
Frontend (Vercel) ──→ Backend (Railway/Render)
     │                      │
  React App            Node.js + FFmpeg
  Interface            Processamento
```

---

## 📦 PARTE 1: Deploy do Backend

### Opção A: Railway (Recomendado) ⭐

#### 1. Criar Conta
- Acesse: https://railway.app
- Faça login com GitHub

#### 2. Criar Novo Projeto
1. Clique em **"New Project"**
2. Selecione **"Deploy from GitHub repo"**
3. Escolha o repositório: `Leonardotrentini/hot`
4. Selecione **"backend"** como root directory

#### 3. Configurar Build
Railway detecta automaticamente, mas verifique:
- **Root Directory:** `backend`
- **Build Command:** `npm install`
- **Start Command:** `node server.js`

#### 4. Obter URL
Após o deploy, Railway fornece uma URL como:
```
https://corteshot-backend-production.up.railway.app
```
**Copie esta URL!** Você vai precisar dela.

#### 5. Verificar FFmpeg
Railway geralmente tem FFmpeg disponível. Se não funcionar, adicione no `package.json`:
```json
"scripts": {
  "postinstall": "apt-get update && apt-get install -y ffmpeg || true"
}
```

---

### Opção B: Render

#### 1. Criar Conta
- Acesse: https://render.com
- Faça login com GitHub

#### 2. Criar Web Service
1. Clique em **"New +"** → **"Web Service"**
2. Conecte o repositório: `Leonardotrentini/hot`
3. Configure:
   - **Name:** `corteshot-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free (ou Starter)

#### 3. Deploy
- Clique em **"Create Web Service"**
- Aguarde o deploy (pode levar alguns minutos)

#### 4. Obter URL
Render fornece uma URL como:
```
https://corteshot-backend.onrender.com
```
**Copie esta URL!**

---

## 🌐 PARTE 2: Deploy do Frontend (Vercel)

### 1. Conectar Repositório
1. Acesse: https://vercel.com
2. Faça login com GitHub
3. Clique em **"Add New..."** → **"Project"**
4. Importe o repositório: `Leonardotrentini/hot`

### 2. Configurar Projeto
- **Framework Preset:** Create React App
- **Root Directory:** `frontend`
- **Build Command:** `npm run build` (ou deixe padrão)
- **Output Directory:** `build`

### 3. Configurar Variáveis de Ambiente
**IMPORTANTE:** Adicione esta variável:

- **Key:** `REACT_APP_API_URL`
- **Value:** URL do seu backend (Railway ou Render)
  - Exemplo: `https://corteshot-backend-production.up.railway.app`
  - **OU:** `https://corteshot-backend.onrender.com`

### 4. Deploy
- Clique em **"Deploy"**
- Aguarde o build (2-3 minutos)

### 5. Testar
Após o deploy, acesse a URL do Vercel e teste:
1. Faça upload de um vídeo
2. Selecione uma duração
3. Verifique se processa corretamente

---

## ✅ Verificação Final

### Backend Funcionando?
Teste no navegador ou terminal:
```bash
curl https://seu-backend.railway.app/
```
Deve retornar: `{ "message": "CortesHot API", "status": "running" }`

### Frontend Conectado?
1. Abra a URL do Vercel
2. Abra o Console do navegador (F12)
3. Verifique se não há erros de conexão
4. Tente fazer upload de um vídeo

### FFmpeg Funcionando?
Teste:
```bash
curl https://seu-backend.railway.app/api/test-ffmpeg
```
Deve retornar: `{ "ffmpeg": "installed" }`

---

## 🔧 Troubleshooting

### Erro: "Cannot connect to backend"
- Verifique se `REACT_APP_API_URL` está configurada no Vercel
- Verifique se o backend está rodando
- Verifique CORS no backend (já configurado ✅)

### Erro: "FFmpeg not found"
- Railway: FFmpeg geralmente está disponível
- Render: Pode precisar instalar via buildpack
- Adicione no `package.json`:
```json
"scripts": {
  "postinstall": "apt-get update && apt-get install -y ffmpeg"
}
```

### Erro: "Timeout"
- Aumente o timeout no Railway/Render
- Vídeos muito grandes podem demorar

---

## 📝 Checklist de Deploy

- [ ] Backend deployado no Railway/Render
- [ ] URL do backend copiada
- [ ] Frontend deployado no Vercel
- [ ] Variável `REACT_APP_API_URL` configurada
- [ ] Teste de upload funcionando
- [ ] Teste de processamento funcionando
- [ ] Download dos cortes funcionando

---

## 🎉 Pronto!

Sua plataforma está no ar! 🚀

- **Frontend:** https://seu-projeto.vercel.app
- **Backend:** https://seu-backend.railway.app

---

## 💡 Dicas

1. **Domínio Customizado:** Configure no Vercel e Railway
2. **Monitoramento:** Use os logs do Railway/Render para debug
3. **Backup:** Configure backup automático dos dados
4. **Escalabilidade:** Upgrade o plano quando necessário

---

## 🆘 Precisa de Ajuda?

- Verifique os logs no Railway/Render
- Verifique o console do navegador (F12)
- Teste o backend diretamente via curl/Postman
