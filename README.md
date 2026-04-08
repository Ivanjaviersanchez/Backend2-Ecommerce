# 🛒 Backend Ecommerce - Node.js + Express + MongoDB

## 📌 Descripción

API REST para gestión de productos con autenticación basada en sesiones, control de acceso por roles (`user` / `admin`) y relaciones entre usuarios y productos.

Este proyecto implementa buenas prácticas de backend:

* Arquitectura por capas (routes / controllers / services)
* Autenticación con sesiones (`express-session`)
* Persistencia de sesiones en MongoDB (`connect-mongo`)
* Autorización por roles
* Relaciones con `populate` (MongoDB)

---

## 🚀 Tecnologías utilizadas

* Node.js
* Express.js
* MongoDB + Mongoose
* express-session
* connect-mongo
* dotenv
* Postman (testing)

---

## ⚙️ Instalación

1. Clonar el repositorio:

```bash
git clone <tu-repo-url>
cd <nombre-del-proyecto>
```

2. Instalar dependencias:

```bash
npm install
```

---

## 🔐 Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con:

```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/ecommerce
SESSION_SECRET=superSecretKey
```

📌 Descripción:

* `PORT`: puerto del servidor
* `MONGO_URI`: conexión a MongoDB
* `SESSION_SECRET`: clave para firmar sesiones

---

## ▶️ Ejecutar el proyecto

```bash
npm run dev
```

o

```bash
npm start
```

Servidor corriendo en:

```
http://localhost:8080
```

---

## 🔑 Autenticación

La API utiliza sesiones.

### 📌 Flujo:

1. Login → genera cookie de sesión
2. Requests siguientes → usan la cookie automáticamente
3. Logout → destruye la sesión

---

## 📦 Endpoints principales

### 🔐 Auth

| Método | Endpoint             | Descripción       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Registrar usuario |
| POST   | `/api/auth/login`    | Login             |
| POST   | `/api/auth/logout`   | Logout            |
| GET    | `/api/auth/profile`  | Usuario logueado  |

---

### 🛒 Products

| Método | Endpoint            | Acceso      | Descripción           |
| ------ | ------------------- | ----------- | --------------------- |
| GET    | `/api/products`     | User        | Productos del usuario |
| GET    | `/api/products/all` | Admin       | Todos los productos   |
| POST   | `/api/products`     | User        | Crear producto        |
| PUT    | `/api/products/:id` | Owner/Admin | Actualizar            |
| DELETE | `/api/products/:id` | Owner/Admin | Eliminar              |

---

## 🔒 Autorización

* `user`: solo puede ver/modificar sus productos
* `admin`: puede ver y modificar todos los productos

---

## 🔗 Relaciones (Populate)

Cada producto tiene un `owner`:

```js
owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
}
```

Uso de populate:

```js
.populate("owner", "email username")
```

---

## 🧪 Pruebas con Postman

### 📌 Pasos:

1. Registrar usuario
2. Login
3. Acceder a:

   ```
   GET /api/products
   ```
4. Crear producto
5. Probar:

   ```
   GET /api/products/all (admin)
   ```
6. Logout
7. Intentar acceder nuevamente → debe fallar ❌

📌 Importante:
Postman guarda automáticamente la cookie de sesión.

---

## 🧠 Notas importantes

* Los productos están asociados a usuarios
* Se aplica control de permisos en backend
* Se usa `populate` para traer datos del owner
* Las sesiones se almacenan en MongoDB

---

## 📌 Estado del proyecto

✅ Autenticación con sesiones
✅ Rutas protegidas
✅ Roles (admin / user)
✅ CRUD completo
✅ Relaciones con MongoDB
✅ Arquitectura profesional

---

## 👨‍💻 Autor

Ivan Sanchez
