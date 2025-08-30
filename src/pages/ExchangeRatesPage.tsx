import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { mic } from 'ionicons/icons';
// Utilidad para extraer valor y monedas de la frase reconocida
function parseCurrencySpeech(text: string) {
  // Ejemplo: "convierte 5 dólares a euros" o "10 pesos a libras"
  const regex = /(\d+[\.,]?\d*)\s*([\wáéíóúñ]+)\s*(a|en|to)\s*([\wáéíóúñ]+)/i;
  const match = text.match(regex);
  if (match) {
    const value = match[1].replace(',', '.');
    const from = match[2].toLowerCase();
    const to = match[4].toLowerCase();
    // Buscar código de moneda por nombre
    const nameToCode = {
      'dólar': 'USD', 'dolares': 'USD', 'usd': 'USD',
      'euro': 'EUR', 'euros': 'EUR', 'eur': 'EUR',
      'peso': 'ARS', 'pesos': 'ARS', 'ars': 'ARS',
      'real': 'BRL', 'reales': 'BRL', 'brl': 'BRL',
      'mexicano': 'MXN', 'mxn': 'MXN',
      'libra': 'GBP', 'libras': 'GBP', 'gbp': 'GBP',
      'yen': 'JPY', 'yenes': 'JPY', 'jpy': 'JPY',
      'boliviano': 'BOB', 'bolivianos': 'BOB', 'bob': 'BOB',
    };
    const fromCode = nameToCode[from] || from.toUpperCase();
    const toCode = nameToCode[to] || to.toUpperCase();
    return { value, from: fromCode, to: toCode };
  }
  return null;
}
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonSpinner, IonNote, IonIcon } from '@ionic/react';
import { cash } from 'ionicons/icons';

const mainCurrencyList = ['USD', 'EUR', 'ARS', 'BRL', 'MXN', 'GBP', 'JPY'];
const bobCurrency = 'BOB';
const currencyNames: Record<string, string> = {
  USD: 'Dólar estadounidense',
  EUR: 'Euro',
  ARS: 'Peso argentino',
  BRL: 'Real brasileño',
  MXN: 'Peso mexicano',
  GBP: 'Libra esterlina',
  JPY: 'Yen japonés',
  BOB: 'Boliviano',
};

