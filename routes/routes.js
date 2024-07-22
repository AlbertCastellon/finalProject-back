const express = require('express');
const router = express.Router()
require('dotenv').config()
const dbConnection = require('../config/config')

dbConnection.connect(function(error) {
    if(error) {
        throw error
    }else {
        console.log('conexion lograda')
    }
})

router.get('/', (req, res) => {
    res.send('<h1>hola</h1>')
})

router.get('/api/usuarios', (req, res) => {
    let data
    dbConnection.query(
        'SELECT * FROM users',
        function (err, results, fields) {
          console.log(results); // results contains rows returned by server
          console.log(fields); // fields contains extra meta data about results, if available
        }
      );
    res.json(data)
})

router.post('/register', (req, res) => {
    
})

router.get('/api/admin/citas', (req, res) => {   
    
})

router.get('/api/admin/citas', (req, res) => {   
    
})

router.get('/api/cita/:username', (req, res) => {   
    
})

router.get('/api/comentarios', (req, res) => {

})

dbConnection.end()

module.exports = router