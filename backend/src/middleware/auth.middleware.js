const jwt = require('jsonwebtoken')
const { findUserForAuthById } = require('../models/user.model')

// Verifica el Bearer token y guarda el usuario en req.
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      ok: false,
      message: 'Token no proporcionado',
    })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await findUserForAuthById(decoded.id)

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: 'Usuario no encontrado',
      })
    }

    if (user.is_blocked) {
      return res.status(403).json({
        ok: false,
        message: 'Tu cuenta esta bloqueada. Contacta con un administrador',
      })
    }

    req.user = user
    return next()
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: 'Token invalido o expirado',
    })
  }
}

module.exports = authMiddleware
