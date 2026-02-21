# 🆓 Deploy GRATUITO no Render.com

## ⚡ Passo a Passo Completo

### 1️⃣ BACKEND NO RENDER (GRATUITO)

1. **Acesse:** https://render.com
2. **Sign Up** → **Login with GitHub**
3. **New** → **Web Service**
4. **Connect GitHub:**
   - Selecione: `Leonardotrentini/hot`
   - Clique em **Connect**
5. **Configure o Serviço:**
   ```
   Name: corteshot-backend
   Region: Oregon (ou escolha mais próximo)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: node server.js
   Plan: Free ⭐
   ```
6. **Environment Variables** (opcional, mas recomendado):
   - Clique em **Advanced**
   - Adicione:
     - `NODE_ENV=production`
     - `PORT=10000` (Render define automaticamente, mas pode definir)
7. **Create Web Service**
8. **Aguarde o deploy** (3-5 minutos)
9. **Copie a URL** que aparece:
   - Exemplo: `https://corteshot-backend.onrender.com`
   - ⚠️ **GUARDE ESSA URL!**

✅ **Backend no ar!**

---

### 2️⃣ FRONTEND NO VERCEL (GRATUITO)

1. **Acesse:** https://vercel.com
2. **Login** com GitHub
3. **Add New Project**
4. **Import Git Repository:**
   - Selecione: `Leonardotrentini/hot`
   - Clique em **Import**
5. **Configure:**
   ```
   Project Name: corteshot (ou o que preferir)
   Framework Preset: Create React App
   Root Directory: frontend ⚠️ IMPORTANTE!
   Build Command: npm run build
   Output Directory: build
   ```
6. **Environment Variables:**
   - Clique em **Environment Variables**
   - Adicione:
     ```
     Key: REACT_APP_API_URL
     Value: https://corteshot-backend.onrender.com
     ```
     (Use a URL do Render do passo 1)
   - Clique em **Add**
7. **Deploy!**
8. **Aguarde** (2-3 minutos)
9. **Pronto!** Acesse a URL do Vercel

✅ **Frontend no ar!**

---

## ⚠️ IMPORTANTE: Render "Dorme"

### O que significa?
- Após **15 minutos** sem requisições, o serviço "dorme"
- A **primeira requisição** após dormir pode demorar **~30 segundos**
- Depois disso, funciona normal

### É um problema?
- **Não!** É normal em planos gratuitos
- Se você usar frequentemente, não dorme
- É grátis, então vale a pena! 😊

### Quer que nunca durma?
- Use **Railway** ($5 grátis/mês)
- Ou aceite o delay inicial no Render

---

## ✅ Testar

1. Acesse a URL do Vercel
2. Faça upload de um vídeo
3. Se a primeira requisição demorar ~30s, é normal (serviço acordando)
4. Depois funciona rápido!

---

## 🎉 Tudo GRATUITO!

- ✅ **Backend:** Render.com (Free)
- ✅ **Frontend:** Vercel (Free)
- ✅ **FFmpeg:** Funciona no Render
- ✅ **Total:** $0/mês

---

## 📋 Checklist

- [ ] Backend deployado no Render
- [ ] URL do Render copiada
- [ ] Frontend deployado no Vercel
- [ ] `REACT_APP_API_URL` configurada
- [ ] Teste de upload funcionando

---

## 🔧 Troubleshooting

### Erro: "Cannot connect to backend"
- ✅ Verifique se o backend está rodando no Render
- ✅ Teste a URL do Render diretamente no navegador
- ✅ Deve retornar: `{"message":"CortesHot API","status":"running"}`

### Erro: "Timeout" na primeira requisição
- ✅ Normal! O serviço estava "dormindo"
- ✅ Aguarde ~30s e tente novamente
- ✅ Depois funciona rápido

### Erro: "Build failed"
- ✅ Verifique os logs no Render
- ✅ Certifique-se que `Root Directory: backend`
- ✅ Verifique se `package.json` está no backend

---

## 💡 Dica Final

**Render é perfeito para começar!**
- Grátis
- Fácil
- Funciona
- Já está configurado (`backend/render.yaml`)

Se precisar de algo que nunca dorme depois, migre para Railway! 🚀
