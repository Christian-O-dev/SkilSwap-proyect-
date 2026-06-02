// Permite acceso solo a usuarios administradores.
const adminMiddleware = (req, res, next) => {
  if (req.user?.role_id !== 1) {
    return res.status(403).json({
      ok: false,
      message: 'Acceso solo para administradores',
    })
  }

  return next()
}

module.exports = adminMiddleware
