const { pool } = require('../config/db')

const mapRequestRow = (row) => ({
  id: row.id,
  requester_id: row.requester_id,
  skill_id: row.skill_id,
  status: row.status,
  created_at: row.created_at,
  skill_title: row.skill_title,
  skill_owner: row.skill_owner,
})

const createRequest = async ({ requesterId, skillId }) => {
  const [result] = await pool.execute(
    `INSERT INTO requests (requester_id, skill_id, status)
     VALUES (?, ?, 'open')`,
    [requesterId, skillId],
  )

  return findRequestById(result.insertId)
}

const findRequestById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT r.id, r.requester_id, r.skill_id, r.status, r.created_at,
            s.title AS skill_title,
            u.username AS skill_owner
     FROM requests r
     INNER JOIN skills s ON s.id = r.skill_id
     INNER JOIN users u ON u.id = s.user_id
     WHERE r.id = ?
     LIMIT 1`,
    [id],
  )

  return rows[0] ? mapRequestRow(rows[0]) : null
}

const findRequestsByRequesterId = async (requesterId) => {
  const [rows] = await pool.execute(
    `SELECT r.id, r.requester_id, r.skill_id, r.status, r.created_at,
            s.title AS skill_title,
            u.username AS skill_owner
     FROM requests r
     INNER JOIN skills s ON s.id = r.skill_id
     INNER JOIN users u ON u.id = s.user_id
     WHERE r.requester_id = ?
     ORDER BY r.created_at DESC, r.id DESC`,
    [requesterId],
  )

  return rows.map(mapRequestRow)
}

const findRequestableSkillById = async (skillId) => {
  const [rows] = await pool.execute(
    `SELECT s.id, s.user_id, s.title, s.description, s.created_at,
            u.username, u.email
     FROM skills s
     INNER JOIN users u ON u.id = s.user_id
     WHERE s.id = ?
     LIMIT 1`,
    [skillId],
  )

  return rows[0] || null
}

module.exports = {
  createRequest,
  findRequestById,
  findRequestableSkillById,
  findRequestsByRequesterId,
}
