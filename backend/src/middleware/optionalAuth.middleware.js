const jwt = require('jsonwebtoken')
const { findUserForAuthById } = require('../models/user.model')

// Verifica el Bearer token sin bloquear si no existe o es inválido.
const optionalAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next()
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await findUserForAuthById(decoded.id)

    if (user && !user.is_blocked) {
      req.user = user
    }
  } catch (error) {
    // Si el token es inválido, simplemente ignoramos y continuamos como no autenticado
  }

  return next()
}

module.exports = optionalAuthMiddleware
