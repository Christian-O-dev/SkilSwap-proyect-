# IA_CONTEXT.md

# Contexto para IA - SkillSwap

Este archivo está pensado para que herramientas como Codex, ChatGPT u otros asistentes de IA entiendan rápidamente el proyecto y puedan ayudar sin cambiar decisiones importantes.

---

## Nombre del proyecto

```text
SkillSwap
```

---

## Descripción corta

SkillSwap es una aplicación web para intercambiar habilidades técnicas entre usuarios. Funciona como una comunidad o marketplace P2P, pero sin pagos directos. Los usuarios publican habilidades que ofrecen y pueden solicitar intercambios con otros usuarios.

Flujo principal:

```text
Registro → Login → Crear habilidad → Ver habilidades → Solicitar intercambio
```

---

## Objetivo actual

Preparar una **primera entrega funcional para el viernes 5 de junio de 2026**.

La entrega no debe ser perfecta ni completa. Debe demostrar que el proyecto funciona de principio a fin con datos reales en MySQL.

---

## Stack oficial del proyecto

La IA debe respetar este stack salvo instrucción contraria del usuario.

```text
Frontend: React + Vite
Backend: Node.js + Express
Base de datos: MySQL
Autenticación: JWT
Contraseñas: bcrypt
Peticiones HTTP: Axios
Control de versiones: Git + GitHub
Editor: VS Code
```

---

## Importante: no cambiar el stack

No convertir el proyecto a:

- PHP.
- Laravel.
- XAMPP como arquitectura principal.
- MongoDB.
- Firebase.
- Next.js.
- NestJS.
- TypeScript obligatorio.
- Docker obligatorio.

Docker puede proponerse como mejora posterior, pero no debe bloquear la primera entrega.

---

## Prioridad de la primera entrega

La IA debe priorizar esto:

1. Backend funcional.
2. Base de datos conectada.
3. Registro de usuario.
4. Login con JWT.
5. Rutas protegidas.
6. Crear habilidad.
7. Listar habilidades.
8. Crear solicitud de intercambio.
9. Frontend conectado al backend.
10. CSS básico presentable.

---

## Fuera de alcance para la primera entrega

No implementar todavía salvo que el usuario lo pida explícitamente:

- Chat.
- Valoraciones.
- Sistema avanzado de ratings.
- Panel avanzado de administrador.
- Recuperación de contraseña.
- Subida de imágenes.
- Notificaciones por email.
- Swagger completo obligatorio.
- Docker obligatorio.
- Testing avanzado.
- Despliegue en producción.
- Pasarela de pago.

---

## Modelo relacional del proyecto

Entidades principales:

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

## Tablas mínimas

## `roles`

Campos:

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

Campos:

```text
id
username
email
password
role_id
created_at
```

Notas:

- `email` debe ser único.
- `username` debe ser único.
- `password` debe guardar hash, no texto plano.
- `role_id` por defecto debe apuntar a `user`.

## `skills`

Campos:

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

Campos:

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

---

## Reglas de negocio

La IA debe respetar estas reglas:

- Un usuario debe estar registrado para iniciar sesión.
- Un usuario debe estar logueado para crear habilidades.
- Un usuario debe estar logueado para crear solicitudes.
- Un usuario no puede solicitar una habilidad que él mismo publicó.
- Las contraseñas siempre se guardan con `bcrypt`.
- Las rutas privadas se protegen con JWT.
- El frontend debe enviar el token como `Bearer Token`.
- El backend no debe devolver la contraseña del usuario.
- Las consultas SQL deben ser preparadas.
- La primera entrega debe priorizar funcionalidad antes que diseño avanzado.

---

## Endpoints mínimos esperados

## Autenticación

```text
POST /api/auth/register
POST /api/auth/login
GET /api/users/me
```

## Habilidades

```text
GET /api/skills
GET /api/skills/:id
POST /api/skills
```

Opcionales:

```text
PUT /api/skills/:id
DELETE /api/skills/:id
```

## Solicitudes

```text
POST /api/requests
GET /api/requests
```

---

## Estructura backend recomendada

