// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/styles.css'; // Si tienes estilos globales
// src/index.jsx o src/App.jsx
import 'bulma/css/bulma.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
