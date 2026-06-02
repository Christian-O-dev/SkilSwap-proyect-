# ROADMAP.md

# Roadmap de SkillSwap

Este documento define el plan de trabajo del proyecto. Su objetivo es ordenar las tareas para comenzar el desarrollo sin desviarse del MVP.

---

## 1. Objetivo general

Construir **SkillSwap**, una plataforma web de trueque de habilidades técnicas donde los usuarios puedan registrarse, iniciar sesión, publicar habilidades y solicitar intercambios con otros usuarios.

---

## 2. Primera entrega funcional

Fecha objetivo:

```text
Viernes 5 de junio de 2026
```

Objetivo:

```text
Tener un MVP funcional que permita demostrar el flujo principal de la aplicación.
```

Flujo principal:

```text
Registro → Login → Crear habilidad → Ver habilidades → Solicitar intercambio
```

## Estado hasta este momento

```text
Completado:
- Fase 0 a Fase 10
- Fase posterior 1
- Fase posterior 2
- Fase posterior 3
- Fase posterior 4

Pendiente:
- Fase posterior 5
```

---

## 3. Alcance del MVP

## Incluido en la primera entrega

- Backend base con Express.
- Conexión a MySQL.
- Script SQL de base de datos.
- Registro de usuario.
- Login con JWT.
- Middleware de autenticación.
- Rutas protegidas.
- Listado de habilidades.
- Creación de habilidades.
- Creación de solicitudes de intercambio.
- Frontend React + Vite.
- Pantallas de login, registro, dashboard y habilidades.
- Conexión frontend-backend con Axios.
- CSS básico.
- Instrucciones de ejecución.

## No incluido en la primera entrega

- Chat.
- Valoraciones.
- Panel avanzado de administrador.
- Notificaciones.
- Recuperación de contraseña.
- Subida de imágenes.
- Swagger completo obligatorio.
- Docker obligatorio.
- Despliegue en producción.
- Tests automáticos avanzados.

---

## 4. Prioridades

## Prioridad alta

Estas tareas son necesarias para la primera entrega.

- Backend funcional.
- Base de datos conectada.
- Registro y login.
- Token JWT.
- CRUD mínimo de habilidades: listar y crear.
- Solicitudes de intercambio.
- Frontend conectado al backend.
- Demo funcionando.

## Prioridad media

Estas tareas ayudan, pero no deben bloquear el MVP.

- Ver detalle de habilidad.
- Ver solicitudes del usuario.
- Editar habilidad.
- Eliminar habilidad.
- Mejorar validaciones.
- Mejorar mensajes de error.
- Mejorar diseño responsive.
- Documentar endpoints.
- Preparar datos de prueba.

## Prioridad baja

Estas tareas quedan para fases posteriores.

- Chat.
- Valoraciones.
- Panel de administrador.
- Swagger completo.
- Docker.
- Deploy.
- Tests avanzados.

---

## 5. Fase 0 - Documentación y enfoque

Objetivo:

Alinear el proyecto con una primera entrega realista y evitar desviarse hacia funciones demasiado grandes.

Tareas:

- [x] Definir arquitectura del proyecto.
- [x] Definir contexto para IA.
- [x] Definir roadmap.
- [x] Confirmar stack oficial: React + Vite, Node.js + Express y MySQL.
- [x] Confirmar alcance del viernes.
- [x] Subir documentación final a GitHub.

Resultado esperado:

```text
La IA y el desarrollador tienen contexto claro para trabajar sin cambiar el rumbo del proyecto.
```

---

## 6. Fase 1 - Preparación del proyecto

Fecha recomendada:

```text
Lunes 1 de junio de 2026
```

Objetivo:

Crear la estructura base del proyecto.

Tareas:

- [ ] Crear carpeta `backend`.
- [x] Crear carpeta `frontend`.
- [x] Crear carpeta `database`.
- [x] Inicializar backend con `npm init -y`.
- [x] Instalar dependencias backend.
- [x] Crear proyecto frontend con Vite.
- [x] Instalar dependencias frontend.
- [x] Crear estructura de carpetas.
- [x] Crear `.env` del backend.
- [x] Crear `.env` del frontend.
- [x] Probar que backend arranca.
- [x] Probar que frontend arranca.

