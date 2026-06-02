const { pool } = require('../config/db')

const mapRequestRow = (row) => ({
  id: row.id,
  requester_id: row.requester_id,
  requester_username: row.requester_username,
  skill_id: row.skill_id,
  status: row.status,
  created_at: row.created_at,
  skill_title: row.skill_title,
  skill_owner: row.skill_owner,
  skill_owner_id: row.skill_owner_id,
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
            s.title AS skill_title, s.user_id AS skill_owner_id,
            owner.username AS skill_owner,
            requester.username AS requester_username
     FROM requests r
     INNER JOIN skills s ON s.id = r.skill_id
     INNER JOIN users owner ON owner.id = s.user_id
     INNER JOIN users requester ON requester.id = r.requester_id
     WHERE r.id = ?
     LIMIT 1`,
    [id],
  )

  return rows[0] ? mapRequestRow(rows[0]) : null
}

const findRequestsByRequesterId = async (requesterId) => {
  const [rows] = await pool.execute(
    `SELECT r.id, r.requester_id, r.skill_id, r.status, r.created_at,
            s.title AS skill_title, s.user_id AS skill_owner_id,
            owner.username AS skill_owner,
            requester.username AS requester_username
     FROM requests r
     INNER JOIN skills s ON s.id = r.skill_id
     INNER JOIN users owner ON owner.id = s.user_id
     INNER JOIN users requester ON requester.id = r.requester_id
     WHERE r.requester_id = ?
     ORDER BY r.created_at DESC, r.id DESC`,
    [requesterId],
  )

  return rows.map(mapRequestRow)
}

const findRequestsBySkillOwnerId = async (skillOwnerId) => {
  const [rows] = await pool.execute(
    `SELECT r.id, r.requester_id, r.skill_id, r.status, r.created_at,
            s.title AS skill_title, s.user_id AS skill_owner_id,
            owner.username AS skill_owner,
            requester.username AS requester_username
     FROM requests r
     INNER JOIN skills s ON s.id = r.skill_id
     INNER JOIN users owner ON owner.id = s.user_id
     INNER JOIN users requester ON requester.id = r.requester_id
     WHERE s.user_id = ?
     ORDER BY r.created_at DESC, r.id DESC`,
    [skillOwnerId],
  )

  return rows.map(mapRequestRow)
}

const findAllRequests = async () => {
  const [rows] = await pool.execute(
    `SELECT r.id, r.requester_id, r.skill_id, r.status, r.created_at,
            s.title AS skill_title, s.user_id AS skill_owner_id,
            owner.username AS skill_owner,
            requester.username AS requester_username
     FROM requests r
     INNER JOIN skills s ON s.id = r.skill_id
     INNER JOIN users owner ON owner.id = s.user_id
     INNER JOIN users requester ON requester.id = r.requester_id
     ORDER BY r.created_at DESC, r.id DESC`,
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

const findOpenRequestByRequesterAndSkill = async ({ requesterId, skillId }) => {
  const [rows] = await pool.execute(
    `SELECT id
     FROM requests
     WHERE requester_id = ? AND skill_id = ? AND status = 'open'
     LIMIT 1`,
    [requesterId, skillId],
  )

  return rows[0] ? findRequestById(rows[0].id) : null
}

const updateRequestStatus = async ({ id, status }) => {
  await pool.execute(
    'UPDATE requests SET status = ? WHERE id = ?',
    [status, id],
  )

  return findRequestById(id)
}

module.exports = {
  createRequest,
  findOpenRequestByRequesterAndSkill,
  findAllRequests,
  findRequestById,
  findRequestableSkillById,
  findRequestsByRequesterId,
  findRequestsBySkillOwnerId,
  updateRequestStatus,
}
