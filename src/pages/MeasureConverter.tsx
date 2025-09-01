import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import '../theme/animations.css';
// Utilidad para extraer valor y unidades de la frase reconocida
function parseSpeech(text: string, units: UnitsMap, categories: {label: string, value: string}[]) {
  // Ejemplo: "convierte 5 metros a kilómetros" o "quiero convertir 10 kilogramos a libras"
  // Mejorar para soportar frases más flexibles y todas las unidades
  const regex = /(\d+[\.,]?\d*)\s*([\wáéíóúñ/²³°]+)\s*(a|en|to)\s*([\wáéíóúñ/²³°]+)/i;
  const match = text.match(regex);
  if (match) {
    const value = match[1].replace(',', '.');
    const from = match[2].toLowerCase();
    const to = match[4].toLowerCase();
    // Buscar la categoría y unidades de forma flexible
    for (const cat of Object.keys(units)) {
      // Buscar unidad origen
      const fromUnit = units[cat].find(u =>
        u.label.toLowerCase().replace(/s$/, '').includes(from.replace(/s$/, '')) ||
        u.value.toLowerCase() === from.replace(/s$/, '')
      );
      // Buscar unidad destino
      const toUnit = units[cat].find(u =>
        u.label.toLowerCase().replace(/s$/, '').includes(to.replace(/s$/, '')) ||
        u.value.toLowerCase() === to.replace(/s$/, '')
      );
      if (fromUnit && toUnit) {
        return { value, from: fromUnit.value, to: toUnit.value, category: cat };
      }
    }
  }
  return null;
}
import { useLocation } from 'react-router-dom';
import { IonButtons, IonBackButton, IonCard, IonCardContent, IonSearchbar, IonIcon } from '@ionic/react';
import {
  cube, scale, expand, thermometer, square, cash, codeSlash, carSport, flash, barbell, speedometer, time, batteryCharging, pulse, ellipse, fitness, trendingUp, restaurant, mic
} from 'ionicons/icons';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/react';

