const express = require('express')
const { register, login } = require('../controllers/auth.controller')

const router = express.Router()

// Registra un usuario nuevo.
router.post('/register', register)

// Inicia sesion y devuelve JWT.
router.post('/login', login)

module.exports = router
