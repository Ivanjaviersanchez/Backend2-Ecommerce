# 🚀 API Backend - Autenticación y Autorización

## 📌 Descripción

Esta API REST fue desarrollada con **Node.js + Express** e implementa un sistema completo de autenticación y autorización utilizando:

* **Passport (Local + GitHub)**
* **JWT (JSON Web Tokens)**
* **Cookies seguras**
* **Sesiones (sistema híbrido)**

Permite registrar usuarios, iniciar sesión, generar tokens y acceder a rutas protegidas.

---

## 🧱 Arquitectura del Proyecto

El proyecto está organizado siguiendo buenas prácticas por capas:

```
/routes        → Definición de endpoints
/controllers   → Lógica de negocio
/services      → Funciones auxiliares (JWT, auth)
/middlewares   → Autenticación y validaciones
/models        → Modelos de datos (MongoDB)
```

---

## 🔐 Flujo de Autenticación

### 1. Registro

El usuario se registra con:

* email
* password (hasheada con bcrypt)

---

### 2. Login

Existen 3 formas de login:

#### 🔹 Login con sesión

```
POST /api/auth/login
```

#### 🔹 Login con JWT

```
POST /api/auth/login-jwt
```

✔ Genera un token JWT
✔ Se envía en:

* JSON response
* Cookie HttpOnly

---

#### 🔹 Login con Passport

```
POST /api/auth/login-passport
```

✔ Usa estrategia local
✔ Genera JWT automáticamente

---

### 3. Acceso a rutas protegidas

Se debe enviar el token en:

```
Authorization: Bearer <token>
```

o mediante cookie:

```
authToken
```

---

## 🔑 JWT

El token incluye un **payload mínimo**:

```json
{
  "id": "user_id",
  "email": "user@email.com",
  "role": "user"
}
```

✔ Expiración: **1 hora**

---

## 🍪 Cookies seguras

El token también se guarda como cookie:

```js
{
  httpOnly: true,
  sameSite: "lax",
  secure: false // true en producción
}
```

✔ Protege contra XSS
✔ Reduce riesgo de CSRF

---

## 📡 Endpoints principales

### 🔐 AUTH

#### Registro

```
POST /api/auth/register
```

#### Login (sesión)

```
POST /api/auth/login
```

#### Login JWT

```
POST /api/auth/login-jwt
```

Respuesta:

```json
{
  "message": "Login JWT exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### Login con Passport

```
POST /api/auth/login-passport
```

---

#### Logout

```
POST /api/auth/logout
```

---

### 👤 Usuario autenticado

#### Obtener usuario actual

```
GET /api/auth/current
```

Headers:

```
Authorization: Bearer <token>
```

Respuesta:

```json
{
  "status": 200,
  "user": {
    "id": "123",
    "email": "user@email.com",
    "role": "user"
  }
}
```

---

## ⚠️ Manejo de errores

### 401 Unauthorized

Cuando:

* Credenciales inválidas
* No se envía token

```json
{
  "status": 401,
  "error": "Unauthorized",
  "message": "Credenciales inválidas"
}
```

---

### 403 Forbidden

Cuando:

* Token inválido o expirado

```json
{
  "status": 403,
  "error": "Forbidden",
  "message": "Token inválido o expirado"
}
```

---

## 🧪 Cómo probar la API (Postman)

### 1. Login

```
POST /api/auth/login-jwt
```

Body:

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

---

### 2. Copiar Token

---

### 3. Acceder a ruta protegida

```
GET /api/auth/current
```

Headers:

```
Authorization: Bearer TU_TOKEN
```

---

## 🔐 Seguridad implementada

✔ Contraseñas hasheadas con bcrypt
✔ JWT con expiración
✔ Cookies HttpOnly
✔ Protección de rutas con middleware
✔ Manejo de errores 401 y 403

---

## 🌐 OAuth con GitHub

### Iniciar login

```
GET /api/auth/github
```

### Callback

```
GET /api/auth/github/callback
```

✔ Genera JWT automáticamente
✔ Devuelve usuario autenticado

---

## ⚙️ Variables de entorno

Crear archivo `.env`:

```
PORT=8080
MONGO_URI=tu_uri_mongodb
SESSION_SECRET=secret_session
JWT_SECRET=secret_jwt
```

---

## ▶️ Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```

Servidor corriendo en:

```
http://localhost:8080
```

---

## 📌 Conclusión

Esta API implementa un sistema completo de autenticación moderno con:

* Passport
* JWT
* Cookies seguras
* Middleware de protección

Siguiendo buenas prácticas de seguridad y arquitectura utilizadas en entornos profesionales.

---

