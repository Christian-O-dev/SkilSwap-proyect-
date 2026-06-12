const { pool } = require('../config/db')

const createMessage = async ({ exchangeId, senderId, content }) => {
  const [result] = await pool.query(
    'INSERT INTO messages (exchange_id, sender_id, content) VALUES (?, ?, ?)',
    [exchangeId, senderId, content]
  )
  return result.insertId
}

const findMessagesByExchangeId = async (exchangeId) => {
  const [rows] = await pool.query(
    `SELECT m.id, m.exchange_id, m.sender_id, m.content, m.created_at, u.username as sender_username 
     FROM messages m 
     JOIN users u ON m.sender_id = u.id 
     WHERE m.exchange_id = ? 
     ORDER BY m.created_at ASC`,
    [exchangeId]
  )
  return rows
}

module.exports = {
  createMessage,
  findMessagesByExchangeId
}
