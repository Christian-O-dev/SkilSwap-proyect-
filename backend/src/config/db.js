const mysql = require('mysql2/promise')

// Crea un pool reutilizable para las consultas MySQL.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Prueba la conexion para detectar errores de acceso.
const testDatabaseConnection = async () => {
  const connection = await pool.getConnection()
  connection.release()
}

module.exports = {
  pool,
  testDatabaseConnection,
}
