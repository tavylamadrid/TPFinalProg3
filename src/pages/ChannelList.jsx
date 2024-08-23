// src/pages/ChannelList.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useChannel from '../hooks/useChannel';
import Notification from '../components/Notification';
import CreateChannelModal from '../components/CreateChannelModal';
import EditChannelModal from '../components/EditChannelModal';
import api from '../api';

const ChannelList = ({ serverId, onSelectChannel }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serverIdFromQuery = queryParams.get('server') || serverId;

  const { channels, error, loading, refetchChannels } = useChannel(serverIdFromQuery);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const handleChannelCreated = (newChannel) => {
    refetchChannels();
  };

  const handleChannelUpdated = (updatedChannel) => {
    refetchChannels();
  };

  const handleDeleteChannel = async (channelId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este canal?')) {
      try {
        await api.delete(`/teamhub/channels/${channelId}/`);
        refetchChannels();
        // Aquí puedes agregar la lógica para actualizar la lista de canales
      } catch (err) {
        console.error(err);
        // Manejo de errores
      }
    }
  };

  return (
    <div>
      {/*<h1 className="title">Lista de Canales</h1>*/}
      {loading && <p>Cargando...</p>}
      {error && <Notification message={error} type="danger" />}
      <button onClick={() => setIsCreateModalOpen(true)} className="button is-primary">Crear Canal</button>
      <ul>
        {channels && channels.length > 0 ? (
          channels.map((channel) => (
            <li key={channel.id}>
              <h2>{channel.name}</h2>
              <p>{channel.description}</p>
              <p>Creado por: {channel.creator}</p>
              <p>Servidor: {channel.server}</p>
              {/*<Link to={`/messages/create?channel=${channel.id}`} className="button is-link">Crear Mensaje</Link>*/}
              <button onClick={() => { setSelectedChannel(channel); setIsEditModalOpen(true); }} className="button is-info">Editar Canal</button>
              <button onClick={() => handleDeleteChannel(channel.id)} className="button is-danger">Eliminar Canal</button>
              <button onClick={() => onSelectChannel(channel.id)} className="button is-info">Ver Mensajes</button>
            </li>
          ))
        ) : (
          <li>No hay canales disponibles.</li>
        )}
      </ul>

      <CreateChannelModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onChannelCreated={handleChannelCreated}
        serverId={serverIdFromQuery}
      />
      
      <EditChannelModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        channel={selectedChannel} 
        onChannelUpdated={handleChannelUpdated} 
      />
    </div>
  );
};

export default ChannelList;
