const { pool } = require('../config/db')

const mapUserRow = (row) => ({
  id: row.id,
  username: row.username,
  email: row.email,
  password: row.password,
  role_id: row.role_id,
  role_name: row.role_name,
  is_blocked: Boolean(row.is_blocked),
  created_at: row.created_at,
  skills_count: row.skills_count !== undefined ? Number(row.skills_count) : undefined,
  requests_count: row.requests_count !== undefined ? Number(row.requests_count) : undefined,
})

// Busca un usuario por email para el login.
const findUserByEmail = async (email) => {
  const [rows] = await pool.execute(
    `SELECT u.id, u.username, u.email, u.password, u.role_id, r.name AS role_name, u.is_blocked, u.created_at
     FROM users u
     INNER JOIN roles r ON r.id = u.role_id
     WHERE email = ?
     LIMIT 1`,
    [email],
  )

  return rows[0] ? mapUserRow(rows[0]) : null
}

// Busca un usuario por username para evitar duplicados.
const findUserByUsername = async (username) => {
  const [rows] = await pool.execute(
    `SELECT u.id, u.username, u.email, u.password, u.role_id, r.name AS role_name, u.is_blocked, u.created_at
     FROM users u
     INNER JOIN roles r ON r.id = u.role_id
     WHERE username = ?
     LIMIT 1`,
    [username],
  )

  return rows[0] ? mapUserRow(rows[0]) : null
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
    `SELECT u.id, u.username, u.email, u.role_id, r.name AS role_name, u.is_blocked, u.created_at
     FROM users u
     INNER JOIN roles r ON r.id = u.role_id
     WHERE u.id = ?
     LIMIT 1`,
    [id],
  )

  return rows[0] ? mapUserRow(rows[0]) : null
}

const findUserForAuthById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT u.id, u.username, u.email, u.password, u.role_id, r.name AS role_name, u.is_blocked, u.created_at
     FROM users u
     INNER JOIN roles r ON r.id = u.role_id
     WHERE u.id = ?
     LIMIT 1`,
    [id],
  )

  return rows[0] ? mapUserRow(rows[0]) : null
}

const listUsers = async () => {
  const [rows] = await pool.execute(
    `SELECT u.id, u.username, u.email, u.role_id, r.name AS role_name, u.is_blocked, u.created_at,
            COUNT(DISTINCT s.id) AS skills_count,
            COUNT(DISTINCT req.id) AS requests_count
     FROM users u
     INNER JOIN roles r ON r.id = u.role_id
     LEFT JOIN skills s ON s.user_id = u.id
     LEFT JOIN requests req ON req.requester_id = u.id
     GROUP BY u.id, u.username, u.email, u.role_id, r.name, u.is_blocked, u.created_at
     ORDER BY u.created_at DESC, u.id DESC`,
  )

  return rows.map(mapUserRow)
}

const updateUserBlockedStatus = async ({ id, isBlocked }) => {
  await pool.execute(
    'UPDATE users SET is_blocked = ? WHERE id = ?',
    [isBlocked ? 1 : 0, id],
  )

  return findUserById(id)
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  findUserForAuthById,
  findUserByUsername,
  listUsers,
  updateUserBlockedStatus,
}
