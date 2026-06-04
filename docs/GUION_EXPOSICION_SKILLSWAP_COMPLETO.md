# Guion de exposición actualizado — SkillSwap

**Duración aproximada:** 5–6 minutos
**Objetivo:** explicar de forma clara el estado actual del proyecto, incluyendo las mejoras realizadas después del MVP.

---

## 1. Introducción

Buenos días.

Mi proyecto se llama **SkillSwap**. Es una aplicación web que permite intercambiar habilidades técnicas entre usuarios sin utilizar dinero.

Por ejemplo, una persona puede ofrecer ayuda con HTML y CSS y solicitar aprender JavaScript, React o bases de datos.

El flujo principal que ya funciona es:

```text
Registro → Login → Publicar habilidad → Solicitar intercambio
→ Aceptar solicitud → Completar intercambio → Valorar usuario
```

El proyecto comenzó como un MVP sencillo, pero después se amplió tanto a nivel funcional como visual.

---

## 2. Arquitectura general

SkillSwap es una aplicación **full stack** organizada en tres partes:

```text
Frontend → API Backend → Base de datos MySQL
```

* El **frontend** muestra la interfaz y permite interactuar con la aplicación.
* El **backend** procesa las peticiones, aplica las reglas del sistema y protege los datos.
* La **base de datos** guarda toda la información de forma permanente.

El frontend y el backend se comunican mediante una **API REST**, utilizando peticiones HTTP y respuestas en formato JSON.

---

## 3. Frontend

El frontend está desarrollado con:

```text
React + Vite
```

React permite construir la interfaz utilizando componentes reutilizables, mientras que Vite permite ejecutar y compilar el proyecto rápidamente.

Después del MVP, el frontend se mejoró bastante y actualmente utiliza varias tecnologías adicionales.

### React Router DOM

React Router permite navegar entre páginas sin recargar completamente la aplicación.

Las rutas principales actuales son:

```text
/              → página principal
/dashboard     → página principal
/login         → inicio de sesión
/register      → registro
/skills        → catálogo de habilidades
/my-skills     → habilidades creadas por el usuario
/requests      → solicitudes enviadas y recibidas
/exchanges     → intercambios
/profile       → perfil y valoraciones
/admin         → panel de administración
```

Algunas rutas están protegidas. Por ejemplo, para entrar a `my-skills`, `requests`, `exchanges` o `profile`, el usuario debe haber iniciado sesión.

### Axios

Axios se utiliza para realizar peticiones HTTP al backend.

Se creó una configuración central que:

* Usa la URL del backend desde variables de entorno.
* Envía datos en formato JSON.
* Añade automáticamente el token JWT.
* Centraliza los mensajes de error.

Esto evita repetir la misma configuración en todas las páginas.

### Context API y AuthContext

Se utiliza `AuthContext` para gestionar globalmente:

```text
Usuario actual
Token JWT
Estado de carga
Login
Registro
Logout
Restauración de sesión
```

El token y los datos básicos del usuario se guardan en `localStorage`, permitiendo restaurar la sesión después de actualizar la página.

### Servicios frontend separados

El frontend está organizado en servicios especializados:

```text
authService
skillsService
requestsService
exchangesService
ratingsService
adminService
```

Cada servicio se encarga de comunicarse con una parte concreta del backend.

---

## 4. Tecnologías visuales añadidas después del MVP

Después de completar el MVP, se realizó un rediseño para que la interfaz fuera más profesional, clara y reutilizable.

### Tailwind CSS

Se añadió **Tailwind CSS** para controlar directamente desde los componentes:

```text
Colores
Espaciados
Bordes
Tipografía
Responsive
Estados hover y focus
Diseño de tarjetas y formularios
```

También se creó una paleta visual clara con fondo gris claro, tarjetas blancas, color principal azul y colores específicos para errores, bordes y estados.

Gracias a Tailwind, la interfaz es más consistente y adaptable a distintos tamaños de pantalla.

### shadcn/ui

Se incorporó **shadcn/ui** para crear componentes reutilizables.

Por ejemplo, se utilizan componentes como:

```text
Button
Card
CardHeader
CardContent
CardTitle
CardDescription
```

La ventaja de shadcn/ui es que los componentes quedan guardados dentro del propio proyecto, por lo que pueden modificarse y adaptarse según las necesidades de SkillSwap.

También permite definir variantes para los botones:

```text
Principal
Secundario
Outline
Destructivo
Ghost
Link
```

Esto ayuda a mantener un sistema visual consistente.

### Lucide React

Se utiliza **Lucide React** para añadir iconos modernos y consistentes.

Algunos iconos utilizados son:

```text
Search        → buscar
BookOpen      → habilidades
Send          → enviar solicitud
ArrowRight    → navegación
SlidersHorizontal → filtros
X             → limpiar búsqueda
```

Los iconos ayudan a que el usuario entienda rápidamente las acciones disponibles.

### Diseño responsive y estados de carga

También se añadieron mejoras como:

```text
Diseño adaptable a móvil y escritorio
Skeletons de carga
Tarjetas reutilizables
Buscadores visuales
Rutas separadas
Mensajes claros de éxito y error
```

Estas mejoras hacen que la aplicación se vea más profesional que el MVP inicial.

---

## 5. Funcionalidades del frontend

Actualmente la interfaz permite:

### Gestión de habilidades

```text
Ver catálogo de habilidades
Buscar habilidades
Crear habilidades
Editar habilidades propias
Eliminar habilidades propias
Ver categoría, nivel, formato y valoración
```

### Solicitudes

```text
Enviar solicitudes
Ver solicitudes enviadas
Ver solicitudes recibidas
Aceptar solicitudes
Rechazar solicitudes
```

### Intercambios

```text
Ver intercambios
Completar intercambios
Cancelar intercambios
```

### Valoraciones

```text
Valorar después de completar un intercambio
Añadir puntuación
Añadir comentario
Mostrar valoración media
Mostrar número de valoraciones
```

### Perfil y administración

```text
Ver perfil
Ver valoraciones
Acceder al panel administrador según el rol
```

---

## 6. Backend

El backend está desarrollado con:

```text
Node.js + Express
```

Express recibe las peticiones del frontend y las distribuye mediante rutas.

Las rutas principales de la API son:

```text
/api/auth
/api/users
/api/skills
/api/requests
/api/exchanges
/api/ratings
/api/admin
```

También existe:

```text
GET /api/health
```

Esta ruta sirve para comprobar rápidamente que el servidor funciona.

El backend está organizado de esta forma:

```text
Rutas → Controladores → Modelos → Base de datos
```

* Las **rutas** definen los endpoints.
* Los **controladores** aplican la lógica.
* Los **modelos** realizan consultas SQL.
* Los **middlewares** protegen rutas y comprueban permisos.

### Seguridad del backend

Las contraseñas no se guardan directamente. Se cifran usando:

```text
bcrypt
```

Cuando un usuario inicia sesión, el backend genera un:

```text
JWT
```

Este token identifica al usuario y permite acceder a rutas protegidas.

También existe control de roles:

```text
Usuario normal
Administrador
```

Un usuario bloqueado no puede iniciar sesión ni utilizar funciones protegidas.

---

## 7. Base de datos

La base de datos utiliza:

```text
MySQL
```

El nombre de la base de datos es:

```text
skillswap_db
```

Las tablas principales son:

### `roles`

Guarda los tipos de usuario:

```text
admin
user
```

### `users`

Guarda:

```text
Nombre de usuario
Correo electrónico
Contraseña cifrada
Rol
Estado de bloqueo
Fecha de creación
```

### `skills`

Guarda:

```text
Título
Descripción
Categoría
Nivel
Formato
Usuario propietario
Fecha de creación
```

### `requests`

Guarda las solicitudes realizadas sobre una habilidad.

Estados posibles:

```text
open
accepted
rejected
```

### `exchanges`

Se crea cuando una solicitud es aceptada.

Estados posibles:

```text
pending
completed
cancelled
```

### `ratings`

Guarda las valoraciones realizadas después de completar un intercambio:

```text
Puntuación de 1 a 5
Comentario
Usuario que valora
Usuario valorado
Intercambio relacionado
```

### Relaciones y restricciones

Las tablas están relacionadas mediante claves foráneas.

Por ejemplo:

* Una habilidad pertenece a un usuario.
* Una solicitud pertenece a una habilidad.
* Una solicitud aceptada genera un intercambio.
* Un intercambio completado permite realizar valoraciones.

También existen restricciones para evitar errores:

```text
No permitir puntuaciones fuera del rango 1–5
No permitir que un usuario se valore a sí mismo
No permitir valoraciones duplicadas
No permitir dos intercambios para una misma solicitud
```

---

## 8. Panel de administración

SkillSwap también tiene un panel de administración protegido.

El administrador puede:

```text
Ver usuarios registrados
Bloquear y desbloquear usuarios
Ver habilidades publicadas
Eliminar habilidades
Revisar solicitudes
Ver estadísticas generales
```

El acceso está protegido tanto en el frontend como en el backend.

Aunque una persona intente entrar manualmente a `/admin`, el sistema comprueba que tenga el rol de administrador.

---

## 9. Diferencia entre el MVP y el estado actual

El MVP inicial incluía principalmente:

```text
Registro
Login
Crear habilidad
Listar habilidades
Crear solicitud
```

Después se añadieron:

```text
Edición y eliminación de habilidades
Buscador
Solicitudes enviadas y recibidas
Aceptar y rechazar solicitudes
Intercambios
Valoraciones
Panel administrador
Bloqueo de usuarios
Rutas separadas
Tailwind CSS
shadcn/ui
Lucide React
Diseño responsive
Componentes reutilizables
Skeletons de carga
```

Esto permitió convertir una primera versión funcional en una aplicación más completa y profesional.

---

## 10. Demostración recomendada

Durante la exposición mostraré este flujo:

1. Mostrar la página principal.
2. Explicar brevemente el diseño realizado con Tailwind, shadcn/ui y Lucide React.
3. Registrar o iniciar sesión.
4. Mostrar el catálogo de habilidades.
5. Crear una habilidad desde `Mis habilidades`.
6. Buscar una habilidad.
7. Entrar con otro usuario y solicitarla.
8. Aceptar la solicitud.
9. Mostrar el intercambio creado.
10. Marcarlo como completado.
11. Realizar una valoración.
12. Mostrar el perfil.
13. Enseñar el panel administrador.
14. Mostrar las tablas relacionadas en MySQL.

---

## 11. Conclusión

SkillSwap comenzó como un MVP sencillo, pero después se amplió tanto a nivel funcional como visual.

Actualmente es una aplicación full stack donde:

```text
React y Vite gestionan la interfaz
Tailwind CSS controla el diseño
shadcn/ui aporta componentes reutilizables
Lucide React aporta iconos
Express gestiona la lógica del backend
JWT y bcrypt protegen la aplicación
MySQL guarda y relaciona los datos
```

El proyecto permite gestionar todo el ciclo de intercambio de habilidades, desde la publicación inicial hasta la valoración final.

---

# Chuleta rápida para recordar

```text
Frontend:
React
Vite
React Router DOM
Axios
Context API / AuthContext
localStorage
Tailwind CSS
shadcn/ui
Lucide React
Servicios separados
Diseño responsive
Skeletons

Backend:
Node.js
Express
bcrypt
JWT
Middlewares
API REST

Base de datos:
MySQL

Tablas:
roles
users
skills
requests
exchanges
ratings

Flujo:
registro → login → habilidad → solicitud
→ intercambio → valoración

Después del MVP:
editar/eliminar habilidades
buscador
rutas separadas
intercambios
ratings
administración
Tailwind
shadcn/ui
Lucide React
```

---

## Nota antes de presentar

Los cambios visuales con Tailwind CSS, shadcn/ui y Lucide React están actualmente en la rama:

```text
feature/redesign-final
```

Antes de ejecutar la presentación:

```bash
git switch feature/redesign-final
git pull origin feature/redesign-final

cd frontend
npm install
npm run dev
```

::: 
