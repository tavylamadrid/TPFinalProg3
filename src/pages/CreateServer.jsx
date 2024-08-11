// src/pages/CreateServer.jsx
import React, { useState } from 'react';
import api from '../api'; // Asegúrate de que este archivo esté configurado correctamente
import Notification from '../components/Notification';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación

const CreateServer = () => {
  const { token, UserId } = useAuth(); // Obtén el token del contexto
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newServer = {
        name,
        description,
        icon,
        owner: UserId, //token ? 1 : 0, // Cambia esto para obtener el ID real del usuario autenticado
        members: [], // Cambia esto según la lógica de tu aplicación
      };
      const response = await api.post('/teamhub/servers/', newServer);
      setNotification({ message: 'Servidor creado exitosamente', type: 'success' });
      navigate('/servers'); // Redirige a la lista de servidores después de crear
    } catch (error) {
      setNotification({ message: 'Error al crear el servidor', type: 'danger' });
      console.error('Error al crear el servidor', error);
    }
  };

  return (
    <div>
      <h1 className="title">Crear Servidor</h1>
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
              placeholder="Nombre del servidor"
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
              placeholder="Descripción del servidor"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Ícono (URL)</label>
          <div className="control">
            <input
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="input"
              placeholder="URL del ícono del servidor"
            />
          </div>
        </div>
        <div className="control">
          <button type="submit" className="button is-primary">Crear Servidor</button>
        </div>
      </form>
    </div>
  );
};

export default CreateServer;
