require('dotenv').config()

const app = require('./app')

const PORT = process.env.PORT || 3000

// Inicia el servidor con el puerto configurado.
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`)
})