Comandos backend:

```bash
cd backend
npm init -y
npm install express mysql2 dotenv cors bcrypt jsonwebtoken
npm install -D nodemon
```

En `backend/package.json`, configurar scripts:

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

## 7. Fase 2 - Base de datos

Fecha recomendada:

```text
Lunes 1 de junio o martes 2 de junio de 2026
```

Objetivo:

Crear la base de datos mínima para la primera entrega.

Tareas:

- [x] Crear `database/skillswap.sql`.
- [x] Crear base de datos `skillswap_db`.
- [x] Crear tabla `roles`.
- [x] Crear tabla `users`.
- [x] Crear tabla `skills`.
- [x] Crear tabla `requests`.
- [x] Insertar roles `admin` y `user`.
- [x] Probar conexión desde backend.
- [x] Verificar tablas en MySQL.

Tablas obligatorias:

```text
roles
users
skills
requests
```

Tablas opcionales:

```text
exchanges
ratings
```

Resultado esperado:

```text
La base de datos existe y el backend puede conectarse a MySQL.
```

---

## 8. Fase 3 - Backend base

Fecha recomendada:

```text
Martes 2 de junio de 2026
```

Objetivo:

Construir la API base.

Tareas:

- [x] Crear `backend/src/app.js`.
- [x] Crear `backend/src/server.js`.
- [x] Crear `backend/src/config/db.js`.
- [x] Configurar `express.json()`.
- [x] Configurar `cors()`.
- [x] Crear ruta de prueba `/api/health`.
- [x] Conectar rutas principales.
- [x] Probar backend en `http://localhost:3000`.

Resultado esperado:

```text
La API responde correctamente y está lista para añadir endpoints.
```

---

## 9. Fase 4 - Autenticación

Fecha recomendada:

```text
Martes 2 de junio de 2026
```

Objetivo:

Permitir registro y login de usuarios.

Tareas:

- [x] Crear `auth.routes.js`.
- [x] Crear `auth.controller.js`.
- [x] Crear `user.model.js`.
- [x] Implementar registro.
- [x] Hashear contraseña con `bcrypt`.
- [x] Validar email único.
- [x] Validar username único.
- [x] Implementar login.
- [x] Comparar contraseña con `bcrypt.compare`.
- [x] Generar JWT.
- [x] Crear `auth.middleware.js`.
- [x] Proteger ruta `/api/users/me`.

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

## 10. Fase 5 - Habilidades

Fecha recomendada:

```text
Miércoles 3 de junio de 2026
```

Objetivo:

Permitir publicar y consultar habilidades.

Tareas:

- [x] Crear `skills.routes.js`.
- [x] Crear `skills.controller.js`.
- [x] Crear `skill.model.js`.
- [x] Implementar `GET /api/skills`.
- [x] Implementar `GET /api/skills/:id`.
- [x] Implementar `POST /api/skills`.
- [x] Proteger `POST /api/skills` con JWT.
- [x] Usar `req.user.id` como `user_id`.
- [x] Probar creación de habilidades.
- [x] Probar listado de habilidades.

Endpoints:

```text
GET /api/skills
GET /api/skills/:id
POST /api/skills
```

Resultado esperado:

```text
Un usuario logueado puede crear habilidades y cualquier usuario puede ver el listado.
```

---

## 11. Fase 6 - Solicitudes de intercambio

Fecha recomendada:

```text
Miércoles 3 de junio o jueves 4 de junio de 2026
```

Objetivo:

Permitir que un usuario solicite una habilidad de otro usuario.

Tareas:

- [x] Crear `requests.routes.js`.
- [x] Crear `requests.controller.js`.
- [x] Crear `request.model.js`.
- [x] Implementar `POST /api/requests`.
- [x] Implementar `GET /api/requests`.
- [x] Proteger rutas con JWT.
- [x] Validar que la habilidad exista.
- [x] Validar que el usuario no solicite su propia habilidad.
- [x] Guardar solicitud con estado `open`.
- [x] Probar creación de solicitudes.

