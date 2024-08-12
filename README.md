### MensApp
Aplicación React que incluye la configuración de una API, rutas, componentes y estilos.

## Estructura del Proyecto

- **src/**: Código fuente de la aplicación
  - **components/**: Componentes reutilizables
    - `Navbar.jsx`: Barra de navegación
    - `PrivateRoute.jsx`: Ruta privada
    - `Layout.jsx`: Estructura básica
    - `Notification.jsx`: Componente de notificación
  - **context/**: Contexto de autenticación
    - `AuthContext.jsx`: Proveedor de estado de autenticación
  - **styles/**: Estilos, cargar todos los CSS aquí
    - `styles.css`: Estilos globales
    - `Notification.css`: Estilos para notificaciones
  - **services/**: Servicios
    - `authService.jsx`: Servicio de autenticación
  - **pages/**: Páginas de la aplicación
    - `Home.jsx`: Página de inicio
    - `Login.jsx`: Página de inicio de sesión
    - `Profile.jsx`: Página de perfil
    - `NotFound.jsx`: Página 404
    - `ChannelList.jsx`: Lista de canales
    - `ChannelDetail.jsx`: Detalles de un canal
    - `ServerDetail.jsx`: Detalles de un servidor
    - `ServerList.jsx`: Lista de servidores
    - `CreateServer.jsx`: Crear un nuevo servidor
    - `CreateChannel.jsx`: Crear un nuevo servidor
  - **hooks/**: Hooks personalizados
    - `useApi.js`: Hook para API
    - `useAuthStatus.js`: Hook para estado de autenticación
    - `useServers.js`: Hook para servidores
    - `useChannel.js`: Hook para canales
  - `App.jsx`: Componente principal
  - `index.jsx`: Punto de entrada
  - `api.js`: Configura Axios para realizar solicitudes a una API
- `index.html`: Archivo HTML principal
- `package.json`: Configuración del proyecto
- `vite.config.js`: Configuración de Vite

### Resumen de lo que hace cada parte del código:

- **API Configuration (src/api.js)**: Configura Axios para realizar solicitudes a una API, incluyendo un interceptor para agregar un token JWT a las cabeceras de las solicitudes.

- **App Component (src/App.jsx)**: Define las rutas de la aplicación utilizando react-router-dom, incluyendo rutas privadas que requieren autenticación.

- **Index File (src/index.jsx)**: Renderiza la aplicación en el DOM y aplica estilos globales.

- **Channel Detail Page (src/pages/ChannelDetail.jsx)**: Muestra los detalles de un canal específico basado en el ID de la URL.

- **Channel List Page (src/pages/ChannelList.jsx)**: Muestra una lista de canales y permite crear y eliminar canales, mostrando notificaciones de éxito o error.

- **Home Page (src/pages/Home.jsx)**: Página de inicio de la aplicación.

- **Login Page (src/pages/Login.jsx)**: Permite a los usuarios iniciar sesión y almacena el token en localStorage.

- **Not Found Page (src/pages/NotFound.jsx)**: Muestra un mensaje de error 404 si la ruta no se encuentra.

- **Profile Page (src/pages/Profile.jsx)**: Muestra información del perfil del usuario.

- **Server Detail Page (src/pages/ServerDetail.jsx)**: Muestra los detalles de un servidor específico y permite actualizar su información.

- **Server List Page (src/pages/ServerList.jsx)**: Muestra una lista de servidores.

- **Layout Component (src/components/Layout.jsx)**: Estructura básica de la aplicación que incluye la barra de navegación.

- **Navbar Component (src/components/Navbar.jsx)**: Barra de navegación que permite a los usuarios navegar entre las diferentes páginas y cerrar sesión.

- **Notification Component (src/components/Notification.jsx)**: Muestra notificaciones de éxito o error.

- **Private Route Component (src/components/PrivateRoute.jsx)**: Redirige a los usuarios no autenticados a la página de inicio de sesión.

- **Auth Context (src/context/AuthContext.jsx)**: Proporciona el estado de autenticación y funciones de inicio y cierre de sesión.

- **Auth Service (src/services/authService.js)**: Servicio para manejar la autenticación.

- **Styles (src/styles/Notification.css y src/styles/styles.css)**: Define estilos para la aplicación, incluyendo notificaciones y estilos globales.
