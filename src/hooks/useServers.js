// src/hooks/useServers.js
import { useState, useEffect } from 'react';
import api from '../api'; // Asegúrate de que la ruta sea correcta

const useServers = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchServers = async () => {
    try {
      const response = await api.get('/teamhub/servers/');
      setData(response.data.results); // Asumiendo que la respuesta tiene la lista de servidores
    } catch (err) {
      setError('Error al obtener la lista de servidores');
    }
  };

  useEffect(() => {
    fetchServers();
  }, []);

  return { data, error };
};

export default useServers;
