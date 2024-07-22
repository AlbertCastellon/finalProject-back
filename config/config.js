const mysql = require('mysql2');
/*const createPool = mysql2.createPool()

const pool = createPool({
  host: 'localhost',
  user: 'root',
  database: 'final_project',
  password: 'Programicion"24',
  port: 3306
});
*/
const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'final_project',
    password: 'Programicion"24',
    port: 3306
})


module.exports = dbConnection