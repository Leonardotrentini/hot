const express = require('express');
const cheerio = require('cheerio');
const JSZip = require('jszip');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static('public'));

// Servir HTML estático
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clone-K - Preview</title>
    <style>
        * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            padding: 40px;
        }
        h1 {
            color: #333;
            margin-bottom: 30px;
            font-size: 2rem;
        }
        .form-group {
            margin-bottom: 25px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            color: #555;
            font-weight: 600;
            font-size: 0.95rem;
        }
        input[type="text"],
        input[type="url"],
        textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s;
        }
        input:focus, textarea:focus {
            outline: none;
            border-color: #667eea;
        }
        textarea {
            min-height: 120px;
            resize: vertical;
            font-family: 'Courier New', monospace;
        }
        button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 10px;
        }
        input[type="checkbox"] {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
        .status-message {
            margin-top: 15px;
            padding: 12px;
            border-radius: 8px;
            font-size: 0.95rem;
        }
        .status-success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .status-error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .pixel-info {
            background: #fff3cd;
            color: #856404;
            border: 1px solid #ffeaa7;
            padding: 15px;
            border-radius: 8px;
            margin-top: 10px;
        }
        .download-section {
            margin-top: 30px;
            padding-top: 30px;
            border-top: 2px solid #e0e0e0;
        }
        .section-title {
            font-size: 1.5rem;
            color: #333;
            margin-bottom: 20px;
        }
        #htmlOutput {
            min-height: 300px;
            font-family: monospace;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Clone-K - Clonador de Páginas Web</h1>

        <div class="form-group">
            <label for="pageUrl">URL da Página para Clonar:</label>
            <input type="url" id="pageUrl" placeholder="https://exemplo.com/pagina" />
        </div>

        <div class="form-group">
            <label for="buttonLink">Novo Link para Botões (opcional):</label>
            <input type="url" id="buttonLink" placeholder="https://novo-link.com" />
        </div>

        <div class="form-group">
            <label for="newPixel">Código do Novo Pixel (opcional):</label>
            <textarea id="newPixel" placeholder="Cole aqui o código do pixel (script tag ou código JavaScript)"></textarea>
        </div>

        <div class="form-group">
            <div class="checkbox-group">
                <input type="checkbox" id="removeCurrentPixel" />
                <label for="removeCurrentPixel">Remover pixel atual e implementar novo pixel</label>
            </div>
            <div id="pixelInfo" class="pixel-info" style="display: none;">
                ⚠️ Pixel detectado na página! Marque a opção acima para substituí-lo.
            </div>
        </div>

        <button id="cloneBtn" onclick="handleClonePage()">Clonar Página</button>

        <div id="statusMessage"></div>

        <div id="htmlSection" style="display: none; margin-top: 30px;">
            <div class="form-group">
                <label>HTML Clonado:</label>
                <textarea id="htmlOutput" readonly></textarea>
                <button onclick="downloadHtml()" style="margin-top: 10px;">Baixar HTML</button>
            </div>
        </div>

        <div class="download-section">
            <h2 class="section-title">Download de Biblioteca de Anúncios</h2>
            <div class="form-group">
                <label for="libraryUrl">URL da Biblioteca de Anúncios:</label>
                <input type="url" id="libraryUrl" placeholder="https://exemplo.com/biblioteca" />
            </div>
            <button id="downloadBtn" onclick="handleDownloadLibrary()">Baixar Todos os Arquivos (ZIP)</button>
        </div>
    </div>

    <script>
        let clonedHtml = '';
        let pixelDetected = false;

        async function handleClonePage() {
            const pageUrl = document.getElementById('pageUrl').value;
            const buttonLink = document.getElementById('buttonLink').value;
            const newPixel = document.getElementById('newPixel').value;
            const removeCurrentPixel = document.getElementById('removeCurrentPixel').checked;

            if (!pageUrl) {
                showStatus('error', 'Por favor, insira a URL da página');
                return;
            }

            const btn = document.getElementById('cloneBtn');
            btn.disabled = true;
            btn.textContent = 'Processando...';
            clearStatus();

            try {
                const response = await fetch('/api/clone', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: pageUrl, buttonLink, newPixel, removeCurrentPixel })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Erro ao clonar página');
                }

                clonedHtml = data.html;
                pixelDetected = data.pixelDetected || false;

                document.getElementById('htmlOutput').value = clonedHtml;
                document.getElementById('htmlSection').style.display = 'block';
                document.getElementById('pixelInfo').style.display = pixelDetected ? 'block' : 'none';

                showStatus('success', 'Página clonada com sucesso! O HTML está disponível abaixo.');
            } catch (error) {
                showStatus('error', error.message || 'Erro ao processar a página');
            } finally {
                btn.disabled = false;
                btn.textContent = 'Clonar Página';
            }
        }

        async function handleDownloadLibrary() {
            const libraryUrl = document.getElementById('libraryUrl').value;

            if (!libraryUrl) {
                showStatus('error', 'Por favor, insira a URL da biblioteca');
                return;
            }

            const btn = document.getElementById('downloadBtn');
            btn.disabled = true;
            btn.textContent = 'Baixando...';
            clearStatus();

            try {
                const response = await fetch('/api/download-library', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: libraryUrl })
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Erro ao baixar biblioteca');
                }

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'library-files.zip';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);

                showStatus('success', 'Biblioteca baixada com sucesso!');
            } catch (error) {
                showStatus('error', error.message || 'Erro ao baixar biblioteca');
            } finally {
                btn.disabled = false;
                btn.textContent = 'Baixar Todos os Arquivos (ZIP)';
            }
        }

        function downloadHtml() {
            if (!clonedHtml) {
                showStatus('error', 'Nenhum HTML clonado disponível');
                return;
            }

            const blob = new Blob([clonedHtml], { type: 'text/html' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'cloned-page.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            showStatus('success', 'HTML baixado com sucesso!');
        }

        function showStatus(type, message) {
            const statusDiv = document.getElementById('statusMessage');
            statusDiv.className = \`status-message status-\${type}\`;
            statusDiv.textContent = message;
            statusDiv.style.display = 'block';
        }

        function clearStatus() {
            document.getElementById('statusMessage').style.display = 'none';
        }
    </script>
</body>
</html>
  `);
});

