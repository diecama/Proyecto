
const currencies = [
  { label: 'Dólar estadounidense (USD)', value: 'USD' },
  { label: 'Euro (EUR)', value: 'EUR' },
  { label: 'Peso argentino (ARS)', value: 'ARS' },
  { label: 'Real brasileño (BRL)', value: 'BRL' },
  { label: 'Peso mexicano (MXN)', value: 'MXN' },
  { label: 'Libra esterlina (GBP)', value: 'GBP' },
  { label: 'Yen japonés (JPY)', value: 'JPY' },
  { label: 'Boliviano (BOB)', value: 'BOB' },
];

const CurrencyConverter: React.FC = () => {

  // Tasas simuladas (locales)
  const rates: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    ARS: 900,
    BRL: 5.2,
    MXN: 16.8,
    GBP: 0.78,
    JPY: 155,
    BOB: 6.9,
  };

  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const handleConvert = () => {
    const value = parseFloat(amount);
    if (!isNaN(value)) {
      const usd = value / rates[from];
      const converted = usd * rates[to];
      setResult(converted);
      // Guardar en historial
      const entry = `Moneda: ${value} ${from} → ${converted} ${to}`;
      const history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
      history.unshift(entry);
      localStorage.setItem('conversionHistory', JSON.stringify(history.slice(0, 30)));
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="Categorías" />
          </IonButtons>
          <IonTitle>Conversor de Monedas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel>De</IonLabel>
          <IonSelect value={from} onIonChange={e => setFrom(e.detail.value)}>
            {currencies.map(c => (
              <IonSelectOption key={c.value} value={c.value}>{c.label}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>A</IonLabel>
          <IonSelect value={to} onIonChange={e => setTo(e.detail.value)}>
            {currencies.map(c => (
              <IonSelectOption key={c.value} value={c.value}>{c.label}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Cantidad</IonLabel>
          <IonInput type="number" value={amount} onIonChange={e => setAmount(e.detail.value!)} />
        </IonItem>
        <IonButton expand="block" onClick={handleConvert} className="ion-margin-top">Convertir</IonButton>
        {result !== null && (
          <IonItem className="ion-margin-top">
            <IonLabel>Resultado: {result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {to}</IonLabel>
          </IonItem>
        )}
        <IonText color="medium" className="ion-margin-top">
          <p>Tasa actual: 1 {from} = {(rates[to] / rates[from]).toLocaleString(undefined, { maximumFractionDigits: 4 })} {to}</p>
        </IonText>
        <IonList className="ion-margin-top">
          <IonItem color="light">
            <IonLabel><b>Valores de monedas (base USD):</b></IonLabel>
          </IonItem>
          <IonItem>
            <IonInput
              value={search}
              onIonInput={e => setSearch((e.target as HTMLInputElement).value)}
              placeholder="Buscar moneda por nombre o código..."
            />
          </IonItem>
          {currencies
            .filter(c =>
              c.label.toLowerCase().includes(search.toLowerCase()) ||
              c.value.toLowerCase().includes(search.toLowerCase())
            )
            .map(c => (
              <IonItem key={c.value}>
                <IonLabel>{c.label}: {rates[c.value]}</IonLabel>
              </IonItem>
            ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CurrencyConverter;
import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonText,
  IonList,
  IonBackButton,
  IonButtons
} from '@ionic/react';
