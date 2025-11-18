const express = require('express');
const cheerio = require('cheerio');
const JSZip = require('jszip');
const axios = require('axios');
const puppeteer = require('puppeteer');
const path = require('path');
const { URL } = require('url');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Servir interface HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API para clonar página - VERSÃO ROBUSTA
app.post('/api/clone', async (req, res) => {
  let browser = null;
  try {
    const { url, buttonLink, newPixel, removeCurrentPixel } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL é obrigatória' });
    }

    console.log(`🔄 Iniciando clonagem de: ${url}`);

    // Validar URL
    let targetUrl;
    try {
      targetUrl = new URL(url);
    } catch (e) {
      return res.status(400).json({ error: 'URL inválida' });
    }

    // Usar Puppeteer para renderizar JavaScript
    console.log('🌐 Iniciando navegador...');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Configurar User-Agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Navegar e aguardar carregamento completo
    console.log('📥 Carregando página...');
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Aguardar um pouco mais para JavaScript executar
    await page.waitForTimeout(2000);

    // Obter HTML renderizado
    const html = await page.content();
    console.log(`✅ HTML obtido (${html.length} caracteres)`);

    // Fechar navegador
    await browser.close();
    browser = null;

    // Processar HTML com Cheerio
    const $ = cheerio.load(html);
    const baseUrl = new URL(url);

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
      /_fbp/i,
      /_fbc/i,
    ];

    // Verificar e remover pixels
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

    $('noscript').each((_, element) => {
      const content = $(element).html() || '';
      if (pixelPatterns.some(pattern => pattern.test(content))) {
        pixelDetected = true;
        if (removeCurrentPixel) {
          $(element).remove();
        }
      }
    });

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
      console.log(`🔗 Substituindo links de botões para: ${buttonLink}`);
      
      // Substituir em <a> com classes de botão
      $('a[class*="button"], a[class*="btn"], a[class*="cta"], a[class*="link"]').each((_, element) => {
        $(element).attr('href', buttonLink);
      });

      // Substituir em <button> com onclick
      $('button').each((_, element) => {
        const onclick = $(element).attr('onclick') || '';
        if (onclick.includes('window.location') || onclick.includes('href') || onclick.includes('location.href')) {
          $(element).attr('onclick', `window.location.href='${buttonLink}'; return false;`);
        } else {
          $(element).attr('onclick', `window.location.href='${buttonLink}'; return false;`);
        }
      });

      // Substituir data attributes
      $('[data-href], [data-link], [data-url]').each((_, element) => {
        $(element).attr('data-href', buttonLink);
        $(element).attr('data-link', buttonLink);
        $(element).attr('data-url', buttonLink);
      });
    }

    // Adicionar novo pixel
    if (newPixel && (removeCurrentPixel || !pixelDetected)) {
      console.log('📊 Adicionando novo pixel...');
      if (newPixel.trim().startsWith('<script')) {
        $('head').append(newPixel);
      } else {
        $('head').append(`<script>${newPixel}</script>`);
      }
    }

    // Converter recursos relativos para absolutos
    console.log('🔧 Convertendo recursos relativos para absolutos...');
    
    $('img[src]').each((_, element) => {
      const src = $(element).attr('src');
      if (src && !src.startsWith('http') && !src.startsWith('//') && !src.startsWith('data:')) {
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

    $('source[src]').each((_, element) => {
      const src = $(element).attr('src');
      if (src && !src.startsWith('http') && !src.startsWith('//')) {
        try {
          $(element).attr('src', new URL(src, baseUrl.origin).href);
        } catch (e) {}
      }
    });

    const modifiedHtml = $.html();
    console.log('✅ Clonagem concluída com sucesso!');

    res.json({
      html: modifiedHtml,
      pixelDetected,
      success: true
    });

  } catch (error) {
    console.error('❌ Erro ao clonar página:', error);
    
    if (browser) {
      await browser.close();
    }

    res.status(500).json({
      error: error.message || 'Erro ao processar a página',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
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

    console.log(`📦 Baixando biblioteca de: ${url}`);

    // Buscar página
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 30000
    });

    const html = response.data;
    const $ = cheerio.load(html);
    const zip = new JSZip();

    const baseUrl = new URL(url);
    const links = new Set();

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
            links.add(absoluteUrl);
          }
        } catch (e) {}
      }
    });

    $('script[src], link[href]').each((_, element) => {
      const src = $(element).attr('src') || $(element).attr('href');
      if (src) {
        try {
          const absoluteUrl = new URL(src, baseUrl.origin).href;
          links.add(absoluteUrl);
        } catch (e) {}
      }
    });

    console.log(`📥 Encontrados ${links.size} arquivos para download`);

    // Baixar arquivos
    let downloaded = 0;
    for (const link of links) {
      try {
        const fileResponse = await axios.get(link, {
          responseType: 'arraybuffer',
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });

        const urlPath = new URL(link).pathname;
        const fileName = urlPath.split('/').pop() || `file-${downloaded}`;
        
        zip.file(fileName, fileResponse.data);
        downloaded++;
      } catch (error) {
        console.error(`⚠️ Erro ao baixar ${link}:`, error.message);
      }
    }

    console.log(`✅ ${downloaded} arquivos baixados`);

    // Gerar ZIP
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="library-files.zip"');
    res.send(zipBuffer);

  } catch (error) {
    console.error('❌ Erro ao baixar biblioteca:', error);
    res.status(500).json({
      error: error.message || 'Erro ao processar a biblioteca'
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor robusto rodando em http://localhost:${PORT}`);
  console.log(`📋 Interface disponível em http://localhost:${PORT}`);
});

