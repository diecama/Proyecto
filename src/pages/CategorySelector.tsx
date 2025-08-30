import React, { useState } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, 
  IonRow, IonCol, IonIcon, IonSearchbar 
} from '@ionic/react';
import '../theme/animations.css';
import {
  cash, scale, thermometer, cube, expand, square, codeSlash, carSport,
  flash, barbell, speedometer, time, batteryCharging, pulse, fitness, 
  trendingUp, restaurant
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const categories = [
  { label: 'Área', icon: square, color: '#ffe066', path: '/medidas?cat=area', description: 'm², km², ft², in², hectáreas, acres, etc.' },
  { label: 'Moneda', icon: cash, color: '#63e6be', path: '/monedas', description: 'Conversión de divisas' },
  { label: 'Datos', icon: codeSlash, color: '#212529', iconColor: '#fff', path: '/medidas?cat=data', description: 'Bit, Byte, KB, MB, GB, TB' },
  { label: 'Combustible', icon: carSport, color: '#ff8787', path: '/medidas?cat=fuel', description: 'km/l, l/100km, mpg' },
  { label: 'Longitud', icon: expand, color: '#74c0fc', path: '/medidas?cat=length', description: 'Metros, kilómetros, pulgadas, pies, etc.' },
  { label: 'Potencia', icon: flash, color: '#b197fc', path: '/medidas?cat=power', description: 'W, kW, MW, HP' },
  { label: 'Presión', icon: barbell, color: '#748ffc', path: '/medidas?cat=pressure', description: 'Pa, bar, atm, mmHg, psi' },
  { label: 'Velocidad', icon: speedometer, color: '#63e6be', path: '/medidas?cat=speed', description: 'm/s, km/h, mph, kn, ft/s' },
  { label: 'Temperatura', icon: thermometer, color: '#ff8787', path: '/medidas?cat=temperature', description: 'Celsius, Fahrenheit, Kelvin' },
  { label: 'Tiempo', icon: time, color: '#69db7c', path: '/medidas?cat=time', description: 'Segundos, minutos, horas, días, semanas, años' },
  { label: 'Volumen', icon: cube, color: '#ffd43b', path: '/medidas?cat=volume', description: 'Litros, m³, galones, ft³, in³, etc.' },
  { label: 'Peso', icon: scale, color: '#ffa94d', path: '/medidas?cat=weight', description: 'Kilogramos, gramos, libras, onzas, etc.' },
  { label: 'Energía', icon: batteryCharging, color: '#b9e769', path: '/medidas?cat=energy', description: 'J, kJ, cal, kcal, Wh, kWh, BTU, erg' },
  { label: 'Frecuencia', icon: pulse, color: '#a5d8ff', path: '/medidas?cat=frequency', description: 'Hz, kHz, MHz, GHz' },
  { label: 'Fuerza', icon: fitness, color: '#fab005', path: '/medidas?cat=force', description: 'N, kN, dyn, lbf, kgf' },
  { label: 'Aceleración', icon: trendingUp, color: '#d0bfff', path: '/medidas?cat=acceleration', description: 'm/s², gal, ft/s², g' },
  { label: 'Cocina', icon: restaurant, color: '#ffe066', path: '/medidas?cat=cooking', description: 'Cucharadita, cucharada, taza, onza líquida, pinta, cuarto, galón, mililitro, litro' },
];

const CategorySelector: React.FC = () => {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const filteredCategories = categories.filter(cat =>
    cat.label.toLowerCase().includes(search.toLowerCase()) ||
    cat.description.toLowerCase().includes(search.toLowerCase())
  );

  // Detectar modo oscuro con Ionic
  const prefersDark = document.body.classList.contains('dark');
  const bg = prefersDark ? '#23272f' : '#fff';
  const headerBg = prefersDark ? 'linear-gradient(180deg, #23272f 80%, #434a54 100%)' : '#fff';
  const textColor = prefersDark ? '#fff' : '#222';
  const inputBg = prefersDark ? '#23272f' : '#fff';
  const inputBorder = prefersDark ? '#444' : '#ccc';

  return (
    <IonPage style={{ background: bg }}>
      <IonHeader>
        <IonToolbar style={{ background: headerBg, borderBottom: 'none' }}>
          <IonTitle style={{ color: textColor, fontWeight: 700 }}>Selecciona Conversión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ background: bg, minHeight: '100vh' }}>
        {/* Buscador de categorías */}
        <div style={{ margin: '20px 0 24px 0' }}>
          <IonSearchbar
            value={search}
            onIonInput={e => setSearch(e.detail.value!)}
            placeholder="Buscar categoría o unidad (ej: metros, temperatura, peso...)"
            style={{
              '--background': inputBg,
              '--color': textColor,
              '--placeholder-color': prefersDark ? '#888' : '#666',
              '--icon-color': prefersDark ? '#888' : '#666',
              '--clear-button-color': prefersDark ? '#888' : '#666',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: `2px solid ${inputBorder}`,
              marginBottom: '8px'
            }}
          />

          {search && (
            <div style={{ fontSize: '14px', color: prefersDark ? '#bbb' : '#666', textAlign: 'center', marginTop: '8px' }}>
              {filteredCategories.length > 0 
                ? `${filteredCategories.length} categoría${filteredCategories.length !== 1 ? 's' : ''} encontrada${filteredCategories.length !== 1 ? 's' : ''}` 
                : 'No se encontraron categorías'}
            </div>
          )}

          {/* Accesos rápidos cuando no hay búsqueda */}
          {!search && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
              marginTop: '16px',
              marginBottom: '8px'
            }}>
              <div style={{ fontSize: '14px', color: prefersDark ? '#bbb' : '#666', marginBottom: '8px', width: '100%', textAlign: 'center' }}>
                🔥 Más populares:
              </div>
              {['Longitud', 'Peso', 'Temperatura', 'Moneda', 'Volumen'].map(popular => {
                const cat = categories.find(c => c.label === popular);
                return cat ? (
                  <div
                    key={popular}
                    onClick={() => history.push(cat.path)}
                    style={{
                      background: prefersDark ? '#333' : '#f0f0f0',
                      color: textColor,
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: `1px solid ${prefersDark ? '#555' : '#ddd'}`,
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = cat.color;
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = prefersDark ? '#333' : '#f0f0f0';
                      e.currentTarget.style.color = textColor;
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {popular}
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>

        <IonGrid style={{ margin: 0, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          <IonRow style={{ justifyContent: 'center' }}>
            {filteredCategories.length === 0 && search ? (
              <IonCol size="12" style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{
                  background: prefersDark ? '#2a2a2a' : '#f5f5f5',
                  borderRadius: '16px',
                  padding: '32px 24px',
                  border: `2px dashed ${prefersDark ? '#555' : '#ddd'}`
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>🔍</div>
                  <div style={{ fontSize: '18px', fontWeight: 600, color: textColor, marginBottom: '8px' }}>
                    No encontrado
                  </div>
                  <div style={{ fontSize: '14px', color: prefersDark ? '#bbb' : '#666', lineHeight: '1.4' }}>
                    Intenta buscar con términos como:<br />
                    "metros", "temperatura", "peso", "moneda"
                  </div>
                </div>
              </IonCol>
            ) : (
              filteredCategories.map(cat => (
                <IonCol size="6" size-md="4" size-lg="3" key={cat.label} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 18 }}>
                  <div
                    onClick={() => history.push(cat.path)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      maxWidth: 140,
                      transform: search ? 'scale(1.05)' : 'scale(1)',
                      transition: 'all 0.3s ease',
                      filter: search ? 'brightness(1.1)' : 'brightness(1)'
                    }}
                  >
                    <div
                      style={{
                        background: search ? `linear-gradient(135deg, ${cat.color}, ${cat.color}dd)` : cat.color,
                        borderRadius: 18,
                        width: 100,
                        height: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: search 
                          ? '0 8px 24px rgba(0,0,0,0.2), 0 0 20px rgba(25,118,210,0.3)' 
                          : '0 2px 8px #0006',
                        cursor: 'pointer',
                        transition: 'transform 0.1s',
                        border: search ? '3px solid #1976d2' : 'none',
                        position: 'relative'
                      }}
                    >
                      {search && (
                        <div style={{
                          position: 'absolute',
                          top: '-6px',
                          right: '-6px',
                          background: '#4caf50',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          color: 'white',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 8px rgba(76,175,80,0.4)'
                        }}>
                          ✓
                        </div>
                      )}
                      <IonIcon icon={cat.icon} style={{ fontSize: 48, color: '#fff' }} />
                    </div>
                    <div style={{ 
                      color: textColor, 
                      fontWeight: search ? 700 : 600, 
                      fontSize: search ? 17 : 16, 
                      marginTop: 12, 
                      textAlign: 'center', 
                      textShadow: prefersDark ? '0 1px 2px #000a' : 'none', 
                      width: 100, 
                      wordBreak: 'break-word', 
                      minHeight: 24,
                      background: search && (cat.label.toLowerCase().includes(search.toLowerCase()) || cat.description.toLowerCase().includes(search.toLowerCase()))
                        ? 'linear-gradient(135deg, rgba(25,118,210,0.1), rgba(25,118,210,0.05))'
                        : 'transparent',
                      borderRadius: '8px',
                      padding: '4px 8px',
                      transition: 'all 0.3s ease'
                    }}>
                      {cat.label}
                    </div>
                  </div>
                </IonCol>
              ))
            )}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CategorySelector;
