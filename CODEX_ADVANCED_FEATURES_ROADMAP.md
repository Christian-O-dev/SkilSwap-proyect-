# CODEX_ADVANCED_FEATURES_ROADMAP.md

# SkillSwap - Roadmap avanzado para Codex

Este archivo está pensado para usarlo con Codex en VS Code.  
Copia y pega **un paso cada vez**, revisa los cambios y prueba antes de continuar.

## Objetivo

Implementar funciones avanzadas sin romper lo que ya funciona:

- Subida de imágenes.
- Recuperación de contraseña.
- Notificaciones por email.
- Sistema avanzado de ratings.
- Panel avanzado de administrador.
- Chat.
- Mejoras profesionales extra.

## Reglas generales para Codex

```txt
No rehacer el proyecto.
No cambiar el stack principal.
No borrar archivos sin preguntar.
No tocar .env real.
No subir secretos.
No cambiar endpoints sin actualizar servicios frontend.
No mezclar muchas fases en un solo cambio.
Después de cada fase, probar login y flujo principal.
```

Stack base:

```txt
Frontend: React + Vite
Backend: Node.js + Express
Base de datos: MySQL
Autenticación: JWT
Contraseñas: bcrypt
HTTP client: Axios
Rutas frontend: React Router DOM
```

---

# Paso 0 - Crear rama segura

## Comandos

```bash
git status
git branch --show-current
git switch diseño_final
git pull origin diseño_final
git switch -c feature/advanced-features
git push -u origin feature/advanced-features
```

Si tu rama principal no es `diseño_final`, cambia el nombre por tu rama actual.

## Prompt para Codex

```txt
Revisa la estructura actual de SkillSwap. Confirma dónde están frontend, backend, database, rutas, controladores, modelos, servicios y contexto de autenticación. No modifiques nada todavía. Dame un resumen de funciones ya implementadas y archivos importantes.
```

## Checklist

```txt
[ ] Estoy en una rama nueva.
[ ] Backend arranca.
[ ] Frontend arranca.
[ ] Login funciona.
[ ] Crear habilidad funciona.
[ ] Solicitudes funcionan.
```

---

# Paso 1 - Backup y migraciones SQL

## Objetivo

Crear un archivo SQL separado para funciones avanzadas.

## Archivo nuevo

```txt
database/advanced_features.sql
```

## Prompt para Codex

```txt
Crea database/advanced_features.sql con migraciones para:
1. avatar_url y avatar_public_id en users.
2. image_url y image_public_id en skills.
3. tabla password_resets.
4. tabla email_notifications.
5. status en users para bloquear usuarios.
6. deleted_at en skills para soft delete.
7. is_visible en ratings.
8. tablas conversations y messages para chat.
9. tabla notification_preferences.
10. tabla activity_logs.

No modifiques el SQL base. Usa ALTER TABLE y CREATE TABLE IF NOT EXISTS. Evita romper si algo ya existe.
```

## SQL base recomendado para Codex

```sql
USE skillswap_db;

ALTER TABLE users
ADD COLUMN avatar_url VARCHAR(500) NULL,
ADD COLUMN avatar_public_id VARCHAR(255) NULL;

ALTER TABLE skills
ADD COLUMN image_url VARCHAR(500) NULL,
ADD COLUMN image_public_id VARCHAR(255) NULL;

CREATE TABLE IF NOT EXISTS password_resets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token_hash VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS email_notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type VARCHAR(100) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  status ENUM('pending','sent','failed') DEFAULT 'pending',
  sent_at DATETIME NULL,
  error_message TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE users
ADD COLUMN status ENUM('active','blocked') DEFAULT 'active';

ALTER TABLE skills
ADD COLUMN deleted_at DATETIME NULL;

ALTER TABLE ratings
ADD COLUMN is_visible BOOLEAN DEFAULT TRUE;

CREATE TABLE IF NOT EXISTS conversations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exchange_id INT NULL,
  request_id INT NULL,
  user_one_id INT NOT NULL,
  user_two_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (exchange_id) REFERENCES exchanges(id) ON DELETE CASCADE,
  FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE,
  FOREIGN KEY (user_one_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (user_two_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  conversation_id INT NOT NULL,
  sender_id INT NOT NULL,
  body TEXT NOT NULL,
  read_at DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notification_preferences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  email_requests BOOLEAN DEFAULT TRUE,
  email_exchanges BOOLEAN DEFAULT TRUE,
  email_ratings BOOLEAN DEFAULT TRUE,
  email_security BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  action VARCHAR(100) NOT NULL,
  details TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
```

