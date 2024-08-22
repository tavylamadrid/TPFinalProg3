// src/pages/ServerList.jsx
import React, { useState } from 'react';
import useServers from '../hooks/useServers';
import Notification from '../components/Notification';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import useMembers from '../hooks/useMembers';
import CreateServerModal from '../components/CreateServerModal';
import EditServerModal from '../components/EditServerModal'; // Importa el nuevo modal

const ServerList = ({ onSelectServer }) => {
  const { data: servers, error, loading, refetch: refetchServers } = useServers();
  const { data: members, refetch: refetchMembers } = useMembers();
  const [notification, setNotification] = useState({ message: '', type: '' });
  const { userId } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState(null); // Estado para el servidor seleccionado

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

  const handleServerUpdated = (updatedServer) => {
    refetchServers(); // Vuelve a obtener la lista de servidores
  };

  const openEditModal = (server) => {
    setSelectedServer(server);
    setIsEditModalOpen(true);
  };

  const isOwner = (serverId) => {
    return servers && servers.some(server => server.id === serverId && server.owner === userId);
  };

  const isMember = (serverId) => {
    return members && members.some(member => member.server === serverId && member.user === userId);
  };

  if (loading) return <p>Cargando servidores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/*<h1 className="title">Lista de Servidores</h1>*/}
      <Notification message={notification.message} type={notification.type} />
      <button className="button is-primary" onClick={() => setIsCreateModalOpen(true)}>Crear Servidor</button>
      <ul>
        {Array.isArray(servers) && servers.length > 0 ? (
          servers.map((server) => (
            <li key={server.id}>
              <h2>{server.name}</h2>
              <p>{server.description}</p>
              <p>Propietario: {server.owner}</p>
              {isOwner(server.id) && (
                <>
                  <button className="button is-info" onClick={() => openEditModal(server)}>Editar</button>
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
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onServerCreated={handleServerCreated} 
      />
      
      <EditServerModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        server={selectedServer} 
        onServerUpdated={handleServerUpdated} 
      />
    </div>
  );
};

export default ServerList;
