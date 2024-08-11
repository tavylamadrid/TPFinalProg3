// src/components/Notification.jsx
import React from 'react';
import '../styles/Notification.css'; // Importa los estilos

const Notification = ({ message, type }) => {
  if (!message) return null;

  return (
    <div className={`notification is-${type}`}>
      {message}
    </div>
  );
};

export default Notification;
