// src/pages/ChannelList.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useChannel from '../hooks/useChannel';
import Notification from '../components/Notification';

const ChannelList = ({ serverId, onSelectChannel }) => { // Acepta onSelectChannel como prop
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serverIdFromQuery = queryParams.get('server') || serverId; // Usa el ID del servidor de los parámetros de la URL o de la prop

  const { channels, error, loading } = useChannel(serverIdFromQuery);

  return (
    <div>
      <h1 className="title">Lista de Canales</h1>
      {loading && <p>Cargando...</p>}
      {error && <Notification message={error} type="danger" />}
      <Link to="/channels/create" className="button is-primary">Crear Canal</Link>
      <ul>
        {channels && channels.length > 0 ? (
          channels.map((channel) => (
            <li key={channel.id}>
              <h2>{channel.name}</h2>
              <p>{channel.description}</p>
              <p>Creado por: {channel.creator}</p>
              <p>Servidor: {channel.server}</p>
              <Link to={`/messages/create?channel=${channel.id}`} className="button is-link">Crear Mensaje</Link>
              <button onClick={() => onSelectChannel(channel.id)} className="button is-info">Ver Mensajes</button> {/* Llama a onSelectChannel */}
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
