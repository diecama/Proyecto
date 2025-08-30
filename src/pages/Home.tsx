// Página obsoleta. Ahora la app usa MeasureConverter como pantalla principal.
// src/pages/Home.tsx
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol } from '@ionic/react';
import CategoryButton from '../components/CategoryButton'; // Importamos el nuevo componente
import './Home.css';

// Definimos las categorías de conversión
const categories = [
  { name: 'Área', icon: 'square', color: '#ffe066' },
  { name: 'Moneda', icon: 'cash', color: '#63e6be' },
  { name: 'Datos', icon: 'code-slash', color: '#212529', iconColor: '#fff' },
  { name: 'Combustible', icon: 'car-sport', color: '#ff8787' },
  { name: 'Longitud', icon: 'ruler', color: '#74c0fc' },
  { name: 'Potencia', icon: 'flash', color: '#b197fc' },
  { name: 'Presión', icon: 'barbell', color: '#748ffc' },
  { name: 'Velocidad', icon: 'speedometer', color: '#63e6be' },
  { name: 'Temperatura', icon: 'thermometer', color: '#ff8787' },
  { name: 'Tiempo', icon: 'time', color: '#69db7c' },
  { name: 'Volumen', icon: 'beaker', color: '#ffd43b' },
  { name: 'Peso', icon: 'scale', color: '#ffa94d' },
  { name: 'Energía', icon: 'battery-charging', color: '#b9e769' },
  { name: 'Frecuencia', icon: 'pulse', color: '#a5d8ff' },
  { name: 'Ángulo', icon: 'ellipse', color: '#f783ac' },
  { name: 'Fuerza', icon: 'fitness', color: '#fab005' },
  { name: 'Aceleración', icon: 'trending-up', color: '#d0bfff' },
  { name: 'Cocina', icon: 'restaurant', color: '#ffe066' },
  { name: 'Dimensión', icon: 'cube', color: '#dee2e6', iconColor: '#495057' },
];

const Home: React.FC = () => {
  const handleCategoryClick = (categoryName: string) => {
    // Aquí puedes agregar la navegación a la página de cada conversor
    alert(`Abriendo ${categoryName}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Conversor de Unidades</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Conversor de Unidades</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid className="categories-grid">
          <IonRow>
            {categories.map((category) => (
              <IonCol size="6" key={category.name}>
                <CategoryButton
                  label={category.name}
                  iconName={category.icon as any}
                  color={category.color}
                  iconColor={category.iconColor}
                  onClick={() => handleCategoryClick(category.name)}
                />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;