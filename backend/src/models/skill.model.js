const { pool } = require('../config/db')

const mapSkillRow = (row) => ({
  id: row.id,
  user_id: row.user_id,
  title: row.title,
  description: row.description,
  created_at: row.created_at,
  username: row.username,
  email: row.email,
})

const findAllSkills = async () => {
  const [rows] = await pool.execute(
    `SELECT s.id, s.user_id, s.title, s.description, s.created_at,
            u.username, u.email
     FROM skills s
     INNER JOIN users u ON u.id = s.user_id
     ORDER BY s.created_at DESC, s.id DESC`,
  )

  return rows.map(mapSkillRow)
}

const findSkillById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT s.id, s.user_id, s.title, s.description, s.created_at,
            u.username, u.email
     FROM skills s
     INNER JOIN users u ON u.id = s.user_id
     WHERE s.id = ?
     LIMIT 1`,
    [id],
  )

  return rows[0] ? mapSkillRow(rows[0]) : null
}

const createSkill = async ({ userId, title, description }) => {
  const [result] = await pool.execute(
    `INSERT INTO skills (user_id, title, description)
     VALUES (?, ?, ?)`,
    [userId, title, description || null],
  )

  return findSkillById(result.insertId)
}

module.exports = {
  createSkill,
  findAllSkills,
  findSkillById,
}
