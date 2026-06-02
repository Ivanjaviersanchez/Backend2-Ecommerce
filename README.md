# Backend2-Ecommerce

Sistema de Autenticación Híbrido desarrollado con Node.js, Express y MongoDB.

Implementa múltiples estrategias de autenticación y autorización utilizando Sessions, JWT y Passport.js, incluyendo autenticación OAuth con GitHub.

---

## Tecnologías Utilizadas

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Passport.js
* Passport Local Strategy
* Passport JWT Strategy
* Passport GitHub OAuth Strategy
* JSON Web Tokens (JWT)
* Express Session
* Connect Mongo
* Bcrypt
* Cookie Parser
* Dotenv

---

## Características Principales

### Autenticación

* Registro de usuarios
* Login mediante sesiones
* Login mediante JWT
* Login con Passport Local
* Login OAuth con GitHub
* Logout con destrucción de sesión

### Autorización

* Protección de rutas mediante JWT
* Protección de rutas mediante Passport JWT
* Control de acceso basado en roles
* Middleware de autorización para administradores

### Seguridad

* Passwords hasheadas con bcrypt
* Cookies HttpOnly
* JWT con expiración configurable
* Protección de rutas privadas
* Validación de roles
* Manejo centralizado de errores

---

## Arquitectura

El proyecto sigue una arquitectura modular por capas:

```txt
src
├── controllers
├── middlewares
├── models
├── routes
│   └── v1
├── services
├── strategies
├── app.js
└── server.js
```

### Responsabilidades

| Capa        | Función                        |
| ----------- | ------------------------------ |
| routes      | Definición de endpoints        |
| controllers | Manejo de requests y responses |
| services    | Lógica de negocio              |
| models      | Esquemas MongoDB               |
| middlewares | Seguridad y validaciones       |
| strategies  | Estrategias Passport           |
| app.js      | Configuración de Express       |

---

## Base de Datos

MongoDB Atlas

Colecciones principales:

* users
* products
* sessions

---

## Variables de Entorno

Crear un archivo `.env` utilizando como referencia `.env.example`.

### .env.example

```env
PORT=8080

MONGO_URI=mongodb+srv://<db_user>:<db_password>@cluster.mongodb.net/backend2

SESSION_SECRET=your_session_secret
COOKIE_SECRET=your_cookie_secret
JWT_SECRET=your_jwt_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

GITHUB_CALLBACK_URL=http://localhost:8080/api/v1/auth/github/callback
```

---

## Instalación

### Clonar repositorio

```bash
git clone <repository-url>
```

### Instalar dependencias

```bash
npm install
```

### Configurar variables de entorno

Crear archivo:

```bash
.env
```

Completar valores reales.

### Ejecutar proyecto

```bash
npm run dev
```

Servidor:

```txt
http://localhost:8080
```

---

## Flujo de Autenticación

```txt
CLIENTE
   │
   ▼
REQUEST
   │
   ▼
ROUTES
   │
   ▼
MIDDLEWARES
   │
   ▼
PASSPORT
(Local / JWT / GitHub)
   │
   ▼
CONTROLLERS
   │
   ▼
SERVICES
   │
   ▼
MONGODB
   │
   ▼
JWT / SESSION
   │
   ▼
RESPONSE
```

---

## Endpoints Principales

### Auth

| Método | Endpoint                    |
| ------ | --------------------------- |
| POST   | /api/v1/auth/register       |
| POST   | /api/v1/auth/login          |
| POST   | /api/v1/auth/login-jwt      |
| POST   | /api/v1/auth/login-passport |
| POST   | /api/v1/auth/logout         |

### Usuario autenticado

| Método | Endpoint                          |
| ------ | --------------------------------- |
| GET    | /api/v1/auth/profile              |
| GET    | /api/v1/auth/current              |
| GET    | /api/v1/auth/profile-jwt          |
| GET    | /api/v1/auth/profile-passport-jwt |

### Roles

| Método | Endpoint           |
| ------ | ------------------ |
| GET    | /api/v1/auth/admin |

### OAuth GitHub

| Método | Endpoint                     |
| ------ | ---------------------------- |
| GET    | /api/v1/auth/github          |
| GET    | /api/v1/auth/github/callback |

### Productos

| Método | Endpoint                 |
| ------ | ------------------------ |
| GET    | /api/v1/products/jwt     |
| GET    | /api/v1/products/jwt/all |
| POST   | /api/v1/products/jwt     |
| PUT    | /api/v1/products/jwt/:id |
| DELETE | /api/v1/products/jwt/:id |

---

## JWT

Payload utilizado:

```json
{
  "id": "user_id",
  "email": "user@email.com",
  "role": "user"
}
```

Expiración:

```txt
1 hora
```

---

## OAuth GitHub

La aplicación permite autenticación mediante GitHub utilizando Passport GitHub Strategy.

Proceso:

1. Usuario accede a `/api/v1/auth/github`
2. GitHub solicita autorización
3. GitHub redirecciona al callback
4. Passport valida identidad
5. Se crea usuario si no existe
6. Se genera JWT
7. Se crea cookie HttpOnly

---

## Seguridad Implementada

* Hash de contraseñas con bcrypt
* JWT firmado con secreto privado
* Expiración de tokens
* Cookies HttpOnly
* SameSite=Lax
* Control de acceso por roles
* Middleware de autenticación
* Middleware de autorización
* Manejo global de errores

---

## Proyecto Académico

Proyecto desarrollado como entrega final del curso Backend II.

Se implementó una arquitectura de autenticación híbrida integrando:

* Sessions
* JWT
* Passport Local
* Passport JWT
* Passport GitHub OAuth

aplicando buenas prácticas de organización, seguridad y separación de responsabilidades.