```text
backend/
├── package.json
├── .env
└── src/
    ├── app.js
    ├── server.js
    ├── routes/
    │   ├── auth.routes.js
    │   ├── users.routes.js
    │   ├── skills.routes.js
    │   └── requests.routes.js
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── users.controller.js
    │   ├── skills.controller.js
    │   └── requests.controller.js
    ├── models/
    │   ├── user.model.js
    │   ├── skill.model.js
    │   └── request.model.js
    ├── middleware/
    │   └── auth.middleware.js
    └── config/
        └── db.js
```

---

## Estructura frontend recomendada

```text
frontend/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── pages/
    │   ├── LoginPage.jsx
    │   ├── RegisterPage.jsx
    │   ├── DashboardPage.jsx
    │   └── SkillsPage.jsx
    ├── components/
    │   ├── Navbar.jsx
    │   └── SkillCard.jsx
    ├── services/
    │   ├── api.js
    │   ├── authService.js
    │   ├── skillsService.js
    │   └── requestsService.js
    ├── context/
    │   └── AuthContext.jsx
    └── styles/
        └── global.css
```

---

## Convenciones de código

## Backend

- Usar CommonJS o ES Modules de forma consistente. No mezclar sin necesidad.
- Preferible CommonJS si el proyecto ya empezó con `require`.
- Usar `async/await`.
- Separar rutas, controladores y modelos.
- Los controladores no deben tener SQL largo si puede ir en modelos.
- Las respuestas deben ser JSON.
- Usar códigos HTTP correctos.

Códigos esperados:

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error
```

## Frontend

- Usar componentes funcionales.
- Usar hooks.
- Separar servicios de API.
- No repetir URLs del backend en todas las páginas.
- Guardar la URL base en `services/api.js`.
- Manejar errores con mensajes simples para el usuario.
- Mantener CSS claro y sencillo.

---

## Variables de entorno

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

## Cómo debe trabajar la IA en este repositorio

Cuando la IA proponga o modifique código, debe:

1. Leer primero la estructura existente.
2. No borrar archivos sin necesidad.
3. Hacer cambios pequeños y verificables.
4. Mantener nombres claros.
5. Respetar el stack oficial.
6. Priorizar la primera entrega.
7. Explicar cómo probar cada cambio.
8. Avisar si una función queda pendiente.
9. Evitar sobrecomplicar el proyecto.
10. No añadir dependencias innecesarias.

---

## Prompts útiles para Codex

## Crear backend base

```text
Crea el backend base de SkillSwap con Express, CORS, dotenv y conexión a MySQL usando mysql2. Respeta la estructura backend/src con routes, controllers, models, middleware y config.
```

## Crear autenticación

```text
Implementa registro y login con bcrypt y JWT. Usa MySQL con consultas preparadas. Crea o actualiza auth.routes.js, auth.controller.js, user.model.js y auth.middleware.js.
```

## Crear habilidades

```text
Implementa GET /api/skills y POST /api/skills. La creación debe estar protegida con JWT y debe usar req.user.id como user_id.
```

## Crear solicitudes

```text
Implementa POST /api/requests para solicitar una habilidad. Debe verificar que el usuario esté logueado y que no solicite una habilidad propia.
```

## Crear frontend

```text
Crea las páginas LoginPage, RegisterPage, DashboardPage y SkillsPage en React + Vite. Conecta el frontend con el backend usando Axios y localStorage para el token.
```

## Revisar errores

```text
Revisa el proyecto para detectar errores de imports, rutas rotas, problemas de CORS, conexión a MySQL y manejo incorrecto del token JWT.
```

---

## Criterios de aceptación de la entrega

La primera entrega se considera funcional si se puede demostrar:

- El backend arranca.
- El frontend arranca.
- MySQL está conectado.
- Se puede registrar un usuario.
- Se puede iniciar sesión.
- Se genera un token JWT.
- Se puede crear una habilidad.
- Se pueden listar habilidades.
- Se puede crear una solicitud de intercambio.
- Los datos aparecen en MySQL.
- El proyecto está subido a GitHub.

---

## Demo esperada

El día de clase se debe poder mostrar:

1. Abrir la web.
2. Registrar un usuario.
3. Iniciar sesión.
4. Ver el dashboard.
5. Crear una habilidad.
6. Ver la habilidad en el listado.
7. Solicitar intercambio.
8. Enseñar la base de datos con los datos guardados.

---

## Recordatorio para la IA

La prioridad es terminar una versión pequeña pero funcional. No añadir características grandes antes de cerrar el flujo principal.

Regla principal:

```text
Primero que funcione. Después se mejora.
```
