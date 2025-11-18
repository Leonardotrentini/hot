import { NextRequest, NextResponse } from 'next/server'
import cheerio from 'cheerio'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url, buttonLink, newPixel, removeCurrentPixel } = body

    if (!url) {
      return NextResponse.json(
        { error: 'URL é obrigatória' },
        { status: 400 }
      )
    }

    // Buscar a página
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    })

    if (!response.ok) {
      throw new Error(`Erro ao buscar página: ${response.statusText}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Detectar pixels existentes
    let pixelDetected = false
    const pixelPatterns = [
      /fbq\s*\(/i,
      /facebook\.com\/tr/i,
      /connect\.facebook\.net/i,
      /pixel/i,
      /gtag\s*\(/i,
      /googletagmanager\.com/i,
      /analytics\.js/i,
      /ga\s*\(/i,
    ]

    // Verificar scripts
    $('script').each((_, element) => {
      const scriptContent = $(element).html() || ''
      const src = $(element).attr('src') || ''
      
      if (pixelPatterns.some(pattern => pattern.test(scriptContent) || pattern.test(src))) {
        pixelDetected = true
        if (removeCurrentPixel) {
          $(element).remove()
        }
      }
    })

    // Verificar nososcript tags
    $('noscript').each((_, element) => {
      const content = $(element).html() || ''
      if (pixelPatterns.some(pattern => pattern.test(content))) {
        pixelDetected = true
        if (removeCurrentPixel) {
          $(element).remove()
        }
      }
    })

    // Verificar iframes
    $('iframe').each((_, element) => {
      const src = $(element).attr('src') || ''
      if (pixelPatterns.some(pattern => pattern.test(src))) {
        pixelDetected = true
        if (removeCurrentPixel) {
          $(element).remove()
        }
      }
    })

    // Substituir links de botões
    if (buttonLink) {
      // Substituir em elementos <a> com classes comuns de botão
      $('a[class*="button"], a[class*="btn"], a[class*="cta"]').attr('href', buttonLink)
      
      // Substituir em elementos <button> que contêm links
      $('button').each((_, element) => {
        const onclick = $(element).attr('onclick') || ''
        if (onclick.includes('window.location') || onclick.includes('href')) {
          $(element).attr('onclick', `window.location.href='${buttonLink}'`)
        }
      })

      // Substituir em elementos com data-href ou data-link
      $(`[data-href], [data-link]`).attr('data-href', buttonLink).attr('data-link', buttonLink)
    }

    // Adicionar novo pixel se fornecido
    if (newPixel && (removeCurrentPixel || !pixelDetected)) {
      // Se o novo pixel já é um script tag completo, adicionar diretamente
      if (newPixel.trim().startsWith('<script')) {
        $('head').append(newPixel)
      } else {
        // Caso contrário, envolver em script tag
        $('head').append(`<script>${newPixel}</script>`)
      }
    }

    // Converter recursos relativos para absolutos
    $('img[src]').each((_, element) => {
      const src = $(element).attr('src')
      if (src && !src.startsWith('http') && !src.startsWith('//')) {
        try {
          const baseUrl = new URL(url)
          $(element).attr('src', new URL(src, baseUrl.origin).href)
        } catch (e) {
          // Ignorar erros de URL
        }
      }
    })

    $('link[href]').each((_, element) => {
      const href = $(element).attr('href')
      if (href && !href.startsWith('http') && !href.startsWith('//')) {
        try {
          const baseUrl = new URL(url)
          $(element).attr('href', new URL(href, baseUrl.origin).href)
        } catch (e) {
          // Ignorar erros de URL
        }
      }
    })

    $('script[src]').each((_, element) => {
      const src = $(element).attr('src')
      if (src && !src.startsWith('http') && !src.startsWith('//')) {
        try {
          const baseUrl = new URL(url)
          $(element).attr('src', new URL(src, baseUrl.origin).href)
        } catch (e) {
          // Ignorar erros de URL
        }
      }
    })

    const modifiedHtml = $.html()

    return NextResponse.json({
      html: modifiedHtml,
      pixelDetected,
    })
  } catch (error: any) {
    console.error('Erro ao clonar página:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao processar a página' },
      { status: 500 }
    )
  }
}

