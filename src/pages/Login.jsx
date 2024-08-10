// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext'; // Importa el contexto

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtén la función de login del contexto

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api-auth/', { username, password });
      localStorage.setItem('token', response.data.token);
      login(response.data.token); // Llama a la función de login
      navigate('/profile');
    } catch (error) {
      console.error('Error de autenticación', error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="box">
      <h1 className="title">Iniciar Sesión</h1>
      <div className="field">
        <label className="label">Usuario</label>
        <div className="control">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="Usuario"
            required
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Contraseña</label>
        <div className="control">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Contraseña"
            required
          />
        </div>
      </div>
      <div className="control">
        <button type="submit" className="button is-primary">Iniciar Sesión</button>
      </div>
    </form>
  );
};

export default Login;
