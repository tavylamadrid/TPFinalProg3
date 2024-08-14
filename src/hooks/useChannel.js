// src/hooks/useChannel.js
import { useState, useEffect } from 'react';
import api from '../api';

const useChannel = (serverId) => {
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchChannels = async () => {
    setLoading(true);
    try {
      const response = await api.get('/teamhub/channels/', {
        params: serverId ? { server: serverId } : {}, // Filtrar por ID de servidor si se proporciona
      });
      setChannels(response.data.results);
    } catch (err) {
      setError('Error al obtener la lista de canales');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, [serverId]);

  return { channels, error, loading };
};

export default useChannel;
