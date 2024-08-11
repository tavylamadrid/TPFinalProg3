// src/pages/CreateChannel.jsx
import React, { useState } from 'react';
import api from '../api'; // Asegúrate de que este archivo esté configurado correctamente
import Notification from '../components/Notification';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación

const CreateChannel = () => {
  const { token, userId } = useAuth(); // Obtén el token del contexto
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [server, setServer] = useState(0); // Cambia esto según la lógica de tu aplicación
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newChannel = {
        name,
        description,
        server,
        creator: userId, // ID del creador
      };
      const response = await api.post('/teamhub/channels/', newChannel);
      setNotification({ message: 'Canal creado exitosamente', type: 'success' });
      navigate('/channels'); // Redirige a la lista de canales después de crear
    } catch (error) {
      setNotification({ message: 'Error al crear el canal', type: 'danger' });
      console.error('Error al crear el canal', error);
    }
  };

  return (
    <div>
      <h1 className="title">Crear Canal</h1>
      <Notification message={notification.message} type={notification.type} />
      <form onSubmit={handleSubmit} className="box">
        <div className="field">
          <label className="label">Nombre</label>
          <div className="control">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Nombre del canal"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Descripción</label>
          <div className="control">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea"
              placeholder="Descripción del canal"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">ID del Servidor</label>
          <div className="control">
            <input
              type="number"
              value={server}
              onChange={(e) => setServer(e.target.value)}
              className="input"
              placeholder="ID del servidor"
              required
            />
          </div>
        </div>
        <div className="control">
          <button type="submit" className="button is-primary">Crear Canal</button>
        </div>
      </form>
    </div>
  );
};

export default CreateChannel;
