// src/hooks/useServers.js
import { useState, useEffect } from 'react';
import api from '../api';

const useServers = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  const fetchServers = async () => {
    setLoading(true); // Inicia la carga
    try {
      const response = await api.get('/teamhub/servers/?page=2');
      setData(response.data.results); // Asumiendo que la respuesta tiene la lista de servidores
      setError(null); // Limpia el error si la llamada es exitosa
    } catch (err) {
      setError('Error al obtener la lista de servidores');
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  useEffect(() => {
    fetchServers();
  }, []);

  const refetch = () => {
    fetchServers(); // Permite volver a obtener los servidores
  };

  return { data, error, loading, refetch }; // Devuelve refetch
};

export default useServers;

