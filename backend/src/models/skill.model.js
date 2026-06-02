const { pool } = require('../config/db')

const mapSkillRow = (row) => ({
  id: row.id,
  user_id: row.user_id,
  title: row.title,
  description: row.description,
  category: row.category,
  level: row.level,
  format: row.format,
  average_rating: Number(row.average_rating || 0),
  ratings_count: Number(row.ratings_count || 0),
  created_at: row.created_at,
  username: row.username,
  email: row.email,
})

const findAllSkills = async () => {
  const [rows] = await pool.execute(
    `SELECT s.id, s.user_id, s.title, s.description, s.category, s.level, s.format, s.created_at,
            u.username, u.email,
            COALESCE(rs.average_rating, 0) AS average_rating,
            COALESCE(rs.ratings_count, 0) AS ratings_count
     FROM skills s
     INNER JOIN users u ON u.id = s.user_id
     LEFT JOIN (
       SELECT rated_to,
              ROUND(AVG(score), 1) AS average_rating,
              COUNT(*) AS ratings_count
       FROM ratings
       GROUP BY rated_to
     ) rs ON rs.rated_to = u.id
     ORDER BY s.created_at DESC, s.id DESC`,
  )

  return rows.map(mapSkillRow)
}

const findSkillById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT s.id, s.user_id, s.title, s.description, s.category, s.level, s.format, s.created_at,
            u.username, u.email,
            COALESCE(rs.average_rating, 0) AS average_rating,
            COALESCE(rs.ratings_count, 0) AS ratings_count
     FROM skills s
     INNER JOIN users u ON u.id = s.user_id
     LEFT JOIN (
       SELECT rated_to,
              ROUND(AVG(score), 1) AS average_rating,
              COUNT(*) AS ratings_count
       FROM ratings
       GROUP BY rated_to
     ) rs ON rs.rated_to = u.id
     WHERE s.id = ?
     LIMIT 1`,
    [id],
  )

  return rows[0] ? mapSkillRow(rows[0]) : null
}

const createSkill = async ({ userId, title, description, category, level, format }) => {
  const [result] = await pool.execute(
    `INSERT INTO skills (user_id, title, description, category, level, format)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, title, description || null, category, level, format],
  )

  return findSkillById(result.insertId)
}

const updateSkill = async ({ id, title, description, category, level, format }) => {
  await pool.execute(
    `UPDATE skills
     SET title = ?, description = ?, category = ?, level = ?, format = ?
     WHERE id = ?`,
    [title, description || null, category, level, format, id],
  )

  return findSkillById(id)
}

const deleteSkill = async (id) => {
  const [result] = await pool.execute('DELETE FROM skills WHERE id = ?', [id])
  return result.affectedRows > 0
}

module.exports = {
  createSkill,
  deleteSkill,
  findAllSkills,
  findSkillById,
  updateSkill,
}
