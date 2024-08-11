// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null); // Agrega el estado para el ID del usuario

  const login = (token, userId) => { // Modifica la función de login
    setToken(token);
    setUserId(userId); // Guarda el ID del usuario
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    setUserId(null); // Limpia el ID del usuario al cerrar sesión
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