Endpoints:

```text
POST /api/requests
GET /api/requests
```

Resultado esperado:

```text
Un usuario logueado puede solicitar una habilidad publicada por otro usuario.
```

---

## 12. Fase 7 - Frontend base

Fecha recomendada:

```text
Jueves 4 de junio de 2026
```

Objetivo:

Crear la interfaz mínima funcional.

Tareas:

- [x] Configurar React Router.
- [x] Crear `Navbar.jsx`.
- [x] Crear `LoginPage.jsx`.
- [x] Crear `RegisterPage.jsx`.
- [x] Crear `DashboardPage.jsx`.
- [x] Crear `SkillsPage.jsx`.
- [x] Crear `SkillCard.jsx`.
- [x] Crear `AuthContext.jsx`.
- [x] Crear `api.js`.
- [x] Crear `authService.js`.
- [x] Crear `skillsService.js`.
- [x] Crear `requestsService.js`.

Resultado esperado:

```text
El frontend tiene las pantallas principales creadas y puede navegar entre ellas.
```

---

## 13. Fase 8 - Conexión frontend-backend

Fecha recomendada:

```text
Jueves 4 de junio de 2026
```

Objetivo:

Conectar React con la API real.

Tareas:

- [x] Conectar registro con `POST /api/auth/register`.
- [x] Conectar login con `POST /api/auth/login`.
- [x] Guardar token en `localStorage`.
- [x] Añadir token automáticamente con Axios.
- [x] Conectar listado de habilidades.
- [x] Conectar creación de habilidades.
- [x] Conectar solicitud de intercambio.
- [x] Mostrar errores básicos.
- [x] Mostrar mensajes de éxito.

Resultado esperado:

```text
El usuario puede usar el flujo principal desde la interfaz web.
```

---

## 14. Fase 9 - Diseño básico

Fecha recomendada:

```text
Jueves 4 de junio o viernes 5 de junio de 2026
```

Objetivo:

Hacer que la aplicación se vea presentable para clase.

Tareas:

- [x] Crear `global.css`.
- [x] Diseñar navbar.
- [x] Diseñar formularios.
- [x] Diseñar tarjetas de habilidades.
- [x] Diseñar botones.
- [x] Añadir layout responsive básico.
- [x] Evitar pantalla desordenada.
- [x] Revisar colores y espaciados.

Resultado esperado:

```text
La aplicación se ve limpia, clara y fácil de explicar.
```

---

## 15. Fase 10 - Pruebas finales

Fecha recomendada:

```text
Viernes 5 de junio de 2026
```

Objetivo:

Evitar errores durante la demo.

Checklist:

- [x] Backend arranca con `npm run dev`.
- [x] Frontend arranca con `npm run dev`.
- [x] MySQL está activo.
- [x] La base de datos existe.
- [x] El registro funciona.
- [x] El login funciona.
- [x] El token se guarda.
- [x] Las rutas protegidas funcionan.
- [x] Se puede crear una habilidad.
- [x] Se puede listar habilidades.
- [x] Se puede solicitar intercambio.
- [x] No hay errores de CORS.
- [x] No hay imports rotos.
- [x] No hay rutas rotas.
- [x] El README o documentación explica cómo ejecutar el proyecto.
- [x] Todo está subido a GitHub.

Resultado esperado:

```text
El proyecto está listo para presentarse.
```

---

## 16. Demo de clase

Fecha:

```text
Viernes 5 de junio de 2026
```

Guion recomendado:

1. Explicar qué es SkillSwap.
2. Explicar arquitectura: React, Express y MySQL.
3. Enseñar registro.
4. Enseñar login.
5. Crear una habilidad.
6. Ver listado de habilidades.
7. Solicitar intercambio.
8. Enseñar la base de datos en MySQL.
9. Explicar qué queda para la fase final.

---

## 17. Funciones para después de la primera entrega

