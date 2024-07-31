const express = require('express');
const router = express.Router()
require('dotenv').config()
const bcrypt = require('bcrypt');
const dbConnection = require('../config/config')
const {hashPassword, comparePassword} = require('../helpers/bcryptHelpers')
const jwt = require('jsonwebtoken');

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

router.post('/register', async (req, res) => {
    dbConnection.connect(function(error) {
        if(error) {
            throw error
        }else {
            console.log('conexion lograda')
        }
    })

    const hashedPassword = await hashPassword(req.body.password)
    dbConnection.query(
        `INSERT INTO users (nombre, primer_apellido, email, username, password) 
        VALUES('${req.body.nombre}', '${req.body.primer_apellido}', '${req.body.email}', '${req.body.username}', '${hashedPassword}')`,
        function (err, results) {
            if (err) throw err;
            console.log("1 record inserted");
        }
      );
    res.redirect('/')
    dbConnection.end()
    
})

router.post('/login', async (req, res) => {
    dbConnection.connect(function(error) {
        if(error) {
            throw error
        }else {
            console.log('conexion lograda')
        }
    })
    try {
        const { username, password } = req.body
        dbConnection.query(`SELECT * FROM users WHERE username = '${username}'`,
            function (err, results) {
                if (err) throw err;
                if(!results[0]){
                    return res.status(400).json({error:'Credenciales incorrectas'})
                }
                const validPassword = comparePassword(password, results[0].password)
                if(!validPassword){
                    return res.status(400).json({error:'Credenciales incorrectas'})
                }
                const token = jwt.sign({id: results[0].id ,username: results[0].username, email: results[0].email}, 'topsecret', {expiresIn: '1h'})
                res.json({token, userId: results[0].id})
            }
          );

    } catch(err) {
        res.status(500).json({ error: err.message})
    }

    dbConnection.end()
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