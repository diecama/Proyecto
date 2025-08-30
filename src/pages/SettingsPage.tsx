import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonToggle, IonNote, IonInput, useIonToast } from '@ionic/react';

const getInitialTheme = () => {
  const saved = localStorage.getItem('themeMode');
  if (saved) return saved === 'dark';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const SettingsPage: React.FC = () => {

  const [dark, setDark] = useState(getInitialTheme);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [showToast, dismissToast] = useIonToast();

  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark');
      localStorage.setItem('themeMode', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('themeMode', 'light');
    }
  }, [dark]);

  const handleClearHistory = () => {
    localStorage.removeItem('conversionHistory');
    showToast({ message: 'Historial borrado', duration: 1500, color: 'success' });
    setTimeout(() => window.location.reload(), 1200);
  };

  const handleUsernameSave = () => {
    localStorage.setItem('username', username);
    showToast({ message: 'Nombre guardado', duration: 1200, color: 'primary' });
  };

  return (
    <IonPage style={{ background: dark ? '#23272f' : '#fff' }}>
      <IonHeader>
        <IonToolbar style={{ background: dark ? 'linear-gradient(180deg, #23272f 80%, #434a54 100%)' : '#fff', borderBottom: 'none' }}>
          <IonTitle style={{ color: dark ? '#fff' : '#222', fontWeight: 700 }}>Ajustes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{ background: dark ? '#434a54' : '#fff', minHeight: '100vh' }}>
        <IonList style={{ background: 'transparent' }}>
          <IonItem style={{ background: dark ? '#23272f' : '#fff', color: dark ? '#fff' : '#222', borderRadius: 12, marginBottom: 12 }}>
            <IonLabel style={{ color: dark ? '#fff' : '#222' }}>Modo oscuro</IonLabel>
            <IonToggle checked={dark} onIonChange={(e: CustomEvent<{ checked: boolean }>) => setDark(e.detail.checked)} color={dark ? 'primary' : 'dark'} />
          </IonItem>
          <IonItem style={{ background: dark ? '#23272f' : '#fff', color: dark ? '#fff' : '#222', borderRadius: 12, marginBottom: 12 }}>
            <IonLabel position="floating" style={{ color: dark ? '#fff' : '#222' }}>Tu nombre</IonLabel>
            <IonInput value={username} onIonChange={e => setUsername(e.detail.value!)} placeholder="Escribe tu nombre" style={{ color: dark ? '#fff' : '#222', background: dark ? '#434a54' : '#fff', borderRadius: 8, border: dark ? '1px solid #444' : '1px solid #ccc', padding: 6 }} />
            <IonButton onClick={handleUsernameSave} size="small" color={dark ? 'primary' : 'dark'} style={{ marginLeft: 8, fontWeight: 600 }}>GUARDAR</IonButton>
          </IonItem>
          <IonItem lines="none" style={{ background: dark ? '#23272f' : '#fff', color: dark ? '#fff' : '#222', borderRadius: 12, marginBottom: 12 }}>
            <IonLabel style={{ color: dark ? '#fff' : '#222' }}>Limpiar historial de conversiones</IonLabel>
            <IonButton color="danger" onClick={handleClearHistory} style={{ fontWeight: 700 }}>LIMPIAR</IonButton>
          </IonItem>
        </IonList>
        <IonNote color={dark ? 'light' : 'medium'} style={{marginTop: 16, display: 'block', color: dark ? '#fff' : undefined}}>
          El modo oscuro se aplica a toda la app y se recuerda entre sesiones.
        </IonNote>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
