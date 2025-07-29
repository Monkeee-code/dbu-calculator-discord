// db.js
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

console.log("Database connected successfully!");

module.exports = pool;