// src/components/CategoryButton.tsx
import React from 'react';
import { IonCard, IonCardContent, IonIcon, IonText } from '@ionic/react';
import {
  wallet, scale, happy, beaker, swapHorizontal, resize, square, cash, codeSlash, carSport, flash, barbell, speedometer, thermometer, time, batteryCharging, pulse, ellipse, fitness, trendingUp, restaurant, cube
} from 'ionicons/icons';
import './CategoryButton.css';

// Mapeo de nombres de íconos a los objetos de íconos importados
const iconMap: { [key: string]: string } = {
  'densidad': cube, // Usar el ícono de cubo para densidad
  'área': square,
  'moneda': cash,
  'datos': codeSlash,
  'combustible': carSport,
  'longitud': resize,
  'potencia': flash,
  'presión': barbell,
  'velocidad': speedometer,
  'temperatura': thermometer,
  'tiempo': time,
  'volumen': beaker,
  'peso': scale,
  'energía': batteryCharging,
  'frecuencia': pulse,
  'ángulo': ellipse,
  'fuerza': fitness,
  'aceleración': trendingUp,
  'cocina': restaurant,
  'dimensión': cube,
};


interface CategoryButtonProps {
  label: string;
  iconName: string;
  color: string;
  iconColor?: string;
  onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ label, iconName, color, iconColor, onClick }) => {
  // Detectar modo oscuro
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  // Ajustar color de fondo e ícono según modo
  // Usar el color de fondo de tarjeta de Ionic para fondo, y el color personalizado solo para el icono en modo claro
  // Gradiente y sombra para fondo de la tarjeta
  const cardBg = prefersDark
    ? 'linear-gradient(135deg, #23272f 60%, #2d3748 100%)'
    : `linear-gradient(135deg, ${color} 60%, #f5f7fa 100%)`;
  const iconBg = prefersDark ? '#23272f' : color;
  const iconFinalColor = prefersDark ? '#fff' : (iconColor || '#222');
  const textColor = prefersDark ? '#f1f3f5' : '#23272f';
  return (
    <IonCard
      button
      onClick={onClick}
      className="category-button-card"
      style={{
        background: cardBg,
        boxShadow: prefersDark
          ? '0 2px 12px #0008'
          : '0 4px 18px #1976d233',
        borderRadius: 18,
        padding: 0,
        margin: '0 0 8px 0',
        minWidth: 120,
        transition: 'box-shadow 0.2s, background 0.2s',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      <IonCardContent
        className="category-card-content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '22px 10px 14px 10px',
        }}
      >
        <div
          className="icon-wrapper"
          style={{
            background: prefersDark
              ? 'linear-gradient(135deg, #23272f 60%, #2d3748 100%)'
              : `linear-gradient(135deg, ${color} 60%, #fff 100%)`,
            borderRadius: '50%',
            width: 54,
            height: 54,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 12,
            boxShadow: prefersDark
              ? '0 2px 8px #0006'
              : '0 2px 8px #1976d222',
            border: prefersDark ? '1.5px solid #444' : '1.5px solid #e3e3e3',
            transition: 'background 0.2s',
          }}
        >
          <IonIcon
            icon={iconMap[iconName.toLowerCase()]}
            className="category-icon"
            style={{
              color: iconFinalColor,
              fontSize: 34,
              width: 34,
              height: 34,
              filter: prefersDark ? 'drop-shadow(0 1px 2px #000a)' : 'drop-shadow(0 1px 2px #1976d222)',
              transition: 'color 0.2s',
            }}
          />
        </div>
        <IonText
          className="category-label"
          style={{
            color: textColor,
            fontWeight: 700,
            fontSize: 17,
            letterSpacing: 0.2,
            textAlign: 'center',
            marginTop: 2,
            textShadow: prefersDark ? '0 1px 2px #000a' : '0 1px 2px #fff8',
          }}
        >
          {label}
        </IonText>
      </IonCardContent>
    </IonCard>
  );
};

export default CategoryButton;