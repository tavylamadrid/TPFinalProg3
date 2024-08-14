// src/pages/EditServer.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import Notification from '../components/Notification';

const EditServer = () => {
  const { id } = useParams(); // Obtén el ID del servidor de la URL
  const { userId } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialName = queryParams.get('name') || '';
  const initialDescription = queryParams.get('description') || '';

  const [server, setServer] = useState({ name: initialName, description: initialDescription });
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchServer = async () => {
      try {
        const response = await api.get(`/teamhub/servers/${id}/`);
        setServer(response.data);
      } catch (err) {
        setNotification({ message: 'Error al obtener el servidor.', type: 'danger' });
      }
    };

    fetchServer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServer({ ...server, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/teamhub/servers/${id}/`, {
        name: server.name,
        description: server.description,
        owner: userId,
      });
      setNotification({ message: 'Servidor actualizado exitosamente.', type: 'success' });
      // Redirigir a la lista de servidores o a otra página
    } catch (err) {
      setNotification({ message: 'Error al actualizar el servidor.', type: 'danger' });
    }
  };

  return (
    <div>
      <h1 className="title">Editar Servidor</h1>
      <Notification message={notification.message} type={notification.type} />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={server.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={server.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="button is-primary">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditServer;