type Unit = { label: string; value: string };
type UnitsMap = { [key: string]: Unit[] };
const units: UnitsMap = {
  luminance: [
    { label: 'Nit', value: 'nt' },
    { label: 'Stilb', value: 'sb' },
    { label: 'Apostilb', value: 'asb' },
    { label: 'Candela/m²', value: 'cd/m2' },
  ],
  illuminance: [
    { label: 'Lux', value: 'lx' },
    { label: 'Lumen/m²', value: 'lm/m2' },
    { label: 'Foot-candle', value: 'fc' },
    { label: 'Phot', value: 'ph' },
  ],
  radiation: [
    { label: 'Gray', value: 'Gy' },
    { label: 'Sievert', value: 'Sv' },
    { label: 'Becquerel', value: 'Bq' },
    { label: 'Curie', value: 'Ci' },
  ],
  sound: [
    { label: 'Decibelio', value: 'dB' },
    { label: 'Sonio', value: 'sone' },
    { label: 'Fon', value: 'phon' },
  ],
  viscosity: [
    { label: 'Poise', value: 'P' },
    { label: 'Pascal·segundo', value: 'Pa·s' },
    { label: 'Centipoise', value: 'cP' },
  ],
  concentration: [
    { label: 'Molaridad (mol/L)', value: 'M' },
    { label: 'ppm', value: 'ppm' },
    { label: 'Porcentaje (%)', value: '%' },
  ],
  capacitance: [
    { label: 'Faradio', value: 'F' },
    { label: 'Microfaradio', value: 'μF' },
    { label: 'Nanofaradio', value: 'nF' },
    { label: 'Picofaradio', value: 'pF' },
  ],
  inductance: [
    { label: 'Henrio', value: 'H' },
    { label: 'Milihenrio', value: 'mH' },
    { label: 'Microhenrio', value: 'μH' },
  ],
  charge: [
    { label: 'Culombio', value: 'C' },
    { label: 'Amperio-hora', value: 'Ah' },
    { label: 'Miliamperio-hora', value: 'mAh' },
  ],
  resistance: [
    { label: 'Ohmio', value: 'Ω' },
    { label: 'Kiloohmio', value: 'kΩ' },
    { label: 'Megaohmio', value: 'MΩ' },
  ],
  conductance: [
    { label: 'Siemens', value: 'S' },
    { label: 'Mho', value: 'mho' },
  ],
  magneticfield: [
    { label: 'Tesla', value: 'T' },
    { label: 'Gauss', value: 'G' },
  ],
  magneticflux: [
    { label: 'Weber', value: 'Wb' },
    { label: 'Maxwell', value: 'Mx' },
  ],
  density: [
    { label: 'Kilogramo por metro cúbico', value: 'kg/m3' },
    { label: 'Gramo por centímetro cúbico', value: 'g/cm3' },
    { label: 'Gramo por mililitro', value: 'g/ml' },
    { label: 'Gramo por litro', value: 'g/l' },
    { label: 'Libra por pie cúbico', value: 'lb/ft3' },
    { label: 'Libra por galón (US)', value: 'lb/gal' },
    { label: 'Onza por pulgada cúbica', value: 'oz/in3' },
  ],
  length: [
    { label: 'Metros', value: 'm' },
    { label: 'Kilómetros', value: 'km' },
    { label: 'Centímetros', value: 'cm' },
    { label: 'Milímetros', value: 'mm' },
    { label: 'Micrómetros', value: 'um' },
    { label: 'Nanómetros', value: 'nm' },
    { label: 'Millas', value: 'mi' },
    { label: 'Yardas', value: 'yd' },
    { label: 'Pies', value: 'ft' },
    { label: 'Pulgadas', value: 'in' },
  ],
  weight: [
    { label: 'Kilogramos', value: 'kg' },
    { label: 'Gramos', value: 'g' },
    { label: 'Miligramo', value: 'mg' },
    { label: 'Tonelada', value: 't' },
    { label: 'Libras', value: 'lb' },
    { label: 'Onzas', value: 'oz' },
  ],
  volume: [
    { label: 'Litros', value: 'l' },
    { label: 'Mililitros', value: 'ml' },
    { label: 'Metros cúbicos', value: 'm3' },
    { label: 'Centímetros cúbicos', value: 'cm3' },
    { label: 'Pies cúbicos', value: 'ft3' },
    { label: 'Pulgadas cúbicas', value: 'in3' },
    { label: 'Galones (US)', value: 'gal' },
    { label: 'Barril', value: 'bbl' },
    { label: 'Cucharada', value: 'tbsp' },
    { label: 'Cucharadita', value: 'tsp' },
    { label: 'Taza', value: 'cup' },
  ],
  area: [
    { label: 'Metros cuadrados', value: 'm2' },
    { label: 'Kilómetros cuadrados', value: 'km2' },
    { label: 'Centímetros cuadrados', value: 'cm2' },
    { label: 'Milímetros cuadrados', value: 'mm2' },
    { label: 'Pies cuadrados', value: 'ft2' },
    { label: 'Pulgadas cuadradas', value: 'in2' },
    { label: 'Hectáreas', value: 'ha' },
    { label: 'Acres', value: 'ac' },
  ],
  speed: [
    { label: 'Metros por segundo', value: 'm/s' },
    { label: 'Kilómetros por hora', value: 'km/h' },
    { label: 'Millas por hora', value: 'mph' },
    { label: 'Nudos', value: 'kn' },
    { label: 'Pies por segundo', value: 'ft/s' },
  ],
  time: [
    { label: 'Segundos', value: 's' },
    { label: 'Minutos', value: 'min' },
    { label: 'Horas', value: 'h' },
    { label: 'Días', value: 'd' },
    { label: 'Semanas', value: 'wk' },
    { label: 'Años', value: 'yr' },
  ],
  temperature: [
    { label: 'Celsius', value: 'c' },
    { label: 'Fahrenheit', value: 'f' },
    { label: 'Kelvin', value: 'k' },
    { label: 'Rankine', value: 'r' },
  ],
  energy: [
    { label: 'Joules', value: 'j' },
    { label: 'Kilojoules', value: 'kj' },
    { label: 'Calorías', value: 'cal' },
    { label: 'Kilocalorías', value: 'kcal' },
    { label: 'Vatios-hora', value: 'wh' },
    { label: 'Kilovatios-hora', value: 'kwh' },
    { label: 'BTU', value: 'btu' },
    { label: 'Erg', value: 'erg' },
  ],
  power: [
    { label: 'Vatios', value: 'w' },
    { label: 'Kilovatios', value: 'kw' },
    { label: 'Megavatios', value: 'mw' },
    { label: 'Caballos de fuerza', value: 'hp' },
  ],
  pressure: [
    { label: 'Pascales', value: 'pa' },
    { label: 'Bar', value: 'bar' },
    { label: 'Atmósferas', value: 'atm' },
    { label: 'Milímetros de mercurio', value: 'mmhg' },
    { label: 'Libras por pulgada cuadrada', value: 'psi' },
  ],
  data: [
    { label: 'Bit', value: 'b' },
    { label: 'Byte', value: 'B' },
    { label: 'Kilobyte', value: 'KB' },
    { label: 'Megabyte', value: 'MB' },
    { label: 'Gigabyte', value: 'GB' },
    { label: 'Terabyte', value: 'TB' },
  ],
  currency: [
    { label: 'Dólar estadounidense', value: 'USD' },
    { label: 'Euro', value: 'EUR' },
    { label: 'Peso mexicano', value: 'MXN' },
    { label: 'Libra esterlina', value: 'GBP' },
    { label: 'Yen japonés', value: 'JPY' },
    { label: 'Real brasileño', value: 'BRL' },
    { label: 'Peso argentino', value: 'ARS' },
    { label: 'Sol peruano', value: 'PEN' },
  ],
  fuel: [
    { label: 'Kilómetros por litro', value: 'km/l' },
    { label: 'Litros por 100 km', value: 'l/100km' },
    { label: 'Millas por galón (US)', value: 'mpg' },
  ],
  frequency: [
    { label: 'Hertz', value: 'hz' },
    { label: 'Kilohertz', value: 'khz' },
    { label: 'Megahertz', value: 'mhz' },
    { label: 'Gigahertz', value: 'ghz' },
  ],
  angle: [
    { label: 'Grados', value: 'deg' },
    { label: 'Radianes', value: 'rad' },
    { label: 'Gradianes', value: 'gon' },
  ],
  force: [
    { label: 'Newton', value: 'n' },
    { label: 'Kilonewton', value: 'kn' },
    { label: 'Dina', value: 'dyn' },
    { label: 'Libra-fuerza', value: 'lbf' },
    { label: 'Kilogramo-fuerza', value: 'kgf' },
  ],
  acceleration: [
    { label: 'm/s²', value: 'm/s2' },
    { label: 'Gal', value: 'gal' },
    { label: 'Pie/s²', value: 'ft/s2' },
    { label: 'g (gravedad)', value: 'g' },
  ],
  cooking: [
    { label: 'Cucharadita', value: 'tsp' },
    { label: 'Cucharada', value: 'tbsp' },
    { label: 'Taza', value: 'cup' },
    { label: 'Onza líquida', value: 'floz' },
    { label: 'Pinta', value: 'pt' },
    { label: 'Cuarto', value: 'qt' },
    { label: 'Galón', value: 'gal' },
    { label: 'Mililitro', value: 'ml' },
    { label: 'Litro', value: 'l' },
  ],
  dimension: [
    { label: 'Dimensión 1', value: 'dim1' },
    { label: 'Dimensión 2', value: 'dim2' },
    { label: 'Dimensión 3', value: 'dim3' },
  ],
};


