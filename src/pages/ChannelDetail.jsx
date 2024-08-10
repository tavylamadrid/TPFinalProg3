// src/pages/ChannelDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const ChannelDetail = () => {
  const { id } = useParams(); // Obtiene el ID del canal de la URL

  return (
    <div>
      <h1>Detalles del Canal</h1>
      <p>Mostrando detalles para el canal con ID: {id}</p>
    </div>
  );
};

export default ChannelDetail;
