const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/auth.routes')
const usersRoutes = require('./routes/users.routes')
const skillsRoutes = require('./routes/skills.routes')
const requestsRoutes = require('./routes/requests.routes')

const app = express()

// Activa CORS para permitir peticiones desde el frontend.
app.use(cors())

// Permite leer JSON en las peticiones.
app.use(express.json())

// Ruta simple para comprobar que la API responde.
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    message: 'SkillSwap backend funcionando',
  })
})

// Conecta las rutas principales de la API.
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/skills', skillsRoutes)
app.use('/api/requests', requestsRoutes)

// Manejo basico de errores del servidor.
app.use((error, req, res, next) => {
  console.error(error)

  res.status(500).json({
    ok: false,
    message: 'Error interno del servidor',
  })
})

// Manejo basico cuando una ruta no existe.
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: 'Ruta no encontrada',
  })
})

module.exports = app
