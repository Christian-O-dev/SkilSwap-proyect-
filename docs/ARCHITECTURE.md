# ARCHITECTURE.md

# Arquitectura de SkillSwap

Este documento es la referencia tÃ©cnica principal del proyecto. AquÃ­ se define quÃ© es SkillSwap, quÃ© arquitectura usa, cÃ³mo se organiza el cÃ³digo, cuÃ¡l es el modelo de datos y quÃ© API mÃ­nima debe existir para comenzar el desarrollo.

---

## 1. Resumen del proyecto

**SkillSwap** es una aplicaciÃ³n web de trueque de habilidades tÃ©cnicas.

La idea principal es que los usuarios puedan:

1. Registrarse.
2. Iniciar sesiÃ³n.
3. Publicar habilidades que saben hacer.
4. Ver habilidades publicadas por otros usuarios.
5. Solicitar un intercambio de habilidades.

Ejemplo:

- Un usuario ofrece enseÃ±ar HTML y CSS.
- Otro usuario ofrece enseÃ±ar JavaScript.
- Ambos pueden acordar un intercambio de conocimientos sin pago directo.

Flujo mÃ­nimo del MVP:

```text
Registro â†’ Login â†’ Crear habilidad â†’ Ver habilidades â†’ Solicitar intercambio
```

---

## 2. Stack tecnolÃ³gico oficial

| Parte | TecnologÃ­a |
|---|---|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Base de datos | MySQL |
| AutenticaciÃ³n | JWT |
| Hash de contraseÃ±as | bcrypt |
| ConexiÃ³n MySQL | mysql2 |
| Peticiones HTTP | Axios |
| Rutas frontend | React Router DOM |
| Variables de entorno | dotenv |
| Editor recomendado | VS Code |
| Control de versiones | Git + GitHub |

El stack oficial para este proyecto es **React + Vite, Node.js + Express y MySQL**.

No cambiar a PHP, Laravel, MongoDB, Firebase, Next.js, NestJS o Docker obligatorio salvo que el usuario lo pida expresamente.

---

## 3. Tipo de arquitectura

SkillSwap usa una arquitectura **cliente-servidor de 3 capas**:

```text
Usuario
  â†“
Frontend React + Vite
  â†“ HTTP / API REST
Backend Node.js + Express
  â†“ SQL
Base de datos MySQL
```

TambiÃ©n puede considerarse una **SPA** porque React permite cambiar de vistas sin recargar toda la pÃ¡gina.

---

## 4. Diagrama general

```mermaid
flowchart LR
    U[Usuario] --> F[Frontend React + Vite]
    F --> API[Backend Node.js + Express]
    API --> DB[(MySQL)]
    DB --> API
    API --> F
```

---

## 5. Responsabilidad de cada capa

## Frontend

El frontend es la parte visual que utiliza el usuario desde el navegador.

Responsabilidades:

- Mostrar pÃ¡ginas.
- Gestionar formularios.
- Enviar peticiones HTTP al backend.
- Guardar el token JWT en `localStorage`.
- AÃ±adir el token a las peticiones protegidas.
- Mostrar mensajes de error y Ã©xito.
- Permitir registro, login, publicaciÃ³n de habilidades y solicitudes.

TecnologÃ­as principales:

- React.
- Vite.
- Axios.
- React Router DOM.
- CSS.

## Backend

El backend contiene la lÃ³gica de negocio y protege los datos.

Responsabilidades:

- Registrar usuarios.
- Iniciar sesiÃ³n.
- Cifrar contraseÃ±as con `bcrypt`.
- Generar tokens JWT.
- Verificar tokens JWT.
- Proteger rutas privadas.
- Conectar con MySQL.
- Crear y listar habilidades.
- Crear solicitudes de intercambio.
- Aplicar reglas de negocio.

TecnologÃ­as principales:

- Node.js.
- Express.
- mysql2.
- bcrypt.
- jsonwebtoken.
- dotenv.
- cors.

## Base de datos

La base de datos guarda la informaciÃ³n permanente.

Motor:

```text
MySQL
```

Nombre recomendado:

```text
skillswap_db
```

---

## 6. Estructura recomendada del proyecto