const categories = [
  { label: 'Luminancia', value: 'luminance' },
  { label: 'Iluminancia', value: 'illuminance' },
  { label: 'Radiación', value: 'radiation' },
  { label: 'Sonido', value: 'sound' },
  { label: 'Viscosidad', value: 'viscosity' },
  { label: 'Concentración', value: 'concentration' },
  { label: 'Capacitancia', value: 'capacitance' },
  { label: 'Inductancia', value: 'inductance' },
  { label: 'Carga eléctrica', value: 'charge' },
  { label: 'Resistencia eléctrica', value: 'resistance' },
  { label: 'Conductancia', value: 'conductance' },
  { label: 'Campo magnético', value: 'magneticfield' },
  { label: 'Flujo magnético', value: 'magneticflux' },
  { label: 'Densidad', value: 'density' },
  { label: 'Longitud', value: 'length' },
  { label: 'Masa', value: 'weight' },
  { label: 'Volumen', value: 'volume' },
  { label: 'Área', value: 'area' },
  { label: 'Velocidad', value: 'speed' },
  { label: 'Tiempo', value: 'time' },
  { label: 'Temperatura', value: 'temperature' },
  { label: 'Energía', value: 'energy' },
  { label: 'Potencia', value: 'power' },
  { label: 'Presión', value: 'pressure' },
  { label: 'Datos', value: 'data' },
  { label: 'Moneda', value: 'currency' },
  { label: 'Combustible', value: 'fuel' },
  { label: 'Frecuencia', value: 'frequency' },
  { label: 'Ángulo', value: 'angle' },
  { label: 'Fuerza', value: 'force' },
  { label: 'Aceleración', value: 'acceleration' },
  { label: 'Cocina', value: 'cooking' },
  { label: 'Dimensión', value: 'dimension' },
];

// ...existing code...


