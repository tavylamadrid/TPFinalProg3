// src/pages/MessageList.jsx
import React from 'react';
import useMessages from '../hooks/useMessages';
import Notification from '../components/Notification';
import { Link, useNavigate } from 'react-router-dom'; // Importa Link y useNavigate
import api from '../api';
import { useAuth } from '../context/AuthContext';

const MessageList = () => {
  const navigate = useNavigate(); // Inicializa useNavigate
  const { data: messages, error, loading, refetch } = useMessages();
  const [notification, setNotification] = React.useState({ message: '', type: '' });
  const { userId } = useAuth();

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
      try {
        await api.delete(`/teamhub/messages/${id}/`);
        setNotification({ message: 'Mensaje eliminado con éxito.', type: 'success' });
        refetch();
      } catch (err) {
        setNotification({ message: 'Error al eliminar el mensaje.', type: 'danger' });
        console.error('Error al eliminar el mensaje', err);
      }
    }
  };

  const handleEdit = (message) => {
  console.log('Message Author:', message.author, 'User ID:', userId);

    if (message.author === userId) {
      // Redirige a la página de edición solo si el usuario es el autor
      navigate(`/messages/edit/${message.id}?content=${encodeURIComponent(message.content)}`);
    }
  };

  console.log('MessageList renderizado');

  return (
    <div>
      <h1 className="title">Lista de Mensajes</h1>
      <Notification message={notification.message} type={notification.type} />
      {error && <Notification message={error} type="danger" />}
      <Link to="/messages/create" className="button is-primary">Crear Mensaje</Link>
      {loading ? (
        <p>Cargando mensajes...</p>
      ) : (
        <ul>
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.map((message) => (
              <li key={message.id}>
                <p><strong>Contenido:</strong> {message.content}</p>
                <p><strong>Autor ID:</strong> {message.author}</p>
                <button 
                  onClick={() => handleDelete(message.id)} 
                  className="button is-danger" 
                  disabled={message.author !== userId}
                >
                  Eliminar
                </button>
                <button 
                  onClick={() => handleEdit(message)} 
                  className="button is-info" 
                  disabled={message.author !== userId}
                >
                  Editar
                </button>
              </li>
            ))
          ) : (
            <li>No hay mensajes disponibles.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default MessageList;
