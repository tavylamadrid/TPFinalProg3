// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa el contexto

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // Obtén el estado de autenticación

  console.log('Estado de autenticación:', isAuthenticated);
 
  const handleLogout = () => {
    logout(); // Llama a la función de logout
    navigate('/login'); // Redirigir a la página de inicio de sesión
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">Mi Aplicación de Mensajería</Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">Inicio</Link>
          {isAuthenticated && <Link to="/profile" className="navbar-item">Perfil</Link>}
        </div>
        <div className="navbar-end">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="navbar-item button is-danger">Cerrar Sesión</button>
          ) : (
            <Link to="/login" className="navbar-item">Iniciar Sesión</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
