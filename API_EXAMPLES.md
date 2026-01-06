# Ejemplos de Uso de la API - Guía Cafayate

Este archivo contiene ejemplos de cómo usar la API con cURL, Postman o cualquier cliente HTTP.

## 🔐 AUTENTICACIÓN

### 1. Registro de Usuario

```bash
POST http://localhost:5000/api/auth/registro
Content-Type: application/json

{
  "nombre": "María González",
  "email": "maria@example.com",
  "password": "123456"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "_id": "65abc123...",
    "nombre": "María González",
    "email": "maria@example.com",
    "rol": "usuario"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Login

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "maria@example.com",
  "password": "123456"
}
```

### 3. Obtener Perfil (requiere token)

```bash
GET http://localhost:5000/api/auth/perfil
Authorization: Bearer {tu_token}
```

### 4. Actualizar Perfil

```bash
PUT http://localhost:5000/api/auth/perfil
Authorization: Bearer {tu_token}
Content-Type: application/json

{
  "nombre": "María González Actualizado",
  "email": "maria.new@example.com"
}
```

### 5. Cambiar Contraseña

```bash
PUT http://localhost:5000/api/auth/cambiar-password
Authorization: Bearer {tu_token}
Content-Type: application/json

{
  "passwordActual": "123456",
  "passwordNuevo": "nuevaPassword123"
}
```

## 📂 CATEGORÍAS

### 1. Obtener Todas las Categorías

```bash
GET http://localhost:5000/api/categorias
```

**Query params opcionales:**
- `activo=true` - Filtrar por categorías activas

### 2. Obtener Categoría por ID

```bash
GET http://localhost:5000/api/categorias/65abc123...
```

### 3. Crear Categoría (requiere admin)

```bash
POST http://localhost:5000/api/categorias
Authorization: Bearer {tu_token_admin}
Content-Type: application/json

{
  "nombre": "Restaurantes",
  "descripcion": "Los mejores restaurantes de Cafayate",
  "icono": "restaurant",
  "orden": 1
}
```

### 4. Actualizar Categoría (requiere admin)

```bash
PUT http://localhost:5000/api/categorias/65abc123...
Authorization: Bearer {tu_token_admin}
Content-Type: application/json

{
  "nombre": "Restaurantes y Bares",
  "descripcion": "Descripción actualizada",
  "orden": 2
}
```

### 5. Eliminar Categoría (requiere admin)

```bash
DELETE http://localhost:5000/api/categorias/65abc123...
Authorization: Bearer {tu_token_admin}
```

## 📍 LUGARES

### 1. Obtener Todos los Lugares

```bash
GET http://localhost:5000/api/lugares
```

**Query params opcionales:**
- `categoria=65abc123...` - Filtrar por categoría
- `nivel=Oro` - Filtrar por nivel (Bronce, Plata, Oro)
- `destacado=true` - Solo lugares destacados
- `activo=true` - Solo lugares activos
- `search=restaurant` - Búsqueda por texto

**Ejemplo con filtros:**
```bash
GET http://localhost:5000/api/lugares?categoria=65abc123&nivel=Oro&destacado=true
```

### 2. Obtener Lugar por ID

```bash
GET http://localhost:5000/api/lugares/65def456...
```

### 3. Obtener Lugares Destacados

```bash
GET http://localhost:5000/api/lugares/destacados/all
```

### 4. Obtener Sponsors (Nivel Oro)

```bash
GET http://localhost:5000/api/lugares/sponsors/oro
```

### 5. Crear Lugar (requiere admin)

```bash
POST http://localhost:5000/api/lugares
Authorization: Bearer {tu_token_admin}
Content-Type: application/json

{
  "nombre": "Restaurant El Antigal",
  "descripcion": "Restaurante con comida regional y vistas espectaculares al valle de Cafayate. Especialidad en carnes y vinos locales.",
  "categoria": "65abc123...",
  "direccion": "Av. Güemes 520, Cafayate",
  "telefono": "3868-421234",
  "email": "info@elantigal.com",
  "website": "https://elantigal.com",
  "horarios": "Lunes a Domingo: 12:00 - 23:00",
  "imagenes": [
    "https://ejemplo.com/imagen1.jpg",
    "https://ejemplo.com/imagen2.jpg"
  ],
  "logo": "https://ejemplo.com/logo.png",
  "ubicacion": {
    "latitud": -26.075,
    "longitud": -65.714
  },
  "redesSociales": {
    "facebook": "elantigalcafayate",
    "instagram": "@elantigal",
    "whatsapp": "+543868421234"
  },
  "destacado": true,
  "nivel": "Oro"
}
```

