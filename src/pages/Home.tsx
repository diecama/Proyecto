// Página obsoleta. Ahora la app usa MeasureConverter como pantalla principal.
// src/pages/Home.tsx
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol } from '@ionic/react';
import CategoryButton from '../components/CategoryButton'; // Importamos el nuevo componente
import './Home.css';

// Definimos las categorías de conversión con más unidades y descripciones
const categories = [
  { name: 'Área', icon: 'square', color: '#ffe066', desc: 'Superficies y terrenos' },
  { name: 'Moneda', icon: 'cash', color: '#63e6be', desc: 'Divisas internacionales' },
  { name: 'Datos', icon: 'code-slash', color: '#212529', iconColor: '#fff', desc: 'Bytes, KB, MB, GB, etc.' },
  { name: 'Combustible', icon: 'car-sport', color: '#ff8787', desc: 'Consumo de vehículos' },
  { name: 'Longitud', icon: 'ruler', color: '#74c0fc', desc: 'Metros, millas, pies, etc.' },
  { name: 'Potencia', icon: 'flash', color: '#b197fc', desc: 'Watts, caballos, etc.' },
  { name: 'Presión', icon: 'barbell', color: '#748ffc', desc: 'Pascales, atm, bar, etc.' },
  { name: 'Velocidad', icon: 'speedometer', color: '#63e6be', desc: 'Km/h, m/s, nudos, etc.' },
  { name: 'Temperatura', icon: 'thermometer', color: '#ff8787', desc: 'Celsius, Fahrenheit, Kelvin' },
  { name: 'Tiempo', icon: 'time', color: '#69db7c', desc: 'Segundos, minutos, horas, etc.' },
  { name: 'Volumen', icon: 'beaker', color: '#ffd43b', desc: 'Litros, galones, etc.' },
  { name: 'Peso', icon: 'scale', color: '#ffa94d', desc: 'Kg, libras, onzas, etc.' },
  { name: 'Energía', icon: 'battery-charging', color: '#b9e769', desc: 'Joules, calorías, etc.' },
  { name: 'Frecuencia', icon: 'pulse', color: '#a5d8ff', desc: 'Hertz, kilohertz, etc.' },
  { name: 'Ángulo', icon: 'ellipse', color: '#f783ac', desc: 'Grados, radianes' },
  { name: 'Fuerza', icon: 'fitness', color: '#fab005', desc: 'Newton, dina, etc.' },
  { name: 'Aceleración', icon: 'trending-up', color: '#d0bfff', desc: 'm/s², Gal, etc.' },
  { name: 'Cocina', icon: 'restaurant', color: '#ffe066', desc: 'Medidas culinarias' },
  { name: 'Dimensión', icon: 'cube', color: '#dee2e6', iconColor: '#495057', desc: 'Volumen y espacio' },
  { name: 'Densidad', icon: 'cube', color: '#b2f2ff', desc: 'g/cm³, kg/m³, etc.' },
  { name: 'Iluminancia', icon: 'flash', color: '#fff3bf', desc: 'Lux, lumen, candela' },
  { name: 'Radiación', icon: 'pulse', color: '#ffd6e0', desc: 'Gray, Sievert, Becquerel' },
  { name: 'Sonido', icon: 'pulse', color: '#e7c6ff', desc: 'Decibelios, sonio, fon' },
  { name: 'Presión de vapor', icon: 'barbell', color: '#b2f2ff', desc: 'mmHg, kPa, atm' },
  { name: 'Viscosidad', icon: 'cube', color: '#ffe066', desc: 'Poise, Pascal·s' },
  { name: 'Concentración', icon: 'beaker', color: '#b9e769', desc: 'Molaridad, ppm, %' },
  { name: 'Capacitancia', icon: 'flash', color: '#b2f2ff', desc: 'Faradios, microfaradios' },
  { name: 'Inductancia', icon: 'flash', color: '#b2f2ff', desc: 'Henrios, milihenrios' },
  { name: 'Carga eléctrica', icon: 'flash', color: '#b2f2ff', desc: 'Coulomb, amperio-hora' },
  { name: 'Resistencia eléctrica', icon: 'flash', color: '#b2f2ff', desc: 'Ohmios, kiloohmios' },
  { name: 'Conductancia', icon: 'flash', color: '#b2f2ff', desc: 'Siemens, mho' },
  { name: 'Campo magnético', icon: 'flash', color: '#b2f2ff', desc: 'Tesla, Gauss' },
  { name: 'Flujo magnético', icon: 'flash', color: '#b2f2ff', desc: 'Weber, maxwell' },
  { name: 'Luminancia', icon: 'flash', color: '#fff3bf', desc: 'Nit, stilb, apostilb' },
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
                <div style={{textAlign:'center', fontSize:'0.92rem', color:'#868e96', marginTop:'4px', minHeight:'22px'}}>{category.desc}</div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;