## Fase posterior 1 - Mejoras de habilidades

- [x] Editar habilidad.
- [x] Eliminar habilidad.
- [x] Filtrar habilidades por texto.
- [x] Añadir categoría.
- [x] Añadir nivel.
- [x] Añadir fecha formateada.

## Fase posterior 2 - Intercambios

- [x] Aceptar solicitud.
- [x] Rechazar solicitud.
- [x] Crear intercambio al aceptar.
- [x] Marcar intercambio como completado.
- [x] Cancelar intercambio.

## Fase posterior 3 - Valoraciones

- [x] Crear tabla `ratings`.
- [x] Valorar usuario después de intercambio.
- [x] Mostrar puntuación media.
- [x] Evitar valoraciones duplicadas.
- [x] Evitar que un usuario se valore a sí mismo.

## Fase posterior 4 - Administración

- [x] Panel de administrador.
- [x] Listar usuarios.
- [x] Eliminar habilidades inapropiadas.
- [x] Revisar solicitudes.
- [x] Bloquear usuarios.

## Fase posterior 5 - Profesionalización

- [ ] Swagger.
- [ ] Docker.
- [ ] Tests.
- [ ] Deploy.
- [ ] Variables de entorno de producción.
- [ ] Mejoras de seguridad.
- [ ] Mejoras visuales.

---







##########################################################################
##########################################################################







## Fase final - Rediseño profesional de la interfaz

### Objetivo

Mejorar la interfaz de SkillSwap para la presentación final sin romper la lógica existente.

La app ya tiene una base funcional. Esta fase se centrará en:

* Separar la pantalla de habilidades en páginas claras.
* Migrar progresivamente el CSS a Tailwind CSS.
* Usar shadcn/ui para componentes profesionales.
* Usar Lucide React para iconos.
* Adoptar una opción visual clara y profesional.
* Mejorar navegación, tarjetas, formularios, estados y responsive.
* Corregir textos sin acentos.
* Preparar una demo final limpia.

---

## Estado actual antes de empezar

Actualmente la página `/skills` concentra demasiadas responsabilidades:

* Catálogo de habilidades.
* Crear habilidad.
* Editar habilidad.
* Eliminar habilidad.
* Solicitudes enviadas.
* Solicitudes recibidas.
* Intercambios.
* Valoraciones.

Para la entrega final se separará en páginas independientes:

```text
/skills       → catálogo de habilidades
/my-skills    → mis habilidades creadas
/requests     → solicitudes enviadas y recibidas
/exchanges    → intercambios activos/completados
/profile      → perfil y valoraciones
```

Regla principal:

```text
No cambiar el backend ni romper los servicios existentes.
Primero separar visualmente. Después mejorar diseño.
```

---

## Stack visual final

Se añadirá al frontend:

```text
Tailwind CSS
shadcn/ui
Lucide React
```

Uso de cada tecnología:

```text
Tailwind CSS → estilos, layout, responsive y sistema visual.
shadcn/ui    → componentes reutilizables.
Lucide React → iconos de navegación, acciones y estados.
```

Componentes shadcn/ui recomendados:

```text
Button
Card
Input
Label
Textarea
Badge
Dialog
Alert
Skeleton
DropdownMenu
Avatar
Separator
Tabs
Sheet
```

Iconos Lucide recomendados:

```text
Home
BookOpen
Handshake
User
LogOut
Plus
Settings
Search
Monitor
Star
Calendar
Pencil
Trash2
Check
X
Menu
```

---

## Sistema visual elegido

Se usará una opción clara profesional.

### Paleta recomendada

```text
Fondo principal:    #F8FAFC
Panel / tarjeta:    #FFFFFF
Texto principal:    #0F172A
Texto secundario:   #64748B
Borde:              #E2E8F0
Primario:           #2563EB
Primario hover:     #1D4ED8
Éxito:              #16A34A
Advertencia:        #F59E0B
Error:              #DC2626
```

### Guía de componentes

