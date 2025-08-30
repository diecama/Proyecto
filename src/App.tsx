import SettingsPage from './pages/SettingsPage';
import ExchangeRatesPage from './pages/ExchangeRatesPage';
// src/App.tsx
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { apps, cash, time, settings, refresh } from 'ionicons/icons';

import MeasureConverter from './pages/MeasureConverter';
import CurrencyConverter from './pages/CurrencyConverter';
import CategorySelector from './pages/CategorySelector';
import HistoryPage from './pages/HistoryPage';

/* Importaciones de CSS (¡MUY IMPORTANTES!) */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';


// Aplicar modo oscuro al iniciar la app si está guardado en localStorage y sincronizar entre pestañas
setupIonicReact();
function applyTheme() {
  const themeMode = localStorage.getItem('themeMode');
  if (themeMode === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}
applyTheme();
window.addEventListener('storage', () => applyTheme());

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/" component={CategorySelector} exact={true} />
          <Route path="/medidas" component={MeasureConverter} exact={true} />
          <Route path="/monedas" component={CurrencyConverter} exact={true} />
          <Route path="/historial" component={HistoryPage} exact={true} />
          <Route path="/ajustes" component={SettingsPage} exact={true} />
          <Route path="/cambio" component={ExchangeRatesPage} exact={true} />
          <Redirect to="/" />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="inicio" href="/">
            <IonIcon icon={apps} />
            <IonLabel>Inicio</IonLabel>
          </IonTabButton>
          <IonTabButton tab="historial" href="/historial">
            <IonIcon icon={time} />
            <IonLabel>Historial</IonLabel>
          </IonTabButton>
          <IonTabButton tab="ajustes" href="/ajustes">
            <IonIcon icon={settings} />
            <IonLabel>Ajustes</IonLabel>
          </IonTabButton>
          <IonTabButton tab="cambio" href="/cambio">
            <IonIcon icon={refresh} />
            <IonLabel>Cambio</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;