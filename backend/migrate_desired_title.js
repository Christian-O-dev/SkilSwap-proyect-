require('dotenv').config();
const { pool } = require('./src/config/db');

async function migrate() {
  try {
    console.log('Migrating database to add title to desired_skills table...');
    
    // Check if constraint exists, if so drop it
    try {
      await pool.query('ALTER TABLE desired_skills DROP INDEX uq_user_category;');
      console.log('Dropped unique constraint uq_user_category');
    } catch (e) {
      console.log('Unique constraint uq_user_category does not exist or already dropped', e.message);
    }
    
    // Add title column
    try {
      await pool.query('ALTER TABLE desired_skills ADD COLUMN title VARCHAR(255) DEFAULT NULL AFTER category;');
      console.log('Added title column');
    } catch (e) {
      console.log('Column title might already exist', e.message);
    }

    console.log('Migration completed successfully.');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    pool.end();
  }
}

migrate();