```text
Botón primario   → acción principal
Botón secundario → acción normal
Botón ghost      → acción ligera
Botón peligro    → eliminar / cancelar
Badge azul       → abierta
Badge verde      → aceptada / completado
Badge rojo       → rechazada / cancelado
Badge amarillo   → pendiente
Badge gris       → neutral / sin datos
```

### Regla de textos

```text
Títulos: máximo 8 palabras.
Descripciones: 1 o 2 líneas.
Botones: verbo claro.
Evitar textos largos dentro de tarjetas.
```

Ejemplo:

```text
Antes:
Explora publicaciones de la comunidad, comparte tu experiencia y encuentra tu próximo intercambio.

Después:
Encuentra habilidades y solicita intercambios.
```

---

# Plan de migración paso a paso

## Paso 0 - Crear rama segura

Antes de tocar diseño:

```bash
git checkout -b feature/redesign-final
```

Después de cada paso importante:

```bash
npm run build
git status
git add .
git commit -m "mensaje claro del cambio"
```

Regla:

```text
Un cambio grande = un commit.
Si algo se rompe, será fácil volver atrás.
```

---

## Paso 1 - Instalar Tailwind CSS

Entrar al frontend:

```bash
cd frontend
```

Instalar Tailwind CSS con Vite:

```bash
npm install tailwindcss @tailwindcss/vite
```

Instalar tipos de Node si se usará `path` en Vite:

```bash
npm install -D @types/node
```

Actualizar `vite.config.js`:

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

Crear o revisar `jsconfig.json` dentro de `frontend`:

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

Actualizar `src/index.css`:

```css
@import "tailwindcss";
```

Importante:

```text
No borrar todavía el CSS antiguo.
Primero instalar Tailwind y verificar que la app sigue funcionando.
```

Probar:

```bash
npm run dev
npm run build
```

Commit recomendado:

```bash
git add .
git commit -m "Configurar Tailwind CSS en frontend"
```

---

## Paso 2 - Instalar shadcn/ui

Dentro de `frontend`:

```bash
npx shadcn@latest init
```

Opciones recomendadas:

```text
Style: New York
Base color: Slate o Neutral
CSS file: src/index.css
Components: src/components/ui
Utils: src/lib/utils.js
React Server Components: No
```

Añadir componentes base:

```bash
npx shadcn@latest add button card input label textarea badge dialog alert skeleton dropdown-menu avatar separator tabs sheet
```

Probar:

```bash
npm run dev
npm run build
```

Commit recomendado:

```bash
git add .
git commit -m "Instalar shadcn ui y componentes base"
```

---

## Paso 3 - Instalar Lucide React

Dentro de `frontend`:

```bash
npm install lucide-react
```

Probar import en un componente:

```jsx
import { Home, BookOpen, User } from "lucide-react"
```

Commit recomendado:

```bash
git add .
git commit -m "Instalar Lucide React"
```

---

## Paso 4 - Crear sistema visual base

Crear una carpeta:

```text
frontend/src/components/common/
```

Componentes recomendados:

```text
PageHeader.jsx
StatusBadge.jsx
ConfirmDialog.jsx
EmptyState.jsx
LoadingSkeleton.jsx
```

### `StatusBadge`

Debe convertir estados en badges:

```text
open      → Abierta    → azul
accepted  → Aceptada   → verde
rejected  → Rechazada  → rojo
pending   → Pendiente  → amarillo
completed → Completado → verde
cancelled → Cancelado  → gris/rojo
```

### `ConfirmDialog`

Debe reemplazar `window.confirm`.

Uso esperado:

```text
Título: Eliminar habilidad
Texto: Esta acción no se puede deshacer.
Botones: Cancelar / Eliminar
```

### `LoadingSkeleton`

Debe reemplazar textos como:

```text
Cargando habilidades...
```

Por:

```text
SkeletonCard x 3
```

Commit recomendado:

```bash
git add .
git commit -m "Crear componentes visuales comunes"
```

---

## Paso 5 - Rediseñar Navbar

Objetivo:

```text
Logo a la izquierda
Menú central o lateral
Botón principal “Publicar habilidad”
Avatar/usuario a la derecha
Iconos con Lucide React
Menú responsive en móvil
```

Rutas principales:

```text
/             → Inicio
/skills       → Habilidades
/my-skills    → Mis habilidades
/requests     → Solicitudes
/exchanges    → Intercambios
/profile      → Perfil
/admin        → Admin solo si role_id === 1
```

Iconos:

```text
Home       → Inicio
BookOpen   → Habilidades
Plus       → Publicar habilidad
Handshake  → Solicitudes
User       → Perfil
Settings   → Admin
LogOut     → Salir
Menu       → Menú móvil
```

Reglas:

```text
No cambiar la lógica de autenticación.
No romper signOut.
No cambiar nombres de rutas sin actualizar App.jsx.
```

Commit recomendado:

```bash
git add .
git commit -m "Mejorar navbar responsive con iconos"
```

---

## Paso 6 - Crear página Home clara

Convertir el Dashboard/Home en una página más entendible para la demo.

Estructura:

```text
Hero:
  Título: Intercambia habilidades técnicas sin pagar
  Descripción: Aprende compartiendo lo que sabes.
  Botón principal: Ver habilidades
  Botón secundario: Crear cuenta

Cómo funciona:
  1. Publica una habilidad
  2. Encuentra otra persona
  3. Solicita intercambio
  4. Aprende y valora

Beneficios:
  Comunidad
  Aprendizaje práctico
  Sin pagos
```

Objetivo:

```text
Que el profesor entienda el proyecto en 10 segundos.
```

Commit recomendado:

```bash
git add .
git commit -m "Rediseñar home para presentación final"
```

---

## Paso 7 - Separar `SkillsPage`

Objetivo:

```text
Dejar /skills solo como catálogo de habilidades.
```

Nueva estructura de páginas:

```text
frontend/src/pages/SkillsPage.jsx
frontend/src/pages/MySkillsPage.jsx
frontend/src/pages/RequestsPage.jsx
frontend/src/pages/ExchangesPage.jsx
frontend/src/pages/ProfilePage.jsx
```

Nueva estructura de componentes:

```text
frontend/src/components/skills/SkillCard.jsx
frontend/src/components/skills/SkillForm.jsx
frontend/src/components/skills/SkillSearchBar.jsx

frontend/src/components/requests/RequestCard.jsx
frontend/src/components/requests/RequestsList.jsx

frontend/src/components/exchanges/ExchangeCard.jsx
frontend/src/components/exchanges/RatingForm.jsx
```

Regla:

```text
Primero mover JSX visual.
Después mover lógica.
No cambiar servicios API en este paso.
```

Commit recomendado:

```bash
git add .
git commit -m "Separar SkillsPage en páginas principales"
```

---

## Paso 8 - Nueva página `/skills`

Objetivo:

```text
Catálogo público de habilidades.
```

Debe incluir:

```text
Header: Habilidades disponibles
Buscador
Filtros simples
Grid de SkillCard
EmptyState si no hay datos
Skeletons mientras carga
```

No debe incluir:

```text
Solicitudes recibidas
Solicitudes enviadas
Intercambios
Valoraciones
Formulario grande de crear habilidad
```

La acción principal en cada tarjeta:

```text
Solicitar
```

Si el usuario no está logueado:

```text
Mostrar mensaje: Inicia sesión para solicitar intercambios.
```

Commit recomendado:

```bash
git add .
git commit -m "Limpiar catalogo de habilidades"
```

---

## Paso 9 - Nueva página `/my-skills`

Objetivo:

```text
Gestionar habilidades creadas por el usuario.
```

Debe incluir:

```text
Header: Mis habilidades
Botón: Publicar habilidad
Listado de habilidades propias
Formulario de crear/editar habilidad
Dialog para eliminar
```

Acciones:

```text
Crear
Editar
Eliminar
```

El botón eliminar debe usar Dialog de shadcn/ui, no `window.confirm`.

Commit recomendado:

```bash
git add .
git commit -m "Crear pagina de mis habilidades"
```

