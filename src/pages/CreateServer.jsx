// src/pages/CreateServer.jsx
import React, { useState, useEffect } from 'react';
import api from '../api'; // Asegúrate de que este archivo esté configurado correctamente
import Notification from '../components/Notification';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación

const CreateServer = () => {
  const { token } = useAuth(); // Obtén el token del contexto
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [owner, setOwner] = useState(null); // Estado para el owner
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
        setOwner(response.data.user__id); // Establece el owner con el user__id
        console.log('El owner es: ', owner);
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
      const newServer = {
        name,
        description,
        //icon,
        owner, // Usa el owner obtenido
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
        <div className="control">
          <button type="submit" className="button is-primary">Crear Servidor</button>
        </div>
      </form>
    </div>
  );
};

export default CreateServer;
