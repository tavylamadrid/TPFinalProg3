// src/pages/ChannelList.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import useChannel from '../hooks/useChannel';
import Notification from '../components/Notification';

const ChannelList = () => {
  const { channels, error, loading } = useChannel(); // Usa el hook personalizado

  return (
    <div>
      <h1 className="title">Lista de Canales</h1>
      {loading && <p>Cargando...</p>}
      <Notification message={error} type="danger" />
      <Link to="/channels/create" className="button is-primary">Crear Canal</Link> {/* Botón para crear un canal */}
      <ul>
        {channels.length > 0 ? (
          channels.map((channel) => (
            <li key={channel.id}>
              <h2>{channel.name}</h2>
              <p>{channel.description}</p>
              <p>Creado el: {new Date(channel.created_at).toLocaleString()}</p>
              <p>Actualizado el: {new Date(channel.updated_at).toLocaleString()}</p>
            </li>
          ))
        ) : (
          <li>No hay canales disponibles.</li>
        )}
      </ul>
    </div>
  );
};

export default ChannelList;