---

## Paso 10 - Mejorar SkillCard

Nueva estructura visual:

```text
Arriba:
  Categoría + nivel

Centro:
  Título grande
  Descripción corta

Abajo:
  Usuario
  Formato
  Rating
  Fecha

Acción:
  Botón claro “Solicitar”
```

Metadatos con iconos:

```text
User     → usuario
Monitor  → online/presencial
Star     → valoración
Calendar → fecha
```

Reglas:

```text
Descripción máximo 2 líneas.
Botón principal visible.
Tarjeta limpia con fondo blanco.
Borde suave.
Sombra pequeña.
Sin demasiados degradados.
```

Commit recomendado:

```bash
git add .
git commit -m "Rediseñar tarjetas de habilidades"
```

---

## Paso 11 - Nueva página `/requests`

Objetivo:

```text
Gestionar solicitudes enviadas y recibidas.
```

Puede usar pestañas:

```text
[Enviadas] [Recibidas]
```

Solicitudes enviadas:

```text
Título de habilidad
Propietario
Estado con badge
Fecha
```

Solicitudes recibidas:

```text
Título de habilidad
Usuario solicitante
Estado con badge
Botones aceptar/rechazar si está abierta
```

Badges:

```text
Abierta   → azul
Aceptada  → verde
Rechazada → rojo
```

Commit recomendado:

```bash
git add .
git commit -m "Crear pagina de solicitudes"
```

---

## Paso 12 - Nueva página `/exchanges`

Objetivo:

```text
Mostrar intercambios activos y completados.
```

Puede usar pestañas:

```text
[Activos] [Completados] [Cancelados]
```

Cada intercambio debe mostrar:

```text
Habilidad
Persona relacionada
Estado con badge
Fecha
Botón completar si está pendiente
Formulario de valoración si está completado y sin valorar
```

Badges:

```text
Pendiente  → amarillo
Completado → verde
Cancelado  → gris/rojo
```

Commit recomendado:

```bash
git add .
git commit -m "Crear pagina de intercambios"
```

---

## Paso 13 - Nueva página `/profile`

Objetivo:

```text
Mostrar perfil y valoraciones.
```

Debe incluir:

```text
Avatar o inicial del usuario
Nombre de usuario
Email si aplica
Rol
Número de habilidades
Número de solicitudes
Número de intercambios
Valoración media
Listado de valoraciones recibidas
```

Iconos:

```text
User
Star
BookOpen
Handshake
```

Commit recomendado:

```bash
git add .
git commit -m "Crear pagina de perfil y valoraciones"
```

---

## Paso 14 - Corregir textos sin acentos

Buscar y corregir:

```text
sesion       → sesión
Todavia      → Todavía
Descripcion  → Descripción
Titulo       → Título
puntuacion   → puntuación
valoracion   → valoración
tambien      → también
proximo      → próximo
```

También revisar placeholders:

```text
Busca por titulo, descripcion...
```

Cambiar por:

```text
Busca por título, descripción...
```

Commit recomendado:

```bash
git add .
git commit -m "Corregir textos y acentos de la interfaz"
```

---

## Paso 15 - Migrar CSS antiguo poco a poco

No borrar `global.css` de golpe.

Orden seguro:

```text
1. Mantener estilos globales mínimos.
2. Migrar Navbar.
3. Migrar SkillCard.
4. Migrar formularios.
5. Migrar paneles de solicitudes.
6. Migrar intercambios.
7. Migrar perfil.
8. Eliminar clases CSS que ya no se usen.
```

Mantener en CSS global solo:

```text
body
#root
fuentes si se usan
variables mínimas
estilos base muy generales
```

Eliminar progresivamente:

```text
clases antiguas que ya fueron reemplazadas por Tailwind
degradados excesivos
glassmorphism innecesario
sombras demasiado fuertes
animaciones decorativas no necesarias
```

Commit recomendado:

```bash
git add .
git commit -m "Limpiar CSS antiguo tras migracion visual"
```

---

## Paso 16 - Estados de carga profesionales

