const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Weka password yako ya XAMPP kama ipo
  database: 'chuo_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Imeshindikana kuunganisha na Database:', err);
    return;
  }
  console.log('Imefaulu kuunganisha na hifadhidata ya chuo_db!');
  connection.release();
});

module.exports = pool.promise();
