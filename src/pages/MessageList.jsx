// src/pages/MessageList.jsx
import React from 'react';
import useMessages from '../hooks/useMessages';
import Notification from '../components/Notification';
import { Link } from 'react-router-dom'; // Importa Link para la navegación

const MessageList = () => {
  const { data: messages, error } = useMessages();
  const [notification, setNotification] = React.useState({ message: '', type: '' });

  console.log('MessageList renderizado');

  return (
    <div>
      <h1 className="title">Lista de Mensajes</h1>
      <Notification message={notification.message} type={notification.type} />
      {error && <Notification message={error} type="danger" />}
      <Link to="/messages/create" className="button is-primary">Crear Mensaje</Link> {/* Botón para crear un mensaje */}
      <ul>
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message) => (
            <li key={message.id}>
              <p><strong>Contenido:</strong> {message.content}</p>
              <p><strong>Autor ID:</strong> {message.author}</p>
              <p><strong>Fecha de creación:</strong> {new Date(message.created_at).toLocaleString()}</p>
              <p><strong>Fecha de actualización:</strong> {new Date(message.updated_at).toLocaleString()}</p>
            </li>
          ))
        ) : (
          <li>No hay mensajes disponibles.</li>
        )}
      </ul>
    </div>
  );
};

export default MessageList;
