# 🎬 CortesHot

Plataforma profissional de corte de vídeos para operação hot, com automações Telegram e integração SyncPayments.

## 🚀 Funcionalidades

### ✂️ Corte de Vídeos
- Upload de vídeos
- Corte automático em múltiplas durações (15s, 30s, 1min, 2min, 3min, 5min, 8min, 10min, 13min, 15min)
- Validação de cortes gerados
- Sistema de leadscore com estrelas
- Download dos cortes em ZIP

### 🤖 Automações Telegram
- Conexão com bot do Telegram
- Gerenciamento de canais
- Automações agendadas (dias e horários específicos)
- Envio de mídias (imagens, vídeos, áudios, documentos)
- Mensagens personalizadas

### 💳 Pagamentos SyncPayments
- Integração com API SyncPayments
- Criação de pagamentos (PIX, Cartão de Crédito, Boleto)
- Webhooks para notificações
- Configuração de chaves de API

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- FFmpeg instalado no sistema
- Conta no Telegram (para criar bot)
- Conta no SyncPayments (para pagamentos)

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Leonardotrentini/hot.git
cd hot
```

2. Instale as dependências:
```bash
npm run install-all
```

3. Configure as variáveis de ambiente (se necessário):
- Crie um arquivo `.env` na raiz do projeto

4. Inicie o servidor:
```bash
# Windows
INICIAR_TUDO.bat

# Ou manualmente:
npm run dev
```

## 📖 Uso

### Corte de Vídeos
1. Acesse a aba "Cortes de Vídeo"
2. Faça upload do vídeo
3. Selecione as durações desejadas
4. Aguarde o processamento
5. Baixe os cortes gerados

### Automações Telegram
1. Acesse a aba "Automações Telegram"
2. Conecte seu bot (veja `GUIA_TELEGRAM.md`)
3. Adicione canais
4. Configure automações

### Pagamentos
1. Acesse a aba "Pagamentos Sync"
2. Configure suas chaves de API
3. Crie pagamentos

## 📚 Documentação

- `GUIA_TELEGRAM.md` - Como criar e configurar bot do Telegram
- `GUIA_SYNC_PAYMENTS.md` - Como configurar SyncPayments
- `COMO_AUTORIZAR_IP.md` - Como autorizar IP no SyncPayments
- `ENDPOINTS_SYNC_PAYMENTS.md` - Endpoints da API SyncPayments

## 🏗️ Estrutura do Projeto

```
corteshot/
├── backend/
│   ├── server.js           # Servidor Express
│   ├── services/
│   │   ├── videoProcessor.js    # Processamento de vídeos
│   │   ├── telegramBot.js       # Integração Telegram
│   │   ├── scheduler.js         # Agendamento de tarefas
│   │   └── syncPayments.js      # Integração SyncPayments
│   ├── data/               # Dados persistentes
│   ├── uploads/           # Vídeos enviados
│   ├── outputs/           # Cortes gerados
│   └── media/             # Mídias para automações
├── frontend/
│   ├── src/
│   │   ├── App.js         # Componente principal
│   │   └── components/    # Componentes React
│   └── build/             # Build de produção
└── README.md
```

## 🔧 Tecnologias

- **Backend:** Node.js, Express, FFmpeg
- **Frontend:** React
- **Telegram:** node-telegram-bot-api
- **Agendamento:** node-cron
- **Pagamentos:** SyncPayments API

## 📝 Licença

ISC

## 👤 Autor

Leonardo Trentini

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.
