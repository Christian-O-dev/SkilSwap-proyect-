const { pool } = require('../config/db')

const mapRatingRow = (row) => ({
  id: row.id,
  exchange_id: row.exchange_id,
  rated_by: row.rated_by,
  rated_to: row.rated_to,
  score: row.score,
  comment: row.comment,
  created_at: row.created_at,
})

const createRating = async ({ exchangeId, ratedBy, ratedTo, score, comment }) => {
  const [result] = await pool.execute(
    `INSERT INTO ratings (exchange_id, rated_by, rated_to, score, comment)
     VALUES (?, ?, ?, ?, ?)`,
    [exchangeId, ratedBy, ratedTo, score, comment || null],
  )

  return findRatingById(result.insertId)
}

const findRatingById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT id, exchange_id, rated_by, rated_to, score, comment, created_at
     FROM ratings
     WHERE id = ?
     LIMIT 1`,
    [id],
  )

  return rows[0] ? mapRatingRow(rows[0]) : null
}

const findRatingByExchangeAndUser = async ({ exchangeId, ratedBy }) => {
  const [rows] = await pool.execute(
    `SELECT id, exchange_id, rated_by, rated_to, score, comment, created_at
     FROM ratings
     WHERE exchange_id = ? AND rated_by = ?
     LIMIT 1`,
    [exchangeId, ratedBy],
  )

  return rows[0] ? mapRatingRow(rows[0]) : null
}

module.exports = {
  createRating,
  findRatingByExchangeAndUser,
  findRatingById,
}
