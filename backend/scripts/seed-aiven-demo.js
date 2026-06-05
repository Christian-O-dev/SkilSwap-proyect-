const fs = require('fs')
const path = require('path')
const mysql = require('mysql2/promise')

const requiredEnv = ['AIVEN_DB_HOST', 'AIVEN_DB_PORT', 'AIVEN_DB_USER', 'AIVEN_DB_PASSWORD', 'AIVEN_DB_NAME']

const missingEnv = requiredEnv.filter((name) => !process.env[name])
if (missingEnv.length > 0) {
  console.error(`Faltan variables de entorno: ${missingEnv.join(', ')}`)
  process.exit(1)
}

const seedPath = path.resolve(__dirname, '../../database/seed-aiven-demo.sql')

const run = async () => {
  const sql = fs.readFileSync(seedPath, 'utf8')

  const connection = await mysql.createConnection({
    host: process.env.AIVEN_DB_HOST,
    port: Number(process.env.AIVEN_DB_PORT),
    user: process.env.AIVEN_DB_USER,
    password: process.env.AIVEN_DB_PASSWORD,
    database: process.env.AIVEN_DB_NAME,
    multipleStatements: true,
    ssl: {
      rejectUnauthorized: false,
    },
  })

  try {
    await connection.query(sql)
    console.log('Seed de Aiven cargado correctamente.')
  } finally {
    await connection.end()
  }
}

run().catch((error) => {
  console.error('No se pudo cargar el seed de Aiven:')
  console.error(error.message)
  process.exit(1)
})
