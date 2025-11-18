import { NextRequest, NextResponse } from 'next/server'
import cheerio from 'cheerio'
import JSZip from 'jszip'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url } = body

    if (!url) {
      return NextResponse.json(
        { error: 'URL é obrigatória' },
        { status: 400 }
      )
    }

    // Buscar a página da biblioteca
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
    const zip = new JSZip()

    const baseUrl = new URL(url)
    const links: string[] = []

    // Coletar todos os links de arquivos
    $('a[href]').each((_, element) => {
      const href = $(element).attr('href')
      if (href) {
        try {
          const absoluteUrl = new URL(href, baseUrl.origin).href
          // Filtrar apenas links que parecem ser arquivos
          if (
            absoluteUrl.match(/\.(js|css|json|xml|txt|html|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|pdf|zip)$/i) ||
            href.includes('/files/') ||
            href.includes('/assets/') ||
            href.includes('/download/')
          ) {
            links.push(absoluteUrl)
          }
        } catch (e) {
          // Ignorar URLs inválidas
        }
      }
    })

    // Coletar links de scripts e stylesheets
    $('script[src]').each((_, element) => {
      const src = $(element).attr('src')
      if (src) {
        try {
          const absoluteUrl = new URL(src, baseUrl.origin).href
          links.push(absoluteUrl)
        } catch (e) {
          // Ignorar URLs inválidas
        }
      }
    })

    $('link[href]').each((_, element) => {
      const href = $(element).attr('href')
      if (href) {
        try {
          const absoluteUrl = new URL(href, baseUrl.origin).href
          links.push(absoluteUrl)
        } catch (e) {
          // Ignorar URLs inválidas
        }
      }
    })

    // Remover duplicatas
    const uniqueLinks = [...new Set(links)]

    // Baixar cada arquivo
    const downloadPromises = uniqueLinks.map(async (link, index) => {
      try {
        const fileResponse = await fetch(link, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        })

        if (fileResponse.ok) {
          const buffer = await fileResponse.arrayBuffer()
          const urlPath = new URL(link).pathname
          const fileName = urlPath.split('/').pop() || `file-${index}`
          
          // Determinar extensão se não tiver
          const contentType = fileResponse.headers.get('content-type') || ''
          let extension = ''
          if (contentType.includes('javascript')) extension = '.js'
          else if (contentType.includes('css')) extension = '.css'
          else if (contentType.includes('json')) extension = '.json'
          else if (contentType.includes('image/png')) extension = '.png'
          else if (contentType.includes('image/jpeg')) extension = '.jpg'
          else if (contentType.includes('image/svg')) extension = '.svg'

          const finalFileName = fileName.includes('.') ? fileName : `${fileName}${extension}`
          
          zip.file(finalFileName, buffer)
          return { success: true, fileName: finalFileName }
        }
        return { success: false, fileName: link }
      } catch (error) {
        console.error(`Erro ao baixar ${link}:`, error)
        return { success: false, fileName: link }
      }
    })

    await Promise.all(downloadPromises)

    // Gerar o ZIP
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' })

    // Retornar o arquivo ZIP
    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="library-files.zip"',
      },
    })
  } catch (error: any) {
    console.error('Erro ao baixar biblioteca:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao processar a biblioteca' },
      { status: 500 }
    )
  }
}

