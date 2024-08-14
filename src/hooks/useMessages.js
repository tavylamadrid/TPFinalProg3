// src/hooks/useMessages.js
import { useState, useEffect } from 'react';
import api from '../api'; // Asegúrate de que la ruta sea correcta

const useMessages = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      const response = await api.get('/teamhub/messages/');
      setData(response.data.results); // Asumiendo que la respuesta tiene la lista de mensajes
    } catch (err) {
      setError('Error al obtener la lista de mensajes');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return { data, error };
};

export default useMessages;
