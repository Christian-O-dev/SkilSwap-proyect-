const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const optionalAuthMiddleware = require('../middleware/optionalAuth.middleware')
const {
  createSkill,
  deleteSkill,
  getSkill,
  listSkills,
  updateSkill,
} = require('../controllers/skills.controller')

const router = express.Router()

// Lista habilidades publicadas.
router.get('/', optionalAuthMiddleware, listSkills)

// Devuelve una habilidad concreta.
router.get('/:id', getSkill)

// Crea una habilidad nueva.
router.post('/', authMiddleware, createSkill)

// Edita una habilidad propia.
router.put('/:id', authMiddleware, updateSkill)

// Elimina una habilidad propia.
router.delete('/:id', authMiddleware, deleteSkill)

module.exports = router
