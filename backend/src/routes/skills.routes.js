const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const { createSkill, getSkill, listSkills } = require('../controllers/skills.controller')

const router = express.Router()

// Lista habilidades publicadas.
router.get('/', listSkills)

// Devuelve una habilidad concreta.
router.get('/:id', getSkill)

// Crea una habilidad nueva.
router.post('/', authMiddleware, createSkill)

module.exports = router
