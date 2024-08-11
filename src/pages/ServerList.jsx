// src/pages/ServerList.jsx
import React from 'react';
import useServers from '../hooks/useServers';
import Notification from '../components/Notification';
import { Link } from 'react-router-dom'; // Importa Link para la navegación

const ServerList = () => {
  const { data: servers, error } = useServers();
  const [notification, setNotification] = React.useState({ message: '', type: '' });

  console.log('ServerList renderizado');

  return (
    <div>
      <h1 className="title">Lista de Servidores</h1>
      <Notification message={notification.message} type={notification.type} />
      {error && <Notification message={error} type="danger" />}
      <Link to="/servers/create" className="button is-primary">Crear Servidor</Link> {/* Botón para crear un servidor */}
      <ul>
        {Array.isArray(servers) && servers.length > 0 ? (
          servers.map((server) => (
            <li key={server.id}>
              <h2>{server.name}</h2>
              <p>{server.description}</p>
              <p>Propietario: {server.owner}</p>
              <p>Fecha de creación: {new Date(server.created_at).toLocaleString()}</p>
              <p>Fecha de actualización: {new Date(server.updated_at).toLocaleString()}</p>
            </li>
          ))
        ) : (
          <li>No hay servidores disponibles.</li>
        )}
      </ul>
    </div>
  );
};

export default ServerList;
