# Plan para la primera entrega funcional

Este documento reúne el plan de trabajo y la estructura mínima de la primera entrega. El objetivo es llegar a un prototipo funcional en 2 semanas, con login, roles básicos, CRUD de habilidades y solicitudes de intercambio.

## Objetivos

- Registro y login con JWT.
- Conexión a MySQL con el esquema base.
- Endpoints REST principales documentados con Swagger.
- Frontend básico con login, registro, dashboard y habilidades.
- Proyecto arrancable en local con `npm run dev`.

## Criterios mínimos

- El usuario puede registrarse e iniciar sesión.
- Las rutas protegidas requieren token.
- CRUD mínimo de `skills`.
- Swagger accesible en `/api-docs`.
- El frontend consume la API principal.

## Estructura sugerida

```text
proyecto/
├── backend/
│   └── src/
│       ├── routes/
│       ├── controllers/
│       ├── models/
│       ├── middleware/
│       ├── config/
│       └── docs/
└── frontend/
    └── src/
        ├── pages/
        ├── components/
        ├── services/
        ├── context/
        ├── hooks/
        └── styles/
```

## Modelos mínimos

- `roles(id, name)`
- `users(id, username, email, password, role_id, created_at)`
- `skills(id, user_id, title, description, created_at)`
- `requests(id, requester_id, skill_id, status, created_at)`
- `exchanges(id, request_id, agreed_at, status)`
- `ratings(id, exchange_id, rated_by, rated_to, score, comment, created_at)` como mejora final

El modelo completo y normalizado está en `modelo_relacional_completo.md`. Para la primera entrega, `ratings` puede dejarse para la fase final si no llegas a implementarlo.

## Rutas API imprescindibles

- `POST /api/auth/register` - registrar usuario.
- `POST /api/auth/login` - obtener JWT.
- `GET /api/users/me` - perfil protegido.
- `GET /api/skills` - listar habilidades.
- `POST /api/skills` - crear habilidad.
- `PUT /api/skills/:id` - actualizar habilidad.
- `DELETE /api/skills/:id` - borrar habilidad.
- `POST /api/requests` - crear solicitud.
- `GET /api/requests` - listar solicitudes.
- `POST /api/exchanges` - crear intercambio.

## Componentes mínimos del frontend

- `LoginPage` para iniciar sesión.
- `RegisterPage` para crear usuarios.
- `DashboardPage` como pantalla principal.
- `SkillsPage` para listar y crear habilidades.
- `ProfilePage` para ver los datos del usuario.
- `Navbar` para navegar por la aplicación.

## Flujo mínimo

1. Registrar usuario.
2. Iniciar sesión y guardar el token.
3. Crear una habilidad.
4. Ver el listado de habilidades.
5. Crear una solicitud de intercambio.
6. Probar el flujo completo con datos reales.

## Docker

Si quieres evitar diferencias entre casa y clase, puedes usar `docker-compose.yml` con `db`, `backend` y `frontend`. Para la primera entrega no es obligatorio, pero sí recomendable si ya lo controlas.

Comando básico:

```bash
docker compose up --build
```

O en local:

```bash
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

## Checklist

- [ ] Backend y frontend creados.
- [ ] Registro y login funcionando.
- [ ] Conexión a MySQL operativa.
- [ ] CRUD básico de `skills` implementado.
- [ ] Frontend con lista de habilidades y formulario.
- [ ] Swagger accesible y probado.
- [ ] Documentación de ejecución preparada.

## Cronograma breve

- Día 1: Inicializar repo y crear `backend` y `frontend`.
- Día 2: Configurar MySQL y modelos.
- Día 3: Implementar auth con JWT.
- Día 4: Crear CRUD de `skills`.
- Día 5: Construir login y registro en frontend.
- Día 6: Integrar listado y alta de habilidades.
- Día 7: Crear solicitudes de intercambio.
- Día 8: Añadir Swagger y probar la API.
- Día 9: Corregir errores y mejorar interfaz.
- Día 10: Documentar y preparar la demo.

## Recomendación final

La primera entrega debe centrarse en que todo el flujo principal funcione bien. Si no llegas a `ratings`, déjalo para la fase final, pero mantén bien cerradas las relaciones de `users`, `skills`, `requests` y `exchanges`.
