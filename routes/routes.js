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
    dbConnection.connect(function(error) {
        if(error) {
            throw error
        }else {
            console.log('conexion lograda')
        }
    })
    let data

    dbConnection.query(
        'SELECT * FROM users',
        function (err, results, fields) {
          console.table(results); 
          data = results
        }
      );
    dbConnection.end()
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



module.exports = router