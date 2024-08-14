// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
//import ChannelDetail from './pages/ChannelDetail';
import ChannelList from './pages/ChannelList';
import ServerList from './pages/ServerList'; // Importa la página de lista de servidores
import ServerDetail from './pages/ServerDetail'; // Asegúrate de importar ServerDetail
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';
import CreateServer from './pages/CreateServer'; // Importa el nuevo componente
import CreateChannel from './pages/CreateChannel'; // Importa el nuevo componente
import MessageList from './pages/MessageList'; // Importa la página de lista de mensajes
import MemberList from './pages/MemberList'; // Importa la página de lista de miembros
import CreateMessage from './pages/CreateMessage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
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
              path="/channels"
              element={
                <PrivateRoute>
                  <ChannelList />
                </PrivateRoute>
              }
            />
            <Route
              path="/channels/create" // Nueva ruta para crear un canal
              element={
                <PrivateRoute>
                  <CreateChannel />
                </PrivateRoute>
              }
            />
            <Route
              path="/servers"
              element={
                <PrivateRoute>
                  <ServerList />
                </PrivateRoute>
              }
            />
            <Route
              path="/servers/create" // Nueva ruta para crear un servidor
              element={
                <PrivateRoute>
                  <CreateServer />
                </PrivateRoute>
              }
            />
            <Route
              path="/servers/:id"
              element={
                <PrivateRoute>
                  <ServerDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <PrivateRoute>
                  <MessageList />
                </PrivateRoute>
              }
            />
            <Route
              path="/messages/create"
              element={
                <PrivateRoute>
                  <CreateMessage />
                </PrivateRoute>
              }
            />
            <Route
              path="/members"
              element={
                <PrivateRoute>
                  <MemberList />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
