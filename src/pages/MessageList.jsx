// src/pages/MessageList.jsx
import React from 'react';
import useMessages from '../hooks/useMessages';
import Notification from '../components/Notification';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import api from '../api'; // Asegúrate de importar api para hacer la solicitud DELETE
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación

const MessageList = () => {
  const { data: messages, error, loading, refetch } = useMessages(); // Asegúrate de que useMessages devuelva refetch
  const [notification, setNotification] = React.useState({ message: '', type: '' });
  const { userId } = useAuth(); // Obtén el ID del usuario autenticado

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
      try {
        await api.delete(`/teamhub/messages/${id}/`);
        setNotification({ message: 'Mensaje eliminado con éxito.', type: 'success' });
        refetch(); // Vuelve a obtener la lista de mensajes después de eliminar
      } catch (err) {
        setNotification({ message: 'Error al eliminar el mensaje.', type: 'danger' });
        console.error('Error al eliminar el mensaje', err);
      }
    }
  };

  console.log('MessageList renderizado');

  return (
    <div>
      <h1 className="title">Lista de Mensajes</h1>
      <Notification message={notification.message} type={notification.type} />
      {error && <Notification message={error} type="danger" />}
      <Link to="/messages/create" className="button is-primary">Crear Mensaje</Link> {/* Botón para crear un mensaje */}
      {loading ? (
        <p>Cargando mensajes...</p>
      ) : (
        <ul>
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.map((message) => (
              <li key={message.id}>
                <p><strong>Contenido:</strong> {message.content}</p>
                <p><strong>Autor ID:</strong> {message.author}</p>
                <p><strong>Channel:</strong> {message.channel}</p>
                <button 
                  onClick={() => handleDelete(message.id)} 
                  className="button is-danger" 
                  disabled={message.author !== userId} // Desactiva el botón si el autor no es el usuario autenticado
                >
                  Eliminar
                </button>
                {/* <p><strong>Fecha de creación:</strong> {new Date(message.created_at).toLocaleString()}</p>
                <p><strong>Fecha de actualización:</strong> {new Date(message.updated_at).toLocaleString()}</p> */}
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
