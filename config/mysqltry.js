const dbConnection = require('./config')

dbConnection.connect(function(error) {
    if(error) {
        throw error
    }else {
        console.log('conexion lograda')
    }
})

dbConnection.query(
    'SELECT * FROM users',
    function (err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );

dbConnection.end()