const { findUserById } = require('../models/user.model')

// Devuelve los datos del usuario autenticado.
const getCurrentUser = async (req, res, next) => {
  try {
    const user = await findUserById(req.user.id)

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'Usuario no encontrado',
      })
    }

    return res.json({
      ok: true,
      user,
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getCurrentUser,
}
