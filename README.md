# Guía Cafayate API REST

API REST completa para la guía turística de Cafayate con MongoDB, Express, JWT y validaciones.

## 🚀 Características

- ✅ Autenticación JWT con bcrypt
- ✅ CRUD completo para Categorías
- ✅ CRUD completo para Lugares
- ✅ Validaciones con express-validator
- ✅ Middlewares de autenticación y autorización
- ✅ Roles de usuario (admin/usuario)
- ✅ MongoDB con Mongoose
- ✅ Búsqueda de lugares por texto
- ✅ Filtros avanzados
- ✅ Lugares destacados y sponsors

## 📁 Estructura del Proyecto

```
src/
├── config/         # Configuración de BD
├── controllers/    # Lógica de negocio
├── models/         # Modelos de MongoDB
├── routes/         # Rutas de la API
├── middlewares/    # Middlewares personalizados
├── validations/    # Validaciones con express-validator
└── helpers/        # Funciones auxiliares
```

## 🛠️ Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno en `.env`:
```
MONGODB_URI=mongodb://localhost:27017/guia_cafayate
JWT_SECRET=tu_clave_secreta_super_segura_2026
JWT_EXPIRE=7d
PORT=5000
```

3. Asegúrate de tener MongoDB instalado y corriendo

## 🚀 Ejecutar el Proyecto

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

## 📚 Endpoints de la API

### 🔐 Autenticación (`/api/auth`)

- `POST /api/auth/registro` - Registrar nuevo usuario
- `POST /api/auth/login` - Login de usuario
- `GET /api/auth/perfil` - Obtener perfil (requiere auth)
- `PUT /api/auth/perfil` - Actualizar perfil (requiere auth)
- `PUT /api/auth/cambiar-password` - Cambiar contraseña (requiere auth)

### 📂 Categorías (`/api/categorias`)

- `GET /api/categorias` - Listar todas las categorías
- `GET /api/categorias/:id` - Obtener categoría por ID
- `POST /api/categorias` - Crear categoría (requiere admin)
- `PUT /api/categorias/:id` - Actualizar categoría (requiere admin)
- `DELETE /api/categorias/:id` - Eliminar categoría (requiere admin)

### 📍 Lugares (`/api/lugares`)

- `GET /api/lugares` - Listar todos los lugares (con filtros)
- `GET /api/lugares/:id` - Obtener lugar por ID
- `GET /api/lugares/destacados/all` - Obtener lugares destacados
- `GET /api/lugares/sponsors/oro` - Obtener sponsors nivel Oro
- `POST /api/lugares` - Crear lugar (requiere admin)
- `PUT /api/lugares/:id` - Actualizar lugar (requiere admin)
- `DELETE /api/lugares/:id` - Eliminar lugar (requiere admin)

## 📝 Ejemplos de Uso

### Registro de Usuario

```bash
POST /api/auth/registro
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456"
}
```

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "123456"
}
```

### Crear Categoría (con token)

```bash
POST /api/categorias
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Restaurantes",
  "descripcion": "Los mejores restaurantes de Cafayate",
  "icono": "restaurant"
}
```

### Crear Lugar (con token)

```bash
POST /api/lugares
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Restaurant El Antigal",
  "descripcion": "Restaurante con comida regional y vistas espectaculares",
  "categoria": "65abc123def456789",
  "direccion": "Av. Güemes 520",
  "telefono": "3868-421234",
  "email": "info@elantigal.com",
  "horarios": "12:00 - 23:00",
  "nivel": "Oro",
  "destacado": true
}
```

### Filtrar Lugares

```bash
GET /api/lugares?categoria=65abc123def456789&nivel=Oro&destacado=true
```

## 🔒 Autenticación

Para acceder a rutas protegidas, incluye el token JWT en el header:

```
Authorization: Bearer {tu_token_jwt}
```

## 📦 Dependencias Principales

- **express** - Framework web
- **mongoose** - ODM para MongoDB
- **jsonwebtoken** - Autenticación JWT
- **bcryptjs** - Encriptación de contraseñas
- **express-validator** - Validaciones
- **cors** - Manejo de CORS
- **dotenv** - Variables de entorno
- **nodemon** - Auto-restart en desarrollo

## 🎯 Características Técnicas

- **Modelos**: User, Categoria, Lugar
- **Autenticación**: JWT con tokens de larga duración
- **Roles**: Usuario regular y administrador
- **Validaciones**: Validación completa de datos en todos los endpoints
- **Seguridad**: Contraseñas encriptadas con bcrypt
- **Búsqueda**: Búsqueda de texto completo en lugares
- **Relaciones**: Populate automático de categorías y usuarios

## 👤 Roles de Usuario

- **usuario**: Puede ver información y gestionar su perfil
- **admin**: Puede crear, editar y eliminar categorías y lugares

## 🌐 Variables de Entorno

```env
MONGODB_URI=mongodb://localhost:27017/guia_cafayate
JWT_SECRET=tu_clave_secreta_super_segura_2026
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

## 📄 Licencia

ISC
