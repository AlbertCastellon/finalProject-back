const usersService = require('../services/usersService');
const { hashPassword, comparePassword } = require('../helpers/bcryptHelpers');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const registerUser = async (req, res) => {
    try {
        const { nombre, primer_apellido, email, username, password } = req.body;
        const hashedPassword = await hashPassword(password);
        await usersService.createUser(nombre, primer_apellido, email, username, hashedPassword);
        res.redirect('/');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await usersService.findUserByUsername(username);

        if (!user) {
            return res.status(400).json({ error: 'Credenciales incorrectas' });
        }
        
        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, userId: user.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllUsers,
    registerUser,
    loginUser
};