## Checklist

```txt
[ ] SQL creado.
[ ] Backup de base de datos hecho.
[ ] Migración revisada.
[ ] No se tocó el SQL base.
```

## Commit

```bash
git add database/advanced_features.sql
git commit -m "Agregar migraciones avanzadas"
```

---

# Paso 2 - Dependencias backend

## Comandos

```bash
cd backend
npm install multer cloudinary nodemailer socket.io helmet express-rate-limit zod
```

## Uso

```txt
multer              → recibir archivos.
cloudinary          → guardar imágenes.
nodemailer          → enviar emails.
socket.io           → chat en tiempo real.
helmet              → headers de seguridad.
express-rate-limit  → limitar intentos.
zod                 → validar datos.
```

## Prompt para Codex

```txt
Revisa backend/package.json y prepara el backend para usar multer, cloudinary, nodemailer, socket.io, helmet, express-rate-limit y zod. No implementes funciones todavía. Verifica que npm run dev y npm start sigan funcionando.
```

## Commit

```bash
git add backend/package.json backend/package-lock.json
git commit -m "Instalar dependencias avanzadas backend"
```

---

# Paso 3 - Seguridad base

## Objetivo

Añadir seguridad antes de abrir nuevas funciones.

## Prompt para Codex

```txt
Mejora la seguridad base del backend sin cambiar la lógica existente. Añade helmet en app.js, express-rate-limit para rutas sensibles de auth, CORS usando FRONTEND_URL desde .env, backend/.env.example y verifica que .env esté en .gitignore. No cambies endpoints existentes.
```

## Variables para `backend/.env.example`

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=skillswap_db
JWT_SECRET=change_me
FRONTEND_URL=http://localhost:5173

SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM="SkillSwap <no-reply@skillswap.com>"

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Checklist

```txt
[ ] Backend arranca.
[ ] Login funciona.
[ ] Registro funciona.
[ ] CORS no se rompe.
[ ] .env está en .gitignore.
[ ] .env.example existe.
```

## Commit

```bash
git add backend/src backend/.env.example .gitignore
git commit -m "Agregar seguridad base"
```

---

# Paso 4 - Subida de imágenes backend

## Endpoints

```txt
POST /api/uploads/avatar
DELETE /api/uploads/avatar
POST /api/uploads/skills/:id/image
DELETE /api/uploads/skills/:id/image
```

## Prompt para Codex

```txt
Implementa subida de imágenes en backend usando multer y Cloudinary. Crea:
- backend/src/config/cloudinary.js
- backend/src/middleware/upload.middleware.js
- backend/src/controllers/uploads.controller.js
- backend/src/routes/uploads.routes.js

Requisitos:
- Solo usuarios logueados.
- Avatar del usuario actual.
- Imagen solo para habilidad propia.
- Aceptar jpg/png/webp.
- Máximo 2MB.
- Guardar avatar_url/avatar_public_id en users.
- Guardar image_url/image_public_id en skills.
- No romper rutas existentes.
```

## Checklist

```txt
[ ] Avatar sube.
[ ] Avatar elimina.
[ ] Imagen de habilidad sube.
[ ] Solo propietario puede subir imagen.
[ ] Archivos inválidos se rechazan.
```

## Commit

```bash
git add backend/src
git commit -m "Implementar subida de imagenes backend"
```

---

# Paso 5 - Subida de imágenes frontend

## Archivos

