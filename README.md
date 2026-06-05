# SkillSwap

SkillSwap es una plataforma web para intercambiar habilidades entre usuarios.
Incluye frontend en React, backend en Node.js + Express y base de datos MySQL.

## Requisitos

- Node.js instalado
- MySQL instalado y en ejecucion
- npm instalado
- Un editor como VS Code

## Estructura del proyecto

- `frontend/`: interfaz web
- `backend/`: API y logica del servidor
- `database/`: script SQL principal y migraciones historicas
- `docs/`: documentacion del proyecto

## Como levantar el proyecto

### 1. Importar la base de datos

1. Abre MySQL Workbench, phpMyAdmin o tu cliente MySQL favorito.
2. Crea o selecciona la base de datos donde quieras instalar el proyecto.
3. Importa el archivo `database/skillswap.sql`.

El archivo `database/skillswap.sql` ya agrupa el esquema y los seeds base en un unico script.
Las migraciones de `database/migrations/` quedan solo como historico y no hace falta ejecutarlas por separado.

En local, lo normal es usar una base llamada `skillswap_db`.

### 2. Configurar el backend

El backend usa el archivo `backend/.env`.

Valores actuales de desarrollo:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=skillswap_db
JWT_SECRET=skillswap_secret_dev
```

Si cambias la configuracion de MySQL o el nombre real de la base en tu hosting, ajusta esos valores.

### 3. Levantar el backend

Desde la carpeta `backend`:

```bash
npm install
npm run dev
```

El servidor queda disponible en:

```text
http://localhost:3000
```

### 4. Levantar el frontend

Desde la carpeta `frontend`:

```bash
npm install
npm run dev
```

El frontend de Vite normalmente queda en:

```text
http://localhost:5173
```

## Conexion entre frontend y backend

El frontend consume la API en:

```text
http://localhost:3000/api
```

Si quieres cambiar esa URL, crea o ajusta `frontend/.env` con:

```env
VITE_API_URL=http://localhost:3000/api
```

## Credenciales de prueba

Las cuentas de prueba deben estar cargadas en el seed de la base de datos.
Como el login usa `username` y `password`, entra con los datos que quedaron insertados en la tabla `users` dentro del script SQL.

Si quieres dejarlo mas claro al entregar el proyecto, puedes anotar aqui las credenciales exactas despues de importar el dump.

## Flujo de uso rapido

1. Importa la base de datos.
2. Inicia el backend.
3. Inicia el frontend.
4. Abre la web en el navegador.
5. Inicia sesion con una cuenta de prueba.
6. Prueba habilidades, solicitudes, intercambios y valoraciones.

## Comandos utiles

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

### Build del frontend

```bash
npm run build
```

## Resumen tecnico

- Frontend: React + Vite
- Backend: Node.js + Express
- Base de datos: MySQL
- Autenticacion: JWT
- Cliente HTTP: Axios
