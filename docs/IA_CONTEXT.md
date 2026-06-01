# IA_CONTEXT.md

# Contexto para IA - SkillSwap

Este archivo es la guÃ­a principal para cualquier IA que trabaje en este repositorio: ChatGPT, Codex u otro asistente. Su objetivo es evitar confusiÃ³n, cambios de stack innecesarios y decisiones que se salgan del alcance inicial.

---

## 1. Nombre del proyecto

```text
SkillSwap
```

---

## 2. DescripciÃ³n corta

SkillSwap es una aplicaciÃ³n web para intercambiar habilidades tÃ©cnicas entre usuarios.

Funciona como una comunidad o marketplace P2P, pero sin pagos directos. Los usuarios publican habilidades que ofrecen y pueden solicitar intercambios con otros usuarios.

Flujo principal del MVP:

```text
Registro â†’ Login â†’ Crear habilidad â†’ Ver habilidades â†’ Solicitar intercambio
```

---

## 3. Objetivo actual

Preparar una **primera entrega funcional para el viernes 5 de junio de 2026**.

La entrega no debe ser perfecta ni completa. Debe demostrar que el proyecto funciona de principio a fin con datos reales en MySQL.

---

## 4. Stack oficial

La IA debe respetar este stack salvo instrucciÃ³n explÃ­cita del usuario.

```text
Frontend: React + Vite
Backend: Node.js + Express
Base de datos: MySQL
AutenticaciÃ³n: JWT
Hash de contraseÃ±as: bcrypt
ConexiÃ³n MySQL: mysql2
Peticiones HTTP: Axios
Rutas frontend: React Router DOM
Variables de entorno: dotenv
Control de versiones: Git + GitHub
Editor: VS Code
```

---

## 5. Decisiones que NO debe cambiar la IA

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

Swagger tambiÃ©n puede quedar como mejora posterior; no debe ser obligatorio para el MVP.

---

## 6. Prioridad mÃ¡xima para empezar el proyecto

La IA debe priorizar:

1. Crear backend funcional.
2. Crear conexiÃ³n a MySQL.
3. Crear base de datos mÃ­nima.
4. Implementar registro.
5. Implementar login con JWT.
6. Crear middleware de autenticaciÃ³n.
7. Implementar listado de habilidades.
8. Implementar creaciÃ³n de habilidades.
9. Implementar solicitud de intercambio.
10. Crear frontend bÃ¡sico conectado al backend.
11. AÃ±adir CSS simple y presentable.
12. Preparar demo.

---

## 7. Fuera de alcance para la primera entrega

No implementar todavÃ­a salvo peticiÃ³n explÃ­cita del usuario:

- Chat.
- Valoraciones.
- Sistema avanzado de ratings.
- Panel avanzado de administrador.
- RecuperaciÃ³n de contraseÃ±a.
- Subida de imÃ¡genes.
- Notificaciones por email.
- Swagger completo obligatorio.
- Docker obligatorio.
- Testing avanzado.
- Despliegue en producciÃ³n.
- Pasarela de pago.

Regla:

```text
No aÃ±adir funciones grandes antes de cerrar el flujo principal.
```

---

## 8. Modelo relacional resumido

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

## 9. Tablas mÃ­nimas

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

---

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

- `email` debe ser Ãºnico.
- `username` debe ser Ãºnico.
- `password` debe guardar hash, no texto plano.
- `role_id` debe apuntar a `roles.id`.
- El rol por defecto debe ser `user`.

---

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

---

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

## `exchanges`

Tabla para fase posterior.

Campos:

```text
id
request_id
agreed_at
status
```

Notas:

- Una solicitud aceptada genera como mÃ¡ximo un intercambio.
- `request_id` debe ser `UNIQUE`.

---

## `ratings`

Tabla para fase posterior.

Campos:

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

- Sirve para valorar intercambios completados.
- Un usuario no puede valorarse a sÃ­ mismo.
- Un usuario solo puede valorar una vez por intercambio.

---

## 10. Reglas de negocio obligatorias

La IA debe respetar estas reglas:

- Un usuario debe estar registrado para iniciar sesiÃ³n.
- Un usuario debe estar logueado para crear habilidades.
- Un usuario debe estar logueado para crear solicitudes.
- Un usuario no puede solicitar una habilidad que Ã©l mismo publicÃ³.
- Una habilidad pertenece siempre a un usuario.
- Una habilidad puede recibir muchas solicitudes.
- Las contraseÃ±as siempre se guardan con `bcrypt`.
- Las rutas privadas se protegen con JWT.
- El frontend debe enviar el token como `Bearer Token`.
- El backend no debe devolver la contraseÃ±a del usuario.
- Las consultas SQL deben ser preparadas.
- La primera entrega debe priorizar funcionalidad antes que diseÃ±o avanzado.

---

## 11. Endpoints mÃ­nimos esperados

## AutenticaciÃ³n

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

## 12. Estructura backend recomendada

