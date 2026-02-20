import React, { useState } from 'react';
import VideoUploader from './components/VideoUploader';
import DurationSelector from './components/DurationSelector';
import ProcessingStatus from './components/ProcessingStatus';
import DownloadSection from './components/DownloadSection';
import AutomationsTab from './components/AutomationsTab';
// import PaymentsTab from './components/PaymentsTab'; // Desabilitado temporariamente
import './App.css';

// URL da API - usar variável de ambiente ou URL fixa
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [activeTab, setActiveTab] = useState('cortes'); // 'cortes' ou 'automacoes'
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setSelectedDuration(null);
    setIsProcessing(false);
    setJobId(null);
    setStatus(null);
  };

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration);
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedDuration) {
      alert('Por favor, selecione um vídeo e uma duração');
      return;
    }

    setIsProcessing(true);
    setStatus({ status: 'processing', progress: 0 });

    const formData = new FormData();
    formData.append('video', selectedFile);
    formData.append('duration', selectedDuration);

    try {
      console.log('Enviando vídeo para:', `${API_URL}/api/upload`);
      const response = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Resposta do servidor:', data);

      if (data.success) {
        setJobId(data.jobId);
        console.log('JobId recebido:', data.jobId);
        // Iniciar polling de status
        pollStatus(data.jobId);
      } else {
        alert('Erro ao fazer upload do vídeo: ' + (data.error || 'Erro desconhecido'));
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao fazer upload do vídeo: ' + error.message + '\n\nVerifique se o backend está rodando na porta 5000.');
      setIsProcessing(false);
    }
  };

  const pollStatus = (id) => {
    let pollCount = 0;
    const maxPolls = 300; // Máximo de 10 minutos (300 * 2s)
    
    const interval = setInterval(async () => {
      pollCount++;
      
      if (pollCount > maxPolls) {
        clearInterval(interval);
        setIsProcessing(false);
        alert('Tempo limite excedido. O processamento pode estar demorando mais que o esperado.');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/status/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Status check ${pollCount}:`, data);

        setStatus(data);

        if (data.status === 'completed') {
          clearInterval(interval);
          setIsProcessing(false);
          console.log('Processamento concluído!');
        }
      } catch (error) {
        console.error('Erro ao verificar status:', error);
        // Não parar o polling imediatamente, pode ser um erro temporário
        if (pollCount > 10) {
          clearInterval(interval);
          setIsProcessing(false);
          alert('Erro ao verificar status do processamento após várias tentativas.');
        }
      }
    }, 2000); // Verificar a cada 2 segundos
  };

  const handleReset = () => {
    setSelectedFile(null);
    setSelectedDuration(null);
    setIsProcessing(false);
    setJobId(null);
    setStatus(null);
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>🎬 CortesHot</h1>
          <p>Plataforma de corte de vídeos profissional</p>
        </header>

        {/* Navegação por Abas */}
        <div className="tabs-navigation">
          <button
            className={`tab-button ${activeTab === 'cortes' ? 'active' : ''}`}
            onClick={() => setActiveTab('cortes')}
          >
            ✂️ Cortes de Vídeo
          </button>
          <button
            className={`tab-button ${activeTab === 'automacoes' ? 'active' : ''}`}
            onClick={() => setActiveTab('automacoes')}
          >
            🤖 Automações Telegram
          </button>
          {/* Aba de pagamentos desabilitada temporariamente */}
          {/* <button
            className={`tab-button ${activeTab === 'pagamentos' ? 'active' : ''}`}
            onClick={() => setActiveTab('pagamentos')}
          >
            💳 Pagamentos Sync
          </button> */}
        </div>

        {/* Conteúdo das Abas */}
        {activeTab === 'cortes' ? (
          <>
            {!status || status.status !== 'completed' ? (
              <>
                <VideoUploader onFileSelect={handleFileSelect} selectedFile={selectedFile} />
                
                {selectedFile && (
                  <DurationSelector
                    selectedDuration={selectedDuration}
                    onDurationSelect={handleDurationSelect}
                  />
                )}

                {selectedFile && selectedDuration && !isProcessing && (
                  <button className="upload-button" onClick={handleUpload}>
                    Processar Vídeo
                  </button>
                )}

                {isProcessing && <ProcessingStatus status={status} />}
              </>
            ) : (
              <DownloadSection 
                status={status} 
                onReset={handleReset}
                onRegenerate={handleUpload}
                selectedFile={selectedFile}
                selectedDuration={selectedDuration}
              />
            )}
          </>
            ) : activeTab === 'automacoes' ? (
              <AutomationsTab />
            ) : null
            /* Aba de pagamentos desabilitada temporariamente */
            /* : (
              <PaymentsTab />
            ) */
            }
      </div>
    </div>
  );
}

export default App;
