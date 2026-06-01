const express = require('express')
const { getCurrentUser } = require('../controllers/users.controller')
const authMiddleware = require('../middleware/auth.middleware')

const router = express.Router()

// Devuelve el usuario autenticado.
router.get('/me', authMiddleware, getCurrentUser)

module.exports = router
