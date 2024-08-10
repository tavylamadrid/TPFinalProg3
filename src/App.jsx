// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Importa el AuthProvider
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ChannelDetail from './pages/ChannelDetail';
import ChannelList from './pages/ChannelList'; // Importa el nuevo componente
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/channel/:id"
            element={
              <PrivateRoute>
                <ChannelDetail />
              </PrivateRoute>
            }
          />
            <Route
            path="/channels"
            element={
              <PrivateRoute>
                <ChannelList /> {/* Ruta para la lista de canales */}
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
