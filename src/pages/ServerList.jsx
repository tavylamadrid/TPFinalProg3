// src/pages/ServerList.jsx
import React from 'react';
import useServers from '../hooks/useServers';
import Notification from '../components/Notification';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import api from '../api'; //
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import useMembers from '../hooks/useMembers'; // Importa el hook para obtener miembros

const ServerList = () => {
  const { data: servers, error } = useServers();
  const { data: members } = useMembers(); // Obtén la lista de miembros
  const [notification, setNotification] = React.useState({ message: '', type: '' });
  const { userId } = useAuth(); // Obtén el ID del usuario autenticado

  // Mostrar el UserId en la consola
  console.log('UserId server list:', userId);
  //console.log('Members:', members); // Verifica que los miembros se estén obteniendo correctamente

const isMember = (serverId) => {
  const isMember = members && members.some(member => {
    //console.log(`Comparando: serverId=${serverId}, member.server=${member.server}, UserId=${UserId}, member.user=${member.user}`);
    return member.server === serverId && member.user === userId;
  });
  return isMember;
};


  const handleJoinServer = async (serverId) => {
    try {
      const response = await api.post('/teamhub/members/', {
        user: userId, // ID del usuario autenticado
        server: serverId, // ID del servidor al que se une
        is_onboarded: true, // Puedes ajustar esto según tu lógica
      });
      console.log('UserId7777777:', response);
      setNotification({ message: 'Te has unido al servidor exitosamente.', type: 'success' });
    } catch (err) {
      setNotification({ message: 'Error al unirte al servidor.', type: 'danger' });
    }
  };

  const handleLeaveServer = async (serverId) => {
    console.log(`Abandonar servidor con ID: ${serverId}`);
  };

  console.log('ServerList renderizado');

  return (
    <div>
      <h1 className="title">Lista de Servidores</h1>
      <Notification message={notification.message} type={notification.type} />
      <Link to="/servers/create" className="button is-primary">Crear Servidor</Link> {/* Botón para crear un servidor */}
      <ul>
        {Array.isArray(servers) && servers.length > 0 ? (
          servers.map((server) => (
            <li key={server.id}>
              <h2>{server.name}</h2>
              <p>{server.description}</p>
              <p>Propietario: {server.owner}</p>
              <p>Fecha de creación: {new Date(server.created_at).toLocaleString()}</p>
              <p>Fecha de actualización: {new Date(server.updated_at).toLocaleString()}</p>
              {isMember(server.id) ? (
                <button onClick={() => handleLeaveServer(server.id)} className="button is-danger">Abandonar</button> // Botón "Abandonar"
              ) : (
                <button onClick={() => handleJoinServer(server.id)} className="button is-link">Unirme</button> // Botón "Unirme"
              )}
            </li>
          ))
        ) : (
          <li>No hay servidores disponibles.</li>
        )}
      </ul>
    </div>
  );
};

export default ServerList;
