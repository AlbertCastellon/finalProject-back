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
        'SELECT nombre, primer_apellido, email, username FROM users',
        function (err, results) {
          data = results
          res.json(data)
        }
      );
    dbConnection.end()
    
 
})

router.post('/register', (req, res) => {
    console.log(req.body)
    dbConnection.connect(function(error) {
        if(error) {
            throw error
        }else {
            console.log('conexion lograda')
        }
    })
    dbConnection.query(
        `INSERT INTO users (nombre, primer_apellido, email, username, password) 
        VALUES('${req.body.nombre}', '${req.body.primer_apellido}', '${req.body.email}', '${req.body.username}', '${req.body.password}')`,
        function (err, results) {
            if (err) throw err;
            console.log("1 record inserted");
        }
      );
    dbConnection.end()
    res.redirect('/')
})

router.get('/api/admin/citas', (req, res) => {   
    dbConnection.connect(function(error) {
        if(error) {
            throw error
        }else {
            console.log('conexion lograda')
        }
    })
    let data
    dbConnection.query(
        'SELECT users.username, users.nombre, users.primer_apellido, citas.fecha_hora FROM users INNER JOIN citas ON users.id = citas.userId',
        function (err, results) {
            if (err) throw err;
            data = results
            res.json(data)
        }
      );
    dbConnection.end()
    
})


router.get('/api/cita/:username', (req, res) => {   
    dbConnection.connect(function(error) {
        if(error) {
            throw error
        }else {
            console.log('conexion lograda')
        }
    })
    const {username} = req.params
    let data
    dbConnection.query(
        `SELECT users.username, users.nombre, users.primer_apellido, citas.fecha_hora FROM users INNER JOIN citas ON users.id = citas.userId WHERE username = ${username}`,
        function (err, results) {
            if (err) throw err;
            data = results
            res.json(data)
        }
      );
    dbConnection.end()
    
})

router.get('/api/comentarios', (req, res) => {
    dbConnection.connect(function(error) {
        if(error) {
            throw error
        }else {
            console.log('conexion lograda')
        }
    })
    let data
    dbConnection.query(
        'SELECT comentarios.title, comentarios.coment, users.username FROM comentarios LEFT JOIN users ON comentarios.userId = users.id',
        function (err, results) {
            if (err) throw err;
            data = results
            res.json(data)
        }
      );
    dbConnection.end()
    
})

router.post('/comentarios', (req, res) => {
    console.log(req.body)
    dbConnection.connect(function(error) {
        if(error) {
            throw error
        }else {
            console.log('conexion lograda')
        }
    })
    dbConnection.query(
        `INSERT INTO comentarios (title, coment) 
        VALUES('${req.body.title}', '${req.body.coment}')`,
        function (err, results) {
            if (err) throw err;
            console.log("1 record inserted");
        }
      );
    dbConnection.end()
    res.redirect('/')
})


module.exports = router