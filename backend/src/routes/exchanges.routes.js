const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const { listExchanges, updateExchangeStatus } = require('../controllers/exchanges.controller')

const router = express.Router()

router.get('/', authMiddleware, listExchanges)
router.patch('/:id/status', authMiddleware, updateExchangeStatus)

module.exports = router
