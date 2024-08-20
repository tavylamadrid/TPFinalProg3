// src/hooks/useServers.js
import { useState, useEffect } from 'react';
import api from '../api';

const useServers = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  const fetchServers = async () => {
    setLoading(true); // Inicia la carga
    try {
      const response = await api.get('/teamhub/servers/');
      setData(response.data.results); 
      setError(null); 
    } catch (err) {
      setError('Error al obtener la lista de servidores');
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchServers();
  }, []);

  const refetch = () => {
    fetchServers(); 
  };

  return { data, error, loading, refetch }; 
};

export default useServers;

