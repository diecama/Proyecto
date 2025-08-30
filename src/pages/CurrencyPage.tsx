// src/pages/CurrencyPage.tsx
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const CurrencyPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Moneda</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
            // Página obsoleta. Ahora la app es un conversor de medidas.
      </IonContent>
    </IonPage>
  );
};

export default CurrencyPage;