Reemplazar textos simples como:

```text
Cargando habilidades...
```

Por:

```text
SkeletonCard x 3
```

Crear:

```text
SkillCardSkeleton
RequestCardSkeleton
ExchangeCardSkeleton
```

Usar shadcn/ui `Skeleton`.

Commit recomendado:

```bash
git add .
git commit -m "Agregar skeletons de carga"
```

---

## Paso 17 - Estados vacíos y errores

Crear `EmptyState` para casos como:

```text
No hay habilidades
No hay solicitudes
No hay intercambios
No hay valoraciones
```

Estructura recomendada:

```text
Icono
Título corto
Descripción breve
Botón de acción si aplica
```

Ejemplos:

```text
No hay habilidades todavía
Publica la primera habilidad para empezar.
[Publicar habilidad]
```

Commit recomendado:

```bash
git add .
git commit -m "Mejorar estados vacios y errores"
```

---

## Paso 18 - Revisión responsive

Probar en:

```text
Desktop grande
Laptop
Tablet
Móvil
```

Revisar:

```text
Navbar no se rompe.
Menú móvil funciona.
Tarjetas no se amontonan.
Formularios tienen buen ancho.
Botones son tocables en móvil.
Tablas o listas no desbordan.
```

Commit recomendado:

```bash
git add .
git commit -m "Ajustar responsive final"
```

---

## Paso 19 - Pruebas funcionales después del rediseño

Checklist obligatorio:

```text
[ ] Registro funciona.
[ ] Login funciona.
[ ] Logout funciona.
[ ] Se guarda token.
[ ] Se listan habilidades.
[ ] Se crea habilidad.
[ ] Se edita habilidad.
[ ] Se elimina habilidad con Dialog.
[ ] Se solicita intercambio.
[ ] Se aceptan solicitudes.
[ ] Se rechazan solicitudes.
[ ] Se ven intercambios.
[ ] Se completa intercambio.
[ ] Se envía valoración.
[ ] No hay errores en consola.
[ ] No hay errores de build.
```

Comandos:

```bash
cd frontend
npm run build
```

```bash
cd backend
npm run dev
```

Commit recomendado:

```bash
git add .
git commit -m "Validar flujo final tras rediseño"
```

---

## Paso 20 - Guion de presentación final

Orden recomendado para la demo:

```text
1. Mostrar Home.
2. Explicar SkillSwap en una frase.
3. Registrar o iniciar sesión.
4. Ver catálogo de habilidades.
5. Publicar una habilidad.
6. Ir a Mis habilidades.
7. Solicitar intercambio desde otro usuario.
8. Ver solicitudes.
9. Aceptar solicitud.
10. Ver intercambio.
11. Completar intercambio.
12. Valorar usuario.
13. Mostrar perfil y valoración.
14. Enseñar brevemente MySQL.
15. Explicar stack: React + Vite, Tailwind, shadcn/ui, Lucide, Express y MySQL.
```

Frase para explicar el proyecto:

```text
SkillSwap permite intercambiar habilidades técnicas entre usuarios sin pagos, conectando personas que quieren enseñar y aprender.
```

---

## Checklist final de calidad visual

```text
[ ] Tema claro profesional.
[ ] Navbar ordenado.
[ ] Botón principal visible.
[ ] Tarjetas limpias.
[ ] Formularios claros.
[ ] Estados con badges.
[ ] Iconos consistentes.
[ ] Sin textos largos innecesarios.
[ ] Sin textos sin acentos.
[ ] Sin modales nativos del navegador.
[ ] Skeletons para cargas.
[ ] Empty states claros.
[ ] Responsive correcto.
[ ] Build funcionando.
```

---

## Regla final

```text
No romper la lógica para mejorar el diseño.
Primero separar pantallas.
Luego migrar componentes.
Después limpiar CSS.
Finalmente probar todo.
```


 Regla principal del roadmap

```text
Primero cerrar el MVP. Después ampliar.
```

Para la primera entrega, es mejor tener pocas funciones funcionando bien que muchas funciones incompletas.