```txt
frontend/src/services/uploadService.js
frontend/src/components/uploads/AvatarUploader.jsx
frontend/src/components/uploads/SkillImageUploader.jsx
frontend/src/components/uploads/ImagePreview.jsx
```

## Prompt para Codex

```txt
Implementa subida de imágenes en frontend. Crea uploadService.js con FormData para llamar a /api/uploads/avatar y /api/uploads/skills/:id/image. Crea AvatarUploader, SkillImageUploader e ImagePreview. Integra AvatarUploader en ProfilePage y SkillImageUploader en MySkillsPage o formulario de edición. Muestra preview, loading y errores claros.
```

## Checklist

```txt
[ ] Se sube avatar.
[ ] Se ve preview.
[ ] Se elimina avatar.
[ ] Se sube imagen de habilidad.
[ ] No se rompe ProfilePage.
```

## Commit

```bash
git add frontend/src
git commit -m "Agregar subida de imagenes frontend"
```

---

# Paso 6 - Recuperación de contraseña backend

## Endpoints

```txt
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

## Prompt para Codex

```txt
Implementa recuperación de contraseña en backend. Usa crypto.randomBytes para generar token seguro. Guarda hash del token en password_resets con expiración de 30 minutos y used_at. Crea POST /api/auth/forgot-password y POST /api/auth/reset-password. No reveles si el email existe. La nueva contraseña debe guardarse con bcrypt. No rompas login ni registro.
```

## Checklist

```txt
[ ] forgot-password responde aunque email no exista.
[ ] token_hash se guarda.
[ ] token expira.
[ ] reset-password cambia contraseña.
[ ] token no se reutiliza.
[ ] login funciona con nueva contraseña.
```

## Commit

```bash
git add backend/src
git commit -m "Implementar recuperacion de contraseña backend"
```

---

# Paso 7 - Servicio de emails con Nodemailer

## Archivo

```txt
backend/src/services/email.service.js
```

## Prompt para Codex

```txt
Crea backend/src/services/email.service.js usando Nodemailer. Debe crear un transporter reutilizable con SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS y SMTP_FROM desde .env. Implementa sendPasswordResetEmail y deja preparadas funciones para solicitudes, intercambios y ratings. Si falla el email, no debe caerse el backend.
```

## Funciones

```txt
sendPasswordResetEmail(to, resetUrl)
sendRequestReceivedEmail(to, data)
sendRequestAcceptedEmail(to, data)
sendExchangeCompletedEmail(to, data)
sendRatingReceivedEmail(to, data)
```

## Commit

```bash
git add backend/src/services backend/.env.example
git commit -m "Crear servicio de emails"
```

---

# Paso 8 - Recuperación de contraseña frontend

## Páginas

```txt
frontend/src/pages/ForgotPasswordPage.jsx
frontend/src/pages/ResetPasswordPage.jsx
```

## Rutas

```txt
/forgot-password
/reset-password?token=...
```

## Prompt para Codex

```txt
Implementa recuperación de contraseña en frontend. Crea ForgotPasswordPage y ResetPasswordPage. Añade rutas en App.jsx. Añade forgotPassword y resetPassword en authService. LoginPage debe tener enlace "¿Olvidaste tu contraseña?". Muestra mensajes claros.
```

## Checklist

```txt
[ ] Login tiene enlace.
[ ] ForgotPasswordPage envía email.
[ ] ResetPasswordPage lee token.
[ ] Contraseña cambia.
[ ] Login funciona con nueva contraseña.
```

## Commit

```bash
git add frontend/src
git commit -m "Agregar recuperacion contraseña frontend"
```

---

# Paso 9 - Notificaciones por email

## Eventos

```txt
Solicitud recibida.
Solicitud aceptada.
Intercambio completado.
Nueva valoración recibida.
```

## Prompt para Codex

```txt
Integra notificaciones por email usando email.service.js. Envía email cuando un usuario recibe una solicitud, cuando una solicitud es aceptada, cuando un intercambio se completa y cuando recibe una valoración. Registra cada intento en email_notifications con status sent o failed. Un fallo de email no debe romper la acción principal.
```

## Commit

```bash
git add backend/src
git commit -m "Agregar notificaciones por email"
```

---

# Paso 10 - Preferencias de notificaciones

## Endpoints

```txt
GET /api/notification-preferences
PUT /api/notification-preferences
```

## Prompt para Codex

```txt
Implementa preferencias de notificaciones. Crea GET y PUT /api/notification-preferences. Permite activar/desactivar emails de solicitudes, intercambios, ratings y seguridad. Integra la UI en ProfilePage o SettingsPage. Las notificaciones deben respetar estas preferencias.
```

## Commit

```bash
git add backend/src frontend/src
git commit -m "Agregar preferencias de notificaciones"
```

---

# Paso 11 - Ratings avanzados backend

## Endpoints

```txt
POST /api/ratings
GET /api/users/:id/ratings
GET /api/users/:id/rating-summary
PATCH /api/admin/ratings/:id/hide
PATCH /api/admin/ratings/:id/show
```

## Prompt para Codex

```txt
Mejora el sistema de ratings. Añade GET /api/users/:id/rating-summary con media, total y distribución de 1 a 5 estrellas. Reglas: solo intercambio completado, solo participantes, no valorarse a sí mismo, una valoración por intercambio. Añade is_visible para ocultar ratings desde admin. No rompas ratings actuales.
```

## Commit

```bash
git add backend/src
git commit -m "Mejorar ratings backend"
```

---

# Paso 12 - Ratings avanzados frontend

## Componentes

```txt
RatingStars.jsx
RatingSummary.jsx
RatingDistribution.jsx
RatingCard.jsx
RatingForm.jsx
```

## Prompt para Codex

```txt
Implementa UI avanzada para ratings. Crea RatingStars, RatingSummary, RatingDistribution, RatingCard y mejora RatingForm. Integra RatingSummary en ProfilePage y SkillCard si corresponde. Usa estrellas, badges claros y comentarios visibles solo si is_visible = true.
```

## Commit

```bash
git add frontend/src
git commit -m "Agregar UI avanzada de ratings"
```

---

# Paso 13 - Admin avanzado backend

## Endpoints

```txt
GET /api/admin/stats
GET /api/admin/users
PATCH /api/admin/users/:id/block
PATCH /api/admin/users/:id/unblock
GET /api/admin/skills
DELETE /api/admin/skills/:id
GET /api/admin/requests
GET /api/admin/exchanges
GET /api/admin/ratings
PATCH /api/admin/ratings/:id/hide
PATCH /api/admin/ratings/:id/show
GET /api/admin/activity-logs
```

## Prompt para Codex

```txt
Implementa panel avanzado de administrador en backend. Crea adminMiddleware para permitir solo role_id === 1. Añade endpoints para stats, usuarios, bloquear/desbloquear usuarios, listar habilidades, soft delete de habilidades, listar solicitudes, intercambios, ratings, ocultar/mostrar ratings y activity logs. No permitas que el admin se bloquee a sí mismo.
```

## Checklist

```txt
[ ] Usuario normal recibe 403.
[ ] Admin accede.
[ ] Admin ve stats.
[ ] Admin bloquea usuarios.
[ ] Usuario bloqueado no inicia sesión.
[ ] Admin no se bloquea a sí mismo.
```

## Commit

```bash
git add backend/src
git commit -m "Implementar admin avanzado backend"
```

---

# Paso 14 - Admin avanzado frontend

## Rutas

```txt
/admin
/admin/users
/admin/skills
/admin/requests
/admin/exchanges
/admin/ratings
/admin/activity
```

## Prompt para Codex

```txt
Implementa panel avanzado de administrador en frontend. Crea rutas admin protegidas para role_id === 1. Añade dashboard con stats, tabla de usuarios, habilidades, solicitudes, intercambios, ratings y logs de actividad. Usa tablas claras, badges de estado y modales de confirmación. No muestres admin a usuarios normales.
```

## Commit

```bash
git add frontend/src
git commit -m "Implementar admin avanzado frontend"
```

---

# Paso 15 - Activity logs

## Acciones

```txt
user_registered
skill_created
skill_deleted
request_created
request_accepted
request_rejected
exchange_completed
rating_created
user_blocked
user_unblocked
```

## Prompt para Codex

```txt
Implementa activity_logs. Crea activity.service.js para registrar acciones importantes. Integra logs en registro, creación de habilidades, solicitudes, intercambios, ratings y acciones admin. Añade vista en admin para ver últimos logs. Si falla el log, no debe romper la acción principal.
```

## Commit

```bash
git add backend/src frontend/src
git commit -m "Agregar logs de actividad"
```

---

# Paso 16 - Chat REST backend

## Endpoints

```txt
GET /api/conversations
GET /api/conversations/:id/messages
POST /api/conversations/:id/messages
PATCH /api/messages/:id/read
```

## Prompt para Codex

```txt
Implementa la base REST del chat usando conversations y messages. Crea conversation.model.js, message.model.js, chat.controller.js y chat.routes.js. Permite listar conversaciones del usuario, ver mensajes, enviar mensaje y marcar mensaje como leído. Solo participantes pueden acceder. No permitir mensajes vacíos.
```

## Commit

```bash
git add backend/src
git commit -m "Implementar chat REST backend"
```

---

# Paso 17 - Chat REST frontend

## Componentes

```txt
ChatPage.jsx
ConversationList.jsx
ChatWindow.jsx
MessageBubble.jsx
MessageInput.jsx
```

## Prompt para Codex

```txt
Implementa frontend básico de chat usando REST. Crea ChatPage, ConversationList, ChatWindow, MessageBubble, MessageInput y chatService. El usuario debe ver conversaciones, abrir una conversación, ver mensajes y enviar mensajes. Aún no uses Socket.IO.
```

## Commit

```bash
git add frontend/src
git commit -m "Crear interfaz base de chat"
```

---

# Paso 18 - Socket.IO backend

## Eventos

```txt
join_conversation
send_message
receive_message
message_read
user_typing
user_stop_typing
```

## Prompt para Codex

```txt
Añade Socket.IO al backend sin romper Express. Configura server.js para crear HTTP server e inicializar Socket.IO con CORS usando FRONTEND_URL. Implementa autenticación del socket con JWT. Crea eventos join_conversation, send_message, receive_message, message_read, user_typing y user_stop_typing. Guarda siempre los mensajes en MySQL; Socket.IO solo notifica en tiempo real.
```

## Commit

```bash
git add backend/src
git commit -m "Agregar Socket IO backend"
```

---

# Paso 19 - Socket.IO frontend

## Comando

```bash
cd frontend
npm install socket.io-client
```

## Archivos

```txt
frontend/src/services/socket.js
frontend/src/hooks/useSocket.js
```

## Prompt para Codex

```txt
Añade Socket.IO client al frontend. Crea services/socket.js y hook useSocket. Conecta ChatPage para unirse a conversación, enviar mensajes en tiempo real, recibir mensajes, marcar leídos y mostrar typing indicator. Mantén REST como respaldo para cargar historial.
```

## Commit

```bash
git add frontend/package.json frontend/package-lock.json frontend/src
git commit -m "Agregar chat tiempo real frontend"
```

---

# Paso 20 - Paginación y filtros

## Prompt para Codex

```txt
Añade paginación y filtros sin romper endpoints existentes. Skills debe soportar page, limit, search, category, level, format y sort. Admin users debe soportar page, limit y search. Mensajes de chat debe soportar page y limit. Devuelve total, page, limit y totalPages. Integra paginación en frontend.
```

## Endpoints esperados

```txt
GET /api/skills?page=1&limit=12&search=&category=&level=&format=&sort=recent
GET /api/admin/users?page=1&limit=20&search=
GET /api/conversations/:id/messages?page=1&limit=30
```

## Commit

```bash
git add backend/src frontend/src
git commit -m "Agregar paginacion y filtros"
```

---

# Paso 21 - Validación con Zod

## Prompt para Codex

```txt
Añade validación con Zod en backend. Crea schemas para auth, skills, requests, ratings, chat y uploads. Crea validate.middleware.js. Aplica validación a endpoints principales sin romper respuestas existentes. Los errores deben devolver 400 con mensajes claros.
```

## Checklist

```txt
[ ] Registro valida email.
[ ] Login valida datos.
[ ] Skills valida título/descripción.
[ ] Ratings valida score 1-5.
[ ] Chat valida mensaje no vacío.
```

## Commit

```bash
git add backend/src
git commit -m "Agregar validaciones con Zod"
```

---

# Paso 22 - Pulido visual final

## Prompt para Codex

```txt
Pulir interfaz final de SkillSwap sin cambiar lógica. Revisa Navbar, Skills, MySkills, Requests, Exchanges, Profile, Admin y Chat. Usa componentes reutilizables, empty states, skeletons, badges y modales. Mantén consistencia visual y responsive. Corrige textos sin acentos.
```

## Checklist

```txt
[ ] Navbar limpio.
[ ] Avatar visible.
[ ] Cards consistentes.
[ ] Badges de estado.
[ ] Modales de confirmación.
[ ] Skeletons.
[ ] Empty states.
[ ] Tablas responsive.
[ ] Chat limpio.
[ ] Admin dashboard claro.
[ ] No hay textos sin acentos.
```

## Commit

```bash
git add frontend/src
git commit -m "Pulir interfaz final"
```

---

# Paso 23 - QA final con Codex

## Prompt para Codex

```txt
Revisa todo el proyecto como QA antes de entrega. Busca errores de imports, rutas rotas, variables de entorno faltantes, endpoints mal conectados, problemas CORS, validaciones, errores visuales y posibles fallos en demo. No hagas refactor grande; solo corrige problemas concretos y explícame cada cambio.
```

## Checklist funcional

```txt
[ ] Registro.
[ ] Login.
[ ] Logout.
[ ] Recuperación de contraseña.
[ ] Subida de avatar.
[ ] Crear habilidad.
[ ] Editar habilidad.
[ ] Eliminar habilidad.
[ ] Subir imagen de habilidad.
[ ] Solicitar intercambio.
[ ] Aceptar solicitud.
[ ] Rechazar solicitud.
[ ] Completar intercambio.
[ ] Valorar usuario.
[ ] Ver rating summary.
[ ] Email recuperación.
[ ] Email solicitud aceptada.
[ ] Admin dashboard.
[ ] Chat REST.
[ ] Chat tiempo real.
[ ] Paginación.
[ ] Filtros.
```

## Comandos

```bash
cd frontend
npm run build
```

```bash
cd backend
npm run dev
```

## Commit final

```bash
git add .
git commit -m "Preparar entrega final avanzada"
git push
```

---

# Orden recomendado si hay poco tiempo

```txt
1. Subida de avatar.
2. Recuperación de contraseña.
3. Admin avanzado.
4. Rating summary.
5. Chat REST.
6. Chat tiempo real.
7. Notificaciones completas.
```

---

# Guion de demo final

```txt
1. Abrir Home.
2. Explicar SkillSwap.
3. Registrar usuario.
4. Login.
5. Subir avatar.
6. Crear habilidad con imagen.
7. Ver catálogo.
8. Solicitar intercambio.
9. Aceptar solicitud.
10. Abrir chat.
11. Enviar mensaje.
12. Completar intercambio.
13. Valorar usuario.
14. Mostrar perfil con rating summary.
15. Mostrar recuperación de contraseña.
16. Mostrar panel admin.
17. Mostrar base de datos.
18. Explicar stack.
```

Frase para presentar:

```txt
SkillSwap es una plataforma web para intercambiar habilidades técnicas sin pagos directos. Los usuarios publican lo que saben, solicitan intercambios, conversan, completan el aprendizaje y valoran la experiencia.
```

---

# Variables de entorno para producción

```env
FRONTEND_URL=https://tu-frontend.vercel.app
JWT_SECRET=clave_larga_segura
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Regla final:

```txt
Nunca subir .env real al repositorio.
```
