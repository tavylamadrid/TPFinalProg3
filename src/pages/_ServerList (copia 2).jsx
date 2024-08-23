// src/pages/ServerList.jsx
import React, { useState } from 'react';
import useServers from '../hooks/useServers';
import Notification from '../components/Notification';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import useMembers from '../hooks/useMembers';
import CreateServerModal from '../components/CreateServerModal'; // Importa el modal

const ServerList = ({ onSelectServer }) => {
  const { data: servers, error, refetch } = useServers();
  const { data: members } = useMembers();
  const [notification, setNotification] = useState({ message: '', type: '' });
  const { userId } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  const handleJoinServer = async (serverId) => {
    try {
      const response = await api.post('/teamhub/members/', {
        user: userId, // ID del usuario autenticado
        server: serverId, // ID del servidor al que se une
        is_onboarded: true, // Puedes ajustar esto según tu lógica
      });
      setNotification({ message: 'Te has unido al servidor exitosamente.', type: 'success' });
      refetch(); // Vuelve a obtener la lista de servidores
    } catch (err) {
      setNotification({ message: 'Error al unirte al servidor.', type: 'danger' });
    }
    };
  const handleLeaveServer = async (serverId) => {
    console.log(`Abandonar servidor con ID: ${serverId}`);
   };
   
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
        refetch(); // Vuelve a obtener la lista de servidores
      } catch (err) {
        setNotification({ message: 'Error al eliminar el servidor.', type: 'danger' });
      }
    }
  };

  const handleServerCreated = (newServer) => {
    // Aquí puedes actualizar la lista de servidores si es necesario
    // Por ejemplo, podrías agregar el nuevo servidor al estado local
    // o hacer una nueva llamada a la API para obtener la lista actualizada
  };

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

      {/* Modal para crear servidor */}
      <CreateServerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onServerCreated={handleServerCreated} 
      />
    </div>
  );
};

export default ServerList;
