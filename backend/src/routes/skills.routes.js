const express = require('express')

const router = express.Router()

// Ruta temporal mientras construimos el CRUD de habilidades.
router.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'Modulo skills listo para la fase 5',
  })
})

module.exports = router
