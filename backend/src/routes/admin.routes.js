const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const adminMiddleware = require('../middleware/admin.middleware')
const {
  deleteAdminSkill,
  listAdminRequests,
  listAdminSkills,
  listAdminUsers,
  toggleAdminUserBlock,
} = require('../controllers/admin.controller')

const router = express.Router()

router.use(authMiddleware, adminMiddleware)

router.get('/users', listAdminUsers)
router.patch('/users/:id/block', toggleAdminUserBlock)
router.get('/skills', listAdminSkills)
router.delete('/skills/:id', deleteAdminSkill)
router.get('/requests', listAdminRequests)

module.exports = router
