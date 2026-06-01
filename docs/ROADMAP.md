# ROADMAP.md

# Roadmap de SkillSwap

Este documento define el plan de trabajo del proyecto. Su objetivo es ordenar las tareas para comenzar el desarrollo y avanzar hacia la entrega final sin desviarse del stack oficial.

---

## 1. Objetivo general

Construir **SkillSwap**, una plataforma web de trueque de habilidades técnicas donde los usuarios puedan registrarse, iniciar sesión, publicar habilidades, solicitar intercambios, aceptar solicitudes, completar intercambios y valorar a otros usuarios.

---

## 2. Stack oficial de entrega final

```text
Frontend: React + Vite
Estilos: Tailwind CSS
Componentes UI: shadcn/ui
Iconos: Lucide React
Backend: Node.js + Express
Base de datos: MySQL
Autenticación: JWT
Contraseñas: bcrypt
Peticiones HTTP: Axios
Rutas frontend: React Router DOM
```

---

## 3. Flujo final esperado

```text
Registro → Login → Crear habilidad → Ver habilidades → Solicitar intercambio → Aceptar solicitud → Completar intercambio → Valorar usuario
```

---

## 4. Alcance de la entrega final

## Incluido

- Backend base con Express.
- Conexión a MySQL.
- Script SQL de base de datos.
- Registro de usuario.
- Login con JWT.
- Middleware de autenticación.
- Rutas protegidas.
- CRUD de habilidades.
- Solicitudes de intercambio.
- Aceptar y rechazar solicitudes.
- Creación de intercambios.
- Completar intercambios.
- Valoraciones.
- Frontend React + Vite.
- Tailwind CSS instalado y funcionando.
- shadcn/ui configurado y usado.
- Lucide React instalado y usado.
- Pantallas principales.
- Conexión frontend-backend con Axios.
- Interfaz clara y responsive.
- Instrucciones de ejecución.

## No incluido salvo que sobre tiempo

- Chat en tiempo real.
- Subida de imágenes.
- Notificaciones por email.
- Docker obligatorio.
- Deploy en producción.
- Tests automáticos avanzados.
- Pasarela de pago.

---

## 5. Prioridades

## Prioridad alta

- Estructura backend y frontend.
- Base de datos conectada.
- Registro y login.
- Token JWT.
- Tailwind CSS, shadcn/ui y Lucide React configurados.
- CRUD de habilidades.
- Solicitudes de intercambio.
- Intercambios.
- Valoraciones.
- Frontend conectado al backend.
- Demo final funcionando.

## Prioridad media

- Filtros de habilidades.
- Buscador por título o descripción.
- Vista de perfil.
- Ver solicitudes enviadas y recibidas.
- Mejorar validaciones.
- Mejorar mensajes de error.
- Mejorar diseño responsive.
- Datos de prueba.

## Prioridad baja

- Chat.
- Panel avanzado de administrador.
- Swagger completo.
- Docker.
- Deploy.
- Tests avanzados.

---

## 6. Fase 0 - Preparación documental

Objetivo:

Tener la documentación clara para que el proyecto pueda ser trabajado por una IA o por el desarrollador sin perder contexto.

Tareas:

- [x] Definir arquitectura del proyecto.
- [x] Definir contexto para IA.
- [x] Definir roadmap.
- [x] Confirmar stack oficial: React + Vite, Node.js + Express y MySQL.
- [x] Añadir Tailwind CSS, shadcn/ui y Lucide React al stack oficial.
- [x] Confirmar alcance de entrega final.
- [x] Subir documentación actualizada a GitHub.

Resultado esperado:

```text
La IA y el desarrollador tienen contexto claro para comenzar el proyecto.
```

---

## 7. Fase 1 - Preparación del proyecto

Objetivo:

Crear la estructura base del proyecto.

Tareas:

- [ ] Crear carpeta `backend`.
- [ ] Crear carpeta `frontend`.
- [ ] Crear carpeta `database`.
- [ ] Inicializar backend con `npm init -y`.
- [ ] Instalar dependencias backend.
- [ ] Crear proyecto frontend con Vite.
- [ ] Instalar dependencias frontend.
- [ ] Crear estructura de carpetas.
- [ ] Crear `.env` del backend.
- [ ] Crear `.env` del frontend.
- [ ] Probar que backend arranca.
- [ ] Probar que frontend arranca.

Comandos backend:

```bash
cd backend
npm init -y
npm install express mysql2 dotenv cors bcrypt jsonwebtoken
npm install -D nodemon
```

