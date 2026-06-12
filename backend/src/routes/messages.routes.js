const express = require('express')
const { getMessages } = require('../controllers/messages.controller')
const authMiddleware = require('../middleware/auth.middleware')

const router = express.Router()

router.use(authMiddleware)
router.get('/:exchange_id', getMessages)

module.exports = router
