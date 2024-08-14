// src/hooks/useMembers.js
import { useState, useEffect } from 'react';
import api from '../api'; // Asegúrate de que la ruta sea correcta

const useMembers = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchMembers = async () => {
    try {
      const response = await api.get('/teamhub/members/');
      setData(response.data.results); // Asumiendo que la respuesta tiene la lista de miembros
    } catch (err) {
      setError('Error al obtener la lista de miembros');
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return { data, error };
};

export default useMembers;