function convert(category: string, value: number, from: string, to: string): number {
  // Categorías no implementadas: devolver el mismo valor
  if ([
    'luminance','illuminance','radiation','sound','viscosity','concentration','capacitance','inductance','charge','resistance','conductance','magneticfield','magneticflux'
  ].includes(category)) {
    // No implementado, devolver el mismo valor
    return value;
  }
  // Densidad
  if (category === 'density') {
    // Convertir primero a kg/m3
    let base = value;
    switch (from) {
      case 'g/cm3': base = value * 1000; break;
      case 'g/ml': base = value * 1000; break;
      case 'g/l': base = value; break;
      case 'lb/ft3': base = value * 16.0185; break;
      case 'lb/gal': base = value * 119.826; break;
      case 'oz/in3': base = value * 1729.99; break;
      default: break;
    }
    switch (to) {
      case 'g/cm3': return base / 1000;
      case 'g/ml': return base / 1000;
      case 'g/l': return base;
      case 'lb/ft3': return base / 16.0185;
      case 'lb/gal': return base / 119.826;
      case 'oz/in3': return base / 1729.99;
      default: return base;
    }
  }
  // Longitud
  if (category === 'length') {
    let meters = value;
    switch (from) {
      case 'km': meters = value * 1000; break;
      case 'cm': meters = value / 100; break;
      case 'mm': meters = value / 1000; break;
      case 'um': meters = value / 1e6; break;
      case 'nm': meters = value / 1e9; break;
      case 'mi': meters = value * 1609.34; break;
      case 'yd': meters = value * 0.9144; break;
      case 'ft': meters = value * 0.3048; break;
      case 'in': meters = value * 0.0254; break;
      default: break;
    }
    switch (to) {
      case 'km': return meters / 1000;
      case 'cm': return meters * 100;
      case 'mm': return meters * 1000;
      case 'um': return meters * 1e6;
      case 'nm': return meters * 1e9;
      case 'mi': return meters / 1609.34;
      case 'yd': return meters / 0.9144;
      case 'ft': return meters / 0.3048;
      case 'in': return meters / 0.0254;
      default: return meters;
    }
  }
  // Masa
  if (category === 'weight') {
    let kg = value;
    switch (from) {
      case 'g': kg = value / 1000; break;
      case 'mg': kg = value / 1e6; break;
      case 't': kg = value * 1000; break;
      case 'lb': kg = value * 0.453592; break;
      case 'oz': kg = value * 0.0283495; break;
      default: break;
    }
    switch (to) {
      case 'g': return kg * 1000;
      case 'mg': return kg * 1e6;
      case 't': return kg / 1000;
      case 'lb': return kg / 0.453592;
      case 'oz': return kg / 0.0283495;
      default: return kg;
    }
  }
  // Volumen
  if (category === 'volume') {
    let liters = value;
    switch (from) {
      case 'ml': liters = value / 1000; break;
      case 'm3': liters = value * 1000; break;
      case 'cm3': liters = value / 1000; break;
      case 'ft3': liters = value * 28.3168; break;
      case 'in3': liters = value * 0.0163871; break;
      case 'gal': liters = value * 3.78541; break;
      case 'bbl': liters = value * 158.987; break;
      case 'tbsp': liters = value * 0.0147868; break;
      case 'tsp': liters = value * 0.00492892; break;
      case 'cup': liters = value * 0.24; break;
      default: break;
    }
    switch (to) {
      case 'ml': return liters * 1000;
      case 'm3': return liters / 1000;
      case 'cm3': return liters * 1000;
      case 'ft3': return liters / 28.3168;
      case 'in3': return liters / 0.0163871;
      case 'gal': return liters / 3.78541;
      case 'bbl': return liters / 158.987;
      case 'tbsp': return liters / 0.0147868;
      case 'tsp': return liters / 0.00492892;
      case 'cup': return liters / 0.24;
      default: return liters;
    }
  }
  // Área
  if (category === 'area') {
    let m2 = value;
    switch (from) {
      case 'km2': m2 = value * 1e6; break;
      case 'cm2': m2 = value / 10000; break;
      case 'mm2': m2 = value / 1e6; break;
      case 'ft2': m2 = value * 0.092903; break;
      case 'in2': m2 = value * 0.00064516; break;
      case 'ha': m2 = value * 10000; break;
      case 'ac': m2 = value * 4046.86; break;
      default: break;
    }
    switch (to) {
      case 'km2': return m2 / 1e6;
      case 'cm2': return m2 * 10000;
      case 'mm2': return m2 * 1e6;
      case 'ft2': return m2 / 0.092903;
      case 'in2': return m2 / 0.00064516;
      case 'ha': return m2 / 10000;
      case 'ac': return m2 / 4046.86;
      default: return m2;
    }
  }
  // Velocidad
  if (category === 'speed') {
    let mps = value;
    switch (from) {
      case 'km/h': mps = value / 3.6; break;
      case 'mph': mps = value * 0.44704; break;
      case 'kn': mps = value * 0.514444; break;
      case 'ft/s': mps = value * 0.3048; break;
      default: break;
    }
    switch (to) {
      case 'km/h': return mps * 3.6;
      case 'mph': return mps / 0.44704;
      case 'kn': return mps / 0.514444;
      case 'ft/s': return mps / 0.3048;
      default: return mps;
    }
  }
  // Tiempo
  if (category === 'time') {
    let seconds = value;
    switch (from) {
      case 'min': seconds = value * 60; break;
      case 'h': seconds = value * 3600; break;
      case 'd': seconds = value * 86400; break;
      case 'wk': seconds = value * 604800; break;
      case 'yr': seconds = value * 31536000; break;
      default: break;
    }
    switch (to) {
      case 'min': return seconds / 60;
      case 'h': return seconds / 3600;
      case 'd': return seconds / 86400;
      case 'wk': return seconds / 604800;
      case 'yr': return seconds / 31536000;
      default: return seconds;
    }
  }
  // Temperatura
  if (category === 'temperature') {
    let celsius = value;
    switch (from) {
      case 'f': celsius = (value - 32) * 5/9; break;
      case 'k': celsius = value - 273.15; break;
      case 'r': celsius = (value - 491.67) * 5/9; break;
      default: break;
    }
    switch (to) {
      case 'f': return celsius * 9/5 + 32;
      case 'k': return celsius + 273.15;
      case 'r': return (celsius + 273.15) * 9/5;
      default: return celsius;
    }
  }
  // Energía
  if (category === 'energy') {
    let joules = value;
    switch (from) {
      case 'kj': joules = value * 1000; break;
      case 'cal': joules = value * 4.184; break;
      case 'kcal': joules = value * 4184; break;
      case 'wh': joules = value * 3600; break;
      case 'kwh': joules = value * 3.6e6; break;
      case 'btu': joules = value * 1055.06; break;
      case 'erg': joules = value * 1e-7; break;
      default: break;
    }
    switch (to) {
      case 'kj': return joules / 1000;
      case 'cal': return joules / 4.184;
      case 'kcal': return joules / 4184;
      case 'wh': return joules / 3600;
      case 'kwh': return joules / 3.6e6;
      case 'btu': return joules / 1055.06;
      case 'erg': return joules / 1e-7;
      default: return joules;
    }
  }
  // Potencia
  if (category === 'power') {
    let watts = value;
    switch (from) {
      case 'kw': watts = value * 1000; break;
      case 'mw': watts = value * 1e6; break;
      case 'hp': watts = value * 745.7; break;
      default: break;
    }
    switch (to) {
      case 'kw': return watts / 1000;
      case 'mw': return watts / 1e6;
      case 'hp': return watts / 745.7;
      default: return watts;
    }
  }
  // Presión
  if (category === 'pressure') {
    let pa = value;
    switch (from) {
      case 'bar': pa = value * 1e5; break;
      case 'atm': pa = value * 101325; break;
      case 'mmhg': pa = value * 133.322; break;
      case 'psi': pa = value * 6894.76; break;
      default: break;
    }
    switch (to) {
      case 'bar': return pa / 1e5;
      case 'atm': return pa / 101325;
      case 'mmhg': return pa / 133.322;
      case 'psi': return pa / 6894.76;
      default: return pa;
    }
  }
  // Datos
  if (category === 'data') {
    let bytes = value;
    switch (from) {
      case 'b': bytes = value / 8; break;
      case 'KB': bytes = value * 1024; break;
      case 'MB': bytes = value * 1024 * 1024; break;
      case 'GB': bytes = value * 1024 * 1024 * 1024; break;
      case 'TB': bytes = value * 1024 * 1024 * 1024 * 1024; break;
      default: break;
    }
    switch (to) {
      case 'b': return bytes * 8;
      case 'KB': return bytes / 1024;
      case 'MB': return bytes / (1024 * 1024);
      case 'GB': return bytes / (1024 * 1024 * 1024);
      case 'TB': return bytes / (1024 * 1024 * 1024 * 1024);
      default: return bytes;
    }
  }
  // Moneda (conversión usando tasas reales)
  if (category === 'currency') {
    if (from === to) return value;
    if (currencyRates && currencyRates[from] && currencyRates[to]) {
      // Convertir a EUR base y luego a destino
      const valueInBase = value / currencyRates[from];
      return valueInBase * currencyRates[to];
    }
    // Si no hay tasas, devolver el mismo valor
    return value;
  }
// Variable global para tasas de cambio
let currencyRates: { [key: string]: number } = {};

  const [currencyLoading, setCurrencyLoading] = useState(false);
  const [currencyError, setCurrencyError] = useState<string | null>(null);

  // Fetch currency rates when category is 'currency' or units change
  React.useEffect(() => {
    if (category === 'currency') {
      setCurrencyLoading(true);
      setCurrencyError(null);
      fetch('https://api.exchangerate.host/latest?base=EUR')
        .then(res => res.json())
        .then(data => {
          if (data && data.rates) {
            currencyRates = { ...data.rates, EUR: 1 };
            setCurrencyLoading(false);
          } else {
            setCurrencyError('No se pudieron obtener tasas de cambio.');
            setCurrencyLoading(false);
          }
        })
        .catch(() => {
          setCurrencyError('No se pudieron obtener tasas de cambio.');
          setCurrencyLoading(false);
        });
    }
  }, [category, fromUnit, toUnit]);
  // Combustible
  if (category === 'fuel') {
    // Convertir a km/l como base
    let kml = value;
    switch (from) {
      case 'l/100km': kml = 100 / value; break;
      case 'mpg': kml = value * 0.425144; break;
      default: break;
    }
    switch (to) {
      case 'l/100km': return 100 / kml;
      case 'mpg': return kml / 0.425144;
      default: return kml;
    }
  }
  // Frecuencia
  if (category === 'frequency') {
    let hz = value;
    switch (from) {
      case 'khz': hz = value * 1e3; break;
      case 'mhz': hz = value * 1e6; break;
      case 'ghz': hz = value * 1e9; break;
      default: break;
    }
    switch (to) {
      case 'khz': return hz / 1e3;
      case 'mhz': return hz / 1e6;
      case 'ghz': return hz / 1e9;
      default: return hz;
    }
  }
  // Ángulo
  if (category === 'angle') {
    let deg = value;
    switch (from) {
      case 'rad': deg = value * (180 / Math.PI); break;
      case 'gon': deg = value * 0.9; break;
      default: break;
    }
    switch (to) {
      case 'rad': return deg * (Math.PI / 180);
      case 'gon': return deg / 0.9;
      default: return deg;
    }
  }
  // Fuerza
  if (category === 'force') {
    let newton = value;
    switch (from) {
      case 'kn': newton = value * 1000; break;
      case 'dyn': newton = value * 1e-5; break;
      case 'lbf': newton = value * 4.44822; break;
      case 'kgf': newton = value * 9.80665; break;
      default: break;
    }
    switch (to) {
      case 'kn': return newton / 1000;
      case 'dyn': return newton / 1e-5;
      case 'lbf': return newton / 4.44822;
      case 'kgf': return newton / 9.80665;
      default: return newton;
    }
  }
  // Aceleración
  if (category === 'acceleration') {
    let ms2 = value;
    switch (from) {
      case 'gal': ms2 = value * 0.01; break;
      case 'ft/s2': ms2 = value * 0.3048; break;
      case 'g': ms2 = value * 9.80665; break;
      default: break;
    }
    switch (to) {
      case 'gal': return ms2 / 0.01;
      case 'ft/s2': return ms2 / 0.3048;
      case 'g': return ms2 / 9.80665;
      default: return ms2;
    }
  }
  // Cocina (usa volumen como base)
  if (category === 'cooking') {
    // Reutiliza la lógica de volumen
    return convert('volume', value, from, to);
  }
  // Dimensión (sin conversión real, solo ejemplo)
  if (category === 'dimension') {
    return value;
  }
  return value;
}


