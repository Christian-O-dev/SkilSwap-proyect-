# IA_CONTEXT.md

# Contexto para IA - SkillSwap

Este archivo es la guía principal para cualquier IA que trabaje en este repositorio: ChatGPT, Codex u otro asistente. Su objetivo es evitar confusión, cambios de stack innecesarios y decisiones que se salgan del alcance del proyecto.

---

## 1. Nombre del proyecto

```text
SkillSwap
```

---

## 2. Descripción corta

SkillSwap es una aplicación web para intercambiar habilidades técnicas entre usuarios.

Funciona como una comunidad o marketplace P2P, pero sin pagos directos. Los usuarios publican habilidades que ofrecen y pueden solicitar intercambios con otros usuarios.

Flujo principal del MVP:

```text
Registro → Login → Crear habilidad → Ver habilidades → Solicitar intercambio
```

Flujo esperado para entrega final:

```text
Registro → Login → Crear habilidad → Solicitar intercambio → Aceptar solicitud → Completar intercambio → Valorar usuario
```

---

## 3. Objetivo actual

Comenzar el proyecto con una base técnica clara y prepararlo para la **entrega final**.

La entrega final debe demostrar una aplicación web funcional con frontend presentable, backend conectado a MySQL y flujo completo de intercambio.

---

## 4. Stack oficial del proyecto

La IA debe respetar este stack salvo instrucción explícita del usuario.

```text
Frontend: React + Vite
Estilos: Tailwind CSS
Componentes UI: shadcn/ui
Iconos: Lucide React
Backend: Node.js + Express
Base de datos: MySQL
Autenticación: JWT
Hash de contraseñas: bcrypt
Conexión MySQL: mysql2
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

Docker puede proponerse como mejora posterior, pero no debe bloquear el desarrollo principal.

Swagger también puede quedar como mejora posterior; no debe ser obligatorio para empezar.

---

## 6. Stack visual obligatorio del frontend

Para mejorar la parte visual del proyecto se usará:

```text
Tailwind CSS
shadcn/ui
Lucide React
```

La IA debe usar estas tecnologías para crear interfaces modernas, limpias y reutilizables.

### Tailwind CSS

Usar Tailwind para:

- Layout.
- Espaciados.
- Responsive.
- Colores.
- Bordes.
- Sombras.
- Estados hover, focus y disabled.

### shadcn/ui

Usar shadcn/ui para componentes base:

- Button.
- Card.
- Input.
- Label.
- Textarea.
- Badge.
- Dialog.
- Dropdown menu.
- Select.
- Avatar.
- Separator.
- Skeleton.
- Alert.

### Lucide React

Usar Lucide React para iconos.

Iconos sugeridos:

```text
Search
Plus
User
LogOut
BookOpen
Handshake
RefreshCcw
Star
Pencil
Trash2
Settings
Home
```

---

## 7. Prioridad máxima para comenzar

La IA debe priorizar:

1. Crear estructura backend y frontend.
2. Instalar Tailwind CSS, shadcn/ui y Lucide React en el frontend.
3. Crear diseño base con Navbar, layout y páginas principales.
4. Crear conexión a MySQL.
5. Crear base de datos.
6. Implementar registro.
7. Implementar login con JWT.
8. Crear middleware de autenticación.
9. Implementar listado de habilidades.
10. Implementar creación, edición y eliminación de habilidades.
11. Implementar solicitud de intercambio.
12. Implementar aceptación y rechazo de solicitudes.
13. Implementar intercambios.
14. Implementar valoraciones.
15. Preparar demo final.

---

## 8. Fuera de alcance inicial

No implementar todavía salvo petición explícita:

- Chat en tiempo real.
- Subida de imágenes.
- Notificaciones por email.
- Pasarela de pago.
- Docker obligatorio.
- Testing avanzado.
- Despliegue en producción.

Regla:

```text
No añadir funciones grandes antes de cerrar el flujo principal.
```

---

## 9. Modelo relacional resumido

Entidades completas del proyecto:

```text
roles
users
skills
requests
exchanges
ratings
```

Para la entrega final deben estar implementadas:

```text
roles
users
skills
requests
exchanges
ratings
```

---

## 10. Tablas del proyecto

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

- `email` debe ser único.
- `username` debe ser único.
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

Campos:

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

- Una solicitud aceptada genera como máximo un intercambio.
- `request_id` debe ser `UNIQUE`.

---

## `ratings`

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
- Un usuario no puede valorarse a sí mismo.
- Un usuario solo puede valorar una vez por intercambio.

---

## 11. Reglas de negocio obligatorias

La IA debe respetar estas reglas:

- Un usuario debe estar registrado para iniciar sesión.
- Un usuario debe estar logueado para crear habilidades.
- Un usuario debe estar logueado para crear solicitudes.
- Un usuario no puede solicitar una habilidad que él mismo publicó.
- Una habilidad pertenece siempre a un usuario.
- Una habilidad puede recibir muchas solicitudes.
- Una solicitud aceptada puede generar un intercambio.
- Un intercambio puede completarse o cancelarse.
- Una valoración solo puede registrarse cuando el intercambio está completado.
- Un usuario no puede valorarse a sí mismo.
- Un usuario solo puede valorar una vez por intercambio.
- Las contraseñas siempre se guardan con `bcrypt`.
- Las rutas privadas se protegen con JWT.
- El frontend debe enviar el token como `Bearer Token`.
- El backend no debe devolver la contraseña del usuario.
- Las consultas SQL deben ser preparadas.

---

## 12. Endpoints esperados

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
PUT /api/skills/:id
DELETE /api/skills/:id
```