Configurar scripts en `backend/package.json`:

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
  }
}
```

Comandos frontend:

```bash
npm create vite@latest frontend
cd frontend
npm install
npm install axios react-router-dom
```

Resultado esperado:

```text
Backend y frontend arrancan sin errores.
```

---

## 8. Fase 2 - Instalar stack visual frontend

Objetivo:

Configurar Tailwind CSS, shadcn/ui y Lucide React para que el frontend tenga una base visual moderna y mantenible.

Todos los comandos se ejecutan dentro de `frontend`.

```bash
cd frontend
```

### 8.1 Instalar Tailwind CSS con Vite

```bash
npm install tailwindcss @tailwindcss/vite
```

Actualizar `frontend/vite.config.js`:

```js
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

Actualizar `frontend/src/index.css`:

```css
@import "tailwindcss";
```

### 8.2 Configurar alias `@`

Crear `frontend/jsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Instalar tipos de Node:

```bash
npm install -D @types/node
```

### 8.3 Inicializar shadcn/ui

```bash
npx shadcn@latest init
```

Opciones recomendadas:

```text
Style: New York o Default
Base color: Neutral o Slate
CSS file: src/index.css
Components: src/components/ui
Utils: src/lib/utils.js
React Server Components: No
```

Añadir componentes base:

```bash
npx shadcn@latest add button card input label textarea badge dialog dropdown-menu select avatar separator skeleton alert
```

### 8.4 Instalar Lucide React

```bash
npm install lucide-react
```

Ejemplo de uso:

```jsx
import { Search, Plus, User, LogOut } from "lucide-react"

export function ExampleIcon() {
  return <Search className="h-4 w-4" />
}
```

### 8.5 Probar que funciona

Ejecutar:

```bash
npm run dev
```

Comprobar:

- La app abre en `http://localhost:5173`.
- Tailwind aplica estilos.
- Los componentes de shadcn/ui importan sin error.
- Los iconos de Lucide React importan sin error.

Resultado esperado:

```text
Frontend visual listo para comenzar pantallas.
```

---

## 9. Fase 3 - Base de datos

Objetivo:

Crear la base de datos completa para la entrega final.

Tareas:

- [ ] Crear `database/skillswap.sql`.
- [ ] Crear base de datos `skillswap_db`.
- [ ] Crear tabla `roles`.
- [ ] Crear tabla `users`.
- [ ] Crear tabla `skills`.
- [ ] Crear tabla `requests`.
- [ ] Crear tabla `exchanges`.
- [ ] Crear tabla `ratings`.
- [ ] Insertar roles `admin` y `user`.
- [ ] Probar conexión desde backend.
- [ ] Verificar tablas en MySQL.

Tablas obligatorias para entrega final:

```text
roles
users
skills
requests
exchanges
ratings
```

Resultado esperado:

```text
La base de datos completa existe y el backend puede conectarse a MySQL.
```

---

## 10. Fase 4 - Backend base

Objetivo:

Construir la API base.

Tareas:

- [ ] Crear `backend/src/app.js`.
- [ ] Crear `backend/src/server.js`.
- [ ] Crear `backend/src/config/db.js`.
- [ ] Configurar `express.json()`.
- [ ] Configurar `cors()`.
- [ ] Crear ruta de prueba `/api/health`.
- [ ] Conectar rutas principales.
- [ ] Probar backend en `http://localhost:3000`.

Resultado esperado:

```text
La API responde correctamente y está lista para añadir endpoints.
```

---

## 11. Fase 5 - Autenticación

Objetivo:

Permitir registro y login de usuarios.

Tareas:

- [ ] Crear `auth.routes.js`.
- [ ] Crear `auth.controller.js`.
- [ ] Crear `user.model.js`.
- [ ] Implementar registro.
- [ ] Hashear contraseña con `bcrypt`.
- [ ] Validar email único.
- [ ] Validar username único.
- [ ] Implementar login.
- [ ] Comparar contraseña con `bcrypt.compare`.
- [ ] Generar JWT.
- [ ] Crear `auth.middleware.js`.
- [ ] Proteger ruta `/api/users/me`.

Endpoints:

```text
POST /api/auth/register
POST /api/auth/login
GET /api/users/me
```

Resultado esperado:

```text
El usuario puede registrarse, iniciar sesión y recibir un token JWT.
```

---

## 12. Fase 6 - Habilidades

Objetivo:

Permitir publicar y consultar habilidades.

