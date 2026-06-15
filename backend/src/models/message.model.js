const { pool } = require('../config/db')

const createMessage = async ({ requestId, senderId, content }) => {
  const [result] = await pool.query(
    'INSERT INTO messages (request_id, sender_id, content) VALUES (?, ?, ?)',
    [requestId, senderId, content]
  )
  return result.insertId
}

const findMessagesByRequestId = async (requestId) => {
  const [rows] = await pool.query(
    `SELECT m.id, m.request_id, m.sender_id, m.content, m.created_at, u.username as sender_username 
     FROM messages m 
     JOIN users u ON m.sender_id = u.id 
     WHERE m.request_id = ? 
     ORDER BY m.created_at ASC`,
    [requestId]
  )
  return rows
}

module.exports = {
  createMessage,
  findMessagesByRequestId
}