// API para clonar página
app.post('/api/clone', async (req, res) => {
  try {
    const { url, buttonLink, newPixel, removeCurrentPixel } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL é obrigatória' });
    }

    // Buscar a página usando axios (mais confiável)
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      timeout: 30000
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Detectar pixels existentes
    let pixelDetected = false;
    const pixelPatterns = [
      /fbq\s*\(/i,
      /facebook\.com\/tr/i,
      /connect\.facebook\.net/i,
      /pixel/i,
      /gtag\s*\(/i,
      /googletagmanager\.com/i,
      /analytics\.js/i,
      /ga\s*\(/i,
    ];

    // Verificar scripts
    $('script').each((_, element) => {
      const scriptContent = $(element).html() || '';
      const src = $(element).attr('src') || '';
      
      if (pixelPatterns.some(pattern => pattern.test(scriptContent) || pattern.test(src))) {
        pixelDetected = true;
        if (removeCurrentPixel) {
          $(element).remove();
        }
      }
    });

    // Verificar noscript tags
    $('noscript').each((_, element) => {
      const content = $(element).html() || '';
      if (pixelPatterns.some(pattern => pattern.test(content))) {
        pixelDetected = true;
        if (removeCurrentPixel) {
          $(element).remove();
        }
      }
    });

    // Verificar iframes
    $('iframe').each((_, element) => {
      const src = $(element).attr('src') || '';
      if (pixelPatterns.some(pattern => pattern.test(src))) {
        pixelDetected = true;
        if (removeCurrentPixel) {
          $(element).remove();
        }
      }
    });

    // Substituir links de botões
    if (buttonLink) {
      $('a[class*="button"], a[class*="btn"], a[class*="cta"]').attr('href', buttonLink);
      
      $('button').each((_, element) => {
        const onclick = $(element).attr('onclick') || '';
        if (onclick.includes('window.location') || onclick.includes('href')) {
          $(element).attr('onclick', `window.location.href='${buttonLink}'`);
        }
      });

      $(`[data-href], [data-link]`).attr('data-href', buttonLink).attr('data-link', buttonLink);
    }

    // Adicionar novo pixel se fornecido
    if (newPixel && (removeCurrentPixel || !pixelDetected)) {
      if (newPixel.trim().startsWith('<script')) {
        $('head').append(newPixel);
      } else {
        $('head').append(`<script>${newPixel}</script>`);
      }
    }

    // Converter recursos relativos para absolutos
    const baseUrl = new URL(url);
    
    $('img[src]').each((_, element) => {
      const src = $(element).attr('src');
      if (src && !src.startsWith('http') && !src.startsWith('//')) {
        try {
          $(element).attr('src', new URL(src, baseUrl.origin).href);
        } catch (e) {}
      }
    });

    $('link[href]').each((_, element) => {
      const href = $(element).attr('href');
      if (href && !href.startsWith('http') && !href.startsWith('//')) {
        try {
          $(element).attr('href', new URL(href, baseUrl.origin).href);
        } catch (e) {}
      }
    });

    $('script[src]').each((_, element) => {
      const src = $(element).attr('src');
      if (src && !src.startsWith('http') && !src.startsWith('//')) {
        try {
          $(element).attr('src', new URL(src, baseUrl.origin).href);
        } catch (e) {}
      }
    });

    const modifiedHtml = $.html();

    res.json({
      html: modifiedHtml,
      pixelDetected,
    });
  } catch (error) {
    console.error('Erro ao clonar página:', error);
    res.status(500).json({
      error: error.message || 'Erro ao processar a página',
    });
  }
});

// API para baixar biblioteca
app.post('/api/download-library', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL é obrigatória' });
    }

    // Buscar a página da biblioteca usando axios
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      timeout: 30000
    });

    const html = response.data;
    const $ = cheerio.load(html);
    const zip = new JSZip();

    const baseUrl = new URL(url);
    const links = [];

    // Coletar todos os links de arquivos
    $('a[href]').each((_, element) => {
      const href = $(element).attr('href');
      if (href) {
        try {
          const absoluteUrl = new URL(href, baseUrl.origin).href;
          if (
            absoluteUrl.match(/\.(js|css|json|xml|txt|html|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|pdf|zip)$/i) ||
            href.includes('/files/') ||
            href.includes('/assets/') ||
            href.includes('/download/')
          ) {
            links.push(absoluteUrl);
          }
        } catch (e) {}
      }
    });

    // Coletar links de scripts e stylesheets
    $('script[src]').each((_, element) => {
      const src = $(element).attr('src');
      if (src) {
        try {
          const absoluteUrl = new URL(src, baseUrl.origin).href;
          links.push(absoluteUrl);
        } catch (e) {}
      }
    });

    $('link[href]').each((_, element) => {
      const href = $(element).attr('href');
      if (href) {
        try {
          const absoluteUrl = new URL(href, baseUrl.origin).href;
          links.push(absoluteUrl);
        } catch (e) {}
      }
    });

    // Remover duplicatas
    const uniqueLinks = [...new Set(links)];

    // Baixar cada arquivo
    const downloadPromises = uniqueLinks.map(async (link, index) => {
      try {
        const fileResponse = await axios.get(link, {
          responseType: 'arraybuffer',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
          timeout: 10000
        });

        if (fileResponse.status === 200) {
          const buffer = Buffer.from(fileResponse.data);
          
          const urlPath = new URL(link).pathname;
          const fileName = urlPath.split('/').pop() || `file-${index}`;
          
          const contentType = fileResponse.headers['content-type'] || '';
          let extension = '';
          if (contentType.includes('javascript')) extension = '.js';
          else if (contentType.includes('css')) extension = '.css';
          else if (contentType.includes('json')) extension = '.json';
          else if (contentType.includes('image/png')) extension = '.png';
          else if (contentType.includes('image/jpeg')) extension = '.jpg';
          else if (contentType.includes('image/svg')) extension = '.svg';

          const finalFileName = fileName.includes('.') ? fileName : `${fileName}${extension}`;
          
          zip.file(finalFileName, buffer);
          return { success: true, fileName: finalFileName };
        }
        return { success: false, fileName: link };
      } catch (error) {
        console.error(`Erro ao baixar ${link}:`, error);
        return { success: false, fileName: link };
      }
    });

    await Promise.all(downloadPromises);

    // Gerar o ZIP
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    // Retornar o arquivo ZIP
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="library-files.zip"');
    res.send(zipBuffer);
  } catch (error) {
    console.error('Erro ao baixar biblioteca:', error);
    res.status(500).json({
      error: error.message || 'Erro ao processar a biblioteca',
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📋 Preview da ferramenta disponível!`);
});

