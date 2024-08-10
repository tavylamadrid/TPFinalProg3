// src/pages/ChannelList.jsx
import React, { useEffect } from 'react';
import useApi from '../hooks/useApi';

const ChannelList = () => {
  const { data: channels, error, fetchData, createData, deleteData } = useApi('/teamhub/channels');

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateChannel = async () => {
    const newChannel = { name: 'Nuevo Canal' }; // Cambia esto según tu estructura de datos
    await createData(newChannel);
  };

  const handleDeleteChannel = async (id) => {
    await deleteData(id);
  };

  return (
    <div>
      <h1 className="title">Lista de Canales</h1>
      {error && <div className="notification is-danger">{error}</div>}
      <button className="button is-primary" onClick={handleCreateChannel}>
        Crear Canal
      </button>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>
            {channel.name}
            <button className="button is-danger" onClick={() => handleDeleteChannel(channel.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelList;
