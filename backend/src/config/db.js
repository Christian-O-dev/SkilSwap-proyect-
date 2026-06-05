const fs = require('fs')
const mysql = require('mysql2/promise')

function getSslConfig() {
  // En local DB_SSL no existe o es false, por lo que no usa SSL.
  if (process.env.DB_SSL !== 'true') {
    return undefined
  }

  // En producción utiliza el certificado CA si está configurado.
  if (process.env.DB_CA_PATH) {
    return {
      ca: fs.readFileSync(process.env.DB_CA_PATH, 'utf8'),
    }
  }

  // Permite probar Aiven con conexión cifrada sin certificado local.
  // Es útil para una demo, pero menos seguro que usar el certificado CA.
  return {
    rejectUnauthorized: false,
  }
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: getSslConfig(),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

const testDatabaseConnection = async () => {
  const connection = await pool.getConnection()
  connection.release()
}

module.exports = {
  pool,
  testDatabaseConnection,
}