```text
SkillSwap/
â”œâ”€â”€ backend/
â”‚   â”œâ”€â”€ package.json
â”‚   â”œâ”€â”€ .env
â”‚   â””â”€â”€ src/
â”‚       â”œâ”€â”€ app.js
â”‚       â”œâ”€â”€ server.js
â”‚       â”œâ”€â”€ routes/
â”‚       â”‚   â”œâ”€â”€ auth.routes.js
â”‚       â”‚   â”œâ”€â”€ users.routes.js
â”‚       â”‚   â”œâ”€â”€ skills.routes.js
â”‚       â”‚   â””â”€â”€ requests.routes.js
â”‚       â”œâ”€â”€ controllers/
â”‚       â”‚   â”œâ”€â”€ auth.controller.js
â”‚       â”‚   â”œâ”€â”€ users.controller.js
â”‚       â”‚   â”œâ”€â”€ skills.controller.js
â”‚       â”‚   â””â”€â”€ requests.controller.js
â”‚       â”œâ”€â”€ models/
â”‚       â”‚   â”œâ”€â”€ user.model.js
â”‚       â”‚   â”œâ”€â”€ skill.model.js
â”‚       â”‚   â””â”€â”€ request.model.js
â”‚       â”œâ”€â”€ middleware/
â”‚       â”‚   â””â”€â”€ auth.middleware.js
â”‚       â””â”€â”€ config/
â”‚           â””â”€â”€ db.js
â”‚
â”œâ”€â”€ frontend/
â”‚   â”œâ”€â”€ package.json
â”‚   â”œâ”€â”€ .env
â”‚   â””â”€â”€ src/
â”‚       â”œâ”€â”€ main.jsx
â”‚       â”œâ”€â”€ App.jsx
â”‚       â”œâ”€â”€ pages/
â”‚       â”‚   â”œâ”€â”€ LoginPage.jsx
â”‚       â”‚   â”œâ”€â”€ RegisterPage.jsx
â”‚       â”‚   â”œâ”€â”€ DashboardPage.jsx
â”‚       â”‚   â””â”€â”€ SkillsPage.jsx
â”‚       â”œâ”€â”€ components/
â”‚       â”‚   â”œâ”€â”€ Navbar.jsx
â”‚       â”‚   â””â”€â”€ SkillCard.jsx
â”‚       â”œâ”€â”€ services/
â”‚       â”‚   â”œâ”€â”€ api.js
â”‚       â”‚   â”œâ”€â”€ authService.js
â”‚       â”‚   â”œâ”€â”€ skillsService.js
â”‚       â”‚   â””â”€â”€ requestsService.js
â”‚       â”œâ”€â”€ context/
â”‚       â”‚   â””â”€â”€ AuthContext.jsx
â”‚       â””â”€â”€ styles/
â”‚           â””â”€â”€ global.css
â”‚
â”œâ”€â”€ database/
â”‚   â””â”€â”€ skillswap.sql
â”‚
â”œâ”€â”€ ARCHITECTURE.md
â”œâ”€â”€ IA_CONTEXT.md
â””â”€â”€ ROADMAP.md
```

---

## 7. Backend: detalle de carpetas

### `backend/src/app.js`

Configura Express:

- `express.json()`.
- `cors()`.
- Rutas principales.
- Ruta de prueba `/api/health`.
- Manejo bÃ¡sico de errores.

### `backend/src/server.js`

Arranca el servidor.

Puerto recomendado:

```text
3000
```

### `backend/src/config/db.js`

Crea la conexiÃ³n a MySQL usando `mysql2/promise`.

Debe leer las variables desde `.env`.

### `backend/src/routes`

Define las rutas HTTP.

Archivos mÃ­nimos:

- `auth.routes.js`
- `users.routes.js`
- `skills.routes.js`
- `requests.routes.js`

### `backend/src/controllers`

Contiene la lÃ³gica de cada endpoint:

- Validar datos recibidos.
- Llamar al modelo correspondiente.
- Aplicar reglas de negocio.
- Devolver respuesta JSON.

### `backend/src/models`

Contiene las consultas SQL.

Regla obligatoria:

```text
Usar consultas preparadas. No concatenar SQL con datos del usuario.
```

### `backend/src/middleware`

