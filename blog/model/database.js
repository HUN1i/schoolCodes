const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '1234', // ORM 사용 XXX
  database: 'blog',
});

module.exports = pool;
