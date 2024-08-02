const pool = require('../config/config');

const getAllComents = async () => {
    const [results] = await pool.query('SELECT comentarios.title, comentarios.coment, users.username FROM comentarios LEFT JOIN users ON comentarios.userId = users.id');
    return results;
};

const createComent = async (title, coment) => {
    await pool.query(
        `INSERT INTO comentarios (title, coment) VALUES (?, ?)`,
        [title, coment]
    );
};

module.exports = {
    getAllComents,
    createComent
}