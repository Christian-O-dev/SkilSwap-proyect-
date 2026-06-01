# SESSION_SUMMARY.md

# Resumen de trabajo - SkillSwap

Este archivo resume lo que hicimos en esta sesion para poder continuar el proyecto desde otra PC sin perder el contexto.

---

## 1. Contexto revisado

Se leyeron estos archivos antes de empezar:

- [docs/IA_CONTEXT.md](./IA_CONTEXT.md)
- [docs/ROADMAP.md](./ROADMAP.md)
- [docs/ARCHITECTURE.md](./ARCHITECTURE.md)

Contexto confirmado:

```text
SkillSwap es una app web para intercambio de habilidades tecnicas.
```

Flujo MVP confirmado:

```text
Registro -> Login -> Crear habilidad -> Ver habilidades -> Solicitar intercambio
```

Stack oficial confirmado:

```text
Frontend: React + Vite
Backend: Node.js + Express
Base de datos: MySQL
Auth: JWT
Hash: bcrypt
Conexion MySQL: mysql2
HTTP: Axios
Rutas frontend: React Router DOM
Env: dotenv
```

Regla importante seguida durante toda la sesion:

```text
No tocar ROADMAP.md porque ya tenia cambios locales del usuario.
```

---

## 2. Fase 1 completada

## Paso 1 - Estructura base

Se crearon:

- `backend/`
- `frontend/`
- `database/`

Estructura creada:

```text
backend/src/
â”œâ”€â”€ app.js
â”œâ”€â”€ server.js
â”œâ”€â”€ routes/
â”œâ”€â”€ controllers/
â”œâ”€â”€ models/
â”œâ”€â”€ middleware/
â””â”€â”€ config/
```

```text
frontend/src/
â”œâ”€â”€ main.jsx
â”œâ”€â”€ App.jsx
â”œâ”€â”€ pages/
â”œâ”€â”€ components/
â”œâ”€â”€ services/
â”œâ”€â”€ context/
â””â”€â”€ styles/
```

Se aÃ±adieron archivos guia con comentarios cortos para orientacion.

## Paso 2 - Backend inicializado

Comandos usados:

```bash
npm init -y
npm install express mysql2 dotenv cors bcrypt jsonwebtoken
npm install -D nodemon
```

Scripts dejados en `backend/package.json`:

```json
"dev": "nodemon src/server.js",
"start": "node src/server.js"
```

## Paso 3 - Frontend con Vite

Problema detectado:

```text
Vite cancelo la generacion porque la carpeta frontend/ ya tenia archivos guia.
```

Leccion importante:

```text
No generar Vite directamente sobre una carpeta que ya tenga contenido preparado.
```

Solucion aplicada:

- se genero una plantilla React + Vite en una carpeta temporal
- luego se copio a `frontend/`
- despues se instalaron dependencias

Comandos usados:

```bash
npm install
npm install axios react-router-dom
```

Estado del frontend:

- Vite listo
- React listo
- `axios` instalado
- `react-router-dom` instalado
- sigue visible la demo inicial de Vite

## Paso 4 - Env y gitignore

Archivos creados:

- `backend/.gitignore`
- `backend/.env`
- `backend/.env.example`
- `frontend/.env`
- `frontend/.env.example`

Variables base del backend:

```env
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=skillswap_db
JWT_SECRET=skillswap_secret_key
```

Variable base del frontend:

```env
VITE_API_URL=http://localhost:3000/api
```

## Paso 5 - Arranque minimo

Se implemento un backend minimo funcional:

- `express`
- `cors`
- `express.json()`
- `GET /api/health`
- respuesta `404`

Resultado:

- backend arranca
- frontend compila

---

## 3. Fase 2 completada

Se creo [database/skillswap.sql](./database/skillswap.sql) con:

- creacion de `skillswap_db`
- tabla `roles`
- tabla `users`
- tabla `skills`
- tabla `requests`
- tabla `exchanges`
- tabla `ratings`
- claves foraneas
- restricciones `UNIQUE`
- `CHECK` para score y auto valoracion
- insercion inicial de roles `admin` y `user`

Tablas incluidas:

```text
roles
users
skills
requests
exchanges
ratings
```

Nota importante:

```text
El SQL esta escrito, pero no se confirmo aun una importacion correcta porque hubo problemas de acceso a MySQL en el entorno local del usuario.
```

---

## 4. Fase 3 completada

Se construyo la API base del backend.

Archivos actualizados:

- `backend/src/app.js`
- `backend/src/server.js`
- `backend/src/config/db.js`
- `backend/src/routes/auth.routes.js`
- `backend/src/routes/users.routes.js`
- `backend/src/routes/skills.routes.js`
- `backend/src/routes/requests.routes.js`

## `backend/src/config/db.js`

Ahora contiene:

- `mysql2/promise`
- un `pool` reutilizable
- `testDatabaseConnection()` para probar acceso a MySQL

## `backend/src/app.js`

Ahora contiene:

- `cors`
- `express.json()`
- `GET /api/health`
- montaje de rutas:
  - `/api/auth`
  - `/api/users`
  - `/api/skills`
  - `/api/requests`
- middleware basico de error `500`
- middleware `404`

