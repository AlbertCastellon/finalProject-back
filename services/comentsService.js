const pool = require('../config/config');

const getAllComents = async () => {
    const [results] = await pool.query('SELECT comentarios.id, comentarios.title, comentarios.coment, users.username FROM comentarios LEFT JOIN users ON comentarios.userId = users.id ORDER BY comentarios.id DESC');
    return results;
};

const createComent = async (title, coment, userId) => {
    await pool.query(
        `INSERT INTO comentarios (title, coment, userId) VALUES (?, ?, ?)`,
        [title, coment, userId]
    );
};

module.exports = {
    getAllComents,
    createComent
}