const { pool } = require('../config/db')

// Busca un usuario por email para el login.
const findUserByEmail = async (email) => {
  const [rows] = await pool.execute(
    `SELECT id, username, email, password, role_id, created_at
     FROM users
     WHERE email = ?
     LIMIT 1`,
    [email],
  )

  return rows[0] || null
}

// Busca un usuario por username para evitar duplicados.
const findUserByUsername = async (username) => {
  const [rows] = await pool.execute(
    `SELECT id, username, email, password, role_id, created_at
     FROM users
     WHERE username = ?
     LIMIT 1`,
    [username],
  )

  return rows[0] || null
}

// Crea un usuario nuevo usando el rol por defecto.
const createUser = async ({ username, email, password }) => {
  const [result] = await pool.execute(
    `INSERT INTO users (username, email, password)
     VALUES (?, ?, ?)`,
    [username, email, password],
  )

  return findUserById(result.insertId)
}

// Busca un usuario por id sin devolver campos sensibles extra.
const findUserById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT id, username, email, role_id, created_at
     FROM users
     WHERE id = ?
     LIMIT 1`,
    [id],
  )

  return rows[0] || null
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByUsername,
}
