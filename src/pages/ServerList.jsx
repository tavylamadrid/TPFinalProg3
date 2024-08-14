// src/pages/ServerList.jsx
import React from 'react';
import useServers from '../hooks/useServers';
import Notification from '../components/Notification';
import { Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import useMembers from '../hooks/useMembers';

const ServerList = () => {
  const { data: servers, error } = useServers();
  const { data: members } = useMembers();
  const [notification, setNotification] = React.useState({ message: '', type: '' });
  const { userId } = useAuth();

  const isMember = (serverId) => {
    return members && members.some(member => member.server === serverId && member.user === userId);
  };

  const isOwner = (serverId) => {
    return servers && servers.some(server => server.id === serverId && server.owner === userId);
  };

  const handleDeleteServer = async (serverId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este servidor?')) {
      try {
        await api.delete(`/teamhub/servers/${serverId}/`);
        setNotification({ message: 'Servidor eliminado exitosamente.', type: 'success' });
      } catch (err) {
        setNotification({ message: 'Error al eliminar el servidor.', type: 'danger' });
      }
    }
  };

  return (
    <div>
      <h1 className="title">Lista de Servidores</h1>
      <Notification message={notification.message} type={notification.type} />
      <Link to="/servers/create" className="button is-primary">Crear Servidor</Link>
      <ul>
        {Array.isArray(servers) && servers.length > 0 ? (
          servers.map((server) => (
            <li key={server.id}>
              <h2>{server.name}</h2>
              <p>{server.description}</p>
              <p>Propietario: {server.owner}</p>
              {isOwner(server.id) && (
                <>
                  <Link to={`/servers/edit/${server.id}?name=${encodeURIComponent(server.name)}&description=${encodeURIComponent(server.description)}`} className="button is-info">Editar</Link>
                  <button onClick={() => handleDeleteServer(server.id)} className="button is-danger">Eliminar</button>
                </>
              )}
              {isMember(server.id) ? (
                <>
                  <button onClick={() => handleLeaveServer(server.id)} className="button is-danger">Abandonar</button>
                  <Link to={`/channels?server=${server.id}`} className="button is-info">Ver Canales</Link>
                </>
              ) : (
                <button onClick={() => handleJoinServer(server.id)} className="button is-link">Unirme</button>
              )}
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