Contiene middlewares.

El principal es:

```text
auth.middleware.js
```

Sirve para verificar JWT y proteger rutas privadas.

---

## 8. Frontend: detalle de carpetas

### `frontend/src/pages`

Pantallas principales:

- `LoginPage.jsx`
- `RegisterPage.jsx`
- `DashboardPage.jsx`
- `SkillsPage.jsx`

### `frontend/src/components`

Componentes reutilizables:

- `Navbar.jsx`
- `SkillCard.jsx`

### `frontend/src/services`

Archivos para llamar al backend:

- `api.js`: instancia de Axios con URL base.
- `authService.js`: registro, login y usuario actual.
- `skillsService.js`: listar y crear habilidades.
- `requestsService.js`: crear y listar solicitudes.

### `frontend/src/context`

Estado global de sesiÃ³n:

- `AuthContext.jsx`

### `frontend/src/styles`

Estilos globales:

- `global.css`

---

## 9. API REST mÃ­nima

## Auth

| MÃ©todo | Endpoint | DescripciÃ³n | Protegida |
|---|---|---|---|
| POST | `/api/auth/register` | Registrar usuario | No |
| POST | `/api/auth/login` | Iniciar sesiÃ³n y devolver JWT | No |
| GET | `/api/users/me` | Obtener usuario actual | SÃ­ |

## Skills

| MÃ©todo | Endpoint | DescripciÃ³n | Protegida |
|---|---|---|---|
| GET | `/api/skills` | Listar habilidades | No |
| GET | `/api/skills/:id` | Ver detalle de habilidad | No |
| POST | `/api/skills` | Crear habilidad | SÃ­ |
| PUT | `/api/skills/:id` | Editar habilidad propia | SÃ­, opcional |
| DELETE | `/api/skills/:id` | Eliminar habilidad propia | SÃ­, opcional |

## Requests

| MÃ©todo | Endpoint | DescripciÃ³n | Protegida |
|---|---|---|---|
| POST | `/api/requests` | Crear solicitud de intercambio | SÃ­ |
| GET | `/api/requests` | Ver solicitudes del usuario | SÃ­ |

## Exchanges, opcional para fase posterior

| MÃ©todo | Endpoint | DescripciÃ³n | Protegida |
|---|---|---|---|
| POST | `/api/exchanges` | Crear intercambio desde solicitud aceptada | SÃ­ |

---

## 10. Modelo relacional

Entidades completas del proyecto:

```text
roles
users
skills
requests
exchanges
ratings
```

Para la primera entrega son obligatorias:

```text
roles
users
skills
requests
```

Opcional si hay tiempo:

```text
exchanges
```

Para fase final:

```text
ratings
```

---

## 11. Diagrama ER

```mermaid
erDiagram
    roles {
      INT id PK
      VARCHAR name
    }

    users {
      INT id PK
      VARCHAR username
      VARCHAR email
      VARCHAR password
      INT role_id FK
      TIMESTAMP created_at
    }

    skills {
      INT id PK
      INT user_id FK
      VARCHAR title
      TEXT description
      TIMESTAMP created_at
    }

    requests {
      INT id PK
      INT requester_id FK
      INT skill_id FK
      ENUM status
      TIMESTAMP created_at
    }

    exchanges {
      INT id PK
      INT request_id FK
      TIMESTAMP agreed_at
      ENUM status
    }

    ratings {
      INT id PK
      INT exchange_id FK
      INT rated_by FK
      INT rated_to FK
      INT score
      TEXT comment
      TIMESTAMP created_at
    }

    roles ||--o{ users : "tiene"
    users ||--o{ skills : "publica"
    users ||--o{ requests : "solicita"
    skills ||--o{ requests : "recibe"
    requests ||--o| exchanges : "genera"
    exchanges ||--o{ ratings : "recibe"
    users ||--o{ ratings : "emite"
    users ||--o{ ratings : "recibe"
```

---

## 12. Tablas principales

## `roles`

```text
id
name
```

Roles iniciales:

```text
admin
user
```

## `users`

```text
id
username
email
password
role_id
created_at
```

Notas:

- `username` debe ser Ãºnico.
- `email` debe ser Ãºnico.
- `password` guarda hash con `bcrypt`.
- `role_id` apunta a `roles.id`.

