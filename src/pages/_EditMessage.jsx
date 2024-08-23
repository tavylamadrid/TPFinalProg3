// src/pages/EditMessage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const EditMessage = () => {
  const { id } = useParams(); // Obtén el ID del mensaje de la URL
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token, userId } = useAuth(); // Obtén el token y el ID del usuario autenticado
  const location = useLocation();

  useEffect(() => {
    // Extraer el contenido del mensaje de la URL
    const params = new URLSearchParams(location.search);
    const contentFromUrl = params.get('content');

    if (contentFromUrl) {
      setContent(contentFromUrl);
    } else {
      setError('No se pudo cargar el contenido del mensaje.');
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.patch(`/teamhub/messages/${id}/`, { content }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      navigate('/messages'); // Redirige a la lista de mensajes después de editar
    } catch (err) {
      setError('Error al editar el mensaje. Inténtalo de nuevo.');
      console.error('Error al editar el mensaje', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="box">
      <h1 className="title">Editar Mensaje</h1>
      {error && <div className="notification is-danger">{error}</div>}
      <div className="field">
        <label className="label">Contenido</label>
        <div className="control">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea"
            placeholder="Escribe el nuevo contenido del mensaje"
            required
          />
        </div>
      </div>
      <div className="control">
        <button type="submit" className="button is-primary">Guardar Cambios</button>
      </div>
    </form>
  );
};

export default EditMessage;
