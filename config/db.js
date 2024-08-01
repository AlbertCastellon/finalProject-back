const mysql = require('mysql2/promise');
require('dotenv').config({ path: './local.env' }); // Asegúrate de usar la ruta correcta

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST, // Cambiado de 'localhost' a 'process.env.MYSQL_HOST'
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT || 3306, // Asegúrate de que se use el puerto del archivo de configuración
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
