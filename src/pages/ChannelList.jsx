// src/pages/ChannelList.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Importa useLocation
import useChannel from '../hooks/useChannel';
import Notification from '../components/Notification';

const ChannelList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serverId = queryParams.get('server'); // Obtén el ID del servidor de los parámetros de la URL

  const { channels, error, loading } = useChannel(serverId); // Usa el hook personalizado con el ID del servidor

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
