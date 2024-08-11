### MensApp
Aplicación React que incluye la configuración de una API, rutas, componentes y estilos.

## Estructura del Proyecto

mensapp/
├── src/                  # Código fuente de la aplicación
│   ├── components/       # Componentes reutilizables
│   │   ├── Navbar.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── Layout.jsx
│   │   └── Notification.jsx
│   ├── context/          # Contexto de auth
│   │   └── AuthContext.jsx
│   ├── styles/           # Styles, cargar todos los CSS aquí
│   │   ├── styles.css
│   │   └── Notification.css
│   ├── services/         # Servicios
│   │   └── authService.jsx
│   ├── pages/            # Páginas de la aplicación
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   ├── NotFound.jsx
│   │   ├── ChannelList.jsx
│   │   ├── ChannelDetail.jsx
│   │   ├── ServerDetail.jsx
│   │   ├── ServerList.jsx
│   │   └── CreateServer.jsx
│   ├── hooks/            # Hooks personalizados
│   │   ├── useApi.js
│   │   ├── useAuthStatus.js
│   │   ├── useServers.js
│   │   └── useChannel.js
│   ├── App.jsx           # Componente principal
│   └── index.jsx         # Punto de entrada
├── index.html            # Archivo HTML principal
├── package.json          # Configuración del proyecto
└── vite.config.js        # Configuración de Vite

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
