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
- [ ] Subir documentación final a GitHub.

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

- [ ] Crear `database/skillswap.sql`.
- [ ] Crear base de datos `skillswap_db`.
- [ ] Crear tabla `roles`.
- [ ] Crear tabla `users`.
- [ ] Crear tabla `skills`.
- [ ] Crear tabla `requests`.
- [ ] Insertar roles `admin` y `user`.
- [ ] Probar conexión desde backend.
- [ ] Verificar tablas en MySQL.

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

## 9. Fase 4 - Autenticación

Fecha recomendada:

```text
Martes 2 de junio de 2026
```

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

## 10. Fase 5 - Habilidades

Fecha recomendada:

```text
Miércoles 3 de junio de 2026
```

Objetivo:

Permitir publicar y consultar habilidades.

Tareas:

- [ ] Crear `skills.routes.js`.
- [ ] Crear `skills.controller.js`.
- [ ] Crear `skill.model.js`.
- [ ] Implementar `GET /api/skills`.
- [ ] Implementar `GET /api/skills/:id`.
- [ ] Implementar `POST /api/skills`.
- [ ] Proteger `POST /api/skills` con JWT.
- [ ] Usar `req.user.id` como `user_id`.
- [ ] Probar creación de habilidades.
- [ ] Probar listado de habilidades.

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

- [ ] Crear `requests.routes.js`.
- [ ] Crear `requests.controller.js`.
- [ ] Crear `request.model.js`.
- [ ] Implementar `POST /api/requests`.
- [ ] Implementar `GET /api/requests`.
- [ ] Proteger rutas con JWT.
- [ ] Validar que la habilidad exista.
- [ ] Validar que el usuario no solicite su propia habilidad.
- [ ] Guardar solicitud con estado `open`.
- [ ] Probar creación de solicitudes.

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

- [ ] Configurar React Router.
- [ ] Crear `Navbar.jsx`.
- [ ] Crear `LoginPage.jsx`.
- [ ] Crear `RegisterPage.jsx`.
- [ ] Crear `DashboardPage.jsx`.
- [ ] Crear `SkillsPage.jsx`.
- [ ] Crear `SkillCard.jsx`.
- [ ] Crear `AuthContext.jsx`.
- [ ] Crear `api.js`.
- [ ] Crear `authService.js`.
- [ ] Crear `skillsService.js`.
- [ ] Crear `requestsService.js`.

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

- [ ] Conectar registro con `POST /api/auth/register`.
- [ ] Conectar login con `POST /api/auth/login`.
- [ ] Guardar token en `localStorage`.
- [ ] Añadir token automáticamente con Axios.
- [ ] Conectar listado de habilidades.
- [ ] Conectar creación de habilidades.
- [ ] Conectar solicitud de intercambio.
- [ ] Mostrar errores básicos.
- [ ] Mostrar mensajes de éxito.

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

- [ ] Crear `global.css`.
- [ ] Diseñar navbar.
- [ ] Diseñar formularios.
- [ ] Diseñar tarjetas de habilidades.
- [ ] Diseñar botones.
- [ ] Añadir layout responsive básico.
- [ ] Evitar pantalla desordenada.
- [ ] Revisar colores y espaciados.

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

- [ ] Backend arranca con `npm run dev`.
- [ ] Frontend arranca con `npm run dev`.
- [ ] MySQL está activo.
- [ ] La base de datos existe.
- [ ] El registro funciona.
- [ ] El login funciona.
- [ ] El token se guarda.
- [ ] Las rutas protegidas funcionan.
- [ ] Se puede crear una habilidad.
- [ ] Se puede listar habilidades.
- [ ] Se puede solicitar intercambio.
- [ ] No hay errores de CORS.
- [ ] No hay imports rotos.
- [ ] No hay rutas rotas.
- [ ] El README o documentación explica cómo ejecutar el proyecto.
- [ ] Todo está subido a GitHub.

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

- [ ] Editar habilidad.
- [ ] Eliminar habilidad.
- [ ] Filtrar habilidades por texto.
- [ ] Añadir categoría.
- [ ] Añadir nivel.
- [ ] Añadir fecha formateada.

## Fase posterior 2 - Intercambios

- [ ] Aceptar solicitud.
- [ ] Rechazar solicitud.
- [ ] Crear intercambio al aceptar.
- [ ] Marcar intercambio como completado.
- [ ] Cancelar intercambio.

## Fase posterior 3 - Valoraciones

- [ ] Crear tabla `ratings`.
- [ ] Valorar usuario después de intercambio.
- [ ] Mostrar puntuación media.
- [ ] Evitar valoraciones duplicadas.
- [ ] Evitar que un usuario se valore a sí mismo.

## Fase posterior 4 - Administración

- [ ] Panel de administrador.
- [ ] Listar usuarios.
- [ ] Eliminar habilidades inapropiadas.
- [ ] Revisar solicitudes.
- [ ] Bloquear usuarios.

## Fase posterior 5 - Profesionalización

- [ ] Swagger.
- [ ] Docker.
- [ ] Tests.
- [ ] Deploy.
- [ ] Variables de entorno de producción.
- [ ] Mejoras de seguridad.
- [ ] Mejoras visuales.

---

## 18. Regla principal del roadmap

```text
Primero cerrar el MVP. Después ampliar.
```

Para la primera entrega, es mejor tener pocas funciones funcionando bien que muchas funciones incompletas.
