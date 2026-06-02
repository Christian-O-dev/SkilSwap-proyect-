# ROADMAP.md

# Roadmap de SkillSwap

Este documento define el plan de trabajo del proyecto. Las fases funcionales principales ya se consideran terminadas o definidas. El objetivo actual es preparar la **última fase para la entrega definitiva**, centrada en mejorar la presentación visual del frontend.

---

## 1. Objetivo general

Construir **SkillSwap**, una plataforma web de trueque de habilidades técnicas donde los usuarios puedan registrarse, iniciar sesión, publicar habilidades, solicitar intercambios, aceptar solicitudes, completar intercambios y valorar a otros usuarios.

---

## 2. Estado actual

Las fases principales del proyecto ya están planteadas como terminadas o cerradas a nivel funcional.

No se debe reabrir todo el roadmap ni volver a planificar el proyecto desde cero.

La tarea actual es añadir en la **última fase de entrega definitiva** las tecnologías visuales:

```text
Tailwind CSS
shadcn/ui
Lucide React
```

---

## 3. Stack base del proyecto

```text
Frontend: React + Vite
Backend: Node.js + Express
Base de datos: MySQL
Autenticación: JWT
Contraseñas: bcrypt
Peticiones HTTP: Axios
Rutas frontend: React Router DOM
```

---

## 4. Stack visual de la última fase

```text
Estilos: Tailwind CSS
Componentes UI: shadcn/ui
Iconos: Lucide React
```

Estas tecnologías se agregan para mejorar el diseño, no para cambiar la lógica del proyecto.

---

## 5. Flujo final esperado

```text
Registro → Login → Crear habilidad → Ver habilidades → Solicitar intercambio → Aceptar solicitud → Completar intercambio → Valorar usuario
```

---

## 6. Última fase - Mejora visual para entrega definitiva

Objetivo:

Mejorar el frontend ya existente usando Tailwind CSS, shadcn/ui y Lucide React para que la aplicación se vea más profesional en la entrega definitiva.

Esta fase no debe romper:

- Login.
- Registro.
- Rutas protegidas.
- Conexión con backend.
- Servicios Axios.
- CRUD de habilidades.
- Solicitudes.
- Intercambios.
- Valoraciones.

---

## 7. Pasos para instalar Tailwind CSS, shadcn/ui y Lucide React

Todos los comandos se ejecutan dentro de `frontend`.

```bash
cd frontend
```

### Paso 1 - Instalar Tailwind CSS con Vite

```bash
npm install tailwindcss @tailwindcss/vite
```

### Paso 2 - Instalar tipos de Node

Esto es necesario si se usará `path` para configurar el alias `@` en `vite.config.js`.

```bash
npm install -D @types/node
```

### Paso 3 - Configurar `vite.config.js`

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

### Paso 4 - Configurar `src/index.css`

Actualizar `frontend/src/index.css`:

```css
@import "tailwindcss";
```

Si ya existen estilos propios, mantenerlos debajo de este import si no rompen el diseño.

### Paso 5 - Crear o revisar `jsconfig.json`

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

### Paso 6 - Inicializar shadcn/ui

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

### Paso 7 - Añadir componentes base de shadcn/ui

```bash
npx shadcn@latest add button card input label textarea badge dialog dropdown-menu select avatar separator skeleton alert
```

Componentes que se usarán:

- `Button`
- `Card`
- `Input`
- `Label`
- `Textarea`
- `Badge`
- `Dialog`
- `DropdownMenu`
- `Select`
- `Avatar`
- `Separator`
- `Skeleton`
- `Alert`

### Paso 8 - Instalar Lucide React

```bash
npm install lucide-react
```

Iconos sugeridos:

```text
Home
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
```

### Paso 9 - Probar que el frontend sigue funcionando

```bash
npm run dev
```

Comprobar:

```text
http://localhost:5173
```

---

## 8. Orden recomendado para aplicar la mejora visual

## 8.1 Navbar

Tareas:

- [ ] Mejorar el Navbar con Tailwind CSS.
- [ ] Usar componentes de shadcn/ui si encaja.
- [ ] Añadir iconos de Lucide React.
- [ ] Mantener la lógica de login/logout.
- [ ] Mantener las rutas existentes.

Iconos sugeridos:

```text
Home
BookOpen
Handshake
RefreshCcw
User
LogOut
```

---

## 8.2 Páginas de autenticación

Tareas:

- [ ] Mejorar `LoginPage`.
- [ ] Mejorar `RegisterPage`.
- [ ] Usar `Card`, `Input`, `Label`, `Button` y `Alert`.
- [ ] Mantener la lógica actual.
- [ ] No cambiar endpoints.

---

## 8.3 Página de habilidades

Tareas:

- [ ] Mejorar listado de habilidades.
- [ ] Mejorar tarjetas con `Card` y `Badge`.
- [ ] Mejorar formulario con `Input`, `Textarea`, `Label` y `Button`.
- [ ] Añadir iconos `BookOpen`, `Plus`, `Search`, `Pencil`, `Trash2`.
- [ ] Mantener CRUD actual.

---

## 8.4 Página de solicitudes

Tareas:

- [ ] Mejorar vista de solicitudes.
- [ ] Usar `Badge` para estados.
- [ ] Usar `Button` para aceptar o rechazar.
- [ ] Añadir iconos `Handshake`, `Check`, `X` si se necesitan.
- [ ] Mantener lógica actual.

---

## 8.5 Página de intercambios

Tareas:

- [ ] Mejorar vista de intercambios.
- [ ] Usar tarjetas o tabla simple.
- [ ] Añadir estados visuales.
- [ ] Usar icono `RefreshCcw`.
- [ ] Mantener la lógica de completar intercambio.

---

## 8.6 Página de valoraciones y perfil

Tareas:

- [ ] Mejorar vista de perfil.
- [ ] Mostrar valoraciones con icono `Star`.
- [ ] Usar `Card`, `Badge` y `Avatar` si aplica.
- [ ] Mantener lógica actual.

---

## 9. Checklist de la última fase

- [ ] Tailwind CSS instalado.
- [ ] Tailwind configurado en Vite.
- [ ] `src/index.css` actualizado.
- [ ] Alias `@` configurado.
- [ ] shadcn/ui inicializado.
- [ ] Componentes base de shadcn/ui añadidos.
- [ ] Lucide React instalado.
- [ ] Navbar mejorado.
- [ ] Login y registro mejorados visualmente.
- [ ] Tarjetas de habilidades mejoradas.
- [ ] Formularios mejorados.
- [ ] Solicitudes mejoradas visualmente.
- [ ] Intercambios mejorados visualmente.
- [ ] Valoraciones/perfil mejorados visualmente.
- [ ] Responsive revisado.
- [ ] Login sigue funcionando.
- [ ] Backend sigue funcionando.
- [ ] Axios sigue funcionando.
- [ ] No hay errores de importación.
- [ ] No hay rutas rotas.
- [ ] Demo final revisada.

---

## 10. Guion de demo de entrega definitiva

1. Explicar qué es SkillSwap.
2. Explicar que el proyecto usa React + Vite, Node.js + Express y MySQL.
3. Explicar que la última fase visual usa Tailwind CSS, shadcn/ui y Lucide React.
4. Enseñar registro.
5. Enseñar login.
6. Crear una habilidad.
7. Ver listado de habilidades.
8. Solicitar intercambio.
9. Aceptar solicitud.
10. Completar intercambio.
11. Valorar usuario.
12. Enseñar base de datos.
13. Enseñar mejoras visuales: componentes, iconos y responsive.

---

## 11. Regla principal

```text
No rehacer fases terminadas. Solo mejorar la última fase visual.
```

La entrega definitiva debe mantener la funcionalidad existente y mejorar la presentación con Tailwind CSS, shadcn/ui y Lucide React.