Tareas:

- [ ] Crear `skills.routes.js`.
- [ ] Crear `skills.controller.js`.
- [ ] Crear `skill.model.js`.
- [ ] Implementar `GET /api/skills`.
- [ ] Implementar `GET /api/skills/:id`.
- [ ] Implementar `POST /api/skills`.
- [ ] Implementar `PUT /api/skills/:id`.
- [ ] Implementar `DELETE /api/skills/:id`.
- [ ] Proteger creación, edición y eliminación con JWT.
- [ ] Usar `req.user.id` como `user_id`.
- [ ] Validar que solo el propietario edite o elimine.
- [ ] Probar creación, listado, edición y eliminación.

Endpoints:

```text
GET /api/skills
GET /api/skills/:id
POST /api/skills
PUT /api/skills/:id
DELETE /api/skills/:id
```

Resultado esperado:

```text
Un usuario puede gestionar sus habilidades y ver las de otros usuarios.
```

---

## 13. Fase 7 - Solicitudes de intercambio

Objetivo:

Permitir que un usuario solicite una habilidad de otro usuario y que el dueño pueda aceptar o rechazar.

Tareas:

- [ ] Crear `requests.routes.js`.
- [ ] Crear `requests.controller.js`.
- [ ] Crear `request.model.js`.
- [ ] Implementar `POST /api/requests`.
- [ ] Implementar `GET /api/requests`.
- [ ] Implementar `PUT /api/requests/:id/accept`.
- [ ] Implementar `PUT /api/requests/:id/reject`.
- [ ] Proteger rutas con JWT.
- [ ] Validar que la habilidad exista.
- [ ] Validar que el usuario no solicite su propia habilidad.
- [ ] Guardar solicitud con estado `open`.
- [ ] Al aceptar, permitir crear intercambio.

Endpoints:

```text
POST /api/requests
GET /api/requests
PUT /api/requests/:id/accept
PUT /api/requests/:id/reject
```

Resultado esperado:

```text
Un usuario puede solicitar habilidades y el propietario puede aceptar o rechazar solicitudes.
```

---

## 14. Fase 8 - Intercambios

Objetivo:

Crear y gestionar intercambios a partir de solicitudes aceptadas.

Tareas:

- [ ] Crear `exchanges.routes.js`.
- [ ] Crear `exchanges.controller.js`.
- [ ] Crear `exchange.model.js`.
- [ ] Implementar `GET /api/exchanges`.
- [ ] Implementar `POST /api/exchanges`.
- [ ] Implementar `PUT /api/exchanges/:id/complete`.
- [ ] Validar que solo exista un intercambio por solicitud.
- [ ] Validar que la solicitud esté aceptada.
- [ ] Permitir marcar intercambio como completado.

Endpoints:

```text
GET /api/exchanges
POST /api/exchanges
PUT /api/exchanges/:id/complete
```

Resultado esperado:

```text
Una solicitud aceptada puede convertirse en intercambio y completarse.
```

---

## 15. Fase 9 - Valoraciones

Objetivo:

Permitir valorar a otro usuario después de completar un intercambio.

Tareas:

- [ ] Crear `ratings.routes.js`.
- [ ] Crear `ratings.controller.js`.
- [ ] Crear `rating.model.js`.
- [ ] Implementar `POST /api/ratings`.
- [ ] Implementar `GET /api/users/:id/ratings`.
- [ ] Validar que el intercambio esté completado.
- [ ] Validar que el usuario participe en el intercambio.
- [ ] Validar que el usuario no se valore a sí mismo.
- [ ] Validar que solo valore una vez por intercambio.

Endpoints:

```text
POST /api/ratings
GET /api/users/:id/ratings
```

Resultado esperado:

```text
Los usuarios pueden recibir valoraciones después de intercambios completados.
```

---

## 16. Fase 10 - Frontend base

Objetivo:

Crear la interfaz mínima funcional con React, Tailwind CSS, shadcn/ui y Lucide React.

Tareas:

- [ ] Configurar React Router.
- [ ] Crear layout principal.
- [ ] Crear `Navbar` con shadcn/ui y Lucide React.
- [ ] Crear `HomePage`.
- [ ] Crear `LoginPage`.
- [ ] Crear `RegisterPage`.
- [ ] Crear `DashboardPage`.
- [ ] Crear `SkillsPage`.
- [ ] Crear `SkillDetailPage`.
- [ ] Crear `MyRequestsPage`.
- [ ] Crear `ExchangesPage`.
- [ ] Crear `ProfilePage`.
- [ ] Crear `SkillCard`.
- [ ] Crear `SkillForm`.
- [ ] Crear `AuthContext`.
- [ ] Crear servicios API.

