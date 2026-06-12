const { pool } = require('../config/db')

const findDesiredSkillsByUserId = async (userId) => {
  const [rows] = await pool.execute(
    'SELECT id, user_id, category, title, created_at FROM desired_skills WHERE user_id = ?',
    [userId]
  )
  return rows
}

const updateDesiredSkills = async (userId, skills) => {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    // Eliminar las que ya no están
    await connection.execute('DELETE FROM desired_skills WHERE user_id = ?', [userId])

    // Insertar las nuevas
    if (skills && skills.length > 0) {
      const placeholders = skills.map(() => '(?, ?, ?)').join(', ')
      const values = skills.flatMap(s => [userId, s.category, s.title || null])
      await connection.execute(
        `INSERT INTO desired_skills (user_id, category, title) VALUES ${placeholders}`,
        values
      )
    }

    await connection.commit()
    return findDesiredSkillsByUserId(userId)
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}

module.exports = {
  findDesiredSkillsByUserId,
  updateDesiredSkills
}
