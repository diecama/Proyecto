// utils/units.js
// Incluye lógica para longitud, masa, temperatura, área, volumen, velocidad, presión, energía, tiempo, etc.

const UNITS = [
  // Longitud
  { key: 'meter', name: 'Metro', symbol: 'm', type: 'length', to_base: 1 },
  { key: 'kilometer', name: 'Kilómetro', symbol: 'km', type: 'length', to_base: 1000 },
  { key: 'centimeter', name: 'Centímetro', symbol: 'cm', type: 'length', to_base: 0.01 },
  { key: 'millimeter', name: 'Milímetro', symbol: 'mm', type: 'length', to_base: 0.001 },
  { key: 'mile', name: 'Milla', symbol: 'mi', type: 'length', to_base: 1609.34 },
  { key: 'yard', name: 'Yarda', symbol: 'yd', type: 'length', to_base: 0.9144 },
  { key: 'foot', name: 'Pie', symbol: 'ft', type: 'length', to_base: 0.3048 },
  { key: 'inch', name: 'Pulgada', symbol: 'in', type: 'length', to_base: 0.0254 },
  // Masa
  { key: 'kilogram', name: 'Kilogramo', symbol: 'kg', type: 'mass', to_base: 1 },
  { key: 'gram', name: 'Gramo', symbol: 'g', type: 'mass', to_base: 0.001 },
  { key: 'milligram', name: 'Miligramo', symbol: 'mg', type: 'mass', to_base: 0.000001 },
  { key: 'ton', name: 'Tonelada', symbol: 't', type: 'mass', to_base: 1000 },
  { key: 'pound', name: 'Libra', symbol: 'lb', type: 'mass', to_base: 0.453592 },
  { key: 'ounce', name: 'Onza', symbol: 'oz', type: 'mass', to_base: 0.0283495 },
  // Temperatura (requiere lógica especial)
  { key: 'celsius', name: 'Celsius', symbol: '°C', type: 'temperature' },
  { key: 'fahrenheit', name: 'Fahrenheit', symbol: '°F', type: 'temperature' },
  { key: 'kelvin', name: 'Kelvin', symbol: 'K', type: 'temperature' },
  // Área
  { key: 'square_meter', name: 'Metro cuadrado', symbol: 'm²', type: 'area', to_base: 1 },
  { key: 'square_kilometer', name: 'Kilómetro cuadrado', symbol: 'km²', type: 'area', to_base: 1e6 },
  { key: 'square_centimeter', name: 'Centímetro cuadrado', symbol: 'cm²', type: 'area', to_base: 0.0001 },
  { key: 'square_mile', name: 'Milla cuadrada', symbol: 'mi²', type: 'area', to_base: 2.59e6 },
  { key: 'hectare', name: 'Hectárea', symbol: 'ha', type: 'area', to_base: 10000 },
  { key: 'acre', name: 'Acre', symbol: 'ac', type: 'area', to_base: 4046.86 },
  // Volumen
  { key: 'liter', name: 'Litro', symbol: 'L', type: 'volume', to_base: 1 },
  { key: 'milliliter', name: 'Mililitro', symbol: 'mL', type: 'volume', to_base: 0.001 },
  { key: 'cubic_meter', name: 'Metro cúbico', symbol: 'm³', type: 'volume', to_base: 1000 },
  { key: 'cubic_centimeter', name: 'Centímetro cúbico', symbol: 'cm³', type: 'volume', to_base: 0.001 },
  { key: 'gallon', name: 'Galón', symbol: 'gal', type: 'volume', to_base: 3.78541 },
  { key: 'pint', name: 'Pinta', symbol: 'pt', type: 'volume', to_base: 0.473176 },
  // Velocidad
  { key: 'meter_per_second', name: 'Metro/segundo', symbol: 'm/s', type: 'speed', to_base: 1 },
  { key: 'kilometer_per_hour', name: 'Kilómetro/hora', symbol: 'km/h', type: 'speed', to_base: 0.277778 },
  { key: 'mile_per_hour', name: 'Milla/hora', symbol: 'mph', type: 'speed', to_base: 0.44704 },
  { key: 'knot', name: 'Nudo', symbol: 'kn', type: 'speed', to_base: 0.514444 },
  // Presión
  { key: 'pascal', name: 'Pascal', symbol: 'Pa', type: 'pressure', to_base: 1 },
  { key: 'bar', name: 'Bar', symbol: 'bar', type: 'pressure', to_base: 100000 },
  { key: 'atmosphere', name: 'Atmósfera', symbol: 'atm', type: 'pressure', to_base: 101325 },
  { key: 'psi', name: 'Libra/pulgada²', symbol: 'psi', type: 'pressure', to_base: 6894.76 },
  // Energía
  { key: 'joule', name: 'Julio', symbol: 'J', type: 'energy', to_base: 1 },
  { key: 'kilojoule', name: 'Kilojulio', symbol: 'kJ', type: 'energy', to_base: 1000 },
  { key: 'calorie', name: 'Caloría', symbol: 'cal', type: 'energy', to_base: 4.184 },
  { key: 'kilocalorie', name: 'Kilocaloría', symbol: 'kcal', type: 'energy', to_base: 4184 },
  { key: 'watt_hour', name: 'Watt-hora', symbol: 'Wh', type: 'energy', to_base: 3600 },
  { key: 'kilowatt_hour', name: 'Kilowatt-hora', symbol: 'kWh', type: 'energy', to_base: 3.6e6 },
  // Tiempo
  { key: 'second', name: 'Segundo', symbol: 's', type: 'time', to_base: 1 },
  { key: 'minute', name: 'Minuto', symbol: 'min', type: 'time', to_base: 60 },
  { key: 'hour', name: 'Hora', symbol: 'h', type: 'time', to_base: 3600 },
  { key: 'day', name: 'Día', symbol: 'd', type: 'time', to_base: 86400 },
  { key: 'week', name: 'Semana', symbol: 'wk', type: 'time', to_base: 604800 },
  { key: 'year', name: 'Año', symbol: 'yr', type: 'time', to_base: 31536000 },
];

// Conversión general
export function convertValue(value, fromKey, toKey) {
  const from = UNITS.find(u => u.key === fromKey);
  const to = UNITS.find(u => u.key === toKey);
  if (!from || !to) return NaN;
  if (from.type !== to.type) return NaN;
  if (from.type === 'temperature') {
    // Temperatura requiere lógica especial
    if (from.key === to.key) return value;
    // Celsius a Kelvin
    if (from.key === 'celsius' && to.key === 'kelvin') return value + 273.15;
    if (from.key === 'kelvin' && to.key === 'celsius') return value - 273.15;
    // Celsius a Fahrenheit
    if (from.key === 'celsius' && to.key === 'fahrenheit') return value * 9/5 + 32;
    if (from.key === 'fahrenheit' && to.key === 'celsius') return (value - 32) * 5/9;
    // Kelvin a Fahrenheit
    if (from.key === 'kelvin' && to.key === 'fahrenheit') return (value - 273.15) * 9/5 + 32;
    if (from.key === 'fahrenheit' && to.key === 'kelvin') return (value - 32) * 5/9 + 273.15;
    return NaN;
  }
  // Conversión estándar
  return value * (from.to_base / to.to_base);
}

export default UNITS;
