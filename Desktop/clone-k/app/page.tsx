'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [pageUrl, setPageUrl] = useState('')
  const [buttonLink, setButtonLink] = useState('')
  const [newPixel, setNewPixel] = useState('')
  const [removeCurrentPixel, setRemoveCurrentPixel] = useState(false)
  const [libraryUrl, setLibraryUrl] = useState('')
  const [clonedHtml, setClonedHtml] = useState('')
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null)
  const [pixelDetected, setPixelDetected] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleClonePage = async () => {
    if (!pageUrl) {
      setStatus({ type: 'error', message: 'Por favor, insira a URL da página' })
      return
    }

    setIsProcessing(true)
    setStatus(null)
    setPixelDetected(false)

    try {
      const response = await fetch('/api/clone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: pageUrl,
          buttonLink: buttonLink || undefined,
          newPixel: newPixel || undefined,
          removeCurrentPixel,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao clonar página')
      }

      setClonedHtml(data.html)
      setPixelDetected(data.pixelDetected || false)
      setStatus({
        type: 'success',
        message: 'Página clonada com sucesso! O HTML está disponível abaixo.',
      })
    } catch (error: any) {
      setStatus({
        type: 'error',
        message: error.message || 'Erro ao processar a página',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownloadHtml = () => {
    if (!clonedHtml) {
      setStatus({ type: 'error', message: 'Nenhum HTML clonado disponível' })
      return
    }

    const blob = new Blob([clonedHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cloned-page.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setStatus({ type: 'success', message: 'HTML baixado com sucesso!' })
  }

  const handleDownloadLibrary = async () => {
    if (!libraryUrl) {
      setStatus({ type: 'error', message: 'Por favor, insira a URL da biblioteca' })
      return
    }

    setIsProcessing(true)
    setStatus(null)

    try {
      const response = await fetch('/api/download-library', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: libraryUrl }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erro ao baixar biblioteca')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'library-files.zip'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setStatus({ type: 'success', message: 'Biblioteca baixada com sucesso!' })
    } catch (error: any) {
      setStatus({
        type: 'error',
        message: error.message || 'Erro ao baixar biblioteca',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Clone-K - Clonador de Páginas Web</h1>

      <div className={styles.formGroup}>
        <label htmlFor="pageUrl">URL da Página para Clonar:</label>
        <input
          type="url"
          id="pageUrl"
          value={pageUrl}
          onChange={(e) => setPageUrl(e.target.value)}
          placeholder="https://exemplo.com/pagina"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="buttonLink">Novo Link para Botões (opcional):</label>
        <input
          type="url"
          id="buttonLink"
          value={buttonLink}
          onChange={(e) => setButtonLink(e.target.value)}
          placeholder="https://novo-link.com"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="newPixel">Código do Novo Pixel (opcional):</label>
        <textarea
          id="newPixel"
          value={newPixel}
          onChange={(e) => setNewPixel(e.target.value)}
          placeholder="Cole aqui o código do pixel (script tag ou código JavaScript)"
        />
      </div>

      <div className={styles.formGroup}>
        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="removeCurrentPixel"
            checked={removeCurrentPixel}
            onChange={(e) => setRemoveCurrentPixel(e.target.checked)}
          />
          <label htmlFor="removeCurrentPixel">
            Remover pixel atual e implementar novo pixel
          </label>
        </div>
        {pixelDetected && (
          <div className={styles.pixelInfo}>
            ⚠️ Pixel detectado na página! Marque a opção acima para substituí-lo.
          </div>
        )}
      </div>

      <button
        onClick={handleClonePage}
        disabled={isProcessing}
      >
        {isProcessing ? 'Processando...' : 'Clonar Página'}
      </button>

      {status && (
        <div className={`${styles.statusMessage} ${styles[`status${status.type.charAt(0).toUpperCase() + status.type.slice(1)}`]}`}>
          {status.message}
        </div>
      )}

      {clonedHtml && (
        <div className={styles.formGroup} style={{ marginTop: '30px' }}>
          <label>HTML Clonado:</label>
          <textarea
            value={clonedHtml}
            readOnly
            style={{ minHeight: '300px', fontFamily: 'monospace', fontSize: '0.9rem' }}
          />
          <button
            onClick={handleDownloadHtml}
            style={{ marginTop: '10px' }}
          >
            Baixar HTML
          </button>
        </div>
      )}

      <div className={styles.downloadSection}>
        <h2 className={styles.sectionTitle}>Download de Biblioteca de Anúncios</h2>
        <div className={styles.formGroup}>
          <label htmlFor="libraryUrl">URL da Biblioteca de Anúncios:</label>
          <input
            type="url"
            id="libraryUrl"
            value={libraryUrl}
            onChange={(e) => setLibraryUrl(e.target.value)}
            placeholder="https://exemplo.com/biblioteca"
          />
        </div>
        <button
          onClick={handleDownloadLibrary}
          disabled={isProcessing}
        >
          {isProcessing ? 'Baixando...' : 'Baixar Todos os Arquivos (ZIP)'}
        </button>
      </div>
    </div>
  )
}

