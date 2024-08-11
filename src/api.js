// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sandbox.academiadevelopers.com/',
});

// Interceptor para agregar el token JWT a las solicitudes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Suponiendo que guardas el token en localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
