# 🚀 Como Fazer Deploy na Vercel

## 📋 Passo a Passo Completo

### 1️⃣ Preparar o Código

✅ O código já está pronto! Não precisa fazer nada.

### 2️⃣ Criar Repositório no GitHub

**Opção A: Via GitHub Web (Mais Fácil)**

1. Acesse [github.com](https://github.com)
2. Faça login
3. Clique no botão **"+"** no canto superior direito
4. Selecione **"New repository"**
5. Nome: `clone-k`
6. Marque como **Private** (se quiser)
7. Clique em **"Create repository"**

**Opção B: Via Git no Terminal**

```powershell
cd "C:\Users\Leonardo trentini\Desktop\clone-k"

# Inicializar Git (se ainda não fez)
git init

# Adicionar arquivos
git add .

# Fazer commit
git commit -m "Initial commit - Clone-K"

# Adicionar repositório remoto (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/clone-k.git

# Enviar para GitHub
git branch -M main
git push -u origin main
```

### 3️⃣ Fazer Deploy na Vercel

1. **Acesse [vercel.com](https://vercel.com)**
2. **Faça login** com sua conta GitHub
3. **Clique em "Add New..." → "Project"**
4. **Importe o repositório** `clone-k`
5. **Configure o projeto:**
   - Framework Preset: **Next.js** (já detectado automaticamente)
   - Root Directory: **./** (deixe como está)
   - Build Command: **npm run build** (já configurado)
   - Output Directory: **.next** (já configurado)
6. **Clique em "Deploy"**

### 4️⃣ Aguardar Deploy

- O deploy leva cerca de 1-2 minutos
- Você verá o progresso em tempo real
- Quando terminar, terá uma URL tipo: `clone-k.vercel.app`

### 5️⃣ Pronto! 🎉

Sua aplicação estará online e funcionando!

---

## 🔧 Configurações Importantes

### Timeout de API

O arquivo `vercel.json` já está configurado com timeout de 30 segundos para as APIs.

### Variáveis de Ambiente

Não são necessárias para esta aplicação.

### Domínio Personalizado (Opcional)

1. Vá em **Settings** → **Domains**
2. Adicione seu domínio
3. Siga as instruções de DNS

---

## 🐛 Troubleshooting

### Erro: "Build Failed"

- Verifique se todas as dependências estão no `package.json`
- Certifique-se de que o Node.js está na versão 18+

### Erro: "Function Timeout"

- Aumente o timeout no `vercel.json` (máximo 60s no plano gratuito)

### Erro: "Module not found"

- Execute `npm install` localmente primeiro
- Verifique se todas as dependências estão listadas

---

## 📱 Acessar Aplicação

Após o deploy, você terá:
- **URL de produção:** `https://clone-k.vercel.app`
- **URL de preview:** Para cada commit (automaticamente)

---

## 🔄 Atualizações

Para atualizar a aplicação:

1. Faça alterações no código
2. Commit e push para GitHub:
   ```bash
   git add .
   git commit -m "Atualização"
   git push
   ```
3. A Vercel **automaticamente** faz novo deploy!

---

## ✅ Checklist de Deploy

- [ ] Código commitado no GitHub
- [ ] Conta Vercel criada
- [ ] Repositório importado na Vercel
- [ ] Deploy concluído
- [ ] Testado a aplicação online

---

**Pronto! Sua aplicação estará no ar! 🚀**

