const mysql = require('mysql2');

const db = mysql.createPool({
    user: 'root',
    host: 'localhost',
    database: 'contatos',
    password: '2006',
    port: 3306
})

module.exports = db;