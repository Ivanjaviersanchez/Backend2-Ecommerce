#  API Backend - Autenticación y Autorización

##  Descripción

API REST desarrollada con **Node.js + Express** que implementa un sistema completo de autenticación y autorización utilizando:

- Passport (Local + GitHub + JWT)
- JWT (JSON Web Tokens)
- Cookies seguras (HttpOnly)
- Sesiones (sistema híbrido)
- MongoDB Atlas (base de datos en la nube)

Permite registrar usuarios, iniciar sesión, generar tokens y proteger rutas con control de acceso por roles.

---

##  Arquitectura del Proyecto

El proyecto está organizado siguiendo buenas prácticas por capas:

/routes        → Definición de endpoints  
/controllers   → Lógica de negocio  
/services      → Funciones auxiliares (JWT, auth)  
/middlewares   → Autenticación y autorización  
/models        → Modelos de datos (MongoDB)

---

##  Base de Datos

Se utiliza MongoDB Atlas como base de datos principal.

- Conexión mediante mongoose
- Base: backend2
- Colecciones principales:
  - users
  - sessions

---

##  Configuración de Variables de Entorno

###  Archivo `.env`

Este archivo contiene las variables sensibles del proyecto y NO se sube al repositorio.

Ejemplo:

PORT=8080  
MONGO_URI=tu_uri_mongodb_atlas  
SESSION_SECRET=secret  
COOKIE_SECRET=secret  
JWT_SECRET=secret  

GITHUB_CLIENT_ID=tu_client_id  
GITHUB_CLIENT_SECRET=tu_secret  
GITHUB_CALLBACK_URL=http://localhost:8080/api/auth/github/callback  

---

###  Archivo `.env.example`

Este archivo SÍ se incluye en el repositorio y sirve como plantilla.

PORT=8080  

MONGO_URI=mongodb+srv://<db_user>:<db_password>@cluster.mongodb.net/backend2  

SESSION_SECRET=your_session_secret  
COOKIE_SECRET=your_cookie_secret  
JWT_SECRET=your_jwt_secret  

GITHUB_CLIENT_ID=your_github_client_id  
GITHUB_CLIENT_SECRET=your_github_client_secret  
GITHUB_CALLBACK_URL=http://localhost:8080/api/auth/github/callback  

---

###  Cómo usarlo

1. Clonar el repositorio  
2. Crear archivo `.env`  
3. Copiar contenido de `.env.example`  
4. Completar con tus credenciales reales  

---

##  Flujo de Autenticación

### 1. Registro

POST /api/auth/register

Body:

{
  "first_name": "Ivan",
  "last_name": "Sanchez",
  "email": "ivan@test.com",
  "age": 40,
  "password": "123456"
}

✔ Password hasheada con bcrypt  
✔ Rol por defecto: "user"

---

### 2. Login

🔹 Login con sesión  
POST /api/auth/login  

✔ Guarda usuario en req.session  

---

🔹 Login con JWT  
POST /api/auth/login-jwt  

✔ Genera token JWT  
✔ Se envía en JSON y cookie  

---

🔹 Login con Passport  
POST /api/auth/login-passport  

✔ Usa estrategia local  
✔ Genera JWT automáticamente  

---

### 3. Acceso a rutas protegidas

Se puede enviar el token de dos formas:

Header:
Authorization: Bearer TOKEN  

Cookie:
authToken  

---

##  JWT

Payload:

{
  "id": "user_id",
  "email": "user@email.com",
  "role": "user"
}

✔ Expiración: 1 hora  
✔ Validado en cada request  

---

##  Cookies

Configuración:

{
  httpOnly: true,
  sameSite: "lax",
  secure: false
}

✔ Protege contra XSS  
✔ Mitiga CSRF  

---

##  Endpoints

###  AUTH

POST /api/auth/register  
POST /api/auth/login  
POST /api/auth/login-jwt  
POST /api/auth/login-passport  
POST /api/auth/logout  

---

###  Usuario autenticado

GET /api/auth/current  
GET /api/auth/profile-jwt  
GET /api/auth/profile-passport-jwt  

---

###  Passport avanzado

GET /api/auth/profile-custom  

✔ Manejo personalizado de errores JWT  

---

###  Rutas protegidas por rol

GET /api/auth/admin  

✔ Requiere role = admin  
✔ Middleware: authorizeRole(["admin"])  

---

##  Middleware de Seguridad

### Autenticación

- jwtAuth
- passport-jwt

### Autorización

- authorizeRole(["admin"])

---

##  Manejo de errores

### 401 Unauthorized

- No token  
- Token inválido  
- Usuario no autenticado  

Respuesta:

{
  "status": "error",
  "message": "Usuario no autenticado"
}

---

### 403 Forbidden

- Usuario sin permisos  

Respuesta:

{
  "error": "No autorizado"
}

---

##  Pruebas en Postman

1. Registrar usuario  
POST /api/auth/register  

2. Login JWT  
POST /api/auth/login-jwt  

3. Copiar token  

4. Probar rutas protegidas  

GET /api/auth/current  
GET /api/auth/profile-jwt  
GET /api/auth/admin  

5. Prueba de roles  

- Usuario normal → 403  
- Usuario admin → acceso permitido  

---

##  Seguridad implementada

✔ bcrypt (hash de passwords)  
✔ JWT con expiración  
✔ Cookies HttpOnly  
✔ Protección de rutas  
✔ Control de roles  
✔ Passport strategies  
✔ Custom callback  
✔ Validación de token en cada request  

---

##  OAuth con GitHub

GET /api/auth/github  
GET /api/auth/github/callback  

✔ Login externo  
✔ Genera JWT automáticamente  

---

##  Ejecutar proyecto

npm install  
npm run dev  

Servidor:  
http://localhost:8080  

---

##  Conclusión

Se implementó una API completa con:

- Autenticación híbrida (Session + JWT)
- Passport (Local, JWT, GitHub)
- Protección de rutas
- Control de acceso por roles (admin/user)
- MongoDB Atlas
- Buenas prácticas de seguridad