## Solicitudes

```text
POST /api/requests
GET /api/requests
PUT /api/requests/:id/accept
PUT /api/requests/:id/reject
```

## Intercambios

```text
GET /api/exchanges
POST /api/exchanges
PUT /api/exchanges/:id/complete
```

## Valoraciones

```text
POST /api/ratings
GET /api/users/:id/ratings
```

---

## 13. Estructura backend recomendada

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
    │   ├── requests.routes.js
    │   ├── exchanges.routes.js
    │   └── ratings.routes.js
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── users.controller.js
    │   ├── skills.controller.js
    │   ├── requests.controller.js
    │   ├── exchanges.controller.js
    │   └── ratings.controller.js
    ├── models/
    │   ├── user.model.js
    │   ├── skill.model.js
    │   ├── request.model.js
    │   ├── exchange.model.js
    │   └── rating.model.js
    ├── middleware/
    │   └── auth.middleware.js
    └── config/
        └── db.js
```

---

## 14. Estructura frontend recomendada

```text
frontend/
├── package.json
├── .env
├── vite.config.js
├── jsconfig.json
├── components.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── pages/
    │   ├── HomePage.jsx
    │   ├── LoginPage.jsx
    │   ├── RegisterPage.jsx
    │   ├── DashboardPage.jsx
    │   ├── SkillsPage.jsx
    │   ├── SkillDetailPage.jsx
    │   ├── MyRequestsPage.jsx
    │   ├── ExchangesPage.jsx
    │   └── ProfilePage.jsx
    ├── components/
    │   ├── layout/
    │   │   └── Navbar.jsx
    │   ├── skills/
    │   │   ├── SkillCard.jsx
    │   │   └── SkillForm.jsx
    │   └── ui/
    │       └── componentes de shadcn/ui
    ├── services/
    │   ├── api.js
    │   ├── authService.js
    │   ├── skillsService.js
    │   ├── requestsService.js
    │   ├── exchangesService.js
    │   └── ratingsService.js
    ├── context/
    │   └── AuthContext.jsx
    ├── lib/
    │   └── utils.js
    └── styles/
        └── opcional
