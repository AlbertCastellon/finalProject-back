const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');
const { body } = require('express-validator');

router.get('/api/usuarios', usersController.getAllUsers);

router.post('/register', [
    body('nombre').notEmpty(),
    body('primer_apellido').notEmpty(),
    body('email').isEmail(),
    body('username').notEmpty(),
    body('password').isLength({ min: 6 })
], usersController.registerUser);

router.post('/login', usersController.loginUser);

module.exports = router;