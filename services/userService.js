const pool = require('../config/db');

const getAllUsers = async () => {
    const [results] = await pool.query('SELECT nombre, primer_apellido, email, username FROM users');
    return results;
};

const createUser = async (nombre, primer_apellido, email, username, password) => {
    await pool.query(
        'INSERT INTO users (nombre, primer_apellido, email, username, password) VALUES (?, ?, ?, ?, ?)',
        [nombre, primer_apellido, email, username, password]
    );
};

const findUserByUsername = async (username) => {
    const [results] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return results[0];
};

module.exports = {
    getAllUsers,
    createUser,
    findUserByUsername
};