## `skills`

```text
id
user_id
title
description
created_at
```

Notas:

- Cada habilidad pertenece a un usuario.
- `user_id` viene del usuario autenticado.

## `requests`

```text
id
requester_id
skill_id
status
created_at
```

Estados:

```text
open
accepted
rejected
```

Notas:

- `requester_id` viene del usuario autenticado.
- `skill_id` apunta a la habilidad solicitada.
- Un usuario no puede solicitar su propia habilidad.

## `exchanges`

```text
id
request_id
agreed_at
status
```

Estados:

```text
pending
completed
cancelled
```

Notas:

- Una `request` aceptada genera como mÃ¡ximo un `exchange`.
- `exchanges.request_id` debe ser `UNIQUE`.

## `ratings`

```text
id
exchange_id
rated_by
rated_to
score
comment
created_at
```

Notas:

- Un intercambio puede tener varias valoraciones.
- `rated_by` indica quiÃ©n valora.
- `rated_to` indica quiÃ©n recibe la valoraciÃ³n.
- Un usuario no puede valorarse a sÃ­ mismo.
- Un usuario solo puede valorar una vez por intercambio.

---

## 13. SQL mÃ­nimo para empezar

```sql
CREATE DATABASE IF NOT EXISTS skillswap_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE skillswap_db;

CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role_id INT NOT NULL DEFAULT 2,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  requester_id INT NOT NULL,
  skill_id INT NOT NULL,
  status ENUM('open','accepted','rejected') DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (requester_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

INSERT INTO roles (name) VALUES ('admin'), ('user');
```

---

## 14. SQL completo para fase posterior

```sql
CREATE TABLE exchanges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  request_id INT NOT NULL UNIQUE,
  agreed_at TIMESTAMP NULL,
  status ENUM('pending','completed','cancelled') DEFAULT 'pending',
  FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ratings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exchange_id INT NOT NULL,
  rated_by INT NOT NULL,
  rated_to INT NOT NULL,
  score INT NOT NULL,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (exchange_id) REFERENCES exchanges(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (rated_by) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (rated_to) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT check_score CHECK (score BETWEEN 1 AND 5),
  CONSTRAINT check_rated_users CHECK (rated_by <> rated_to),
  UNIQUE KEY uq_rating_exchange_user (exchange_id, rated_by)
);
```

---

## 15. Reglas de negocio

- Un usuario debe estar registrado para iniciar sesiÃ³n.
- Un usuario debe estar logueado para crear habilidades.
- Un usuario debe estar logueado para crear solicitudes.
- Un usuario no puede solicitar una habilidad que Ã©l mismo publicÃ³.
- Una habilidad pertenece a un solo usuario.
- Una habilidad puede recibir muchas solicitudes.
- Una solicitud aceptada puede generar un Ãºnico intercambio.
- Solo se crea un `exchange` cuando una `request` estÃ¡ aceptada.
- Una valoraciÃ³n solo se puede registrar cuando un intercambio estÃ¡ completado.
- Un usuario no puede valorarse a sÃ­ mismo.
- Un usuario solo puede valorar una vez por cada intercambio.

---

## 16. Seguridad mÃ­nima

- Guardar contraseÃ±as con `bcrypt`.
- No devolver `password` en respuestas JSON.
- Usar JWT en rutas privadas.
- Enviar token como `Authorization: Bearer TOKEN`.
- Usar consultas SQL preparadas.
- Validar campos obligatorios.
- Guardar secretos en `.env`.
- Configurar CORS para el frontend de Vite.

---

## 17. Variables de entorno

Backend:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=skillswap_db
JWT_SECRET=skillswap_secret_dev
```

Frontend:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## 18. Puertos de desarrollo

```text
Frontend: http://localhost:5173
Backend:  http://localhost:3000
MySQL:    localhost:3306
```

---

## 19. Criterio tÃ©cnico principal

La arquitectura debe permitir empezar rÃ¡pido, mantener el cÃ³digo ordenado y ampliar el proyecto despuÃ©s sin rehacerlo desde cero.

Prioridad:

```text
Primero MVP funcional. DespuÃ©s mejoras.
```