const getCategoryFromQuery = (search: string) => {
  const params = new URLSearchParams(search);
  const cat = params.get('cat');
  // Permitir cualquier categoría válida del objeto units
  if (cat && Object.keys(units).includes(cat)) return cat;
  return 'length';
};


const MeasureConverter: React.FC = () => {
  const location = useLocation();
  const [category, setCategory] = useState(() => getCategoryFromQuery(location.search));
  const [fromUnit, setFromUnit] = useState(units[getCategoryFromQuery(location.search)][0].value);
  const [toUnit, setToUnit] = useState(units[getCategoryFromQuery(location.search)][1]?.value || units[getCategoryFromQuery(location.search)][0].value);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  // Cargar historial al iniciar
  React.useEffect(() => {
    const stored = localStorage.getItem('conversionHistory');
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  React.useEffect(() => {
    const cat = getCategoryFromQuery(location.search);
    setCategory(cat);
    // Solo resetear unidades si la categoría no tiene las unidades actuales
    const currentFromExists = units[cat].some(u => u.value === fromUnit);
    const currentToExists = units[cat].some(u => u.value === toUnit);
    
    if (!currentFromExists) {
      setFromUnit(units[cat][0].value);
    }
    if (!currentToExists) {
      setToUnit(units[cat][1]?.value || units[cat][0].value);
    }
    
    setSearch('');
  }, [location.search, fromUnit, toUnit]);

  // Conversión automática cuando cambian input, fromUnit o toUnit
  React.useEffect(() => {
    if (input && !isNaN(parseFloat(input)) && fromUnit !== toUnit) {
      const value = parseFloat(input);
      const res = convert(category, value, fromUnit, toUnit);
      setResult(res);
    } else if (!input) {
      setResult(null);
    }
  }, [input, fromUnit, toUnit, category]);

  const handleConvert = () => {
    const value = parseFloat(input);
    if (!isNaN(value)) {
      const res = convert(category, value, fromUnit, toUnit);
      setResult(res);
      // Guardar en historial SIEMPRE que se presione convertir
      const labelFrom = units[category].find((u: Unit) => u.value === fromUnit)?.label || fromUnit;
      const labelTo = units[category].find((u: Unit) => u.value === toUnit)?.label || toUnit;
      const labelCat = categories.find(c => c.value === category)?.label || category;
      const entry = `${labelCat}: ${value} ${labelFrom} → ${res} ${labelTo}`;
      const newHistory = [entry, ...history].slice(0, 30);
      setHistory(newHistory);
      localStorage.setItem('conversionHistory', JSON.stringify(newHistory));
    }
  };

  // Función para intercambiar unidades
  const swapUnits = () => {
    const tempFromUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempFromUnit);
    
    // Si hay un resultado, intercambiar también el input y resultado
    if (result !== null && input) {
      setInput(result.toString());
    }
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Cuando cambia el transcript, intentar parsear y autollenar

  React.useEffect(() => {
    if (transcript) {
      const parsed = parseSpeech(transcript, units, categories);
      if (parsed) {
        setInput(parsed.value);
        setFromUnit(parsed.from);
        setToUnit(parsed.to);
        if (parsed.category !== category) {
          setCategory(parsed.category);
        }
        // Ejecutar conversión automáticamente
        setTimeout(() => {
          const value = parseFloat(parsed.value);
          if (!isNaN(value)) {
            const res = convert(parsed.category, value, parsed.from, parsed.to);
            setResult(res);
            // Guardar en historial
            const labelFrom = units[parsed.category].find((u: Unit) => u.value === parsed.from)?.label || parsed.from;
            const labelTo = units[parsed.category].find((u: Unit) => u.value === parsed.to)?.label || parsed.to;
            const labelCat = categories.find(c => c.value === parsed.category)?.label || parsed.category;
            const entry = `${labelCat}: ${value} ${labelFrom} → ${res} ${labelTo}`;
            const newHistory = [entry, ...history].slice(0, 30);
            setHistory(newHistory);
            localStorage.setItem('conversionHistory', JSON.stringify(newHistory));
          }
        }, 300);
      }
    }
    // eslint-disable-next-line
  }, [transcript]);


  const handleVoice = () => {
    if (!browserSupportsSpeechRecognition) {
      alert('El reconocimiento de voz no es compatible con este navegador.');
      return;
    }
    resetTranscript();
    SpeechRecognition.startListening({ language: 'es-ES' });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="Categorías" />
          </IonButtons>
          <IonTitle style={{ fontWeight: 700, fontSize: 22 }}>Convertidor de unidades</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* Detectar modo oscuro con Ionic */}
      <IonContent className="ion-padding" style={{ background: document.body.classList.contains('dark') ? '#23272f' : '#f6f6fa' }}>
        <div style={{ margin: '16px 0' }}>
          <IonSearchbar
            placeholder="Buscar unidad (ej: densidad, fuerza...)"
            value={search}
            onIonInput={e => setSearch((e.target as HTMLIonSearchbarElement).value || '')}
            style={{ borderRadius: 12 }}
          />
        </div>
        <IonCard style={{ borderRadius: 18, boxShadow: '0 2px 8px #0001', marginBottom: 24, padding: '12px 0' }}>
          <IonCardContent>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 18, marginTop: 6 }}>Conversor de {categories.find(c => c.value === category)?.label || category.charAt(0).toUpperCase() + category.slice(1)}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {category === 'currency' && (
                <div style={{ marginBottom: 10 }}>
                  {currencyLoading && <span style={{ color: '#1976d2', fontWeight: 500 }}>Cargando tasas de cambio...</span>}
                  {currencyError && <span style={{ color: 'crimson', fontWeight: 500 }}>{currencyError}</span>}
                  {!currencyLoading && !currencyError && (
                    <>
                      <span style={{ color: '#1976d2', fontWeight: 500 }}>Tasas de cambio actualizadas en tiempo real</span>
                      {fromUnit && toUnit && fromUnit !== toUnit && currencyRates[fromUnit] && currencyRates[toUnit] && (
                        <div style={{ marginTop: 4, fontSize: 15, color: '#444', fontWeight: 500 }}>
                          1 {fromUnit} = {((1 / currencyRates[fromUnit]) * currencyRates[toUnit]).toFixed(4)} {toUnit}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
              {/* Selector DE con estilo mejorado */}
              <div style={{
                background: 'linear-gradient(135deg, #e3f2fd, #ffffff)',
                borderRadius: '16px',
                padding: '16px',
                border: '2px solid #2196f3',
                boxShadow: '0 4px 16px rgba(33,150,243,0.2)',
                transition: 'all 0.3s ease',
                animation: 'slide-up 0.4s ease-out'
              }}>
                <IonItem lines="none" style={{ '--background': 'transparent' }}>
                  <IonLabel style={{ 
                    fontWeight: 700, 
                    color: '#1976d2',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    🔄 Convertir de
                  </IonLabel>
                  <IonSelect 
                    value={fromUnit} 
                    onIonChange={e => setFromUnit(e.detail.value)} 
                    interface="popover"
                    style={{ 
                      fontWeight: 600,
                      fontSize: '16px',
                      '--color': '#1565c0'
                    }}
                  >
                    {units[category].filter((u: Unit) => u.label.toLowerCase().includes(search.toLowerCase())).map((unit: Unit) => (
                      <IonSelectOption key={unit.value} value={unit.value}>{unit.label}</IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </div>
              
              {/* Botón para intercambiar unidades con animación mejorada */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                margin: '16px 0',
                position: 'relative'
              }}>
                <IonButton 
                  fill="solid" 
                  size="large" 
                  onClick={swapUnits}
                  className="dynamic-button"
                  style={{ 
                    fontSize: '24px', 
                    minHeight: '56px',
                    minWidth: '56px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ff9800, #ff5722)',
                    boxShadow: '0 6px 20px rgba(255,152,0,0.4)',
                    transform: 'scale(1)',
                    transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.15) rotate(180deg)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(255,152,0,0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,152,0,0.4)';
                  }}
                >
                  ⇄
                </IonButton>
              </div>
              
              {/* Selector A con estilo mejorado */}
              <div style={{
                background: 'linear-gradient(135deg, #e8f5e8, #ffffff)',
                borderRadius: '16px',
                padding: '16px',
                border: '2px solid #4caf50',
                boxShadow: '0 4px 16px rgba(76,175,80,0.2)',
                transition: 'all 0.3s ease',
                animation: 'slide-up 0.6s ease-out'
              }}>
                <IonItem lines="none" style={{ '--background': 'transparent' }}>
                  <IonLabel style={{ 
                    fontWeight: 700, 
                    color: '#2e7d32',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    🎯 Convertir a
                  </IonLabel>
                  <IonSelect 
                    value={toUnit} 
                    onIonChange={e => setToUnit(e.detail.value)} 
                    interface="popover"
                    style={{ 
                      fontWeight: 600,
                      fontSize: '16px',
                      '--color': '#388e3c'
                    }}
                  >
                    {units[category].filter((u: Unit) => u.label.toLowerCase().includes(search.toLowerCase())).map((unit: Unit) => (
                      <IonSelectOption key={unit.value} value={unit.value}>{unit.label}</IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </div>
              {/* Entrada de valor con diseño dinámico */}
              <div style={{
                marginBottom: 24,
                borderRadius: 20,
                padding: '24px 16px',
                background: 'linear-gradient(135deg, #f8f9fa, #ffffff)',
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #1976d2, #42a5f5)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'content-box, border-box',
                boxShadow: '0 8px 24px rgba(25,118,210,0.15)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Efecto de brillo */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                  transform: 'rotate(-45deg)',
                  animation: result !== null ? 'shine 2s infinite' : 'none'
                }} />
                
                <div style={{ 
                  position: 'relative', 
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <label htmlFor="valor-input" style={{ 
                    fontSize: 20, 
                    fontWeight: 700, 
                    color: '#1976d2',
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    letterSpacing: '0.5px'
                  }}>
                    💰 Valor a convertir
                  </label>
                  
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
                    <input
                      id="valor-input"
                      type="number"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      style={{
                        width: '100%',
                        maxWidth: 240,
                        borderRadius: 16,
                        border: '3px solid transparent',
                        background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #1976d2, #42a5f5) border-box',
                        padding: '18px 20px',
                        fontSize: 24,
                        fontWeight: 700,
                        textAlign: 'center',
                        outline: 'none',
                        color: '#1976d2',
                        letterSpacing: '1px',
                        boxShadow: 'inset 0 2px 8px rgba(25,118,210,0.1)',
                        transition: 'all 0.3s ease',
                        transform: input ? 'scale(1.02)' : 'scale(1)'
                      }}
                      inputMode="decimal"
                      autoComplete="off"
                      pattern="[0-9]*"
                      min="0"
                      step="any"
                      placeholder="0.00"
                      onFocus={(e) => {
                        e.target.style.transform = 'scale(1.05)';
                        e.target.style.boxShadow = 'inset 0 2px 12px rgba(25,118,210,0.2), 0 0 20px rgba(25,118,210,0.3)';
                      }}
                      onBlur={(e) => {
                        e.target.style.transform = input ? 'scale(1.02)' : 'scale(1)';
                        e.target.style.boxShadow = 'inset 0 2px 8px rgba(25,118,210,0.1)';
                      }}
                    />
                    
                    <IonButton 
                      onClick={handleVoice} 
                      color={listening ? 'danger' : 'primary'} 
                      style={{ 
                        borderRadius: '50%', 
                        minWidth: 56, 
                        width: 56, 
                        height: 56, 
                        padding: 0,
                        boxShadow: '0 4px 16px rgba(25,118,210,0.3)',
                        transform: listening ? 'scale(1.1)' : 'scale(1)',
                        transition: 'all 0.3s ease',
                        background: listening ? 'linear-gradient(135deg, #f44336, #e57373)' : 'linear-gradient(135deg, #1976d2, #42a5f5)'
                      }}
                    >
                      <IonIcon 
                        icon={mic} 
                        style={{ 
                          fontSize: 28,
                          animation: listening ? 'pulse 1s infinite' : 'none'
                        }} 
                      />
                    </IonButton>
                  </div>
                  
                  {listening && (
                    <div style={{ 
                      marginTop: 8, 
                      padding: '12px 16px',
                      background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
                      borderRadius: '12px',
                      color: '#1565c0', 
                      fontWeight: 600, 
                      fontSize: 16,
                      textAlign: 'center',
                      border: '2px solid #2196f3',
                      animation: 'glow 2s infinite alternate'
                    }}>
                      🎤 Escuchando... 
                      {transcript && (
                        <div style={{ 
                          fontSize: 14, 
                          color: '#1976d2', 
                          marginTop: 4,
                          fontStyle: 'italic'
                        }}>
                          "{transcript}"
                        </div>
                      )}
                    </div>
                  )}
                  
                  {!browserSupportsSpeechRecognition && (
                    <div style={{ 
                      marginTop: 12, 
                      padding: '12px',
                      background: 'linear-gradient(135deg, #ffebee, #ffcdd2)',
                      borderRadius: '12px',
                      color: '#c62828', 
                      fontWeight: 500, 
                      fontSize: 14,
                      textAlign: 'center',
                      border: '2px solid #f44336'
                    }}>
                      ⚠️ Tu navegador no soporta reconocimiento de voz
                    </div>
                  )}
                </div>
              </div>
              
              {/* Botón de conversión dinámico */}
              <IonButton 
                expand="block" 
                onClick={handleConvert} 
                style={{ 
                  marginTop: 20, 
                  marginBottom: 8, 
                  fontWeight: 700, 
                  fontSize: 18,
                  borderRadius: '16px',
                  height: '56px',
                  background: result !== null 
                    ? 'linear-gradient(135deg, #4caf50, #66bb6a)' 
                    : 'linear-gradient(135deg, #1976d2, #42a5f5)',
                  boxShadow: '0 6px 20px rgba(25,118,210,0.4)',
                  transform: input ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  letterSpacing: '1px'
                }}
              >
                {result !== null ? '🔄 RECONVERTIR' : '⚡ CONVERTIR'}
              </IonButton>
            </div>
            {result !== null && (
              <IonCard style={{ 
                marginTop: 22, 
                borderRadius: 20, 
                background: 'linear-gradient(135deg, #e8f5e8, #f1f8e9)',
                border: '2px solid #4caf50',
                boxShadow: '0 8px 24px rgba(76,175,80,0.3)',
                overflow: 'hidden',
                position: 'relative'
              }}>
                {/* Efecto de celebración */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #4caf50, #66bb6a, #81c784, #66bb6a, #4caf50)',
                  backgroundSize: '200% 100%',
                  animation: 'gradient-move 3s ease infinite'
                }} />
                
                <IonCardContent style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '20px',
                  position: 'relative'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontWeight: 600, 
                      fontSize: 18, 
                      color: '#2e7d32',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      🎯 Resultado:
                    </div>
                    <div style={{ 
                      fontSize: 24, 
                      fontWeight: 700, 
                      color: '#1b5e20',
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                      letterSpacing: '0.5px'
                    }}>
                      {result} {units[category].find((u: Unit) => u.value === toUnit)?.label || toUnit}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <IonButton 
                      fill="clear" 
                      size="small" 
                      onClick={() => {
                        navigator.clipboard?.writeText(result.toString());
                      }}
                      style={{ 
                        '--color': '#2e7d32',
                        fontSize: '20px',
                        minWidth: '44px',
                        minHeight: '44px',
                        borderRadius: '50%',
                        background: 'rgba(46,125,50,0.1)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(46,125,50,0.2)';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(46,125,50,0.1)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      📋
                    </IonButton>
                    
                    <IonButton 
                      fill="clear" 
                      size="small" 
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: 'Resultado de conversión',
                            text: `${input} ${units[category].find((u: Unit) => u.value === fromUnit)?.label} = ${result} ${units[category].find((u: Unit) => u.value === toUnit)?.label}`
                          });
                        }
                      }}
                      style={{ 
                        '--color': '#2e7d32',
                        fontSize: '20px',
                        minWidth: '44px',
                        minHeight: '44px',
                        borderRadius: '50%',
                        background: 'rgba(46,125,50,0.1)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      📤
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            )}
            {/* Mostrar tasa de conversión para área */}
            {category === 'area' && fromUnit !== toUnit && (
              <IonCard color="light" style={{ marginTop: 12, borderRadius: 12, background: '#f5f5f5' }}>
                <IonCardContent>
                  <span style={{ fontSize: 15 }}>
                    1 {units[category].find((u: Unit) => u.value === fromUnit)?.label} = {convert('area', 1, fromUnit, toUnit)} {units[category].find((u: Unit) => u.value === toUnit)?.label}
                  </span>
                </IonCardContent>
              </IonCard>
            )}
          </IonCardContent>
        </IonCard>

        {/* Historial de conversiones */}
        <IonCard style={{ borderRadius: 16, marginBottom: 24, background: '#f8f9fa', boxShadow: '0 2px 8px #0001' }}>
          <IonCardContent>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, color: '#1976d2' }}>Historial de conversiones</div>
            {history.length === 0 ? (
              <div style={{ color: '#888', fontSize: 15 }}>No hay conversiones recientes.</div>
            ) : (
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                {history.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: 6, fontSize: 15, color: '#333' }}>{item}</li>
                ))}
              </ul>
            )}
          </IonCardContent>
        </IonCard>

        <div style={{marginTop: 8, marginBottom: 24}}>
          <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, color: 'var(--ion-text-color, #444)' }}>
            Factores de conversión para {categories.find(c => c.value === category)?.label || category}:
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '22px 18px',
              marginTop: 12,
              justifyItems: 'center',
              alignItems: 'stretch',
              width: '100%',
              padding: '0 2px',
            }}
          >
            {units[category]?.map((unit: Unit, idx: number) => {
              // ...existing code...
              const iconMap = {
                length: expand,
                weight: scale,
                volume: cube,
                area: square,
                speed: speedometer,
                time: time,
                temperature: thermometer,
                energy: batteryCharging,
                power: flash,
                pressure: barbell,
                data: codeSlash,
                currency: cash,
                fuel: carSport,
                frequency: pulse,
                angle: ellipse,
                force: fitness,
                acceleration: trendingUp,
                cooking: restaurant,
                dimension: cube,
              };
              // ...existing code...
              const lightColors = ['#ffe066','#63e6be','#ffd6e0','#b9e769','#a5d8ff','#ffd43b','#ffa94d','#b197fc','#fab005','#d0bfff','#f783ac','#e0f2fe','#f1f3f5'];
              const darkColors = ['#7c6f00','#0b5e4a','#7c3a4a','#4a5c1a','#1a3a5c','#7c6f00','#7c4a00','#4a3a7c','#7c5c00','#4a3a7c','#7c1a4a','#1a3a5c','#23272f'];
              const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
              const bgColor = prefersDark ? darkColors[idx % darkColors.length] : lightColors[idx % lightColors.length];
              const textColor = prefersDark ? '#f1f3f5' : '#222';
              const subTextColor = prefersDark ? '#bdbdbd' : '#555';
              return (
                <div key={unit.value} style={{
                  background: bgColor,
                  borderRadius: '16px',
                  padding: '12px 8px 10px 8px',
                  fontSize: '16px',
                  color: '#fff',
                  boxShadow: '0 2px 8px #0006',
                  minWidth: '0',
                  width: 110,
                  height: 110,
                  maxWidth: 130,
                  textAlign: 'center',
                  position: 'relative',
                  margin: '0 auto',
                  transition: 'transform 0.1s, box-shadow 0.2s',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                }}>
                  <div style={{ fontSize: 28, marginBottom: 8, color: '#fff' }}>
                    <IonIcon icon={iconMap[category as keyof typeof iconMap] || cube} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#fff', textShadow: document.body.classList.contains('dark') ? '0 1px 2px #000a' : 'none', marginBottom: 2, lineHeight: 1.2 }}>{unit.label}</div>
                  <div style={{ fontSize: 13, color: '#fff', opacity: 0.85 }}>{unit.value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MeasureConverter;