### 6. Actualizar Lugar (requiere admin)

```bash
PUT http://localhost:5000/api/lugares/65def456...
Authorization: Bearer {tu_token_admin}
Content-Type: application/json

{
  "nombre": "Restaurant El Antigal - Actualizado",
  "telefono": "3868-421235",
  "horarios": "Martes a Domingo: 12:00 - 00:00"
}
```

### 7. Eliminar Lugar (requiere admin)

```bash
DELETE http://localhost:5000/api/lugares/65def456...
Authorization: Bearer {tu_token_admin}
```

## 📋 EJEMPLOS COMPLETOS

### Flujo completo: Crear una Guía Turística

#### Paso 1: Registrar usuario admin
```bash
POST http://localhost:5000/api/auth/registro
Content-Type: application/json

{
  "nombre": "Admin Cafayate",
  "email": "admin@cafayate.com",
  "password": "admin123",
  "rol": "admin"
}
```

**Guarda el token que te devuelve**

#### Paso 2: Crear categorías
```bash
# Categoría Restaurantes
POST http://localhost:5000/api/categorias
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Restaurantes",
  "descripcion": "Gastronomía local y regional",
  "icono": "restaurant",
  "orden": 1
}

# Categoría Bodegas
POST http://localhost:5000/api/categorias
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Bodegas",
  "descripcion": "Bodegas y viñedos",
  "icono": "wine_bar",
  "orden": 2
}

# Categoría Hoteles
POST http://localhost:5000/api/categorias
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Hoteles",
  "descripcion": "Alojamiento y hospedaje",
  "icono": "hotel",
  "orden": 3
}
```

**Guarda los IDs de las categorías**

#### Paso 3: Crear lugares
```bash
POST http://localhost:5000/api/lugares
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Bodega El Esteco",
  "descripcion": "Bodega histórica con degustaciones y tours guiados",
  "categoria": "{id_categoria_bodegas}",
  "direccion": "Ruta 40, Km 4385",
  "telefono": "3868-421310",
  "email": "info@elesteco.com",
  "website": "https://elesteco.com",
  "horarios": "Lunes a Sábado: 9:00 - 18:00",
  "nivel": "Oro",
  "destacado": true
}
```

#### Paso 4: Consultar lugares por categoría
```bash
GET http://localhost:5000/api/lugares?categoria={id_categoria_bodegas}
```

#### Paso 5: Ver sponsors
```bash
GET http://localhost:5000/api/lugares/sponsors/oro
```

## 🧪 Testing con cURL

### Registro
```bash
curl -X POST http://localhost:5000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test User","email":"test@test.com","password":"123456"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

### Obtener lugares (con token)
```bash
curl http://localhost:5000/api/lugares \
  -H "Authorization: Bearer {tu_token}"
```

## 🔑 Notas Importantes

1. **Token JWT**: Guarda el token que recibes al hacer login o registro. Lo necesitarás para endpoints protegidos.

2. **Rol Admin**: Para crear, editar o eliminar categorías y lugares, necesitas un usuario con rol "admin".

3. **Validaciones**: Todos los endpoints tienen validaciones. Si envías datos incorrectos, recibirás mensajes de error específicos.

4. **IDs de MongoDB**: Los IDs son strings de 24 caracteres hexadecimales (ej: "65abc123def456789abc1234").

5. **Búsqueda de Texto**: El parámetro `search` busca en los campos `nombre` y `descripcion` de lugares.

## 🎯 Estados de Respuesta HTTP

- `200` - OK (éxito)
- `201` - Created (recurso creado)
- `400` - Bad Request (error de validación)
- `401` - Unauthorized (no autenticado)
- `403` - Forbidden (no autorizado/no es admin)
- `404` - Not Found (recurso no encontrado)
- `500` - Internal Server Error (error del servidor)
