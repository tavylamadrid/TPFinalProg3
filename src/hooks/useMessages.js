// src/hooks/useMessages.js
import { useState, useEffect } from 'react';
import api from '../api'; // Asegúrate de que la ruta sea correcta

const useMessages = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await api.get('/teamhub/messages/');
      setData(response.data.results); // Asumiendo que la respuesta tiene la lista de mensajes
      setError(null);
    } catch (err) {
      setError('Error al obtener la lista de mensajes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return { data, error, loading, refetch: fetchMessages }; // Devuelve refetch
};

export default useMessages;
