const express = require('express')

const router = express.Router()

// Ruta temporal mientras construimos solicitudes reales.
router.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'Modulo requests listo para la fase 6',
  })
})

module.exports = router
