# Preview da Ferramenta Clone-K

## Como executar o preview em Node.js

### 1. Instalar dependências do preview

```bash
npm install express cheerio jszip node-fetch --save
```

Ou use o arquivo de preview:

```bash
npm install --package-lock-only --package=preview-package.json
npm install
```

### 2. Executar o servidor

```bash
node preview-server.js
```

### 3. Acessar no navegador

Abra: `http://localhost:3001`

## Funcionalidades do Preview

✅ **Clonagem de Páginas Web**
- Cole a URL da página
- Clique em "Clonar Página"
- O HTML clonado aparecerá na área de texto

✅ **Substituição de Links de Botões**
- Preencha o campo "Novo Link para Botões"
- Todos os botões terão seus links substituídos

✅ **Detecção e Gerenciamento de Pixels**
- A ferramenta detecta automaticamente pixels existentes
- Opção para remover pixel atual
- Campo para adicionar novo pixel

✅ **Download de Biblioteca**
- Cole a URL da biblioteca de anúncios
- Clique em "Baixar Todos os Arquivos (ZIP)"
- Todos os arquivos serão baixados em um ZIP

## Estrutura do Código

- `preview-server.js` - Servidor Express com todas as funcionalidades
- Interface HTML embutida no servidor
- APIs RESTful para processamento

## Diferenças da versão Next.js

- Versão standalone em Node.js puro
- Não requer build ou configuração complexa
- Ideal para testes rápidos e demonstração