```text
backend/
â”œâ”€â”€ package.json
â”œâ”€â”€ .env
â””â”€â”€ src/
    â”œâ”€â”€ app.js
    â”œâ”€â”€ server.js
    â”œâ”€â”€ routes/
    â”‚   â”œâ”€â”€ auth.routes.js
    â”‚   â”œâ”€â”€ users.routes.js
    â”‚   â”œâ”€â”€ skills.routes.js
    â”‚   â””â”€â”€ requests.routes.js
    â”œâ”€â”€ controllers/
    â”‚   â”œâ”€â”€ auth.controller.js
    â”‚   â”œâ”€â”€ users.controller.js
    â”‚   â”œâ”€â”€ skills.controller.js
    â”‚   â””â”€â”€ requests.controller.js
    â”œâ”€â”€ models/
    â”‚   â”œâ”€â”€ user.model.js
    â”‚   â”œâ”€â”€ skill.model.js
    â”‚   â””â”€â”€ request.model.js
    â”œâ”€â”€ middleware/
    â”‚   â””â”€â”€ auth.middleware.js
    â””â”€â”€ config/
        â””â”€â”€ db.js
```

---

## 13. Estructura frontend recomendada

```text
frontend/
â”œâ”€â”€ package.json
â”œâ”€â”€ .env
â””â”€â”€ src/
    â”œâ”€â”€ main.jsx
    â”œâ”€â”€ App.jsx
    â”œâ”€â”€ pages/
    â”‚   â”œâ”€â”€ LoginPage.jsx
    â”‚   â”œâ”€â”€ RegisterPage.jsx
    â”‚   â”œâ”€â”€ DashboardPage.jsx
    â”‚   â””â”€â”€ SkillsPage.jsx
    â”œâ”€â”€ components/
    â”‚   â”œâ”€â”€ Navbar.jsx
    â”‚   â””â”€â”€ SkillCard.jsx
    â”œâ”€â”€ services/
    â”‚   â”œâ”€â”€ api.js
    â”‚   â”œâ”€â”€ authService.js
    â”‚   â”œâ”€â”€ skillsService.js
    â”‚   â””â”€â”€ requestsService.js
    â”œâ”€â”€ context/
    â”‚   â””â”€â”€ AuthContext.jsx
    â””â”€â”€ styles/
        â””â”€â”€ global.css
```

---

## 14. Convenciones de cÃ³digo

## Backend

- Usar CommonJS o ES Modules de forma consistente.
- No mezclar `require` e `import` sin necesidad.
- Usar `async/await`.
- Separar rutas, controladores y modelos.
- Evitar SQL largo dentro de controladores si puede ir en modelos.
- Responder siempre en JSON.
- Usar cÃ³digos HTTP correctos.

CÃ³digos recomendados:

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
- No repetir URLs del backend en todas las pÃ¡ginas.
- Guardar la URL base en `services/api.js`.
- Manejar errores con mensajes simples.
- Mantener CSS claro y sencillo.

---

## 15. Variables de entorno

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

## 16. CÃ³mo debe trabajar la IA en este repositorio

Cuando la IA proponga o modifique cÃ³digo, debe:

1. Leer primero la estructura existente.
2. No borrar archivos sin necesidad.
3. Hacer cambios pequeÃ±os y verificables.
4. Mantener nombres claros.
5. Respetar el stack oficial.
6. Priorizar la primera entrega.
7. Explicar cÃ³mo probar cada cambio.
8. Avisar si una funciÃ³n queda pendiente.
9. Evitar sobrecomplicar el proyecto.
10. No aÃ±adir dependencias innecesarias.

---

## 17. Prompts Ãºtiles para Codex

## Crear backend base

```text
Crea el backend base de SkillSwap con Express, CORS, dotenv y conexiÃ³n a MySQL usando mysql2. Respeta la estructura backend/src con routes, controllers, models, middleware y config.
```

## Crear autenticaciÃ³n

```text
Implementa registro y login con bcrypt y JWT. Usa MySQL con consultas preparadas. Crea o actualiza auth.routes.js, auth.controller.js, user.model.js y auth.middleware.js.
```

## Crear habilidades

```text
Implementa GET /api/skills y POST /api/skills. La creaciÃ³n debe estar protegida con JWT y debe usar req.user.id como user_id.
```

## Crear solicitudes

```text
Implementa POST /api/requests para solicitar una habilidad. Debe verificar que el usuario estÃ© logueado y que no solicite una habilidad propia.
```

## Crear frontend

```text
Crea las pÃ¡ginas LoginPage, RegisterPage, DashboardPage y SkillsPage en React + Vite. Conecta el frontend con el backend usando Axios y localStorage para el token.
```

## Revisar errores

```text
Revisa el proyecto para detectar errores de imports, rutas rotas, problemas de CORS, conexiÃ³n a MySQL y manejo incorrecto del token JWT.
```

---

## 18. Criterios de aceptaciÃ³n de la entrega

La primera entrega se considera funcional si se puede demostrar:

- El backend arranca.
- El frontend arranca.
- MySQL estÃ¡ conectado.
- Se puede registrar un usuario.
- Se puede iniciar sesiÃ³n.
- Se genera un token JWT.
- Se puede crear una habilidad.
- Se pueden listar habilidades.
- Se puede crear una solicitud de intercambio.
- Los datos aparecen en MySQL.
- El proyecto estÃ¡ subido a GitHub.

---

## 19. Demo esperada

El dÃ­a de clase se debe poder mostrar:

1. Abrir la web.
2. Registrar un usuario.
3. Iniciar sesiÃ³n.
4. Ver el dashboard.
5. Crear una habilidad.
6. Ver la habilidad en el listado.
7. Solicitar intercambio.
8. EnseÃ±ar la base de datos con los datos guardados.

---

## 20. Regla principal para la IA

```text
Primero que funcione. DespuÃ©s se mejora.
```

La prioridad es terminar una versiÃ³n pequeÃ±a pero funcional. No aÃ±adir caracterÃ­sticas grandes antes de cerrar el flujo principal.
