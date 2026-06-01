const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const { createRequest, listRequests } = require('../controllers/requests.controller')

const router = express.Router()

// Lista solicitudes del usuario autenticado.
router.get('/', authMiddleware, listRequests)

// Crea una solicitud nueva.
router.post('/', authMiddleware, createRequest)

module.exports = router
