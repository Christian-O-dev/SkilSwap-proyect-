require('dotenv').config();
const { pool } = require('./src/config/db');
async function fix() {
  try {
    await pool.query('ALTER TABLE desired_skills DROP FOREIGN KEY fk_desired_user;');
    await pool.query('ALTER TABLE desired_skills DROP INDEX uq_user_category;');
    await pool.query('ALTER TABLE desired_skills ADD CONSTRAINT fk_desired_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;');
    console.log('Fixed');
  } catch (e) { console.error(e) } finally { pool.end() }
}
fix();
