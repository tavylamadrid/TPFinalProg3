// src/pages/CreateMessage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const CreateMessage = () => {
  const [content, setContent] = useState('');
  const [channel, setChannel] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token } = useAuth(); // Obtén el token del contexto de autenticación
  const location = useLocation();

  // Extraer el ID del canal de la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const channelId = params.get('channel');
    if (channelId) {
      setChannel(channelId);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/teamhub/messages/', {
        channel,
        content,
      }, {
        headers: {
          Authorization: `Token ${token}`, // Asegúrate de incluir el token
        },
      });

      // Redirige a la lista de mensajes o muestra una notificación de éxito
      navigate('/messages');
    } catch (err) {
      setError('Error al crear el mensaje. Inténtalo de nuevo.');
      console.error('Error al crear el mensaje', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="box">
      <h1 className="title">Crear Mensaje</h1>
      {error && <div className="notification is-danger">{error}</div>}
      <div className="field">
        <label className="label">Canal ID</label>
        <div className="control">
          <input
            type="number"
            value={channel || ''}
            readOnly // Hacerlo de solo lectura ya que se obtiene de la URL
            className="input"
            placeholder="ID del Canal"
            required
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Contenido</label>
        <div className="control">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea"
            placeholder="Escribe tu mensaje"
            required
          />
        </div>
      </div>
      <div className="control">
        <button type="submit" className="button is-primary">Enviar Mensaje</button>
      </div>
    </form>
  );
};

export default CreateMessage;
