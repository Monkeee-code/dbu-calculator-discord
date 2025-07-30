const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Rebs',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Run a simple test query on startup
(async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping(); // Checks if DB is responsive
    console.log('[DB] ✅ Connected to MySQL successfully!');
    connection.release();
  } catch (error) {
    console.error('[DB] ❌ Failed to connect to MySQL:', error.message);
  }
})();

module.exports = pool;