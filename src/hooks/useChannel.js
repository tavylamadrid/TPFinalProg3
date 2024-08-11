// src/hooks/useChannel.js
import { useState, useEffect } from 'react';
import api from '../api'; // Asegúrate de que este archivo esté configurado correctamente

const useChannel = () => {
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchChannels = async () => {
    try {
      const response = await api.get('/teamhub/channels/');
      setChannels(response.data.results); // Asigna los resultados a 'channels'
      setError(null);
    } catch (err) {
      setError('Error al cargar los canales');
      setChannels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  return { channels, error, loading };
};

export default useChannel;