## Rutas base temporales

Durante esta fase se dejaron respuestas JSON simples para:

- `/api/auth`
- `/api/users`
- `/api/skills`
- `/api/requests`

Esto sirvio como columna vertebral antes de meter logica real.

---

## 5. Fase 4 completada

Se implemento autenticacion real con JWT.

Archivos actualizados:

- `backend/src/models/user.model.js`
- `backend/src/controllers/auth.controller.js`
- `backend/src/controllers/users.controller.js`
- `backend/src/middleware/auth.middleware.js`
- `backend/src/routes/auth.routes.js`
- `backend/src/routes/users.routes.js`

## Modelo de usuario

`backend/src/models/user.model.js` ahora incluye consultas preparadas para:

- buscar usuario por email
- buscar usuario por username
- crear usuario
- buscar usuario por id

## Auth controller

`backend/src/controllers/auth.controller.js` ahora implementa:

- `POST /api/auth/register`
- `POST /api/auth/login`

Incluye:

- validacion basica de datos
- validacion de email unico
- validacion de username unico
- hash de password con `bcrypt`
- comparacion con `bcrypt.compare`
- generacion de JWT con expiracion de `7d`

## Users controller

`backend/src/controllers/users.controller.js` ahora implementa:

- `GET /api/users/me`

## Middleware JWT

`backend/src/middleware/auth.middleware.js` ahora:

- lee `Authorization: Bearer token`
- verifica el JWT
- guarda el usuario decodificado en `req.user`
- bloquea acceso si el token falta o es invalido

---

## 6. Estado actual del backend

Endpoints ya implementados:

```text
GET  /api/health
POST /api/auth/register
POST /api/auth/login
GET  /api/users/me
GET  /api/skills
GET  /api/requests
```

Importante:

- `GET /api/skills` y `GET /api/requests` siguen siendo respuestas temporales
- la logica real de skills y requests todavia no esta hecha
- auth ya esta implementado

---

## 7. Pruebas realizadas

## Backend

Probado:

```bash
cd backend
npm run start
```

Resultado visto:

```text
Servidor backend escuchando en http://localhost:3000
```

Tambien se comprobo que los archivos de auth cargan sin errores de sintaxis.

## Frontend

Probado:

```bash
cd frontend
npm run build
```

Resultado:

```text
Build correcta con Vite, sin errores.
```

---

## 8. Problema detectado con MySQL en Mac + XAMPP

El usuario reporto este error al ejecutar SQL o probar conexion:

```text
Error: Access denied for user 'root'@'localhost' (using password: YES)
```

Diagnostico importante:

- el error no venia del backend minimo inicial
- despues, al entrar en auth real, si puede venir de la conexion MySQL
- en VS Code o en la extension SQL parece que se esta usando password aunque en `.env` esta vacia

Estado actual:

```text
La parte de codigo de auth ya esta lista, pero hace falta que MySQL/XAMPP acepte bien la conexion para probar register y login de verdad.
```

Configuracion recomendada en `.env`:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=skillswap_db
```

---

## 9. Como probar el proyecto ahora

## Backend

```bash
cd backend
npm install
npm run dev
```

Probar salud:

```bash
curl http://localhost:3000/api/health
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Abrir la URL de Vite, normalmente:

```text
http://localhost:5173
```

## Cuando MySQL este funcionando

### Registro

```bash
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"username":"alex","email":"alex@test.com","password":"123456"}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"alex@test.com","password":"123456"}'
```

### Usuario autenticado

```bash
curl http://localhost:3000/api/users/me \
-H "Authorization: Bearer TU_TOKEN"
```

---

## 10. Archivos clave ahora mismo

Backend:

- `backend/package.json`
- `backend/.env`
- `backend/src/app.js`
- `backend/src/server.js`
- `backend/src/config/db.js`
- `backend/src/models/user.model.js`
- `backend/src/controllers/auth.controller.js`
- `backend/src/controllers/users.controller.js`
- `backend/src/middleware/auth.middleware.js`

Frontend:

- `frontend/package.json`
- `frontend/.env`
- `frontend/src/main.jsx`
- `frontend/src/App.jsx`

Base de datos:

- `database/skillswap.sql`

Documentacion:

- `IA_CONTEXT.md`
- `ROADMAP.md`
- `ARCHITECTURE.md`
- `SESSION_SUMMARY.md`

---

## 11. Siguiente paso recomendado

Siguiente fase natural:

```text
Fase 5 - Habilidades
```

Tareas recomendadas:

1. Implementar `skill.model.js`
2. Implementar `skills.controller.js`
3. Crear:
   - `GET /api/skills`
   - `GET /api/skills/:id`
   - `POST /api/skills`
4. Proteger `POST /api/skills` con JWT
5. Usar `req.user.id` como `user_id`

Antes de eso conviene dejar resuelto MySQL en XAMPP para poder probar de verdad las consultas reales.

---

## 12. Resumen corto del estado actual

```text
Fase 1 completada.
Fase 2 escrita en SQL.
Fase 3 completada.
Fase 4 completada en codigo.
Frontend base listo pero aun con demo de Vite.
Backend con auth real ya implementado.
Falta resolver bien la conexion MySQL local para validar register y login.
```