Resultado esperado:

```text
El frontend tiene las pantallas principales creadas y puede navegar entre ellas.
```

---

## 17. Fase 11 - Conexión frontend-backend

Objetivo:

Conectar React con la API real.

Tareas:

- [ ] Conectar registro con `POST /api/auth/register`.
- [ ] Conectar login con `POST /api/auth/login`.
- [ ] Guardar token en `localStorage`.
- [ ] Añadir token automáticamente con Axios.
- [ ] Conectar listado de habilidades.
- [ ] Conectar creación de habilidades.
- [ ] Conectar edición y eliminación de habilidades.
- [ ] Conectar solicitud de intercambio.
- [ ] Conectar aceptar y rechazar solicitudes.
- [ ] Conectar intercambios.
- [ ] Conectar valoraciones.
- [ ] Mostrar errores básicos.
- [ ] Mostrar mensajes de éxito.

Resultado esperado:

```text
El usuario puede usar el flujo final desde la interfaz web.
```

---

## 18. Fase 12 - Diseño final

Objetivo:

Hacer que la aplicación se vea presentable para clase.

Tareas:

- [ ] Diseñar navbar.
- [ ] Diseñar home.
- [ ] Diseñar formularios.
- [ ] Diseñar tarjetas de habilidades.
- [ ] Diseñar páginas de solicitudes.
- [ ] Diseñar página de intercambios.
- [ ] Diseñar perfil.
- [ ] Añadir iconos con Lucide React.
- [ ] Usar componentes shadcn/ui.
- [ ] Revisar responsive.
- [ ] Revisar colores, espaciado y legibilidad.
- [ ] Añadir estados loading con Skeleton.
- [ ] Añadir alertas de error o éxito.

Resultado esperado:

```text
La aplicación se ve limpia, clara y fácil de explicar.
```

---

## 19. Fase 13 - Pruebas finales

Objetivo:

Evitar errores durante la demo.

Checklist:

- [ ] Backend arranca con `npm run dev`.
- [ ] Frontend arranca con `npm run dev`.
- [ ] MySQL está activo.
- [ ] La base de datos existe.
- [ ] Tailwind CSS funciona.
- [ ] shadcn/ui funciona.
- [ ] Lucide React funciona.
- [ ] El registro funciona.
- [ ] El login funciona.
- [ ] El token se guarda.
- [ ] Las rutas protegidas funcionan.
- [ ] Se puede crear una habilidad.
- [ ] Se puede listar habilidades.
- [ ] Se puede editar una habilidad propia.
- [ ] Se puede eliminar una habilidad propia.
- [ ] Se puede solicitar intercambio.
- [ ] Se puede aceptar solicitud.
- [ ] Se puede rechazar solicitud.
- [ ] Se puede crear o ver intercambio.
- [ ] Se puede completar intercambio.
- [ ] Se puede valorar usuario.
- [ ] No hay errores de CORS.
- [ ] No hay imports rotos.
- [ ] No hay rutas rotas.
- [ ] La documentación explica cómo ejecutar el proyecto.
- [ ] Todo está subido a GitHub.

Resultado esperado:

```text
El proyecto está listo para presentarse.
```

---

## 20. Demo de clase

Guion recomendado:

1. Explicar qué es SkillSwap.
2. Explicar arquitectura: React, Tailwind, shadcn/ui, Lucide React, Express y MySQL.
3. Enseñar registro.
4. Enseñar login.
5. Crear una habilidad.
6. Ver listado de habilidades.
7. Solicitar intercambio con otro usuario.
8. Aceptar solicitud.
9. Ver intercambio.
10. Completar intercambio.
11. Valorar usuario.
12. Enseñar la base de datos en MySQL.
13. Explicar mejoras futuras.

---

## 21. Mejoras posteriores

- Chat entre usuarios.
- Subida de imágenes de perfil.
- Categorías avanzadas.
- Buscador avanzado.
- Notificaciones por email.
- Panel administrador.
- Swagger.
- Docker.
- Deploy.
- Tests.

---

## 22. Regla principal del roadmap

```text
Primero cerrar el flujo funcional. Después mejorar el diseño.
```

Para la entrega final, es mejor tener el flujo completo funcionando con una interfaz clara que muchas funciones incompletas.
