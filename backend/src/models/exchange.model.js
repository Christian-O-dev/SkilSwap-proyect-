const { pool } = require('../config/db')

const mapExchangeRow = (row) => ({
  id: row.id,
  request_id: row.request_id,
  agreed_at: row.agreed_at,
  status: row.status,
  skill_id: row.skill_id,
  skill_title: row.skill_title,
  skill_owner: row.skill_owner,
  skill_owner_id: row.skill_owner_id,
  requester_id: row.requester_id,
  requester_username: row.requester_username,
  request_status: row.request_status,
})

const findExchangeById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT e.id, e.request_id, e.agreed_at, e.status,
            r.status AS request_status, r.requester_id,
            s.id AS skill_id, s.title AS skill_title, s.user_id AS skill_owner_id,
            owner.username AS skill_owner,
            requester.username AS requester_username
     FROM exchanges e
     INNER JOIN requests r ON r.id = e.request_id
     INNER JOIN skills s ON s.id = r.skill_id
     INNER JOIN users owner ON owner.id = s.user_id
     INNER JOIN users requester ON requester.id = r.requester_id
     WHERE e.id = ?
     LIMIT 1`,
    [id],
  )

  return rows[0] ? mapExchangeRow(rows[0]) : null
}

const findExchangeByRequestId = async (requestId) => {
  const [rows] = await pool.execute(
    'SELECT id FROM exchanges WHERE request_id = ? LIMIT 1',
    [requestId],
  )

  return rows[0] ? findExchangeById(rows[0].id) : null
}

const createExchange = async ({ requestId }) => {
  const [result] = await pool.execute(
    `INSERT INTO exchanges (request_id, agreed_at, status)
     VALUES (?, CURRENT_TIMESTAMP, 'pending')`,
    [requestId],
  )

  return findExchangeById(result.insertId)
}

const findExchangesByUserId = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT e.id, e.request_id, e.agreed_at, e.status,
            r.status AS request_status, r.requester_id,
            s.id AS skill_id, s.title AS skill_title, s.user_id AS skill_owner_id,
            owner.username AS skill_owner,
            requester.username AS requester_username
     FROM exchanges e
     INNER JOIN requests r ON r.id = e.request_id
     INNER JOIN skills s ON s.id = r.skill_id
     INNER JOIN users owner ON owner.id = s.user_id
     INNER JOIN users requester ON requester.id = r.requester_id
     WHERE s.user_id = ? OR r.requester_id = ?
     ORDER BY e.agreed_at DESC, e.id DESC`,
    [userId, userId],
  )

  return rows.map(mapExchangeRow)
}

const updateExchangeStatus = async ({ id, status }) => {
  await pool.execute(
    'UPDATE exchanges SET status = ? WHERE id = ?',
    [status, id],
  )

  return findExchangeById(id)
}

module.exports = {
  createExchange,
  findExchangeById,
  findExchangeByRequestId,
  findExchangesByUserId,
  updateExchangeStatus,
}