```

---

## 15. Instalación del stack visual

Todos los comandos se ejecutan dentro de `frontend`.

```bash
cd frontend
```

Instalar Tailwind CSS con Vite:

```bash
npm install tailwindcss @tailwindcss/vite
```

Instalar tipos de Node para alias con `path`:

```bash
npm install -D @types/node
```

Inicializar shadcn/ui:

```bash
npx shadcn@latest init
```

Añadir componentes base:

```bash
npx shadcn@latest add button card input label textarea badge dialog dropdown-menu select avatar separator skeleton alert
```

Instalar Lucide React:

```bash
npm install lucide-react
```

---

## 16. Convenciones de código

## Backend

- Usar CommonJS o ES Modules de forma consistente.
- No mezclar `require` e `import` sin necesidad.
- Usar `async/await`.
- Separar rutas, controladores y modelos.
- Evitar SQL largo dentro de controladores si puede ir en modelos.
- Responder siempre en JSON.
- Usar códigos HTTP correctos.

Códigos recomendados:

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
- Usar shadcn/ui para componentes reutilizables.
- Usar Tailwind para estilos.
- Usar Lucide React para iconos.
- No repetir URLs del backend en todas las páginas.
- Guardar la URL base en `services/api.js`.
- Manejar errores con mensajes simples.

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

## 18. Cómo debe trabajar la IA en este repositorio

Cuando la IA proponga o modifique código, debe:

1. Leer primero la estructura existente.
2. No borrar archivos sin necesidad.
3. Hacer cambios pequeños y verificables.
4. Mantener nombres claros.
5. Respetar el stack oficial.
6. Priorizar el flujo principal.
7. Explicar cómo probar cada cambio.
8. Avisar si una función queda pendiente.
9. Evitar sobrecomplicar el proyecto.
10. No añadir dependencias innecesarias.

---

## 19. Prompts útiles para Codex

## Instalar stack visual

```text
Configura Tailwind CSS, shadcn/ui y Lucide React en el frontend React + Vite. Usa alias @ hacia src, configura vite.config.js, jsconfig.json, src/index.css y añade componentes base de shadcn/ui.
```

## Crear layout visual

```text
Crea un layout base con Navbar usando shadcn/ui, Tailwind CSS y Lucide React. Debe mostrar enlaces a Inicio, Habilidades, Mis solicitudes, Intercambios, Perfil y Logout/Login según el estado de sesión.
```

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
Implementa GET, POST, PUT y DELETE de habilidades. La creación, edición y eliminación deben estar protegidas con JWT. Solo el propietario puede editar o eliminar su habilidad.
```

## Crear solicitudes

```text
Implementa solicitudes de intercambio. Un usuario puede solicitar una habilidad de otro usuario, pero no una propia. Añade aceptar y rechazar solicitudes.
```

## Crear intercambios y valoraciones

```text
Implementa intercambios y valoraciones. Una solicitud aceptada genera un intercambio. Un intercambio completado permite valorar al otro usuario una sola vez.
```

---

## 20. Criterios de aceptación de la entrega final

La entrega final se considera funcional si se puede demostrar:

- El backend arranca.
- El frontend arranca.
- MySQL está conectado.
- Tailwind CSS funciona.
- shadcn/ui está configurado.
- Lucide React está instalado y usado.
- Se puede registrar un usuario.
- Se puede iniciar sesión.
- Se genera un token JWT.
- Se puede crear una habilidad.
- Se pueden listar habilidades.
- Se puede editar y eliminar una habilidad propia.
- Se puede crear una solicitud de intercambio.
- Se puede aceptar o rechazar una solicitud.
- Se puede crear o ver un intercambio.
- Se puede completar un intercambio.
- Se puede valorar al otro usuario.
- Los datos aparecen en MySQL.
- El proyecto está subido a GitHub.

---

## 21. Regla principal para la IA

```text
Primero que funcione. Después se mejora visualmente.
```

La prioridad es terminar una versión funcional y luego pulir la interfaz con Tailwind, shadcn/ui y Lucide React.
