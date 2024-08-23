// src/pages/ServerDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useServers from '../hooks/useServers';
import Notification from '../components/Notification';

const ServerDetail = () => {
  const { id } = useParams();
  const { fetchServerById, updateServer } = useServers();
  const [server, setServer] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    const getServer = async () => {
      const serverData = await fetchServerById(id);
      setServer(serverData);
    };
    getServer();
  }, [id]);

  const handleUpdateServer = async () => {
    const updatedData = { ...server, name: 'Nombre actualizado' }; // Cambia los datos según sea necesario
    try {
      await updateServer(id, updatedData);
      setNotification({ message: 'Servidor actualizado exitosamente', type: 'success' });
    } catch (err) {
      setNotification({ message: 'Error al actualizar el servidor', type: 'danger' });
    }
  };

  if (!server) return <div>Cargando...</div>;

  return (
    <div>
      <h1 className="title">Detalles del Servidor</h1>
      <Notification message={notification.message} type={notification.type} />
      <p>Nombre: {server.name}</p>
      <p>Descripción: {server.description}</p>
      <button className="button is-primary" onClick={handleUpdateServer}>
        Actualizar Servidor
      </button>
    </div>
  );
};

export default ServerDetail;
