
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
