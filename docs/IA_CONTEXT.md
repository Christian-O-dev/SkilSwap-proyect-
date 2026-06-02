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

Flujo principal:

```text
Registro → Login → Crear habilidad → Ver habilidades → Solicitar intercambio → Aceptar solicitud → Completar intercambio → Valorar usuario
```

---

## 3. Estado actual del proyecto

Las fases funcionales principales ya se consideran terminadas o definidas. La IA no debe replanificar todo el proyecto desde cero.

El objetivo actual es trabajar en la **última fase de entrega definitiva**, centrada en mejorar la presentación visual del frontend agregando:

```text
Tailwind CSS
shadcn/ui
Lucide React
```

Estas tecnologías deben añadirse como mejora visual, no como excusa para rehacer la arquitectura, cambiar el backend o modificar el modelo de datos sin necesidad.

---

## 4. Stack base del proyecto

La IA debe respetar este stack base salvo instrucción explícita del usuario.

```text
Frontend: React + Vite
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

## 5. Stack visual para la última fase

En la última fase de entrega definitiva se añadirá:

```text
Tailwind CSS
shadcn/ui
Lucide React
```

Uso de cada tecnología:

- **Tailwind CSS:** estilos, layout, responsive, espaciado, colores, bordes, sombras y estados visuales.
- **shadcn/ui:** componentes reutilizables como botones, inputs, tarjetas, diálogos, badges, alerts y skeletons.
- **Lucide React:** iconos claros para navegación, acciones y estados.

La IA debe usar estas tecnologías solo para mejorar la interfaz existente.

---

## 6. Decisiones que NO debe cambiar la IA

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

Tampoco debe:

- Rehacer todo el frontend si no hace falta.
- Rehacer todo el backend.
- Cambiar rutas de API sin necesidad.
- Cambiar el modelo de datos sin pedir confirmación.
- Añadir dependencias innecesarias.

---

## 7. Prioridad de la última fase

La IA debe priorizar:

1. Instalar Tailwind CSS en el frontend.
2. Configurar Tailwind en Vite.
3. Configurar alias `@`.
4. Inicializar shadcn/ui.
5. Añadir componentes base de shadcn/ui.
6. Instalar Lucide React.
7. Mejorar el Navbar.
8. Mejorar tarjetas de habilidades.
9. Mejorar formularios.
10. Mejorar páginas de solicitudes, intercambios, valoraciones y perfil si existen.
11. Añadir iconos con Lucide React.
12. Revisar responsive.
13. Revisar la demo final.

---

## 8. Instalación del stack visual

Todos los comandos se ejecutan dentro de `frontend`.

```bash
cd frontend
```

Instalar Tailwind CSS con Vite:

```bash
npm install tailwindcss @tailwindcss/vite
```

Instalar tipos de Node si se configura alias con `path`:

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

## 9. Configuración esperada

## `vite.config.js`

Debe incluir Tailwind y alias `@`:

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

## `src/index.css`

Debe incluir:

```css
@import "tailwindcss";
```

## `jsconfig.json`

Debe incluir alias `@`:

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

## shadcn/ui

La configuración esperada es:

```text
Components: src/components/ui
Utils: src/lib/utils.js
CSS file: src/index.css
```

---

## 10. Componentes visuales recomendados

Usar shadcn/ui para:

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

Usar Lucide React para:

- `Home`
- `Search`
- `Plus`
- `User`
- `LogOut`
- `BookOpen`
- `Handshake`
- `RefreshCcw`
- `Star`
- `Pencil`
- `Trash2`
- `Settings`

---

## 11. Modelo relacional resumido

Entidades del proyecto:

```text
roles
users
skills
requests
exchanges
ratings
```

---

## 12. Reglas de negocio obligatorias

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

## 13. Endpoints principales

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

## 14. Prompts útiles para Codex en esta última fase

## Instalar stack visual

```text
Configura Tailwind CSS, shadcn/ui y Lucide React en el frontend React + Vite sin cambiar la arquitectura del proyecto. Usa alias @ hacia src, configura vite.config.js, jsconfig.json, src/index.css y añade componentes base de shadcn/ui.
```

## Mejorar Navbar

```text
Mejora el Navbar existente usando Tailwind CSS, shadcn/ui y Lucide React. No cambies la lógica de autenticación ni las rutas existentes.
```

## Mejorar tarjetas de habilidades

```text
Mejora las tarjetas de habilidades usando Card, Badge y Button de shadcn/ui, Tailwind CSS para responsive e iconos de Lucide React. No cambies la API ni el modelo de datos.
```

## Mejorar formularios

```text
Mejora los formularios existentes usando Input, Label, Textarea, Button y Alert de shadcn/ui. Mantén la lógica actual y solo mejora diseño, accesibilidad y mensajes visuales.
```

---

## 15. Criterios de aceptación de la última fase

La mejora visual se considera terminada si:

- Tailwind CSS funciona.
- shadcn/ui está configurado.
- Lucide React está instalado y usado.
- El Navbar se ve presentable.
- Las tarjetas de habilidades se ven claras.
- Los formularios se ven ordenados.
- Las páginas principales son responsive.
- No se rompe el login.
- No se rompe la conexión con backend.
- No se rompen las rutas existentes.
- El proyecto sigue arrancando con `npm run dev`.

---

## 16. Regla principal para la IA

```text
No rehacer el proyecto. Solo mejorar la última fase visual.
```

La prioridad actual es pulir el frontend para la entrega definitiva usando Tailwind CSS, shadcn/ui y Lucide React.
