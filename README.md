# SkillSwap

**SkillSwap** es una plataforma web para facilitar el intercambio de habilidades técnicas entre usuarios sin transacciones monetarias. 

Incluye un frontend en **React (Vite)**, un backend en **Node.js + Express** y una base de datos relacional **MySQL**.

---

## 🛠 Requisitos Previos

Para ejecutar este proyecto en tu PC local, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v16 o superior)
- [MySQL](https://dev.mysql.com/downloads/) (Servidor y Workbench/phpMyAdmin)
- [Git](https://git-scm.com/) (opcional, si clonas el repositorio)
- Un editor de código como [Visual Studio Code](https://code.visualstudio.com/)

---

## 📂 Estructura del Proyecto

- `frontend/`: Aplicación cliente (React, Tailwind CSS, shadcn/ui).
- `backend/`: API REST y lógica del servidor (Node.js, Express, JWT).
- `database/`: Script SQL principal con el esquema y datos de prueba.
- `MEMORIA_TECNICA.md`: Documentación de la arquitectura y diseño del proyecto.

---

## 🚀 Guía de Instalación Paso a Paso

### Paso 1: Configurar la Base de Datos

1. Abre tu gestor de MySQL (ej. MySQL Workbench o XAMPP/phpMyAdmin).
2. Crea una nueva base de datos llamada `skillswap_db`:
   ```sql
   CREATE DATABASE skillswap_db;
   ```
3. Importa el archivo `database/skillswap.sql` dentro de esa base de datos.
   *Este archivo ya incluye todas las tablas necesarias y datos de prueba (usuarios, habilidades, etc).*

### Paso 2: Configurar y levantar el Backend

1. Abre una terminal y navega a la carpeta del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea tu archivo de entorno a partir del ejemplo:
   - Duplica el archivo `.env.example` y renómbralo a `.env`.
   - Edita el archivo `.env` y asegúrate de que coincida con tus credenciales locales de MySQL:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=tu_contraseña_aqui
   DB_NAME=skillswap_db
   JWT_SECRET=skillswap_secret_dev
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   *El backend estará escuchando en `http://localhost:3000`*.

### Paso 3: Configurar y levantar el Frontend

1. Abre una **nueva** terminal y navega a la carpeta del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea tu archivo de entorno a partir del ejemplo:
   - Duplica el archivo `.env.example` y renómbralo a `.env`.
   - Verifica que el contenido apunte al backend local:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
4. Inicia el entorno de desarrollo:
   ```bash
   npm run dev
   ```
   *El frontend estará disponible en `http://localhost:5173`*.

---

## 🧪 Cómo probar la aplicación

1. Entra a `http://localhost:5173` en tu navegador.
2. Haz clic en **Login** (esquina superior derecha).
3. Utiliza alguna de las cuentas de prueba importadas con la base de datos (por ejemplo, el usuario admin o los de prueba generados). Si no recuerdas ninguno, puedes simplemente ir a **Registro** y crear uno nuevo en segundos.
4. Una vez dentro, prueba a publicar una habilidad desde el botón **+ Publicar**, solicita un intercambio a otro usuario o navega por tu perfil.

---

## 🖥 Comandos Útiles

**Backend:**
- `npm run dev` → Inicia el servidor con recarga automática (Nodemon).
- `npm start` → Inicia el servidor en modo producción.

**Frontend:**
- `npm run dev` → Inicia Vite en modo desarrollo.
- `npm run build` → Compila el frontend para producción (genera la carpeta `dist`).
- `npm run preview` → Previsualiza la build de producción en local.

---

## ⚙️ Tecnologías Clave

- **Frontend:** React, Vite, Tailwind CSS, shadcn/ui, Lucide React, Axios.
- **Backend:** Node.js, Express, mysql2, bcrypt (para contraseñas), jsonwebtoken (JWT).
- **Base de Datos:** MySQL.