const ExchangeRatesPage: React.FC = () => {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [bobRate, setBobRate] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [voiceResult, setVoiceResult] = useState<string | null>(null);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  // Procesar resultado de voz
  useEffect(() => {
    if (transcript) {
      const parsed = parseCurrencySpeech(transcript);
      if (parsed && rates[parsed.from] && rates[parsed.to]) {
        const value = parseFloat(parsed.value);
        if (!isNaN(value)) {
          // Convertir usando USD como base
          const usd = value / rates[parsed.from];
          const converted = usd * rates[parsed.to];
          setVoiceResult(`${value} ${parsed.from} = ${converted.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${parsed.to}`);
        }
      } else {
        setVoiceResult('No se pudo interpretar la frase o monedas.');
      }
    }
  }, [transcript, rates]);

  const handleVoice = () => {
    if (!browserSupportsSpeechRecognition) {
      alert('El reconocimiento de voz no es compatible con este navegador.');
      return;
    }
    resetTranscript();
    setVoiceResult(null);
    SpeechRecognition.startListening({ language: 'es-ES' });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const fetchRates = () => {
      setError(null);
      fetch('https://api.exchangerate.host/latest?base=USD&symbols=' + mainCurrencyList.join(','))
        .then(res => res.json())
        .then(data => {
          if (data && data.rates) {
            setRates(data.rates);
          } else {
            setError('No se pudieron obtener las tasas principales.');
          }
        })
        .catch(() => setError('Error de conexión con la API.'));
      fetch('https://api.exchangerate.host/latest?base=USD&symbols=' + bobCurrency)
        .then(res => res.json())
        .then(data => {
          if (data && data.rates && data.rates.BOB) {
            setBobRate(data.rates.BOB);
          }
        });
    };
    fetchRates();
    interval = setInterval(fetchRates, 30000); // Actualiza cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tipo de Cambio Actualizado</IonTitle>
        </IonToolbar>
      </IonHeader>
  <IonContent className="ion-padding" style={{ background: document.body.classList.contains('dark') ? '#18191a' : '#fff', minHeight: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, justifyContent: 'center', color: document.body.classList.contains('dark') ? '#fff' : '#222' }}>
          <IonButton onClick={handleVoice} color={listening ? 'danger' : 'primary'} style={{ borderRadius: '50%', minWidth: 44, width: 44, height: 44, padding: 0 }}>
            <IonIcon icon={mic} style={{ fontSize: 24 }} />
          </IonButton>
          <span style={{ fontWeight: 500, color: '#1976d2', fontSize: 16 }}>Pide un cambio por voz</span>
        </div>
      {listening && (
        <div style={{ marginBottom: 10, color: '#1976d2', fontWeight: 500, fontSize: 15 }}>
          Escuchando... <span style={{ fontSize: 13, color: '#888' }}>{transcript}</span>
        </div>
      )}
      {voiceResult && (
        <IonCard color="success" style={{ margin: '0 auto 18px auto', borderRadius: 14, background: '#e8fff3', maxWidth: 420 }}>
          <IonCardContent style={{ fontWeight: 600, fontSize: 18, color: '#2e7d32', textAlign: 'center' }}>{voiceResult}</IonCardContent>
        </IonCard>
      )}
      {Object.keys(rates).length === 0 && !error && (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 40}}>
          <IonSpinner name="dots" />
        </div>
      )}
      {error && <IonNote color="danger" style={{marginTop: 24, display: 'block', textAlign: 'center', color: '#ff5252'}}>{error}</IonNote>}
      {(Object.keys(rates).length > 0) && (
        <IonCard style={{maxWidth: 420, margin: '24px auto', boxShadow: '0 2px 16px #0002', background: document.body.classList.contains('dark') ? '#23272f' : '#f8f9fa', color: document.body.classList.contains('dark') ? '#fff' : '#222' }}>
          <IonCardHeader style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <IonIcon icon={cash} color="success" style={{fontSize: 28}} />
            <IonCardTitle style={{fontSize: 20}}>Tasas de cambio (USD)</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList lines="none">
              {mainCurrencyList.map((key) => (
                <IonItem key={key} style={{'--background': document.body.classList.contains('dark') ? '#23272f' : '#f8f9fa'}}>
                  <IonLabel style={{fontWeight: 500, fontSize: 16, color: document.body.classList.contains('dark') ? '#fff' : '#222'}}>
                    {currencyNames[key] || key}
                    <span style={{color: '#888', fontSize: 13, marginLeft: 8}}>({key})</span>
                  </IonLabel>
                  <div style={{fontWeight: 700, fontSize: 16, color: '#3880ff'}}>{rates[key]}</div>
                </IonItem>
              ))}
              {bobRate && (
                <IonItem key="BOB" style={{'--background': document.body.classList.contains('dark') ? '#23272f' : '#f8f9fa'}}>
                  <IonLabel style={{fontWeight: 500, fontSize: 16, color: document.body.classList.contains('dark') ? '#fff' : '#222'}}>
                    {currencyNames['BOB']} <span style={{color: '#888', fontSize: 13, marginLeft: 8}}>(BOB)</span>
                  </IonLabel>
                  <div style={{fontWeight: 700, fontSize: 16, color: '#3880ff'}}>{bobRate}</div>
                </IonItem>
              )}
            </IonList>
          </IonCardContent>
        </IonCard>
      )}
      <IonNote color="medium" style={{marginTop: 16, display: 'block', textAlign: 'center', color: document.body.classList.contains('dark') ? '#bbb' : '#444'}}>Fuente: exchangerate.host (API gratuita)</IonNote>
      {Object.keys(rates).length === 0 && !error && (
        <div style={{marginTop: 32, color: document.body.classList.contains('dark') ? '#fff' : '#222', textAlign: 'center', fontSize: 18}}>
          No hay datos de tipo de cambio disponibles.
        </div>
      )}
      </IonContent>
    </IonPage>
  );
};

export default ExchangeRatesPage;
