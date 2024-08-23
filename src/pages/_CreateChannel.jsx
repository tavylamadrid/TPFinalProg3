// src/pages/CreateChannel.jsx
import React, { useState, useEffect } from 'react';
import api from '../api'; // Asegúrate de que este archivo esté configurado correctamente
import Notification from '../components/Notification';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación

const CreateChannel = () => {
  const { token } = useAuth(); // Obtén el token del contexto
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [server, setServer] = useState(0); // Cambia esto según la lógica de tu aplicación
  const [creator, setCreator] = useState(null); // Estado para creator
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get('/users/profiles/profile_data/', {
          headers: {
            Authorization: `Token ${token}`, // Incluye el token en la cabecera
          },
        });
        console.log('Perfil del usuario:', response.data); // Agrega este log
        setCreator(response.data.user__id); // Establece el creator con el user__id
      } catch (error) {
        setNotification({ message: 'Error al obtener los datos del perfil', type: 'danger' });
        console.error('Error al obtener los datos del perfil', error);
      }
    };

    fetchProfileData(); // Llama a la función para obtener los datos del perfil
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newChannel = {
        name,
        description,
        server,
        creator, // ID del creador
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
