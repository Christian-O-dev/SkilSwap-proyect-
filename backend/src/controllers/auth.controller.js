const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
  createUser,
  findUserByEmail,
  findUserByUsername,
} = require('../models/user.model')

// Genera el token que usaremos en rutas privadas.
const createToken = (user) =>
  jwt.sign(
    {
      id: user.id,
      username: user.username,
      roleId: user.role_id,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  )

// Registra un usuario nuevo con password hasheada.
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({
        ok: false,
        message: 'Username, email y password son obligatorios',
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        ok: false,
        message: 'La password debe tener al menos 6 caracteres',
      })
    }

    const existingEmail = await findUserByEmail(email)
    if (existingEmail) {
      return res.status(409).json({
        ok: false,
        message: 'El email ya esta registrado',
      })
    }

    const existingUsername = await findUserByUsername(username)
    if (existingUsername) {
      return res.status(409).json({
        ok: false,
        message: 'El username ya esta registrado',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await createUser({
      username,
      email,
      password: hashedPassword,
    })

    const token = createToken(user)

    return res.status(201).json({
      ok: true,
      message: 'Usuario registrado correctamente',
      token,
      user,
    })
  } catch (error) {
    return next(error)
  }
}

// Valida credenciales y devuelve un token JWT.
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({
        ok: false,
        message: 'Username y password son obligatorios',
      })
    }

    const user = await findUserByUsername(username)
    if (!user) {
      return res.status(401).json({
        ok: false,
        message: 'Credenciales invalidas',
      })
    }

    if (user.is_blocked) {
      return res.status(403).json({
        ok: false,
        message: 'Tu cuenta esta bloqueada. Contacta con un administrador',
      })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({
        ok: false,
        message: 'Credenciales invalidas',
      })
    }

    const token = createToken(user)

    return res.json({
      ok: true,
      message: 'Login correcto',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role_id: user.role_id,
        created_at: user.created_at,
      },
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  login,
  register,
}
