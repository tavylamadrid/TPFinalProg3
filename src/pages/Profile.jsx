// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import api from '../api'; // Asegúrate de que este archivo esté configurado correctamente
import Notification from '../components/Notification';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    dob: '',
    bio: '',
    state: '',
  });
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar la visualización del formulario

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get('/users/profiles/profile_data/', {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`, // Obtén el token directamente de localStorage
          },
        });
        setProfileData(response.data);
        setFormData({
          username: response.data.username,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          dob: response.data.dob,
          bio: response.data.bio,
          state: response.data.state,
        });
      } catch (error) {
        setNotification({ message: 'Error al cargar los datos del perfil', type: 'danger' });
        console.error('Error al cargar los datos del perfil', error);
      }
    };

    fetchProfileData(); // Llama a la función para obtener los datos del perfil
  }, []); // El efecto se ejecuta una vez al montar el componente

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/users/profiles/${profileData.user__id}/`, formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`, // Incluye el token en la cabecera
        },
      });
      setProfileData(response.data); // Actualiza los datos del perfil
      setNotification({ message: 'Perfil actualizado exitosamente', type: 'success' });
      setIsEditing(false); // Cierra el formulario de edición
    } catch (error) {
      setNotification({ message: 'Error al actualizar el perfil', type: 'danger' });
      console.error('Error al actualizar el perfil', error);
    }
  };

  if (!profileData) return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos

  return (
    <div>
      <h1 className="title">Perfil de Usuario</h1>
      <Notification message={notification.message} type={notification.type} />
      
      {/* Mostrar información del perfil */}
      <div>
        <p><strong>ID:</strong> {profileData.user__id}</p>
        <p><strong>Nombre de usuario:</strong> {profileData.username}</p>
        <p><strong>Nombre:</strong> {profileData.first_name}</p>
        <p><strong>Apellido:</strong> {profileData.last_name}</p>
        <p><strong>Email:</strong> {profileData.email}</p>
        <p><strong>Fecha de nacimiento:</strong> {profileData.dob}</p>
        <p><strong>Biografía:</strong> {profileData.bio}</p>
        <p><strong>Estado:</strong> {profileData.state}</p>
        <p><strong>Creado el:</strong> {new Date(profileData.created_at).toLocaleString()}</p>
        <p><strong>Actualizado el:</strong> {new Date(profileData.updated_at).toLocaleString()}</p>
      </div>

      {/* Botón para editar el perfil */}
      <button className="button is-primary" onClick={() => setIsEditing(true)}>
        Editar Perfil
      </button>

      {/* Mostrar el formulario solo si isEditing es true */}
      {isEditing && (
        <form onSubmit={handleSubmit} className="box">
          <div className="field">
            <label className="label">Nombre de usuario</label>
            <div className="control">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Nombre</label>
            <div className="control">
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Apellido</label>
            <div className="control">
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Fecha de nacimiento</label>
            <div className="control">
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Biografía</label>
            <div className="control">
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="textarea"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Estado</label>
            <div className="control">
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-primary">Actualizar Perfil</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
