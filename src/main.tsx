// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
// La siguiente línea es crucial. Si falta o es incorrecta, no se mostrará nada.
const root = createRoot(container!); 
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);