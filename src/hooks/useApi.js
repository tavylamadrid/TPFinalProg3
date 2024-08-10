
// src/hooks/useApi.js
import { useState } from 'react';
import api from '../api';

const useApi = (endpoint) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await api.get(endpoint);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data : 'Error de red');
    }
  };

  const createData = async (newData) => {
    try {
      const response = await api.post(endpoint, newData);
      setData((prevData) => [...prevData, response.data]);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data : 'Error de red');
    }
  };

  const updateData = async (id, updatedData) => {
    try {
      const response = await api.put(`${endpoint}/${id}`, updatedData);
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? response.data : item))
      );
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data : 'Error de red');
    }
  };

  const deleteData = async (id) => {
    try {
      await api.delete(`${endpoint}/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data : 'Error de red');
    }
  };

  return { data, error, fetchData, createData, updateData, deleteData };
};

export default useApi;
