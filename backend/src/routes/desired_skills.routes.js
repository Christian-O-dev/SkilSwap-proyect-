const express = require('express')
const { getDesiredSkills, updateDesiredSkills } = require('../controllers/desired_skills.controller')
const requireAuth = require('../middleware/auth.middleware')

const router = express.Router()

// Todas las rutas de desired_skills requieren autenticación
router.use(requireAuth)

router.get('/', getDesiredSkills)
router.put('/', updateDesiredSkills)

module.exports = router
