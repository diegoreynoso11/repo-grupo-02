import { createPool } from 'mysql2'

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'product_master',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
})
export async function getConnection () {
  try {
    const connection = await pool.promise().getConnection()
    await connection.query('SET NAMES "utf8mb4"')
    connection.release()
    return { abort: false }
  } catch (err) {
    return { abort: true }
  }
}
export default pool.promise()
