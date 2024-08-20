// src/pages/ServerList.jsx
import React, { useState } from 'react';
import useServers from '../hooks/useServers';
import Notification from '../components/Notification';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import useMembers from '../hooks/useMembers';
import CreateServerModal from '../components/CreateServerModal';

const ServerList = ({ onSelectServer }) => {
  const { data: servers, error, loading, refetch: refetchServers } = useServers();
  const { data: members, refetch: refetchMembers } = useMembers();
  const [notification, setNotification] = useState({ message: '', type: '' });
  const { userId } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJoinServer = async (serverId) => {
    try {
      await api.post('/teamhub/members/', {
        user: userId,
        server: serverId,
        is_onboarded: true,
      });
      setNotification({ message: 'Te has unido al servidor exitosamente.', type: 'success' });
      refetchMembers(); 
      refetchServers(); 
    } catch (err) {
      console.error(err);
      setNotification({ message: 'Error al unirte al servidor.', type: 'danger' });
    }
  };

  const handleDeleteServer = async (serverId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este servidor?')) {
      try {
        await api.delete(`/teamhub/servers/${serverId}/`);
        setNotification({ message: 'Servidor eliminado exitosamente.', type: 'success' });
      refetchMembers(); 
      refetchServers(); 
      } catch (err) {
        console.error(err);
        setNotification({ message: 'Error al eliminar el servidor.', type: 'danger' });
      }
    }
  };

  const handleServerCreated = async (newServer) => {
    try {
      await api.post('/teamhub/members/', {
        user: userId,
        server: newServer.id, 
        is_onboarded: false,
      });
      setNotification({ message: 'Te has unido al servidor exitosamente.', type: 'success' });
      refetchMembers(); 
      refetchServers(); 
    } catch (err) {
      console.error(err);
      setNotification({ message: 'Error al unirte al servidor.', type: 'danger' });
    }
  };

  const isOwner = (serverId) => {
    return servers && servers.some(server => server.id === serverId && server.owner === userId);
  };

  const isMember = (serverId) => {
    const memberStatus = members && members.some(member => member.server === serverId && member.user === userId);
    //console.log(`User ${userId} member status for server ${serverId}: ${memberStatus}`);
    return memberStatus;
  };

  if (loading) return <p>Cargando servidores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="title">Lista de Servidores</h1>
      <Notification message={notification.message} type={notification.type} />
      <button className="button is-primary" onClick={() => setIsModalOpen(true)}>Crear Servidor</button>
      <ul>
        {Array.isArray(servers) && servers.length > 0 ? (
          servers.map((server) => (
            <li key={server.id}>
              <h2>{server.name}</h2>
              <p>{server.description}</p>
              <p>Propietario: {server.owner}</p>
              {isOwner(server.id) && (
                <>
                  <button className="button is-info">Editar</button>
                  <button onClick={() => handleDeleteServer(server.id)} className="button is-danger">Eliminar</button>
                </>
              )}
              {isMember(server.id) ? (
                <>
                  <button onClick={() => handleLeaveServer(server.id)} className="button is-danger">Abandonar</button>
                  <button onClick={() => onSelectServer(server.id)} className="button is-info">Ver Canales</button>
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

      <CreateServerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onServerCreated={handleServerCreated} 
      />
    </div>
  );
};

export default ServerList;
