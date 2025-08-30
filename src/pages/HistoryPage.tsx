// src/pages/HistoryPage.tsx
import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';

const conversionHistory = JSON.parse(localStorage.getItem('conversionHistory') || '[]');

const HistoryPage: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Historial de Conversiones</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonList>
        {conversionHistory.length === 0 ? (
          <IonItem>
            <IonLabel>No hay historial aún.</IonLabel>
          </IonItem>
        ) : (
          conversionHistory.map((item: any, idx: number) => (
            <IonItem key={idx}>
              <IonLabel>{item}</IonLabel>
            </IonItem>
          ))
        )}
      </IonList>
    </IonContent>
  </IonPage>
);

export default HistoryPage;