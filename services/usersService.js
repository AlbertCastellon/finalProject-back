const pool = require('../config/config');

const getAllUsers = async () => {
    const [results] = await pool.query('SELECT nombre, primer_apellido, email, username FROM users');
    return results;
};

const createUser = async (nombre, primer_apellido, email, username, password) => {
    await pool.query(
        'INSERT INTO users (nombre, primer_apellido, email, username, password) VALUES ($1, $2, $3, $4, $5)',
        [nombre, primer_apellido, email, username, password]
    );
};

const findUserByUsername = async (username) => {
    const [results] = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return results[0];
};

module.exports = {
    getAllUsers,
    createUser,
    findUserByUsername
};