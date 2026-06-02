const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const { createRating } = require('../controllers/ratings.controller')

const router = express.Router()

router.post('/', authMiddleware, createRating)

module.exports = router
