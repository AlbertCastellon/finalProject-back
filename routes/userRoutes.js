const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');

router.get('/api/usuarios', userController.getAllUsers);

router.post('/register', [
    body('nombre').notEmpty(),
    body('primer_apellido').notEmpty(),
    body('email').isEmail(),
    body('username').notEmpty(),
    body('password').isLength({ min: 6 })
], userController.registerUser);

router.post('/login', userController.loginUser);

module.exports = router;
