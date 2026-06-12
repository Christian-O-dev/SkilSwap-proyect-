require('dotenv').config();
const { pool } = require('./src/config/db');
async function fix() {
  try {
    await pool.query('ALTER TABLE skills MODIFY category VARCHAR(255) NOT NULL;');
    await pool.query('ALTER TABLE desired_skills MODIFY category VARCHAR(255) NOT NULL;');
    console.log('Fixed ENUM to VARCHAR');
  } catch (e) { console.error(e) } finally { pool.end() }
}
fix();
